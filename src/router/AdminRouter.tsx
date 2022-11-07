import { Route } from 'react-router-dom';

export default [
    <Route path="news" key="news">
        <Route index  />
        <Route path="create" />
        <Route path="update" />
    </Route>,
    <Route path="requests" key="requests">
        <Route index />
        <Route path=":id" />
    </Route>
];
