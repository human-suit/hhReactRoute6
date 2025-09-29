import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { VacancyPage } from './pages';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/vacancies" replace />} />
          <Route
            path="/hhReactRoute6"
            element={<Navigate to="/vacancies" replace />}
          />
          <Route path="/vacancies" element={<App />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </Provider>
);
