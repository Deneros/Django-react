import React from "react";
import * as CompanyServer from './CompanyServer';
import { useNavigate  } from "react-router-dom";

const CompanyItem=({company, listCompanies})=>{
    const navigate = useNavigate();
    //console.log(props.company)
    // console.log(company)
    const handleDelete= async(companyId)=>{
        // console.log(companyId);
        await CompanyServer.deleteCompany(companyId);
        listCompanies();
    }

    return(
        <div  className="col-md-4 mb-4">
            <div className="card card-body">
                <h3 className="card-tittle">{company.name} <button onClick={()=>{return navigate(`/updateCompany/${company.id}`);}} className="btn btn-info btn-sm">Update</button></h3>
                <p className="card-text">Founded: <strong>{company.foundation}</strong></p>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Go to website</a>
                <button onClick={()=>company.id && handleDelete(company.id)} className="btn btn-danger my-2">Delete</button>
            </div>
        </div>
    );
};
export default CompanyItem;