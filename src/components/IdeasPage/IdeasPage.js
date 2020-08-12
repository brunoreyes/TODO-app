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
import LinkIcon from '@material-ui/icons/Link';
import ImageIcon from '@material-ui/icons/Image';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Fade from 'react-reveal/Fade';

// Material UI styles
const styles = (theme) => ({
  allContainer: {},
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
    minWidth: 700,
    // maxHeight: 350,
    'margin-bottom': '120px',
  },
  formControl: {
    'text-align': 'center',
    margin: '10px',
    'padding-top': '20px',
  },
  formControlContainer: {
    'text-align': 'center',
    width: 'auto',
    'margin-bottom': '20px',
    'margin-top': '20px',
  },
  newViewContainer: {
    'text-align': 'center',
    margin: 'auto',
    display: 'flex',
    'justify-content': 'center',
  },
  newContainer: {
    width: 'auto',
    'margin-bottom': '0px',
    'margin-top': '100px',
    display: 'inline-block',
    marginRight: '10px',
    margin: 'auto',
  },
  viewContainer: {
    margin: 'auto',
    width: 'auto',
    marginLeft: '10px',
    'margin-bottom': '0px',
    'margin-top': '100px',
    display: 'inline-block',
    // position: 'fixed',
    // bottom: 3,
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
    margin: '0px',
    padding: '8px',
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
    'margin-top': '15px',
  },
  categorySelector: { 'margin-top': '0px' },
  linkInputField: { 'margin-top': '-5px' },
  starIconForm: {
    'font-size': '40px',
    padding: '10px 0px 0px 0px',
    color: 'gold',
    '&:hover': {
      color: '#161616',
    },
  },
  blackstarIconForm: {
    'font-size': '40px',
    padding: '10px 0px 0px 0px',
    'padding-top': '10px',
    'padding-left': '0px',
    'padding-right': '0px',
    '&:hover': {
      color: 'gold',
    },
  },
  tableContainer: {
    'margin-top': '340px',
    position: 'sticky',
    bottom: 0,
  },
  table: {
    'margin-top': '0px',
  },

  tableHeadCell: {
    'font-size': '16px',
    'font-family': 'Montserrat',
    'font-weight': '500',
    color: 'white',
    padding: '18px 9% 18px -10%',
    'background-color': '#161616',
    // position: 'sticky',
    // top: 0,
    // 'text-transform': 'uppercase',
  },
  tableHeadCellLeft: {
    'font-size': '16px',
    'font-family': 'Montserrat',
    'font-weight': '500',
    color: 'white',
    padding: '18px 30% 18px 1%',
    'background-color': '#161616',
    // position: 'sticky',
    // top: 0,
    // 'text-transform': 'uppercase',
  },
  tableHeadCellRight: {
    'font-size': '16px',
    'font-family': 'Montserrat',
    'font-weight': '500',
    color: 'white',
    // 'margin-left': '40px',
    padding: '18px 30% 18px 3%',
    'background-color': '#161616',
    // position: 'sticky',
    // top: 0,
    // 'text-transform': 'uppercase',
  },
  tableCell: {
    'font-family': 'Montserrat',
    'font-size': '13px',
    'text-transform': 'capitalize',
    padding: '18px -1% 18px -10%',
  },
  errorMessage: {
    color: 'white',
  },
});

// PaperProps handle the scrollable selector
const CategorySelector_HEIGHT = 40;
const CategorySelector_PADDING_TOP = 6;
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
    editmode: false,
    inputmode: false,
    readyToSendMode: true,
    viewmode: false,
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

  newClicked = () => {
    console.log('new was clicked!', this.state.editmode);
    this.setState({
      inputmode: !this.state.inputmode,
    });
  };

  viewClicked = () => {
    console.log('view was clicked!', this.state.editmode);
    this.setState({
      viewmode: !this.state.viewmode,
    });
  };

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
      editmode: !idea.editmode,
      user_id: idea.user_id,
      favorited: idea.favorited,
    });
    console.log('edit was clicked!', idea);
  };

  addIdeaClick = () => {
    if (
      this.state.name === '' ||
      this.state.description === '' ||
      this.state.category === ''
    ) {
      alert('Please Fill All Required * Feilds');
    } else {
      const payload = {
        name: this.state.name,
        description: this.state.description,
        image_url: this.state.image_url,
        category_id: this.state.category_id,
        link: this.state.link,
        date: this.state.date,
        favorited: this.state.favorited,
      };
      console.log('in addIdea with payload:', payload);
      this.props.dispatch({ type: 'ADD_IDEA', payload: payload });

      this.setState({
        name: '',
        description: '',
        image_url: '',
        category_id: '',
        category: '',
        link: '',
        date: '',
        favorited: false,
      });
    }
  };

  saveChangesClicked = () => {
    if (
      this.state.name === '' ||
      this.state.description === '' ||
      this.state.category === ''
    ) {
      alert('Please Fill All Required * Fields');
    } else {
      console.log('in saveChangesClicked');
      const payload = {
        name: this.state.name,
        description: this.state.description,
        image_url: this.state.image_url,
        category_id: this.state.category_id,
        link: this.state.link,
        date: this.state.date,
        favorited: this.state.favorited,
        id: this.state.id,
      };
      console.log('payload', payload);
      this.props.dispatch({
        type: 'UPDATE_IDEA',
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
        favorited: false,
      });

      this.props.dispatch({ type: 'FETCH_IDEAS' });
    }
  };

  favoritedIdeaClick = (idea) => {
    console.log('in favoritedIdeaClick');
    const payload = {
      favorited: !idea.favorited,
      id: idea.id,
    };
    this.setState({
      favorited: !idea.favorited,
      id: idea.id,
    });
    this.props.dispatch({
      type: 'CHANGE_FAVORITE_STATUS_IDEA',
      payload: payload,
    });
    console.log('this.state.favorited', this.state.favorited);
  };

  handleFavoriteIdeaFormClick = (event) => {
    console.log(
      'in handleFavoriteIdeaFormClick, old value:',
      this.state.favorited
    );
    this.setState({
      favorited: !this.state.favorited,
    });
  };

  handleInputName = (event) => {
    console.log('in handleInputName, value:', event.target.value);
    // this.setState sets the state's name property = to the user's input
    this.setState({
      name: event.target.value,
    });
  };

  handleInputDescription = (event) => {
    console.log('in handleInputDescription, value:', event.target.value);
    this.setState({
      description: event.target.value,
    });
  };

  handleFinishedUpload = (info) => {
    console.log('info:', info);
    console.log('File uploaded with filename:', info.filename);
    console.log('Access it on s3 at:', info.fileUrl);
    this.setState({
      image_url: info.fileUrl,
    });
  };

  handleInputCategory = (event) => {
    console.log('in handleInputCategory, value:', event.target.value);
    this.setState({
      category_id: event.target.value,
    });
  };

  handleInputLink = (event) => {
    console.log('in handleInputLink, value:', event.target.value);
    this.setState({
      link: event.target.value,
    });
  };

  handleInputDate = (event) => {
    console.log('in handleInputDate, value:', event.target.value);
    this.setState({
      date: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.allContainer}>
        <span className={classes.newViewContainer}>
          {/* THE FORM */}
          <div className={classes.newContainer}>
            <Button
              variant="contained"
              className={classes.newOrAddIdeaButton}
              endIcon={<EmojiObjectsIcon>New</EmojiObjectsIcon>}
              onClick={this.newClicked}
            >
              New
            </Button>
          </div>
          <div className={classes.viewContainer}>
            <Button
              variant="contained"
              className={classes.newOrAddIdeaButton}
              endIcon={<EmojiObjectsIcon>View</EmojiObjectsIcon>}
              onClick={this.viewClicked}
            >
              View
            </Button>
          </div>
        </span>
        {this.state.inputmode || this.state.editmode ? (
          <Fade>
            <div className={classes.formControlContainer}>
              <FormControl className={classes.formControl}>
                <InputLabel>Name</InputLabel>
                <Input
                  value={this.state.name}
                  onChange={this.handleInputName}
                />
                <FormHelperText>Required *</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Description</InputLabel>
                <Input
                  multiline
                  rowsMax={10}
                  value={this.state.description}
                  onChange={this.handleInputDescription}
                />
                <FormHelperText>Required *</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.categorySelector}>
                  Category
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
                  Required *
                  <span className={classes.invisibleText}>
                    invisible text is here
                  </span>
                </FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.linkInputField}>
                  {' '}
                  <LinkIcon />
                </InputLabel>
                <Input
                  value={this.state.link}
                  onChange={this.handleInputLink}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                {/* <InputLabel>Image Url</InputLabel>
            <Input
              value={this.state.image_url}
              onChange={this.handleInputImageUrl}
            /> */}
              </FormControl>
              <FormControl className={classes.formControl}>
                <Button
                  variant="contained"
                  className={classes.uploadImageButton}
                >
                  <ImageUpload
                    handleFinishedUpload={this.handleFinishedUpload}
                  />
                </Button>
              </FormControl>
              {this.state.favorited ? (
                <FormControl className={classes.formControl}>
                  <StarIcon
                    onClick={this.handleFavoriteIdeaFormClick}
                    value={this.state.favorited}
                    className={classes.starIconForm}
                  ></StarIcon>
                </FormControl>
              ) : (
                <FormControl className={classes.formControl}>
                  <StarIcon
                    onClick={this.handleFavoriteIdeaFormClick}
                    value={this.state.favorited}
                    className={classes.blackstarIconForm}
                  ></StarIcon>
                </FormControl>
              )}
              {/* <FormControl className={classes.formControl}>
            <InputLabel className={classes.dateLabel}>Date</InputLabel>
            <TextField
              id="date"
              // label="Date"
              type="date"
              value={this.state.date}
              onChange={this.handleInputDate}
              defaultValue={this.state.date}
              className={classes.dateField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl> */}
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
          </Fade>
        ) : (
          <span></span>
        )}
        {/* THE TABLE */}

        {this.state.viewmode ? (
          <Fade bottom>
            <div className={classes.tableContainer}>
              {this.props.ideas === [] ? (
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
                          Description
                        </TableCell>
                        <TableCell
                          className={classes.tableHeadCell}
                          align="left"
                        >
                          Category
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
                      {this.props.ideas.map((idea, index) => (
                        <IdeasTable
                          idea={idea}
                          key={idea.id}
                          editIdeaClick={this.editIdeaClick}
                          favoritedIdeaClick={this.favoritedIdeaClick}
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
  ideas: state.ideas,
  categories: state.categories,
});

export default withStyles(styles)(connect(mapStateToProps)(IdeasPage));
