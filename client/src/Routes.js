import {FEED_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, CREATE_PAGE_ROUTE} from './utils/Consts'
import AuthPage from './pages/AuthPage/Auth';
import FeedPage from './pages/FeedPage/Feed';
import CreatePage from './pages/CreatePage/CreatePage';

export const authRoutes = [
    {
        path: CREATE_PAGE_ROUTE,
        Element: <CreatePage />
    }
]

export const publicRoutes = [
    {
        path: FEED_ROUTE,
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