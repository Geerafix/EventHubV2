import React, { FC, useState } from 'react';
import styles from './add-event.module.css';
import { Plan } from '../../models/Plan';
import AddPlan from '../add-plan/add-plan';
import { useForm } from 'react-hook-form';
import eds from '../../services/event-data-service/event-data-service';
import Event from '../../models/Event';
import { Participant } from '../../models/Participant';
import Back from '../back/back';
import { useNavigate } from 'react-router-dom';

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
  const [ plan, setPlan ] = useState<Plan[]>([]);
  const [ dateInputType, setDateInputType ] = useState('text');
  const navigate = useNavigate();

  const onSubmit = (event: any) => {
    const newEvent: Event = {
      ...event,
      plan: plan,
      uczestnicy: []
    };
    eds.postData(newEvent);
    navigate('/');
  };

  return (
    <div className={styles.AddEvent}>
      <div className={styles.mainContainer}>
        <Back/>
        <div className={styles.formContainer}>
          <form className={styles.eventFormContainer} onSubmit={handleSubmit(onSubmit)}>
            <label>Formularz dodawania wydarzenia</label>
            <input className={styles.formInput} {...register("nazwa", { required: true, maxLength: 30 })} placeholder="Nazwa wydarzenia"/>
              {errors.nazwa && errors.nazwa.type === 'required' && <span className={styles.formError}>Nazwa wydarzenia jest wymagana</span>}
              {errors.nazwa && errors.nazwa.type === 'maxLength' && <span className={styles.formError}>Nazwa wydarzenia może mieć maks. 30 znaków</span>}

            <input className={styles.formInput} {...register("rodzaj", { required: true, maxLength: 30 })} placeholder="Rodzaj wydarzenia"/>
              {errors.rodzaj && errors.rodzaj.type === 'required' && <span className={styles.formError}>Rodzaj wydarzenia jest wymagany</span>}
              {errors.rodzaj && errors.rodzaj.type === 'maxLength' && <span className={styles.formError}>Rodzaj wydarzenia może mieć maks. 30 znaków</span>}

            <input className={styles.formInput} {...register("organizator", { required: true, maxLength: 30 })} placeholder="Organizator wydarzenia"/>
              {errors.organizator && errors.organizator.type === 'required' && <span className={styles.formError}>Organizator wydarzenia jest wymagany</span>}
              {errors.organizator && errors.organizator.type === 'maxLength' && <span className={styles.formError}>Organizator wydarzenia może mieć maks. 30 znaków</span>}

            <input className={styles.formInput} {...register("miejsce", { required: true, maxLength: 30 })} placeholder="Miejsce wydarzenia"/>
              {errors.miejsce && errors.miejsce.type === 'required' && <span className={styles.formError}>Miejsce wydarzenia jest wymagane</span>}
              {errors.miejsce && errors.miejsce.type === 'maxLength' && <span className={styles.formError}>Miejsce wydarzenia może mieć maks. 30 znaków</span>}

            <input className={styles.formInput} {...register("max_ilosc_osob", { required: true, max: 10000 })} type="number" placeholder="Maks. ilość osób"/>
              {errors.max_ilosc_osob && errors.max_ilosc_osob.type === 'required' && <span className={styles.formError}>Maks. ilość osób jest wymagana</span>}
              {errors.max_ilosc_osob && errors.max_ilosc_osob.type === 'max' && <span className={styles.formError}>Wydarzenie może mieć maks. 10000 osób</span>}

            <input className={styles.formInput} {...register("data_wydarzenia", { required: true })} type={dateInputType} placeholder="Data wydarzenia" onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')}/>
              {errors.data_wydarzenia && errors.data_wydarzenia.type === 'required' && <span className={styles.formError}>Data wydarzenia jest wymagana</span>}
            

            <input className={styles.formInput} {...register("cena_biletu", { required: true, min: 0 })} type="number" placeholder="Cena biletu"/>
              {errors.cena_biletu && errors.cena_biletu.type === 'required' && <span className={styles.formError}>Cena biletu jest wymagana</span>}
              {errors.cena_biletu && errors.cena_biletu.type === 'min' && <span className={styles.formError}>Cena biletu nie może być ujemna</span>}

            <button type="submit">Zatwierdź</button>
          </form>
          <AddPlan plan={plan} setPlan={setPlan}></AddPlan>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
