import React from 'react';
import styles from './HeaderTopSection.module.sass';
import {Link} from "react-router-dom";
import {phoneIconTopStyles} from "../../utils/iconsInlineStyles";

const HeaderTopSection = () => {
        return (
        <section className={styles.top}>
            <div className={styles.contactNumberContainer}>
                    <div className={styles.contactNumber}>
                        <i className="fa fa-phone" aria-hidden="true" style={phoneIconTopStyles }/>
                        <a href="tel:(877)355-3585">(877)&nbsp;355-3585</a>
                    </div>
            </div>
            <div className={styles.buttonsWrapper}>
                <nav className={styles.buttonsContainer}>
                    <button className={styles.authBtn}>
                        <Link to='/login'>
                            login
                        </Link>
                    </button>
                    <button className={styles.authBtn}>
                        <Link to='/registration'>
                            sign up
                        </Link>
                    </button>
                </nav>
            </div>
        </section>
    );
};

export default HeaderTopSection;