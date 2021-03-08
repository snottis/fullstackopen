const List = ({ persons, namefilter, button }) => {
  return persons
    .filter((p) => {
      return p.name.toLowerCase().indexOf(namefilter.toLowerCase()) >= 0;
    })
    .map((o) => {
      return (
        <div key={o.name}>
          {o.name} {o.number}{' '}
          <button value={o.id} onClick={button}>
            delete
          </button>
        </div>
      );
    });
};

export default List;
