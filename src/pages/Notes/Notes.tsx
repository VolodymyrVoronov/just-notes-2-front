import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGE_TIMEOUT } from '../../constants';
import { getProfile } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import { RouterPath } from '../../types';

import Error from '../../components/Error/Error';

const Notes = (): JSX.Element => {
  const navigate = useNavigate();

  const { logout, isLoggedIn, accessToken, refreshToken } = useAuthStore();
  const { saveUserInfo, removeUserInfo } = useUserStore();

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      Notes
      <button onClick={logout}>Logout</button>
      <Error error={resError} />
    </motion.div>
  );
};

export default Notes;
