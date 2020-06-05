import React from "react";
import CONSTANTS from "../../constants";
import CustomerDashboard from "../../components/CustomerDashboard/CustomerDashboard";
import CreatorDashboard from "../../components/CreatorDashboard/CreatorDashboard";
import Header from "../../components/Header/Header";
import { connect } from "react-redux";
import ModeratorDashboard from "../../components/ModeratorDashboard/ModeratorDashboard";

const Dashboard = (props) => {
  const { role, history } = props;
  return (
    <div>
      <Header/>
      {(()=> {
          switch(role) {
              case CONSTANTS.CUSTOMER: {
                 return <CustomerDashboard history={history} match={props.match} />
              }
              case CONSTANTS.CREATOR: {
                  return <CreatorDashboard history={history} match={props.match} />
              }
              case CONSTANTS.MODERATOR: {
                  return <ModeratorDashboard history={history} match={props.match}/>;
              }

          default: {
          return null;
      }
      }
        })()
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.userStore.data;
};

export default connect(mapStateToProps)(Dashboard);
