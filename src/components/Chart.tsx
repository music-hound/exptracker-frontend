import type { FC } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#00aa28', '#ff0028']

interface IChart {
  totalIncome: number;
  totalExpense: number;
}

const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => {
  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={90}
        >
            {chartData?.map((_, index)=>(
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
