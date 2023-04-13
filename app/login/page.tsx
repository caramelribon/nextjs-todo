"use client";
import { Form, Button, Main, Title } from "../components";
import styles from "./page.module.scss";
import Link from "next/link";
import userFunc from "../../src/repository/user";
import { useState, useEffect } from "react";
import { User } from "../types/User.types";
import { FirebaseError } from "firebase/app";
import { useAuthContext } from "@/src/context/authContext";
import { useRouter } from "next/navigation";

const LogIn = () => {
  // userの状態管理
  const { user } = useAuthContext();
  const router = useRouter();

  // ログインフォームの状態管理
  const [userData, setUserData] = useState<Omit<User, "id" | "name">>({
    email: "",
    password: "",
  });

  // エラーメッセージの状態管理
  const [error, setError] = useState("");


  // ログインしている場合はトップページに遷移
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  // フォームの状態を変更(メールアドレス)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
  };

  // フォームの状態を変更(パスワード)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value });
  };

  // ログイン処理
  const userSignIn = async () => {
    // バリデーションチェック
    if (
      !userData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setError("メールアドレスの形式が正しくありません");
    }
    if (!userData.password.length) {
      setError("パスワードを入力してください");
    }
    if (error !== "") {
      alert(error);
      return;
    }

    try {
      await userFunc.signIn(userData.email, userData.password);
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
