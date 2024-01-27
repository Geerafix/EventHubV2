import React, { FC, useEffect, useState } from 'react';
import styles from './edit-event.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import { Plan } from '../../models/Plan';
import Back from '../back/back';
import Event from '../../models/Event';
import AddPlan from '../add-plan/add-plan';
import { Participant } from '../../models/Participant';
import EventForm from '../event-form/event-form';
import { CheckLg } from 'react-bootstrap-icons';

interface EditEventProps {}

const EditEvent: FC<EditEventProps> = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [ event, setEvent ] = useState<Event>();
  const [ name, setName ] = useState<string>('');
  const [ nameError, setNameError ] = useState<string>('');
  const [ type, setType ] = useState<string>('');
  const [ typeError, setTypeError ] = useState<string>('');
  const [ organizer, setOrganizer ] = useState<string>('');
  const [ organizerError, setOrganizerError ] = useState<string>('');
  const [ place, setPlace] = useState<string>('');
  const [ placeError, setPlaceError] = useState<string>('');
  const [ maxParticipants, setMaxParticipants ] = useState<number>(0);
  const [ maxParticipantsError, setMaxParticipantsError ] = useState<string>('');
  const [ date, setDate ] = useState<string>('');
  const [ dateError, setDateError ] = useState<string>('');
  const [ price, setPrice ] = useState<number>(0);
  const [ priceError, setPriceError ] = useState<string>('');
  const [ plan, setPlan ] = useState<Plan[]>([]);
  const [ participants, setParticipants ] = useState<Participant[]>([]);
  const [ isValid, setIsValid ] = useState<boolean>(false);
  const [ formInitialized, setFormInitialized ] = useState(false);

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

  const submitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid && event) {
      const editedEvent: Event = new Event (
        event._id, name, type, organizer, place, maxParticipants, new Date(date), price, plan, participants);
      eds.putData(editedEvent);
      navigate(`/szczegoly/${id}`);
    } else {
      alert("Uzupełnij lub popraw dane w formularzu!");
    }
  };

  const addPlan = (newPlan: Plan) => {
    setPlan((prevPlan: Plan[]) => [...prevPlan, newPlan]);
  }

  const deletePlan = (index: number) => {
    setPlan((prevPlan: Plan[]) => prevPlan.filter((_, eventIndex: number) => eventIndex !== index ));
  }

  useEffect(() => {        
    if (!formInitialized) {
      const fetchData = async () => {
        try {
            const response = await eds.getSingleData(id ? parseInt(id) : 0);
            const event = response.event;
            setEvent(response.event);
            setPlan(event._plan);
            setName(event._nazwa);
            setType(event._rodzaj);
            setOrganizer(event._organizator);
            setPlace(event._miejsce);
            setMaxParticipants(event._max_ilosc_osob);
            setDate(event._data_wydarzenia.toISOString().split('T')[0]);
            setPrice(event._cena_biletu);
            setPlan(event._plan);
            setParticipants(event._uczestnicy);
            setFormInitialized(true);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }
    setIsValid(
      name.length > 0 && nameError === '' &&
      type.length > 0 && typeError === '' &&
      organizer.length > 0 && organizerError === '' &&
      place.length > 0 && placeError === '' &&
      maxParticipants > 0 && maxParticipantsError === '' &&
      date.length > 0 && dateError === '' &&
      price > 0 && priceError === ''
    );
  }, [id, name, nameError, type, typeError, 
      organizer, organizerError, place, placeError, 
      maxParticipants, maxParticipantsError, 
      date, dateError, price, priceError, formInitialized]);
  
  return (
    <div className={styles.EditEvent}>
      <div className={styles.mainContainer}>
        <Back/>
        <div className={styles.formContainer}>
          <form className={styles.eventFormContainer} onSubmit={(e) => submitEvent(e)}>
            <label>Formularz edycji wydarzenia</label>
            <EventForm {...formProps}/>
            <button type="submit">Zatwierdź <CheckLg/></button>
          </form>
          <AddPlan plan={plan} addPlan={addPlan} deletePlan={deletePlan}></AddPlan>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
