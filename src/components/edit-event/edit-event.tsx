import React, { FC } from 'react';
import styles from './edit-event.module.css';
import { Link, useParams } from 'react-router-dom';

interface EditEventProps {}

const EditEvent: FC<EditEventProps> = () => {
  let { id } = useParams();
  
  return (
    <div className={styles.EditEvent}>
      <Link to={`/szczegoly/${ id }`}>
        <button className={styles.backButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
      </Link>
      <div className={styles.formContainer}>
        <form className={styles.eventFormContainer}>
          <label>Formularz edycji wydarzenia:</label>
          <input className={styles.formInput} name="nazwa" placeholder="Nazwa wydarzenia"/>

          <input className={styles.formInput} name="rodzaj" placeholder="Rodzaj wydarzenia"/>

          <input className={styles.formInput} name="organizator" placeholder="Organizator wydarzenia"/>

          <input className={styles.formInput} name="miejsce" placeholder="Miejsce wydarzenia"/>

          <input className={styles.formInput} name="max_ilosc_osob" type="number" placeholder="Maks. ilość osób"/>

          <input className={styles.formInput} name="data_wydarzenia" type="text" placeholder="Data wydarzenia"/>

          <input className={styles.formInput} name="cena_biletu" type="number" placeholder="Cena biletu"/>

          {/* <app-add-plan [eventPlan]="eventPlan"></app-add-plan> */}

          <button type="submit">Zatwierdź</button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
