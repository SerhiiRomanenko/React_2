import styles from "./ErrorRoute.module.scss";

import { STATUS_MESSAGES } from "../../utils/constants";

export default function ErrorRoute() {
  return (
    <div className={styles.errorRoute}>
      <h2 className={styles.errorRoute__message}>
        {STATUS_MESSAGES.NOT_FOUND}
      </h2>
    </div>
  );
}
