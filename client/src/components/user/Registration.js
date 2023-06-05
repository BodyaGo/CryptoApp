import { useState } from "react";
import Axios from "axios";

function Registartion() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [UsersList, setUsersList] = useState([]);

  const addUsers = () => {
    Axios.post("http://localhost:3001/create", {
      username: username,
      age: age,
      email: email,
      password: password,
    }).then(() => {
      setUsersList([
        ...UsersList,
        {
          username: username,
          age: age,
          email: email,
          password: password,
        },
      ]);
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/Users").then((response) => {
      setUsersList(response.data);
    });
  };

  const updateUsersPassword = (id) => {
    Axios.put("http://localhost:3001/update", {
      password: password,
      id: id,
    }).then((response) => {
      setUsersList(
        UsersList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                username: val.username,
                age: val.age,
                email: val.email,
                password: password,
              }
            : val;
        })
      );
    });
  };

  const deleteUsers = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setUsersList(
        UsersList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="Registartion">
      <div className="information">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={addUsers}>Add Users</button>
      </div>
      <div className="Users">
        <button onClick={getUsers}>Show Users</button>

        {UsersList.map((val, key) => {
          return (
            <div className="Users">
              <div>
                <h3>Username: {val.username}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Email: {val.email}</h3>
                <h3>Password: {val.password}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="new password..."
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateUsersPassword(val.id);
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteUsers(val.id);
                  }}
                >
                  Delete
               
                  </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Registartion;