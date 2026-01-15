import { useEffect, useState } from "react";
import { listOfAccount } from "../api/home.page.api";
import toast, { Toaster } from "react-hot-toast";

function HomePage() {
  //State for Account List
  const [accountList, setAccountList] = useState();

  //List Account API CALL
  useEffect(() => {
    (async function fetchAccountList() {
      try {
        const response = await listOfAccount();
        setAccountList(response?.data);
      } catch (error) {
        console.log("error",error);
        toast.error(error.message || "Failed to fetch account details");
      }
    })();
  }, []);

  console.log("accountList", accountList);
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Account List
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
            {accountList?.map((account) => (
              <div
                key={account._id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {account.accountType.toUpperCase()} Account
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      account.accountStatus === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {account.accountStatus}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Email</span>
                    <span className="font-medium text-gray-800">
                      {account.email}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Account Number</span>
                    <span className="font-medium text-gray-800">
                      {account.accountNumber}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Balance</span>
                    <span className="font-semibold text-indigo-600">
                      {account.currency} {account.balance}
                    </span>
                  </div>
                </div>

                <button className="mt-5 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default HomePage;
