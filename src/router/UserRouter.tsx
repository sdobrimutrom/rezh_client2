import { Route } from 'react-router-dom';
import Requests from '../pages/user/requests/Requests';
import Request from '../pages/user/requests/Request';
import Profile from '../pages/Profile';

export default [
    <Route path="requests" key="requests">
        <Route index element={<Requests />} />
        <Route path=":id" element={<Request />} />
    </Route>,
    <Route path="profile" key="profile" element={<Profile />} />
];
