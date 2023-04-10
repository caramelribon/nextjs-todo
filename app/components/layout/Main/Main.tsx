import styles from "./main.module.scss";
import { MainProps } from "./Main.types";

const Main = (props: MainProps) => {
  const { children } = props;
  return <main className={styles.main}>{children}</main>;
};

export default Main;
