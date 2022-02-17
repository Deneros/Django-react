import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as CompanyServer from "./CompanyServer";

const CompanyForm = () => {
  const initialState = { id: 0, name: "", foundation: 1950, website: "" };
  const navigate = useNavigate();
  const params = useParams();

  const [company, setCompany] = useState(initialState);

  const handleInputChange = (e) => {
    // console.log(e.target.id)
    // console.log(e.target.value)
    setCompany({ ...company, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if(!params.id){
        res = await CompanyServer.registerCompany(company);
        const data = await res.json();
        // console.log(data);

        if (data.message === "Succes") {
            setCompany(initialState);
            navigate("/");
        }
      }else{
          await CompanyServer.updateCompany(params.id,company);
          navigate("/");
        }
      
    } catch (error) {
      console.log(error);
    }
  };

  const getCompany = async(companyId)=>{
    try {
        const res = await CompanyServer.getCompany(companyId);
        const data = await res.json();
        // console.log(data)
        const {name, foundation, website}= data.companies;
        setCompany({name,foundation,website})
        
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    if(params.id){
        getCompany(params.id)
    }
    
  },[])

  return (
    <div className="container">
      <h1 className="text-center">Add Company</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={company.name}
            onChange={handleInputChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="website" className="form-label">
            Website
          </label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={company.website}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label for="foundation" className="form-label">
            Foundation
          </label>
          <input
            type="text"
            className="form-control"
            id="foundation"
            name="foundation"
            value={company.foundation}
            onChange={handleInputChange}
          />
        </div>
            {
                params.id ? (
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                ):(
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                )
            }
      </form>
    </div>
  );
};

export default CompanyForm;
