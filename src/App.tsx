import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import WelcomeScreen from './components/WelcomeScreen';
import BirthdayWish from './components/BirthdayWish';
import MainScreen from './components/MainScreen';

type AppStage = 'welcome' | 'wish' | 'main';

export default function App() {
  const [stage, setStage] = useState<AppStage>('welcome');

  const name = "Karuna Dahal";
  const nickname = "Aalu";

  return (
    <div className="w-full min-h-screen bg-[#FEF4F4] overflow-x-hidden">
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full h-screen"
          >
            <WelcomeScreen onOpen={() => setStage('wish')} nickname={nickname} />
          </motion.div>
        )}

        {stage === 'wish' && (
          <motion.div
            key="wish"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full min-h-screen"
          >
            <BirthdayWish onComplete={() => setStage('main')} nickname={nickname} />
          </motion.div>
        )}

        {stage === 'main' && (
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


