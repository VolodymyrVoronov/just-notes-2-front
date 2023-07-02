import { motion } from 'framer-motion';

const Start = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      Start
    </motion.div>
  );
};

export default Start;
