import React, {Component} from 'react';
import logo from '../../../../img/logo.png';

class Chat extends Component {
    render() {
        return (
            <div className="chat">
                <div className="leftSideMenu">
                    <img alt="logo" src={logo} />
                </div>
            </div>
        );
    }
}

export default Chat;
