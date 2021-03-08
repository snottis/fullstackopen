const Filter = ({ filt, change }) => {
  return (
    <div>
      find countries
      <input value={filt} onChange={change} />
    </div>
  );
};

export default Filter;
