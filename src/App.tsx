import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import WelcomeScreen from './components/WelcomeScreen';
import MainScreen from './components/MainScreen';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);

  const name = "Karuna Dahal";
  const nickname = "Aalu";

  return (
    <div className="w-full h-screen bg-[#FEF4F4]">
      <AnimatePresence mode="wait">
        {!hasOpened ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <WelcomeScreen onOpen={() => setHasOpened(true)} nickname={nickname} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="w-full min-h-screen"
          >
            <MainScreen name={name} nickname={nickname} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

