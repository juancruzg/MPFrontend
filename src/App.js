import './App.scss';
import Search from './components/Search';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Search></Search>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
