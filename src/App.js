import DetailBook from 'pages/DetailBook';
import LandingPage from 'pages/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={ <LandingPage />}/>
          <Route exact path="books/:slug" element={ <DetailBook />}/>
          {/* <Route path="*" element={ <NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
