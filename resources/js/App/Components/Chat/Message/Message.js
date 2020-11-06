import React from 'react';

const Message = props => {
    return (
        <li>
            <span className="username" style={{color: props.user.role.color}}>{props.user.username}</span>
            {props.children}
        </li>
    );
}

export default Message;
