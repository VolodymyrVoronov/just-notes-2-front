import cn from 'classnames';
import { forwardRef, useId, type ComponentProps, type Ref } from 'react';

import styles from './Input.module.css';

interface IInputProps extends ComponentProps<'input'> {
  labelText: string;
  className?: string;
}

const Input = forwardRef(
  (
    {
      labelText,
      className,

      ...props
    }: IInputProps,
    ref?: Ref<HTMLInputElement>,
  ): JSX.Element => {
    const id = useId();

    return (
      <div className={cn(styles.root, className)}>
        <label htmlFor={id} className={styles.label}>
          {labelText}
        </label>
        <input ref={ref} className={styles.input} id={id} {...props} />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
