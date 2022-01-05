import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../../Routes";
import Layout from '../Layout/Layout';

export const AppRouter = () => {
    const isAuth = true;
    return (
        <Layout>
            <Routes>
                {isAuth && authRoutes.map(({path, Element}) => 
                    <Route key={path} path={path} element={Element} exact/>
                )}
                {publicRoutes.map(({path, Element}) => 
                    <Route key={path} path={path} element={Element} exact/>
                )}
            <Route path='*' element={<Navigate to ='/' />} />
            </Routes>
        </Layout>
        
    )
}