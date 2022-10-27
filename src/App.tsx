import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import ErrorPage from './pages/ErrorPage';
import MainRouter from './router/MainRouter';
import { store } from './store/store';

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Provider store={store}>
                <MainRouter />
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
