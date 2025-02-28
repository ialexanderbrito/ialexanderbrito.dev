'use client';

import { useEffect } from 'react';

import { toast } from '@/hooks';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import { getSessionStorageItem } from '@/utils/getSessionStorageItem';

export function ConsoleEasterEgg() {
  const timeOfDay = useTimeOfDay();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return;
    if (!timeOfDay) return;

    function greetingMessage() {
      if (timeOfDay === 'dia') {
        return 'um bom dia 🌞';
      } else if (timeOfDay === 'tarde') {
        return 'uma boa tarde 🌞';
      } else {
        return 'uma boa noite 🌙';
      }
    }

    console.log(`%c Opa, o que você tá fazendo aqui? 🤪`, 'font-size: 2rem; font-weight: bold;');
    console.log(
      '💻 Você pode visualizar o código-fonte deste site em https://github.com/ialexanderbrito/ialexanderbrito.dev',
    );
    console.log('Se você estiver interessado, entre em contato comigo em https://www.linkedin.com/in/ialexanderbrito');
    console.log(`Tenha ${greetingMessage()}!`);

    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};

    function showEasterEggUnlockedAlert() {
      if (getSessionStorageItem('@ialexanderbrito:unlockedConsoleEasterEgg')) return;

      toast({
        title: '🔍👀 Você é um curioso, hein?',
        description: 'Um novo easter egg foi encontrado! Abra o console para descobrir.',
        duration: 10000,
      });
      sessionStorage.setItem('@ialexanderbrito:unlockedConsoleEasterEgg', 'true');
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'F12' ||
        ((event.ctrlKey || event.metaKey) &&
          (event.shiftKey || event.altKey) &&
          (event.key === 'I' || event.key === 'J' || event.key === 'C'))
      ) {
        showEasterEggUnlockedAlert();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [timeOfDay]);

  return null;
}
