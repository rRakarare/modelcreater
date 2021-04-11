import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import BuildScreen from "./Screens/BuildScreen";
import AddAnalyzerScreen from "./Screens/AddAnalyzerScreen";

function App() {
  return (
    <Router>
      <Header />

      <Route path="/" exact>
        <HomeScreen />
      </Route>
      <Route path="/build/:id" component={BuildScreen} />
      <Route path="/add" component={AddAnalyzerScreen} />
    </Router>
  );
}

export default App;
