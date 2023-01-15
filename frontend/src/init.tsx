import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import filter from 'leo-profanity';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import store from './slices/index';
import resources from './locales/index';

const app = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources,
    });

  const vdom = document.getElementById('root') as HTMLElement;
  vdom.classList.add('h-100');
  document.querySelector('body')!.classList.add('h-100', 'bg-light');
  document.querySelector('html')!.classList.add('h-100');

  filter.loadDictionary('en');
  filter.add(['блять', 'бля', 'бляя'])

  const root = ReactDOM.createRoot(vdom);

  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
}

export default app;