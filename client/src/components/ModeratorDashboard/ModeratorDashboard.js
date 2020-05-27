import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getModerationOffersRequest} from "../../actions/actionCreator";
import styles from './ModeratorDashboard.module.sass';
import CONSTANTS from "../../constants"
import OfferItem from "../OfferItem/OfferItem";

const ModeratorDashboard = ({getModerationOffers, offers, isMore, isFetching})=> {
    useEffect(
        ()=> {
           !isFetching && getModerationOffers({limit: 8, offset: 0, moderationStatus: CONSTANTS.OFFER_MODERATION_EXPECTED_STATUS})
        }
    , [])

    return (
        <div className={styles.moderationDashboardContainer}>
            <div className={styles.filterContainer}>
                <h1>filter results</h1>
            </div>
            <ul className={styles.moderationOffersContainer}>
                <h1>offers by creators expecting moderation</h1>
                {offers.map(offer => (
                    <OfferItem key={offer.id} {...offer}/>))
                }
            </ul>
        </div>
    );
};

const mapStateToProps = state => state.moderateOffersStore;

const mapDispatchToProps = dispatch => ({getModerationOffers: paginationFilter => {dispatch(getModerationOffersRequest(paginationFilter))
    }})


export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);