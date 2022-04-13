import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const url = "https://mean-crud-backend-umar.herokuapp.com/";
  const getUsers = async () => {
    const response = await fetch(url).then((res) => res.json());
    setUsers(response?.msg);
    //const data = await response.json();
    //console.log(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    console.log(id);
    const res2 = await fetch(`${url}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteData = await res2.json();
    console.log(deleteData);
    if (res2.status === 500) {
      alert("Error Occured!");
    } else {
      alert("Data has been deleted!");
      getUsers();
      console.log(deleteData);
    }
  };
  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          {/* <button className="btn btn-primary">
            <a href="/register">.</a>
            Add data
          </button> */}
          <NavLink className="btn btn-primary" to="/register">
            Add Data
          </NavLink>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Countries and Capitals</h4>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Capital</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {users.map((currEle) => {
                  return (
                    <tr>
                      <td>{currEle._id}</td>
                      <td>{currEle.name}</td>
                      <td>{currEle.capital}</td>
                      <td className="d-flex justify-content-between">
                        {/* <NavLink>
                          <button className="btn btn-danger">Delete</button>
                        </NavLink>
                        <NavLink to={`edit/${currEle._id}`}>
                          <button className="btn btn-primary">Update</button>
                        </NavLink> */}
                        <button
                          onClick={() => deleteUser(currEle._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>

                        <NavLink to={`edit/${currEle._id}`}>
                          <button className="btn btn-primary">Update</button>
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
