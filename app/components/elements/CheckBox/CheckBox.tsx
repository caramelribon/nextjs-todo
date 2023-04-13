import styles from "./CheckBox.module.scss";
import classNames from "classnames";
import { CheckBoxProps } from "./CheckBox.types";

const CheckBox = (props: CheckBoxProps) => {
  const { className, isChecked = false, ...rest } = props;
  return (
    <label className={classNames(className, styles.checkbox)}>
      <input
        type="checkbox"
        checked={isChecked}
        className={classNames(className, styles.checkbox__input)}
        {...rest}
      />
      <span className={classNames(className, styles.checkbox__span)}></span>
    </label>
  );
};

export default CheckBox;
