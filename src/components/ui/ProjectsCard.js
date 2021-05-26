

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import SettingsIcon from '@material-ui/icons/Settings';
import Badge from '@material-ui/core/Badge';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { Card, CardActions, CardHeader } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: red[500],
  },
  card: {
    margin: 10
  },
}));

export default function ProjectChildCard(props) {
  const classes = useStyles();
  const history = useHistory();

  return (

    <Card className={classes.card} >
      <CardActions >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.project.name.toString().substring(0, 1)}
            </Avatar>
          }
          title={props.project.name}
          subheader={props.project.description}
        />
        <div className={classes.grow} />
        <IconButton color="inherit" onClick={() => { history.push({ pathname: '/scenarios', state: { project: props.project._id } }); }}>
          <Badge badgeContent={props.project.scenarios_total} color="primary">
            <AccountTreeIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="settings" color="inherit" onClick={props.open} >
          <SettingsIcon />
        </IconButton>
         

      </CardActions>

    </Card>

  );
}
