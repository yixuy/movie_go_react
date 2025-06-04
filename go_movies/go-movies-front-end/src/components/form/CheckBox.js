const CheckBox = (props) => {
  return (
    <div className="form-check">
      <input
        id={props.name}
        className="form-check-input"
        type="checkbox"
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
      ></input>
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
    </div>
  );
};

export default CheckBox;
