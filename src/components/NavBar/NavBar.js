import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Button } from '@material-ui/core/';
import { connect } from 'react-redux';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import TasksPage from '../TasksPage/TasksPage';
import IdeasPage from '../IdeasPage/IdeasPage';
function ProjectTabs() {
  const allTabs = ['/tasks', '/ideas'];
  const styles = {
    AppBar: {
      background: 'white',
      boxShadow: 'none',
      color: 'black',
    },
    Tab: {
      '&:hover': {
            background: 'blue',
          
      },
    },
  };
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Route
            path="/"
            render={({ location }) => (
              <AppBar style={styles.AppBar} position="static">
                <Tabs
                  value={location.pathname}
                  TabIndicatorProps={{ style: { background: 'black' } }}
                        variant="fullWidth"
                        
                >
                  <Tab
                    className="Page"
                    label="Pizza Menu"
                    value="/tasks"
                    component={Link}
                    to={allTabs[0]}
                  />

                  <Tab
                    className="Page"
                    label="Cart"
                    value="/ideas"
                    component={Link}
                    to={allTabs[1]}
                  />
                </Tabs>
                <Switch>
                  <Route exact path={allTabs[0]} render={() => <TasksPage />} />
                  <Route path={allTabs[1]} render={() => <IdeasPage />} />
                </Switch>
              </AppBar>
            )}
          />
        </div>
      </BrowserRouter>
    </>
  );
}
export default ProjectTabs;
// const putReduxStateOnProps = (reduxState) => ({ reduxState });
// export default connect(putReduxStateOnProps)(withStyles(styles)(ProjectTabs));
