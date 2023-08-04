import * as Yup from "yup";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  state: "",
  city: "",
  gender: "",
  dob: "",
};

const calculateAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Must accept alphabets only")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Must accept alphabets only")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .test(
      "age",
      "Must be older than 14 years",
      (value) => value && calculateAge(value) > 14
    ),
});

//[name,label,type] - eg ['email', 'Enter Email', email] - to add new input field in form
const formInputList = [
  ["firstName", "First Name"],
  ["lastName", "Last Name"],
  ["email", "Email", "email"],
  { name: "country", label: "Country", type: "select" },
  { name: "state", label: "State", type: "select" },
  { name: "city", label: "City", type: "select" },
  ["dob", "Date of Birth", "date"],
  ["gender", "Gender", "radio"],
];

export { initialValues, validationSchema, formInputList };
