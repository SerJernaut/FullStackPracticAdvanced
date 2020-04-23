import React from 'react';
import Logo from '../../components/Logo';
import RegistrationForm
  from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import Article from "../../components/Article";
import articles from '../../articles';

const RegistrationPage = (props) => {
  props.clearError();



  return (
    <div className={ styles.signUpPage }>
      <div className={ styles.signUpContainer }>
        <div className={ styles.headerSignUpPage }>
          <Logo src={ `${ CONSTANTS.STATIC_IMAGES_PATH }logo.png` }/>
          <div className={ styles.linkLoginContainer }>
            <Link to='/login'
                  style={ {textDecoration: 'none'} }><span>Login</span></Link>
          </div>
        </div>
        <div className={styles.infoAboutPage}>
          <h2>
            CREATE AN ACCOUNT
          </h2>
          <h4>
            We always keep your name and email address private.
          </h4>
        </div>
        <RegistrationForm/>
      </div>
      <div className={ styles.footer }>
        <div className={ styles.articlesMainContainer }>
          <div className={styles.ColumnContainer}>
            <Article header={articles.article1.header} headerArticle={styles.headerArticle} article={styles.article} text={articles.article1.text}/>
            <Article header={articles.article2.header} headerArticle={styles.headerArticle} article={styles.article} text={articles.article2.text}/>
          </div>
          <div className={styles.ColumnContainer}>
            <Article header={articles.article3.header} headerArticle={styles.headerArticle} article={styles.article} text={articles.article3.text}/>
            <Article header={articles.article4.header} headerArticle={styles.headerArticle} article={styles.article} text={articles.article4.text}/>
            <Article header={articles.article5.header} headerArticle={styles.headerArticle} article={styles.article} text={articles.article5.text}/>
            <Article header={articles.article6.header} headerArticle={styles.headerArticle} article={styles.article} text={articles.article6.text}/>
            <article>                        <div className={styles.headerArticle}>I have other questions! How can I get in touch with
              Squadhelp?
            </div>
              <div className={styles.article}>
                Check out our <span className={styles.orangeSpan}>FAQs</span> or send us a <span
                  className={styles.orangeSpan}>message</span>. For assistance with launching a contest,
                you can also call us at (877) 355-3585 or schedule a <span
                  className={styles.orangeSpan}>Branding Consultation</span>
              </div></article>

          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => dispatch(clearErrorSignUpAndLogin()),
  };
};

export default connect(null, mapDispatchToProps)(RegistrationPage);