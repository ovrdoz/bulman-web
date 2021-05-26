import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import { useHistory } from 'react-router-dom'

const drawerWidth = 700;
const useStyles = makeStyles((theme) => ({
  drawerRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  drawerHide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#212121",
    padding: 8,
  },
  drawerHeader: {
    padding: theme.spacing(1, 0, 0, 2),
  },
  drawerContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: -drawerWidth,
  },
  drawerContentShift: {
    marginRight: 0,
  },
  drawerForm: {
    padding: theme.spacing(1, 1.5, 0, 2),
    '& .MuiInputBase-input': {
      height: '0.5em'
    }
  },
  textFieldMultiline: {
    padding: theme.spacing(1, 2, 0, 2)
  },
  dynamicHeader: {
    padding: theme.spacing(1, 1, 0, 0),
  },
  dynamicHeaderItem: {
    padding: theme.spacing(1, 2, 0, 2)
  },
  dynamicHeaderTextField: {
    width: '17.2em'
  },
  footer: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
    padding: theme.spacing(1, 2, 0, 2)
  }
}));

export default function ProjectsDrawer(props) {

  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = React.useState({ name: '', description: '' });


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    axios.post('https://bulman-api.herokuapp.com/api/projects', values)
      .then(res => {
        history.push('/');
        history.replace('/projects');
      });
  }

  return (
    <div className={classes.drawerRoot}>

      

      <Drawer className={classes.drawer} variant="persistent" anchor="right" open={props.open} classes={{ paper: classes.drawerPaper }} >
        <div className={classes.drawerHeader}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Add Project
          </Typography>
        </div>

        <form autoComplete="off" >

          <div className={classes.drawerForm}>
            <TextField
              required
              id="name"
              name="name"
              label="Project Name"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true, }}
              onChange={handleChange('name')}
            />
            <TextField
              required
              id="description"
              name="description"
              label="Project Description"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true, }}
              onChange={handleChange('description')}
            />

          </div>


          <div className={classes.footer}>
            <Button style={{ marginRight: '1rem' }} variant="contained" aria-label="open drawer" edge="end" onClick={props.close}  >
              Cancel
        </Button>
            {'   '}
            <Button variant="contained" color="primary" aria-label="open drawer" edge="end" onClick={handleConfirm}  >
              Confirm
        </Button>
          </div>

        </form>

      </Drawer>
    </div>
  );
}


