// ボタンのコンポーネントの作成
import styles from "./Button.module.scss";
import classNames from "classnames";
import { ButtonProps } from "./Button.types";

const Button = (props: ButtonProps) => {
  const {
    className,
    color = "blue",
    size = "small",
    onClick,
    children,
    ...rest
  } = props;

  return (
    <button
      type="button"
      className={classNames(
        styles.button,
        className,
        styles[color],
        styles[size]
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
