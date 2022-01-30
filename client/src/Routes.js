import {FEED_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, CREATE_PAGE_ROUTE, USERS_LIST_ROUTE, SEARCH_ROUTE} from './utils/Consts'
import AuthPage from './pages/AuthPage/Auth';
import FeedPage from './pages/FeedPage/Feed';
import CreatePage from './pages/CreatePage/CreatePage';
import UsersPage from './pages/UsersPage/UsersPage';

export const authRoutes = [
    {
        path: CREATE_PAGE_ROUTE,
        Element: <CreatePage />
    },
    {
        path: USERS_LIST_ROUTE,
        Element: <UsersPage />
    },
]

export const publicRoutes = [
    {
        path: FEED_ROUTE,
        Element: <FeedPage />
    },
    {
        path: SEARCH_ROUTE,
        Element: <FeedPage />
    },
    {
        path: LOGIN_ROUTE,
        Element: <AuthPage />
    }, 
    {
        path: REGISTER_ROUTE,
        Element: <AuthPage />
    }, 
]