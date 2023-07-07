import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGE_TIMEOUT } from '../../constants';
import { getProfile, getAllNotes } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { RouterPath } from '../../types';

import Error from '../../components/Error/Error';
import SideBar from '../../components/SideBar/SideBar';
import Search from '../../components/Search/Search';

import styles from './Notes.module.css';

const Notes = (): JSX.Element => {
  const navigate = useNavigate();

  const { isLoggedIn, accessToken, refreshToken } = useAuthStore();
  const { saveUserInfo } = useUserStore();

  const [resError, setResError] = useState('');

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RouterPath.Start);
    }

    if (isLoggedIn()) {
      getProfile()
        .then(({ data }) => {
          saveUserInfo(data);
        })
        .catch((error) => {
          if (error instanceof AxiosError && error.response) {
            setResError(error.response.data.message);

            const timeoutId = setTimeout(() => {
              setResError('');

              clearTimeout(timeoutId);
            }, ERROR_MESSAGE_TIMEOUT);
          }
        });
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (isLoggedIn()) {
      getAllNotes()
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          if (error instanceof AxiosError && error.response) {
            setResError(error.response.data.message);

            const timeoutId = setTimeout(() => {
              setResError('');

              clearTimeout(timeoutId);
            }, ERROR_MESSAGE_TIMEOUT);
          }
        });
    }
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      }}
      className={styles.root}
    >
      <div className={styles.left}>
        <SideBar />
      </div>

      <div className={styles.right}>
        <Search />
      </div>

      <Error error={resError} />
    </motion.div>
  );
};

export default Notes;
