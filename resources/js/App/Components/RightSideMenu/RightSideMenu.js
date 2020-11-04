import React from 'react';
import Skeleton from "@material-ui/lab/Skeleton";

const RightSideMenu = props => {
    let online = (
        <>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
        </>
    );

    let offline = (
        <>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
        </>
    );

    if (props.userList !== null) {
        const onlineUsers = props.userList.filter((user) => {return props.onlineUsers.includes(user.id)});
        const offlineUsers = props.userList.filter((user) => {return !props.onlineUsers.includes(user.id)});

        online = onlineUsers.map(user => <li key={user.id}>{user.username}</li>);
        offline = offlineUsers.map(user => <li key={user.id} className="offline">{user.username}</li>);
    }

    return (
        <div className="rightSideMenu">
            <span>Online</span>
            <ul>
                {online}
            </ul>
            <span>Offline</span>
            <ul>
                {offline}
            </ul>
        </div>
    );
};

export default RightSideMenu;
