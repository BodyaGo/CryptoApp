import { useState } from "react";
import Axios from "axios";

function Registration() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UsersList, setUsersList] = useState([]);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const addUsers = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (!isPasswordValid) {
      setPasswordError("Password should be at least 8 characters long");
      return;
    }

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
    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid) {
      setPasswordError("Password should be at least 8 characters long");
      return;
    }

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
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card p-4">
            <h2 className="mb-4">Registration Form</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Age:</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => {
                    setAge(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                {passwordError && <p className="text-danger">{passwordError}</p>}
              </div>
              <button type="button" className="btn btn-primary" onClick={addUsers}>Register</button>
            </form>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div className="card p-4">
            <h2 className="mb-4">Users List</h2>
            <button type="button" className="btn btn-primary mb-3" onClick={getUsers}>Show Users</button>
            {UsersList.map((val) => {
              return (
                <div key={val.id} className="card mb-3 p-3">
                  <div>
                    <h4>Username: {val.username}</h4>
                    <p>Age: {val.age}</p>
                    <p>Email: {val.email}</p>
                    <p>Password: {val.password}</p>
                  </div>
                  <div className="mt-3">
                    <input
                      type="password"
                      placeholder="new password..."
                      className="form-control"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={() => {
                        updateUsersPassword(val.id);
                      }}
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mt-2 ms-2"
                      onClick={() => {
                        deleteUsers(val.id);
                      }}
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Registration;
