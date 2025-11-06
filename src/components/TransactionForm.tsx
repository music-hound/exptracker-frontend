import { useState, type FC } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import type { IResponseTransactionLoader } from "../types/types";
import CategoryModal from "./CategoryModal";

const TransactionForm: FC = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const { categories } = useLoaderData() as IResponseTransactionLoader;
  return (
    <div className="rounded-md bg-slate-900 p-4">
      <Form className="grid gap-2" method="POST" action="/transactions">
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            className="input"
            type="text"
            placeholder="Title..."
            name="title"
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            className="input"
            type="number"
            placeholder="Amount..."
            name="amount"
            required
          />
        </label>

        {/* SELECT */}
        <label htmlFor="category" className="grid">
          <span>Category</span>
          {categories.length ? (
            <select name="category" defaultValue={""} required className="input">
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          ) : (
            <h3 className="mt-1 text-red-500">
              No categories, and one first before proceeding
            </h3>
          )}
        </label>

        {/* Manage categories button */}
        <button onClick={()=>{setVisibleModal(true)}} className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white cursor-pointer">
          <FaPlus />
          <span>Add Category</span>
        </button>

        {/* Radio buttons */}
        <div className="flex gap-4 items-center">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"income"}
              className="form-radio text-blue-600"
            />
            <span>Income</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={"expense"}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-green max-w-fit mt-2">
          Add Transaction
        </button>
      </Form>

      {/* Add Category Modal */}
      {visibleModal && (
        <CategoryModal type="POST" setVisibleModal={setVisibleModal} />
      )}
    </div>
  );
};

export default TransactionForm;
