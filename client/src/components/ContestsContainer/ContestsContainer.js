import React from 'react';
import styles from './ContestContainer.module.sass';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/Spinner/Spinner';


const ContestsContainer = ({isFetching, children, hasMore, loadMore}) => {

    const handleNextScroll = () => {
        loadMore(children.length)
    }

    return ((!isFetching && children.length === 0) ? <div className={styles.notFound}>Nothing not found</div>
            : <div>
                <InfiniteScroll dataLength={children.length} next={handleNextScroll}
                                hasMore={hasMore}
                                loader={isFetching && <div className={styles.spinnerContainer}><Spinner/></div>}>
                    {children}</InfiniteScroll>
            </div>
    )
}


export default ContestsContainer;


