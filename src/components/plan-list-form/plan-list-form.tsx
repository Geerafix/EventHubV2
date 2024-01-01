import React, { FC } from 'react';
import styles from './plan-list-form.module.css';
import { Plan } from '../../models/Plan';

interface PlanListFormProps {
  eventPlan: Plan[] | undefined;
}

const PlanListForm: FC<PlanListFormProps> = ({eventPlan}) => (
  <div className={styles.PlanListForm}>
    <ol>
      {
        eventPlan?.map((planItem, index) => (
          <li key={index}>
            <span className={styles.planItemName}>{planItem._nazwa}</span>, {planItem._godz_rozpoczecia.toString()} do {planItem._godz_zakonczenia.toString()}
            <button className="delete-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>
            </button>
          </li>
        ))
      }
    </ol>
  </div>
);

export default PlanListForm;
