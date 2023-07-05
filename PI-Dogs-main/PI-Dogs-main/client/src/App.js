import './App.css';

import { Home, Landing, Detail, Form } from "./views/index"; 
import { Route, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import NavBar from './components/NavBar/NavBar';

 
function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !=="/" && <NavBar/>}
           <Route exact path = "/" component={Landing} />
           <Route path = "/home" render ={()=> <Home/>} />
          <Route path = "/detail/:id" component={Detail}/>
          <Route path = "/create" component={Form}/>
    </div>
  );
}

export default App;
