import React, { FC } from 'react';
import styles from './footer.module.css';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className={styles.footer}>
    <p className={styles.footerInfo}>Footer</p>
  </footer>
);

export default Footer;
