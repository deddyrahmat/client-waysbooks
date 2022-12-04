import LandingPage from 'pages/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={ <LandingPage />}/>
          {/* <Route path="*" element={ <NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
