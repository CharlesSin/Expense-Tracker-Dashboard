import React from "react";
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import monthFormat from "../../utils/monthFormat";
import monthlyArray from "../../utils/monthlyArray";

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Chart({ dataYear }) {
  const { incomes, expenses } = useGlobalContext();
  const incomeByYear = incomes.filter((item) => monthFormat(item.date).includes(dataYear));
  const expensesByYear = expenses.filter((item) => monthFormat(item.date).includes(dataYear));
  const MONTHS = monthlyArray(dataYear);

  let chartData = [];
  if (Object.entries(expenses).length > 0) {
    const expenseData = Object.entries(expensesByYear);
    // this gives an object with dates as keys
    const groups = expenseData.reduce((groups, expense) => {
      const date = monthFormat(expense[1].date);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense[1].amount);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const expenseGroupArrays = Object.keys(groups).map((date) => {
      const total = groups[date].reduce((cur, acc) => {
        return (cur += acc);
      }, 0);
      return { date, total };
    });

    incomeByYear.map((data) => {
      const { date, amount } = data;
      const month = monthFormat(date);
      expenseGroupArrays.map((item) => {
        const { date: expenseDate, total } = item;
        if (expenseDate === month) {
          chartData.push({ date: month, amount, total });
        }
      });
    });

    chartData = chartData.sort((a, b) => {
      return MONTHS.indexOf(a.date) - MONTHS.indexOf(b.date);
    });
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `01/${dataYear} - ${incomeByYear.length >= 10 ? "" : 0}${incomeByYear.length}/${dataYear}`,
      },
    },
  };

  const data = {
    labels: chartData.map((item) => {
      const { date } = item;
      return date;
    }),
    datasets: [
      {
        label: "Income",
        data: [
          ...chartData.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: [
          ...chartData.map((expense) => {
            const { total } = expense;
            return total;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line options={options} data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
