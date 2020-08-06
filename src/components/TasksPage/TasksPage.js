import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import React, { Component } from 'react';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons/';
// const can be utilized outside of class
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class Tasks extends Component {
  state = {
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  };

  render() {
    return (
      <MaterialTable
        icons={tableIcons}
        title="Tasks"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.push(newData);
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data[data.indexOf(oldData)] = newData;
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.splice(data.indexOf(oldData), 1);
                this.setState({ ...this.state, data });
              }, 600);
            }),
        }}
      />
    );
  }
}
export default Tasks;
// CONVERTING HOOKS TABLE INTO CLASS
// to convert the hooks table to component:
// we converted the use state into this.and we changes everything into this.state.
// imported and npm installed material-table as well as imported component

// import React from 'react';
// import MaterialTable from 'material-table';

// export default function MaterialTableDemo() {
//   const [state, setState] = React.useState({
//     columns: [
//       { title: 'Name', field: 'name' },
//       { title: 'Surname', field: 'surname' },
//       { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//       {
//         title: 'Birth Place',
//         field: 'birthCity',
//         lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//       },
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
//   });

//   return (
//     <MaterialTable
//       title="Editable Example"
//       columns={state.columns}
//       data={state.data}
//       editable={{
//         onRowAdd: newData =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               const data = [...state.data];
//               data.push(newData);
//               setState({ ...state, data });
//             }, 600);
//           }),
//         onRowUpdate: (newData, oldData) =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               const data = [...state.data];
//               data[data.indexOf(oldData)] = newData;
//               setState({ ...state, data });
//             }, 600);
//           }),
//         onRowDelete: oldData =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               const data = [...state.data];
//               data.splice(data.indexOf(oldData), 1);
//               setState({ ...state, data });
//             }, 600);
//           }),
//       }}
//     />
//   );
// }

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Button } from '@material-ui/core';
// import Fade from 'react-reveal/Fade';

// class TasksPage extends Component {
//   state = {
//     id: this.props.match.params.id,
//   };

//   componentDidMount() {
//     //   use component did mount to dispatch an action to request the SearchList from the API
//     // this.props.dispatch({
//     //   type: 'FETCH_DETAIL',
//     //   payload: this.props.match.params.id,
//     //   //
//     // });
//     // this.props.dispatch({ type: 'FETCH_MOVIES' });
//   }
//   componentDidMount() {
//     // //     //   use component did mount to dispatch an action to request the SearchList from the API
//     // //     this.props.dispatch({
//     // //       type: 'FETCH_DETAIL',
//     // //       payload: this.props.match.params.id,
//     // //       //
//     // //     });
//     // this.props.dispatch({ type: 'FETCH_EDITS' });
//   }
//   editClicked = () => {
//     this.props.history.push(`/Edit/${this.state.id}`);
//     // changed this :this.props.history.push('/Detail/${id}') to whats on top to specify the actual id
//   };
//   backClicked = () => {
//     this.props.history.push(`/`);
//     // changed this :this.props.history.push('/Detail/${id}') to whats on top to specify the actual id
//   };

//   render() {
//     return (
//       <Fade left>
//         <div>
//           {/* Examples of conditional rendering: */}
//           {/* {this.props.reduxState.details.title !== '' ? 'error' : 'okay'} */}
//           {/* {this.props.reduxState.details.title !== undefined ? 'error' : 'okay'} */}

//           {/* We used the above two steps to test if details was coming back from the server with something */}
//           {/* <pre>{JSON.stringify(this.props.match.params.id)}</pre> */}
//           {/* <pre>{JSON.stringify(this.props.reduxState.details)}</pre> */}

//           {/* <button onClick={} */}
//           {/* {this.props.reduxState.details.map((movieDetails, arraySpot) => ( */}
//           {/* {this.props.reduxState.details.title !== undefined ? (
//             'error'
//           ) : ( */}
//           <tr>
//             <td>
//               <img src={this.props.reduxState.details.poster}></img>
//               <h4>{this.props.reduxState.details.title}</h4>
//               {/* <p>{this.props.reduxState.details.array_agg}</p> */}

//               {/* {this.props.reduxState.details.array_agg.map((genre, index) => (
//                 <pre key={index}>{genre}</pre>
//               ))} */}
//               <p>{this.props.reduxState.details.array_agg} </p>

//               <p>{this.props.reduxState.details.description}</p>

//               <Button
//                 className="Button"
//                 variant="contained"
//                 onClick={this.backClicked}
//               >
//                 BACK
//               </Button>
//               <span className="ButtonContainer">
//                 <Button
//                   className="Button"
//                   variant="contained"
//                   onClick={this.editClicked}
//                 >
//                   Edit
//                 </Button>
//               </span>
//             </td>
//           </tr>
//           {/* )} */}
//           {/* <button onClick={this.handleEdit}>Edit Information</button> */}
//           {/* </span> */}
//         </div>
//       </Fade>
//     );
//   }
// }

// const putReduxStateOnProps = (reduxState) => ({
//   reduxState,
// });

// export default connect(putReduxStateOnProps)(TasksPage);
