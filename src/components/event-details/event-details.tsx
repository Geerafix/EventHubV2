import React, { FC, useEffect, useState } from 'react';
import styles from './event-details.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Event from '../../models/Event';
import PlanList from '../plan-list/plan-list';
import eds from '../../services/event-data-service/event-data-service';
import Back from '../back/back';

interface EventDetailsProps {}

const EventDetails: FC<EventDetailsProps> = () => {
  let { id } = useParams();
  const [ event, setEvent ] = useState<Event>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      eds.getSingleData(parseInt(id)).then(({ event }) => { setEvent(event); });
    }
  }, [id]);

  const deleteEvent = () => {
    if (event) {
      eds.deleteData(event._id);
      navigate('/');
    }
  };

  return (
    <div className={styles.EventDetails}>
      <div className={styles.mainContainer}>
        <Back/>
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
            <span onClick={deleteEvent} className={`${styles.link} ${styles.deleteButton}`}>Usuń</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
