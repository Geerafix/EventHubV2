import React, { FC, useEffect, useState } from 'react';
import styles from './event.module.css';
import Event from '../../models/Event';
import { Link } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';

interface EventProps {}

const EventComponent: FC<EventProps> = () => {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filterBy, setFilterBy] = useState<string>('nazwa');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    eds.getData().then(({ events }) => { setEventList(events); });
  }, []);

  const clearFilter = () => {
    setSearch('');
    setFilterBy('nazwa');
    setStartDate('');
    setEndDate('');
    eds.getData().then(({ events }) => {setEventList(events);});
  };

  return (
    <div className={styles.event}>
      <div className={styles.mainContainer}>
        <div className={styles.controlContainer}>
          <div className={styles.searchContainer}>
            <input placeholder="Wyszukaj" className={styles.search} value={search} onChange={(i) => setSearch(i.target.value)}/>
            <select value={filterBy} onChange={(s) => setFilterBy(s.target.value)}>
              <option value="nazwa">Nazwa</option>
              <option value="rodzaj">Rodzaj</option>
              <option value="miejsce">Miejsce</option>
            </select>
            <input className={styles.date} placeholder="Data początk." type="text"/>
            <input className={styles.date} placeholder="Data końcowa" type="text"/>
            <button className={styles.clearBtn} onClick={() => clearFilter()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eraser-fill" viewBox="0 0 16 16"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/></svg></button>
          </div>
          <Link to="/dodaj-wydarzenie">
            <button className={styles.addEventButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg>
            </button>
          </Link>
        </div>
        {eventList.map((event, i) => (
          <div key = { i } className={styles.eventData}>
            <h2 className={styles.title}>{event._nazwa}</h2>
            <label><span className={styles.info}>Rodzaj: </span>{event._rodzaj}</label>
            <label><span className={styles.info}>Miejsce: </span>{event._miejsce}</label>
            <label><span className={styles.info}>Data wydarzenia: </span>{event._data_wydarzenia.toLocaleDateString()}</label>
            <div className={styles.interact}>
              <Link className={styles.link} to={`/szczegoly/${ event._id }`}>Szczegóły</Link>
              <Link className={styles.link} to={`/kup-bilet/${ event._id }`}>Kup bilet</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventComponent;
