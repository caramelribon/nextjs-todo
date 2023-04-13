import styles from "./ColumTitle.module.scss";
import classNames from "classnames";

const ColumTitle = (props: { className?: string }) => {
  const { className } = props;

  return (
    <div className={classNames(styles.columTitle__wrapper, className)}>
      <p className={styles.date__title}>作業日時</p>
      <p className={styles.note__title}>メモ</p>
    </div>
  );
};

export default ColumTitle;
