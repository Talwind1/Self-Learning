import React, { Component } from "react";
import "./SignUp.css";

import axios from "axios";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleCreate = async () => {
    const newUser = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
    };
    const { data: user } = await axios.post(
      "http://localhost:5000/users",
      newUser
    ); //destructure + rename
    console.log(user);
  };

  render() {
    return (
      <div>
        <ul>
          <li>
            <input
              type="text"
              onChange={(e) => this.handleChange(e.target.name, e.target.value)}
              name="name"
              value={this.state.name}
              placeholder="name"
            />
          </li>
          <li>
            <input
              type="text"
              onChange={(e) => this.handleChange(e.target.name, e.target.value)}
              name="email"
              value={this.state.email}
              placeholder="email"
            />
          </li>
          <li>
            <input
              type="text"
              onChange={(e) => {
                console.log(e.target.name, e.target.value);
                this.handleChange(e.target.name, e.target.value);
              }}
              name="password"
              value={this.state.password}
              placeholder="password"
            />
          </li>
          <li>
            <button onClick={this.handleCreate}>Sign Up</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default SignUp;
