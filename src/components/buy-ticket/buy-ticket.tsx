import React, { FC, useEffect, useState } from 'react';
import styles from './buy-ticket.module.css';
import { Link, useParams } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import Event from '../../models/Event';
import { Participant } from '../../models/Participant';
import { useForm } from 'react-hook-form';

interface BuyTicketProps {}

const BuyTicket: FC<BuyTicketProps> = () => {
  let { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (participant: any) => {
    const newParticipant: Participant = {
      ...participant
    }
    
    setEvent((prevEvent: any) => ({
      ...prevEvent,
      uczestnicy: [...prevEvent.uczestnicy, newParticipant]
    }));

    eds.putData(event)
  };

  useEffect(() => {
    if (id) {
      eds.getSingleData(parseInt(id)).then(({ event }) => { setEvent(event); });
    }
  }, [id]);

  
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
        <div className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <form className={styles.buyTicketFormContainer} >
            <label >Formularz kupowania biletu na:</label>
            <label><b>{event?._nazwa}</b></label>
            <input className={styles.formInput} {...register("imie", { required: true, maxLength: 30 })} type="text" placeholder="Imię"/>

            <input className={styles.formInput} {...register("nazwisko", { required: true, maxLength: 30 })} type="text" placeholder="Nazwisko"/>

            <input className={styles.formInput} {...register("data_urodzenia", { required: true, maxLength: 30 })} type="text" placeholder="Data urodzenia"/>

            <input className={styles.formInput} {...register("email", { required: true, maxLength: 30 })} type="email" placeholder="E-mail"/>

            <input className={styles.formInput} {...register("nr_telefonu", { required: true, maxLength: 30 })} type="number" placeholder="Numer telefonu"/>

            <button type="submit">Kup bilet</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
