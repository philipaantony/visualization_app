import BottomRowCard from "../components/bottom-row-card";
import Footer from "../components/footer";
import Graph1 from "../components/graph1";
import GridCards from "../components/gridcards";
import GridCard2 from "../components/gridcards2";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";
import WelcomeCard from "../components/welcomecard";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from "../inner componets/piechart";
import Histogram from "../inner componets/year";
import Dashboard from "../inner componets/dashboard";

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getmydata/count');
        setData(response.data);
        setLoading(false); // Set loading to false when data is fetched
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <SideBar />
        <div className="layout-page">
        {loading ? ( // Display spinner while loading
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
          <h3 className="text-primary mb-4">Reading Data from MongoDB</h3>
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        
        ) : (
          <>
            <NavBar />
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-8 mb-4 order-0">
                    <WelcomeCard />
                  </div>
                  <GridCards totalCountries={data ? data.totalCountries : 0} totalDocs={data ? data.totalDocs : 0} />
                  <Graph1 />
                  <GridCard2 />
                </div>
                <Dashboard />
                <br></br>
                <div className="row">
                  <BottomRowCard />
                </div>
                <div className="row">
                  <div style={{ marginTop: "20px" }}>
                    <PieChart />
                  </div>
                  <br></br>
                  <Histogram />
                </div>
              </div>
              <Footer />
              <div className="content-backdrop fade" />
            </div>
         </>
        )}
         </div>
      </div>
      <div className="layout-overlay layout-menu-toggle" />
      <div className="buy-now">
        <a href="https://themeselection.com/products/sneat-bootstrap-html-admin-template/"
          target="_blank"
          className="btn btn-danger btn-buy-now">
          Upgrade to Pro
        </a>
      </div>
    </div>
  );
}

export default HomePage;
