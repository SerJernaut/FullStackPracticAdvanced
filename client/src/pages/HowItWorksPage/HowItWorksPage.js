import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from './HowItWorksPage.module.sass';

const HowItWorksPage = () => {
    return (
        <>
            <Header/>
            <section className={styles.howItWorks}>
                <div className={styles.videoWrapper}>
                    <iframe title="Wistia video player"
                            allowFullScreen
                            frameBorder="0"
                            scrolling="no"
                            src="https://fast.wistia.net/embed/iframe/vfxvect60o"
                            width="555"
                            height="312"/>
                </div>
                <div className={styles.headerLabel}>
                    <h2>
                        how does squadhelp work?
                    </h2>
                    <p>
                        Squadhelp allows you to host branding competitions to engage with the most creative people
                        across the globe and get high-quality results, fast. Thousands of creatives compete with each
                        other, suggesting great name ideas. At the end of the collaborative contest, you select one
                        winner. The winner gets paid, and you get a strong brand name that will help you succeed! It's
                        quick, simple, and costs a fraction of an agency.
                    </p>
                </div>
            </section>
            <Footer/>
        </>
    );
};


export default HowItWorksPage;