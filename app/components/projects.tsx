"use client"

import { useState } from 'react';
import Modal from 'react-modal';
import styles from './projects.module.css'

export default function Projects() {
    const [open, setOpen] = useState(false);

    const customStyles = {
        content: {
          zIndex: 101,
          top: '0',
          left: '0',
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'top',
          'align-items': 'left',
          gap: '40px',
          'font-weight': '500',
          padding: '40px',
          color: 'rgb(229, 229, 229)',
          background: 'transparent',
          width: 'auto',
          height: 'auto',
          inset: 'unset',
          border: 'none'
        },
        overlay: {
            zIndex: 100,
            background: 'rgba(26, 26, 26, 0.97)',
            display: 'flex',
            'flex-direction': 'row',
            'justify-content': 'center',
            'align-items': 'top'
        },
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
                <a href='https://td.dark2.co' className={styles.clickable}>
                    <span>
                        <h2><b>TD</b></h2>
                        <small>A Minimalist Twitter Video Downloader</small>
                    </span>
                </a>
            </Modal>
        </>
    )
}