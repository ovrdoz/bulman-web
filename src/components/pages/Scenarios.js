import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScenariosDrawer from '../ui/ScenariosDrawer';
import ScenariosCard from '../ui/ScenariosCard';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { LinearProgress,List} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EmptyPage from '../ui/EmptyPage';

export default function Scenario() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ scenarios: [] });
  const [loading, setLoading] = useState(false);
  const [emptyPage, setEmptyPage] = useState(false);

  const history = useHistory();
  const project_id = history.location.state?.project;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = makeStyles(theme => ({
    paper: {
      paddingBottom: 50,
    },
     gridList: {
      height: "auto"
    },
    spreadBox: {
      justifyContent: "space-between",
    }
  }));

  useEffect(() => {
    
    const fetchData = async () => {
      
      setLoading(true);
      const result = await axios(
        'https://bulman-api.herokuapp.com/api/scenarios/project/'+project_id,
      );
      setLoading(false);

      if(result.data != null ){
        setData({ scenarios: result.data });
      }else{
        setEmptyPage(true)
      }

    };
    fetchData();
  }, [project_id]);

  return (
    <React.Fragment>
      <CssBaseline />
        
      
      <Box display="flex" p={1}  >
          <Box p={1} flexGrow={1}>
            <Typography variant="h5" >
              Request scenarios
          </Typography>
          </Box>

          <Box  m={1} pt={1} >
            <Link color="inherit" href="/projects" >
              Back
            </Link>
          </Box>

          <Box p={1}  >
            <Button variant="contained" color="primary" aria-label="open drawer" edge="end" onClick={handleDrawerOpen}  >
              Add scenario
            </Button>
          </Box>
        </Box>
        

        <ScenariosDrawer open={open} close={() => { handleDrawerClose(); }}/>

        {loading ? (
          <LinearProgress />
        ) : (
          
          <List className={classes.gridList} cols={2}>
            {
              data.scenarios.map(scenario => (

                 <React.Fragment key={scenario._id}>
                  <ScenariosCard
                    scenario={scenario}
                    open={() => { handleDrawerOpen(); }}
                  />

               </React.Fragment>
              ))
              }
            </List>
          )}
          
        {emptyPage ? ( <EmptyPage/> ):null}


    </React.Fragment>
  );
}
