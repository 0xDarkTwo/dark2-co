import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Menu() {
  if (typeof window !== "undefined") {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  return (
    <>
      <Head>
        <title>Dark&#178; - Projects</title>
        <meta name="description" content="Do Things Differently." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className={inter.className}>
        <div className={styles.right}>
          <a href="/">
            <p className={styles.clickable}>[Index]</p>
          </a>
        </div>
      </main>
    </>
  );
}