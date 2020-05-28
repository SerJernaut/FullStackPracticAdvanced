import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {connect} from "react-redux";
import {getModerationOffersRequest} from "../../actions/actionCreator";
import styles from './ModeratorDashboard.module.sass';
import CONSTANTS from "../../constants"
import OfferItem from "../OfferItem/OfferItem";
import {InfiniteScroll} from 'react-simple-infinite-scroll';
import SpinnerLoader from '../Spinner/Spinner';

const ModeratorDashboard = ({getModerationOffers, offers, isMore, isFetching}) => {

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
            <div className={styles.filterContainer}>
                <h1>filter results</h1>
            </div>
            <ul className={styles.moderationOffersContainer}>
                <h1>offers by creators expecting moderation</h1>
                <InfiniteScroll
                    throttle={100}
                    threshold={300}
                    isLoading={isFetching}
                    hasMore={isMore}
                    onLoadMore={() => {
                        getModerationOffersWithFilter(offers.length)
                    }
                    }
                >
                    {isFetching && <SpinnerLoader/>}
                    {offers.length > 0
                        ?
                        offers.map(offer => (
                            <OfferItem key={offer.id} {...offer}/>))
                        :
                        !isFetching && <div>No offers to moderate</div>
                    }
                </InfiniteScroll>
            </ul>
        </div>
    );
};

const mapStateToProps = state => state.moderateOffersStore;

const mapDispatchToProps = dispatch => ({
    getModerationOffers: paginationFilter => {
        dispatch(getModerationOffersRequest(paginationFilter))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);