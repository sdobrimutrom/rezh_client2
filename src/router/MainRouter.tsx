import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
import { useGetMeQuery } from '../store/api/auth.api';
import SearchRequest from '../pages/user/requests/SearchRequest';
import Deputats from '../pages/Deputats';
import Registration from '../pages/Registration';
import BeforeAfter from '../pages/user/before-after/BeforeAfter';
import BeforeAfterItem from '../pages/user/before-after/BeforeAfterItem';
import { EVariant } from '../layouts/consts';

export default function MainRouter() {
    const { isLoading, isFetching } = useGetMeQuery(null, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <NavBar variant={ EVariant.USER } /> }>
                    <Route index element={ <Main /> } />
                    <Route path="forbidden" element={ <Forbidden /> } />
                    <Route path="*" element={ <NotFound /> } />
                    <Route path="registration" element={<Registration />}/>
                    <Route path="deputats" element={ <Deputats /> } />
                    <Route path="before_after">
                        <Route index element={ <BeforeAfter /> } />
                        <Route path=":id" element={ <BeforeAfterItem /> } />
                    </Route>

                    <Route path="news">
                        <Route index element={ <News /> } />
                        <Route path=":id" element={ <NewsItem /> } />
                    </Route>

                    <Route path="requests">
                        <Route path="create" element={ <CreateRequest /> } />
                        <Route path="frequency" element={ <Frequency /> } />
                        <Route path="search" element={ <SearchRequest /> } />
                    </Route>

                    <Route element={ <ProtectedRoute roles={ ['USER', 'DEPUTAT', 'ADMIN'] } /> }>
                        { UserRouter }
                    </Route>
                </Route>

                <Route path="/deputat" element={ <ProtectedRoute roles={ ['DEPUTAT', 'ADMIN'] } /> }>
                    <Route element={ <NavBar variant={ EVariant.DEPUTAT } /> }>
                        <Route index element={ <div>Добро пожаловать в панель депутата</div> } />
                        { DeputatRouter }
                    </Route>
                </Route>

                <Route path="/admin" element={ <ProtectedRoute roles={ ['ADMIN'] } /> }>
                    <Route element={ <NavBar variant={ EVariant.ADMIN } /> }>
                        <Route index element={ <div>Добро пожаловать в панель администратора</div> } />
                        { AdminRouter }
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
