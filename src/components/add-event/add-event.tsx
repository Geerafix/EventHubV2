import React, { FC, useEffect, useState } from 'react';
import styles from './add-event.module.css';
import { Plan } from '../../models/Plan';
import AddPlan from '../add-plan/add-plan';
import eds from '../../services/event-data-service/event-data-service';
import Event from '../../models/Event';
import Back from '../back/back';
import { useNavigate } from 'react-router-dom';
import EventForm from '../event-form/event-form';

interface AddEventProps {}

const AddEvent: FC<AddEventProps> = () => {
  const navigate = useNavigate();
  const [ plan, setPlan ] = useState<Plan[]>([]);
  const [ name, setName ] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ type, setType ] = useState('');
  const [ typeError, setTypeError ] = useState('');
  const [ organizer, setOrganizer ] = useState('');
  const [ organizerError, setOrganizerError ] = useState('');
  const [ place, setPlace] = useState('');
  const [ placeError, setPlaceError] = useState('');
  const [ maxParticipants, setMaxParticipants ] = useState<number>(1000);
  const [ maxParticipantsError, setMaxParticipantsError ] = useState('');
  const [ date, setDate ] = useState('');
  const [ dateError, setDateError ] = useState('');
  const [ price, setPrice ] = useState<number>(0);
  const [ priceError, setPriceError ] = useState('');
  const [ isValid, setIsValid ] = useState(false);

  const formProps = {
    name, setName, nameError, setNameError,
    type, setType, typeError, setTypeError,
    organizer, setOrganizer, organizerError, setOrganizerError,
    place, setPlace, placeError, setPlaceError,
    maxParticipants, setMaxParticipants, maxParticipantsError, setMaxParticipantsError,
    date, setDate, dateError, setDateError,
    price, setPrice, priceError, setPriceError,
    plan, setPlan,
  };

  const addEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      const newEvent: Event = new Event (0, name, type, organizer, place, maxParticipants, new Date(date), price, plan, []);
      eds.postData(newEvent);
      navigate('/');
    }
  };

  useEffect(() => {
    setIsValid(
      name.length > 0 && nameError === '' &&
      type.length > 0 && typeError === '' &&
      organizer.length > 0 && organizerError === '' &&
      place.length > 0 && placeError === '' &&
      maxParticipants > 0 && maxParticipantsError === '' &&
      date.length > 0 && dateError === '' &&
      price > 0 && priceError === ''
    );
  }, [name, nameError, type, typeError, organizer, organizerError, place, placeError, maxParticipants, maxParticipantsError, date, dateError, price, priceError]);

  return (
    <div className={styles.AddEvent}>
      <div className={styles.mainContainer}>
        <Back/>
        <div className={styles.formContainer}>
          <form className={styles.eventFormContainer} onSubmit={(e) => addEvent(e)}>
            <label>Formularz dodawania wydarzenia</label>
            <EventForm {...formProps}/>
            <button type="submit">Zatwierdź</button>
          </form>
          <AddPlan plan={plan} setPlan={setPlan}></AddPlan>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
