import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./demostylesheet.css";
import axios from "axios";
class Demo1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unique_id: "",
      user_mobileno: "",
      user_email: "",
      user_name: ""
    };
  }

  getAllUserDetails = () => {
    axios({
      method: "POST",
      url: "http://localhost:8080/getAllUser"
    })
      .then(response => {
       
        var allresult = [];

        response.data.map((value, index) => {
         
          var datapush = {};
          datapush = (
            <div className="row row-margin-bottom">
              <div
                className="col-md-5 no-padding lib-item"
                data-category="view"
              >
                <div className="lib-panel">
                  <div className="row box-shadow">
                    <div
                      className="col-md-5 no-padding lib-item"
                      data-category="ui"
                    >
                      <div className="lib-panel">
                        <div className="row box-shadow">
                          <div className="col-md-6">
                            <img
                              className="lib-img"
                              src="http://lorempixel.com/850/850/?random=123"
                            />
                          </div>
                          <div className="col-md-6">
                            <div className="row lib-header">
                              {value.unique_id}
                              <div className="lib-header-seperator" />
                            </div>
                            <div className="row ">{value.user_name}</div>
                            <div className="row ">{value.user_email}</div>
                            <div className="row ">{value.user_mobileno}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <button
                          type="submit"
                          className="btn btn-warning"
                          style={{ marginLeft: "124px" }}
                          onClick={() =>
                            this.editUserDetails(
                              value.unique_id,
                              value.user_name,
                              value.user_email,
                              value.user_mobileno
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ marginTop: "-66px", marginLeft: "198px" }}
                          onClick={()=>this.deleteUserDetails(value.unique_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          allresult.push(datapush);
        });
        this.setState({ allresponse: allresult });
      })
      .catch(response => {
        console.log(response, "Error");
      });
  };

  editUserDetails = (unique_id, user_name, user_email, user_mobileno) => {
    //alert("Hello"+unique_id);
    this.setState({
      unique_id: unique_id,
      user_name: user_name,
      user_email: user_email,
      user_mobileno: user_mobileno
    });
  };
  update_details = (e) => {
   e.preventDefault();
    const form = e.target;
    const form_values = new FormData(form);
    axios({
      method: "POST",
      url: "http://localhost:8080/editUserDetails",
      data: form_values
    }).then(response => {
      alert(response);
      this.setState({
        ...this.state,
        unique_id: "",
        user_mobileno: "",
        user_email: "",
        user_name: ""
      })
        this.getAllUserDetails();
    })
   .catch(response => {
      console.log("response is " + response);
    });
  };

  deleteUserDetails = (unique_id) => {
//e.preventDefault();
axios({
  method:"POST",
  url:"http://localhost:8080/deleteUserDetails",
  data:"unique_id="+unique_id,
})
.then(response=>{
  if(response.data === true){
    alert("Deleted successfully");
  }
  else{
    alert("sorry could not deletd try again ");
  }
  this.getAllUserDetails();
})
.catch(response=>{
  console.log("Delete Error"+response);
})
  };


  onChange = e =>
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });

  componentWillMount() {
    this.getAllUserDetails();
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <h4>This is My Project</h4>
          </div>
          <div className="row">
            <h6>Welcome to my Project</h6>
          </div>
          <hr />
          {this.state.allresponse}
        </div>
        <hr />
        <h3>Update Details</h3>
        <form  onSubmit={this.update_details}>
          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              Unique ID
            </label>
            <div className="col-md-6">
              <input
                type="text"
                id="unique_id"
                className="form-control"
                name="unique_id"
                value={this.state.unique_id}
                onChange={this.onChange}
                placeholder="Unique ID"
                readOnly
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              E-Mail Address
            </label>
            <div className="col-md-6">
              <input
                type="text"
                id="user_email"
                className="form-control"
                name="user_email"
                onChange={this.onChange}
                value={this.state.user_email}
                placeholder="E-mail ID"
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              User Name
            </label>
            <div className="col-md-6">
              <input
                type="text"
                id="user_name"
                className="form-control"
                name="user_name"
                placeholder="User Name"
                onChange={this.onChange}
                value={this.state.user_name}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-md-4 col-form-label text-md-right">
              Mobile Number
            </label>
            <div className="col-md-6">
              <input
                type="text"
                id="user_mobileno"
                name="user_mobileno"
                className="form-control"
                placeholder="Mobile Number"
                onChange={this.onChange}
                value={this.state.user_mobileno}
              />
            </div>
          </div>
          <div className="col-md-6 offset-md-4">
            <input type="submit" className="btn btn-primary" value="Update" />
          </div>
        </form>
      </div>
    );
  }
}

export default Demo1;
