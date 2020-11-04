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
        offline = props.userList.map(user => <li key={user.id} className="offline">{user.username}</li>);
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
