import * as React from "react";
import TransactionTable from "../../components/TransactionTable";
import {useEffect} from "react";
import {connect} from "react-redux";
import {getUserTransactionsHistoryRequest, getUserTransactionStatementsRequest} from "../../actions/actionCreator";

const UserTransactionsPage = ({getUserTransactionsHistory, getUserTransactionStatements}) => {
    useEffect(() => {
        getUserTransactionsHistory()
        getUserTransactionStatements()
    }, []);

    return (
    <div>
      <TransactionTable />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTransactionsHistory: () => dispatch(getUserTransactionsHistoryRequest()),
        getUserTransactionStatements: () => dispatch(getUserTransactionStatementsRequest())
    };
};

export default  connect(null, mapDispatchToProps)(UserTransactionsPage);
