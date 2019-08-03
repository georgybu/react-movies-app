import React from 'react';
import './App.css';
import Movie from './movie/Movie';
import Movies from './movies/Movies';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <>
        <Route exact path="/" render={() => (<Redirect to="/movies"/>)}/>
        <Route exact path="/movies" component={Movies}/>
        <Route path="/movies/:id" component={Movie}/>
      </>
    </Router>
  );
};

export default App;
