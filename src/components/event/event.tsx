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
  const [ filterBy, setFilterBy ] = useState<string>('');
  const [ startDate, setStartDate ] = useState<string>('');
  const [ endDate, setEndDate ] = useState<string>('');
  const [ startDateType, setStartDateType ] = useState<string>('text');
  const [ endDateType, setEndDateType ] = useState<string>('text');

  useEffect(() => {
    if (search === '' && filterBy === '' && startDate === '' && endDate === '') {
      eds.getData().then(({ events }) => { setEventList(events); });
    }
    document.title = "Strona główna";
  }, [endDate, filterBy, search, startDate]);

  const clearFilter = () => {
    setSearch('');
    setFilterBy('');
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
            <select className={styles.optionC} onChange={(el) => setFilterBy(el.target.value)} value={filterBy}>
              <option value="" disabled>Sortuj po</option>
              <option value="nazwa">Nazwa</option>
              <option value="rodzaj">Rodzaj</option>
              <option value="miejsce">Miejsce</option>
            </select>
            <input className={styles.date} placeholder="Data początk." type={startDateType} value={startDate} onChange={(el) => setStartDate(el.target.value)} onFocus={() => setStartDateType('date')} onBlur={() => setStartDateType('text')}/>
            <input className={styles.date} placeholder="Data końcowa" type={endDateType} value={endDate} onChange={(el) => setEndDate(el.target.value)} onFocus={() => setEndDateType('date')} onBlur={() => setEndDateType('text')}/>
            <button className={styles.handleBtn} onClick={() => handleFilter()} hidden={!search && !startDate && !endDate && filterBy === ''}>Szukaj <Search/></button>
            <button className={styles.handleBtn} onClick={() => clearFilter()}>Czyść <EraserFill/></button>
          </div>
          <Link to="/dodaj-wydarzenie">
            <button className={styles.addButton}>Dodaj <PlusLg/></button>
          </Link>
        </div> 
        {eventList.map((event, i) => (
          <div key = { i } className={styles.eventDataMain}>
            <h2 className={styles.title}>{event._nazwa}</h2>
            <span><span className={styles.info}>Rodzaj: </span>{event._rodzaj}</span>
            <span><span className={styles.info}>Miejsce: </span>{event._miejsce}</span>
            <span><span className={styles.info}>Data wydarzenia: </span>{event._data_wydarzenia.toISOString().split('T')[0]}</span>
            <div className={styles.interact}>
              <Link className={styles.link} to={`/szczegoly/${ event._id }`}>Szczegóły wydarzenia <InfoCircle/></Link>
              <Link to={`/kup-bilet/${ event?._id }`} hidden={event?._max_ilosc_osob === event?._uczestnicy.length} className={styles.link}>Kup bilet <Cart/></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventComponent;
