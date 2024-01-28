import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './event-form.module.css';

interface EventFormProps {
  name: string; nameError: string;
  type: string; typeError: string;
  organizer: string; organizerError: string;
  place: string; placeError: string;
  maxParticipants: number; maxParticipantsError: string;
  date: string; dateError: string;
  price: number; priceError: string;
  setName: Dispatch<SetStateAction<string>>;
  setNameError: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
  setTypeError: Dispatch<SetStateAction<string>>;
  setOrganizer: Dispatch<SetStateAction<string>>;
  setOrganizerError: Dispatch<SetStateAction<string>>;
  setPlace: Dispatch<SetStateAction<string>>;
  setPlaceError: Dispatch<SetStateAction<string>>;
  setMaxParticipants: Dispatch<SetStateAction<number>>;
  setMaxParticipantsError: Dispatch<SetStateAction<string>>;
  setDate: Dispatch<SetStateAction<string>>;
  setDateError: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
  setPriceError: Dispatch<SetStateAction<string>>;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [ dateInputType, setDateInputType ] = useState('text');
  
  const nameInputChange = (name: string) => {
    props.setName(name); 
    if(name.length === 0) props.setNameError('Nazwa wydarzenia jest wymagana');
    else if (name.length > 30) props.setNameError('Nazwa wydarzenia nie może przekraczać 30 znaków');
    else props.setNameError('');
  }

  const typeInputChange = (type: string) => {
    props.setType(type); 
    if(type.length === 0) props.setTypeError('Rodzaj jest wymagany');
    else if (type.length > 30) props.setTypeError('Rodzaj nie może przekraczać 30 znaków');
    else props.setTypeError('');
  }

  const organizerInputChange = (organizer: string) => {
    props.setOrganizer(organizer); 
    if(organizer.length === 0) props.setOrganizerError('Organizator jest wymagany');
    else if (organizer.length > 30) props.setOrganizerError('Organizator nie może przekraczać 30 znaków');
    else props.setOrganizerError('');
  }

  const placeInputChange = (place: string) => {
    props.setPlace(place); 
    if(place.length === 0) props.setPlaceError('Miejsce wydarzenia jest wymagane');
    else if (place.length > 30) props.setPlaceError('Miejsce wydarzenia nie może przekraczać 30 znaków');
    else props.setPlaceError('');
  }

  const maxParticipantsInputChange = (maxParticipants: number) => {
    props.setMaxParticipants(maxParticipants); 
    if(!maxParticipants) props.setMaxParticipantsError('Maksymalna ilość uczestników jest wymagana');
    else if (maxParticipants < 0) props.setMaxParticipantsError('Maksymalna ilość uczestników nie może być ujemna');
    else if (maxParticipants > 10000) props.setMaxParticipantsError('Maksymalna ilość uczestników to 10000');
    else props.setMaxParticipantsError('');
  }

  const dateInputChange = (date: string) => {
    props.setDate(date); 
    if(!date) {
      props.setDateError('Data wydarzenia jest wymagana');
    } else {
      if (new Date(date) < new Date()) props.setDateError('Data wydarzenia nie może być wcześniejsza niż dzisiejsza');
      else props.setDateError('');
    }
  }

  const priceInputChange = (price: number) => {
    props.setPrice(price); 
    if(!price) props.setPriceError('Cena biletu jest wymagana');
    else if (price < 0) props.setPriceError('Cena biletu nie może być ujemna');
    else props.setPriceError('');
  }

  return (
    <div className={styles.eventFContainer}>
      <input className={`${styles.formInput} ${props.nameError && styles.error}`} placeholder="Nazwa wydarzenia" value={props.name} onChange={(e) => nameInputChange(e.target.value)}/>
        {props.nameError && <span className={styles.formError}>{props.nameError}</span>}

      <input className={`${styles.formInput} ${props.typeError && styles.error}`} placeholder="Rodzaj wydarzenia" value={props.type} onChange={(e) => typeInputChange(e.target.value)}/>
        {props.typeError && <span className={styles.formError}>{props.typeError}</span>}

      <input className={`${styles.formInput} ${props.organizerError && styles.error}`} placeholder="Organizator wydarzenia" value={props.organizer} onChange={(e) => organizerInputChange(e.target.value)}/>
        {props.organizerError && <span className={styles.formError}>{props.organizerError}</span>}

      <input className={`${styles.formInput} ${props.placeError && styles.error}`} placeholder="Miejsce wydarzenia" value={props.place} onChange={(e) => placeInputChange(e.target.value)}/>
        {props.placeError && <span className={styles.formError}>{props.placeError}</span>}

      <input className={`${styles.formInput} ${props.maxParticipantsError && styles.error}`} type="number" placeholder="Maks. ilość osób" value={props.maxParticipants} onChange={(e) => maxParticipantsInputChange(Number(e.target.value))}/>
        {props.maxParticipantsError && <span className={styles.formError}>{props.maxParticipantsError}</span>}

      <input className={`${styles.formInput} ${props.dateError && styles.error}`} value={props.date} onChange={(e) => dateInputChange(e.target.value)} placeholder="Data wydarzenia" type={dateInputType} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')}/>
        {props.dateError && <span className={styles.formError}>{props.dateError}</span>}

      <input className={`${styles.formInput} ${props.priceError && styles.error}`} type="number" placeholder="Cena biletu" value={props.price} onChange={(e) => priceInputChange(Number(e.target.value))}/>
        {props.priceError && <span className={styles.formError}>{props.priceError}</span>}
    </div>
  );
};

export default EventForm;

