import React, { FC, useEffect, useState } from 'react';
import styles from './buy-ticket.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import Event from '../../models/Event';
import { Participant } from '../../models/Participant';
import Back from '../back/back';

interface BuyTicketProps {}

const BuyTicket: FC<BuyTicketProps> = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [ event, setEvent ] = useState<Event>();
  const [ dateInputType, setDateInputType ] = useState('text');

  const [ name, setName ] = useState('');
  const [ nameError, setNameError ] = useState('');
  const [ surname, setSurname ] = useState('');
  const [ surnameError, setSurnameError ] = useState('');
  const [ birthdate, setBirthdate ] = useState('');
  const [ birthdateError, setBirthdateError ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ phoneNr, setPhoneNr ] = useState('');
  const [ phoneNrError, setPhoneNrError ] = useState('');

  const [ isValid, setIsValid ] = useState(false);

  const buyTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      const newParticipant: Participant = new Participant (name, surname, new Date(birthdate), email, parseInt(phoneNr))
      event?.addParticipant(newParticipant);
      eds.putData(event);
      navigate('/'); 
    }
  };

  useEffect(() => {
    if (id) {
      eds.getSingleData(parseInt(id)).then(({ event }) => { setEvent(event); });
    }
    setIsValid(name.length > 0 &&surname.length > 0 &&birthdate.length > 0 &&email.length > 0 &&phoneNr.length > 0 &&
      nameError === '' && surnameError === '' && birthdateError === '' && emailError === '' && phoneNrError === '');
  }, [id, name, surname, birthdate, email, phoneNr, nameError, surnameError, birthdateError, emailError, phoneNrError])

  const nameInputChange = (name: any) => {
    const value = name.target.value;
    setName(value); 
    if(value.length === 0) setNameError('Imię jest wymagane');
    else if (value.length > 30) setNameError('Imię nie może przekraczać 30 znaków');
    const nameRegex = /^[A-Z][a-ząęóśłżźćń]*$/;
    if (!nameRegex.test(value)) setNameError('Imię musi być z wielkiej litery, bez cyfr i bez znaków specjalnych');
    else setNameError('');
  }

  const surnameInputChange = (surname: any) => {
    const value = surname.target.value;
    setSurname(value); 
    if(value.length === 0) setSurnameError('Nazwisko jest wymagane');
    else if (value.length > 30) setSurnameError('Nazwisko nie może przekraczać 30 znaków');
    const surnameRegex = /^[A-Z][a-ząęóśłżźćń]*$/;
    if (!surnameRegex.test(value)) setSurnameError('Nazwisko musi być z wielkiej litery, bez cyfr i bez znaków specjalnych');
    else setSurnameError('');
  }

  const birthdateInputChange = (birthdate: any) => {
    const value = birthdate.target.value;
    setBirthdate(value); 
    let birthDate = new Date(value);
    let diff = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
    if (!value) {
      setBirthdateError('Data urodzenia jest wymagana');
    } else {
      if(birthDate >= diff) setBirthdateError('Musisz mieć ukończone 18 lat');
      else if (birthDate <= diff) setBirthdateError('');
    }
  }

  const emailInputChange = (email: any) => {
    const value = email.target.value;
    setEmail(value);
    if (value.length === 0) {
      setEmailError('Email jest wymagany');
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
      if (!emailRegex.test(value)) setEmailError('Nieprawidłowy adres email');
      else setEmailError('');
    }
  };

  const phoneNrInputChange = (phoneNr: any) => {
    const value = phoneNr.target.value;
    setPhoneNr(value); 
    if (!value) {
      setPhoneNrError("Numer telefonu jest wymagany");
    } else {
      if(value < 100000000 || value > 999999999) setPhoneNrError('Nieprawidłowy numer telefonu');
      else setPhoneNrError('');
    }
  }

  return (
    <div className={styles.BuyTicket}>
      <div className={styles.mainContainer}>
        <Back/>
        <div className={styles.formContainer}>
          <form className={styles.buyTicketFormContainer} onSubmit={(e) => buyTicket(e)}>
            <label >Formularz kupowania biletu na:</label>
            <label><b>{event?._nazwa}</b></label>
            <input className={styles.formInput} type="text" placeholder="Imię" value={name} onChange={nameInputChange}/>
              {nameError && <span className={styles.formError}>{nameError}</span>}
            <input className={styles.formInput} type="text" placeholder="Nazwisko" value={surname} onChange={surnameInputChange}/>
              {surnameError && <span className={styles.formError}>{surnameError}</span>}
            <input className={styles.formInput} placeholder="Data urodzenia" type={dateInputType} value={birthdate} onChange={birthdateInputChange} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')}/>
              {birthdateError && <span className={styles.formError}>{birthdateError}</span>}
            <input className={styles.formInput} type="text" placeholder="E-mail" value={email} onChange={emailInputChange}/>
              {emailError && <span className={styles.formError}>{emailError}</span>}
            <input className={styles.formInput} type="number" placeholder="Numer telefonu" value={phoneNr} onChange={phoneNrInputChange}/>
              {phoneNrError && <span className={styles.formError}>{phoneNrError}</span>}
            <button type="submit">Kup bilet</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
