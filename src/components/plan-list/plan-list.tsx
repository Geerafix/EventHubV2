import React, { FC } from 'react';
import styles from './plan-list.module.css';

interface PlanListProps {}

const PlanList: FC<PlanListProps> = () => (
  <div className={styles.PlanList}>
    PlanList Component
  </div>
);

export default PlanList;
