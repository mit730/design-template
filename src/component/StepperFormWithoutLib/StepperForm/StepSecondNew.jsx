import React from "react";

const StepSecondNew = ({ values, handleChange, errors }) => {
  return (
    <>
      <div>StepSecondNew</div>
      <div>
        <div className="m-2">
          <label>Age</label>
          <input
            className="m-1"
            type="text"
            value={values.age}
            placeholder="age"
            onChange={(e) => handleChange(e, "age")}
          />
           {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </div>

        <div>
          <label>Language</label>
          <input
            className="m-1"
            type="text"
            value={values.lang}
            placeholder="lang"
            onChange={(e) => handleChange(e, "lang")}
          />
           {errors.lang && <p style={{ color: "red" }}>{errors.lang}</p>}
        </div>
      </div>
    </>
  );
};

export default StepSecondNew;
