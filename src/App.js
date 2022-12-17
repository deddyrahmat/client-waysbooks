import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from 'components/atoms/ProtectedRoute';
import DetailBook from "pages/DetailBook";
import LandingPage from "pages/LandingPage";
import Profile from "pages/Profile";
import Cart from "pages/Cart";
import Transaction from 'pages/admin/Transaction';
import Book from 'pages/admin/Book';
import AddBook from "pages/admin/AddBook";
import EditProfile from "pages/EditProfile";

function App() {
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
                        path="/profile"
                        element={
                            <ProtectedRoute >
                                <Profile />
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
