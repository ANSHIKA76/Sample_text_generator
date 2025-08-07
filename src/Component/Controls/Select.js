function Select({ value, onChange }) {
  return (
    <select
      className="form-select"
      value={value.toString()}
      onChange={(e) => onChange(e.target.value === 'true')}
    >
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  );
}

export default Select;
