import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Grid,
  // , Slide, Typography
} from '@material-ui/core';
// import MovieListItem from '../MovieListItem/MovieListItem';

class IdeasPage extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the SearchList from the API
    this.props.dispatch({ type: 'FETCH_IDEAS' });
  }
  render() {
    return (
      <div>
        {/* <Grid direction="row" justify="flex-start" alignItems="flex-start"> */}
        {/* mapping each item within the array and them calling them searchItem */}

        {/* we use the conditional render to see if results are displayed, if they aren't before
          the server is up we send a please wait message */}

        <section>
          <h2>To-Do List</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Notes</th>
                <th scope="col">Duration</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="viewTasks">
              {this.props.ideas === []
                ? 'please wait..'
                : this.props.ideas.map((ideas, index) => (
                    <tr className="tableRow" key={index}>
                      <p>{JSON.stringify(index)}</p>
                      <td>{ideas.name}</td>
                      <p>{JSON.stringify(ideas.name)}</p>
                      <td>{ideas.name}</td>
                      <td>{ideas.name}</td>
                      <td>{ideas.name}</td>
                      <td>{ideas.name}</td>
                      <td>{ideas.name}</td>
                      <td>{ideas.name}</td>
                      <td>{ideas.name}</td>
                      <td>{ideas.name}</td>
                      <td>
                        <button className="deleteButton">Delete</button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </section>
        {/* </Grid> */}
      </div>
    );
  }
}

// const mapStateToProps = (reduxState) => ({
//   reduxState,
// });
const mapStateToProps = (state) => ({
  ideas: state.ideas,
});

export default connect(mapStateToProps)(IdeasPage);

// BASIC MATERIAL UI TABLE

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

// import ImageUpload from '../ImageUpload/ImageUpload';
// import {
//   withStyles,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@material-ui/core';

// const styles = (theme) => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 700,
//   },
// });

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

// // const rows = [
// //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// //   createData('Eclair', 262, 16.0, 24, 6.0),
// //   createData('Cupcake', 305, 3.7, 67, 4.3),
// //   createData('Gingerbread', 356, 16.0, 49, 3.9),
// // ];

// const row = (x, i, header) => (
//     <TableRow key={row.id}>
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
// );

// function SimpleTable(props) {
//   const { classes } = props;

//   return (
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat (g)</TableCell>
//             <TableCell align="right">Carbs (g)</TableCell>
//             <TableCell align="right">Protein (g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (

//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }

// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleTable);

// const mapStateToProps = (reduxState) => ({
//   reduxState,
// });

// export default connect(mapStateToProps)(Ideas);

// EDIT DELETE CREATE SEARCH MATERIAL UI COMPLEX TABLE

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
