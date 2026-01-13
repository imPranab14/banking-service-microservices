import { useEffect } from "react";
import { listOfAccount } from "../api/home.page.api";

function HomePage() {
  async function userListOfAccount() {
    const response = await listOfAccount();
    console.log("response", response);
  }

  useEffect(() => {
    userListOfAccount();
  }, []);
  const data = [
    {
      _id: "6960d6c42d35f97a2014a29d",
      email: "raleigh.feest86@yahoo.com",
      accountNumber: 192026195211206,
      accountType: "current",
      accountStatus: "active",
      balance: 110,
      currency: "INR",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Account List
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {data?.map((account) => (
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
  );
}

export default HomePage;
