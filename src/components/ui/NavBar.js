import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default class NavBar extends Component {

  render() {
    return(
      <AppBar color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Bulman
        </Typography>
        <nav>
          <Link variant="button" color="textPrimary" href="/"> Home </Link>
          <Link variant="button" color="textPrimary" href="/projects"> Projects </Link>
        </nav>

        <AccountCircle />
      </Toolbar>
    </AppBar>
    )
  }
}