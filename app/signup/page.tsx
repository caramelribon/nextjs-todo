"use client";
import { Form, Button, Main, Title } from "../components";
import styles from "./page.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import { User } from "../types/User.types";
import userFunc from "../../src/repository/user";
import { FirebaseError } from "firebase/app";
import { useAuthContext } from "@/src/context/authContext";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user, router]);

  const [userData, setUserData] = useState<Omit<User, "id">>({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, email: e.target.value });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, password: e.target.value });
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, name: e.target.value });
  };

  const userSignUp = async () => {
    setError("");
    if (
      !userData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setError("メールアドレスの形式が正しくありません");
      return;
    }
    if (!userData.password.length) {
      setError("パスワードを入力してください");
      return;
    }
    if (!userData.name) {
      setError("名前を入力してください");
      return;
    }

    try {
      const uid = await userFunc.signUp(userData.email, userData.password);
      if (typeof uid === "string") {
        await userFunc.setUser({ id: uid, name: userData.name });
      }
      alert("アカウント登録しました");
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/email-already-in-use") {
          setError("このメールアドレスは既に登録されています");
        }
        if (err.code === "auth/invalid-email") {
          setError("メールアドレスの形式が正しくありません");
        }
        if (err.code === "auth/weak-password") {
          setError("パスワードは6文字以上で入力してください");
        }
      } else {
        setError("アカウント登録に失敗しました");
      }
    }
  };

  return (
    <Main>
      <div className={styles.signup__wrapper}>
        <Title title="アカウント登録" tag="h1" />
        <div className={styles.signup__form}>
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
          <Form
            className={styles.mt16}
            label="名前"
            type="name"
            onChange={handleNameChange}
          />
          <p className={styles.error}>{error}</p>
          <Button
            className={styles.mt48}
            size="large"
            color="blue"
            onClick={userSignUp}
          >
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
