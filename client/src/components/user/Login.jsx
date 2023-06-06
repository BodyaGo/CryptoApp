import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    setLoading(true);

    try {
      const response = await Axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      localStorage.setItem("userData", JSON.stringify(response.data.user));

      setLoading(false);
      navigate("/user"); // Redirect to the user page
      window.location.reload(); // Reload the page

    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("Unable to reach server.");
      } else {
        console.error(error);
        setError("An unknown error occurred.");
      }
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">Login</h1>

            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              {loading ? (
                <button className="btn btn-primary mb-3" disabled>
                  Loading...
                </button>
              ) : (
                <>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <button
                    className="btn btn-primary mb-3"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
