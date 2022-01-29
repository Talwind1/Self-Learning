import React, { Component } from "react";
import "./Users.css";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch("/users")
      .then((res) => res.json())
      .then((users) =>
        this.setState({ users }, () => {
          console.log("users fetched", this.state.users);
        })
      ); //because of the proxy in package.json we dont have to add the entire url aaddress.
  }
  render() {
    return (
      <div>
        <h2>Users</h2>
        <ul>
          {this.state.users.map((user) => {
            return (
              <li key={user.id}>
                {user.name} {user.email}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Users;
