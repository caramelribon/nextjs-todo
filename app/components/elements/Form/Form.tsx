import styles from "./Form.module.scss";
import classNames from "classnames";
import { FormProps } from "./Form.types";

const Form = (props: FormProps) => {
  const { className, label = "メモ", ...rest } = props;

  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        className={classNames(styles.input, className)}
        {...rest}
      />
    </div>
  );
};

export default Form;
