import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransactions = [] }) => {
  if (!Array.isArray(allTransactions)) {
    console.error("allTransactions is not an array:", allTransactions);
    return <div>Error: Transactions data is not available</div>;
  }  //added

  // Total transactions

  const totalTransactions = allTransactions.length;
  const totalIncomeTransactions = allTransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransactions.filter(
    (transaction) => transaction.type === "expenses"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransactions) * 100 || 0;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransactions) * 100 || 0;

  // Total turnover
  const totalTurnover = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = totalIncomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalExpenseTurnover = totalExpenseTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const incomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100 || 0;
  const expenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100 || 0;

  // Categories
  const categories = [
    "fees",
    "travel",
    "food",
    "pocket money",
    "internship",
    "medical",
    "shopping",
    "others",
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <div className="card-header">
          Total Transactions: {totalTransactions}
        </div>
        <div className="card-body">
          <h5 className="text-success">
            Income: {totalIncomeTransactions.length}
          </h5>
          <h5 className="text-danger">
            Expense: {totalExpenseTransactions.length}
          </h5>
          <div>
            <Progress
              type="circle"
              className="mx-2"
              strokeColor={"green"}
              percent={totalIncomePercent.toFixed(0)}
            />
            <Progress
              type="circle"
              className="mx-2"
              strokeColor={"red"}
              percent={totalExpensePercent.toFixed(0)}
            />
          </div>
        </div>
      </div>

      <div className="analytics-card">
        <div className="card-header">Total Turnover: {totalTurnover}</div>
        <div className="card-body">
          <h5 className="text-success">
            Income: {incomeTurnoverPercent.toFixed(0)}%
          </h5>
          <h5 className="text-danger">
            Expense: {expenseTurnoverPercent.toFixed(0)}%
          </h5>
          <div>
            <Progress
              type="circle"
              className="mx-2"
              strokeColor={"green"}
              percent={incomeTurnoverPercent.toFixed(0)}
            />
            <Progress
              type="circle"
              className="mx-2"
              strokeColor={"red"}
              percent={expenseTurnoverPercent.toFixed(0)}
            />
          </div>
        </div>
      </div>

      <div className="analytics-card">
        <h4>Category-wise Income</h4>
        {categories.map((category) => {
          const amount = totalIncomeTransactions
            .filter((transaction) => transaction.category === category)
            .reduce((acc, transaction) => acc + transaction.amount, 0);
          return (
            amount > 0 && (
              <div className="card">
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                </div>
              </div>
            )
          );
        })}
      </div>

      <div className="analytics-card">
        <h4>Category-wise Expense</h4>
        {categories.map((category) => {
          const amount = totalExpenseTransactions
            .filter((transaction) => transaction.category === category)
            .reduce((acc, transaction) => acc + transaction.amount, 0);
          return (
            amount > 0 && (
              <div className="card">
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Analytics;
