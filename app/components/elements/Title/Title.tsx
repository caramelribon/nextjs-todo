import styles from "./Title.module.scss";
import { TitleProps } from "./Title.types";
import classNames from "classnames";

const Title = (props: TitleProps) => {
  const { title, tag, className } = props;
  return tag === "h1" ? (
    <h1 className={classNames(styles.title__h1, className)}>{title}</h1>
  ) : (
    <h2 className={classNames(styles.title__h2, className)}>{title}</h2>
  );
};

export default Title;
