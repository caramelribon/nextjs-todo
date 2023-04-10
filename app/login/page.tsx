"use client";
import { Form, Button, Main, Title } from "../components";
import styles from "./page.module.scss";
import Link from "next/link";

const LogIn = () => {
  return (
    <Main>
      <div className={styles.login__wrapper}>
        <Title title="ログイン" tag="h1" />
        <div className={styles.login__form}>
          <Form label="メールアドレス" type="email" autoComplete="email" />
          <Form
            className={styles.mt16}
            label="パスワード"
            type="password"
            autoComplete="password"
          />
          <Button className={styles.mt48} size="large" color="blue">
            ログイン
          </Button>
          <p className={styles.mt48}>
            まだアカウントお持ちでない方は<Link className={styles.link} href="/signup">こちら</Link>
          </p>
        </div>
      </div>
    </Main>
  );
};
export default LogIn;
