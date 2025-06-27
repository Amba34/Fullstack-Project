import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useFetch from "../../Hooks/useFetch.js";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
console.log("Fetched list:", list);
useEffect(() => {
  // Check if data is valid (array with at least one item)
  if (Array.isArray(data) && data.length > 0) {
    setList(data);
  } else {
    // Fallback dummy data
    const dummyData = [
      {
        _id: "1",
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        status: "active",
      },
      {
        _id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        age: 25,
        status: "pending",
      },
    ];
    setList(dummyData);
  }
}, [data]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* Link to the profile page with the user's ID */}
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.charAt(0).toUpperCase() + path.slice(1)}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
