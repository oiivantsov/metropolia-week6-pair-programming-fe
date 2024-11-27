import useSignup from "../hooks/useSignup";

const SignupComponent = ({ setIsAuthenticated }) => {

  const { email, setEmail, password, password2, setPassword, setPassword2, handleSignup, error } = useSignup({setIsAuthenticated});


  return (
    <div className="form-container">
      <h2>Signup</h2>
      <label>
        email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SignupComponent;