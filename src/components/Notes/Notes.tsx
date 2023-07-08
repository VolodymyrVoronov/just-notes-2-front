import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentProps } from 'react';

import type { INote } from '../../types';

import Note from '../Note/Note';

import styles from './Notes.module.css';

interface INotesProps extends ComponentProps<'div'> {
  noteData: INote[];
  searchedNotesQuery?: string;
  onDeleteClick: (id: number) => void;
  onEditClick: (noteData: INote) => void;
  onFavoriteClick: (noteId: number, favorite: boolean) => void;
  className?: string;
}

export const Notes = ({
  noteData,
  searchedNotesQuery,
  onDeleteClick,
  onEditClick,
  onFavoriteClick,
  className,
  ...props
}: INotesProps): JSX.Element => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      <AnimatePresence>
        {noteData.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0 }}
            exit={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
              },
            }}
          >
            <Note
              key={note.id}
              noteData={note}
              onDeleteClick={onDeleteClick}
              onEditClick={onEditClick}
              onFavoriteClick={onFavoriteClick}
              editMode
              searchedNotesQuery={searchedNotesQuery}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
