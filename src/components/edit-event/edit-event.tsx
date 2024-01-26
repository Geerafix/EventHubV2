import React, { FC, useEffect, useState } from 'react';
import styles from './edit-event.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import { Plan } from '../../models/Plan';
import Back from '../back/back';
import Event from '../../models/Event';
import AddPlan from '../add-plan/add-plan';
import { Participant } from '../../models/Participant';

interface EditEventProps {}

const EditEvent: FC<EditEventProps> = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [ eventId, setEventId ] = useState<number>(0);
  const [ dateInputType, setDateInputType ] = useState('text');
  const [ name, setName ] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ type, setType ] = useState('');
  const [ typeError, setTypeError ] = useState('');
  const [ organizer, setOrganizer ] = useState('');
  const [ organizerError, setOrganizerError ] = useState('');
  const [ place, setPlace] = useState('');
  const [ placeError, setPlaceError] = useState('');
  const [ maxParticipants, setMaxParticipants ] = useState<number>(0);
  const [ maxParticipantsError, setMaxParticipantsError ] = useState('');
  const [ date, setDate ] = useState('');
  const [ dateError, setDateError ] = useState('');
  const [ price, setPrice ] = useState<number>(0);
  const [ priceError, setPriceError ] = useState('');
  const [ plan, setPlan ] = useState<Plan[]>([]);
  const [ participants, setParticipants ] = useState<Participant[]>([]);
  const [ isValid, setIsValid ] = useState(false);

  const editEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      const editedEvent: Event = new Event (
        eventId, name, type, organizer, place, maxParticipants, new Date(date), price, plan, participants);
      eds.putData(editedEvent);
      console.log(editedEvent);
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await eds.getSingleData(parseInt(id));
          const event = response.event;
          setEventId(response.event._id);
          setPlan(event._plan);
          setName(event._nazwa);
          setType(event._rodzaj);
          setOrganizer(event._organizator);
          setPlace(event._miejsce);
          setMaxParticipants(event._max_ilosc_osob);
          setDate(event._data_wydarzenia.toLocaleDateString());
          setPrice(event._cena_biletu);
          setPlan(event._plan);
          setParticipants(event._uczestnicy);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    setIsValid(
      name.length > 0 && nameError === '' &&
      type.length > 0 && typeError === '' &&
      organizer.length > 0 && organizerError === '' &&
      place.length > 0 && placeError === '' &&
      maxParticipants > 0 && maxParticipantsError === '' &&
      date.length > 0 && dateError === '' &&
      price > 0 && priceError === ''
    );
  }, [id]);
  

  const nameInputChange = (name: any) => {
    const value = name.target.value;
    setName(value); 
    if(value.length === 0) setNameError('Nazwa wydarzenia jest wymagana');
    else if (value.length > 30) setNameError('Nazwa wydarzenia nie może przekraczać 30 znaków');
    else setNameError('');
  }

  const typeInputChange = (type: any) => {
    const value = type.target.value;
    setType(value); 
    if(value.length === 0) setTypeError('Rodzaj jest wymagany');
    else if (value.length > 30) setTypeError('Rodzaj nie może przekraczać 30 znaków');
    else setTypeError('');
  }

  const organizerInputChange = (organizer: any) => {
    const value = organizer.target.value;
    setOrganizer(value); 
    if(value.length === 0) setOrganizerError('Organizator jest wymagany');
    else if (value.length > 30) setOrganizerError('Organizator nie może przekraczać 30 znaków');
    else setOrganizerError('');
  }

  const placeInputChange = (place: any) => {
    const value = place.target.value;
    setPlace(value); 
    if(value.length === 0) setPlaceError('Miejsce wydarzenia jest wymagane');
    else if (value.length > 30) setPlaceError('Miejsce wydarzenia nie może przekraczać 30 znaków');
    else setPlaceError('');
  }

  const maxParticipantsInputChange = (maxParticipants: any) => {
    const value = maxParticipants.target.value;
    setMaxParticipants(value); 
    if(value.length === 0) setMaxParticipantsError('Maksymalna ilość uczestników jest wymagana');
    else if (value > 10000) setMaxParticipantsError('Maksymalna ilość uczestników to 10000');
    else setMaxParticipantsError('');
  }

  const dateInputChange = (date: any) => {
    const value = date.target.value;
    setDate(value); 
    if(value === '') setDateError('Data wydarzenia jest wymagana');
    if (new Date(date) < new Date()) setDateError('Data wydarzenia nie może być wcześniejsza niż dzisiejsza');
    else setDateError('');
  }

  const priceInputChange = (price: any) => {
    const value = price.target.value;
    setPrice(value); 
    if(value === '') setPriceError('Cena biletu jest wymagana');
    else if (value < 0) setPriceError('Cena biletu nie może być ujemna');
    else setPriceError('');
  }
  
  return (
    <div className={styles.EditEvent}>
      <div className={styles.mainContainer}>
        <Back/>
        <div className={styles.formContainer}>
          <form className={styles.eventFormContainer} onSubmit={(e) => editEvent(e)}>
            <label>Formularz dodawania wydarzenia</label>
            <input className={styles.formInput} placeholder="Nazwa wydarzenia" value={name} onChange={nameInputChange}/>
              {nameError && <span className={styles.formError}>{nameError}</span>}
            <input className={styles.formInput} placeholder="Rodzaj wydarzenia" value={type} onChange={typeInputChange}/>
              {typeError && <span className={styles.formError}>{typeError}</span>}
            <input className={styles.formInput} placeholder="Organizator wydarzenia" value={organizer} onChange={organizerInputChange}/>
              {organizerError && <span className={styles.formError}>{organizerError}</span>}
            <input className={styles.formInput} placeholder="Miejsce wydarzenia" value={place} onChange={placeInputChange}/>
              {placeError && <span className={styles.formError}>{placeError}</span>}
            <input className={styles.formInput} type="number" placeholder="Maks. ilość osób" value={maxParticipants} onChange={maxParticipantsInputChange}/>
              {maxParticipantsError && <span className={styles.formError}>{maxParticipantsError}</span>}
            <input className={styles.formInput} type={dateInputType} value={date} onChange={dateInputChange} placeholder="Data wydarzenia" onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')}/>
              {dateError && <span className={styles.formError}>{dateError}</span>}
            <input className={styles.formInput} type="number" placeholder="Cena biletu" value={price} onChange={priceInputChange}/>
              {priceError && <span className={styles.formError}>{priceError}</span>}
            <button type="submit">Zatwierdź</button>
          </form>
          <AddPlan plan={plan} setPlan={setPlan}></AddPlan>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
