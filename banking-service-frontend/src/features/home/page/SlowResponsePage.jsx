import React from "react";
import { useQuery } from "@tanstack/react-query";
import { slowListOfTransaction } from "../api/home.page.api";

function SlowResponsePage() {
  // NOTE Queries
  const { data: transactionData, isFetching } = useQuery({
    queryKey: ["allTransactionList"],
    queryFn: slowListOfTransaction,
      staleTime: 1000 * 60 * 5, // 5 minutes

  });

  console.log("Slow_Api_Repose_Transaction", transactionData);

  return (
    <>
      {isFetching && <p>Loading....</p>}
      {!isFetching && (
        <>
          <h1>email:{transactionData?.email}</h1>
          <h1>accountNumber:{transactionData?.accountNumber}</h1>
        </>
      )}
    </>
  );
}

export default SlowResponsePage;
