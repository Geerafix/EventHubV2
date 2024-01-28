import React, { FC } from 'react';
import styles from './plan-list-form.module.css';
import { XLg } from 'react-bootstrap-icons';
import { Plan } from '../../models/Plan';

interface PlanListFormProps {
  plan: Plan[]
  updateDeletePlan: (index: number) => void;
}

const PlanListForm: FC<PlanListFormProps> = ({plan, updateDeletePlan}) => {
  const deletePlan = (index: number) => {
    updateDeletePlan(index)
  }

  return (
    <ul>
      {plan.map((planItem, index) => (
        <li key={index}>
          <div>
            <span>{index + 1}. </span>
            <span className={styles.planItemName}><b>{planItem._nazwa}</b></span>, 
            od <b>{planItem._godz_rozpoczecia.toString()}</b> 
            do <b>{planItem._godz_zakonczenia.toString()}</b>
          </div>
          <button className={styles.deleteButton} onClick={() => deletePlan(index)}>Usuń <XLg/></button>
        </li>
      ))}
    </ul>
  )
};

export default PlanListForm;
