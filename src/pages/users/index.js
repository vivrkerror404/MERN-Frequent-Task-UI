import React, { useEffect, useState } from "react";
import { fetchUser } from "registrationForm/gateways/register-api";
export default function User() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await fetchUser();
      console.log("data is ", data);
      setUser(data);
    })();
  }, []);
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">sno</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Country</th>
            <th scope="col">DOB</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, ind) => (
            <tr>
              <th scope="row">{ind + 1}</th>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.country}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
