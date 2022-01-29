import logo from "./logo.svg";
import "./App.css";
// import Users from "./components/users/Users";
import SignUp from "./components/signup/SignUp";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SignUp />
      {/* <Users /> */}
    </div>
  );
}

export default App;
