import { Route } from 'react-router-dom';

import News from '../pages/admin/news/News';

export default [
    <Route path="news" key="news">
        <Route index element={<News />} />
        <Route path="create" />
        <Route path="update" />
    </Route>
];
