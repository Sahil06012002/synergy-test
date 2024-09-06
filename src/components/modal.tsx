import { useState } from "react";
import { postUsers } from "../api/users";
import { User, Address, Company, DisplayUser} from "../types";
interface prop {
    users: DisplayUser[],
    setUsers: React.Dispatch<React.SetStateAction<DisplayUser[]>>,
    onClose : () => void
}

export const Modal = (prop: prop) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "101.001",
        lng: "101.001",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    const parent = keys[0];
    const child = keys[1];

    if (parent === "address" || parent === "company") {
      setFormData((prevData) => {
        const parentObject = prevData[parent as keyof User] as Address | Company;
        const updatedParent = {
          ...parentObject,
          [child as keyof Address | keyof Company]: value,
        };

        return {
          ...prevData,
          [parent as keyof User]: updatedParent,
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name as keyof User]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await postUsers({
      id: formData.id,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: formData.address.street,
        suite: formData.address.suite,
        city: formData.address.city,
        zipcode: formData.address.zipcode,
        geo: {
          lat: formData.address.geo.lat,
          lng: formData.address.geo.lng,
        },
      },
      company: {
        name: formData.company.name,
        catchPhrase: formData.company.catchPhrase,
        bs: formData.company.bs,
      },
    });

    if (user) {
      const displayUser: DisplayUser = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      };
      prop.setUsers((prevData) => [...prevData, displayUser]);
      prop.onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={prop.onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Basic Details</h1>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
          </div>

          <div>
            <h1>Address</h1>
            <input name="address.street" placeholder="Street" value={formData.address.street} onChange={handleChange} />
            <input name="address.suite" placeholder="Suite" value={formData.address.suite} onChange={handleChange} />
            <input name="address.city" placeholder="City" value={formData.address.city} onChange={handleChange} />
            <input name="address.zipcode" placeholder="Zip Code" value={formData.address.zipcode} onChange={handleChange} />
          </div>

          <div>
            <h1>Company</h1>
            <input name="company.name" placeholder="Name" value={formData.company.name} onChange={handleChange} />
            <input name="company.catchPhrase" placeholder="Catch Phrase" value={formData.company.catchPhrase} onChange={handleChange} />
            <input name="company.bs" placeholder="Bs" value={formData.company.bs} onChange={handleChange} />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
