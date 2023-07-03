import { useState, type ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLogin } from 'react-icons/ai';

import Input from '../Input/Input';
import Button from '../Button/Button';

import styles from './AuthForm.module.css';

interface IAuthFormProps extends ComponentProps<'div'> {
  className?: string;
}

const AuthForm = ({ className, ...props }: IAuthFormProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data): void => {
    console.log(data);
  };

  const onToggle = (): void => {
    setToggle(!toggle);
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      <motion.div
        className={styles.header}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 1,
          },
        }}
      >
        <AnimatePresence mode='wait'>
          <motion.span
            className={styles.text}
            key={String(toggle)}
            initial={{ opacity: 0, translateY: -25, filter: 'blur(10px)' }}
            exit={{
              opacity: 0,
              translateY: 25,
              filter: 'blur(5px)',
              transition: {
                duration: 0.5,
              },
            }}
            animate={{
              opacity: 1,
              translateY: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.5,
              },
            }}
          >
            {toggle ? 'Create new account' : 'Login with existing account'}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit(onFormSubmit)}
        className={styles.form}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 1,
          },
        }}
      >
        <AnimatePresence mode='wait'>
          <motion.div
            className={styles.inputs}
            key={String(toggle)}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
            exit={{
              scale: 0.9,
              opacity: 0,
              filter: 'blur(2.5px)',
              transition: {
                duration: 0.5,
              },
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                duration: 0.5,
              },
            }}
          >
            <Input
              className={styles.input}
              labelText='Login'
              name='login'
              type='text'
              aria-label='Login'
            />
            <Input
              className={styles.input}
              labelText='Password'
              name='password'
              type='password'
              aria-label='Password'
            />
          </motion.div>
        </AnimatePresence>

        <div className={styles.buttons}>
          <AnimatePresence mode='wait'>
            <motion.span
              key={String(toggle)}
              className={styles.text}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              exit={{
                opacity: 0,
                filter: 'blur(5px)',
                transition: {
                  duration: 0.5,
                },
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                  duration: 0.5,
                },
              }}
            >
              <Button
                className={styles['toggle-button']}
                onClick={onToggle}
                hasIcon={false}
                text={toggle ? 'I have an account' : 'Create new account'}
              />
            </motion.span>
          </AnimatePresence>

          <Button
            className={styles['login-button']}
            text={toggle ? 'Create' : 'Login'}
            renderIcon={() => <AiOutlineLogin />}
            iconFontSize={36}
            type='submit'
          />
        </div>
      </motion.form>
    </div>
  );
};

export default AuthForm;
