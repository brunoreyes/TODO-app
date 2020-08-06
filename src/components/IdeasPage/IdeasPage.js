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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';

// BASIC CONVERTED MATERIAL UI TABLE
// classes.tableHead, table, anything is just talking about styles
// that are manipulated here
const styles = (theme) => ({
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
    // 'font-weight': 'bold',
    color: 'white',
    'padding-top': '13px',
    'padding-bottom': '13px',
    'padding-left': '20px',
  },
  tableCell: {
    'font-family': 'Montserrat',
    'font-size': '13px',
    'text-transform': 'capitalize',
    'padding-left': '20px',
    'padding-top': '10px',
    'padding-bottom': '10px',
  },
  tableCellDescription: {
    'font-family': 'Montserrat',
    'font-size': '13px',
    'padding-left': '20px',
  },
  materialIcon: {
    'font-size': '20px',
    'padding-top': '10px',
    'padding-bottom': '10px',
    'padding-left': '0px',
    'padding-right': '20px',
  },
});

class IdeasPage extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({ type: 'FETCH_IDEAS' });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* THE FORM */}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            // value={this.state.name}
            // onChange={this.handleChange}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">
            Some important helper text
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            // value={this.state.name}
            // onChange={this.handleChange}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">
            Some important helper text
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            // value={this.state.name}
            // onChange={this.handleChange}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">
            Some important helper text
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            // value={this.state.name}
            // onChange={this.handleChange}
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">
            Some important helper text
          </FormHelperText>
        </FormControl>

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
                      <StarIcon className={classes.materialIcon}></StarIcon>
                      <EditIcon className={classes.materialIcon}></EditIcon>
                      <DeleteIcon className={classes.materialIcon}></DeleteIcon>
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
