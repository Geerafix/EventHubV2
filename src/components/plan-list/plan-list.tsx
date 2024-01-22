import React, { FC } from 'react';
import styles from './plan-list.module.css';
import { Plan } from '../../models/Plan';

interface PlanListProps {
  eventPlan: Plan[] | undefined;
}

const PlanList: FC<PlanListProps> = ({eventPlan}) => {
  console.log("Test", eventPlan);
  return (
    <div className={styles.planContainer}>
      <h3>Plan wydarzenia:</h3>
      <ol>
        {
          eventPlan?.map((planItem, index) => (
            <li key={index}>
              <span className={styles.planItemName}>{planItem._nazwa}</span>, {planItem._godz_rozpoczecia.toString()} do {planItem._godz_zakonczenia.toString()}
            </li>
          ))
        }
      </ol>
    </div>
  );
};

export default PlanList;
