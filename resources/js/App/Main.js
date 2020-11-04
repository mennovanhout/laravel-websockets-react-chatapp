import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Containers/Login/Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Container} from "@material-ui/core";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        axios.get('/user').then(response => {

        }).catch(error => {
            this.setState({user: false});
        });
    }

    render () {
        if (this.state.user === null) {
            return (
                <Container style={{paddingTop: '60px', textAlign: 'center'}}>
                    <CircularProgress size="72px" />
                </Container>
            );
        }

        if (this.state.user === false) {
            return (
                <Router>
                    <Login/>
                </Router>
            );
        }

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
