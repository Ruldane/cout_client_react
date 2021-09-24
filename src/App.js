import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AverageCostAnimalForm from "./AverageCostAnimalForm";

function App() {
  return (
    <Router className="App">
      <Switch>
          <Route exact path="/" component={AverageCostAnimalForm} />
      </Switch>
    </Router>
  );
}

export default App;
