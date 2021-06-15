import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PNRStatus from './pages/PNRStatus';
import RunningStatus from './pages/RunningStatus';
import SearchByNameNumber from './pages/SearchByNameNumber';
import SearchByStation from './pages/SearchByStation';

function App() {
  return (
    <Router>
      <Header />

      <Route path="/running-status" exact component={RunningStatus} />
      <Route path="/pnr-status" exact component={PNRStatus} />
      <Route path="/search-name-number" exact component={SearchByNameNumber} />
      <Route path="/search-station" exact component={SearchByStation} />
      <Route exact path="/" component={Home} />

      <Footer />
    </Router>
  );
}

export default App;
