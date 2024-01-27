import React, { FC, useEffect, useState } from 'react';
import styles from './add-plan.module.css';
import { Plan } from '../../models/Plan';
import { PlusLg } from 'react-bootstrap-icons';
import PlanListForm from '../plan-list-form/plan-list-form';

interface AddPlanProps {
  plan: Plan[];
  addPlan: (newPlan: Plan) => void;
  deletePlan: (index: number) => void;
}

const AddPlan: FC<AddPlanProps> = ({plan, addPlan, deletePlan}) => {
  const [ startTimeType, setStartTimeType ] = useState('text');
  const [ endTimeType, setEndTimeType ] = useState('text');
  const [ name, setName ] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ startHour, setStartHour ] = useState('');
  const [ startHourError, setStartHourError ] = useState('');
  const [ endHour, setEndHour ] = useState('');
  const [ endHourError, setEndHourError ] = useState('');
  const [ isValid, setIsValid] = useState(false);

  const updateAddPlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      const newPlan = new Plan(name, startHour, endHour);
      addPlan(newPlan);
    } else {
      alert("Uzupełnij lub popraw dane w formularzu planu!");
    }
  };

  const updateDeletePlan = (index: number) => {
    deletePlan(index);
  };

  useEffect(() => {
    setIsValid(name.length > 0 && startHour.length > 0 && endHour.length > 0 &&
      nameError === '' && startHourError === '' && endHourError === '');
  }, [name, startHour, endHour, nameError, startHourError, endHourError]);

  const nameInputChange = (name: string) => {
    setName(name); 
    if(name.length === 0) setNameError('Nazwa planu jest wymagana');
    else if (name.length > 30) setNameError('Nazwa planu nie może przekraczać 30 znaków');
    else setNameError('');
  }

  const startHourInputChange = (startHour: string) => {
    setStartHour(startHour); 
    if(startHour.length === 0) setStartHourError('Godzina rozpoczęcia jest wymagana');
    else setStartHourError('');
  }

  const endHourInputChange = (endHour: string) => {
    setEndHour(endHour); 
    if(endHour.length === 0) {
      setEndHourError('Godzina zakończenia jest wymagana');
    } else {
      if (endHour <= startHour) setEndHourError('Godzina zakończenia nie może być wcześniejsza niż rozpoczęcia');
      else setEndHourError('');
    }
  }

  return (
    <div className={styles.AddPlan}>
      <div className={styles.createPlan}>
        <form className={styles.createPlanInputs} onSubmit={(e) => updateAddPlan(e)}>
          <label><b>Utwórz plan: </b></label>
          <input className={styles.formInput} type="text" placeholder="Nazwa planu" value={name} onChange={(e) => nameInputChange(e.target.value)}/>
          <input className={`${styles.formInput} ${styles.widthFix}`} placeholder="Godzina rozp." value={startHour} onChange={(e) => startHourInputChange(e.target.value)} type={startTimeType} onFocus={() => setStartTimeType('time')} onBlur={() => setStartTimeType('text')}/>
          <input className={`${styles.formInput} ${styles.widthFix}`} placeholder="Godzina zak." value={endHour} onChange={(e) => endHourInputChange(e.target.value)} type={endTimeType} onFocus={() => setEndTimeType('time')} onBlur={() => setEndTimeType('text')}/>
          <button type="submit" className={styles.addButton}>Dodaj <PlusLg/></button>
        </form>
        {nameError && <span className={styles.formError}>{nameError}</span>}
        {startHourError && <span className={styles.formError}>{startHourError}</span>}
        {endHourError && <span className={styles.formError}>{endHourError}</span>}
      </div>
      <PlanListForm plan={plan} updateDeletePlan={updateDeletePlan}></PlanListForm>
    </div>
  );
};

export default AddPlan;
