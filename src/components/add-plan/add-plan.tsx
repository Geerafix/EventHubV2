import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './add-plan.module.css';
import { Plan } from '../../models/Plan';
import { XLg, PlusLg } from 'react-bootstrap-icons';

interface AddPlanProps {
  plan: Plan[];
  setPlan: Dispatch<SetStateAction<Plan[]>>;
}

const AddPlan: FC<AddPlanProps> = ({plan, setPlan}) => {
  const [ startTimeType, setStartTimeType ] = useState('text');
  const [ endTimeType, setEndTimeType ] = useState('text');
  const [ name, setName ] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ startHour, setStartHour ] = useState('');
  const [ startHourError, setStartHourError ] = useState('');
  const [ endHour, setEndHour ] = useState('');
  const [ endHourError, setEndHourError ] = useState('');
  const [isValid, setIsValid] = useState(false);

  const addPlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      const newPlan = new Plan(name, startHour, endHour);
      setPlan((prevPlan: Plan[]) => [...prevPlan, newPlan]);
    }
  };

  const deletePlan = (index: number) => {
    setPlan((prevPlan: Plan[]) => prevPlan.filter((_, eventIndex: number) => eventIndex !== index ));
  };

  useEffect(() => {
    setIsValid(name.length > 0 && startHour.length > 0 && endHour.length > 0 &&
      nameError === '' && startHourError === '' && endHourError === '');
  }, [name, startHour, endHour, nameError, startHourError, endHourError]);

  const nameInputChange = (name: any) => {
    const value = name.target.value;
    setName(value); 
    if(value.length === 0) setNameError('Nazwa planu jest wymagana');
    else if (value.length > 30) setNameError('Nazwa planu nie może przekraczać 30 znaków');
    else setNameError('');
  }

  const startHourInputChange = (startHour: any) => {
    const value = startHour.target.value;
    setStartHour(value); 
    if(value.length === 0) setStartHourError('Godzina rozpoczęcia jest wymagana');

    else setStartHourError('');
  }

  const endHourInputChange = (endHour: any) => {
    const value = endHour.target.value;
    setEndHour(value); 
    if(value.length === 0) setEndHourError('Godzina zakończenia jest wymagana');
    if (value <= startHour) setEndHourError('Godzina zakończenia nie może być wcześniejsza niż rozpoczęcia');
    else setEndHourError('');
  }

  return (
    <div className={styles.AddPlan}>
      <div className={styles.createPlan}>
        <form className={styles.createPlanInputs} onSubmit={(e) => addPlan(e)}>
          <label>Utwórz plan: </label>
          <input className={styles.formInput} type="text" placeholder="Nazwa planu" value={name} onChange={nameInputChange}/>
          <input className={styles.formInput} placeholder="Godzina rozp." value={startHour} onChange={startHourInputChange} type={startTimeType} onFocus={() => setStartTimeType('time')} onBlur={() => setStartTimeType('text')}/>
          <input className={styles.formInput} placeholder="Godzina zak." value={endHour} onChange={endHourInputChange} type={endTimeType} onFocus={() => setEndTimeType('time')} onBlur={() => setEndTimeType('text')}/>
          <button type="submit" className={styles.addButton}><PlusLg/></button>
        </form>
        {nameError && <span className={styles.formError}>{nameError}</span>}
        {startHourError && <span className={styles.formError}>{startHourError}</span>}
        {endHourError && <span className={styles.formError}>{endHourError}</span>}
      </div>
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
