import React, {useState} from 'react'
import * as yup from 'yup';
import axios, { post } from "axios";
import ListRequests from './ListRequests';

export default function GetRequests() {
  const [resquests, setResquests] = useState([]);
  const [email, setEmail] = useState(" ");
  
  const issueSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
  });


  // on Form submit verify email, on valid call loadReports to fetch data
  const getRequestsList = async (e) =>{
    e.preventDefault();
    const data= {
      email : e.target.email.value
    }
    const isValid = await issueSchema.
    validate(data, {abortEarly: false})
    .then(()=>{
      setEmail(data.email);
      loadReports(data.email);
    })
    .catch((err)=>{
      return err;
    })

  }

  // fetch requests by email
  const loadReports = (email, order = "id") => {
    const baseUrl = "http://localhost:3001/requests/list/"+email;
    axios.post(baseUrl, {order: order})
      .then(res => {
          if (res.data.success) {
            const data = res.data.data;
            setResquests(data);
          } else {
              alert("Erro ao carregar dados");
          }
      })
      .catch(error => {
          alert(error)
      });
  }

  return (
    <div>
        <h1 className="heading-line">
            Resquests History
        </h1>
        <div id="searchEmailWrapper">
        
          <form onSubmit={getRequestsList}>
            <label htmlFor="email">Inform your e-mail</label>
            <input 
                type="email" 
                id="email" 
                name="email"  
            />
            <button type="submit">Search</button>
          </form>
          
          {resquests.length > 0 ? <select className="filterBy" id="education" placeholder="Education" defaultValue={""} onChange={e => loadReports(email, e.target.value)}>
            <option value="id" >Filter by</option>
            <option value="laptop">Laptop type</option>
            <option value="issue">Issue</option>
            <option value="date">Date</option>
          </select>:null}
          {resquests.length > 0 ? 
              <div className="requestcontianer">
                <div className="requestrow" id="requestfilters">
                
                  
                </div>
                <ListRequests requests={resquests}/> 
              </div>
              : null }
        </div>
    </div>
  )
}
