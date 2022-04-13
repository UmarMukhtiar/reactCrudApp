import { Alert } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const Edit = () => {
  //const [user, setUserData] = useState([]);
  const url = "https://mean-crud-backend-umar.herokuapp.com";
  const navigate = useNavigate("");
  const [inpval, setINP] = useState({
    _id: "",
    name: "",
    capital: "",
  });

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getData = async () => {
    const response = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(response?.msg);
    setINP(response?.msg);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    const { _id, name, capital } = inpval;
    const res2 = await fetch(`${url}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        name,
        capital,
      }),
    });

    const data2 = await res2.json();
    if (res2.status === 500 || !data2) {
      alert("Fill the data!");
    } else {
      alert("Data has been updated!");
      navigate("/");
      console.log(data2);
    }
  };

  return (
    <div className="container">
      <form className="mt-4">
        <div className="form-group">
          <label //style="margin-top: 1rem"
            className="form-label"
          >
            ID
          </label>
          <input
            name="id"
            disabled
            type="text"
            id="id"
            value={inpval._id}
            className="form-control"
            placeholder="Id will be generated automatically..."
          />
        </div>

        <div className="form-group">
          <label //style="margin-top: 1rem"
            className="form-label"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={setData}
            value={inpval.name}
            className="form-control"
            placeholder="Enter you name."
          />
        </div>

        <div className="form-group">
          <label //style="margin-top: 1rem"
            className="form-label"
          >
            Capital
          </label>
          <input
            type="text"
            id="capital"
            name="capital"
            onChange={setData}
            value={inpval.capital}
            className="form-control"
            placeholder="Enter your capital."
          />
        </div>

        <input
          //style="margin-top: 1rem"
          type="submit"
          value="Submit"
          className="btn btn-success"
          onClick={updateUser}
        />
      </form>
    </div>
  );
};

export default Edit;
