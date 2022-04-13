import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
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

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, capital } = inpval;
    const url = "https://mean-crud-backend-umar.herokuapp.com";
    const res = await fetch(`${url}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        capital,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 500 || !data) {
      alert("Fill the data!");
    } else {
      alert("Data has been added!");
      navigate("/");
      console.log(data);
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
            value={inpval.country}
            className="form-control"
            placeholder="Enter your capital."
          />
        </div>

        <input
          //style="margin-top: 1rem"
          type="submit"
          value="Submit"
          className="btn btn-success"
          onClick={addinpdata}
        />
      </form>
    </div>
  );
};

export default Register;
