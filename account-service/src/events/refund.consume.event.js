import connectRabbitMQ from "../config/rabbitmq.js";
import refundAccount from "../service/refundBalance.js";
import publishEvent from "./publish.event.js";


export async function startRefundConsume() {
    const channel =await connectRabbitMQ()
    channel.consume('account-refund-queue',async(msg)=>{
        const event=JSON.parse(msg.content.toString())
        console.log("Refund_Event",event);
        //Refund Amount
        await refundAccount(event.fromAccountID,event.amount)
        //Publish Transfer Compensated Event
        await publishEvent('transfer-reimbursement',{
             transferId: event.transferId
        })
    })

    
}