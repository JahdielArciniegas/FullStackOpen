import { useState } from "react";

const Filter = ({ findName, handleNameShowChange, handleShowOn }) => {
  return (
    <div>
      <p>
        Filter shown with{" "}
        <input
          value={findName}
          onChange={handleNameShowChange}
          onFocus={handleShowOn}
          onBlur={handleShowOn}
        />
      </p>
    </div>
  );
};

const PersonForm = ({
  addNewPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const ShowPersons = ({ namesToShow }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {namesToShow.map((person) => {
        return <p key={person.name}>{person.name + " " + person.number}</p>;
      })}
    </div>
  );
};

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState(false);
  const [findName, setFindName] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => newName === person.name)) {
      alert(`${newName} is alredy added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleShowOn = () => {
    setFilterName(!filterName);
  };

  const handleNameShowChange = (event) => {
    const newFindName = event.target.value;
    setFindName(newFindName);
  };

  const namesToShow = filterName
    ? persons.filter(
        (person) =>
          person.name.localeCompare(findName, undefined, {
            sensitivity: "base",
          }) === 0
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        handleShowOn={handleShowOn}
        findName={findName}
        handleNameShowChange={handleNameShowChange}
      />
      <PersonForm
        newName={newName}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        addNewPerson={addNewPerson}
      />
      <ShowPersons namesToShow={namesToShow} />
    </div>
  );
}

export default App;
