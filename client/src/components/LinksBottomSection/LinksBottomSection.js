import React from 'react';
import CONSTANTS from '../../constants';
import styles from './LinksBottomSection.module.sass';
import Icon from '@mdi/react'
import {mdiFacebook, mdiTwitter} from '@mdi/js'


const LinksBottomSection = () => {
    return (
        <section className={styles.links}>
            <div className={styles.logoAndCopyrightContainer}>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}footer-logo.png`} alt="SQUADHELP"/>
                <span>Copyright © 2017 Squadhelp Inc</span>
            </div>
            <ul className={styles.iconsContainer}>
                <li>
                    <a href="#"><Icon
                        path={mdiFacebook}
                        title="facebook"
                        size="20px"
                        color="#28d2d0"
                    />
                    </a>
                </li>
                <li>
                    <a href="#"><Icon
                        path={mdiTwitter}
                        title="twitter"
                        size="20px"
                        color="#28d2d0"
                    />
                    </a>
                </li>
            </ul>
        </section>
    );
};



export default LinksBottomSection;