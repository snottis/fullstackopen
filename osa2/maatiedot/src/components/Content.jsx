import Country from './Country';
import CountryList from './CountryList';

const Content = ({ countries, filter, show }) => {
  const filtered = countries.filter(
    (c) => c.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
  );
  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filtered.length > 1) {
    return <CountryList countries={filtered} show={show} />;
  } else if (filtered.length === 1) {
    return <Country country={filtered[0]} />;
  } else {
    return <></>;
  }
};

export default Content;
