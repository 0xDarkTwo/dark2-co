"use client"

import { useState } from 'react';
import Modal from 'react-modal';
import styles from './projects.module.css'

export default function Projects() {
    const [open, setOpen] = useState(false);

    const customStyles = {
        content: {
          zIndex: 101,
          top: 'auto',
          left: '50%',
          right: 'auto',
          bottom: '0%',
          marginRight: '-50%',
          transform: 'translate(-50%, 0%)',
          'border-radius': '0px',
          'border-top-left-radius': '30px',
          'border-top-right-radius': '30px',
          'border-color': '#222222',
          'border-width': '2px',
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'space-between',
          'align-items': 'center',
          'font-weight': '500',
          height: '160px',
          width: '100%',
          padding: '20px',
          background: '#151724',
          color: 'white',
          'box-shadow': '0 0 10px rgba(0, 0, 0, 0.6)'
        },
        overlay: {zIndex: 100}
    };

    function openMenu() {
        setOpen(true)
    }

    function closeMenu() {
        setOpen(false)
    }
    return (
        <>
            <p className={styles.clickable} onClick={openMenu}>[Projects]</p>
            <Modal
                isOpen={open}
                onRequestClose={closeMenu}
                style={customStyles}
                closeTimeoutMS={200}
                ariaHideApp={false}
            >
                <a href='/'>Solutions</a>
                <a href='/'>Documentation</a>
                <a href='/'>Request Quote</a>
            </Modal>
        </>
    )
}