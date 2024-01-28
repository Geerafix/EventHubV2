import React, { FC, useEffect, useState } from 'react';
import styles from './buy-ticket.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import eds from '../../services/event-data-service/event-data-service';
import Event from '../../models/Event';
import { Participant } from '../../models/Participant';
import Back from '../back/back';
import { Cart } from 'react-bootstrap-icons';

interface BuyTicketProps {}

const BuyTicket: FC<BuyTicketProps> = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [ event, setEvent ] = useState<Event>();
  const [ dateInputType, setDateInputType ] = useState<string>('text');
  const [ name, setName ] = useState<string>('');
  const [ nameError, setNameError ] = useState<string>('');
  const [ surname, setSurname ] = useState<string>('');
  const [ surnameError, setSurnameError ] = useState<string>('');
  const [ birthdate, setBirthdate ] = useState<string>('');
  const [ birthdateError, setBirthdateError ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ emailError, setEmailError ] = useState<string>('');
  const [ phoneNr, setPhoneNr ] = useState<number>();
  const [ phoneNrError, setPhoneNrError ] = useState<string>('');
  const [ isValid, setIsValid ] = useState<boolean>(false);

  const buyTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid && phoneNr) {
      const newParticipant: Participant = new Participant (name, surname, new Date(birthdate), email, phoneNr)
      event?.addParticipant(newParticipant);
      eds.putData(event);
      navigate('/'); 
    } else {
      alert("Uzupełnij lub popraw dane w formularzu biletu!");
    }
  };

  useEffect(() => {
    if (id) {
      eds.getSingleData(parseInt(id)).then(({ event }) => { setEvent(event); });
    }
    setIsValid(name.length > 0 && surname.length > 0 && birthdate.length > 0 && email.length > 0 && phoneNr !== null &&
      nameError === '' && surnameError === '' && birthdateError === '' && emailError === '' && !phoneNrError);
      document.title = "Kup bilet";
  }, [id, name, surname, birthdate, email, phoneNr, nameError, surnameError, birthdateError, emailError, phoneNrError])

  const nameInputChange = (name: string) => {
    setName(name); 
    if(name.length === 0)  {
      setNameError('Imię jest wymagane');
    } else if (name.length > 30) {
      setNameError('Imię nie może przekraczać 30 znaków');
    } else {
      const nameRegex = /^[A-Z][a-ząęóśłżźćń]*$/;
      if (!nameRegex.test(name)) setNameError('Imię musi być z wielkiej litery, bez cyfr i znaków specjalnych');
      else setNameError('');
    }
  }

  const surnameInputChange = (surname: string) => {
    setSurname(surname); 
      if(surname.length === 0) {setSurnameError('Nazwisko jest wymagane'); 
    } else if (surname.length > 30) {
      setSurnameError('Nazwisko nie może przekraczać 30 znaków');
    } else {
      const surnameRegex = /^[A-Z][a-ząęóśłżźćń]*$/;
      if (!surnameRegex.test(surname)) setSurnameError('Nazwisko musi być z wielkiej litery, bez cyfr i znaków specjalnych');
      else setSurnameError('');
    }
  }

  const birthdateInputChange = (birthdate: string) => {
    setBirthdate(birthdate); 
    let birthDate = new Date(birthdate);
    let diff = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
    if (!birthdate) {
      setBirthdateError('Data urodzenia jest wymagana');
    } else {
      if(birthDate >= diff) setBirthdateError('Musisz mieć ukończone 18 lat');
      else if (birthDate <= diff) setBirthdateError('');
    }
  }

  const emailInputChange = (email: string) => {
    setEmail(email);
    if (email.length === 0) {
      setEmailError('Email jest wymagany');
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
      if (!emailRegex.test(email)) setEmailError('Nieprawidłowy adres email');
      else setEmailError('');
    }
  };

  const phoneNrInputChange = (phoneNr: number) => {
    setPhoneNr(phoneNr); 
    if (!phoneNr) {
      setPhoneNrError("Numer telefonu jest wymagany");
    } else {
      if(phoneNr < 100000000 || phoneNr > 999999999) setPhoneNrError('Nieprawidłowy numer telefonu');
      else setPhoneNrError('');
    }
  }

  return (
    <div className={styles.BuyTicket}>
      <div className={styles.mainContainer}>
        <Back/>
        <div className={styles.formContainer}>
          <form className={styles.buyTicketFormContainer} onSubmit={(e) => buyTicket(e)}>
            <label><b>Formularz kupowania biletu na:</b></label>
            <label><b>{event?._nazwa}</b></label>
            <input className={`${styles.formInput} ${nameError && styles.error}`} type="text" placeholder="Imię" value={name} onChange={(e) => nameInputChange(e.target.value)}/>
              {nameError && <span className={styles.formError}>{nameError}</span>}

            <input className={`${styles.formInput} ${surnameError && styles.error}`} type="text" placeholder="Nazwisko" value={surname} onChange={(e) => surnameInputChange(e.target.value)}/>
              {surnameError && <span className={styles.formError}>{surnameError}</span>}

            <input className={`${styles.formInput} ${birthdateError && styles.error}`} placeholder="Data urodzenia" type={dateInputType} value={birthdate} onChange={(e) => birthdateInputChange(e.target.value)} onFocus={() => setDateInputType('date')} onBlur={() => setDateInputType('text')}/>
              {birthdateError && <span className={styles.formError}>{birthdateError}</span>}

            <input className={`${styles.formInput} ${emailError && styles.error}`} type="text" placeholder="E-mail" value={email} onChange={(e) => emailInputChange(e.target.value)}/>
              {emailError && <span className={styles.formError}>{emailError}</span>}

            <input className={`${styles.formInput} ${phoneNrError && styles.error}`} type="number" placeholder="Numer telefonu" value={phoneNr} onChange={(e) => phoneNrInputChange(Number(e.target.value))}/>
              {phoneNrError && <span className={styles.formError}>{phoneNrError}</span>}

            <button type="submit">Kup bilet <Cart/></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
