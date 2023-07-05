import { useEventListener, useHover } from 'ahooks';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { AiOutlineLogin } from 'react-icons/ai';

import getIconSize from '../../helpers/getIconSize';
import useWindowSize from '../../hooks/useWindowSize';
import type { FormType, IFormData } from '../../types';
import { Form, Key } from '../../types';

import Button from '../Button/Button';
import Input from '../Input/Input';

import styles from './AuthForm.module.css';

interface IAuthFormProps extends ComponentProps<'div'> {
  onSubmitButtonClick: (data: IFormData, type: FormType) => void;

  className?: string;
}

const AuthForm = ({
  onSubmitButtonClick,
  className,
  ...props
}: IAuthFormProps): JSX.Element => {
  const rootRef = useRef(null);
  const isRootHovering = useHover(rootRef);
  const [toggle, setToggle] = useState(false);
  const [width] = useWindowSize();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const onFormSubmit = (data: IFormData | FieldValues): void => {
    onSubmitButtonClick(data as IFormData, toggle ? Form.Register : Form.Login);

    reset();
  };

  const onToggle = (): void => {
    setToggle(!toggle);
    reset();

    const timeoutId = setTimeout(() => {
      setFocus('login');

      clearTimeout(timeoutId);
    }, 1000);
  };

  useEventListener('keydown', (e) => {
    if (e.key === Key.Escape) {
      reset();
    }
  });

  useEffect(() => {
    setFocus('login');
  }, []);

  const iconSize = getIconSize(width);

  return (
    <div ref={rootRef} className={cn(styles.root, className)} {...props}>
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
              type='text'
              aria-label='Login'
              {...register('login', {
                required: true,
                minLength: {
                  value: 3,
                  message: 'Login must be at least 3 characters long',
                },
              })}
            />
            {errors.login?.type === 'required' && (
              <span className={styles.error}>Login is required.</span>
            )}
            {errors.login && (
              <span className={styles.error}>
                {errors.login.message as string}
              </span>
            )}

            <Input
              className={styles.input}
              labelText='Password'
              type='password'
              aria-label='Password'
              {...register('password', {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 6,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      value,
                    ),
                },
              })}
            />
            {errors.password?.type === 'required' && (
              <span className={styles.error}>Password is required.</span>
            )}

            {errors.password?.type === 'checkLength' && (
              <span className={styles.error}>
                Password should be at-least 6 characters.
              </span>
            )}

            {errors.password?.type === 'matchPattern' && (
              <span className={styles.error}>
                Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol.
              </span>
            )}

            {toggle && (
              <Input
                className={styles.input}
                labelText='Confirm password'
                type='password'
                aria-label='Confirm password'
                {...register('confirmedPassword', {
                  required: true,
                  validate: (value: string) => {
                    if (watch('password') !== value) {
                      return 'Your passwords do not match';
                    }

                    return true;
                  },
                })}
              />
            )}
            {toggle && errors.confirmedPassword?.type === 'required' && (
              <span className={styles.error}>Password is required.</span>
            )}

            {toggle && errors.confirmedPassword && (
              <span className={styles.error}>
                {errors.confirmedPassword.message as string}
              </span>
            )}
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
                className={cn(styles['toggle-button'], {
                  [styles['toggle-button-opacity']]: isRootHovering,
                })}
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
            iconFontSize={iconSize}
            iconHeight={iconSize}
            iconWidth={iconSize}
            type='submit'
            disabled={Object.keys(errors).length > 0}
          />
        </div>
      </motion.form>
    </div>
  );
};

export default AuthForm;
