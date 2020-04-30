import React from 'react';
import {onlyForNotAuthorize} from '../../actions/actionCreator';
import {connect} from 'react-redux';
import Spinner from '../Spinner/Spinner';

const withoutUserHOC = Component => {

    const mapStateToProps = state => state.userStore;

    const mapDispatchToProps = (dispatch) => {
        return {
            checkAuth: (data) => dispatch(onlyForNotAuthorize(data))
        }
    };

    class ComponentOnlyForNotAuthorized extends React.Component {
        componentDidMount() {
            this.props.checkAuth(this.props.history.replace);
        }

        render() {
            if (this.props.isFetching) {
                return <Spinner/>;
            } else if (!this.props.data) {
                return <Component history={this.props.history}/>
            }
            return null;
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(ComponentOnlyForNotAuthorized);

}

export default withoutUserHOC;
