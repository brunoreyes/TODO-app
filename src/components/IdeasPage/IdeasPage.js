import MaterialTable from 'material-table';
import { forwardRef } from 'react';
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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import Icon from '@material-ui/core/Icon';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

// BASIC CONVERTED MATERIAL UI TABLE
// classes.tableHead, table, anything is just talking about styles
// that are manipulated here
const styles = (theme) => ({
  allContainer: {},
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto',
    'border-radius': '10px',
  },
  tableHead: {
    'background-color': '#161616',
  },
  table: {
    minWidth: 700,
  },
  tableHeadCell: {
    'font-size': '15px',
    'font-family': 'Montserrat',
    'font-weight': '500',
    color: 'white',
    'padding-top': '18px',
    'padding-bottom': '18px',
    'padding-left': '18px',
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
    'padding-top': '20px',
    'padding-left': '0px',
    'padding-right': '15px',
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
  },
  deleteIcon: {
    'font-size': '20px',
    'padding-top': '10px',
    'padding-bottom': '10px',
    'padding-left': '0px',
    'padding-right': '15px',
  },
  formControl: { margin: '10px', 'text-align': 'center' },
  formControlContainer: {
    'text-align': 'center',
    display: 'inline-block',
    width: 'auto',
    'margin-bottom': '100px',
  },
  menuItemsContainer: {
    flexWrap: 'wrap',
  },
  menuItem: {
    margin: theme.spacing.unit / 4,
  },
  invisibleText: {
    color: 'white',
  },
  newOrAddIdeaButton: {
    color: 'white',
    'font-family': 'Montserrat',
    'background-color': '#161616',
    margin: '10px',
    '&:hover': {
      color: 'gold',
      'background-color': '#161616',
    },
  },
  uploadImageButton: {
    'padding-top': '0px',
    'padding-bottom': '0px',
    'background-color': '#161616',
    '&:hover': {
      'background-color': '#161616',
    },
  },
});

// MENU props handle the scrollable selector
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.4 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

class IdeasPage extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({ type: 'FETCH_IDEAS' });
  }
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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.allContainer}>
        {/* THE FORM */}
        <div className={classes.formControlContainer}>
          <Button
            variant="contained"
            // color="white"
            className={classes.newOrAddIdeaButton}
            endIcon={<EmojiObjectsIcon>New</EmojiObjectsIcon>}
          >
            New
          </Button>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-helper">Name *</InputLabel>
            <Input
              id="component-helper"
              // value={this.state.name}
              // onChange={this.handleChange}
              aria-describedby="component-helper-text"
            />
            <FormHelperText id="component-helper-text">Required</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-helper">Description *</InputLabel>
            <Input
              id="component-helper"
              //   value={this.state.name}
              //   onChange={this.handleChange}
              aria-describedby="component-helper-text"
            />
            <FormHelperText id="component-helper-text">Required</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-helper">Link</InputLabel>
            <Input
              id="component-helper"
              // value={this.state.name}
              // onChange={this.handleChange}
              aria-describedby="component-helper-text"
            />
            <FormHelperText id="component-helper-text"></FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-helper">Image Url</InputLabel>
            <Input
              id="component-helper"
              // value={this.state.name}
              // onChange={this.handleChange}
              aria-describedby="component-helper-text"
            />
            <FormHelperText id="component-helper-text"></FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            // color="white"
            className={classes.uploadImageButton}
          >
            <ImageUpload />
          </Button>
          <FormControl className={classes.formControl}>
            <InputLabel>Category *</InputLabel>
            <Select
              MenuProps={MenuProps}
              // value={this.state.age}
              // onChange={this.handleChange}
              //   input={<Input name="age" id="age-helper" />}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={1}>Relationship</MenuItem>
              <MenuItem value={2}>Work</MenuItem>
              <MenuItem value={3}>Personal Work</MenuItem>
              <MenuItem value={4}>Fitness</MenuItem>
              <MenuItem value={5}>Music</MenuItem>
              <MenuItem value={6}>Art</MenuItem>
              <MenuItem value={7}>School</MenuItem>
              <MenuItem value={8}>Finance</MenuItem>
              <MenuItem value={9}>Health</MenuItem>
              <MenuItem value={10}>Art</MenuItem>
              <MenuItem value={11}>New Category</MenuItem>
            </Select>
            <FormHelperText>
              Required
              <span className={classes.invisibleText}>
                invisible text is here
              </span>
            </FormHelperText>
          </FormControl>
          <StarIcon className={classes.starIconForm}></StarIcon>
          <TextField
            id="date"
            label="Date"
            type="date"
            // defaultValue={this.state.date} sets the calendar to today's date via
            // the constructor function above
            defaultValue={this.state.date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            // color="white"
            className={classes.newOrAddIdeaButton}
            endIcon={<EmojiObjectsIcon>Add</EmojiObjectsIcon>}
          >
            Add
          </Button>
        </div>
        {/* THE TABLE */}
        <div className="tableContainer"></div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.ideas === []
                ? 'please wait..'
                : this.props.ideas.map((ideas, index) => (
                    <TableRow key={index}>
                      <TableCell className={classes.tableCell}>
                        {ideas.name}
                      </TableCell>
                      <TableCell
                        className={classes.tableCellDescription}
                        align="left"
                      >
                        {ideas.description}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {ideas.link}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        <img
                          src={ideas.image_url}
                          // onClick={this.clickhandler}
                        ></img>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {ideas.category}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {JSON.stringify(ideas.favorited)}
                        {ideas.favorited}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left">
                        {ideas.date.split('T')[0]}
                      </TableCell>
                      {/* Star is for favorite */}
                      <StarIcon className={classes.starIconTable}></StarIcon>
                      <EditIcon className={classes.editIcon}></EditIcon>
                      <DeleteIcon className={classes.deleteIcon}></DeleteIcon>
                      {/* <p>{JSON.stringify(index)}</p>
                      <p>{JSON.stringify(ideas.name)}</p> */}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ideas: state.ideas,
});

export default withStyles(styles)(connect(mapStateToProps)(IdeasPage));

//Code from my html table used in SQL todo list
//   <div>

//         <section>
//           <h2>To-Do List</h2>
//           <table class="table">
//             <thead>
//               <tr>
//                 <th scope="col">Task</th>
//                 <th scope="col">Notes</th>
//                 <th scope="col">Duration</th>
//                 <th scope="col">Status</th>
//                 <th scope="col"></th>
//               </tr>
//             </thead>
//             <tbody id="viewTasks">
//               {this.props.ideas === []
//                 ? 'please wait..'
//                 : this.props.ideas.map((ideas, index) => (
//                     <tr className="tableRow" key={index}>
//                       {/* <p>{JSON.stringify(index)}</p> */}
//                       <td>{ideas.name}</td>
//                       {/* <p>{JSON.stringify(ideas.name)}</p> */}
//                       <td>{ideas.name}</td>
//                       <td>{ideas.name}</td>
//                       <td>{ideas.name}</td>
//                       <td>{ideas.name}</td>
//                       <td>{ideas.name}</td>
//                       <td>{ideas.name}</td>
//                       <td>{ideas.name}</td>
//                       <td>{ideas.name}</td>
//                       <td>
//                         <button className="deleteButton">Delete</button>
//                       </td>
//                     </tr>
//                   ))}
//             </tbody>
//           </table>
//         </section>
//         {/* </Grid> */}
//       </div>
//     );
//   }

// EDIT DELETE CREATE SEARCH MATERIAL UI COMPLEX TABLE
// import {
//   AddBox,
//   ArrowDownward,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Clear,
//   DeleteOutline,
//   Edit,
//   FilterList,
//   FirstPage,
//   LastPage,
//   Remove,
//   SaveAlt,
//   Search,
//   ViewColumn,
//   Grade,
// } from '@material-ui/icons/';

// const can be utilized outside of class
// const tableIcons = {
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Grade: forwardRef((props, ref) => <Grade {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => (
//     <ChevronRight {...props} ref={ref} />
//   )),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => (
//     <ChevronLeft {...props} ref={ref} />
//   )),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
// };

// class Ideas extends Component {
//   state = {
//     columns: [
//       { title: 'Name', field: 'name' },
//       { title: 'Description', field: 'description' },
//       { title: 'Image Url', field: 'Image Url' },
//       { title: 'Link', field: 'Link' },
//       {
//         title: 'Category',
//         field: 'category',
//         lookup: {
//           1: 'Work',
//           2: 'Personal',
//           3: 'Health',
//           4: 'Food',
//           5: 'Relationship',
//           6: 'Music',
//           7: 'Vacation',
//         },
//       },
//       { title: 'Favorite', field: 'favorited', type: 'boolean' },
//       { title: 'Date', field: 'date', type: 'date' },
//     ],
//     data: [
//       { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
//       {
//         name: 'Zerya Betül',
//         surname: 'Baran',
//         birthYear: 2017,
//         birthCity: 34,
//       },
//     ],
//   };
//   componentDidMount() {
//     // use component did mount to dispatch an action to request the SearchList from the API
//     this.props.dispatch({ type: 'FETCH_IDEAS' });
//   }
//   render() {
//     return (
//       // Recall for a return the same thing has to be on the bottom
//       <span className="table">
//         <p>{JSON.stringify(this.props.reduxState.ideas)}</p>
//         <MaterialTable
//           icons={tableIcons}
//           title="Ideas"
//           columns={this.state.columns}
//           data={this.state.data}
//           // editable could have functionality
//           editable={{
//             onRowAdd: (newData) =>
//               //   Promise is the same as .then, .catch
//               new Promise((resolve) => {
//                 setTimeout(() => {
//                   resolve();
//                   const data = [...this.state.data];
//                   data.push(newData);
//                   this.setState({ ...this.state, data });
//                 }, 600);
//               }),
//             onRowUpdate: (newData, oldData) =>
//               new Promise((resolve) => {
//                 setTimeout(() => {
//                   resolve();
//                   const data = [...this.state.data];
//                   data[data.indexOf(oldData)] = newData;
//                   this.setState({ ...this.state, data });
//                 }, 600);
//               }),
//             onRowDelete: (oldData) =>
//               new Promise((resolve) => {
//                 setTimeout(() => {
//                   resolve();
//                   const data = [...this.state.data];
//                   data.splice(data.indexOf(oldData), 1);
//                   this.setState({ ...this.state, data });
//                 }, 600);
//               }),
//           }}
//         />
//         <ImageUpload />
//       </span>
//     );
//   }
// }

// const mapStateToProps = (reduxState) => ({
//   reduxState,
// });

// export default connect(mapStateToProps)(Ideas);
// // export default Ideas;
