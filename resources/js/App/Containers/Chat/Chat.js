import React, {Component} from 'react';
import logo from '../../../../img/logo.png';
import RightSideMenu from "../../Components/RightSideMenu/RightSideMenu";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.updateUserListIntervalID = 0;

        this.state = {
            userList: null
        };

        this.updateUserList = this.updateUserList.bind(this);
    }

    componentDidMount() {
        this.updateUserList();

        this.updateUserListIntervalID = setInterval(this.updateUserList, 10 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateUserListIntervalID);
    }

    updateUserList() {
        axios.get('/users/list').then(response => {
            this.setState({userList: response.data});
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
                <RightSideMenu userList={this.state.userList} />
            </div>
        );
    }
}

export default Chat;
