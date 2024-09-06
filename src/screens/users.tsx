import { useState } from "react";
import Button from "../components/button";
import axios from "axios";
import { getUsers } from "../api/users";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }
export default function User()
{
    async function handleGetUsers()
    {
        try {
            const incomingUsersMappedUsers = await getUsers();      
            setUsers(incomingUsersMappedUsers);
        }
        catch(error)
        {
            return ;
        }
  }
  const [users,setUsers] = useState<User[]>([]);
    return <div>
        {users.length === 0 && <Button onClickHandler={handleGetUsers}>Get Users</Button>}
      {
        users.map((user) => {
          return <div className='users' key={user.id}>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        })
      }
    </div>
}