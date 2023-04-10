"use client";
import { Form, Button, Main, Title } from "../components";
import styles from "./page.module.scss";
import Link from "next/link";

const SignUp = () => {
  return (
    <Main>
      <div className={styles.signup__wrapper}>
        <Title title="アカウント登録" tag="h1" />
        <div className={styles.signup__form}>
          <Form label="メールアドレス" type="email" autoComplete="email" />
          <Form
            className={styles.mt16}
            label="パスワード"
            type="password"
            autoComplete="password"
          />
          <Form className={styles.mt16} label="名前" type="name" />
          <Button className={styles.mt48} size="large" color="blue">
            アカウント登録
          </Button>
          <p className={styles.mt48}>
            既にアカウントをお持ちの方は
            <Link className={styles.link} href="/login">
              こちら
            </Link>
          </p>
        </div>
      </div>
    </Main>
  );
};
export default SignUp;
