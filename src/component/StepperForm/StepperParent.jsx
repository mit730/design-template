import React, { useState } from "react";
import { Formik } from "formik";
import StepOne from "./StepOne";
import StepSecond from "./StepSecond";
import StepThird from "./StepThird";

const StepperParent = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 3;

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }   
    }
    const handleNext = (values) => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    return (
        <>
            StepperParent
            <Formik
                initialValues={{ email: "", name: "", food : [{ lunch: "", dinner: ""}], age: "", language: "", habit: "", fav: "" }}
                enableReinitialize={true}
                onSubmit={(values) => {
                    console.log(values);
                    alert(JSON.stringify(values))
                }}
            >
                {({ values, handleSubmit, setFieldValue }) =>
                    <form onSubmit={handleSubmit}>

                        {currentStep == 1 && <StepOne values={values} setFieldValue={setFieldValue}/>
                        }
                        {currentStep == 2 && <StepSecond values={values} setFieldValue={setFieldValue}/>
                        }
                        {currentStep == 3 && <StepThird values={values} setFieldValue={setFieldValue}/>
                        }

                        <div style={{ marginTop: "20px" }}>
                            {currentStep > 1 && <button type="button" onClick={handleBack}>Back</button>
                            }
                            {currentStep < totalSteps && <button type="button"  onClick={() => handleNext(values)}>Next</button>
                            }
                            {currentStep == totalSteps && <button type="submit">Submit Form</button>
                            }
                        </div>
                    </form>
                }
            </Formik>
        </>
    );
};

export default StepperParent;
