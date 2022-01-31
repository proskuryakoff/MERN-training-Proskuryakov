import * as ROUTE from './utils/Consts'
import AuthPage from './pages/AuthPage/Auth';
import FeedPage from './pages/FeedPage/Feed';
import CreatePage from './pages/CreatePage/CreatePage';
import UsersPage from './pages/UsersPage/UsersPage';
import PlaylistsPage from './pages/PlaylistsPage/PlaylistsPage';

export const adminRoutes = [
    {
        path: ROUTE.CREATE_PAGE_ROUTE,
        Element: <CreatePage />
    },
    {
        path: ROUTE.USERS_LIST_ROUTE,
        Element: <UsersPage />
    },
]
export const authRoutes = [
    {
        path: ROUTE.PLAYLISTS_ROUTE,
        Element: <PlaylistsPage />
    }
]

export const publicRoutes = [
    {
        path: ROUTE.FEED_ROUTE,
        Element: <FeedPage />
    },
    {
        path: ROUTE.SEARCH_ROUTE,
        Element: <FeedPage />
    },
    {
        path: ROUTE.LOGIN_ROUTE,
        Element: <AuthPage />
    }, 
    {
        path: ROUTE.REGISTER_ROUTE,
        Element: <AuthPage />
    }
]