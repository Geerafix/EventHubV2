import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './add-plan.module.css';
import { Plan } from '../../models/Plan';
import { useForm } from 'react-hook-form';
import { XLg, PlusLg } from 'react-bootstrap-icons';

interface AddPlanProps {
  plan: Plan[];
  setPlan: Dispatch<SetStateAction<Plan[]>>;
}

type AddPlanForm = {
  nazwa: string,
  godz_rozpoczecia: Date | string,
  godz_zakonczenia: Date | string
}

const AddPlan: FC<AddPlanProps> = ({plan, setPlan}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddPlanForm>();
  const [ startTimeType, setStartTimeType ] = useState('text');
  const [ endTimeType, setEndTimeType ] = useState('text');

  const onSubmit = (plan: any) => {
    const newPlan = new Plan(plan.nazwa, plan.godz_rozpoczecia, plan.godz_zakonczenia);
    setPlan((prevPlan: Plan[]) => [...prevPlan, newPlan]);
  };

  const deletePlan = (index: number) => {
    setPlan((prevPlan: Plan[]) => prevPlan.filter((_, eventIndex: number) => eventIndex !== index ));
  };

  return (
    <div className={styles.AddPlan} onSubmit={handleSubmit(onSubmit)}>
      <form className={styles.createPlan}>
        <div className={styles.createPlanInputs}>
          <label>Utwórz plan: </label>
          <input className={styles.formInput} type="text" {...register("nazwa", { required: true, maxLength: 30 })} placeholder="Nazwa planu"/>

          <input className={styles.formInput} {...register("godz_rozpoczecia", { required: true, maxLength: 30 })} placeholder="Godzina rozp." type={startTimeType} onFocus={() => setStartTimeType('time')} onBlur={() => setStartTimeType('text')}/>
          
          <input className={styles.formInput} {...register("godz_zakonczenia", { required: true })} placeholder="Godzina zak." type={endTimeType} onFocus={() => setEndTimeType('time')} onBlur={() => setEndTimeType('text')}/>

          <button type="submit" className={styles.addButton}><PlusLg/></button>
        </div>

        {errors.nazwa && errors.nazwa.type === 'required' && <span className={styles.formError}>Nazwa planu jest wymagana</span>}
        {errors.nazwa && errors.nazwa.type === 'maxLength' && <span className={styles.formError}>Nazwa planu może mieć maks. 30 znaków</span>}
        {errors.godz_rozpoczecia && errors.godz_rozpoczecia.type === 'required' && <span className={styles.formError}>Godzina rozpoczęcia jest wymagana</span>}
        {errors.godz_zakonczenia && errors.godz_zakonczenia.type === 'required' && <span className={styles.formError}>Godzina zakończenia jest wymagana</span>}
      </form>

      <ul>
        {plan.map((planItem, index) => (
          <li key={index}>
            <div>
              <span>{index + 1}. </span>
              <span className={styles.planItemName}><b>{planItem._nazwa}</b></span>, 
              od <b>{planItem._godz_rozpoczecia.toString()}</b> 
              do <b>{planItem._godz_zakonczenia.toString()}</b>
            </div>
            <button className={styles.deleteButton} onClick={() => deletePlan(index)}><XLg/></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddPlan;
