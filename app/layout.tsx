import "./styles/globals.css";
import styles from "./styles/app.module.scss";

export const metadata = {
  title: "NextJs Todo App",
  description: "Create todo app by create next app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;
