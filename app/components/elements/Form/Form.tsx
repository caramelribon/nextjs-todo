import styles from "./Form.module.scss";
import classNames from "classnames";
import { FormProps } from "./Form.types";

const Form = (props: FormProps) => {
  const { className, label = "メモ", ...rest } = props;

  return (
    <div className={classNames(styles.form, className)}>
      <label
        className={classNames(
          styles.label,
          label === "メモ" ? "" : styles.label__width
        )}
      >
        {label}
      </label>
      <input type="text" className={styles.input} {...rest} />
    </div>
  );
};

export default Form;
