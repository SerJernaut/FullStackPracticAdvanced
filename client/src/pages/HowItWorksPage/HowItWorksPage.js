import React from 'react';
import styles from './HowItWorksPage.module.sass';
import stepsArticles from './stepsArticles.json';
import questionsArticles from './questionsArticles.json';
import StartContestButton from "../../components/StartContestButton/StartContestButton";
import ReactHtmlParser from 'react-html-parser';
import GetInTouchButton from "../../components/GetInTouchButton/GetInTouchButton";
import FooterLinksTopSection from "../../components/FooterLinksTopSection/FooterLinksTopSection";
import FooterLinksBottomSection from "../../components/FooterLinksBottomSection/FooterLinksBottomSection";
import PageFooter from "../../components/PageFooter/PageFooter";
import PageHeader from "../../components/PageHeader/PageHeader";
import HeaderTopSection from "../../components/HeaderTopSection/HeaderTopSection";
import HeaderBottomSection from "../../components/HeaderBottomSection/HeaderBottomSection";

const HowItWorksPage = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <PageHeader>
                    <HeaderTopSection/>
                    <HeaderBottomSection/>
                </PageHeader>
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
                        <h1>
                            how does squadhelp work?
                        </h1>
                        <p>
                            Squadhelp allows you to host branding competitions to engage with the most creative people
                            across the globe and get high-quality results, fast. Thousands of creatives compete with each
                            other, suggesting great name ideas. At the end of the collaborative contest, you select one
                            winner. The winner gets paid, and you get a strong brand name that will help you succeed! It's
                            quick, simple, and costs a fraction of an agency.
                        </p>
                    </div>
                </section>
                <section className={styles.howItWorksSteps}>
                    <h2>5 simple steps</h2>
                    <div className={styles.howItWorksStepsContainer}>
                        {stepsArticles.map(({id, name, description}, index) => (
                                <article key={index} className={styles.howItWorksStepItem}>
                                    <div className={styles.stepCircle}>{id}</div>
                                    <h2>{name}</h2>
                                    <p>{description}</p>
                                </article>
                            )
                        )}
                    </div>
                </section>
                <section className={styles.startContestBlock}>
                    <StartContestButton/>
                </section>
                <section>
                    <div className={styles.frequentlyAskedQuestionsHeaderContainer}>
                        <header className={styles.frequentlyAskedQuestionsHeader}>
                            <div className={styles.questionCircle}>?</div>
                            <h2>
                                frequently asked questions
                            </h2>
                        </header>
                    </div>
                    <div className={styles.frequentlyAskedQuestionsContainer}>
                        {questionsArticles.map(({question, description}, index) => (
                                <article key={index} className={styles.questionContainer}>
                                    <h3>{question}</h3>
                                    <div>{ReactHtmlParser(description)}</div>
                                </article>
                            )
                        )
                        }
                    </div>
                </section>
                <section className={styles.getInTouchBlock}>
                    <div className={styles.envelopeIcon}>
                        <i className="far fa-envelope" aria-hidden="true"/>
                    </div>
                    <div className={styles.helpContainer}>
                        <h3>Questions?</h3>
                        <p>
                            Check out our <a href=''>FAQs</a> or send us a <a href=''>message</a>. For assistance with launching a contest, you can also call us at (877)&nbsp;355-3585 or schedule a <a href=''>Branding Consultation</a>
                        </p>
                    </div>
                    <GetInTouchButton/>
                </section>
                <PageFooter>
                    <FooterLinksTopSection/>
                    <FooterLinksBottomSection/>
                </PageFooter>
            </div>
            </div>

    );
};


export default HowItWorksPage;