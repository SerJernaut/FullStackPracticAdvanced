import React, {useState} from 'react';
import buttonsData from './buttonsData.json'
import ContestButton from "../ContestButton/ContestButton";
import styles from './ButtonGroup.module.sass';

const ButtonGroup = () => {
    const [selectedButtonId, setSelectedButtonId] = useState(1);
    return (
        <div className={styles.buttonGroupContainer}>
            {buttonsData.map((buttonData, index)=> (
                <ContestButton key={index} index={index} selectedButtonId={selectedButtonId} setSelectedButtonId={setSelectedButtonId} {...buttonData}/>
            ))
            }
        </div>
    );
};

export default ButtonGroup;