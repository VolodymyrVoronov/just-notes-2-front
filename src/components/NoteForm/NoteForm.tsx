import { useEventListener } from 'ahooks';
import { AxiosError } from 'axios';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { ERROR_MESSAGE_TIMEOUT } from '../../constants';
import { createNote, updateNote } from '../../services/services';
import type { INote } from '../../types';
import { Color, Key } from '../../types';

import Error from '../Error/Error';
import NoteFooter from '../NoteFooter/NoteFooter';

import styles from './NoteForm.module.css';

interface INoteFormProps {
  editedNote?: INote;
  noteColor?: keyof typeof Color;
  className?: string;

  onClearClick: () => void;
}

const NoteForm = ({
  editedNote,
  noteColor,
  className,

  onClearClick,
}: INoteFormProps): JSX.Element => {
  const textEditorRef = useRef<HTMLTextAreaElement>(null);

  const [note, setNote] = useState('');
  const [resError, setResError] = useState('');

  const isNoteToEdit = !!editedNote;

  useEffect(() => {
    if (isNoteToEdit) {
      setNote(editedNote.note);
    }
  }, []);

  const onEditorChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNote(e.target.value);
  };

  const onSaveClick = async (): Promise<void> => {
    if (!isNoteToEdit) {
      if (noteColor) {
        try {
          const res = await createNote({
            note,
            color: noteColor,
            favorite: false,
          });

          if (res.status === 200) {
            setNote('');
            onClearClick();
          }
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            setResError(error.response.data.message);

            const timeoutId = setTimeout(() => {
              setResError('');

              clearTimeout(timeoutId);
            }, ERROR_MESSAGE_TIMEOUT);
          }
        }
      }
    } else {
      try {
        const res = await updateNote(editedNote.id, note);

        if (res.status === 200) {
          setNote('');
          onClearClick();
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setResError(error.response.data.message);

          const timeoutId = setTimeout(() => {
            setResError('');

            clearTimeout(timeoutId);
          }, ERROR_MESSAGE_TIMEOUT);
        }
      }
    }
  };

  const onDeleteClick = (): void => {
    setNote('');
    onClearClick();
  };

  useEventListener('keydown', (e) => {
    if (e.key === Key.Escape) {
      setNote('');
    }
  });

  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          className={cn(
            styles.root,
            {
              [styles['root-orange']]: noteColor === Color.orange,
              [styles['root-yellow']]: noteColor === Color.yellow,
              [styles['root-purple']]: noteColor === Color.purple,
              [styles['root-blue']]: noteColor === Color.blue,
              [styles['root-lime']]: noteColor === Color.lime,
            },
            className,
          )}
          key={noteColor}
          onAnimationComplete={() => {
            textEditorRef.current?.focus();
          }}
          initial={{
            opacity: 0,
            y: -100,
          }}
          exit={{
            opacity: 0,
            y: 100,
            transition: {
              duration: 0.5,
            },
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          <textarea
            ref={textEditorRef}
            className={cn(styles.editor, {
              [styles['editor-orange']]: noteColor === Color.orange,
              [styles['editor-yellow']]: noteColor === Color.yellow,
              [styles['editor-purple']]: noteColor === Color.purple,
              [styles['editor-blue']]: noteColor === Color.blue,
              [styles['editor-lime']]: noteColor === Color.lime,
            })}
            value={note}
            onChange={onEditorChange}
          />

          <NoteFooter
            className={styles.footer}
            onEditSaveClick={onSaveClick}
            onDeleteClick={onDeleteClick}
            editMode={!isNoteToEdit}
          />
        </motion.div>
      </AnimatePresence>
      <Error error={resError} />
    </>
  );
};

export default NoteForm;
