import React, {Component} from 'react';
import logo from '../../../../img/logo.png';
import RightSideMenu from "../../Components/RightSideMenu/RightSideMenu";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.updateUserListIntervalID = 0;

        this.state = {
            userList: null,
            onlineUsers: []
        };

        this.updateUserList = this.updateUserList.bind(this);
    }

    componentDidMount() {
        this.updateUserList();
        this.updateUserListIntervalID = setInterval(this.updateUserList, 10 * 1000);

        Echo.join('chat')
            .here((users) => {
                const onlineUsers = users.map(user => user.id);

                this.setState({onlineUsers: onlineUsers});
            })
            .joining((user) => {
                const onlineUsers = [...this.state.onlineUsers, user.id];

                this.setState({onlineUsers: onlineUsers});
            })
            .leaving((user) => {
                let onlineUsers = [...this.state.onlineUsers];
                onlineUsers = onlineUsers.filter(id => id !== user.id);
                
                this.setState({onlineUsers: onlineUsers});
            });
    }

    componentWillUnmount() {
        clearInterval(this.updateUserListIntervalID);

        Echo.leave('chat');
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
                <RightSideMenu userList={this.state.userList} onlineUsers={this.state.onlineUsers} />
            </div>
        );
    }
}

export default Chat;
