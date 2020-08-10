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
  // IconButton,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import IdeasTable from './IdeasTable/IdeasTable';

// Material UI styles
const styles = (theme) => ({
  allContainer: {},
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
    minWidth: 700,
    maxHeight: 350,
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
  starIconForm: {
    'font-size': '40px',
    'padding-top': '10px',
    'padding-left': '0px',
    'padding-right': '0px',
    '&:hover': {
      color: 'gold',
    },
  },
  table: {
    'margin-top': '0px',
  },
  tableHeadCell: {
    'font-size': '16px',
    'font-family': 'Montserrat',
    'font-weight': '500',
    color: 'white',
    'padding-top': '18px',
    'padding-bottom': '18px',
    'padding-left': '18px',
    'background-color': '#161616',
    position: 'sticky',
    top: 0,
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

class IdeasPage extends Component {
  componentDidMount() {
    // componentDidMount dispatches an action to request the SearchList from the API
    this.props.dispatch({ type: 'FETCH_IDEAS' });
    this.props.dispatch({ type: 'FETCH_CATEGORIES' });
    this.props.dispatch({ type: 'FETCH_FAVORITE' });
  }
  state = {
    name: '',
    description: '',
    image_url: '',
    category_id: '',
    category: '',
    link: '',
    date: '',
    favorited: false,
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

  editIdeaClick = (idea) => {
    this.setState({
      id: idea.id,
      name: idea.name,
      description: idea.description,
      image_url: idea.image_url,
      category: idea.category,
      category_id: idea.category_id,
      link: idea.link,
      date: idea.date,
      editmode: true,
      user_id: idea.user_id,
    });
    console.log('edit was clicked!', idea);
  };

  addIdeaClick = () => {
    const payload = {
      name: this.state.name,
      description: this.state.description,
      image_url: this.state.image_url,
      category_id: this.state.category_id,
      link: this.state.link,
      date: this.state.date,
    };
    console.log('in addIdea with payload:', payload);
    this.props.dispatch({ type: 'ADD_IDEA', payload: payload });
  };

  saveChangesClicked = () => {
    console.log('in saveChangesClicked');
    const payload = {
      name: this.state.name,
      description: this.state.description,
      image_url: this.state.image_url,
      category_id: this.state.category_id,
      link: this.state.link,
      date: this.state.date,
      id: this.state.id,
    };
    console.log('payload', payload);
    this.props.dispatch({
      type: 'UPDATE_IDEA',
      payload: payload,
    });
    this.setState({
      editmode: false,
    });
  };

  favoritedIdeaClick = () => {
    console.log('in favoritedIdeaClick');

    this.setState({
      favorited: !this.state.favorited,
    });
    const payload = {
      favorited: this.state.favorited,
    };
    this.props.dispatch({
      type: 'CHANGE_FAVORITE_STATUS_IDEA',
      payload: payload,
    });
    console.log('this.state.favorited', this.state.favorited);
  };

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
              // defaultValue={this.state.category}
            >
              {/* <MenuItem value={this.state}>
                <em>Select Below</em>
              </MenuItem>
              <MenuItem value={this.state.category_id}>
                {this.state.category}
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
              value={this.state.favorited}
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
            {/* if this.state.editmode is true ? */}
            {this.state.editmode ? (
              <Button
                // id={submitButton}
                variant="contained"
                onClick={this.saveChangesClicked}
                className={classes.newOrAddIdeaButton}
                endIcon={<EmojiObjectsIcon>Save</EmojiObjectsIcon>}
              >
                Save
              </Button>
            ) : (
              <Button
                // id={submitButton}
                variant="contained"
                onClick={this.addIdeaClick}
                className={classes.newOrAddIdeaButton}
                endIcon={<EmojiObjectsIcon>Add</EmojiObjectsIcon>}
              >
                Add
              </Button>
            )}
          </FormControl>
        </div>
        {/* THE TABLE */}
        <div className="tableContainer"></div>
        {this.props.ideas === [] ? (
          'please wait..'
        ) : (
          <Paper className={classes.root} elevation={3}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
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
                    key={index}
                    editIdeaClick={this.editIdeaClick}
                    favoritedIdeaClick={this.favoritedIdeaClick}
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
