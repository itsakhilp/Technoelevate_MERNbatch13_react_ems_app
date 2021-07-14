import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';


export default class Accounts extends Component {
    state = {
        accounts : [],
        show:false,
        user:"",
        phn:"",
        email:"",
        pwd:"",
        role:"",
        id:"id"
    }

    componentDidMount(){
        console.log("");
        axios.get('https://ems-app-2aa00-default-rtdb.firebaseio.com/accounts.json').then((resp)=>{
           let fetchedAccounts= [];

           for (const key in resp.data) {
               fetchedAccounts.push({
                   id:key,
                   ...resp.data[key]
               })
              }
              
              console.log(fetchedAccounts);
              this.setState({
                  accounts:fetchedAccounts
              })
              
            }).catch((err)=>{
                  console.log(err);
              }
            )
           
    }

    handleDelete=(account)=>{
        axios.delete(`https://ems-app-2aa00-default-rtdb.firebaseio.com/accounts/${account.id}.json`).then((resp)=>{
            console.log("deleted");

            const updateAccounts =this.state.accounts.filter((acc)=>{
                return acc.id !== account.id ? acc : null;
            });

            this.setState({
                accounts:updateAccounts,
            })


    }).catch((err)=>{
        console.log(err);
    })
        };

    
   handleClose=()=>{
       this.setState({
           show:false
       })
   }

   handleChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
   }

   updateRecord=(acc)=>{
       const {user, email , phn , role , pwd , id}=acc;
       this.setState({
           show:true,
        user:user,
        phn:phn,
        email:email,
        pwd:pwd,
        role:role,
        id:id
    });

};

updateAccount =()=>{
    const url=`https://ems-app-2aa00-default-rtdb.firebaseio.com/accounts/${this.state.id}.json`
    const {user, email, pwd, phn, role}=this.state
    const account={
        user,
        pwd,
        email,
        phn,
        role
    };

    axios.put(url,account).then((resp)=>{
        console.log(resp.status);

       const updated= this.state.accounts.map((acc)=>{
            return acc.id!==this.state.id ? acc : account
        })
        this.setState({
            accounts:updated,
            show:false,
            user:"",
            phn:"",
            email:"",
            pwd:"",
            role:"",
            id:"id"
        })
    }).catch((err)=>{
        console.log(err);
    })

}


    render() {
        return (
            <div>
                <h5>Accounts</h5>
                 <table class="table table-striped table-success">
                    <thead>
                    <tr>
                    <th scope="col">Sl.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phonenumber</th>
                    <th scope="col">Designation</th>
                    </tr>
                    </thead>
                <tbody>
                    {
                        this.state.accounts.map((data,index)=>{
                        return(
                            <tr>
                                 <td>{index+1}</td>
                                 <td>{data.user}</td>
                                 <td>{data.email}</td>
                                 <td>{data.phn}</td>
                                 <td>{data.role}</td>  
                                 <Button className="btn btn-danger" onClick={()=>{
                                     this.handleDelete(data)
                                 }}> Delete</Button>

                                <Button className="btn  btn-dark " onClick={()=>{
                                    console.log("update");
                                    this.updateRecord(data)
                                    
                                }}> Update</Button>
                                </tr>

                        )

                        }
                        )
                    }                   
                </tbody>
                </table>

                     <Modal
                         show={this.state.show}
                         animation={false}
                         onHide={this.handleClose}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Update the Record</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
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
                            
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                            <Button variant="success" onClick={this.updateAccount}>Save changes</Button>
                        </Modal.Footer>
                        </Modal>         
            </div>
        )
 }}