import React, { FC } from 'react';
// import styles from './back.module.css';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

interface BackProps {}

const Back: FC<BackProps> = () => {
  return (
    <Link to='/'>
      <button>
        <ArrowLeft/> Powrót
      </button>
    </Link>
  );
};

export default Back;
