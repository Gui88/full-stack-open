const Search = ({ value, onChange }) => {
  return (
    <>
      find countries <input value={value} onChange={onChange} />
    </>
  );
};

export default Search;
