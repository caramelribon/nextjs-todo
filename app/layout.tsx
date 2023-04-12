import "./styles/globals.css";
import styles from "./styles/app.module.scss";
import { AuthProvider } from "../src/context/authContext";

export const metadata = {
  title: "NextJs Todo App",
  description: "Create todo app by create next app",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};
export default RootLayout;
