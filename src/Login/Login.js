import './Login.css';
import profile from "./../image/a.jpg";
import email from "./../image/email.jpg";
import pass from "./../image/pass.png";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


let array = [
  {
    login: "ArmenM",
    parol: "ArmenM",
    path: "/ArmenMartirosyan",
  },
  {

    login: "Hasmik",
    parol: "Hasmik",
    path: "/Hasmik",

  },
  {
    login: "ArmenG",
    parol: "ArmenG",
    path: "/Armengh",
  },
  {
    login: "Bella",
    parol: "Bella",
    path: "/Bella",
  },

];

function Login() {
  const [userName, setUserName] = useState();
  const [userPass, setUserPass] = useState();

  function changeUserName(e) {
    setUserName(e.target.value)
  }

  function changeUserPass(e) {
    setUserPass(e.target.value)
  }
  const navigate = useNavigate()
  function Parol() {

    for (let i = 0; i < array.length; i++) {
      if (userName === array[i].login && userPass === array[i].parol) {

        navigate(array[i].path, { replace: true });
        return;
      }
    }
    window.alert("WRONG CREDENTIALS WARNING");
  }

  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgss">
            <div className="container-image">
              <img src={profile} alt="profile" className="profile" />
            </div>
          </div>
          <div>
            <h1>Login Page</h1>
            <div className="first-input">
              <img src={email} alt="email" className="email" />
              <input onChange={changeUserName} type="text" placeholder="user name" className="name" value={userName} />
            </div>
            <div className="second-input">
              <img src={pass} alt="pass" className="email" />
              <input onChange={changeUserPass} type="password" placeholder="password" className="name" value={userPass} />
            </div>
            <div className="login-button">
              <button className='check' onClick={Parol}>Login</button>
            </div>
            <p className="link">
              <a href="#">Forgot password ?</a>   Or  <a href="#">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
