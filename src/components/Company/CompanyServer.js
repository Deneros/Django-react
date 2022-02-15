const API_URL= "http://127.0.0.1:8000/api/companies/";

export const listCompanies= async ()=>{
    return await fetch(API_URL);
};