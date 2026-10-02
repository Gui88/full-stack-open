import { useEffect, useState } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchBox, setSearchBox] = useState("");

  const personsToShow = persons.filter((person) =>
    person.name.toUpperCase().includes(searchBox.toUpperCase()),
  );

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.deletePerson(person).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === "") {
      alert("You must provide a name");
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      if (persons.some((person) => person.name === newName)) {
        if (
          window.confirm(
            `${newName} is already added to the phonebook, replace the old number with a new one?`,
          )
        ) {
          const existingPerson = persons.find(
            (person) => person.name === newName,
          );
          personsService
            .update(existingPerson.id, personObject)
            .then((updatedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id === existingPerson.id ? updatedPerson : person,
                ),
              );
            });
          setNewName("");
          setNewNumber("");
        }
      } else {
        personsService.create(personObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        });
        setNewName("");
        setNewNumber("");
      }
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
      <Persons personsList={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
