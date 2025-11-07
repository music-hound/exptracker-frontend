import { toast } from "react-toastify";
import { instance } from "../api/axios.api";
import type { ActionFunctionArgs } from "react-router-dom";

export const transactionAction = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const newTransaction = {
        title: formData.get("title"),
        amount: formData.get("amount"),
        category: formData.get("category"),
        type: formData.get("type"),
      };

      await instance.post("/transactions", newTransaction);
      toast.success("Transaction added.");
      return null;
    }
    case "DELETE": {
      const formData = await request.formData();
      const transactionId = formData.get("id");
      await instance.delete(`transactions/transaction/${transactionId}`);
      toast.success("Transaction deleted.");
      return null;
    }
  }
};