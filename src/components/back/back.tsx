import React, { FC } from 'react';
// import styles from './back.module.css';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

interface BackProps {}

const Back: FC<BackProps> = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  }
  
  return (
    <button onClick={() => back()}><ArrowLeft/> Powrót</button>
  );
};

export default Back;
