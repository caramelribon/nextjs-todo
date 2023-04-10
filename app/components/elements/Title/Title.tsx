import styles from "./Title.module.scss";
import { TitleProps } from "./Title.types";

const Title = (props: TitleProps) => {
  const { title, tag } = props;
  return tag === "h1" ? (
    <h1 className={styles.title__h1}>{title}</h1>
  ) : (
    <h2 className={styles.title__h2}>{title}</h2>
  );
};

export default Title;
