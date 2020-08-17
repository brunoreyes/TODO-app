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
  Select,
  MenuItem,
  TextField,
  Button,
  // IconButton,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import RemindersTable from './RemindersTable/RemindersTable';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Fade from 'react-reveal/Fade';
// import RoomIcon from '@material-ui/icons/Room';
import SubjectIcon from '@material-ui/icons/Subject';
import ReplayIcon from '@material-ui/icons/Replay';
import CategoryIcon from '@material-ui/icons/Category';

// Material UI styles
const styles = (theme) => ({
  allContainer: {},
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

  // FORM STYLING

  invisibleText: {
    color: 'white',
  },
  newOrAddReminderButton: {
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
  formControlContainer: {
    'text-align': 'center',
    width: 'auto',
    margin: '20px 0px',
  },
  formControl: {
    'text-align': 'center',
    margin: '10px',
    'padding-top': '20px',
  },
  linkFormControl: {
    'text-align': 'center',
    margin: '10px 60px 10px 10px',
    'padding-top': '20px',
    width: '50px',
  },
  linkInput: { width: '100px' },
  newViewContainer: {
    margin: 'auto',
    display: 'flex',
    'justify-content': 'center',
  },
  dateField: {
    marginTop: '15px',
    width: '220px',
  },
  descriptionInput: { width: '200px' },
  nameInput: { width: '100px' },
  categorySelector: { marginTop: '0px', width: '50px' },

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
    color: '#4caf50',
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
  tableHeadEndCell: {
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
      width: 110,
    },
  },
};

class RemindersPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_REMINDERS' });
    this.props.dispatch({ type: 'FETCH_CATEGORIES' });
  }

  state = {
    name: '',
    description: '',
    category_id: '',
    category: '',
    link: '',
    date: '',
    end_date: '',
    repeat: '',
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
      end_date: date,
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

  handleEditReminderClick = (reminder) => {
    this.setState({
      id: reminder.id,
      name: reminder.name,
      description: reminder.description,
      category: reminder.category,
      category_id: reminder.category_id,
      link: reminder.link,
      date: reminder.date,
      end_date: reminder.end_date,
      repeat: reminder.repeat,
      editmode: !reminder.editmode,
      user_id: reminder.user_id,
    });
    console.log('edit was clicked! Reminder state:', reminder);
  };

  // handleLocationClick = () => {
  //   var Input = document.getElementById('searchTextField');
  //   new google.maps.places.Autocomplete(Input);
  // };

  // handleLocationClickLoader = () => {
  //   google.maps.event.addDomListener(window, 'load', handleLocationClick);
  // };

  handleAddReminderClick = () => {
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
        category_id: this.state.category_id,
        link: this.state.link,
        date: this.state.date,
        end_date: this.state.end_date,
        repeat: this.state.repeat,
      };
      console.log('in addReminder with payload:', payload);
      this.props.dispatch({ type: 'ADD_REMINDER', payload: payload });

      this.setState({
        name: '',
        description: '',
        category_id: '',
        category: '',
        link: '',
        repeat: '',
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
        category_id: this.state.category_id,
        link: this.state.link,
        date: this.state.date,
        end_date: this.state.end_date,
        id: this.state.id,
        repeat: this.state.repeat,
      };
      console.log('In saveChangesClicked, payload:', payload);
      this.props.dispatch({
        type: 'UPDATE_REMINDER',
        payload: payload,
      });
      this.setState({
        editmode: !this.state.editmode,
        name: '',
        description: '',
        category_id: '',
        category: '',
        link: '',
        repeat: '',
      });
      this.props.dispatch({ type: 'FETCH_REMINDERS' });
    }
  };

  // General Click Handler for Name, Description, Catagory, Link & Date
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
        <a name="reminders">
          <span className={classes.newViewContainer}>
            {/* THE FORM */}
            <div className={classes.newContainer}>
              <Button
                variant="contained"
                className={classes.newOrAddReminderButton}
                endIcon={<NotificationsIcon></NotificationsIcon>}
                onClick={this.handleNewClick}
              >
                New
              </Button>
            </div>
            <div className={classes.viewContainer}>
              <Button
                variant="contained"
                className={classes.newOrAddReminderButton}
                endIcon={<NotificationsIcon></NotificationsIcon>}
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
                    className={classes.nameInput}
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
                <FormHelperText></FormHelperText>
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
                  <span className={classes.invisibleText}>invisible text</span>
                </FormHelperText>
              </FormControl>

              {/* <input id="searchTextField" type="text" size="50"></input> */}
              <FormControl className={classes.linkFormControl}>
                <InputLabel className={classes.linkInputField}>
                  <LinkIcon />
                </InputLabel>
                <Input
                  className={classes.linkInput}
                  value={this.state.link}
                  onChange={this.handleInputChangeFor('link')}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.categorySelector}>
                  <ReplayIcon />
                </InputLabel>
                <Select
                  MenuProps={CategorySelectorProps}
                  value={this.state.repeat}
                  onChange={this.handleInputChangeFor('repeat')}
                  // onChange={this.handleInputChangeFor('category_id')}
                >
                  <MenuItem disabled>Repeat</MenuItem>
                  <MenuItem value={'Daily'}>Daily</MenuItem>
                  <MenuItem value={'Weekly'}>Weekly</MenuItem>
                  <MenuItem value={'Monthly'}>Monthly</MenuItem>
                  <MenuItem value={'Yearly'}>Yearly</MenuItem>
                </Select>
                <FormHelperText>
                  <span className={classes.invisibleText}>
                    invisible text is right
                  </span>
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.dateLabel}>Date</InputLabel>
                <TextField
                  id="date"
                  type="datetime-local"
                  value={this.state.date}
                  onChange={this.handleInputChangeFor('date')}
                  defaultValue={this.state.date}
                  className={classes.dateField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.dateLabel}> End Date</InputLabel>
                <TextField
                  id="date"
                  // label="Date"
                  type="datetime-local"
                  value={this.state.end_date}
                  onChange={this.handleInputChangeFor('end_date')}
                  defaultValue={this.state.date}
                  defaultValue={this.state.end_date}
                  className={classes.dateField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                {this.state.editmode ? (
                  <Button
                    variant="contained"
                    onClick={this.handleSaveChangesClick}
                    className={classes.newOrAddReminderButton}
                    endIcon={<NotificationsIcon>Save</NotificationsIcon>}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={this.handleAddReminderClick}
                    className={classes.newOrAddReminderButton}
                    endIcon={<NotificationsIcon>Add</NotificationsIcon>}
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
              {this.props.reminders === [] ? (
                'please wait..'
              ) : (
                <Paper className={classes.root} elevation={3}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
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
                          <CategoryIcon />{' '}
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
                          <ReplayIcon />
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadCellLeft}
                          align="left"
                        >
                          <CalendarTodayIcon />
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadEndCell}
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
                      {this.props.reminders.map((reminder) => (
                        <RemindersTable
                          reminder={reminder}
                          key={reminder.id}
                          handleEditReminderClick={this.handleEditReminderClick}
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
  reminders: state.reminders,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(RemindersPage));
