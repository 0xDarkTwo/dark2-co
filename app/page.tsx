import { Suspense } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Model from "./components/model";
import Projects from "./components/projects"

async function getData() {
  const options1 = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ id: 1, jsonrpc: "2.0", method: "eth_gasPrice" }),
    next: { revalidate: 300 },
  };
  const options2 = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ id: 1, jsonrpc: "2.0", method: "eth_blockNumber" }),
    next: { revalidate: 300 },
  };
  const reqArr = [
    fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      options1
    ),
    fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      options2
    ),
  ];
  const fulfilledReq = await Promise.all(reqArr);
  const jsonArr = [fulfilledReq[0].json(), fulfilledReq[1].json()];
  const fulfilled = await Promise.all(jsonArr);

  return {
    ethGas: Math.floor(parseInt(fulfilled[0].result, 16) / 1000000000),
    ethBlock: parseInt(fulfilled[1].result, 16),
  };
}

export default async function Home() {
  const { ethBlock, ethGas } = await getData();

  const Foreground = () => {
    return (
      <div className={styles.fg}>
        <div className={styles.top}>
          <h1>Dark Two</h1>
          <p>Do things differently.</p>
          <div className={styles.links}>
            <a
              className={styles.clickable}
              href="https://twitter.com/0xDarkTwo"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src="/twitter.svg" alt="twitter" height={30} width={30} />
            </a>
            <a
              className={styles.clickable}
              href="https://github.com/0xDarkTwo"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src="/github.svg" alt="github" height={30} width={30} />
            </a>
            <a
              className={styles.clickable}
              href="https://discordapp.com/users/1034697215991619584"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image src="/discord.svg" alt="metamask" height={30} width={30} />
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <Projects/>
        </div>

        <div className={styles.bottom}>
          <div className={styles.labels}>
            <Image src="/eth.svg" height={14} width={14} alt="ETH" />
            <span>&nbsp;Block:&nbsp;</span>
            <br />
            <Image src="/gas.svg" height={14} width={14} alt="GAS" />
            <span>&nbsp;Price:&nbsp;</span>
          </div>
          <div className={styles.data}>
            <b>{ethBlock}</b>
            <br />
            <b>{ethGas}&nbsp;Gwei</b>
            <br />
          </div>
        </div>
      </div>
    );
  };

  if (typeof window != "undefined") {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  return (
    <>
      <div className={styles.bg}>
        <Suspense>
          <Model />
        </Suspense>
      </div>
      <Foreground />
    </>
  );
}
