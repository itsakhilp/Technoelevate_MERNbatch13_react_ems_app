import axios from 'axios'
import React, { Component } from 'react'

export default class Register extends Component {
    state ={
        user:"",
        phn:"",
        email:"",
        pwd:"",
        role:""
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        const acc= {...this.state}
        console.log(this.state );
        const url=`https://ems-app-2aa00-default-rtdb.firebaseio.com/accounts.json`
        axios.post(url,acc).then((resp)=>{
            if(resp.status===200){
                this.props.history.push('/show')
                this.setState({
                    user:"",
                    phn:"",
                    email:"",
                    pwd:"",
                    role:""     

                })
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
           <>
               
                <div className="container mt-5" >
            <h4>Register Page</h4>
             
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="Username">Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="Name"
                name="user"
                value={this.state.user} 
                onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">PhoneNumber</label>
                <input 
                type="text" 
                className="form-control" 
                id="phn"
                name="phn"
                value={this.state.phn} 
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email"
                value={this.state.email} 
                onChange={this.handleChange}
                />
               </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="password"
                name="pwd"
                value={this.state.pwd} 
                onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Designation</label>
                <input 
                type="text" 
                className="form-control" 
                id="designation"
                name="role"
                value={this.state.role} 
                onChange={this.handleChange}/>
            </div>
           
            {/* <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <button type="submit" className="btn btn-success" >Submit</button>
            </form>
            </div>

          </>  
        )
    }
}
