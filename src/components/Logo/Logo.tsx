import type { ComponentProps } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';

import styles from './Logo.module.css';

interface LogoProps extends ComponentProps<'div'> {
  type: 'big' | 'small';
  text: string;
  className?: string;
}

const Logo = ({ type, text, className, ...props }: LogoProps): JSX.Element => {
  if (type === 'big') {
    return (
      <div className={cn(styles['root-big'], className)} {...props}>
        {text.split(' ').map((word) => (
          <motion.span
            key={word}
            className={styles['root-big-word']}
            initial={{
              x: -200,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: 0.05,
                duration: 1,
              },
            }}
            aria-label={text}
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(styles['root-small'], className)} {...props}>
      {text}
    </div>
  );
};

export default Logo;
