import 'react-notifications-component/dist/theme.css';

import { ErrorBoundary } from 'react-error-boundary';
import { ReactNotifications } from 'react-notifications-component';
import { Provider } from 'react-redux';

import ErrorPage from './pages/ErrorPage';
import MainRouter from './router/MainRouter';
import { store } from './store/store';

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Provider store={store}>
                <ReactNotifications />
                <MainRouter />
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
