import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from './add-plan.module.css';
import { Plan } from '../../models/Plan';
import { useForm } from 'react-hook-form';

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

          <input className={styles.formInput} type="time" {...register("godz_rozpoczecia", { required: true, maxLength: 30 })} placeholder="Godzina rozp."/>
          
          <input className={styles.formInput} type="time" {...register("godz_zakonczenia", { required: true })} placeholder="Godzina zak."/>

          <button type="submit" className={styles.addButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg>
          </button>
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
              <span className={styles.planItemName}><b>{planItem._nazwa}</b>
              </span>, od <b>{planItem._godz_rozpoczecia.toString()}</b> do <b>{planItem._godz_zakonczenia.toString()}</b>
            </div>
            <button className={styles.deleteButton} onClick={() => deletePlan(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddPlan;
