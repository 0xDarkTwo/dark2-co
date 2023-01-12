import { useRef } from "react";
import Head from 'next/head';
import { useFrame, Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface ethData {
  ethGas: number,
  ethBlock: number
}

export const revalidate = 300;

export async function getServerSideProps() {
  const options1 = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({id: 1, jsonrpc: '2.0', method: 'eth_gasPrice'}),
  };
  const options2 = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({id: 1, jsonrpc: '2.0', method: 'eth_blockNumber'})
  };

  const reqArr = [fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`, options1), fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`, options2)]
  const fulfilledReq = await Promise.all(reqArr)
  const jsonArr = [fulfilledReq[0].json(), fulfilledReq[1].json()]
  const fulfilled = await Promise.all(jsonArr)

  return {
    props: {
      ethGas: Math.floor(parseInt(fulfilled[0].result, 16)/1000000000),
      ethBlock: parseInt(fulfilled[1].result, 16)
    },
  };
}

export default function Home({ethBlock, ethGas}: ethData) {

  const Model = () => {
    const ref: { current: any | null } = useRef()
    useFrame((state) => {
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / -5, 0.1)
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 5, 0.1)
    })
    const gltf = useGLTF('/webgl/dark2-logo-static.gltf', true)
    return (
      <mesh
        ref={ref}
        onClick={e => console.log('click')}
        onPointerOver={e => console.log('hover')}
        onPointerOut={e => console.log('unhover')}>
        <primitive object={gltf.scene} dispose={null} scale={1} />
        <meshNormalMaterial attach="material" />
      </mesh>
    )
  }

  const Scene = () => {
    return (
      <Canvas camera={{ position: [0, 0, 20], near: 5, far: 30 }}>
        <color attach="background" args={['#1a1a1a']} />
        <directionalLight castShadow position={[0, 12, 12]} intensity={1} color={'#e5e5e5'} />
        <ambientLight intensity={0.4} color={'#e5e5e5'}/>
        <Model/>
      </Canvas>
    )
  }

  if (typeof window !== 'undefined') {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }  

  return (
    <>
      <Head>
        <title>Dark&#178;</title>
        <meta name="description" content="Do Things Differently." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
      </Head>
      <main className={inter.className}>
      <div className={styles.bg}>
        <Scene />
      </div>
      <div className={styles.fg}>
        <div className= {styles.top}>
          <h1>Dark Two</h1>
          <p>Do things differently.</p>
          <div className={styles.links}>
            <a className={styles.clickable} href='https://twitter.com/0xDarkTwo' target="_blank" rel="noreferrer noopener"><Image src='/twitter.svg' alt='twitter' height={30} width={30} /></a>
            <a className={styles.clickable} href='https://github.com/0xDarkTwo' target="_blank" rel="noreferrer noopener"><Image src='/github.svg' alt='github' height={30} width={30} /></a>
            <a className={styles.clickable} href='https://discordapp.com/users/1034697215991619584' target="_blank" rel="noreferrer noopener"><Image src='/discord.svg' alt='metamask' height={30} width={30} /></a>
          </div>
        </div>

        <div className= {styles.right}>
          <p>[Menu]</p>
        </div>

        <div className={styles.bottom}>
          <div className={styles.labels}>
            <Image src='/eth.svg' height={14} width={14} alt='ETH'/>
            <span>&nbsp;Block:&nbsp;</span>
            <br/>
            <Image src='/gas.svg' height={14} width={14} alt='GAS'/>
            <span>&nbsp;Price:&nbsp;</span>
          </div>
          <div className={styles.data}>
            <b>{ethBlock}</b>
            <br/>
            <b>{ethGas}&nbsp;Gwei</b>
            <br/>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
