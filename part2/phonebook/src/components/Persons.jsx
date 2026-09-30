const Persons = ({ personsList }) => {
  return (
    <ul>
      {personsList.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};
export default Persons;
