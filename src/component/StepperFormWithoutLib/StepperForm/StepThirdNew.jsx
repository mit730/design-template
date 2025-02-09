import React from "react";

const StepThirdNew = ({ values, handleChange, errors }) => {
  return (
    <>
      <div>StepThirdNew</div>
      <div>
        <div className="m-2">
          <label>habit</label>
          <input
            className="m-1"
            type="text"
            value={values.habit}
            placeholder="habit"
            onChange={(e) => handleChange(e, "habit")}
          />
           {errors.habit && <p style={{ color: "red" }}>{errors.habit}</p>}
        </div>

        <div>
          <label>fav</label>
          <input
            className="m-1"
            type="text"
            value={values.fav}
            placeholder="fav"
            onChange={(e) => handleChange(e, "fav")}
          />
           {errors.fav && <p style={{ color: "red" }}>{errors.fav}</p>}
        </div>
      </div>
    </>
  );
};

export default StepThirdNew;
