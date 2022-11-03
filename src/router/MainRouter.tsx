import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Variant } from '../layouts/consts/navbarVariant';
import NavBar from '../layouts/NavBar';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import Unforbidden from '../pages/Unforbidden';
import News from '../pages/user/News';
import NewsItem from '../pages/user/NewsItem';
import ProtectedRoute from './components/ProtectedRoute';

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar variant={Variant.USER} />}>
                    <Route index element={<Main />} />
                    <Route path="news">
                        <Route index element={<News />} />
                        <Route path=":id" element={<NewsItem />} />
                    </Route>
                    <Route path="unforbidden" element={<Unforbidden />} />
                    <Route path="*" element={<NotFound />} />
                    <Route element={<ProtectedRoute roles={['USER', 'DEPUTAT', 'ADMIN']} />}>
                        <Route index element={<div>я авторизован</div>} />
                        {/* сюда пихаем роуты, доступные только авторизованным пользователям */}
                    </Route>
                </Route>
                <Route path="/deputat" element={<ProtectedRoute roles={['DEPUTAT', 'ADMIN']} />}>
                    <Route element={<NavBar variant={Variant.DEPUTAT} />}>
                        <Route index element={<div>я депутат</div>} />
                        {/* сюда пихаем роуты, доступные только депутатам */}
                    </Route>
                </Route>
                <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']} />}>
                    <Route element={<NavBar variant={Variant.ADMIN} />}>
                        {/* сюда пихаем роуты, доступные только админам */}
                        <Route path="news" element={<News />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
