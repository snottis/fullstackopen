const CountryList = ({ countries, show }) => {
  return (
    <div>
      {countries.map((c) => {
        return (
          <div key={c.name}>
            {c.name}{' '}
            <button key={c.name} value={c.name} onClick={show}>
              show
            </button>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default CountryList;
