import React, { FC, useEffect, useState } from 'react';
import styles from './edit-event.module.css';
import { useParams } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import { Plan } from '../../models/Plan';
import { Participant } from '../../models/Participant';
import { useForm } from 'react-hook-form';
import Back from '../back/back';
import Event from '../../models/Event';
import AddPlan from '../add-plan/add-plan';

interface EditEventProps {}

type AddEventForm = {
  id: number,
  nazwa: string,
  rodzaj: string,
  organizator: string,
  miejsce: string,
  max_ilosc_osob: number,
  data_wydarzenia: string,
  cena_biletu: number,
  plan: Plan[],
  uczestnicy: Participant[]
}

const EditEvent: FC<EditEventProps> = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<AddEventForm>();
  let { id } = useParams();
  const [ plan, setPlan ] = useState<Plan[]>([]);
  const [ dateInputType, setDateInputType ] = useState('text');

  const onSubmit = (event: any) => {
    const newEvent: Event = {
      id: event.id,
      ...event,
      plan: plan,
      uczestnicy: event.uczestnicy
    };
    eds.putData(newEvent);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await eds.getSingleData(parseInt(id));
          const event = response.event;
          setPlan(event._plan);
          setValue('id', event._id);
          setValue('nazwa', event._nazwa);
          setValue('rodzaj', event._rodzaj);
          setValue('organizator', event._organizator);
          setValue('miejsce', event._miejsce);
          setValue('max_ilosc_osob', event._max_ilosc_osob);
          setValue('data_wydarzenia', event._data_wydarzenia.toLocaleDateString());
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
        <Back/>
        <div className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <form className={styles.eventFormContainer}>
            <label>Formularz edycji wydarzenia:</label>
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
            
            <input className={styles.formInput} {...register("data_wydarzenia", { required: true })} type={dateInputType} placeholder="Data wydarzenia" onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')} />
              {errors.data_wydarzenia && errors.data_wydarzenia.type === 'required' && <span className={styles.formError}>Data wydarzenia jest wymagana</span>}

            <input className={styles.formInput} {...register("cena_biletu", { required: true, min: 0, max: 1000 })} placeholder="Cena biletu"/>
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

export default EditEvent;
