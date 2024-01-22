import React, { FC, useEffect } from 'react';
import styles from './edit-event.module.css';
import { Link, useParams } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import { Plan } from '../../models/Plan';
import { Participant } from '../../models/Participant';
import { useForm } from 'react-hook-form';

interface EditEventProps {}

type AddEventForm = {
  id: number,
  nazwa: string,
  rodzaj: string,
  organizator: string,
  miejsce: string,
  max_ilosc_osob: number,
  data_wydarzenia: Date,
  cena_biletu: number,
  plan: Plan[],
  uczestnicy: Participant[]
}

const EditEvent: FC<EditEventProps> = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<AddEventForm>();
  let { id } = useParams();

  const onSubmit = (event: any) => {
    const newEvent: Event = {
      id: event.id,
      ...event,
      ...event.plan,
      ...event.uczestnicy
    };
    eds.putData(newEvent);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await eds.getSingleData(parseInt(id));
          const event = response.event;
          setValue('id', event._id);
          setValue('nazwa', event._nazwa);
          setValue('rodzaj', event._rodzaj);
          setValue('organizator', event._organizator);
          setValue('miejsce', event._miejsce);
          setValue('max_ilosc_osob', event._max_ilosc_osob);
          setValue('data_wydarzenia', event._data_wydarzenia);
          setValue('cena_biletu', event._cena_biletu);
          setValue('plan', event._plan);
          setValue('uczestnicy', event._uczestnicy);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, setValue]);
  
  return (
    <div className={styles.EditEvent}>
      <div className={styles.mainContainer}>
        <Link to={`/szczegoly/${ id }`}>
          <button className={styles.backButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/></svg>
          </button>
        </Link>
        <div className={styles.editFormContainer} onSubmit={handleSubmit(onSubmit)}>
          <form className={styles.editEventFormContainer}>
            <label>Formularz edycji wydarzenia:</label>
            <input className={styles.formInput} {...register("nazwa", { required: true, maxLength: 30 })} placeholder="Nazwa wydarzenia"/>

            <input className={styles.formInput} {...register("rodzaj", { required: true, maxLength: 30 })} placeholder="Rodzaj wydarzenia"/>

            <input className={styles.formInput} {...register("organizator", { required: true, maxLength: 30 })} placeholder="Organizator wydarzenia"/>

            <input className={styles.formInput} {...register("miejsce", { required: true, maxLength: 30 })} placeholder="Miejsce wydarzenia"/>

            <input className={styles.formInput} {...register("max_ilosc_osob", { required: true, max: 10000 })} type="number" placeholder="Maks. ilość osób"/>

            <input className={styles.formInput} {...register("data_wydarzenia", { required: true })} type="text" placeholder="Data wydarzenia"/>

            <input className={styles.formInput} {...register("cena_biletu", { required: true, min: 0, max: 1000 })} type="number" placeholder="Cena biletu"/>

            {/* <app-add-plan [eventPlan]="eventPlan"></app-add-plan> */}

            <button type="submit">Zatwierdź</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
