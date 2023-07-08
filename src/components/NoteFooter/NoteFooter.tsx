import type { ComponentProps } from 'react';
import cn from 'classnames';
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineDelete,
  AiOutlineSave,
  AiOutlineEdit,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

import getIconSize from '../../helpers/getIconSize';
import useWindowSize from '../../hooks/useWindowSize';

import Button from '../Button/Button';

import styles from './NoteFooter.module.css';

interface INoteFooterProps extends ComponentProps<'div'> {
  noteDate?: string;
  favorite?: boolean;
  editMode?: boolean;
  className?: string;
  isSmallCard?: boolean;

  onFavoriteClick?: () => void;
  onDeleteClick: () => void;
  onEditSaveClick: () => void;
}

const NoteFooter = ({
  noteDate,
  favorite,
  editMode,
  className,
  isSmallCard,

  onFavoriteClick,
  onDeleteClick,
  onEditSaveClick,

  ...props
}: INoteFooterProps): JSX.Element => {
  const [width] = useWindowSize();

  const buttonIconSize = isSmallCard
    ? getIconSize(width, 24, 24, 24, 24)
    : getIconSize(width, 26, 30, 34, 40);

  const onFavoriteButtonClick = (): void => {
    if (onFavoriteClick) {
      onFavoriteClick();
    }
  };

  const onDeleteButtonClick = (): void => {
    onDeleteClick();
  };

  const onEditSaveButtonClick = (): void => {
    onEditSaveClick();
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      {noteDate && (
        <span className={styles.date}>
          {new Date(Date.parse(noteDate)).toDateString().slice(4)}
        </span>
      )}

      <div className={styles.buttons}>
        {(favorite === false || favorite === true) && (
          <Button
            onClick={onFavoriteButtonClick}
            className={cn(styles.button, {
              [styles['button-favorite']]: favorite === true,
            })}
            hasText={false}
            aria-label='Favorite button'
            renderIcon={() => (favorite ? <AiFillStar /> : <AiOutlineStar />)}
            iconFontSize={buttonIconSize}
            iconHeight={buttonIconSize}
            iconWidth={buttonIconSize}
          />
        )}

        <Button
          onClick={onDeleteButtonClick}
          className={styles.button}
          hasText={false}
          aria-label={editMode ? 'Delete button' : 'Close button'}
          renderIcon={() =>
            editMode ? <AiOutlineDelete /> : <AiOutlineCloseCircle />
          }
          iconFontSize={buttonIconSize}
          iconHeight={buttonIconSize}
          iconWidth={buttonIconSize}
        />

        <Button
          onClick={onEditSaveButtonClick}
          className={styles.button}
          hasText={false}
          aria-label={editMode ? 'Edit button' : 'Save button'}
          renderIcon={() => (editMode ? <AiOutlineEdit /> : <AiOutlineSave />)}
          iconFontSize={buttonIconSize}
          iconHeight={buttonIconSize}
          iconWidth={buttonIconSize}
        />
      </div>
    </div>
  );
};

export default NoteFooter;
