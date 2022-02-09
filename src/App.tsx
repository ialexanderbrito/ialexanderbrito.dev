import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'contexts/Theme';
import { TwitchProvider } from 'contexts/Twitch';

import { MainRoutes } from './routes';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-slideshow-image/dist/styles.css';
import './styles/global.scss';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <TwitchProvider>
          <MainRoutes />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </TwitchProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
