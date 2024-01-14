import React, { FC, useState } from 'react';
import styles from './add-plan.module.css';
import { Plan } from '../../models/Plan';
import PlanListForm from '../plan-list-form/plan-list-form';
import { useForm } from 'react-hook-form';

interface AddPlanProps {
  eventPlan: Plan[] | undefined;
}

type AddPlanForm = {
  nazwa: string,
  godz_rozpoczecia: string,
  godz_zakonczenia: string
}

const AddPlan: FC<AddPlanProps> = ({eventPlan}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [plan, setPlan] = useState<Plan[]>([]);

  const onSubmit = (plan: any) => {
    const newPlan: Plan = { ...plan, };
    setPlan((prevPlan: any) => ({ ...prevPlan, newPlan }));
  };

  return (
    <div className={styles.AddPlan} onSubmit={handleSubmit(onSubmit)}>
      <form className={styles.createPlan}>
        <label>Utwórz plan: </label>
        <input className={styles.formInput} type="text" {...register("nazwa", { required: true, maxLength: 30 })} placeholder="Nazwa planu"/>
        <input className={styles.formInput} type="text" {...register("godz_rozpoczecia", { required: true, maxLength: 30 })} placeholder="Godzina rozp."/>
        <input className={styles.formInput} type="text" {...register("godz_zakonczenia", { required: true, maxLength: 30 })} placeholder="Godzina zak."/>
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/></svg>
        </button>
      </form>
      <PlanListForm eventPlan={eventPlan}></PlanListForm>
    </div>
  );
};

export default AddPlan;
