import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import MenuItem from "@material-ui/core/MenuItem";

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
       height:'0.5em'
    }
  },
  textFieldMultiline: {
    padding: theme.spacing(1, 2, 0, 2)
  },
  dynamicHeader:{
    padding: theme.spacing(1, 1, 0, 0),
  },
  dynamicHeaderItem:{
    padding: theme.spacing(1, 2, 0, 2)
  },
  dynamicHeaderTextField:{
    width:'17.2em'
  },
  footer: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
    padding: theme.spacing(1, 2, 0, 2)
}
}));

const verbs = [
  {
    value: "GET",
    label: "GET"
  },
  {
    value: "POST",
    label: "POST"
  },
  {
    value: "PUT",
    label: "PUT"
  },
  {
    value: "PATCH",
    label: "PATCH"
  },
  {
    value: "DELETE",
    label: "DELETE"
  },
  {
    value: "OPTIONS",
    label: "OPTIONS"
  }
];

export default function ScenariosDrawer(props) {

  const classes = useStyles();
  const history = useHistory();
  const project_id = history.location.state?.project;

  const [values, setValues] = React.useState({ name: '', url: '', method: '', headers: '' , parameters: '' });

 
  // dynamic controller start
  const [inputListHeader, setinputListHeader] = React.useState([{ key: "", value: "" }]);

  // handle input change
  const handleInputChangeHeader = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListHeader];
    list[index][name] = value;
    setinputListHeader(list);
    setValues({ ...values, 'headers': inputListHeader });
  };

  // handle click event of the Remove button
  const handleRemoveClickHeader = index => {
    const list = [...inputListHeader];
    list.splice(index, 1);
    setinputListHeader(list);
  };

  // handle click event of the Add button
  const handleAddClickHeader = () => {
    setinputListHeader([...inputListHeader, { key: "", value: "" }]);
  };


  // part 2

  const [inputListQueryParameter, setinputListQueryParameter] = React.useState([{ key: "", value: "" }]);

  // handle input change
  const handleInputChangeQueryParameter = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListQueryParameter];
    list[index][name] = value;
    setinputListQueryParameter(list);
    setValues({ ...values, 'parameters': inputListQueryParameter });
  };

  // handle click event of the Remove button
  const handleRemoveClickQueryParameter = index => {
    const list = [...inputListQueryParameter];
    list.splice(index, 1);
    setinputListQueryParameter(list);
  };

  // handle click event of the Add button
  const handleAddClickQueryParameter = () => {
    setinputListQueryParameter([...inputListQueryParameter, { key: "", value: "" }]);
  };

  // dynamic controller stop


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleConfirm = (e) => {

    e.preventDefault();
    axios.post('https://bulman-api.herokuapp.com/api/scenarios/'+project_id, values)
      .then(res => {
        
        history.push({ pathname: '/scenarios', state: { project: project_id } });
        window.location.reload();
        
      });
  }

  return (
    <div className={classes.drawerRoot}>

<Drawer className={classes.drawer} variant="persistent" anchor="right" open={props.open}  classes={{ paper: classes.drawerPaper, }} >
        <div className={classes.drawerHeader}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Scenario # Project Name #
          </Typography>
        </div>

        <form autoComplete="off">

          <div className={classes.drawerForm}>
            <TextField
              required
              id="scenario-name"
              label="Scenario Name"
              helperText="Some important text"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true, }}
              onChange={handleChange('name')}
            />
            <TextField
              required
              id="scenario-url"
              label="Request Url"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true, }}
              onChange={handleChange('url')}
            />
             <TextField
              required
              id="standard-select-currency"
              select
              label="Method"
              fullWidth
              margin="normal"
              variant="outlined"
              defaultValue=""
              InputLabelProps={{ shrink: true, }}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              onChange={handleChange('method')}
            >
              {verbs.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

          </div>
          <div className={classes.drawerForm}>

          <h3>Headers </h3>

            {inputListHeader.map((x, i) => {
              return (
                <div key={i} className={classes.dynamicHeader}>
                 
                  <TextField
                    variant="outlined"
                    name="key"
                    placeholder="key"
                    value={x.key}
                    className={classes.dynamicHeaderTextField}
                    onChange={e => handleInputChangeHeader(e, i)}
                  /> 
                  <span className={classes.dynamicHeaderItem}>:</span> 
                  <TextField
                    variant="outlined"
                    name="value"
                    placeholder="value"
                    value={x.value}
                    className={classes.dynamicHeaderTextField}
                    onChange={e => handleInputChangeHeader(e, i)}
                  />
                  <span className={classes.dynamicHeaderItem}>
                    {inputListHeader.length !== 1 && <IconButton onClick={() => handleRemoveClickHeader(i)}><RemoveCircle /></IconButton>}
                    {inputListHeader.length -1 === i && <IconButton onClick={handleAddClickHeader}><AddCircle /></IconButton>}
                  </span>
                </div>
              );
            })}
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputListHeader)}</div>  */}
           
            <h3>Query Parameters</h3>

            {inputListQueryParameter.map((x, i) => {
              return (
                <div key={i} >
                  <TextField
                    variant="outlined"
                    name="key"
                    placeholder="key"
                    value={x.key}
                    className={classes.dynamicHeaderTextField}
                    onChange={e => handleInputChangeQueryParameter(e, i)}
                  /> 
                  <span className={classes.dynamicHeaderItem}>:</span> 
                  <TextField
                    variant="outlined"
                    name="value"
                    placeholder="value"
                    value={x.value}
                    className={classes.dynamicHeaderTextField}
                    onChange={e => handleInputChangeQueryParameter(e, i)}
                  />
                  <span className={classes.dynamicHeaderItem}>
                    {inputListQueryParameter.length !== 1 && <IconButton  onClick={() => handleRemoveClickQueryParameter(i)}><RemoveCircle /></IconButton>}
                    {inputListQueryParameter.length -1 === i && <IconButton onClick={handleAddClickQueryParameter}><AddCircle /></IconButton>}
                  </span>
                </div>
              );
            })}
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputListQueryParameter)}</div>*/}

          </div>

           
          <div className={classes.textFieldMultiline}>
            <TextField
              required
              id="payload-input"
              label="Payload"
              style={{height: 200}}
              multiline
              rows={10}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true, }}
              onChange={handleChange('payload')}
            />
            </div>
        </form>
        <div className={classes.footer}>
            <Button style={{ marginRight: '1rem' }} variant="contained" aria-label="open drawer" edge="end" onClick={props.close}  >
              Cancel
        </Button>
            {'   '}
            <Button variant="contained" color="primary" aria-label="open drawer" edge="end" onClick={handleConfirm}  >
              Confirm
        </Button>
          </div>


      </Drawer>
    </div>
  );
}


