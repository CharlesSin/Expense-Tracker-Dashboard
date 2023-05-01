import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";
import BarChart from "../BarChart/BarChart";

function Dashboard() {
  const { totalExpenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>Dashboard Chart</h1>
        <div className="stats-con">
          <div className="chart-con">
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <h5>01/2021 - 04/2023</h5>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>

              <div className="expense">
                <h2>Total Expense</h2>
                <h5>01/2021 - 04/2023</h5>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>

              <div className="balance">
                <h2>Total Balance</h2>
                <h5>01/2021 - 04/2023</h5>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
            <Chart dataYear="2023" />
            <div className="margin-2"></div>
            <Chart dataYear="2022" />
            <div className="margin-2"></div>
            <Chart dataYear="2021" />
            <div className="margin-2"></div>
            <BarChart dataYear="2023" />
            <div className="margin-2"></div>
            <BarChart dataYear="2022" />
            <div className="margin-2"></div>
            <BarChart dataYear="2021" />
            <div className="margin-2"></div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1;
      height: 580px;

      .margin-2 {
        margin-top: 32px;
      }

      .amount-con {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin: 2rem 0;
        .income,
        .expense .balance {
          grid-column: 1 / 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        ${
          "" /* .balance {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        } */
        }
      }
    }
  }
`;

export default Dashboard;
