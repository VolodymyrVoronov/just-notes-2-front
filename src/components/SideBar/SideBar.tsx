import { useClickAway } from 'ahooks';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentProps } from 'react';
import { memo, useRef, useState } from 'react';
import {
  AiFillStar,
  AiOutlineLogout,
  AiOutlinePlus,
  AiOutlineStar,
} from 'react-icons/ai';

import getIconSize from '../../helpers/getIconSize';
import useWindowSize from '../../hooks/useWindowSize';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
import type { Color } from '../../types';

import Button from '../Button/Button';
import Logo from '../Logo/Logo';

import NoteSideBarButtons from '../NoteSideBarButtons/NoteSideBarButtons';
import styles from './SideBar.module.css';

interface ISideBarProps extends ComponentProps<'div'> {
  editMode?: boolean;
  anyFavorite?: boolean;
  className?: string;
  onAddNoteClick: (color: keyof typeof Color) => void;
  onShowFavoriteNotesButtonClick: () => void;
}

const SideBar = memo(
  ({
    editMode,
    anyFavorite,
    className,
    onAddNoteClick,
    onShowFavoriteNotesButtonClick,
  }: ISideBarProps): JSX.Element => {
    const { logout } = useAuthStore();
    const { removeUserInfo } = useUserStore();

    const [width] = useWindowSize();

    const addNoteButtonRef = useRef<HTMLButtonElement>(null);

    const [showNotesIcons, setShowNotesIcons] = useState(false);

    const onAddNoteButtonClick = (color: keyof typeof Color): void => {
      onAddNoteClick(color);

      setShowNotesIcons(false);
    };

    const onLogoutButtonClick = (): void => {
      logout();
      removeUserInfo();
    };

    useClickAway(() => {
      setShowNotesIcons(false);
    }, addNoteButtonRef);

    const addNoteButtonIconSize = getIconSize(width);
    const logoutButtonIconSize = getIconSize(width, 26, 30, 34, 40);
    const favoriteButtonIconSize = getIconSize(width, 26, 30, 34, 40);

    return (
      <div className={cn(styles.root, className)}>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
              ease: 'easeInOut',
            },
          }}
        >
          <Logo type='small' text='JS' />
        </motion.div>

        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
              ease: 'easeInOut',
            },
          }}
        >
          <Button
            ref={addNoteButtonRef}
            onClick={() => setShowNotesIcons(!showNotesIcons)}
            className={cn(styles['add-note-button'], {
              [styles['add-note-button--active']]: showNotesIcons,
            })}
            hasText={false}
            aria-label='Create and add note button'
            renderIcon={() => <AiOutlinePlus />}
            iconFontSize={addNoteButtonIconSize}
            iconHeight={addNoteButtonIconSize}
            iconWidth={addNoteButtonIconSize}
            disabled={editMode}
          />
        </motion.div>

        <NoteSideBarButtons
          showNotesIcons={showNotesIcons}
          onClickHandler={onAddNoteButtonClick}
        />

        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
              ease: 'easeInOut',
            },
          }}
          className={styles['footer-buttons']}
        >
          <AnimatePresence mode='wait'>
            {anyFavorite && (
              <motion.div
                key={String(anyFavorite)}
                initial={{
                  opacity: 0,
                  y: -50,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    duration: 0.2,
                  },
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.2,
                  },
                }}
                className={styles['note-button-wrapper']}
              >
                <Button
                  onClick={onShowFavoriteNotesButtonClick}
                  className={cn(styles['favorite-notes-button'], {
                    [styles['favorite-notes-button-active']]: anyFavorite,
                  })}
                  hasText={false}
                  aria-label={
                    anyFavorite
                      ? 'Show favorites notes'
                      : 'You do not have any favorites notes yet'
                  }
                  renderIcon={() =>
                    anyFavorite ? <AiFillStar /> : <AiOutlineStar />
                  }
                  iconFontSize={favoriteButtonIconSize}
                  iconHeight={favoriteButtonIconSize}
                  iconWidth={favoriteButtonIconSize}
                  disabled={!anyFavorite}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            onClick={onLogoutButtonClick}
            className={styles['logout-button']}
            hasText={false}
            aria-label='Logout button'
            renderIcon={() => <AiOutlineLogout />}
            iconFontSize={logoutButtonIconSize}
            iconHeight={logoutButtonIconSize}
            iconWidth={logoutButtonIconSize}
          />
        </motion.div>
      </div>
    );
  },
);

export default SideBar;
