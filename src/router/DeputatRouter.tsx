import { Route } from 'react-router-dom';
import Requests from '../pages/deputat/requests/Requests';
import Request from '../pages/deputat/requests/Request';

export default [
    <Route path="requests" key="requests">
        <Route index element={<Requests />}/>
        <Route path=":id" element={<Request />}/>
    </Route>,
];
