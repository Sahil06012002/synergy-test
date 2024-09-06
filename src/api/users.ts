import axios from "axios";
const BASE_URL = 'https://jsonplaceholder.typicode.com/'

interface Geo {
    lat: string;
    lng: string;
  }
  
  interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  
  interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  
  interface User1 {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }

  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }
export async function getUsers()
{
  try {
      const incomingUsers = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      const mappedUsers: User[] = incomingUsers.data.map((incomingUser: any) => {
        return {
          id: incomingUser.id,
          name: incomingUser.name,
          username: incomingUser.username,
          email: incomingUser.email
        };
      });
      return mappedUsers;
      
  }
  catch(error)
  {
      return [];
  }
    
}