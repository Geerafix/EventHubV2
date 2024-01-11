import React, { FC } from 'react';
import styles from './buy-ticket.module.css';
import { Link } from 'react-router-dom';

interface BuyTicketProps {}

const BuyTicket: FC<BuyTicketProps> = () => {
  return (
    <div className={styles.BuyTicket}>
      <div className={styles.mainContainer}>
        <Link to="/">
          <button className={styles.backButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
        </Link>
        <div className={styles.formContainer}>
          <form className={styles.buyTicketFormContainer} >
            <label >Formularz kupowania biletu na:</label>
            <input className={styles.formInput} name="imie" type="text" placeholder="Imię"/>

            <input className={styles.formInput} name="nazwisko" type="text" placeholder="Nazwisko"/>

            <input className={styles.formInput} name="data_urodzenia" type="text" placeholder="Data urodzenia"/>

            <input className={styles.formInput} name="email" type="email" placeholder="E-mail"/>

            <input className={styles.formInput} name="nr_telefonu" type="number" placeholder="Numer telefonu"/>

            <button type="submit">Kup bilet</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
