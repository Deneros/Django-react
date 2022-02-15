import React, { useEffect, useState } from "react";
import * as CompanyServer from "./CompanyServer";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  const listCompanies = () => {
    try {
      const res = CompanyServer.listCompanies();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    listCompanies();
  },[]);

  return (
    <div>
      {companies.map((company) => (
        <h2>{company.name}</h2>
      ))}
    </div>
  );
};

export default CompanyList;
