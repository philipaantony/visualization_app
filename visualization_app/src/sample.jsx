import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Graph1 from './components/graph1';
import BarGraph from './inner componets/bargraph';
import PieChart from './inner componets/piechart';


function Sample() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getmydata');
        setData(response.data);
        console.log(response.data)
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []); 


  return (
    <div>
    <h1>Sample</h1>
    {loading ? (
    
      <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
    ) : (
    
      <ul>
       <PieChart/>
      </ul>
    )}
  </div>
  )
}

export default Sample