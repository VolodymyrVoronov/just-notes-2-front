import type { ComponentProps, Ref } from 'react';
import { forwardRef } from 'react';
import cn from 'classnames';
import { AiOutlineSearch } from 'react-icons/ai';

import styles from './Search.module.css';

interface ISearchProps extends ComponentProps<'input'> {
  className?: string;
}

const Search = forwardRef(
  (
    { className, ...props }: ISearchProps,
    ref?: Ref<HTMLInputElement>,
  ): JSX.Element => {
    return (
      <div className={cn(styles.root, className)}>
        <span className={styles.icon}>
          <AiOutlineSearch />
        </span>
        <input
          ref={ref}
          className={styles.input}
          placeholder='Search'
          {...props}
        />
      </div>
    );
  },
);

Search.displayName = 'Search';

export default Search;
