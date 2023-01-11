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

export async function getServerSideProps() {
  async function getEthGas() {
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({id: 1, jsonrpc: '2.0', method: 'eth_gasPrice'}),
        next: { revalidate: 300 } 
    };
    const res = await (await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`, options, )).json()
    return Math.floor(parseInt(res.result, 16)/1000000000);
  }
  
  async function getEthBlock() {
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({id: 1, jsonrpc: '2.0', method: 'eth_blockNumber'}),
        next: { revalidate: 300 } 
    };
    const res = await (await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`, options)).json()
    return parseInt(res.result, 16);
  }

  return {
    props: {
      ethBlock: await getEthBlock(),
      ethGas: await getEthGas()
    },
  };
}

export default function Home({ethBlock, ethGas}: ethData) {

  const Model = () => {
    const ref: { current: any | null } = useRef()
    useFrame((state) => {
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / -5, 0.05)
        ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 5, 0.05)
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
        <ambientLight intensity={0.8} />
        <directionalLight castShadow position={[0, 12, 12]} intensity={5} />
        <Model/>
      </Canvas>
    )
  }

  return (
    <>
      <Head>
        <title>Dark&#178;</title>
        <meta content="width=device-width, height=device-height, initial-scale=1.1" name="viewport" />
        <meta name="description" content="I think therefore I am." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
      </Head>
      <main className={inter.className}>
      <div className={styles.bg}>
        <Scene />
      </div>
      <div className={styles.fg}>
        <h1>Dark Two</h1>
        <p>Do things differently.</p>
        <div className={styles.links}>
          <a href='https://twitter.com/0xDarkTwo' target="_blank" rel="noreferrer noopener"><Image src='/twitter.svg' alt='twitter' height={30} width={30} /></a>
          <a href='https://github.com/0xDarkTwo' target="_blank" rel="noreferrer noopener"><Image src='/github.svg' alt='github' height={30} width={30} /></a>
          <a href='https://discordapp.com/users/1034697215991619584' target="_blank" rel="noreferrer noopener"><Image src='/discord.svg' alt='metamask' height={30} width={30} /></a>
        </div>

        <div className= {styles.stats}>
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
