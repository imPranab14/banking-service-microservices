import { Home } from "lucide-react";
import React, { useState } from "react";
import listOfTransaction from "../dummy/transactionData";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowRightLeft,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
} from "lucide-react";

function MoneyTransaction({ selectedAccountNumber, setShowMoneyTransaction }) {
  const [allTransaction, setAllTransaction] = useState(listOfTransaction.data);

  //Zod Schema
  const MoneyTransferSchema = z.object({
    fromAccountNumber: z.number().min(16).max(16),
    toAccountNumber: z.number().min(16).max(16),
  });

  function handelMoneyTransfer(e) {
    e.preventDefault();
    const moneyTransferData = {
      fromAccountNumber: selectedAccountNumber,
      toAccountNumber: e.target.toAccountNumber.value,
    };
    console.log("mon", moneyTransferData);
    const parsedData = MoneyTransferSchema.safeParse(moneyTransferData);
    if (!parsedData.success) {
      toast.error("Invalid Account Number. It should be 16 digits.");
      console.log("error", parsedData.error._zod.def);
      return;
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowMoneyTransaction(false)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>

            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-slate-500 font-medium">
                  Your Account
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {selectedAccountNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <ArrowRightLeft className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Transfer Money
                    </h2>
                    <p className="text-sm text-slate-500">
                      Send money instantly
                    </p>
                  </div>
                </div>

                <form onSubmit={(e) => handelMoneyTransfer(e)}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      From Account
                    </label>
                    <input
                      type="number"
                      value={selectedAccountNumber}
                      disabled
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      To Account
                    </label>
                    <input
                      type="number"
                      placeholder="Enter To Account Number"
                      name="toAccountNumber"
                      maxLength={5}
                      min={5}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium cursor-not-allowed"
                    />
                  </div>

                  <input type="submit" />
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h2 className="text-xl font-bold text-slate-900">
                    Transaction History
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    View all your recent transactions
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          From
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {allTransaction.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-12 text-center text-slate-500"
                          >
                            No transactions yet. Start by making your first
                            transfer!
                          </td>
                        </tr>
                      ) : (
                        allTransaction.map((transaction) => (
                          <tr
                            key={transaction.transferId}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-slate-900">
                                {transaction.transferId}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-slate-600">
                                {transaction.fromAccountId}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-slate-600">
                                {transaction.toAccountId}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-slate-900">
                                ${transaction.amount.toFixed(2)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {transaction.status}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default MoneyTransaction;
