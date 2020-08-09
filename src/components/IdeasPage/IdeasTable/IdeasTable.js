import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withStyles, TableCell, TableRow, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const styles = (theme) => ({
  allContainer: {},
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableHeadCell: {
    'font-size': '16px',
    'font-family': 'Montserrat',
    'font-weight': '500',
    color: 'white',
    'padding-top': '18px',
    'padding-bottom': '18px',
    'padding-left': '18px',
    // 'text-transform': 'uppercase',
  },
  tableCell: {
    'font-family': 'Montserrat',
    'font-size': '13px',
    'text-transform': 'capitalize',
    'padding-left': '18px',
    'padding-top': '10px',
    'padding-bottom': '10px',
  },
  tableCellDescription: {
    'font-family': 'Montserrat',
    'font-size': '13px',
    'padding-left': '15px',
  },
  starIconForm: {
    'font-size': '40px',
    'padding-top': '10px',
    'padding-left': '0px',
    'padding-right': '0px',
    '&:hover': {
      color: 'gold',
    },
  },
  starIconTable: {
    'font-size': '20px',
    'padding-top': '20px',
    'padding-left': '0px',
    'padding-right': '15px',
    '&:hover': {
      color: 'gold',
    },
  },
  editIcon: {
    'font-size': '20px',
    'padding-top': '10px',
    'padding-bottom': '10px',
    'padding-left': '0px',
    'padding-right': '15px',
    '&:hover': {
      color: '#fba333',
    },
  },
  deleteIcon: {
    'font-size': '20px',
    'padding-top': '10px',
    'padding-bottom': '10px',
    'padding-left': '0px',
    'padding-right': '5px',
    '&:hover': {
      color: '#e53935',
    },
  },
  tableImage: {
    width: '40px',
    height: '40px',
  },
  deleteIconContainer: {
    margin: '5px',
    width: '5px',
    height: '5px',
    // KEEP PADDING OR ELSE BUTTON WON'T WORK
    padding: '5px',
    'padding-left': '4px',
    'padding-right': '4px',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
});

class IdeasTable extends Component {
  deleteIdeaClick = () => {
    console.log('delete was clicked!', this.props.idea.id);
    this.props.dispatch({ type: 'DELETE_THIS', payload: this.props.idea.id });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {/* Do not wrap table row within a Div */}
        <TableRow key={this.props.index}>
          <TableCell className={classes.tableCell}>
            {this.props.idea.name}
          </TableCell>
          <TableCell className={classes.tableCellDescription} align="left">
            {this.props.idea.description}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.idea.link}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            <img
              className={classes.tableImage}
              src={this.props.idea.image_url}
              alt={this.props.idea.name}
              // onClick={this.clickhandler}
            ></img>
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.idea.category}
            {/* {JSON.stringify(ideas.category_id)} */}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {JSON.stringify(this.props.idea.favorited)}

            {this.props.idea.favorited}
          </TableCell>
          <TableCell className={classes.tableCell} align="left">
            {this.props.idea.date.split('T')[0]}
          </TableCell>
          {/* Star is for favorite */}
          {/* Here we get an error saying the star or SVG icon cannot appear as a child of tr */}
          <StarIcon className={classes.starIconTable}></StarIcon>
          <EditIcon
            onClick={this.editIdeaClick}
            className={classes.editIcon}
          ></EditIcon>
          {/* {JSON.stringify(this.state.id)} */}
          {/* {JSON.stringify(this.props.idea.id)} */}
          {/* <IconButton
            // onMouseEnter={this.deleteIdeaHovered}
            onClick={this.deleteIdeaClick}
            className={classes.deleteIconContainer}
          > */}
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.deleteIdeaClick}
          ></DeleteIcon>
          {/* </IconButton> */}
          {/* <DeleteIcon
                    component={'Button'}
                    onClick={this.deleteIdeaClick}
                    value={idea.id}
                    className={classes.deleteIcon}
                ></DeleteIcon> */}
          {/* <p>{JSON.stringify(ideas.name)}</p> */}
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
