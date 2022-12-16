import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from 'components/atoms/ProtectedRoute';
import DetailBook from "pages/DetailBook";
import LandingPage from "pages/LandingPage";
import Profile from "pages/Profile";
import Cart from "pages/Cart";
import Transaction from 'pages/Transaction';

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
                        path="/admin/transaction"
                        element={
                            <ProtectedRoute >
                                <Transaction />
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
