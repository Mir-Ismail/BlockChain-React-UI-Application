import React from "react";
import "./employeeinfo.css"; // Ensure that your CSS file is updated accordingly

const EmploymentInfo = ({ data, handleChange }) => {
  return (
    <div className="employment-info">
      <h4 className="section-title">Employment Information</h4>

      {/* Employment Status */}
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Employment Status</label>
          <select
            className="form-select"
            name="employment_status"
            value={data.employment_status}
            onChange={handleChange}
            required
          >
            <option value="">Select Employment Status...</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Self-Employed">Self-Employed</option>
          </select>
        </div>
      </div>

      {/* Fields for Employed */}
      {data.employment_status === "Employed" && (
        <>
          <h5 className="section-subtitle">Employed Details</h5>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Government Department</label>
              <input
                type="text"
                className="form-control"
                name="government_department"
                value={data.government_department}
                onChange={handleChange}
                placeholder="Enter Government Department"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Government Designation</label>
              <input
                type="text"
                className="form-control"
                name="government_designation"
                value={data.government_designation}
                onChange={handleChange}
                placeholder="Enter Government Designation"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="company_name"
                value={data.company_name}
                onChange={handleChange}
                placeholder="Enter Company Name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className="form-control"
                name="job_title"
                value={data.job_title}
                onChange={handleChange}
                placeholder="Enter Job Title"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Salary</label>
              <input
                type="number"
                className="form-control"
                name="salary"
                value={data.salary}
                onChange={handleChange}
                placeholder="Enter Salary"
              />
            </div>
          </div>
        </>
      )}

      {/* Fields for Self-Employed */}
      {data.employment_status === "Self-Employed" && (
        <>
          <h5 className="section-subtitle">Self-Employed Details</h5>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Business Name</label>
              <input
                type="text"
                className="form-control"
                name="business_name"
                value={data.business_name}
                onChange={handleChange}
                placeholder="Enter Business Name"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business Type</label>
              <input
                type="text"
                className="form-control"
                name="business_type"
                value={data.business_type}
                onChange={handleChange}
                placeholder="Enter Business Type"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Annual Income</label>
              <input
                type="number"
                className="form-control"
                name="annual_income"
                value={data.annual_income}
                onChange={handleChange}
                placeholder="Enter Annual Income"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business Registration Number</label>
              <input
                type="text"
                className="form-control"
                name="business_registration_number"
                value={data.business_registration_number}
                onChange={handleChange}
                placeholder="Enter Registration Number"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business Address</label>
              <input
                type="text"
                className="form-control"
                name="business_address"
                value={data.business_address}
                onChange={handleChange}
                placeholder="Enter Business Address"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmploymentInfo;
