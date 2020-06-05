import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    getModerationOffersRequest,
    offerModerationRejectingRequest,
    offerModerationResolvingRequest
} from "../../actions/actionCreator";
import styles from './ModeratorDashboard.module.sass';
import CONSTANTS from "../../constants"
import OfferItem from "../OfferItem/OfferItem";
import {InfiniteScroll} from 'react-simple-infinite-scroll';
import SpinnerLoader from '../Spinner/Spinner';

const ModeratorDashboard = ({getModerationOffers, resolveOfferByModerator, rejectOfferByModerator, offers, hasMore, isFetching}) => {

    const getModerationOffersWithFilter = offset => {
        getModerationOffers({
            limit: CONSTANTS.GET_MODERATION_OFFERS_LIMIT,
            offset: offset,
            moderationStatus: CONSTANTS.OFFER_MODERATION_EXPECTED_STATUS
        })
    }

    useEffect(
        () => {
            !isFetching && getModerationOffersWithFilter(0);
        }
        , [])

    return (
        <div className={styles.moderationDashboardContainer}>
            <ul className={styles.moderationOffersContainer}>
                <h1>offers by creators expecting moderation</h1>
                <InfiniteScroll
                    throttle={100}
                    threshold={300}
                    isLoading={isFetching}
                    hasMore={hasMore}
                    onLoadMore={() => {
                        getModerationOffersWithFilter(offers.length)
                    }
                    }
                >
                    {offers.length > 0
                        ?
                        offers.map((offer, index) => (
                            <OfferItem key={index + offer.createdAt} {...offer} resolveOfferByModerator={resolveOfferByModerator} rejectOfferByModerator={rejectOfferByModerator} isFetching={isFetching}/>))
                        :
                        !isFetching && <div>No offers to moderate</div>
                    }
                    {isFetching && <SpinnerLoader/>}
                </InfiniteScroll>
            </ul>
        </div>
    );
};

const mapStateToProps = state => state.moderateOffersStore;

const mapDispatchToProps = dispatch => ({
    getModerationOffers: paginationFilter => {
        dispatch(getModerationOffersRequest(paginationFilter))
    },
    resolveOfferByModerator: offerId => {
        dispatch(offerModerationResolvingRequest(offerId))
    },
    rejectOfferByModerator: offerId => {
        dispatch(offerModerationRejectingRequest(offerId))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);