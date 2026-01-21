import { Home } from "lucide-react";
import React, { useState } from "react";
import listOfTransaction from "../dummy/transactionData";

function MoneyTransaction({ selectedAccountNumber, setShowMoneyTransaction }) {
  const [allTransaction, setAllTransaction] = useState(listOfTransaction.data);
  const [toAccountNumber, setToAccountNumber] = useState("");
  console.log("transaction", toAccountNumber);

  function handelMoneyTransfer(e) {
    e.preventDefault()
    console.log("e",selectedAccountNumber,e.target.toAccountNumber.value);
    
  }
  return (
    <>
      <Home onClick={(e) => setShowMoneyTransaction(false)} />
      <h1> your account number{selectedAccountNumber}</h1>
      <h1>Data Table</h1>

      <form onSubmit={(e)=> handelMoneyTransfer(e)}>
        <input placeholder="fgdfgj" value={selectedAccountNumber} disabled/>
        <input placeholder="Enter To Account Number"  name="toAccountNumber" />
        <input  type="submit"/>
      </form>

      <h1>-------------</h1>

      {allTransaction.map((e) => {
        return (
          <>
            <tr >
              <td>{e.transferId}</td>
              <td>{e.fromAccountId}</td>
              <td>{e.toAccountId}</td>
              <td>{e.amount}</td>
              <td>{e.status}</td>
            </tr>
          </>
        );
      })}
    </>
  );
}

export default MoneyTransaction;
