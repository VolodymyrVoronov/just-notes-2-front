import type { ComponentProps } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { useClickAway } from 'ahooks';
import { AiOutlinePlus, AiOutlineLogout, AiOutlineStar } from 'react-icons/ai';

import { useUserStore } from '../../store/userStore';
import { useAuthStore } from '../../store/authStore';
import useWindowSize from '../../hooks/useWindowSize';
import getIconSize from '../../helpers/getIconSize';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';

import styles from './SideBar.module.css';
import NoteSideBarButtons from '../NoteSideBarButtons/NoteSideBarButtons';

interface ISideBarProps extends ComponentProps<'div'> {
  className?: string;
}

const SideBar = memo(({ className }: ISideBarProps): JSX.Element => {
  const { logout } = useAuthStore();
  const { removeUserInfo } = useUserStore();

  const sideBarRef = useRef<HTMLButtonElement>(null);

  const [showNotesIcons, setShowNotesIcons] = useState(false);
  const [showFavoriteNotes, setShowFavoriteNotes] = useState(false);
  const [width] = useWindowSize();

  const onAddNoteButtonClick = (color: string): void => {
    console.log('color', color);

    setShowNotesIcons(false);
  };

  const onLogoutButtonClick = (): void => {
    logout();
    removeUserInfo();
  };

  useClickAway(() => {
    setShowNotesIcons(false);
  }, sideBarRef);

  const addNoteButtonIconSize = getIconSize(width);
  const logoutButtonIconSize = getIconSize(width);

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
          ref={sideBarRef}
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
        {/* <AnimatePresence mode='wait'>
          <motion.div
            key={String(showFavoriteNotes)}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
            className={styles['note-button-wrapper']}
          >
            <Button
              onClick={onShowFavoriteNotesButtonClick}
              className={cn(styles['favorite-notes-button'])}
              hasText={false}
              iconUrl={
                showFavoriteNotes
                  ? '/icons/star-yellow-01.svg'
                  : '/icons/star-white-01.svg'
              }
              aria-label={
                anyFavoriteNotes
                  ? 'Show favorites notes'
                  : 'You do not have any favorites notes yet'
              }
              iconHeight={20}
              iconWidth={20}
              disabled={loading || anyFavoriteNotes}
            />
          </motion.div>
        </AnimatePresence> */}

        <Button
          onClick={onLogoutButtonClick}
          className={cn(styles['logout-button'])}
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
});

export default SideBar;
