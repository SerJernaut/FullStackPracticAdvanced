import React from "react";
import styles from "./ContestBlock.module.scss";
import { Link } from "react-router-dom";
import { mdiLightbulbOutline } from "@mdi/js";
import Icon from "@mdi/react";

const ContestBlock = (props) => {
  return (
    <div className={styles.contestContainer}>
      <span>
        Ready to get started? Launch a contest and start receiving submissions
        instantly.
      </span>

      <button>
        <Link>
          <Icon path={mdiLightbulbOutline} title="Bulb Outline" size={"12px"} />
        </Link>
      </button>
    </div>
  );
};

export default ContestBlock;
