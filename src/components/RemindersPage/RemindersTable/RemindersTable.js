import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  withStyles,
  TableCell,
  TableRow,
  // IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
  allContainer: {},
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    // '&:nth-of-type(even)': {
    //   backgroundColor: '#f9f9f9',
    // },
    color: '#161616',
    '&:hover': {
      backgroundColor: '#f9f9f9',
    },
  },
  collapseTableRow: {
    backgroundColor: '#f9f9f9',
  },
  tableCellLeft: {
    font: '  500 13px Montserrat, sans-serif',
    'text-transform': 'capitalize',
    padding: '10px 0px 10px 18px',
  },
  tableCell: {
    font: '  500 13px Montserrat, sans-serif',
    'text-transform': 'capitalize',
    padding: '10px 0px 10px 18px',
  },
  tableLink: {
    font: '13px Montserrat, sans-serif',
    'padding-left': '15px',
    '&:hover': {
      color: '#1976d1',
    },
  },
  tableCellDescription: {
    font: '  500 13px Montserrat, sans-serif',
    padding: '10px 1% 10px 1%',
    'word-wrap': 'break-word',
    width: '400px',
  },
  blackstarIconTable: {
    'margin-bottom': '5px',
    padding: '10px 15px 0px 0px',
    '&:hover': {
      color: 'gold',
    },
  },
  starIconTable: {
    'margin-bottom': '5px',
    padding: '10px 15px 0px 0px',
    color: 'gold',
    '&:hover': {
      color: '#161616',
    },
  },
  collapseIcon: {
    'font-size': '30px',
    padding: '17px 10px 0px 1px',
    '&:hover': {
      color: '#1669aa',
    },
  },
  uncollapseIcon: {
    'font-size': '30px',
    padding: '17px 10px 0px 3px',
    '&:hover': {
      color: '#1669aa',
    },
  },
  invisibleIcon: { color: 'white', 'font-size': '0px' },
  editIcon: {
    'font-size': '20px',
    'margin-bottom': '5px',
    padding: '0px 15px 0px 0px',
    '&:hover': {
      color: '#fba333',
    },
  },
  editIconLink: {
    '&:hover': {
      color: '#fba333',
    },
    color: '#161616',
  },
  deleteIcon: {
    'margin-bottom': '5px',
    'font-size': '20px',
    // padding: '0px 15px 0px 0px',
    '&:hover': {
      color: '#e53935',
    },
  },
});

class RemindersTable extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
      this.setState({
        editmode: false,
      });
    }
  }

  handleDeleteReminderClick = () => {
    console.log('delete was clicked!', this.props.reminder.id);
    this.props.dispatch({
      type: 'DELETE_REMINDER',
      payload: this.props.reminder.id,
    });
  };

  handleLinkClick = () => {
    console.log('this.props.reminder.link', this.props.reminder.link);
    let win = window.open(this.props.reminder.link, '_blank');
    win.focus();
  };

  state = {
    editmode: false,
    viewmoremode: false,
  };

  handleEditReminderClickOnTable = () => {
    console.log('edit was clicked!', this.state.editmode);
    this.setState({
      editmode: !this.state.editmode,
    });
  };

  handleCollapsedClick = () => {
    console.log(
      'collapse was clicked, viewmoremode state switched to:',
      this.state.editmode
    );
    this.setState({
      viewmoremode: !this.state.viewmoremode,
    });
  };

  timeStampConversion = () => {
    let s = `${this.props.reminder.end_date}`;
    let d = new Date(Date.parse(s));
    console.log('d', d);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {/*-- Do not wrap table row within a Div --*/}
        <TableRow
          id={this.props.reminder.id}
          key={this.props.reminder.id}
          className={`${
            this.state.viewmoremode
              ? classes.collapseTableRow
              : classes.tableRow
          }`}
        >
          <TableCell className={classes.tableCell}>
            {this.props.reminder.name}
          </TableCell>
          <TableCell className={classes.tableCellDescription} align="left">
            {this.state.viewmoremode ? (
              this.props.reminder.description
            ) : (
              <span>
                {this.props.reminder.description.length > 40
                  ? this.props.reminder.description.substring(0, 40) + '...'
                  : this.props.reminder.description}
              </span>
            )}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.reminder.category}
          </TableCell>
          <TableCell className={classes.tableLink} align="left">
            {this.props.reminder.link === '' ? (
              <span></span>
            ) : (
              <LinkIcon
                value={this.props.reminder.link}
                onClick={this.handleLinkClick}
              />
            )}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.reminder.repeat}
          </TableCell>
          <TableCell className={classes.tableCellLeft} align="left">
            {/* This only defaults to todays date */}
            {/* {Date(this.props.reminder.date).split('GMT')[0].slice(0, -4)} */}
            {this.props.reminder.date.split(':00.00')[0].replace('T', ' ')}
          </TableCell>
          <TableCell className={classes.tableCellLeft} align="left">
            {this.props.reminder.end_date.split(':00.00')[0].replace('T', ' ')}
          </TableCell>
          {/* Here we get an error saying the star or 
          SVG icon cannot appear as a child of tr */}
          {this.state.viewmoremode ? (
            <ExpandMoreIcon
              className={classes.collapseIcon}
              onClick={this.handleCollapsedClick}
            />
          ) : (
            <ExpandLessIcon
              className={classes.uncollapseIcon}
              onClick={this.handleCollapsedClick}
            />
          )}
          <a href="#reminders" className={classes.editIconLink}>
            <EditIcon
              onClick={() => {
                this.props.handleEditReminderClick(this.props.reminder);
                this.handleEditReminderClickOnTable();
              }}
              className={classes.editIcon}
            ></EditIcon>
          </a>
          {/* {JSON.stringify(this.state.id)} */}
          {/* {JSON.stringify(this.props.reminder.id)} */}
          {/* <IconButton
          > */}
          {/* document.querySelector('tr #6') */}
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.handleDeleteReminderClick}
          ></DeleteIcon>
          {/* </IconButton> */}
        </TableRow>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  reminders: state.reminders,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(RemindersTable));
