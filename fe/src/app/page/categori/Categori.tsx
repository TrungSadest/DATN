import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'primereact/button';
import { CategoriModel } from '../../model/CategoriModel';
import Cookies from 'universal-cookie';
import { AuthConstant } from '../../constant/authConstant';
import { AuthService } from '../../service/AuthService';

export default function Categoris() {
   const navigate = useNavigate();
   const [categori, setCategori] = useState<CategoriModel[]>([]);
   // phân trang 
   const [currentPage, setCurrentPage] = useState(0);
   const cookie = new Cookies();
   useEffect(() => {
      AuthService.getInstance()
      .getListCategori()
      .then((res) => {
      console.log(res);
      setCategori(res.data.responseData); 
     })
     .catch((e) => {
      console.log(e);
    });
   // getAllCategoris(currentPage)
   }, []);

   // const getAllCategoris = async (page: number) => {    
   //    try {
   //       const response = await axios.get(`http://localhost:8080/categori/get-all`, {
   //          headers: {
   //             Authorization: `Bearer ${cookie.get(AuthConstant.ACCESS_TOKEN)}`
   //          }
   //       });
   //       setCategori(response.data.responseData); 
   //       setCurrentPage(page); 
   //    } catch (error) {
   //       console.error('There was an error fetching the categories!', error);
   //    }
   // }
   return (
      <>
         <div>
            <h2>Categori</h2>
            <nav aria-label="breadcrumb">
               <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="#" className="text-inherit">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Categori</li>
               </ol>
            </nav>
         </div>
         <div className="card">
            <DataTable value={categori} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
               <Column field="categoryId" header="ID" style={{ width: '25%' }} ></Column>
               <Column field="categoryName" header="Name" style={{ width: '25%' }} ></Column>
               <Column header="Action" body={(rowData) => (
                  <>
                     <Button className="p-button-success" >update</Button>
                     <Button className="p-button-danger" >delete</Button>
                  </>
               )} style={{ width: '25%' }}></Column>
            </DataTable>
         </div>
      </>
   )
}