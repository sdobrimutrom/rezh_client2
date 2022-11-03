import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Variant } from '../layouts/consts/navbarVariant';
import NavBar from '../layouts/NavBar';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import Unforbidden from '../pages/Unforbidden';
import News from '../pages/user/news/News';
import NewsItem from '../pages/user/news/NewsItem';
import AdminRouter from './AdminRouter';
import ProtectedRoute from './components/ProtectedRoute';
import DeputatRouter from './DeputatRouter';
import UserRouter from './UserRouter';

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar variant={Variant.USER} />}>
                    <Route index element={<Main />} />
                    <Route path="unforbidden" element={<Unforbidden />} />
                    <Route path="*" element={<NotFound />} />

                    <Route path="news">
                        <Route index element={<News />} />
                        <Route path=":id" element={<NewsItem />} />
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
