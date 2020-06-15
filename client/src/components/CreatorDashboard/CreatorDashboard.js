import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    getContestsForCreative,
    clearContestList,
    getDataForContest
} from '../../actions/actionCreator';
import ContestsContainer from '../../components/ContestsContainer/ContestsContainer';
import ContestBox from "../ContestBox/ContestBox";
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../../components/TryAgain/TryAgain';


class CreatorDashboard extends React.Component {

    componentDidMount() {
        this.props.getDataForContest();
        this.getContests();
    }

    getContests = () => {
        this.props.getContests(Object.assign({}, {
            limit: 8,
            offset: 0
        }));
    };


    loadMore = startFrom => {
        this.props.getContests(Object.assign({}, {
            limit: 8,
            offset: startFrom
        }))
    };

    setContestList = () => {
        const array = [];
        const {contests} = this.props;
        for (let i = 0; i < contests.length; i++) {
            array.push(<ContestBox data={contests[i]} key={contests[i].id}
                                   goToExtended={this.goToExtended}/>)
        }
        return array;
    };

    goToExtended = (contestId) => {
        this.props.history.push('/contest/' + contestId);
    };

    tryLoadAgain = () => {
        this.props.clearContestsList();
        this.props.getContests({limit: 8, offset: 0});
    };


    render() {
        const {error, hasMore} = this.props;
        return (
            <div className={styles.mainContainer}>
                {
                    error ?
                        <div className={styles.messageContainer}>
                            <TryAgain getData={this.tryLoadAgain}/>
                        </div>
                        :
                        <ContestsContainer isFetching={this.props.isFetching}
                                           loadMore={this.loadMore}
                                           history={this.props.history} hasMore={hasMore}>
                            {this.setContestList()}
                        </ContestsContainer>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {contestsList, dataForContest} = state;
    return {...contestsList, dataForContest};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContests: (data) => dispatch(getContestsForCreative(data)),
        clearContestsList: () => dispatch(clearContestList()),
        getDataForContest: () => dispatch(getDataForContest())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard));