import { Route } from 'react-router-dom';
import Requests from '../pages/user/requests/Requests';
import Request from '../pages/user/requests/Request';

export default [
    <Route path="requests" key="requests">
        <Route index element={<Requests />}/>
        <Route path=":id" element={<Request />}/>
    </Route>
];
