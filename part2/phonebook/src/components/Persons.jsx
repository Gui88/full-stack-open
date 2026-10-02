const Persons = ({ personsList, onDelete }) => {
  return (
    <ul>
      {personsList.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
export default Persons;
