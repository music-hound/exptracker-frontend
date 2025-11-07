import type { FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { type IResponseTransactionLoader } from "../types/types";
import TransactionTable from "../components/TransactionTable";
import { useLoaderData } from "react-router-dom";
import { formatToUSD } from "../helpers/currency.helper";
import Chart from "../components/Chart";

const Transactions: FC = () => {
  const { totalIncome, totalExpense } =
    useLoaderData() as IResponseTransactionLoader;

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/* Add Transaction Form */}
        <div className="col-span-2 grid">
          <TransactionForm />
        </div>

        {/* Statistic blocks */}
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Income
              </p>
              <p className="bg-green-600 p-1 text-center mt-2 rounded-sm">
                {formatToUSD.format(totalIncome)}
              </p>
            </div>
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Expense
              </p>
              <p className="bg-red-500 p-1 text-center mt-2 rounded-sm">
                {formatToUSD.format(totalExpense)}
              </p>
            </div>
          </div>
          <Chart totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
      </div>

      {/* Transaction Table */}
      <h1 className="my-5">
        <TransactionTable limit={5} />
      </h1>
    </>
  );
};

export default Transactions;
