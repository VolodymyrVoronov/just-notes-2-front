import { useEventListener } from 'ahooks';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentProps, Ref } from 'react';
import { forwardRef, useState } from 'react';

import { Key } from '../../types';

import styles from './Button.module.css';

interface IButtonProps extends ComponentProps<'button'> {
  hasText?: boolean;
  text?: string;
  hasIcon?: boolean;
  renderIcon?: () => JSX.Element;
  iconWidth?: number;
  iconHeight?: number;
  iconFontSize?: number;
}

const Button = forwardRef(
  (
    {
      hasText = true,
      text,
      hasIcon = true,
      renderIcon,
      iconWidth = 45,
      iconHeight = 45,
      iconFontSize = 20,
      className,

      ...props
    }: IButtonProps,
    ref?: Ref<HTMLButtonElement>,
  ): JSX.Element => {
    const [isHovered, setIsHovered] = useState(false);

    useEventListener('keydown', (e) => {
      if (e.key === Key.Escape) {
        setIsHovered(false);
      }
    });

    return (
      <button
        ref={ref}
        className={cn(styles.root, className, {
          [styles['root-text-only']]: !hasIcon,
          [styles['root-icon-only']]: !hasText,
        })}
        onMouseEnter={hasIcon && hasText ? () => setIsHovered(true) : undefined}
        onMouseLeave={
          hasIcon && hasText ? () => setIsHovered(false) : undefined
        }
        onFocus={hasIcon && hasText ? () => setIsHovered(true) : undefined}
        onBlur={hasIcon && hasText ? () => setIsHovered(false) : undefined}
        type='button'
        {...props}
      >
        {hasText && hasIcon && (
          <AnimatePresence mode='wait'>
            {isHovered && (
              <motion.span
                key={String(isHovered)}
                className={styles.text}
                initial={{ opacity: 0, translateX: 100, filter: 'blur(10px)' }}
                exit={{
                  opacity: 0,
                  translateX: 0,
                  filter: 'blur(5px)',
                  transition: {
                    duration: 0.5,
                  },
                }}
                animate={{
                  opacity: 1,
                  translateX: 0,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.5,
                  },
                }}
              >
                {text}
              </motion.span>
            )}
          </AnimatePresence>
        )}

        {hasIcon ? (
          <span
            style={{
              width: iconWidth,
              height: iconHeight,
              fontSize: iconFontSize,
            }}
            className={styles.icon}
          >
            {renderIcon && renderIcon()}
          </span>
        ) : (
          <span className={cn(styles.text, styles['text-only'])}>{text}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
