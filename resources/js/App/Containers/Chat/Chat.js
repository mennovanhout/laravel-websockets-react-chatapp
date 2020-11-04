import React, {Component} from 'react';
import RightSideMenu from "../../Components/RightSideMenu/RightSideMenu";
import LeftSideMenu from "../../Components/LeftSideMenu/LeftSideMenu";
import Message from "../../Components/Chat/Message/Message";
import TextField from "@material-ui/core/TextField";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.updateUserListIntervalID = 0;

        this.state = {
            userList: null,
            onlineUsers: [],
            message: ''
        };

        this.updateUserList = this.updateUserList.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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

    handleOnChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleOnKeyDown(event) {
        if(event.keyCode == 13 && event.shiftKey == false) {
            this.sendMessage();
        }
    }

    sendMessage() {
        this.setState({message: ''});
    }

    render() {
        return (
            <div className="chat">
                <LeftSideMenu />
                <div className="title">Razenet</div>
                <div className="messages">
                    <ul>
                        <Message user={{id: 1, username: 'SynteX'}}>Test</Message>
                        <Message user={{id: 1, username: 'SynteX'}}>Test</Message>
                        <Message user={{id: 1, username: 'SynteX'}}>Test</Message>
                        <Message user={{id: 1, username: 'SynteX'}}>Test</Message>
                        <Message user={{id: 1, username: 'SynteX'}}>Test</Message>
                    </ul>

                    <div className="input">
                        <TextField name="message" onKeyDown={this.handleOnKeyDown} onChange={this.handleOnChange} value={this.state.message} fullWidth />
                    </div>
                </div>
                <RightSideMenu userList={this.state.userList} onlineUsers={this.state.onlineUsers} />
            </div>
        );
    }
}

export default Chat;
