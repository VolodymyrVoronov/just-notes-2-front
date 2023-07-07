import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGE_TIMEOUT } from '../../constants';
import { logIn, register } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { Form, RouterPath, type FormType, type IFormData } from '../../types';

import AuthForm from '../../components/AuthForm/AuthForm';
import Error from '../../components/Error/Error';
import Logo from '../../components/Logo/Logo';

import styles from './Start.module.css';

const Start = (): JSX.Element => {
  const navigate = useNavigate();

  const {
    isLoggedIn,
    login,
    accessToken: aT,
    refreshToken: rT,
  } = useAuthStore();

  const [resError, setResError] = useState('');

  const onSubmitButtonClick = async (
    data: IFormData,
    type: FormType,
  ): Promise<void> => {
    try {
      const response =
        type === Form.Register ? await register(data) : await logIn(data);

      const { accessToken, refreshToken } = response.data;

      login({ accessToken, refreshToken });
    } catch (error) {
      if (error instanceof AxiosError) {
        setResError(error.message);

        const timeoutId = setTimeout(() => {
          setResError('');

          clearTimeout(timeoutId);
        }, ERROR_MESSAGE_TIMEOUT);
      }

      if (error instanceof AxiosError && error.response) {
        setResError(error.response.data.message);

        const timeoutId = setTimeout(() => {
          setResError('');

          clearTimeout(timeoutId);
        }, ERROR_MESSAGE_TIMEOUT);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RouterPath.Start);
    }

    if (isLoggedIn()) {
      navigate(RouterPath.Notes);
    }
  }, [aT, rT]);

  return (
    <>
      <motion.div
        className={styles.root}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <section className={styles.left}>
          <Logo type='big' text='Just Notes' />
        </section>

        <section className={styles.right}>
          <AuthForm onSubmitButtonClick={onSubmitButtonClick} />
        </section>
      </motion.div>

      <Error error={resError} />
    </>
  );
};

export default Start;
