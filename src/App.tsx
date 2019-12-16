import React from 'react';
import './App.scss';
//import Router before we we use Link 
import {BrowserRouter, Route} from 'react-router-dom';
//Import Components
import Cards from './components/CardsComp';
import About from './components/AboutComp';
import Credits from './components/CreditsComp';

//Import Header functional component 
import Header from './components/layout/Header';


const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <div className="App">  
        <div className='container'>
          <Header></Header>
          <Route exact path='/cards' component={Cards}/>
          <Route exact path='/about'component={About}/>
          <Route exact path='/credits' component={Credits}/>
        </div>
      </div>
    </BrowserRouter>
  );  
}

export default App;
