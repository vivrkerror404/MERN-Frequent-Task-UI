const FetchOptions = ({ list }) => {
  return list.map((opt) => (
    <option key={opt._id} value={opt.name}>
      {opt.name}
    </option>
  ));
};

const SelectInput = ({
  name,
  label,
  values,
  errors,
  touched,
  list,
  ...rest
}) => {
  return (
    <div className="col-md-6">
      <label htmlFor="gender">{label}:*</label>
      <select
        className="form-control"
        id={name}
        name={name}
        value={values?.[name]}
        {...rest}
      >
        <option value="">Select</option>
        <FetchOptions list={list} />
      </select>
    </div>
  );
};

export default SelectInput;
