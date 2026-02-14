import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AddAccountDialog({accountType}) {
  const [account, setAccount] = useState("");
  const [open,setOpen]=useState(false)
  const handelSubmit = (e) => {
    e.preventDefault();
    //Send To Parent Component
    accountType(account)
   setOpen(false)
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>
              Fill in the required information to add a new account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handelSubmit(e)}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select Account
                </option>
                <option value="current">Current</option>
                <option value="savings">Savings</option>
              </select>
            </div>
          </div>
          <Button size="sm" className='mt-5' type="submit" disabled={!account}>Add Account</Button>
        </form>

        {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
