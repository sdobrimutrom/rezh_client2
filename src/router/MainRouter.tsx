import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Variant } from '../layouts/consts/navbarVariant';
import NavBar from '../layouts/NavBar';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import Forbidden from '../pages/Forbidden';
import News from '../pages/user/news/News';
import NewsItem from '../pages/user/news/NewsItem';
import AdminRouter from './AdminRouter';
import ProtectedRoute from './components/ProtectedRoute';
import DeputatRouter from './DeputatRouter';
import UserRouter from './UserRouter';
import CreateRequest from '../pages/user/requests/CreateRequest';
import Frequency from '../pages/user/requests/Frequency';
import Request from '../pages/user/requests/Request';
import Requests from '../pages/user/requests/Requests';

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar variant={Variant.USER} />}>
                    <Route index element={<Main />} />
                    <Route path="forbidden" element={<Forbidden />} />
                    <Route path="*" element={<NotFound />} />

                    <Route path="news">
                        <Route index element={<News />} />
                        <Route path=":id" element={<NewsItem />} />
                    </Route>

                    <Route path="requests">
                        <Route index element={<Requests />} />
                        <Route path=":id" element={<Request />}/>
                        <Route path="create" element={<CreateRequest />}/>
                        <Route path="frequency" element={<Frequency />}/>
                    </Route>

                    <Route element={<ProtectedRoute roles={['USER', 'DEPUTAT', 'ADMIN']} />}>
                        <Route index element={<div>я авторизован</div>} />
                        {UserRouter}
                    </Route>
                </Route>

                <Route path="/deputat" element={<ProtectedRoute roles={['DEPUTAT', 'ADMIN']} />}>
                    <Route element={<NavBar variant={Variant.DEPUTAT} />}>
                        <Route index element={<div>я депутат</div>} />
                        {DeputatRouter}
                    </Route>
                </Route>

                <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']} />}>
                    <Route element={<NavBar variant={Variant.ADMIN} />}>
                        <Route index element={<div>я админ</div>} />
                        {AdminRouter}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
