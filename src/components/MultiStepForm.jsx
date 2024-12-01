// MultiStepForm.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PersonalInfo from "../components/Personalinfo";
import EmploymentInfo from "../components/EmploymentInfo";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user_img, setFileuser_img] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    cnic: "",
    street_address: "",
    city: "",
    country: "",
    gender: "",
    date_of_birth: "",
    marital_status: "",
    phone_number: "",
    email: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relationship: "",
    user_img: null,
    employment_status: "",
    government_department: "",
    government_designation: "",
    company_name: "",
    job_title: "",
    salary: 0.0,
    business_name: "",
    business_type: "",
    annual_income: 0.0,
    business_registration_number: "",
    business_address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setData((prevData) => ({ ...prevData, user_img: e.target.files[0] }));
  };

  const validateFields = (fields) => {
    const fieldErrors = {};
    fields.forEach((field) => {
      if (!data[field]) {
        fieldErrors[field] = "This field is required.";
      }
    });
    return fieldErrors;
  };

  const nextStep = () => {
    let requiredFields = [];
    if (currentStep === 1) {
      requiredFields = [
        "first_name",
        "last_name",
        "cnic",
        "street_address",
        "city",
        "country",
        "gender",
        "date_of_birth",
        "marital_status",
        "phone_number",
        "email",
        "emergency_contact_name",
        "emergency_contact_phone",
        "emergency_contact_relationship",
      ];
    } else if (currentStep === 2) {
      requiredFields = [
        "employment_status",
        "government_department",
        "government_designation",
        "company_name",
        "job_title",
        "salary",
        "business_name",
        "business_type",
        "annual_income",
        "business_registration_number",
        "business_address",
      ];
    }

    const validationErrors = validateFields(requiredFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields.");
      return;
    }

    setErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const info = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/insurance_buy/register",
        data
      );
      toast.success("Personal information saved successfully");
      console.log(response);
    } catch (error) {
      toast.error("An error occurred while saving personal info");
      console.error(error);
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", data.user_img);

    try {
      const response = await axios.post(
        "http://localhost:5000/insurance_buy/uploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.user_img;
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const createAsset = async (user_img) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/insurance_buy/createAsset",
        {
          cnic: data.cnic,
          user_img: user_img,
        }
      );
      toast.success("Asset created in Hyperledger successfully");
    } catch (error) {
      toast.error("An error occurred while creating the asset");
      console.error(error);
    }
  };

  const submitData = async (event) => {
    event.preventDefault();

    let user_img_url = null;

    if (data.user_img) {
      try {
        user_img_url = await uploadFile();
        setFileuser_img(user_img_url);
        toast.success("File uploaded successfully");
      } catch (error) {
        toast.error("File upload failed");
        console.error(error);
        return;
      }
    }

    try {
      await info();

      if (user_img_url) {
        await createAsset(user_img_url);
      } else {
        await createAsset(null);
      }
    } catch (error) {
      toast.error("Error saving personal information or creating asset");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Insurance Form</h1>
      <form onSubmit={submitData}>
        <div className="row">
          {currentStep === 1 && (
            <PersonalInfo
              data={data}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <EmploymentInfo data={data} handleChange={handleChange} errors={errors} />
          )}
        </div>
        <div className="row mt-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="btn btn-secondary me-2"
            >
              Previous
            </button>
          )}
          {currentStep < 2 && (
            <button
              type="button"
              onClick={nextStep}
              className="btn btn-primary"
            >
              Next
            </button>
          )}
          {currentStep === 2 && (
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
