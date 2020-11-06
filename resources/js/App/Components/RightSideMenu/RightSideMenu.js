import React from 'react';
import Skeleton from "@material-ui/lab/Skeleton";

const RightSideMenu = props => {
    let users = (
        <>
            <span>Online</span>
            <ul>
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
                <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
                <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
                <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
                <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
                <li><Skeleton animation="wave" height={15} variant="rect"></Skeleton></li>
            </ul>
        </>
    );

    if (props.userList !== null) {
        // Split between online and offline users
        const roles = {};

        // Create roles
        props.userList.forEach(user => {
           if (!(user.role.id in roles)) {
               roles[user.role.id] = {
                   id: user.role.id,
                   sort: user.role.sort,
                   name: user.role.name,
                   color: user.role.color,
                   onlineCount: 0,
                   users: []
               };
           }


           if (props.onlineUsers.includes(user.id)) {
               roles[user.role.id].onlineCount++;
           }

           roles[user.role.id].users.push(user);
        });

        // Sort roles
        const roleValues = Object.entries(roles).sort(([,a],[,b]) => a.sort-b.sort);

        users = roleValues.map(role => (
                <React.Fragment key={role[1].id}>
                    <span>{ role[1].name }<i>-{role[1].onlineCount}</i></span>
                    <ul style={{color: role[1].color}}>
                        { role[1].users.sort(user => props.onlineUsers.includes(user.id) ? -1 : 1).map(user => <li key={user.id} className={!props.onlineUsers.includes(user.id) ? 'offline' : null}>{user.username}</li>) }
                    </ul>
                </React.Fragment>
            ));
    }

    return (
        <div className="rightSideMenu">
            {users}
        </div>
    );
};

export default RightSideMenu;
