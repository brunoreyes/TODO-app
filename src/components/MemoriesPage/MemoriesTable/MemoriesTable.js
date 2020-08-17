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
import StarIcon from '@material-ui/icons/Star';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import BubbleChartIcon from '@material-ui/icons/BubbleChart';
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const styles = (theme) => ({
  allContainer: {},
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {},
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
    width: '800px',
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
  tableImage: {
    // border: '#ffffff solid 2px',
    width: '300px',
    // 'box-shadow': 'inset 0px 0px 0px 0px #FFFFFF',
    backgroundColor: 'white',
  },
});

class MemoriesTable extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
      this.setState({
        editmode: false,
      });
    }
  }

  handleDeleteMemoryClick = () => {
    console.log('delete was clicked!', this.props.memory.id);
    this.props.dispatch({
      type: 'DELETE_MEMORY',
      payload: this.props.memory.id,
    });
  };

  state = {
    editmode: false,
    viewmoremode: false,
  };

  handleEditMemoryClickOnTable = () => {
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

  render() {
    const { classes } = this.props;
    return (
      <>
        {/*-- Do not wrap table row within a Div --*/}
        <TableRow
          id={this.props.memory.id}
          key={this.props.memory.id}
          className={`${
            this.state.viewmoremode
              ? classes.collapseTableRow
              : classes.tableRow
          }`}
        >
          <TableCell className={classes.tableCellLeft} align="left">
            {this.props.memory.date.split('T')[0]}
          </TableCell>
          <TableCell className={classes.tableCell}>
            {this.props.memory.name}
          </TableCell>
          <TableCell className={classes.tableCellDescription} align="left">
            {this.state.viewmoremode ? (
              this.props.memory.description
            ) : (
              <span>
                {this.props.memory.description.length > 100
                  ? this.props.memory.description.substring(0, 100) + '...'
                  : this.props.memory.description}
              </span>
            )}
          </TableCell>
          {/* <TableCell className={classes.tableCell} align="left">
            {this.props.memory.category}
            {/* {JSON.stringify(memories.category_id)} */}
          {/* </TableCell> */}
          {/* <TableCell className={classes.tableLink} align="left">
            {this.props.memory.link === '' ? (
              <span></span>
            ) : (
              <LinkIcon
                value={this.props.memory.link}
                onClick={this.handleLinkClick}
              />
            )}
          </TableCell> */}
          {/* <TableCell className={classes.tableCell} align="left">
            {this.props.memory.image_url === '' ||
            this.props.memory.image_url === null ? (
              <span></span>
            ) : (
              <ImageIcon
                className={`${
                  this.state.viewmoremode
                    ? classes.invisibleIcon
                    : classes.realIcon
                }`}
              />
            )} */}
          {/* {this.state.viewmoremode ? (
              <img
                className={classes.tableImage}
                src={this.props.memory.image_url}
                // alt={this.props.memory.name}
              ></img>
            ) : (
              <span></span>
            )}
          </TableCell> */}
          <TableCell className={classes.tableCell} align="left">
            {/* {JSON.stringify(this.props.memory.favorited)} */}
            {this.props.memory.favorited ? (
              <StarIcon
                onClick={() =>
                  this.props.handleFavoritedMemoryClick(this.props.memory)
                }
                className={classes.starIconTable}
              ></StarIcon>
            ) : (
              <StarIcon
                onClick={() =>
                  this.props.handleFavoritedMemoryClick(this.props.memory)
                }
                className={classes.blackstarIconTable}
              ></StarIcon>
            )}
            {this.props.memory.favorited}
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
          <a href="#memories" className={classes.editIconLink}>
            <EditIcon
              onClick={() => {
                this.props.handleEditMemoryClick(this.props.memory);
                this.handleEditMemoryClickOnTable();
              }}
              className={classes.editIcon}
            ></EditIcon>
          </a>
          {/* {JSON.stringify(this.state.id)} */}
          {/* {JSON.stringify(this.props.memory.id)} */}
          {/* <IconButton
          > */}
          {/* document.querySelector('tr #6') */}
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.handleDeleteMemoryClick}
          ></DeleteIcon>
          {/* </IconButton> */}
        </TableRow>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  memories: state.memories,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(MemoriesTable));
