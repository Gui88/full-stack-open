const Search = ({ value, onChange }) => {
  return (
    <>
      filter shown with <input value={value} onChange={onChange} />
    </>
  );
};

export default Search;
