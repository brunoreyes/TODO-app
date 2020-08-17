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
import ImageIcon from '@material-ui/icons/Image';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

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
  completedTableRow: {
    backgroundColor: '#53DD6C',
    // 'border-top': '#ffffff solid 2px',
    // 'border-bottom': '#ffffff solid 2px',
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
  tableCellName: {
    font: '  500 15px Montserrat, sans-serif',
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
  checkBoxIcon: {
    color: '#161616',
  },
  checkBoxIconChecked: {
    color: '#161616',
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
  tableImage: {
    width: '300px',
    // 'box-shadow': 'inset 0px 0px 0px 0px #FFFFFF',
    backgroundColor: 'white',
  },
});

class TasksTable extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
      this.setState({
        editmode: false,
      });
    }
  }

  handleDeleteTaskClick = () => {
    console.log('delete was clicked!', this.props.task.id);
    this.props.dispatch({ type: 'DELETE_TASK', payload: this.props.task.id });
  };

  handleLinkClick = () => {
    console.log('this.props.task.link', this.props.task.link);
    let win = window.open(this.props.task.link, '_blank');
    win.focus();
  };

  state = {
    editMode: false,
    viewMoreMode: false,
    finishedMode: false,
  };

  handleEditTaskClickOnTable = () => {
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

  handleCheckBoxCheckedTable = () => {
    this.setState({
      finishedMode: !this.state.finishedMode,
    });
    // console.log(
    //   'checkbox was checked, finishedMode state switched to:',
    //   this.state.finishedMode
    // );
  };

  //   console.log(new Date(Date.fromString('09.05.2012', {order: 'DMY'})));
  // Wed May 09 2012 00:00:00 GMT+0300 (EEST)

  render() {
    const { classes } = this.props;
    return (
      <>
        {/*-- Do not wrap table row within a Div --*/}
        <TableRow
          id={this.props.task.id}
          key={this.props.task.id}
          className={`${
            this.state.viewmoremode
              ? classes.collapseTableRow
              : classes.tableRow && this.props.task.complete
              ? classes.completedTableRow
              : classes.tableRow
          }`}
        >
          <TableCell className={classes.tableCellLeft} align="left">
            {/* {JSON.stringify(this.props.task.complete)} */}

            {/* {JSON.stringify(this.state.complete)} */}
            {this.props.task.complete ? (
              <Checkbox
                color="white"
                checked
                className={classes.checkBoxIcon}
                onClick={() => {
                  this.props.handleCheckboxChecked(this.props.task);
                  this.handleCheckBoxCheckedTable();
                }}
              />
            ) : (
              <Checkbox
                color="white"
                className={classes.checkBoxIcon}
                onClick={() => {
                  this.props.handleCheckboxChecked(this.props.task);
                  this.handleCheckBoxCheckedTable();
                }}
              />
            )}
          </TableCell>

          <TableCell className={classes.tableCellName}>
            {this.props.task.name}
          </TableCell>
          <TableCell className={classes.tableCellDescription} align="left">
            {this.state.viewmoremode ? (
              this.props.task.description
            ) : (
              <span>
                {this.props.task.description.length > 40
                  ? this.props.task.description.substring(0, 40) + '...'
                  : this.props.task.description}
              </span>
            )}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.task.category}
            {/* {JSON.stringify(tasks.category_id)} */}
          </TableCell>
          <TableCell className={classes.tableLink} align="left">
            {this.props.task.link === '' ? (
              <span></span>
            ) : (
              <LinkIcon
                value={this.props.task.link}
                onClick={this.handleLinkClick}
              />
            )}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.task.image_url === '' ||
            this.props.task.image_url === null ? (
              <span></span>
            ) : (
              <ImageIcon
                className={`${
                  this.state.viewmoremode
                    ? classes.invisibleIcon
                    : classes.realIcon
                }`}
              />
            )}
            {this.state.viewmoremode ? (
              <img
                className={classes.tableImage}
                src={this.props.task.image_url}
                // alt={this.props.task.name}
              ></img>
            ) : (
              <span></span>
            )}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.task.priority}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {/* {this.props.task.duration} */}
            {/* {this.props.task.duration.splice(':00')[0]} */}
            {this.props.task.duration.slice(0, -3)}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {/* {Date(this.props.task.due_date).split('GMT')[0].slice(0, -4)} */}
            {/* {this.props.task.due_date} */}
            {this.props.task.due_date.split(':00.00')[0].replace('T', ' ')}
          </TableCell>
          {/* Here we get an error saying the star or 
          SVG icon cannot appear as a child of tr */}
          {this.state.viewmoremode ? (
            <ExpandMoreIcon onClick={this.handleCollapsedClick} />
          ) : (
            <ExpandLessIcon
              className={classes.uncollapseIcon}
              onClick={this.handleCollapsedClick}
            />
          )}
          <a href="#tasks" className={classes.editIconLink}>
            <EditIcon
              onClick={() => this.props.handleEditTaskClick(this.props.task)}
              className={classes.editIcon}
            ></EditIcon>
          </a>
          {/* {JSON.stringify(this.state.id)} */}
          {/* {JSON.stringify(this.props.task.id)} */}
          {/* <IconButton
          > */}
          {/* document.querySelector('tr #6') */}
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.handleDeleteTaskClick}
          ></DeleteIcon>
          {/* </IconButton> */}
        </TableRow>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(TasksTable));
