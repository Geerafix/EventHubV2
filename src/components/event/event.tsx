import React, { FC } from 'react';
import styles from './event.module.css';

interface EventProps {}

const Event: FC<EventProps> = () => (
  <div className={styles.Event}>
    <div className="main-container">
      <div className="control-container">
        <div className="search-container">
          <input placeholder="Wyszukaj" id="search"/>
          <select>
            <option value="nazwa">Nazwa</option>
            <option value="rodzaj">Rodzaj</option>
            <option value="miejsce">Miejsce</option>
          </select>
          <input className="date" placeholder="Data początk." type="text"/>
          <input className="date" placeholder="Data końcowa" type="text"/>
          {/* <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eraser-fill" viewBox="0 0 16 16"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/></svg></button> */}
        </div>
          <button id="add-event-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg></button>
        </div>
      {/* <div>
        <h2 className="title"></h2>
        <label><span className="info">Rodzaj: </span> </label>
        <label><span className="info">Miejsce: </span> </label>
        <label><span className="info">Data wydarzenia: </span> </label>
        <div className="interact">
          <a >Szczegóły</a>
          <a >Kup bilet</a>
        </div>
      </div> */}
    </div>
    {/* <div class="main-container" *ngIf="isAddEvent() || isBuyTicket() || isEventDetails() || isEditEvent()">
      <router-outlet></router-outlet>
    </div> */}
  </div>
);

export default Event;
