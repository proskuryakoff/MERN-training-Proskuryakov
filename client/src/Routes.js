import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {RegisterPage} from './pages/Auth/Register';
import {LoginPage} from './pages/Auth/Login';
import {CreatePage} from './pages/CreatePage/CreatePage';
import {SinglePost} from './pages/SinglePost/SinglePost';
import {Feed} from './pages/Feed/Feed';

export const useRoutes = isAuth => {
    if (isAuth){
        return(
            <Routes>
                <Route path='/' element={<Feed/>} exact />
                <Route path='/post/:id' element={<SinglePost/>} />
                <Route path='/create' element={<CreatePage/>} exact />
                <Route path='*' element={<Navigate to ='/' />} />
            </Routes>
        )
    }

    return(
        <Routes>
            <Route path='/' element={<Feed/>} exact />
            <Route path='/auth/login' element={<LoginPage/>} exact/>
            <Route path='/auth/register' element={<RegisterPage/>} exact/>
            <Route path='/post/:id' element={<SinglePost/>} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

