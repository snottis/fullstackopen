const Form = ({ name, namechange, number, numberchange, add }) => {
  return (
    <div>
      <form onSubmit={add}>
        <div>
          name: <input value={name} onChange={namechange} />
        </div>
        <div>
          number: <input value={number} onChange={numberchange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
