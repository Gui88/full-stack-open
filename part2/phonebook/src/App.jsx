import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
