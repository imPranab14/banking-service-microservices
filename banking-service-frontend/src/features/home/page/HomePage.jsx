import { useEffect, useState } from "react";
import { deleteAccount, listOfAccount } from "../api/home.page.api";
import toast, { Toaster } from "react-hot-toast";
import user from "../dummy/userdata.js";

function HomePage() {
  //State for Account List
  const [accountList, setAccountList] = useState();
  const [userList, setUserList] = useState(user?.users);

  //List Account API CALL

  async function fetchAccountList() {
    try {
      const response = await listOfAccount();
      setAccountList(response?.data);
    } catch (error) {
      console.log("error", error);
      toast.error(error.message || "Failed to fetch account details");
    }
  }

  //Delete Account
  async function handelDeleteAccount(accountNumber) {
    console.log("Delete Account Button", accountNumber);
    try {
      const response = await deleteAccount(accountNumber);
      console.log("delete_acc", response);
      if (response.status === 200) {
        await fetchAccountList();
        toast.success(`Delete account successfully ${accountNumber}`);
      }
    } catch (error) {
      alert(error);
      console.log("delete", error);
    }
  }
  //Api Call
  useEffect(() => {
    fetchAccountList();
  }, []);

  console.log("accountList", accountList);
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Account List
          </h1>
          <div className="grid gap-6 md:grid-cols-2">
            {accountList?.map((account, id) => (
              <div
                key={id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700 capitalize">
                    {account.accountType} Account
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium capitalize ${
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
                <button
                  onClick={() => handelDeleteAccount(account.accountNumber)}
                >
                  Delete Account
                </button>
              </div>
            ))}
          </div>

          {/* {userList.map((ele,id)=>{
            return(
              <>
              <h1 key={id}>Name : {ele.firstName} {ele.lastName}</h1>
              </>
            )
          })} */}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default HomePage;
