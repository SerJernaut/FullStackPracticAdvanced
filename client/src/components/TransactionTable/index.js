import * as React from "react";
import styles from "./TransactionTable.module.scss";
import {connect} from "react-redux";

const TransactionTable = ({transactions, transactionStatements}) => {
  const transactionStatementsSize = Object.keys(transactionStatements).length;

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>заработанные/потраченные</th>
            <th>сумма</th>
          </tr>
        </thead>
        {transactions.length > 0 && transactions.map((transaction, index) => {
          return (
            <tr>
              <td>{`${index + 1}`}</td>
              <td>{transaction.typeOperation === 'INCOME' ?'Заработанные' : 'Потраченные'}</td>
              <td>{transaction.typeOperation === 'CONSUMPTION' ? `-${transaction.sum}` : `${transaction.sum}`}</td>
            </tr>
          );
        })}
        {transactionStatementsSize > 0 && Object.entries(transactionStatements).map(transactionStatement => {
          return (
              <tr>
                <td colSpan={2}>
                  {transactionStatement[0] === 'INCOME' ? 'Всего заработано' : 'Всего потрачено'}
                </td>
                <td>
                  {transactionStatement[0] === 'CONSUMPTION' ? `-${transactionStatement[1]}` : `${transactionStatement[1]}`}
                </td>
              </tr>
          )
        })}
        {transactionStatementsSize === 0 &&
            <>
            <tr>
              <td colSpan={2}>
                Всего заработано
              </td>
              <td>
                0
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                Всего потрачено
              </td>
              <td>
                0
              </td>
            </tr>
            </>

        }


      </table>
    </div>
  );
};

const mapStateToProps = state => state.transactionsStore;



export default connect(mapStateToProps)(TransactionTable);
