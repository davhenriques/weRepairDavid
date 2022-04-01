import {React, useState} from "react";
import Select from "react-select"
import { issueSchema } from "../Validations/IssueValidation";
import axios, { post } from "axios";

const SendRepair = () =>{
    const [laptop, setLaptop] = useState({ value: "", label:"Select a model"});
    const [issue, setIssue] = useState({ value: "", label:"Specify the issue"});
    const [errors, setErrors] = useState([]);

    const sendIssue = async (e) => {
        e.preventDefault()
        const data ={
          name     : e.target.name.value,
          email    : e.target.email.value,
          date    : e.target.date.value,
          laptop   : laptop.value,
          issue    : issue.value,
          notes    : e.target.notes.value,
          serialN  : e.target.serialN.value,
          picture  : e.target.picture.files[0],
        }
        
        const isValid = await issueSchema.
          validate(data, {abortEarly: false})
          .then(()=>{
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("laptop", data.laptop);
            formData.append("issue", data.issue);
            formData.append("date", data.date);
            formData.append("notes", data.notes);
            formData.append("serialN", data.serialN);
            formData.append("picture", data.picture);
            const baseUrl = "http://localhost:3001/requests/create";
            const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
            }
            return  post(baseUrl, formData,config)
          })
          .catch((err)=>{
            let errs =[];
            err.inner.forEach(e => {
              errs.push(e.message);
             });
            setErrors(errs);
            return err;
          })

    }

    const sendPost = async (data) =>{
      const baseUrl = "http://localhost:3001/requests/create";
      try {
        const response = await axios({
          method: "post",
          url: baseUrl,
          data: {data: data},
          headers: { "Content-Type": "multipart/form-data" },
        });

      } catch(error) {
        console.log(error)
      }
    } 
    // custom styles for both laptop and issue select
    const customStyles = {
        option: (base, state) => ({
            ...base,
            background: "white",
            color:"black",
            "&:target": {
                background: "black"
            },
            "&:hover": {
                background: "#ebf4f299"
            }
        }),
        control: (base, state) => ({
          ...base,
          background: "#ebf4f2",
          borderColor: "transparent",
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
          }
        })
      };
      // options for laptop select
      const optionsLaptop = [
        {
          label: "Lenovo P50",
          value: "Lenovo P50"
        },{
          label: "Lenovo P50s",
          value: "Lenovo P50s"
        },{
          label: "Lenovo P51",
          value: "Lenovo P51"
        },{
          label: "Lenovo P51s",
          value: "Lenovo P51s"
        },{
          label: "Lenovo P52",
          value: "Lenovo P52"
        },{
          label: "Lenovo P52s",
          value: "Lenovo P52s"
        }
      ];
      // options for issuel select
      const optionsIssue = [
        {
          label: "Broken screen",
          value: "Broken screen"
        },
        {
          label: "Broken keyboard",
          value: "Broken keyboard"
        },
        {
          label: "Physical damage -other",
          value: "Physical damage -other"
        },
        {
          label: "Laptop crashing",
          value: "Laptop crashing"
        },
        {
          label: "Software missing",
          value: "Software missing"
        },
        {
          label: "Other",
          value: "Other"
        }
      ];
    const showErros = errors.map((data, index)=>{
      return(
        <p className="errormessage" key={index}>{data}</p>
        )
    });

    return(
        <div id="background">
            <div className="formWrapper">
                <h2 className="title">Tell us about you laptop</h2>
                <form onSubmit={sendIssue}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name"  />
                        <br />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email"  />
                        <br />
                        <label htmlFor="laptop">Laptop model</label>
                        <Select 
                            
                            styles={customStyles} 
                            options={optionsLaptop} 
                            value={laptop} 
                            onChange={(val)=>setLaptop(val)}
                        />
                        <br />
                        <label htmlFor="issue">Isseu</label>
                        <Select 
                            styles={customStyles} 
                            options={optionsIssue} 
                            value={issue} 
                            onChange={(val)=>setIssue(val)}
                        />
                        <br />
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" name="date" />
                        <br />
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" name="notes" autoComplete="off" rows="4"></textarea>
                        <br />
                        <label htmlFor="serialN">Serial Number</label>
                        <input type="text" id="serialN" name="serialN" autoComplete="off" />
                        <br />
                        <label htmlFor="picture">Picture</label>
                        <input 
                            type="file" 
                            id="picture" 
                            name="picture"  
                        />
                        <br />
                        <div className="Errors">

                        {errors.length >0 ? showErros: null}
                        </div>
                        <button type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default SendRepair;