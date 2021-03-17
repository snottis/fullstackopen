import {useEffect, useState} from 'react';
import users from '../services/users';



const UserList = () => {
    const [usertable, setusers] = useState([]);
    useEffect(async () => {
        const res = await users.getAll();
        setusers(res);
    }, []);
    console.log(usertable);
 return (
     <div>
         <table>
            <tr>
                <th></th>
                <th>blogs created</th>
            </tr>
            {usertable.map(user => <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
            </tr>)}
         </table>
     </div>
 );
};

export default UserList;