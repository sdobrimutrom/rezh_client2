import { Provider } from 'react-redux';

import MainRouter from './router/MainRouter';
import { store } from './store/store';

function App() {
    return (
        <Provider store={store}>
            <MainRouter />
        </Provider>
    );
}

export default App;
