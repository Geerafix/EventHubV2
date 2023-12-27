import React, { FC } from 'react';
import styles from './eventDetails.module.css';

interface EventDetailsProps {}

const EventDetails: FC<EventDetailsProps> = () => (
  <div className={styles.EventDetails}>
    EventDetails Component
  </div>
);

export default EventDetails;
