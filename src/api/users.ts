import axios from "axios";
import { DisplayUser, User } from "../types";
const BASE_URL = 'https://jsonplaceholder.typicode.com/'


export async function getUsers()
{
  try {
      const incomingUsers = await axios.get(`${BASE_URL}/users`);
      const mappedUsers: DisplayUser[] = incomingUsers.data.map((incomingUser: User) => {
        return {
          id: incomingUser.id,
          name: incomingUser.name,
          username: incomingUser.username,
          email: incomingUser.email
        };
      });
      console.log(incomingUsers)
      return mappedUsers;
      
  }
  catch(error)
  {
      return [];
  }
    
}

export async function postUsers(incomingUser : User) : Promise<DisplayUser | null>
{
  try {
    const user = incomingUser;
      const state = await axios.post(`${BASE_URL}/users`,user);
      const data = state.data;
      let addedUser : DisplayUser = {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email
        };
        return addedUser;
      
  }
  catch(error)
  {
      return null;
  }
    
}