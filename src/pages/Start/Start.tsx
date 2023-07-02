import { motion } from 'framer-motion';

import Logo from '../../components/Logo/Logo';

import styles from './Start.module.css';

const Start = (): JSX.Element => {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3 }}
    >
      <section className={styles.left}>
        <Logo type='big' text='Just Notes' />
      </section>

      <section className={styles.right}>right</section>
    </motion.div>
  );
};

export default Start;
