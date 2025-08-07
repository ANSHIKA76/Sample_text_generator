function Text({ value, onChange }) {
  return (
    <input
      type="number"
      className="form-control"
      value={value}
      min="1"
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}

export default Text;
