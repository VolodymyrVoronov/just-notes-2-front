import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '../../constants';
import { useAuthStore } from '../../store/authStore';
import { getProfile } from '../../services/services';

const Notes = (): JSX.Element => {
  const navigate = useNavigate();

  const {
    logout,
    isLoggedIn,
    accessToken: aT,
    refreshToken: rT,
  } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RouterPath.Start);
    }

    if (isLoggedIn()) {
      navigate(RouterPath.Notes);

      getProfile()
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [aT, rT]);

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
