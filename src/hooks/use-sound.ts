import { useContext } from 'react';
import { SoundContext } from '@/context/sound-context';

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
