import React from 'react';

const Message = props => {
    return (
        <li>
            <span className="username">{props.user.username}</span>
            {props.children}
        </li>
    );
}

export default Message;
