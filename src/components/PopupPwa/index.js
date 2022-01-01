/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { GrInstall } from 'react-icons/gr';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import './styles.scss';

export function PopupPwa() {
  const [isActive, setIsActive] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Impedir que o mini-infobar apareça no celular
      e.preventDefault();
      // Armazena o evento para poder ser acionado mais tarde.
      setDeferredPrompt(e);
      // Atualizar a interface e notifica o usuário de que pode instalar o PWA
      setIsActive(true);
    });
  }, []);

  const closePopup = () => setIsActive(false);

  const handleInstallPwa = () => {
    closePopup();

    // Mostra o prompt de instalação
    deferredPrompt.prompt();

    // Aguarde o usuário responder ao prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        toast.success('PWA instalado com sucesso!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warning('Você recusou a instalação do App', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  return (
    <>
      {isActive && (
        <div className="container-popup">
          <div className="container-principal">
            <div className="container-description">
              <span className="container-button" onClick={() => closePopup()}>
                <div className="button-close">
                  <IoIosClose size={24} color="#FFF" />
                </div>
              </span>
              <img
                src="/icon-192x192.png"
                width="50"
                height="50"
                alt="ialexanderbrito"
              />
              <p className="font-title">Adicione nosso App à tela inicial!</p>
            </div>
            <div className="link-popup" onClick={() => handleInstallPwa()}>
              <GrInstall size={16} color="#FFF" />
              Adicionar Atalho
            </div>
          </div>
        </div>
      )}
    </>
  );
}
