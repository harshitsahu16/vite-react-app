import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 1000 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Post List</h1>
      <div style={{ width: '100%', flexGrow: 1 }}>
        <DataGrid pageSizeOptions={[10, 20, 30, 50 ,75 , 100]}
            initialState={{
                pagination: {
                   paginationModel: { pageSize: 10, page: 0 }}}} 
            rows={data} columns={columns} autoHeight  />
      </div>
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
