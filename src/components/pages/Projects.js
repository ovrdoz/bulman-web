import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProjectsDrawer from '../ui/ProjectsDrawer';
import ProjectsCard from '../ui/ProjectsCard';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { LinearProgress,GridList,GridListTile} from '@material-ui/core';

export default function Project() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ projects: [] });
  const [loading, setLoading] = useState(false);

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
        'https://bulman-api.herokuapp.com/api/projects',
      );
      setLoading(false);

      if(result.data != null ){
        setData({ projects: result.data });
      }

    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
        
      
      <Box display="flex" p={1}  >
          <Box p={1}  flexGrow={1}>
            <Typography  variant="h5" >
              Request projects
          </Typography>
          </Box>

          <Box p={1}  >
            <Button variant="contained" color="primary" aria-label="open drawer" edge="end" onClick={handleDrawerOpen}  >
              Add project
          </Button>
          
          </Box>
        </Box>
        

        <ProjectsDrawer open={open} close={() => { handleDrawerClose(); }}/>

        {loading ? (
          <LinearProgress />
        ) : (
          <GridList  className={classes.gridList} cols={2} cellHeight='auto'>

              {data.projects.map(project => (
                 <GridListTile key={project._id} >
                  <ProjectsCard
                    project={project}
                    open={() => { handleDrawerOpen(); }}
                  />

               </GridListTile>
              ))}
            </GridList>
          )}


    </React.Fragment>
  );
}
