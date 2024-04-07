// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainBar from './MainBar';

const Dashboard = () => {

  const [loading, setLoading] = useState(true); 


  const [selectedFilters, setSelectedFilters] = useState({
    endYear: '',
    topic: '',
    pestle: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: '',
  });

  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [uniqueEndYears, setUniqueEndYears] = useState([]);
  const [uniqueTopics, setUniqueTopics] = useState([]);
  const [uniqueSectors, setUniqueSectors] = useState([]);
  const [uniqueRegions, setUniqueRegions] = useState([]);
  const [uniquePestles, setUniquePestles] = useState([]);
  const [uniqueSources, setUniqueSources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getmydata');
        const data = response.data;
        console.log(data);
        setLoading(false);

        const endYears = Array.from(new Set(data.map(item => item.end_year)));
        const topics = Array.from(new Set(data.map(item => item.topic)));
        const sectors = Array.from(new Set(data.map(item => item.sector)));
        const regions = Array.from(new Set(data.map(item => item.region)));
        const pestles = Array.from(new Set(data.map(item => item.pestle)));
        const sources = Array.from(new Set(data.map(item => item.source)));

        setUniqueEndYears(endYears);
        setUniqueTopics(topics);
        setUniqueSectors(sectors);
        setUniqueRegions(regions);
        setUniquePestles(pestles);
        setUniqueSources(sources);

        if (typeof data === 'object' && !Array.isArray(data)) {
          setData(data);

          setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            ...data,
          }));
        } else {
          console.error('Invalid data format:', data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterName, value) => {
    // Correct the filter name for Pestle
    const correctedFilterName = filterName === 'pest' ? 'pestle' : filterName;

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [correctedFilterName]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/filterdata', {
        params: {
          end_year: selectedFilters.endYear,
          topic: selectedFilters.topic,
          sector: selectedFilters.sector,
          region: selectedFilters.region,
          pestle: selectedFilters.pestle,
          source: selectedFilters.source,
          // Include other filters as needed
        },
      });
      console.log(response.data);

      // Assuming data is an array, update the state with the filtered data
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  const handleClear = () => {
    // Reset all selected filters
    setSelectedFilters({
      endYear: '',
      topic: '',
      pestle: '',
      sector: '',
      region: '',
      pest: '',
      source: '',
      swot: '',
      country: '',
      city: '',
    });
  };
  

  return (
    <div className="container mt-4">


      <div className="row">

      {!loading ? 
      <div className="col-md-4 card" style={{ width: "350px" }}>
  <h3 style={{ padding: "25px" }}>Filters</h3>

 

  <div className="mb">
    <label className="form-label" style={{ width: "100%" }}>
      Sector:
      <select
        className="form-select"
        style={{ width: "100%" }}
        value={selectedFilters.sector}
        onChange={(e) => handleFilterChange('sector', e.target.value)}
      >
        <option value="">Select Sector</option>
        {uniqueSectors.map((sector, index) => (
          <option key={index} value={sector}>{sector}</option>
        ))}
      </select>
    </label>
  </div>

  <div className="mb">
    <label className="form-label" style={{ width: "100%" }}>
      Topic:
      <select
        className="form-select"
        style={{ width: "100%" }}
        value={selectedFilters.topic}
        onChange={(e) => handleFilterChange('topic', e.target.value)}
      >
        <option value="">Select Topic</option>
        {uniqueTopics.map((topic, index) => (
          <option key={index} value={topic}>{topic}</option>
        ))}
      </select>
    </label>
  </div>

  <div className="mb">
    <label className="form-label" style={{ width: "100%" }}>
      Region:
      <select
        className="form-select"
        style={{ width: "100%" }}
        value={selectedFilters.region}
        onChange={(e) => handleFilterChange('region', e.target.value)}
      >
        <option value="">Select Region</option>
        {uniqueRegions.map((region, index) => (
          <option key={index} value={region}>{region}</option>
        ))}
      </select>
    </label>
  </div>

  <div className="mb">
    <label className="form-label" style={{ width: "100%" }}>
      Pestle:
      <select
        className="form-select"
        style={{ width: "100%" }}
        value={selectedFilters.pestle}
        onChange={(e) => handleFilterChange('pestle', e.target.value)}
      >
        <option value="">Select Pestle</option>
        {uniquePestles.map((pestle, index) => (
          <option key={index} value={pestle}>{pestle}</option>
        ))}
      </select>
    </label>
  </div>
  <div className="mb">
    <label className="form-label" style={{ width: "100%" }}>
      End Year:
      <select
        className="form-select"
        style={{ width: "100%" }}
        value={selectedFilters.endYear}
        onChange={(e) => handleFilterChange('endYear', e.target.value)}
      >
        <option value="">Select End Year</option>
        {uniqueEndYears.map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>
    </label>
  </div>

  <div className="mb">
    <label className="form-label" style={{ width: "100%" }}>
      Source:
      <select
        className="form-select"
        style={{ width: "100%" }}
        value={selectedFilters.source}
        onChange={(e) => handleFilterChange('source', e.target.value)}
      >
        <option value="">Select Source</option>
        {uniqueSources.map((source, index) => (
          <option key={index} value={source}>{source}</option>
        ))}
      </select>
    </label>
  </div>

  <button className="btn btn-primary" onClick={handleSearch} style={{ width: "100%",marginBottom:"10px" }}>
    Search
  </button>
  <div className="mb-3">
  <button className="btn btn-danger" onClick={handleClear} style={{ width: "100%" ,}}>
    Clear
  </button>
</div>
</div>
:<>
<div className="col-md-4 card" style={{ width: "350px" }}>
  <h3 style={{ padding: "25px" }}>Filters</h3>

<div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="align-items-center">Loading the Fliter </span>
          </div>
          
          </div>
</>}





<div className="col-md-8">
  <div className="card">
    <h3 style={{ paddingTop: "30px" ,paddingLeft:"45px"}}>Chart with Avg Intensity, Avg Likelihood and  Avg Relevance</h3>
    <div className="card-body">
      <p>This chart displays relevant data based on your selected filters.</p>
      <MainBar
  relevance={filteredData?.relevance ?? 2}
  avgIntensity={filteredData?.avgIntensity ?? 8}
  avgLikelihood={filteredData?.avgLikelihood ?? 6}
/>
  </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
