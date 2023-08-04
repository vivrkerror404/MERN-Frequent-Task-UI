import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";

import {
  initialValues,
  validationSchema,
  formInputList,
} from "registrationForm/constants";
import InputField from "pages/registrationForm/components/InputField";
import {
  fetchSelectOption,
  saveUserData,
} from "registrationForm/gateways/register-api";
import SelectInput from "./components/SelectField";

const RegistrationForm = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    (async () => {
      let country = await fetchSelectOption("country");
      setCountry(country);
    })();
  }, []);
  const passDynamicProp = (type) => {
    switch (type) {
      case "country":
        return { list: country };
      case "state":
        return { list: state };
      case "city":
        return { list: city };
      default:
        return {};
    }
  };
  const handleSelectChange = useCallback(
    async (data, name, setFieldValue) => {
      if (name === "country") {
        const countries = country.find(
          (country) => country.name === data.target.value
        );
        const fetchedstates = await fetchSelectOption("state", countries._id);
        setState(fetchedstates);
        setFieldValue("country", data.target.value);
      } else if (name === "state") {
        const states = state.find((state) => state.name === data.target.value);
        // let fetchedCity = city.filter((city) => city.state === states?._id);
        const fetchedCity = await fetchSelectOption("city", states._id);
        setCity(fetchedCity);
        setFieldValue("state", data.target.value);
      } else if (name === "city") {
        setFieldValue("city", data.target.value);
      }
    },
    [country, state]
  );

  const saveUser = async (values) => {
    try {
      await saveUserData(values);
      alert("User saved successfully..");
    } catch (e) {
      alert("something went wrong..");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur
      onSubmit={saveUser}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="bg-light py-4">
          <div className="form-group container col-md-7 text-start">
            <div class="row">
              {formInputList.map((inputField) =>
                inputField?.type === "select" ? (
                  <SelectInput
                    {...inputField}
                    {...passDynamicProp(inputField?.name)}
                    onChange={(data) =>
                      handleSelectChange(
                        data,
                        inputField?.name,
                        formik?.setFieldValue
                      )
                    }
                  />
                ) : (
                  <InputField inputData={inputField} />
                )
              )}
            </div>
            <button
              type="submit"
              disabled={!formik.isValid}
              className="btn btn-primary mt-3"
            >
              Submit
            </button>
            <button
              className="btn btn-warning mt-3 ms-5"
              onClick={() => (window.location.href = "/user/list")}
            >
              Users List
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
