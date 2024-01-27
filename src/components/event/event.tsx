import React, { FC, useEffect, useState } from 'react';
import styles from './event.module.css';
import Event from '../../models/Event';
import { Link } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import { PlusLg, EraserFill, Search, Cart, InfoCircle } from 'react-bootstrap-icons';

interface EventProps {}

const EventComponent: FC<EventProps> = () => {
  const [ eventList, setEventList ] = useState<Event[]>([]);
  const [ search, setSearch ] = useState<string>('');
  const [ filterBy, setFilterBy ] = useState<string>('nazwa');
  const [ startDate, setStartDate ] = useState<string>('');
  const [ endDate, setEndDate ] = useState<string>('');
  const [ startDateType, setStartDateType ] = useState<string>('text');
  const [ endDateType, setEndDateType ] = useState<string>('text');

  useEffect(() => {
    eds.getData().then(({ events }) => { setEventList(events); });
  }, []);

  const clearFilter = () => {
    setSearch('');
    setFilterBy('nazwa');
    setStartDate('');
    setEndDate('');
    eds.getData().then(({ events }) => { setEventList(events); });
  };

  const handleFilter = () => {
    let filteredEvents = eventList;
    const searchField = filterBy as keyof Event;
    if (search !== '') {
      filteredEvents = filteredEvents.filter((event: Event) => {
        return event[searchField].toString().toLowerCase().includes(search.toLowerCase());
      });
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredEvents = filteredEvents.filter((event: Event) => {
        let eventDate = new Date(event._data_wydarzenia);
        return eventDate >= start && eventDate <= end;
      })
    }
    setEventList(filteredEvents);
  }

  return (
    <div className={styles.event}>
      <div className={styles.mainContainer}>
        <div className={styles.controlContainer}>
          <div className={styles.searchContainer}>
            <input placeholder="Wyszukaj" className={styles.search} value={search} onChange={(el) => setSearch(el.target.value)}/>
            <select value={filterBy} onChange={(el) => setFilterBy(el.target.value)}>
              <option value="nazwa">Nazwa</option>
              <option value="rodzaj">Rodzaj</option>
              <option value="miejsce">Miejsce</option>
            </select>
            <input className={styles.date} placeholder="Data początk." type={startDateType} value={startDate} onChange={(el) => setStartDate(el.target.value)} onFocus={() => setStartDateType('date')} onBlur={() => setStartDateType('text')}/>
            <input className={styles.date} placeholder="Data końcowa" type={endDateType} value={endDate} onChange={(el) => setEndDate(el.target.value)} onFocus={() => setEndDateType('date')} onBlur={() => setEndDateType('text')}/>
            <button className={styles.handleBtn} onClick={() => handleFilter()} hidden={!search && !startDate && !endDate && filterBy === 'nazwa'}><Search/></button>
            <button className={styles.handleBtn} onClick={() => clearFilter()} hidden={!search && !startDate && !endDate && filterBy === 'nazwa'}><EraserFill/></button>
          </div>
          <Link to="/dodaj-wydarzenie">
            <button className={styles.addEventButton}><PlusLg/></button>
          </Link>
        </div>
        {eventList.map((event, i) => (
          <div key = { i } className={styles.eventData}>
            <h2 className={styles.title}>{event._nazwa}</h2>
            <label><span className={styles.info}>Rodzaj: </span>{event._rodzaj}</label>
            <label><span className={styles.info}>Miejsce: </span>{event._miejsce}</label>
            <label><span className={styles.info}>Data wydarzenia: </span>{event._data_wydarzenia.toISOString().split('T')[0]}</label>
            <div className={styles.interact}>
              <Link className={styles.link} to={`/szczegoly/${ event._id }`}>Szczegóły <InfoCircle/></Link>
              <Link className={styles.link} to={`/kup-bilet/${ event._id }`}>Kup bilet <Cart/></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventComponent;
