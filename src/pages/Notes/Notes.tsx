import { motion } from 'framer-motion';

const Notes = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      Notes
    </motion.div>
  );
};

export default Notes;
