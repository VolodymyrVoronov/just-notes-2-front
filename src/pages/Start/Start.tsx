import { motion } from 'framer-motion';

import type { FormType, IFormData } from '../../types';

import AuthForm from '../../components/AuthForm/AuthForm';
import Logo from '../../components/Logo/Logo';

import styles from './Start.module.css';

const Start = (): JSX.Element => {
  const onSubmitButtonClick = (data: IFormData, type: FormType) => {
    console.log(data, type);
  };

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

      <section className={styles.right}>
        <AuthForm onSubmitButtonClick={onSubmitButtonClick} />
      </section>
    </motion.div>
  );
};

export default Start;
