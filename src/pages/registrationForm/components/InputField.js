import React, { useCallback } from "react";
import { useFormikContext } from "formik";

const InputField = ({ inputData }) => {
  const [name, label, type = "text"] = inputData;
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext({}) || {};
  const fetchInputType = useCallback(
    (type, name) => {
      switch (type) {
        case "text":
        case "email":
        case "date":
          return (
            <div className="form-group col-md-6">
              <label htmlFor={name}>{label}:*</label>
              <input
                type={type}
                className="form-control"
                id={name}
                name={name}
                value={values?.[name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched?.[name] && errors?.[name] && (
                <div className="text-danger">{errors?.[name]}</div>
              )}
            </div>
          );
        case "radio":
          return (
            <div className="btn-group text-center col-md-6 d-flex justify-content-between align-items-center pt-3">
              <label className={`${values.gender === "Male" ? "active" : ""}`}>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={values.gender === "Male"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                Male
              </label>
              <label
                className={`${values.gender === "Female" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={values.gender === "Female"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                Female
              </label>
            </div>
          );

        default:
          return <></>;
      }
    },
    [values, label, touched, errors, handleChange, handleBlur]
  );
  return fetchInputType(type, name);
};

export default InputField;
