import cn from 'classnames';
import type { ComponentProps } from 'react';
import Highlighter from 'react-highlight-words';

import type { INote } from '../../types';
import { Color } from '../../types';

import NoteFooter from '../NoteFooter/NoteFooter';

import styles from './Note.module.css';

interface INoteProps extends ComponentProps<'div'> {
  noteData: INote;
  editMode: boolean;
  searchedNotesQuery?: string;
  onDeleteClick: (id: number) => void;
  onEditClick: (noteData: INote) => void;
  onFavoriteClick: (noteId: number, favorite: boolean) => void;
  className?: string;
}

const Note = ({
  noteData,
  className,
  editMode,
  searchedNotesQuery,
  onDeleteClick,
  onEditClick,
  onFavoriteClick,
  ...props
}: INoteProps): JSX.Element => {
  const { id, note, color, favorite, createdAt } = noteData;

  return (
    <div
      className={cn(styles.root, className, {
        [styles['root-orange']]: color === Color.orange,
        [styles['root-yellow']]: color === Color.yellow,
        [styles['root-purple']]: color === Color.purple,
        [styles['root-blue']]: color === Color.blue,
        [styles['root-lime']]: color === Color.lime,
      })}
      {...props}
    >
      <div className={styles['note-container']}>
        <span className={styles.note}>
          <Highlighter
            searchWords={[searchedNotesQuery || '']}
            autoEscape
            textToHighlight={note}
          />
        </span>
      </div>

      <div className={styles['note-footer']}>
        <span className={styles['note-created-date']}>
          {new Date(Date.parse(createdAt)).toDateString().slice(4)}
        </span>

        <NoteFooter
          className={styles.footer}
          onEditSaveClick={() => onEditClick(noteData)}
          onDeleteClick={() => onDeleteClick(id)}
          onFavoriteClick={() => onFavoriteClick(id, !favorite)}
          editMode={editMode}
          favorite={favorite}
          isSmallCard
        />
      </div>
    </div>
  );
};

export default Note;
