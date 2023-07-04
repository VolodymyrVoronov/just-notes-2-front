import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { RouterPath } from '../../types';

const Notes = (): JSX.Element => {
  const navigate = useNavigate();

  const { logout, isLoggedIn, accessToken, refreshToken } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RouterPath.Start);
    }

    if (isLoggedIn()) {
      getProfile()
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
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
    </motion.div>
  );
};

export default Notes;
