import React, { FC, useEffect, useState } from 'react';
import styles from './event-details.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Event from '../../models/Event';
import PlanList from '../plan-list/plan-list';
import eds from '../../services/event-data-service/event-data-service';
import Back from '../back/back';
import { Cart, Pen, Trash } from 'react-bootstrap-icons';

interface EventDetailsProps {}

const EventDetails: FC<EventDetailsProps> = () => {
  let { id } = useParams();
  const [ event, setEvent ] = useState<Event>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      eds.getSingleData(parseInt(id)).then(({ event }) => { setEvent(event); });
    }
    document.title = "Szczegóły wydarzenia";
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
          <h2>Szczegóły:</h2>
          <span><span className={styles.info}>Rodzaj: </span>{event?._rodzaj}</span>
          <span><span className={styles.info}>Miejsce: </span>{event?._miejsce}</span>
          <span><span className={styles.info}>Organizator: </span>{event?._organizator}</span>
          <span><span className={styles.info}>Liczba uczestników : </span>{event?._uczestnicy.length}</span>
          <span><span className={styles.info}>Maks. ilość osób: </span>{event?._max_ilosc_osob}</span>
          <span><span className={styles.info}>Data wydarzenia: </span>{event?._data_wydarzenia.toISOString().split('T')[0]}</span>
          <span><span className={styles.info}>Cena biletu: </span>{event?._cena_biletu} zł</span>
          <PlanList eventPlan={event?._plan}></PlanList>
          <div className={styles.interact}>
            <Link to={`/kup-bilet/${ event?._id }`} hidden={event?._max_ilosc_osob === event?._uczestnicy.length} className={styles.link}>Kup bilet <Cart/></Link>
            <Link to={`/edytuj/${ event?._id }`} className={styles.link}>Edytuj wydarzenie <Pen/></Link>
            <button onClick={deleteEvent} className={`${styles.link} ${styles.deleteButton}`}>Usuń wydarzenie <Trash/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
