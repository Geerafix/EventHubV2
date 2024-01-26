import React, { FC } from 'react';
import styles from './header.module.css';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <header className={styles.header}>
    <p className={styles.headerInfo}>EventHub</p>
  </header>
);

export default Header;
