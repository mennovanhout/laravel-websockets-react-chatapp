import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Containers/Login/Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Container} from "@material-ui/core";
import Chat from "./Containers/Chat/Chat";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this);
    }

    componentDidMount() {
        axios.get('/user').then(response => {
            this.setState({user: response.data});
        }).catch(error => {
            this.setState({user: false});
        });
    }

    onSuccessfulLogin(user) {
        this.setState({user: user});
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
                    <Login onSuccessfulLogin={this.onSuccessfulLogin} />
                </Router>
            );
        }

        return (
            <Router>
                <Chat />
            </Router>
        );
    }
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
