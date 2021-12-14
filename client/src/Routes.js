import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage/AuthPage';
import {CreatePage} from './pages/CreatePage/CreatePage';
import {CurrentPost} from './pages/CurrentPost/CurrentPost';
import {Feed} from './pages/Feed/Feed';

export const useRoutes = isAuth => {
    if(isAuth){
        return(
            <Routes>
                <Route path='/create' element={<CreatePage/>} exact />
                <Route path='/:id' element={<CurrentPost/>} />
                <Route path='*' element={<Navigate to ='/create' />} />
            </Routes>
        )
    }

    return(
        <Routes>
            <Route path='/api/auth/register' element={<AuthPage/>} exact/>
            <Route path='/' element={<Feed/>} exact />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

