import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, 
            token: jwtToken,
            expiryDate: expiryDate.toISOString()
        }));
        setAutoLogout(remainingMilliseconds);
    }, [])
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, [])

    const setAutoLogout = useCallback((milliseconds) => {
        setTimeout(() => {
            logout();
          }, milliseconds);
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return {login, logout, setAutoLogout, token, userId}
}