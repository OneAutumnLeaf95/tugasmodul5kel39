import './App.css';
import { React} from "react";
import Cardlist from './Component/Cardlist';
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
      <BrowserRouter>
        <header className="navv">
          <div
            className="title"
            style={{
              position: "relative",
              left: "45%",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <p onClick={() => alert("Selamat Datang")}>Klik Disini!</p>
          </div>
        </header>
        <Switch>
          <Route path="/" exact component={Cardlist} />
        </Switch>
      </BrowserRouter>
  );
}
