import { useState } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchBox, setSearchBox] = useState("");

  const personsToShow = persons.filter((person) =>
    person.name.toUpperCase().includes(searchBox.toUpperCase()),
  );

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === "") {
      alert("You must provide a name");
    } else if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const tempPersonObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(tempPersonObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchBox(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Search value={searchBox} onChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Persons personsList={personsToShow} />
    </div>
  );
};

export default App;
