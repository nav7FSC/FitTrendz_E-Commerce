import { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState("");
  const [testText, setTestText] = useState("");
  const [createUserStatus, setCreateUserStatus] = useState("");

  const authenticate = () => {
    axios
      .post("http://localhost:3000/api/auth/login", {email: 'borahjj@farmingdale.edu', password: 'secretpassword'})
      .then((response) => {
        console.log(response)
        console.log(response.data)
        console.log(response.data.token)
        setUser(response.status);
        console.log(user)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createUser = () => {
    axios
      .post("http://localhost:3000/api/auth/register", {first_name: 'jack', last_name: 'borah', email: 'borahjj@farmingdale.edu', password: 'secretpassword', created_at: 'created_at', updated_at: 'updated_at'})
      .then((response) => {
        console.log(response)
        console.log(response.data)
        setCreateUserStatus(response.data.success);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const getTest = () => {
    axios
      .get("http://localhost:3000/test")
      .then((response) => {
        setTestText(response.data.success);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={authenticate}>Log In</button>

      {user && <p>User: {user}</p>}
      <button onClick={createUser}>Register</button>
      {createUserStatus && <p>User: {createUserStatus}</p>}
      <button onClick={getTest}>Test Text</button>
      <p>testText: {testText}</p>
    </>
  );
}

export default App;
