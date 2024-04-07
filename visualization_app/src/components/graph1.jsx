import React, { useState } from "react";
import BarGraph from "../inner componets/bargraph";

function Graph1() {
  const [intensity, setIntensity] = useState('minIntensity');

  const getTitle = () => {
    return intensity === 'minIntensity' ? 'Min Intensity' : 'Max Intensity';
  };

  const handleIntensityChange = (newIntensity) => {
    setIntensity(newIntensity);
  };

  return (
    <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2">
      <div className="card mb-4">
        <div className="row row-bordered g-0">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <h5 className="card-header m-0 me-2 pb-2">
                  Intensity By Pestle by {getTitle()}
                </h5>
              </div>
              <div className="col-md-6">
                {/* Dropdown Button */}
                <button
                      className="dropdown-item"
                      onClick={() => handleIntensityChange('minIntensity')}
                    >
                      Min Intensity
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleIntensityChange('maxIntensity')}
                    >
                      Max Intensity
                    </button>
              
              </div>
            </div>
            {/* Conditional rendering based on intensity state */}
            {intensity === 'minIntensity' ? <BarGraph Intensity='minIntensity' /> : 
            
            <div className="card">
                  <BarGraph Intensity='maxIntensity' /></div>
      }
          </div>


          
          <div className="col-md-4">
            <div className="card-body">
              <div className="text-center">
                {/* Rest of your code */}
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '30vh' }}>
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

            <div className="text-center fw-semibold pt-3 mb-2">
              62% Company Growth
            </div>
            <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
              <div className="d-flex">
                <div className="me-2">
                  <span className="badge bg-label-primary p-2">
                    <i className="bx bx-dollar text-primary" />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <small>2022</small>
                  <h6 className="mb-0">$32.5k</h6>
                </div>
              </div>
              <div className="d-flex">
                <div className="me-2">
                  <span className="badge bg-label-info p-2">
                    <i className="bx bx-wallet text-info" />
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <small>2021</small>
                  <h6 className="mb-0">$41.2k</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph1;
