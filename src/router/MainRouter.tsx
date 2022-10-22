import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminNavBar from '../layouts/AdminNavBar';
import DeputatNavBar from '../layouts/DeputatNavBar';
import NavBar from '../layouts/NavBar';
import Main from '../pages/Main';
import News from '../pages/News';
import NotFound from '../pages/NotFound';
import Unforbidden from '../pages/Unforbidden';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AuthProtectedRoute from './components/AuthProtectedRoute';
import DeputatProtectedRoute from './components/DeputatProtectedRoute';

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route index element={<Main />} />
                    <Route path="news" element={<News />} />
                    <Route path="unforbidden" element={<Unforbidden />} />
                    <Route path="*" element={<NotFound />} />
                    <Route element={<AuthProtectedRoute />}>
                        <Route index element={<div>я авторизован</div>} />
                        {/* сюда пихаем роуты, доступные только авторизованным пользователям */}
                    </Route>
                </Route>
                <Route path="/deputat" element={<DeputatProtectedRoute />}>
                    <Route element={<DeputatNavBar />}>
                        <Route index element={<div>я депутат</div>} />
                        {/* сюда пихаем роуты, доступные только депутатам */}
                    </Route>
                </Route>
                <Route path="/admin" element={<AdminProtectedRoute />}>
                    <Route element={<AdminNavBar />}>
                        <Route path="news" element={<News />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
