import { useState } from "react";
import Button from "../components/button";
import { getUsers, postUsers } from "../api/users";
import { Modal } from "../components/modal";
import {DisplayUser} from "../types"


export default function User()
{
    async function handleGetUsers()
    {
        try {
            const incomingMappedUsers = await getUsers();      
            setUsers(incomingMappedUsers);
        }
        catch(error)
        {
            return ;
        }
  }

  const openModal = async () => {
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users,setUsers] = useState<DisplayUser[]>([]);
    return <div>
        <Button onClickHandler={openModal}>Add Users</Button>
        {isModalVisible &&  <Modal users={users} setUsers={setUsers} onClose={closeModal}></Modal>}
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