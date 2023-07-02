import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { RouterPath } from './constants';

import Start from './pages/Start/Start';
import Notes from './pages/Notes/Notes';

const App = (): JSX.Element => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path={RouterPath.Start} element={<Start />} />
        <Route path={RouterPath.Notes} element={<Notes />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
