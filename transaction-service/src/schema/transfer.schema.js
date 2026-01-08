import z from "zod";


const TransferSchema = z.object({
  fromAccountNo: z.number(),//.min(10).max(10),
  toAccountNo: z.number(),//.min(10).max(10),
  amount: z.number(),
});


export default TransferSchema;


