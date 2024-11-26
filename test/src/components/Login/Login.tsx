import { useState } from "react";

function Login() {
  const [uid, setUserId] = useState("");
  const [pwd, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({ uidErrorMsg: "", pwdErrorMsg: "" });

  function formValidn() {
    const err = { uidErrorMsg: "", pwdErrorMsg: "" };

    if (!uid) err.uidErrorMsg = "missing user id";
    if (!pwd) err.pwdErrorMsg = "missing password";

    setErrors(err);
    return !err.uidErrorMsg && !err.pwdErrorMsg;
  }

  function loginButton_click() {
    if (formValidn()) {
      if (uid === "admin" && pwd === "admin123") {
        setResult("Welcome to Admin");
      } else {
        setResult("Invalid User Id or Password");
      }
    } else {
      setResult("");
    }
  }

  return (
    <>
      <fieldset>
        <legend>User Login</legend>

        <label>User Id : </label>
        <input
          type="text"
          id="t1"
          placeholder="User Id"
          value={uid}
          onChange={(event) => setUserId(event.target.value)}
        />
        {errors.uidErrorMsg && (
          <p className="error" data-testid="uid-error">
            {errors.uidErrorMsg}
          </p>
        )}
        <br />
        <br />

        <label>Password : </label>
        <input
          type="password"
          id="t2"
          placeholder="Password"
          value={pwd}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.pwdErrorMsg && (
          <p className="error" data-testid="pwd-error">
            {errors.pwdErrorMsg}
          </p>
        )}
        <br />
        <br />

        <input
          type="button"
          id="b1"
          onClick={loginButton_click}
          value="Login"
        />
        <p id="result">{result}</p>

        <a href="#" id="signup" role="link">
          SignUp
        </a>
      </fieldset>
    </>
  );
}

export default Login;
