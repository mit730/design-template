import React, { useState } from "react";
import StepOneNew from "./StepOneNew";
import StepSecondNew from "./StepSecondNew";
import StepThirdNew from "./StepThirdNew";

const StepperParentNew = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    country: [{ state: "", city: "" }],
    age: "",
    lang: "",
    habit: "",
    fav: "",
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 3;

  const addCountry = () => {
    setFormValues((prev) => ({
      ...prev,
      country: [...prev.country, { state: "", city: "" }],
    }));
  };

  const deleteCountry = (index) => {
    let x = formValues.country.filter((_, i) => i !== index);

    setFormValues((prev) => ({
      ...prev,
      country: x,
    }));
  };

  const validateForm = () => {
    let error = {};

    if (currentStep === 0) {
      if (!formValues.email) {
        error.email = "required";
      }
      if (!formValues.name) {
        error.name = "required";
      }
    } else if (currentStep === 1) {
      if (!formValues.age) {
        error.age = "required";
      }
      if (!formValues.lang) {
        error.lang = "required";
      }
    } else if (currentStep === 2) {
      if (!formValues.habit) {
        error.habit = "required";
      }
      if (!formValues.fav) {
        error.fav = "required";
      }
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(JSON.stringify(formValues));
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleChange = (e, name) => {
    let value = e.target.value;

    let [field, index, key] = name.split(".");

    if (field === "country") {
      setFormValues((prev) => {
        const updatecountry = [...prev.country];
        updatecountry[index][key] = value;
        return {
          ...prev,
          country: updatecountry,
        };
      });
    } else {
      setFormValues((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
    setErrors((prevError) => {
      const { [name]: _, ...rest } = prevError;
      return rest;
    });
  };
  console.log(formValues, "formValues");

  return (
    <>
      StepperParentNew
      <form onSubmit={handleSubmit}>
        {currentStep === 0 && (
          <StepOneNew
            values={formValues}
            handleChange={handleChange}
            errors={errors}
            addCountry={addCountry}
            deleteCountry={deleteCountry}
          />
        )}
        {currentStep === 1 && (
          <StepSecondNew
            values={formValues}
            handleChange={handleChange}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <StepThirdNew
            values={formValues}
            handleChange={handleChange}
            errors={errors}
          />
        )}

        <div className="m-3">
          {currentStep > 0 && (
            <button type="button" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep < totalSteps - 1 && (
            <button type="button" onClick={() => handleNext()}>
              Next
            </button>
          )}
          {currentStep === totalSteps - 1 && (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </>
  );
};

export default StepperParentNew;


// stripe.js / elements / checkout / paymentIntent / setUpIntent

//  Install Stripe.js:  Include Stripe.js by adding it to your HTML or using npm/yarn.
//  Create a Payment Intent: This generates a client secret.
//  Use Stripe Elements - Stripe Elements library to securely capture card details. Stripe Elements provide components for card number, expiration date, and CVC fields.
//  Handle the Payment - stripe.confirmCardPayment

//  Payment Intents handle the entire lifecycle of a payment, including authorization and capture.
