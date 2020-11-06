import React, {Component} from 'react';
import RightSideMenu from "../../Components/RightSideMenu/RightSideMenu";
import LeftSideMenu from "../../Components/LeftSideMenu/LeftSideMenu";
import Message from "../../Components/Chat/Message/Message";
import TextField from "@material-ui/core/TextField";
import {Skeleton} from "@material-ui/lab";
import {withSounds} from "../../HOC/withSounds";

class Chat extends Component {
    constructor(props) {
        super(props);

        this.updateUserListIntervalID = 0;

        this.state = {
            userList: null,
            onlineUsers: [],
            message: '',
            messages: null
        };

        this.updateUserList = this.updateUserList.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onNewMessage = this.onNewMessage.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    componentDidMount() {
        this.messagesEnd = React.createRef();

        this.updateUserList();
        this.updateUserListIntervalID = setInterval(this.updateUserList, 10 * 1000);

        axios.get('/messages').then((response) => {
            this.setState({messages: response.data.data});

            this.scrollToBottom(false);

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
                }).listen('NewMessage', this.onNewMessage);
        });
    }

    componentWillUnmount() {
        clearInterval(this.updateUserListIntervalID);

        Echo.leave('chat');
    }

    updateUserList() {
        axios.get('/users/list').then(response => {
            this.setState({userList: response.data.data});
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
        axios.post('/send-message', {message: this.state.message});

        this.setState({message: ''});
    }

    onNewMessage(data) {
        let messages = [];

        if (this.state.messages) {
            messages = [...this.state.messages];
        }

        messages.push(data);

        this.setState({messages: messages});

        this.props.playNewMessage();

        this.scrollToBottom();
    }

    scrollToBottom (smooth = true) {
        if (!smooth) {
            this.messagesEnd.scrollIntoView();

            return;
        }

        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        let messages = null;

        if (this.state.messages !== null) {
            messages = this.state.messages.map(message => <Message key={message.id} user={message.user}>{message.message}</Message>);
        } else if(this.state.messages === null) {
            messages = [];
            for(let i = 0; i < 15; i++) {
                messages.push(<Skeleton key={i} height="50px" animation="wave" />);
            }
        }

        return (
            <div className="chat">
                <LeftSideMenu />
                <div className="title">Razenet</div>
                <div className="messages">
                    <ul>
                        {messages}
                        <li ref={(el) => { this.messagesEnd = el; }}></li>
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

export default withSounds(Chat);
