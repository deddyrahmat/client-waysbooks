import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// state global
import { authToken, authLogout } from "store/authSlice";

// component
import ProtectedRoute from 'components/atoms/ProtectedRoute';
import DetailBook from "pages/DetailBook";
import LandingPage from "pages/LandingPage";
import Profile from "pages/Profile";
import Cart from "pages/Cart";
import Transaction from 'pages/admin/Transaction';
import Book from 'pages/admin/Book';
import AddBook from "pages/admin/AddBook";
import EditProfile from "pages/EditProfile";
import PageBooks from "pages/PageBooks";
import Order from './pages/Order';

// config
import { setAuthToken } from "config/Axios";

import ApiAuth from 'config/Endpoint/auth'

function App() {
    const dispatch = useDispatch();
    const { token, refresh } = useSelector((state) => state.authReducer);
    
    useEffect(() => {
        if (token) {
            setAuthToken(token);
        }
        if (Cookies.get('statusToken') && refresh !== '') {
            const body = JSON.stringify({token : refresh});
                    
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
    
            ApiAuth.refresh( body, config).then((response) => {
                // console.log('response', response)
                if (response.status === 1) {
                    dispatch(
                        authToken({
                            token: response.token,
                        })
                    );
                    Cookies.remove('statusToken')
                    setAuthToken(response.token);
                }
            }).catch(err => {
                dispatch(
                    authLogout()
                );
                Cookies.remove('statusToken')
            }); 
        }
    },[]);
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route
                        exact
                        path="books/:slug"
                        element={
                            <ProtectedRoute >
                                <DetailBook />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/cart"
                        element={
                            <ProtectedRoute >
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/books"
                        element={
                            <ProtectedRoute >
                                <PageBooks />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/profile"
                        element={
                            <ProtectedRoute >
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/order"
                        element={
                            <ProtectedRoute >
                                <Order />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/profile/edit"
                        element={
                            <ProtectedRoute >
                                <EditProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/admin/transaction"
                        element={
                            <ProtectedRoute >
                                <Transaction />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/admin/book"
                        element={
                            <ProtectedRoute >
                                <Book />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/admin/add-book"
                        element={
                            <ProtectedRoute >
                                <AddBook />
                            </ProtectedRoute>
                        }
                    />
                    {/* <Route path="*" element={ <NotFound />} /> */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
