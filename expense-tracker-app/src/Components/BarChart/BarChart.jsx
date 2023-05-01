import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { monthFormat } from "../../utils/monthFormat";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart() {
  const { incomes, expenses } = useGlobalContext();

  let chartData = [];
  if (Object.entries(expenses).length > 0) {
    const expenseData = Object.entries(expenses);
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

    incomes.map((data) => {
      const { date, amount } = data;
      const month = monthFormat(date);
      expenseGroupArrays.map((item) => {
        const { date: expenseDate, total } = item;
        if (expenseDate === month) {
          chartData.push({ date: month, amount, total });
        }
      });
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
        text: "Bar chart 01/2021 - 04/2023",
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
        tension: 0.5,
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
      <Bar options={options} data={data} />
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

export default BarChart;
