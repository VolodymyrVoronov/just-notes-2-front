import { createPortal } from 'react-dom';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './Error.module.css';

interface IErrorProps {
  error: string;
  className?: string;
}
const errorPortal = document.getElementById('error-portal') as HTMLElement;

const Error = ({ error, className }: IErrorProps): JSX.Element => {
  return (
    <>
      {createPortal(
        <AnimatePresence mode='wait'>
          {error && (
            <motion.span
              initial={{ opacity: 0, translateY: 25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, translateY: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, translateY: 25, filter: 'blur(5px)' }}
              className={cn(styles.root, className)}
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>,
        errorPortal,
      )}
    </>
  );
};

export default Error;
