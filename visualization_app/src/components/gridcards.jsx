import React from "react";
import Graph1 from "./graph1";

function GridCards(props) {
  
  return (
    <>
      <div className="col-lg-4 col-md-4 order-1">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/chart-success.png"
                      alt="chart success"
                      className="rounded"
                    />
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="cardOpt3"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-dots-vertical-rounded" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="cardOpt3"
                    >
                      <a className="dropdown-item" href="javascript:void(0);">
                        View More
                      </a>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <span className="fw-semibold d-block mb-1">Total Documents</span>
                <h3 className="card-title mb-2">{props?.totalDocs || 'N/A'}</h3>


                <small className="text-success fw-semibold">
                  <i className="bx bx-up-arrow-alt" /> json data
                </small>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title d-flex align-items-start justify-content-between">
                  <div className="avatar flex-shrink-0">
                    <img
                      src="../assets/img/icons/unicons/wallet-info.png"
                      alt="Credit Card"
                      className="rounded"
                    />
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="cardOpt6"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-dots-vertical-rounded" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="cardOpt6"
                    >
                      <a className="dropdown-item" href="javascript:void(0);">
                        View More
                      </a>
                      <a className="dropdown-item" href="javascript:void(0);">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <span>Total Countries</span>
                <h3 className="card-title mb-2">{props?.totalCountries || 'N/A'}</h3>
                <small className="text-success fw-semibold">
                  <i className="bx bx-up-arrow-alt" /> in json
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GridCards;
