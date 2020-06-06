import React, {useEffect, useState} from 'react';
import styles from './HeaderBottomSection.module.sass';
import CONSTANTS from "../../constants";
import classNames from "classnames";
import {phoneIconBottomStyles} from "../../utils/iconsInlineStyles";

const HeaderBottomSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onResizeHandler = () => {
        if (window.innerWidth > 768 && isOpen) setIsOpen(false);
    };

    useEffect(() => {
        window.addEventListener('resize', onResizeHandler);
        return () => window.removeEventListener('resize', onResizeHandler);
    }, [isOpen]);

    return (
        <section className={styles.bottom}>
            <div className={styles.logoContainer}>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}squadhelp-logo-color-compressed.jpg`}/>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}squadhelp-logo-color.jpg`}/>
            </div>
            <div className={styles.linksWrapper}>
                <ul className={styles.linksContainer}>
                    <li><a href="#">name ideas<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.dropdownMenu}>
                            <li><a href="#">Beauty</a></li>
                            <li><a href="#">Consulting</a></li>
                            <li><a href="#">E-Commerce</a></li>
                            <li><a href="#">Fashion &amp; Clothing</a>
                            </li>
                            <li><a href="#">Finance</a></li>
                            <li><a href="#">Real Estate</a>
                            </li>
                            <li><a href="#">Tech</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">More Categories</a></li>
                        </ul>
                    </li>
                    <li><a href="#">contests<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.dropdownMenu}>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Agency Services</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">Active
                                Contests</a></li>
                            <li><a href="#">Winners</a></li>
                            <li><a href="#">Leaderboard</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">Become A Creative</a></li>
                        </ul>
                    </li>
                    <li><a href="#">our work<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.dropdownMenu}>
                            <li><a href="#">Names</a></li>
                            <li><a href="#">Taglines</a></li>
                            <li><a href="#">Logos</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">Testimonials</a></li>
                        </ul>
                    </li>
                    <li><a href="#">names for sale<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <a href="#">Popular
                                    Names</a></li>
                            <li>
                                <a href="#">Short
                                    Names</a></li>
                            <li>
                                <a href="#">Intriguing
                                    Names</a></li>
                            <li><a href="#">Names By Category</a></li>
                            <li><a href="#">Visual Name Generator</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">Sell Your Domains</a>
                            </li>
                        </ul>
                    </li>
                    <li><a href="#">blog<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.dropdownMenu}>
                            <li>
                                <a href="#">Ultimate Naming Guide</a>
                            </li>
                            <li><a href="#">Poetic Devices
                                in Business Naming</a></li>
                            <li><a href="#">Crowded Bar Theory</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">All Articles</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={styles.btnContainer}>
                <button className={styles.startContestBtn}>
                    start contest
                </button>
            </div>
            <div className={classNames(styles.mobileLinksWrapper, {[styles.isShowMenu]: isOpen})}>
                <ul className={styles.mobileLinksContainer}>
                    <li>
                        <a href="#">
                            <i className="fa fa-phone" style={phoneIconBottomStyles}/>
                            <span>(877)&nbsp;355-3585</span>
                        </a>
                    </li>
                    <li><a href="#">name ideas<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.mobileDropdownMenu}>
                            <li><a href="#">Beauty</a></li>
                            <li><a href="#">Consulting</a></li>
                            <li><a href="#">E-Commerce</a></li>
                            <li><a href="#">Fashion &amp; Clothing</a>
                            </li>
                            <li><a href="#">Finance</a></li>
                            <li><a href="#">Real Estate</a>
                            </li>
                            <li><a href="#">Tech</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">More Categories</a></li>
                        </ul>
                    </li>
                    <li><a href="#">contests<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.mobileDropdownMenu}>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Agency Services</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">Active
                                Contests</a></li>
                            <li><a href="#">Winners</a></li>
                            <li><a href="#">Leaderboard</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">Become A Creative</a></li>
                        </ul>
                    </li>
                    <li><a href="#">our work<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.mobileDropdownMenu}>
                            <li><a href="#">Names</a></li>
                            <li><a href="#">Taglines</a></li>
                            <li><a href="#">Logos</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">Testimonials</a></li>
                        </ul>
                    </li>
                    <li><a href="#">names for sale<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.mobileDropdownMenu}>
                            <li>
                                <a href="#">Popular
                                    Names</a></li>
                            <li>
                                <a href="#">Short
                                    Names</a></li>
                            <li>
                                <a href="#">Intriguing
                                    Names</a></li>
                            <li><a href="#">Names By Category</a></li>
                            <li><a href="#">Visual Name Generator</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">Sell Your Domains</a>
                            </li>
                        </ul>
                    </li>
                    <li><a href="#">blog<i className={classNames("fa fa-angle-down", styles.iconStyles)}/></a>
                        <ul className={styles.mobileDropdownMenu}>
                            <li>
                                <a href="#">Ultimate Naming Guide</a>
                            </li>
                            <li><a href="#">Poetic Devices
                                in Business Naming</a></li>
                            <li><a href="#">Crowded Bar Theory</a></li>
                            <li className={styles.divider}/>
                            <li><a href="#">All Articles</a></li>
                        </ul>
                    </li>
                    <li><a href="#">login / sign up</a></li>
                </ul>
            </div>
            <button className={styles.togglerMenu} onClick={()=> setIsOpen(!isOpen)}>
                <hr/>
                <hr/>
                <hr/>
            </button>
        </section>
    );
};



export default HeaderBottomSection;