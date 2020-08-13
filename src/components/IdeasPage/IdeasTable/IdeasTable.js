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
import LinkIcon from '@material-ui/icons/Link';
import ImageIcon from '@material-ui/icons/Image';
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

class IdeasTable extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
      this.setState({
        editmode: false,
      });
    }
  }

  handleDeleteIdeaClick = () => {
    console.log('delete was clicked!', this.props.idea.id);
    this.props.dispatch({ type: 'DELETE_IDEA', payload: this.props.idea.id });
  };

  handleLinkClick = () => {
    console.log('this.props.idea.link', this.props.idea.link);
    let win = window.open(this.props.idea.link, '_blank');
    win.focus();
  };

  state = {
    editmode: false,
    viewmoremode: false,
  };

  handleEditIdeaClickOnTable = () => {
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
          id={this.props.idea.id}
          key={this.props.idea.id}
          className={`${
            this.state.viewmoremode
              ? classes.collapseTableRow
              : classes.tableRow
          }`}
        >
          <TableCell className={classes.tableCellLeft} align="left">
            {this.props.idea.date.split('T')[0]}
          </TableCell>
          <TableCell className={classes.tableCell}>
            {this.props.idea.name}
          </TableCell>
          <TableCell className={classes.tableCellDescription} align="left">
            {this.state.viewmoremode ? (
              this.props.idea.description
            ) : (
              <span>
                {this.props.idea.description.length > 40
                  ? this.props.idea.description.substring(0, 40) + '...'
                  : this.props.idea.description}
              </span>
            )}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.idea.category}
            {/* {JSON.stringify(ideas.category_id)} */}
          </TableCell>
          <TableCell className={classes.tableLink} align="left">
            {this.props.idea.link === '' ? (
              <span></span>
            ) : (
              <LinkIcon
                value={this.props.idea.link}
                onClick={this.handleLinkClick}
              />
            )}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.idea.image_url === '' ||
            this.props.idea.image_url === null ? (
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
                src={this.props.idea.image_url}
                // alt={this.props.idea.name}
              ></img>
            ) : (
              <span></span>
            )}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {/* {JSON.stringify(this.props.idea.favorited)} */}
            {this.props.idea.favorited ? (
              <StarIcon
                onClick={() =>
                  this.props.handleFavoritedIdeaClick(this.props.idea)
                }
                className={classes.starIconTable}
              ></StarIcon>
            ) : (
              <StarIcon
                onClick={() =>
                  this.props.handleFavoritedIdeaClick(this.props.idea)
                }
                className={classes.blackstarIconTable}
              ></StarIcon>
            )}
            {this.props.idea.favorited}
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
          <EditIcon
            onClick={() => {
              this.props.handleEditIdeaClick(this.props.idea);
              this.handleEditIdeaClickOnTable();
            }}
            className={classes.editIcon}
          ></EditIcon>
          {/* {JSON.stringify(this.state.id)} */}
          {/* {JSON.stringify(this.props.idea.id)} */}
          {/* <IconButton
          > */}
          {/* document.querySelector('tr #6') */}
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.handleDeleteIdeaClick}
          ></DeleteIcon>
          {/* </IconButton> */}
        </TableRow>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ideas: state.ideas,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(IdeasTable));
