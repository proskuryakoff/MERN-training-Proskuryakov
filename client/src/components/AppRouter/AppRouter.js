import React from "react";
import { useSelector } from "react-redux";
import {Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../../Routes";
import Layout from '../Layout/Layout';
import ContentPage from "../../pages/ContentPage/ContentPage";

export const AppRouter = () => {
    const authState = useSelector((state) => state.auth)
    const isAuthenticated = !!authState.token;
    return (
        <Layout>
            <Routes>
                {isAuthenticated && authState.roles.includes("ADMIN") && authRoutes.map(({path, Element}) => 
                    <Route key={path} path={path} element={Element} exact/>
                )}
                {publicRoutes.map(({path, Element}) => 
                    <Route key={path} path={path} element={Element} exact/>
                )}
            <Route path='/content/:id' element={<ContentPage />} />
            <Route path='*' element={<Navigate to ='/' />} />
            </Routes>
        </Layout>
        
    )
}