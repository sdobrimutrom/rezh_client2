import { Route } from 'react-router-dom';
import AddNews from '../pages/admin/news/AddNews';
import News from '../pages/admin/news/News';
import Requests from '../pages/admin/requests/Requests';
import Request from '../pages/admin/requests/Request';

export default [
    <Route path="news" key="news">
        <Route index element={<News />}/>
        <Route path="create" element={<AddNews />}/>
        <Route path="update" />
    </Route>,
    <Route path="requests" key="requests">
        <Route index element={<Requests />}/>
        <Route path=":id" element={<Request />}/>
    </Route>
];
