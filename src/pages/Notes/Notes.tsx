import { useEventListener } from 'ahooks';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGE_TIMEOUT } from '../../constants';
import {
  addToFavorite,
  deleteNote,
  getAllNotes,
  getProfile,
} from '../../services/services';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import type { Color, INote } from '../../types';
import { Key, RouterPath } from '../../types';

import Error from '../../components/Error/Error';
import NoteForm from '../../components/NoteForm/NoteForm';
import { Notes as NotesItems } from '../../components/Notes/Notes';
import Search from '../../components/Search/Search';
import SideBar from '../../components/SideBar/SideBar';

import styles from './Notes.module.css';

const Notes = (): JSX.Element => {
  const navigate = useNavigate();

  const { isLoggedIn, accessToken, refreshToken } = useAuthStore();
  const { saveUserInfo } = useUserStore();

  const [resError, setResError] = useState('');
  const [noteColor, setNoteColor] = useState<keyof typeof Color | undefined>(
    undefined,
  );
  const [notes, setNotes] = useState<INote[]>([]);
  const [editedNote, setEditedNote] = useState<INote | null>(null);
  const [showFavoriteNotes, setShowFavoriteNotes] = useState(false);
  const [searchedNotesQuery, setSearchedNotesQuery] = useState<string>('');

  const refetchNotes = () => {
    if (isLoggedIn()) {
      getAllNotes()
        .then(({ data }) => {
          setNotes(data);
        })
        .catch((error) => {
          if (error instanceof AxiosError && error.response) {
            setResError(error.response.data.message);

            const timeoutId = setTimeout(() => {
              setResError('');

              clearTimeout(timeoutId);
            }, ERROR_MESSAGE_TIMEOUT);
          }
        });
    }
  };

  const onAddNoteClick = (color: keyof typeof Color): void => {
    if (typeof color !== undefined) {
      setNoteColor(color);
    }
  };

  const onClearClick = (): void => {
    setNoteColor(undefined);
    refetchNotes();

    if (editedNote) {
      setEditedNote(null);
    }
  };

  const onDeleteNoteClick = (id: number): void => {
    deleteNote(id)
      .then(({ data }) => {
        if (data.status === 200) {
          refetchNotes();
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          setResError(error.response.data.message);

          const timeoutId = setTimeout(() => {
            setResError('');

            clearTimeout(timeoutId);
          }, ERROR_MESSAGE_TIMEOUT);
        }
      });
  };

  const onFavoriteClick = (id: number, favorite: boolean): void => {
    addToFavorite(id, favorite)
      .then(({ data }) => {
        if (data.status === 200) {
          refetchNotes();
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError && error.response) {
          setResError(error.response.data.message);

          const timeoutId = setTimeout(() => {
            setResError('');

            clearTimeout(timeoutId);
          }, ERROR_MESSAGE_TIMEOUT);
        }
      });
  };

  const onEditClick = (note: INote): void => {
    setEditedNote(note);
  };

  const onShowFavoriteNotesClick = () => {
    setShowFavoriteNotes(!showFavoriteNotes);
  };

  const onSearchNoteInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchedNotesQuery(e.target.value);
  };

  useEffect(() => {
    refetchNotes();
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(RouterPath.Start);
    }

    if (isLoggedIn()) {
      getProfile()
        .then(({ data }) => {
          saveUserInfo(data);
        })
        .catch((error) => {
          if (error instanceof AxiosError && error.response) {
            setResError(error.response.data.message);

            const timeoutId = setTimeout(() => {
              setResError('');

              clearTimeout(timeoutId);
            }, ERROR_MESSAGE_TIMEOUT);
          }
        });
    }
  }, [accessToken, refreshToken]);

  useEventListener('keydown', (e) => {
    if (e.key === Key.Escape) {
      setSearchedNotesQuery('');
    }
  });

  const favoriteNotes = showFavoriteNotes
    ? notes.filter((note) => note.favorite)
    : notes;

  useEffect(() => {
    if (!favoriteNotes.length) {
      setShowFavoriteNotes(false);
    }
  }, [favoriteNotes]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      }}
      className={styles.root}
    >
      <div className={styles.left}>
        <SideBar
          anyFavorite={notes.some((note) => note.favorite)}
          onAddNoteClick={onAddNoteClick}
          onShowFavoriteNotesButtonClick={onShowFavoriteNotesClick}
          editMode={editedNote !== null}
        />
      </div>

      <div className={styles.right}>
        <Search
          onChange={onSearchNoteInputChange}
          value={searchedNotesQuery}
          disabled={!notes.length}
        />

        {!notes.length && (
          <div className={styles['no-notes']}>
            <span>No notes</span>
          </div>
        )}

        <div className={styles.notes}>
          <NotesItems
            noteData={favoriteNotes.filter((note) =>
              note.note
                .toLowerCase()
                .includes(searchedNotesQuery.toLowerCase()),
            )}
            onDeleteClick={onDeleteNoteClick}
            onFavoriteClick={onFavoriteClick}
            onEditClick={onEditClick}
            searchedNotesQuery={searchedNotesQuery}
          />
        </div>

        {noteColor && (
          <NoteForm onClearClick={onClearClick} noteColor={noteColor} />
        )}

        {editedNote !== null && (
          <NoteForm
            onClearClick={onClearClick}
            noteColor={editedNote.color}
            editedNote={editedNote}
          />
        )}
      </div>

      <Error error={resError} />
    </motion.div>
  );
};

export default Notes;
