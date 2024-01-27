import React, { FC } from 'react';
import styles from './plan-list.module.css';
import { Plan } from '../../models/Plan';

interface PlanListProps {
  eventPlan: Plan[] | undefined;
}

const PlanList: FC<PlanListProps> = ({eventPlan}) => {
  return eventPlan?.length === 0 ? null : (
    <div className={styles.planContainer}>
      <h3>Plan wydarzenia:</h3>
      <ul>
        {eventPlan?.map((planItem, index) => (
          <li key={index}>
            <div>
              <span>{index + 1}. </span>
              <span className={styles.planItemName}><b>{planItem._nazwa}</b></span>, 
              od <b>{planItem._godz_rozpoczecia.toString()}</b> 
              do <b>{planItem._godz_zakonczenia.toString()}</b> 
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanList;
