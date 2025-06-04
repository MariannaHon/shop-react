import { BrowserRouter } from 'react-router-dom';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store, persistor } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './sass/main.scss';
import App from './components/App/App';
import { refreshUser } from './redux/auth/operations.ts';

const init = async () => {
    store.dispatch(refreshUser());

    const root = createRoot(document.getElementById('root')!);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </StrictMode>
    );
};

init();
