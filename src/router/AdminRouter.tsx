import { Route } from 'react-router-dom';

import AddNews from '../pages/admin/news/AddNews';
import News from '../pages/admin/news/News';

export default [
    <Route path="news" key="news">
        <Route index element={<News />} />
        <Route path="create" element={<AddNews />} />
        <Route path="update" />
    </Route>
];
