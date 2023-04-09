import styles from "./RadioButton.module.scss";
import classNames from "classnames";
import { RadioButtonProps } from "./RadioButton.types";

const RadioButton = (props: RadioButtonProps) => {
  const { className, label, value, checked, onChange, ...rest } = props;

  return (
    <label className={classNames(styles.radio, className)}>
      <input
        type="radio"
        value={value}
        checked={checked}
        className={styles.radio__input}
        onChange={onChange}
        {...rest}
      />
      <span className={styles.radio__span}></span>
      {label}
    </label>
  );
};

export default RadioButton;
