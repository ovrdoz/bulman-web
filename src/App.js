
import './App.css';
import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import NavBar from './components/ui/NavBar';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import Scenarios from './components/pages/Scenarios';
import { Toolbar } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function App(props) {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <ElevationScroll {...props}>
        <NavBar />
      </ElevationScroll>
      <Toolbar />
      <Container maxWidth="lg">
        <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route path="/projects" render={() => <Projects />} />
              <Route path="/scenarios" render={() => <Scenarios />} />
            </Switch>
          </BrowserRouter>
      </Container>

    </div>

    </ThemeProvider>
  );
}

export default App;
