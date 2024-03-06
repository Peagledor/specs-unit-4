import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const { state, dispatch }  = useContext(AuthContext);

  
  const submitHandler = (e) => {
    e.preventDefault();

    let body = { username, password };
    axios
      .post(register ? "/register" : "/login", body)
      .then(
        (res) => {
        dispatch({type: 'CHANGE_USERNAME', payload: username})
        console.log(body)
      })
      .catch((err) => {
        if(err.response.data){
          alert(err.response.data)
        }
        console.error(err)
      })    
      console.log("submitHandler called"); 
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input className="form-input" placeholder="enter username" onChange={(e) => setUsername(e.target.value)} />
        <input className="form-input" placeholder="enter password" onChange={(e) => setPassword(e.target.value)} />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
