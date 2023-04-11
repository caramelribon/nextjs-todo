"use client";
import { Form, Button, Main, Title } from "../components";
import styles from "./page.module.scss";
import Link from "next/link";
import userFunc from "../../src/repository/user";
import { useState } from "react";
import { User } from "../types/User.types";
import { FirebaseError } from "firebase/app";

const LogIn = () => {
  const [user, setUser] = useState<Omit<User, "id" | "name">>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  const userSignIn = async () => {
    // バリデーションチェック
    if (
      !user.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setError("メールアドレスの形式が正しくありません");
    }
    if (!user.password.length) {
      setError("パスワードを入力してください");
    }
    if (error !== "") {
      alert(error);
      return;
    }

    try {
      const uid = await userFunc.signIn(user.email, user.password);
      if (typeof uid === "string") {
        const userData = await userFunc.getUser(uid);
        console.log(userData);
      }
      alert("ログインしました");
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/wrong-password") {
          setError("パスワードが間違っています");
        }
        if (err.code === "auth/user-not-found") {
          setError("このメールアドレスは登録されていません");
        }
        if (err.code === "auth/invalid-email") {
          setError("メールアドレスの形式が正しくありません");
        }
      } else {
        setError("ログインに失敗しました");
      }
    }
  };

  return (
    <Main>
      <div className={styles.login__wrapper}>
        <Title title="ログイン" tag="h1" />
        <div className={styles.login__form}>
          <Form
            label="メールアドレス"
            type="email"
            autoComplete="email"
            onChange={handleEmailChange}
          />
          <Form
            className={styles.mt16}
            label="パスワード"
            type="password"
            autoComplete="password"
            onChange={handlePasswordChange}
          />
          <p className={styles.error}>{error}</p>
          <Button
            className={styles.mt48}
            size="large"
            color="blue"
            onClick={userSignIn}
          >
            ログイン
          </Button>
          <p className={styles.mt48}>
            まだアカウントお持ちでない方は
            <Link className={styles.link} href="/signup">
              こちら
            </Link>
          </p>
        </div>
      </div>
    </Main>
  );
};

export default LogIn;
