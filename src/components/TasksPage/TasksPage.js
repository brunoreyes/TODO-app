import { connect } from 'react-redux';
import React, { Component } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
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
  Select,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TasksTable from './TasksTable/TasksTable';
import LinkIcon from '@material-ui/icons/Link';
import ImageIcon from '@material-ui/icons/Image';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Fade from 'react-reveal/Fade';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SubjectIcon from '@material-ui/icons/Subject';
import CategoryIcon from '@material-ui/icons/Category';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

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
  timeLabel: { marginBottom: '80px' },
  timeIconForm: { 'font-size': '25px', marginBottom: '80px' },
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
  newOrAddTaskButton: {
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
  dateField: {
    marginTop: '15px',
    width: '220px',
  },
  descriptionInput: { width: '250px' },
  categorySelector: { marginTop: '0px', width: '30px' },
  linkInputLabel: { marginTop: '-5px' },
  linkInput: { width: '100px', marginRight: '-25px' },
  timeInput: {
    color: '#161616',
    width: '110px',
    marginTop: '15px',
  },
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
  },
  tableHeadCellDate: {
    font: '500 16px Montserrat, sans-serif',
    color: '#ff3d00',
    padding: '18px 0% 18px -1%',
    'background-color': '#161616',
  },
  tableHeadCellRight: {
    font: '500 16px Montserrat, sans-serif',
    color: 'white',
    padding: '18px 0px 18px 0%',
    'background-color': '#161616',
  },
});

// PaperProps handle the scrollable selector
const CategorySelectorHeight = 40;
const CategorySelectorPaddingTop = 6;
const CategorySelectorProps = {
  PaperProps: {
    style: {
      maxHeight: CategorySelectorHeight * 3.4 + CategorySelectorPaddingTop,
      width: 90,
    },
  },
};
class TasksPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_TASKS' });
    this.props.dispatch({ type: 'FETCH_CATEGORIES' });
  }

  state = {
    name: '',
    description: '',
    image_url: '',
    category_id: '',
    category: '',
    link: '',
    due_date: '',
    complete: false,
    editmode: false,
    inputmode: false,
    readyToSendMode: true,
    viewmode: false,
    priority: '',
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
      due_date: date,
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

  handleEditTaskClick = (task) => {
    this.setState({
      id: task.id,
      name: task.name,
      description: task.description,
      image_url: task.image_url,
      category: task.category,
      category_id: task.category_id,
      link: task.link,
      date: task.date,
      editmode: !task.editmode,
      user_id: task.user_id,
      due_date: task.due_date,
      priority: task.priority,
      duration: task.duration,
      complete: task.complete,
    });
    console.log('edit was clicked! Task state:', task);
  };

  handleAddTaskClick = () => {
    if (
      this.state.name === '' ||
      this.state.description === '' ||
      this.state.category_id === ''
    ) {
      alert('Please Fill All Required * Fields');
    } else {
      const payload = {
        name: this.state.name,
        description: this.state.description,
        image_url: this.state.image_url,
        category_id: this.state.category_id,
        link: this.state.link,
        date: this.state.date,
        due_date: this.state.due_date,
        priority: this.state.priority,
        duration: this.state.duration,
        complete: this.state.complete,
      };
      console.log('in addTask with payload:', payload);
      this.props.dispatch({ type: 'ADD_TASK', payload: payload });

      this.setState({
        name: '',
        description: '',
        image_url: '',
        category_id: '',
        category: '',
        link: '',
        due_date: '',
        priority: '',
        duration: '',
      });
    }
  };

  // save changes = submit button
  handleSaveChangesClick = () => {
    if (
      this.state.name === '' ||
      this.state.description === '' ||
      this.state.category_id === ''
    ) {
      alert('Please Fill All Required * Fields');
    } else {
      const payload = {
        name: this.state.name,
        description: this.state.description,
        image_url: this.state.image_url,
        category_id: this.state.category_id,
        link: this.state.link,
        date: this.state.date,
        id: this.state.id,
        due_date: this.state.due_date,
        priority: this.state.priority,
        duration: this.state.duration,
        complete: this.state.complete,
      };
      console.log('In saveChangesClicked, payload:', payload);
      this.props.dispatch({
        type: 'UPDATE_TASK',
        payload: payload,
      });
      this.setState({
        editmode: !this.state.editmode,
        name: '',
        description: '',
        image_url: '',
        category_id: '',
        category: '',
        link: '',
        // due_date: '',
        priority: '',
      });
      this.props.dispatch({ type: 'FETCH_TASKS' });
    }
  };

  // image upload handler
  handleFinishedUpload = (info) => {
    console.log(
      'info:',
      info,
      'File uploaded with filename:',
      info.filename,
      'Access it on s3 at:',
      info.fileUrl
    );
    this.setState({
      image_url: info.fileUrl,
    });
  };

  // handleCheckboxChecked = (task) => {
  //   const payload = {
  //     name: task.name,
  //     description: task.description,
  //     link: task.link,
  //     image_url: task.image_url,
  //     priority: task.priority,
  //     priority: task.priority,
  //     complete: !task.complete,
  //     repeat: task.repeat,
  //     due_date: task.due_date,
  //     streak_count: task.streak_count,
  //     category_id: task.category_id,
  //     date: task.date,
  //   };
  //   // this.setState({
  //   //   complete: !task.complete,
  //   // });
  //   this.props.dispatch({
  //     type: 'UPDATE_TASK',
  //     payload: payload,
  //   });
  //   console.log('in handleCheckboxChecked, idea.complete:', task.complete);
  // };

  handleCheckboxChecked = (task) => {
    const payload = {
      complete: !task.complete,
      id: task.id,
    };
    this.setState({
      complete: !task.complete,
      id: task.id,
    });
    this.props.dispatch({
      type: 'CHANGE_COMPLETE_STATUS_TASK',
      payload: payload,
    });
    console.log('in handleCheckboxChecked, idea.complete:', task.complete);
  };

  // General Click Handler for Name, Description, Catagory, Link & Date, Due Date, Priority,Time
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({ [propertyName]: event.target.value });
    console.log(`in handleInputChangeFor ${propertyName}:`, event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.allContainer}>
        <a name="tasks">
          <span className={classes.newViewContainer}>
            {/* THE FORM */}
            <div className={classes.newContainer}>
              <Button
                variant="contained"
                className={classes.newOrAddTaskButton}
                endIcon={<CheckBoxIcon></CheckBoxIcon>}
                onClick={this.handleNewClick}
              >
                New
              </Button>
            </div>
            <div className={classes.viewContainer}>
              <Button
                variant="contained"
                className={classes.newOrAddTaskButton}
                endIcon={<CheckBoxIcon></CheckBoxIcon>}
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
                  rowsMax={10}
                  value={this.state.description}
                  onChange={this.handleInputChangeFor('description')}
                />
                <FormHelperText>Required *</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.categorySelector}>
                  <CategoryIcon />
                </InputLabel>
                <Select
                  MenuProps={CategorySelectorProps}
                  value={this.state.category_id}
                  onChange={this.handleInputChangeFor('category_id')}
                >
                  {this.props.categories.map((category, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={11}>New Category</MenuItem> */}
                </Select>
                <FormHelperText>
                  Required *
                  <span className={classes.invisibleText}>
                    invisible text is
                  </span>
                </FormHelperText>
              </FormControl>

              {/* <FormControl className={classes.formControl}>
                <InputLabel>
                  <RoomIcon />
                </InputLabel>
                <Input
                  className={classes.descriptionInput}
                  multiline
                  type="text"
                  size="50"
                  id="searchTextField"
                  // ref={autoCompleteRef}
                  // onChange={(event) => setQuery(event.target.value)}
                  // placeholder="Enter a City"
                  // value={query}
                  onClick={this.handleLocationClick}
                  // rowsMax={3}
                  // value={this.state.description}
                  // onChange={this.handleInputChangeFor('description')}
                />
                <FormHelperText></FormHelperText>
              </FormControl> */}
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.linkInputLabel}>
                  <LinkIcon />
                </InputLabel>
                <Input
                  className={classes.linkInput}
                  value={this.state.link}
                  onChange={this.handleInputChangeFor('link')}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}></FormControl>
              <FormControl className={classes.formControl}>
                <ImageUpload handleFinishedUpload={this.handleFinishedUpload} />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.categorySelector}>
                  <PriorityHighIcon />
                </InputLabel>
                <Select
                  MenuProps={CategorySelectorProps}
                  value={this.state.priority}
                  onChange={this.handleInputChangeFor('priority')}
                >
                  <MenuItem value={'Low'}>Low</MenuItem>
                  <MenuItem value={'Medium'}>Medium</MenuItem>
                  <MenuItem value={'High'}>High</MenuItem>
                </Select>
                <FormHelperText>
                  <span className={classes.invisibleText}>
                    invisible is the w
                  </span>
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.timeLabel}>Duration</InputLabel>
                <TextField
                  type="time"
                  className={classes.timeInput}
                  value={this.state.duration}
                  onChange={this.handleInputChangeFor('duration')}
                ></TextField>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.dateLabel}>Due By</InputLabel>
                <TextField
                  id="date"
                  type="datetime-local"
                  value={this.state.due_date}
                  onChange={this.handleInputChangeFor('due_date')}
                  defaultValue={this.state.due_date}
                  className={classes.dateField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                {this.state.editmode ? (
                  <Button
                    // id={submitButton}
                    variant="contained"
                    onClick={this.handleSaveChangesClick}
                    className={classes.newOrAddTaskButton}
                    endIcon={<CheckBoxIcon>Save</CheckBoxIcon>}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={this.handleAddTaskClick}
                    className={classes.newOrAddTaskButton}
                    endIcon={<CheckBoxIcon>Add</CheckBoxIcon>}
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
              {this.props.tasks === [] ? (
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
                          {JSON.stringify(this.state.complete)}
                          <CheckBoxIcon />
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
                        <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          <CategoryIcon />
                        </TableCell>
                        <TableCell
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
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          <PriorityHighIcon />
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          <AccessTimeIcon />
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadCellDate}
                          align="left"
                        >
                          <CalendarTodayIcon />
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
                      {this.props.tasks.map((task) => (
                        <TasksTable
                          task={task}
                          key={task.id}
                          handleEditTaskClick={this.handleEditTaskClick}
                          handleFavoritedTaskClick={
                            this.handleFavoritedTaskClick
                          }
                          handleCheckboxChecked={this.handleCheckboxChecked}
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
  tasks: state.tasks,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(TasksPage));
