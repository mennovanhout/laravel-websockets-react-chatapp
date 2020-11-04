import React, {Component} from 'react';
import logo from '../../../../img/logo.png';
import RightSideMenu from "../../Components/RightSideMenu/RightSideMenu";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memberList: null
        };
    }

    componentDidMount() {
        axios.get('/users/list').then(response => {
            this.setState({memberList: response.data});
        }).catch(error => {
           console.log(error);
        });
    }

    render() {
        return (
            <div className="chat">
                <div className="leftSideMenu">
                    <img alt="logo" src={logo} />
                </div>
                <div className="title">Razenet</div>
                <RightSideMenu memberList={this.state.memberList} />
            </div>
        );
    }
}

export default Chat;
