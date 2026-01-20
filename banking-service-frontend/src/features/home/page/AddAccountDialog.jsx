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
  const handelSubmit = (e) => {
    e.preventDefault();
    //Send To Parent Component
    accountType(account)
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
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
          <Button type="submit">Add Account</Button>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
