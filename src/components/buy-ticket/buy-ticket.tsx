import React, { FC, useEffect, useState } from 'react';
import styles from './buy-ticket.module.css';
import { useParams } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import Event from '../../models/Event';
import { Participant } from '../../models/Participant';
import { useForm } from 'react-hook-form';
import Back from '../back/back';

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
  }, [id])

  return (
    <div className={styles.BuyTicket}>
      <div className={styles.mainContainer}>
        <Back/>
        <div className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <form className={styles.buyTicketFormContainer} >
            <label >Formularz kupowania biletu na:</label>
            <label><b>{event?._nazwa}</b></label>

            <input className={styles.formInput} {...register("imie", { required: true, maxLength: 30 })} type="text" placeholder="Imię"/>
            {errors.imie && errors.imie.type === 'required' && <span className={styles.formError}>To pole jest wymagane</span>}
            {errors.imie && errors.imie.type === 'maxLength' && <span className={styles.formError}>Imię może mieć maks. 30 znaków</span>}

            <input className={styles.formInput} {...register("nazwisko", { required: true, maxLength: 30 })} type="text" placeholder="Nazwisko"/>
            {errors.nazwisko && errors.nazwisko.type === 'required' && <span className={styles.formError}>To pole jest wymagane</span>}
            {errors.nazwisko && errors.nazwisko.type === 'maxLength' && <span className={styles.formError}>Nazwisko może mieć maks. 30 znaków</span>}

            <input className={styles.formInput} {...register("data_urodzenia", { required: true, maxLength: 30 })} type="date" placeholder="Data urodzenia"/>
            {errors.data_urodzenia && errors.data_urodzenia.type === 'required' && <span className={styles.formError}>To pole jest wymagane</span>}
            {/* {errors.data_urodzenia && isAdult(errors.data_urodzenia) && <span className={styles.formError}>Musisz mieć ukończone 18 lat</span>} */}

            <input className={styles.formInput} {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/ })} type="text" placeholder="E-mail"/>
            {errors.email && errors.email.type === 'required' && <span className={styles.formError}>To pole jest wymagane</span>}
            {errors.email && errors.email.type === 'pattern' && <span className={styles.formError}>Nieprawidłowy e-mail</span>}

            <input className={styles.formInput} {...register("nr_telefonu", { required: true, pattern: /^[0-9]{9}$/ })} type="number" placeholder="Numer telefonu"/>
            {errors.nr_telefonu && errors.nr_telefonu.type === 'required' && <span className={styles.formError}>To pole jest wymagane</span>}
            {errors.nr_telefonu && errors.nr_telefonu.type === 'pattern' && <span className={styles.formError}>Nieprawidłowy numer telefonu</span>}

            <button type="submit">Kup bilet</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
