import { Trash2, Eye, Wallet, Mail, Hash, DollarSign, Landmark } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteAccount, listOfAccount } from "../api/home.page.api";
import toast, { Toaster } from "react-hot-toast";
import user from "../dummy/userdata.js";
import {Button} from "../../../components/ui/button.jsx"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog.jsx";
import { AddAccountDialog } from "./AddAccountDialog.jsx";

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

     <AddAccountDialog accountType={changeValue}/>
      <div>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                My Accounts
              </h1>
              <p className="text-slate-600">Manage your financial accounts</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {accountList?.map((account, id) => (
                <div
                  key={id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-slate-200 hover:border-emerald-200 group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                        {account.accountType === 'savings'?<Wallet className="w-6 h-6 text-white" />
                        :<Landmark className="w-6 h-6 text-white"/>}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-800 capitalize">
                          {account.accountType}
                        </h2>
                        <p className="text-sm text-slate-500">Account</p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 text-xs rounded-full font-semibold capitalize shadow-sm ${
                        account.accountStatus === "active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {account.accountStatus}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 mb-0.5">Email</p>
                        <p className="font-medium text-slate-800 text-sm">
                          {account.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Hash className="w-4 h-4 text-slate-400" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 mb-0.5">
                          Account Number
                        </p>
                        <p className="font-mono font-medium text-slate-800 text-sm">
                          {account.accountNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <div className="flex-1">
                        <p className="text-xs text-emerald-700 mb-0.5 font-medium">
                          Current Balance
                        </p>
                        <p className="font-bold text-emerald-700 text-2xl">
                          {account.currency} {account.balance}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 px-4 rounded-xl transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      className="bg-red-50 hover:bg-red-100 text-red-600 py-3 px-4 rounded-xl transition-all duration-200 font-medium flex items-center justify-center border border-red-200 hover:border-red-300 shadow-sm hover:shadow"
                      onClick={() => handelDeleteAccount(account.accountNumber)}
                      title="Delete Account"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* {userList.map((ele,id)=>{
            return(
              <>
              <h1 key={id}>Name : {ele.firstName} {ele.lastName}</h1>
              </>
            )
          })} */}
      </div>

      <Toaster />
    </>
  );
}

export default HomePage;
