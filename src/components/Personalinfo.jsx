import React from "react";
import "./personalInfo.css";

const PersonalInfo = ({ data, handleChange, handleFileChange, errors }) => {
  return (
    <div className="personal-info">
      <h4 className="section-title">Personal Information</h4>
      <div className="row">
        <div className="col-md-4">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
            name="first_name"
            value={data.first_name}
            onChange={handleChange}
          />
          {errors.first_name && (
            <div className="invalid-feedback">{errors.first_name}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
            name="last_name"
            value={data.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <div className="invalid-feedback">{errors.last_name}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">CNIC</label>
          <input
            type="text"
            className={`form-control ${errors.cnic ? "is-invalid" : ""}`}
            name="cnic"
            value={data.cnic}
            onChange={handleChange}
          />
          {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Gender</label>
          <select
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
            name="gender"
            value={data.gender}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Marital Status</label>
          <select
            className={`form-select ${
              errors.marital_status ? "is-invalid" : ""
            }`}
            name="marital_status"
            value={data.marital_status}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
          </select>
          {errors.marital_status && (
            <div className="invalid-feedback">{errors.marital_status}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className={`form-control ${
              errors.date_of_birth ? "is-invalid" : ""
            }`}
            name="date_of_birth"
            value={data.date_of_birth}
            onChange={handleChange}
          />
          {errors.date_of_birth && (
            <div className="invalid-feedback">{errors.date_of_birth}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className={`form-control ${
              errors.phone_number ? "is-invalid" : ""
            }`}
            name="phone_number"
            value={data.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && (
            <div className="invalid-feedback">{errors.phone_number}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Street Address</label>
          <input
            type="text"
            className={`form-control ${
              errors.street_address ? "is-invalid" : ""
            }`}
            name="street_address"
            value={data.street_address}
            onChange={handleChange}
          />
          {errors.street_address && (
            <div className="invalid-feedback">{errors.street_address}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">City</label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            name="city"
            value={data.city}
            onChange={handleChange}
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Country</label>
          <input
            type="text"
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
            name="country"
            value={data.country}
            onChange={handleChange}
          />
          {errors.country && (
            <div className="invalid-feedback">{errors.country}</div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Emergency Contact Name</label>
          <input
            type="text"
            className={`form-control ${
              errors.emergency_contact_name ? "is-invalid" : ""
            }`}
            name="emergency_contact_name"
            value={data.emergency_contact_name}
            onChange={handleChange}
          />
          {errors.emergency_contact_name && (
            <div className="invalid-feedback">
              {errors.emergency_contact_name}
            </div>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Emergency Contact Phone</label>
          <input
            type="text"
            className={`form-control ${
              errors.emergency_contact_phone ? "is-invalid" : ""
            }`}
            name="emergency_contact_phone"
            value={data.emergency_contact_phone}
            onChange={handleChange}
          />
          {errors.emergency_contact_phone && (
            <div className="invalid-feedback">
              {errors.emergency_contact_phone}
            </div>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Emergency Contact Relationship</label>
          <input
            type="text"
            className={`form-control ${
              errors.emergency_contact_relationship ? "is-invalid" : ""
            }`}
            name="emergency_contact_relationship"
            value={data.emergency_contact_relationship}
            onChange={handleChange}
          />
          {errors.emergency_contact_relationship && (
            <div className="invalid-feedback">
              {errors.emergency_contact_relationship}
            </div>
          )}
        </div>
        <div className="col-md-4">
          <label className="form-label">Upload User Image</label>
          <input
            type="file"
            className={`form-control ${errors.user_img ? "is-invalid" : ""}`}
            onChange={handleFileChange}
            accept=".jpg, .png, jpeg"
          />
          {errors.user_img && (
            <div className="invalid-feedback">{errors.user_img}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
