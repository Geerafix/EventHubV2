import React, { FC, useEffect, useState } from 'react';
import styles from './event-details.module.css';
import { Link, useParams } from 'react-router-dom';
import Event from '../../models/Event';
import { Plan } from '../../models/Plan';
import { Participant } from '../../models/Participant';


interface EventDetailsProps {}

const EventDetails: FC<EventDetailsProps> = () => {
  let { id } = useParams();

  const apiUrl = `http://localhost:4200/events/${ id }`;

  const [event, setEvent] = useState<Event>();

  const getSingleData = () => {
    fetch(apiUrl, {
        method: "GET",
        redirect: "follow",
      })
      .then((response) => response.json())
      .then((event) => {
        const json = new Event(
            event.id,
            event.nazwa,
            event.rodzaj,
            event.organizator,
            event.miejsce,
            event.max_ilosc_osob,
            new Date(event.data_wydarzenia),
            event.cena_biletu,
            event.plan.map((plan: any) => {
              return new Plan(
                plan.nazwa,
                plan.godz_rozpoczecia,
                plan.godz_zakonczenia
              );
            }),
            event.uczestnicy.map((participant: any) => {
              return new Participant(
                participant.imie,
                participant.nazwisko,
                participant.wiek,
                participant.email,
                participant.nr_telefonu
              );
            })
          );
        setEvent(json);
      });
  };

  useEffect(() => {
    getSingleData();
  }, [id]);

  return (
    <div className={styles.EventDetails}>
    <div>
      <Link to="/">
        <button className={styles.backButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
      </Link>
      <div className={styles.eventData}>
        <h2 className={styles.title}> {event?._nazwa}</h2>
        <h3>Szczegóły:</h3>
        <label><span className={styles.info}>Rodzaj: </span>{event?._rodzaj}</label>
        <label><span className={styles.info}>Miejsce: </span>{event?._miejsce}</label>
        <label><span className={styles.info}>Organizator: </span>{event?._organizator}</label>
        <label><span className={styles.info}>Liczba uczestników : </span>{event?._uczestnicy.length}</label>
        <label><span className={styles.info}>Maks. ilość osób: </span>{event?._max_ilosc_osob}</label>
        <label><span className={styles.info}>Data wydarzenia: </span>{event?._data_wydarzenia.toString()}</label>
        <label><span className={styles.info}>Cena biletu: </span>{event?._cena_biletu}</label>
        {/* <app-plan [eventPlan]="event._plan"></app-plan> */}
        <div className={styles.interact}>
          <Link to={`/kup-bilet/${ event?._id }`} className={styles.link}>Kup bilet</Link>
          <Link to={`/edytuj/${ event?._id }`} className={styles.link}>Edytuj</Link>
          <a className={styles.link}>Usuń</a>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EventDetails;
