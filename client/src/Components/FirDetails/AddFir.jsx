import React, { useState } from "react";
import { useFetchData } from "./Firdetails";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import toast from "react-hot-toast";
import styles from "./firdetails.module.css";
import { formatString, smapleFirValues } from "../../utils/utility";

const AddFir = () => {
  // Step 1: Initialize state for form data
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState(smapleFirValues);

  // Step 2: Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const resetForm = () =>{
    Object.keys(formData).forEach((key)=>{
        setFormData(prevForm => {return {
            ...prevForm,
            [key]: '',
          }});  
    })
  }
  // Step 3: Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    let loadingToastId;

    // Process the form data (e.g., send to a server)
    console.log("Form Data Submitted:", Object.values(formData));
    try {
      loadingToastId = toast.loading("Processing");
      const res = await axios.post(
        `${apiUrl}/addfir`,
        { firValues: Object.values(formData) },
        {
          headers: {
            jwt_token: localStorage.getItem("token"),
          },
        }
      );
      if (res.statusText == "OK") {
        setIsPending(false);
        toast.success(res.data.message);
        resetForm();
      }
      console.log(res.data);
      toast.dismiss(loadingToastId);
    } catch (error) {
      console.log(error);
      setIsPending(false);
      toast.dismiss(loadingToastId);
      toast.error(error.response.data.error);
    }
  };

  return (
      <div className={styles.detailed_fir_bg_wrapper}>
    <form onSubmit={handleSubmit}>
        {/* Step 4: Create input fields dynamically */}
        <div className={styles.detailed_fir_container}>
          {Object.keys(formData).map((fieldName) => (
            <div key={fieldName} className={styles.detailed_fir_cont}>
              <label htmlFor={fieldName} className={styles.fir_col_heading}>
                {formatString(fieldName)}:
              </label>
              <input
                type="text"
                id={fieldName}
                name={fieldName}
                value={formData[fieldName]}
                onChange={handleChange}
                className={styles.fir_col_input}
              />
            </div>
          ))}
        </div>
        <div className={styles.fir_add_btn_wrapper}>
          <button type="submit" disabled={isPending} className={styles.fir_add_btn}>
            Submit
          </button>

        </div>
    </form>
      </div>
  );
};

export default AddFir;
