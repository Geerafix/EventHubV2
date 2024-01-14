import React, { FC, useState } from 'react';
import styles from './add-event.module.css';
import { Link } from 'react-router-dom';
import { Plan } from '../../models/Plan';
import AddPlan from '../add-plan/add-plan';
import { useForm } from 'react-hook-form';
import eds from '../../services/event-data-service/event-data-service';
import Event from '../../models/Event';
import { Participant } from '../../models/Participant';

interface AddEventProps {}

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

const AddEvent: FC<AddEventProps> = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddEventForm>();
  const [plan] = useState<Plan[]>([]);

  const onSubmit = (event: any) => {
    const newEvent: Event = {
      ...event,
      plan: [],
      uczestnicy: []
    };

    eds.postData(newEvent)
  };

  return (
    <div className={styles.AddEvent}>
      <div className={styles.mainContainer}>
        <Link to="/">
          <button className={styles.backButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </button>
        </Link>
        <div className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <form className={styles.eventFormContainer}>
            <label>Formularz dodawania wydarzenia</label>
            <input className={styles.formInput} {...register("nazwa", { required: true, maxLength: 30 })} placeholder="Nazwa wydarzenia"/>
            {errors.nazwa && errors.nazwa.type === 'required' && <span>To pole jest wymagane</span>}
            {errors.nazwa && errors.nazwa.type === 'maxLength' && <span>Nazwa wydarzenia może mieć maks. 30 znaków</span>}

            <input className={styles.formInput} {...register("rodzaj", { required: true, maxLength: 30 })} placeholder="Rodzaj wydarzenia"/>

            <input className={styles.formInput} {...register("organizator", { required: true, maxLength: 30 })} placeholder="Organizator wydarzenia"/>

            <input className={styles.formInput} {...register("miejsce", { required: true, maxLength: 30 })} placeholder="Miejsce wydarzenia"/>

            <input className={styles.formInput} {...register("max_ilosc_osob", { required: true, max: 10000 })} type="number" placeholder="Maks. ilość osób"/>

            <input className={styles.formInput} {...register("data_wydarzenia", { required: true })} type="text" placeholder="Data wydarzenia"/>

            <input className={styles.formInput} {...register("cena_biletu", { required: true, min: 0, max: 1000 })} type="number" placeholder="Cena biletu"/>

            <AddPlan eventPlan={plan}></AddPlan>

            <button type="submit">
              Zatwierdź
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
