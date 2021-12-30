import React from "react";
import { Link, NavLink } from "react-router-dom";
const Nav = () => {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <Link class="navbar-brand" to="/">Dashboard</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <NavLink className="nav-link mr-2" to="/">Employee</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link mr-2" to="/check-in">Check-in</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link mr-2" to="/over-time">OverTime</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link mr-2" to="/late-time">Late Time</NavLink>
      </li>
    </ul>
  </div>
</nav>
    )
}

export default Nav;