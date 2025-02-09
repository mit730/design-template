import React from "react";

const StepOneNew = ({
  values,
  handleChange,
  errors,
  addCountry,
  deleteCountry,
}) => {
  return (
    <>
      <div>StepOneNew</div>
      <div>
        <div className="m-2">
          <label>Name</label>
          <input
            className="m-1"
            type="text"
            value={values.name}
            placeholder="name"
            onChange={(e) => handleChange(e, "name")}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            className="m-1"
            type="text"
            value={values.email}
            placeholder="email"
            onChange={(e) => handleChange(e, "email")}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        {/* ===================================================================================== */}

        {values.country &&
          values.country.map((item, i) => (
            <div className="m-2 border" key={i}>
              <div className="m-1">
                <label>State</label>
                <input
                  type="text"
                  placeholder="state"
                  value={item.state}
                  onChange={(e) => handleChange(e, `country.${i}.state`)}
                />
              </div>

              <div className="m-1">
                <label>City</label>
                <input
                  type="text"
                  placeholder="city"
                  value={item.city}
                  onChange={(e) => handleChange(e, `country.${i}.city`)}
                />
              </div>

              <button type="button" onClick={addCountry}>
                +
              </button>
              <button type="button" onClick={() => deleteCountry(i)}>
                -
              </button>
            </div>
          ))}

        {/* ===================================================================================== */}
      </div>
    </>
  );
};

export default StepOneNew;
