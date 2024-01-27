import React, { FC } from 'react';
import styles from './footer.module.css';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <footer className={styles.footer}>
    <div className={styles.footerInfo}>
      <h3>Odwiedź też:</h3>
      <a href="https://www.facebook.com"><img className={styles.icon} src="fb.png" alt='logo Facebook'/></a>
      <a href="https://www.instagram.com"><img className={styles.icon} src="ig.png" alt='logo Instagram'/></a>
      <a href="https://www.x.com"><img className={styles.icon} src="x.png" alt='logo X'/></a>
    </div>
  </footer>
);

export default Footer;
