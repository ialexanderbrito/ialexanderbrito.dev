import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorkerRegistration.register();

reportWebVitals();
