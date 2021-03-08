const Filter = ({ val, change }) => {
  return (
    <div>
      filter shown with <input value={val} onChange={change} />{' '}
    </div>
  );
};

export default Filter;
