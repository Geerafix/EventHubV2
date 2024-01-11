import React, { FC, useEffect, useState } from 'react';
import styles from './event-details.module.css';
import { Link, useParams } from 'react-router-dom';
import Event from '../../models/Event';
import PlanList from '../plan-list/plan-list';
import eds from '../../services/event-data-service/event-data-service';

interface EventDetailsProps {}

const EventDetails: FC<EventDetailsProps> = () => {
  let { id } = useParams();
  const [event, setEvent] = useState<Event>();

  useEffect(() => {
    if (id) {
      eds.getSingleData(parseInt(id)).then(({ event }) => { setEvent(event); });
    }
  }, [id]);

  return (
    <div className={styles.EventDetails}>
      <div className={styles.mainContainer}>
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
          <label><span className={styles.info}>Data wydarzenia: </span>{event?._data_wydarzenia.toLocaleDateString()}</label>
          <label><span className={styles.info}>Cena biletu: </span>{event?._cena_biletu}</label>
          <PlanList eventPlan={event?._plan}></PlanList>
          <div className={styles.interact}>
            <Link to={`/kup-bilet/${ event?._id }`} className={styles.link}>Kup bilet</Link>
            <Link to={`/edytuj/${ event?._id }`} className={styles.link}>Edytuj</Link>
            {/* <a className={styles.link}>Usuń</a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
