import React from "react";
import { useQuery } from "@tanstack/react-query";
import { slowListOfTransaction } from "../api/home.page.api";

function SlowResponsePage() {
  // NOTE Queries
  const { data: transactionData } = useQuery({
    queryKey: ["allTransactionList"],
    queryFn: slowListOfTransaction,
  });

  console.log("Slow_Api_Repose_Transaction", transactionData);

  return (
    <>
      <h1>email:{transactionData?.email}</h1>
      <h1>accountNumber:{transactionData?.accountNumber}</h1>
    </>
  );
}

export default SlowResponsePage;
