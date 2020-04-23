import React from 'react';

const Article = (props) => {
    return (

        <article>
            <h2 className={props.headerArticle}>{props.header}</h2>
            <p className={props.article}>{props.text}</p>
        </article>


    );
};



export default Article;