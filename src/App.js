import DetailBook from 'pages/DetailBook';
import LandingPage from 'pages/LandingPage';
import Profile from 'pages/Profile';
import Transaction from 'pages/Transaction';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={ <LandingPage />}/>
          <Route exact path="books/:slug" element={ <DetailBook />}/>
          <Route exact path="/transaction" element={ <Transaction /> }/>
          <Route exact path="/profile" element={ <Profile /> }/>
          {/* <Route path="*" element={ <NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
