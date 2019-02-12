import React, { Component } from 'react';
import { BarChart } from "react-charts-d3";
import axios from 'axios';

class BarChartEx extends Component {
     state = { data:[],
    hideshow:false}
    componentDidMount (){
    this.getGraphValues();
}
    getGraphValues =()=>{
        axios({
method:"POST",
url:"http://localhost:8080/BarGraphDemo"
        }).then(response =>{
            console.log(response.data)
            this.setState({data:response.data,hideshow:true})
        })

    }
    render() { 
       
     const dataresult=[this.state.data];
     console.log(dataresult);
        return ( <div>
           {this.state.hideshow ?
     <BarChart  data={dataresult}
    //  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
     width={500} height={500}  />
:null}

        </div>);
    }
}
 
export default BarChartEx;