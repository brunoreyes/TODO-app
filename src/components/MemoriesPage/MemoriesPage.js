import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import MemoriesTable from './MemoriesTable/MemoriesTable';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Fade from 'react-reveal/Fade';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import SubjectIcon from '@material-ui/icons/Subject';

// Material UI styles
const styles = (theme) => ({
  allContainer: {},

  // FORM STYLING

  formControl: {
    'text-align': 'center',
    margin: '10px',
    'padding-top': '20px',
  },
  formControlContainer: {
    'text-align': 'center',
    width: 'auto',
    margin: '20px 0px',
  },
  newViewContainer: {
    margin: 'auto',
    display: 'flex',
    'justify-content': 'center',
  },
  newContainer: {
    width: 'auto',
    display: 'inline-block',
    margin: '100px 10px 0px auto',
  },
  viewContainer: {
    width: 'auto',
    margin: '100px auto 0px 10px',
    display: 'inline-block',
  },
  invisibleText: {
    color: 'white',
  },
  newOrAddMemoryButton: {
    color: 'white',
    'font-family': 'Montserrat',
    'background-color': '#161616',
    margin: '10px 0px 0px 0px',
    padding: '8px 8px 8px 10px',
    '&:hover': {
      color: 'gold',
      'background-color': '#161616',
    },
  },
  descriptionInput: { width: '800px' },
  starIconForm: {
    'font-size': '40px',
    paddingTop: '10px',
    color: 'gold',
    '&:hover': {
      color: '#161616',
    },
  },
  blackstarIconForm: {
    'font-size': '40px',
    paddingTop: '10px',
    '&:hover': {
      color: 'gold',
    },
  },
  errorMessage: {
    color: 'white',
  },
  // TABLE STYLING

  tableContainer: {
    'margin-top': '450px',
    position: 'sticky',
    bottom: 0,
  },

  // root = table's paper
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto auto 120px auto',
    minWidth: 700,
    'border-radius': '5px',
  },
  table: {},
  tableHeadCellLeft: {
    // font: font-weight font-size/line-height font-variant, font-stylefont
    font: 'small-caps 500 16px Montserrat, sans-serif',
    color: 'white',
    padding: '18px 0% 18px 1%',
    'background-color': '#161616',
  },
  tableHeadCell: {
    font: '500 16px Montserrat, sans-serif',
    color: 'white',
    padding: '18px 0% 18px -1%',
    'background-color': '#161616',
    // position: 'sticky',
    // top: 0,
  },
  tableHeadCellRight: {
    font: '500 16px Montserrat, sans-serif',
    color: 'white',
    padding: '18px 0px 18px 0%',
    'background-color': '#161616',
  },
});

class MemoriesPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_MEMORIES' });
    this.props.dispatch({ type: 'FETCH_CATEGORIES' });
    this.props.dispatch({ type: 'FETCH_FAVORITE' });
  }

  state = {
    name: '',
    description: '',
    date: '',
    favorited: false,
    editmode: false,
    inputmode: false,
    readyToSendMode: true,
    viewmode: false,
  };

  // Changing the date to today
  constructor() {
    super();
    var today = new Date(),
      date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
    this.state = {
      date: date,
    };
  }

  // Unique Click Handlers
  handleNewClick = () => {
    this.setState({
      inputmode: !this.state.inputmode,
    });
    console.log(
      'New was clicked! Now edit mode state is:',
      this.state.editmode
    );
  };

  handleViewClick = () => {
    this.setState({
      viewmode: !this.state.viewmode,
    });
    console.log(
      'View was clicked! Now view mode state is:',
      this.state.viewmode
    );
  };

  handleFavoriteMemoryFormClick = () => {
    this.setState({
      favorited: !this.state.favorited,
    });
    console.log(
      'in handleFavoriteMemoryFormClick. Now this.state.favorited value is:',
      this.state.favorited
    );
  };

  handleEditMemoryClick = (memory) => {
    this.setState({
      id: memory.id,
      name: memory.name,
      description: memory.description,
      date: memory.date,
      editmode: !memory.editmode,
      user_id: memory.user_id,
      favorited: memory.favorited,
    });
    console.log('edit was clicked! memory state:', memory);
  };

  handleFavoritedMemoryClick = (memory) => {
    const payload = {
      favorited: !memory.favorited,
      id: memory.id,
    };
    this.setState({
      favorited: !memory.favorited,
      id: memory.id,
    });
    this.props.dispatch({
      type: 'CHANGE_FAVORITE_STATUS_MEMORY',
      payload: payload,
    });
    console.log(
      'in favoritedMemoryClick, this.state.favorited:',
      this.state.favorited
    );
  };

  handleAddMemoryClick = () => {
    if (this.state.name === '' || this.state.description === '') {
      alert('Please Fill All Required * Fields');
    } else {
      const payload = {
        name: this.state.name,
        description: this.state.description,
        date: this.state.date,
        favorited: this.state.favorited,
      };
      console.log('in addMemory with payload:', payload);
      this.props.dispatch({ type: 'ADD_MEMORY', payload: payload });

      this.setState({
        name: '',
        description: '',
        favorited: false,
      });
    }
  };

  // save changes = submit button
  handleSaveChangesClick = () => {
    if (this.state.name === '' || this.state.description === '') {
      alert('Please Fill All Required * Fields');
    } else {
      const payload = {
        name: this.state.name,
        description: this.state.description,
        date: this.state.date,
        favorited: this.state.favorited,
        id: this.state.id,
      };
      console.log('In saveChangesClicked, payload:', payload);
      this.props.dispatch({
        type: 'UPDATE_MEMORY',
        payload: payload,
      });
      this.setState({
        editmode: !this.state.editmode,
        name: '',
        description: '',
        favorited: false,
      });
      this.props.dispatch({ type: 'FETCH_MEMORIES' });
    }
  };

  // General Click Handler for Name, Description & Date
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    console.log(`in handleInputChangeFor ${propertyName}:`, event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.allContainer}>
        <a name="memories">
          <span className={classes.newViewContainer}>
            {/* THE FORM */}
            <div className={classes.newContainer}>
              <Button
                variant="contained"
                className={classes.newOrAddMemoryButton}
                endIcon={<BubbleChartIcon></BubbleChartIcon>}
                onClick={this.handleNewClick}
              >
                New
              </Button>
            </div>
            <div className={classes.viewContainer}>
              <Button
                variant="contained"
                className={classes.newOrAddMemoryButton}
                endIcon={<BubbleChartIcon></BubbleChartIcon>}
                onClick={this.handleViewClick}
              >
                View
              </Button>
            </div>
          </span>
        </a>
        {this.state.inputmode || this.state.editmode ? (
          <Fade>
            <div className={classes.formControlContainer}>
              <FormControl className={classes.formControl}>
                <div>
                  <InputLabel>Name</InputLabel>
                  <Input
                    multiline
                    value={this.state.name}
                    onChange={this.handleInputChangeFor('name')}
                  />
                  <FormHelperText>Required *</FormHelperText>
                </div>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>
                  <SubjectIcon />
                </InputLabel>
                <Input
                  className={classes.descriptionInput}
                  multiline
                  rowsMax={15}
                  value={this.state.description}
                  onChange={this.handleInputChangeFor('description')}
                />
                <FormHelperText>Required *</FormHelperText>
              </FormControl>

              {this.state.favorited ? (
                <FormControl className={classes.formControl}>
                  <StarIcon
                    onClick={this.handleFavoriteMemoryFormClick}
                    value={this.state.favorited}
                    className={classes.starIconForm}
                  ></StarIcon>
                </FormControl>
              ) : (
                <FormControl className={classes.formControl}>
                  <StarIcon
                    onClick={this.handleFavoriteMemoryFormClick}
                    value={this.state.favorited}
                    className={classes.blackstarIconForm}
                  ></StarIcon>
                </FormControl>
              )}

              <FormControl className={classes.formControl}>
                {this.state.editmode ? (
                  <Button
                    // id={submitButton}
                    variant="contained"
                    onClick={this.handleSaveChangesClick}
                    className={classes.newOrAddMemoryButton}
                    endIcon={<BubbleChartIcon>Save</BubbleChartIcon>}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={this.handleAddMemoryClick}
                    className={classes.newOrAddMemoryButton}
                    endIcon={<BubbleChartIcon>Add</BubbleChartIcon>}
                  >
                    Add
                  </Button>
                )}
              </FormControl>
            </div>
          </Fade>
        ) : (
          <span></span>
        )}
        {/* THE TABLE */}

        {this.state.viewmode ? (
          <Fade bottom>
            <div className={classes.tableContainer}>
              {this.props.memories === [] ? (
                'please wait..'
              ) : (
                <Paper className={classes.root} elevation={3}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className={classes.tableHeadCellLeft}
                          align="left"
                        >
                          <CalendarTodayIcon />
                        </TableCell>
                        <TableCell className={classes.tableHeadCell}>
                          Name
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          <SubjectIcon />
                        </TableCell>
                        {/* <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          Category
                        </TableCell> */}

                        {/* <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          <LinkIcon />
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          <ImageIcon />
                        </TableCell> */}

                        <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          <StarIcon />
                        </TableCell>

                        <TableCell
                          className={classes.tableHeadCellRight}
                          align="left"
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.memories.map((memory) => (
                        <MemoriesTable
                          memory={memory}
                          key={memory.id}
                          handleEditMemoryClick={this.handleEditMemoryClick}
                          handleFavoritedMemoryClick={
                            this.handleFavoritedMemoryClick
                          }
                        />
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )}
            </div>
          </Fade>
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  memories: state.memories,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(MemoriesPage));
