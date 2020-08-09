import { connect } from 'react-redux';
import React, { Component } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
import './IdeasPage.css';
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
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import IdeasTable from './IdeasTable/IdeasTable';
// classes.tableHead, table, anything is just talking about styles
const styles = (theme) => ({
  allContainer: {},
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
  },
  formControl: {
    'text-align': 'center',
    margin: '5px',
  },
  formControlContainer: {
    'text-align': 'center',
    width: 'auto',
    'margin-bottom': '120px',
    'margin-top': '20px',
  },
  menuItemsContainer: {
    flexWrap: 'wrap',
  },
  menuItem: {
    margin: (theme.spacing.unit * 1) / 4,
  },
  invisibleText: {
    color: 'white',
  },
  newOrAddIdeaButton: {
    color: 'white',
    'font-family': 'Montserrat',
    'background-color': '#161616',
    margin: '10px',
    'margin-top': '10px',
    '&:hover': {
      color: 'gold',
      'background-color': '#161616',
    },
  },
  uploadImageButton: {
    'padding-top': '0px',
    'padding-bottom': '0px',
    'background-color': '#161616',
    'margin-bottom': '50px',
    'margin-top': '10px',
    '&:hover': {
      'background-color': '#161616',
    },
  },
  dateField: {
    'margin-top': '0px',
  },
  categorySelector: { 'margin-top': '-10px' },
  tableHead: {
    'background-color': '#161616',
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

// MENU props handle the scrollable selector
const CategorySelector_HEIGHT = 48;
const CategorySelector_PADDING_TOP = 8;
const CategorySelectorProps = {
  PaperProps: {
    style: {
      maxHeight: CategorySelector_HEIGHT * 3.4 + CategorySelector_PADDING_TOP,
      width: 150,
    },
  },
};

// MENU props handle the scrollable table
const table_HEIGHT = 48;
const table_PADDING_TOP = 8;
const tableProps = {
  PaperProps: {
    style: {
      maxHeight: table_HEIGHT * 1.4 + table_PADDING_TOP,
      width: 150,
    },
  },
};

class IdeasPage extends Component {
  componentDidMount() {
    // componentDidMount dispatches an action to request the SearchList from the API
    this.props.dispatch({ type: 'FETCH_IDEAS' });
    this.props.dispatch({ type: 'FETCH_CATEGORIES' });
  }
  state = {
    description: '',
    image_url: '',
    category_id: '',
    link: '',
  };
  // initializing the date as today
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

  addIdeaClick = () => {
    console.log('in addIdea');

    const payload = {
      name: this.state.name,
      description: this.state.description,
      image_url: this.state.image_url,
      category_id: this.state.category_id,
      link: this.state.link,
      date: this.state.date,
    };
    this.props.dispatch({ type: 'ADD_IDEA', payload });
  };

  // deleteIdeaClick = () => {
  //   const payload = { id: this.state.id };
  //   console.log('delete was clicked!', payload.id);
  //   this.props.dispatch({ type: 'DELETE_THIS', payload: payload.id });
  // };

  deleteIdeaClick = (event) => {
    const payload = { id: event.target.value };
    console.log('delete was clicked!', event);
    this.props.dispatch({ type: 'DELETE_THIS', payload: payload.id });
  };

  editIdeaClick = (event) => {
    const payload = { id: event.target.value };
    console.log('delete was clicked!', event);
    this.props.dispatch({ type: 'DELETE_THIS', payload: payload.id });
  };

  // deleteIdeaHovered = (event) => {
  //   console.log('in deleteIdeaHovered, value:', event.target.value);

  //   // this.setState sets the state's name property = to the user's input
  //   this.setState({
  //     id: event.target.value,
  //   });
  // }; //end handleInputName

  handleInputName = (event) => {
    console.log('in handleInputName, value:', event.target.value);

    // this.setState sets the state's name property = to the user's input
    this.setState({
      name: event.target.value,
    });
  }; //end handleInputName

  handleInputDescription = (event) => {
    console.log('in handleInputDescription, value:', event.target.value);

    this.setState({
      description: event.target.value,
    });
  }; //end handleInputDescription

  handleInputImageUrl = (event) => {
    console.log('in handleInputImageUrl, value:', event.target.value);

    this.setState({
      image_url: event.target.value,
    });
  }; //end handleInputImageUrl

  handleInputCategory = (event) => {
    console.log('in handleInputCategory, value:', event.target.value);

    this.setState({
      category_id: event.target.value,
    });
  }; //end handleInputCategory

  handleInputLink = (event) => {
    console.log('in handleInputLink, value:', event.target.value);

    this.setState({
      link: event.target.value,
    });
  }; //end handleInputLink

  handleInputDate = (event) => {
    console.log('in handleInputDate, value:', event.target.value);

    this.setState({
      date: event.target.value,
    });
  }; //end handleInputDate

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.allContainer}>
        {/* THE FORM */}
        <div className={classes.formControlContainer}>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              className={classes.newOrAddIdeaButton}
              endIcon={<EmojiObjectsIcon>New</EmojiObjectsIcon>}
            >
              New
            </Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Name *</InputLabel>
            <Input value={this.state.name} onChange={this.handleInputName} />
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Description *</InputLabel>
            <Input
              value={this.state.description}
              onChange={this.handleInputDescription}
            />
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Link</InputLabel>
            <Input value={this.state.link} onChange={this.handleInputLink} />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Image Url</InputLabel>
            <Input
              value={this.state.image_url}
              onChange={this.handleInputImageUrl}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button variant="contained" className={classes.uploadImageButton}>
              <ImageUpload />
            </Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.categorySelector}>
              Category *
            </InputLabel>
            <Select
              MenuProps={CategorySelectorProps}
              value={this.state.category_id}
              onChange={this.handleInputCategory}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {this.props.categories.map((category, index) => (
                <MenuItem key={index} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
              {/* <MenuItem value={11}>New Category</MenuItem> */}
            </Select>
            <FormHelperText>
              Required
              <span className={classes.invisibleText}>
                invisible text is here
              </span>
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <StarIcon
              //     value={this.state.favorited}
              // onChange={this.handleInput}>
              className={classes.starIconForm}
            ></StarIcon>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="date"
              label="Date"
              type="date"
              // defaultValue sets the calendar to today's date via constructor function
              value={this.state.date}
              onChange={this.handleInputDate}
              defaultValue={this.state.date}
              className={classes.dateField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              onClick={this.addIdeaClick}
              className={classes.newOrAddIdeaButton}
              endIcon={<EmojiObjectsIcon>Add</EmojiObjectsIcon>}
            >
              Add
            </Button>
          </FormControl>
        </div>
        {/* THE TABLE */}
        <div className="tableContainer"></div>
        {this.props.ideas === [] ? (
          'please wait..'
        ) : (
          <Paper className={classes.root} elevation={3}>
            <Table className={classes.table} MenuProps={tableProps}>
              <TableHead className={classes.tableHead}>
                <TableRow className={classes.tableHead}>
                  <TableCell className={classes.tableHeadCell}>Name</TableCell>
                  <TableCell className={classes.tableHeadCell} align="left">
                    Description
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="left">
                    Link
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="left">
                    Image
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="left">
                    Category
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="left">
                    Favorited
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="left">
                    Date
                  </TableCell>
                  <TableCell className={classes.tableHeadCell} align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.ideas.map((idea, index) => (
                  <IdeasTable
                    idea={idea}
                    index={index}
                    editIdeaClick={this.editIdeaClick}
                  />
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ideas: state.ideas,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(IdeasPage));
