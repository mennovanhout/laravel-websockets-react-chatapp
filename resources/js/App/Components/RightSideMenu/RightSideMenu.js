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
                   users: []
               };
           }

           roles[user.role.id].users.push(user);
        });

        // Sort roles
        const roleValues = Object.entries(roles).sort(([,a],[,b]) => b.sort-a.sort);

        users = roleValues.map(role => (
                <React.Fragment key={role[1].id}>
                    <span>{ role[1].name }</span>
                    <ul style={{color: role[1].color}}>
                        { role[1].users.map(user => <li key={user.id} className={!props.onlineUsers.includes(user.id) ? 'offline' : null}>{user.username}</li>) }
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
