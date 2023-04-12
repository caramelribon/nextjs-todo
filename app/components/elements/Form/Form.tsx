import styles from "./Form.module.scss";
import classNames from "classnames";
import { FormProps } from "./Form.types";

const Form = (props: FormProps) => {
  const { className, label = "メモ", onChange, ...rest } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  }
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
      <input type="text" className={styles.input} onChange={handleChange} {...rest} />
    </div>
  );
};

export default Form;
