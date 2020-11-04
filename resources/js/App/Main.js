import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Containers/Login/Login";

class Main extends Component {
    render () {
        return (
            <Router>
                <Login/>
            </Router>
        );
    }
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
