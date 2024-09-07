import { useState, useEffect } from "react";
import personService from "./services/persons";
import "./App.css";

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

const ShowPersons = ({ namesToShow, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {namesToShow.map((person) => {
        return (
          <p key={person.name}>
            {person.name + " " + person.number}{" "}
            <button onClick={() => deletePerson(person.id, person.name)}>
              delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

const ShowMessage = ({ messageErr, error }) => {
  if (messageErr === 0) {
    return;
  } else if (error === 1) {
    console.log(error);
    return <h1 className="fail">{messageErr}</h1>;
  } else {
    return <h1 className="err">{messageErr}</h1>;
  }
};

function App() {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState(false);
  const [findName, setFindName] = useState("");
  const [messageErr, setMessageErr] = useState(0);
  const [error, setError] = useState(0);

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => newName === person.name)) {
      const person = persons.find((person) => person.name === newName);
      confirm(
        `${newName} is alredy added to phonebook, replace the old number with a new one`
      );
      const personObject = {
        id: person.id,
        name: newName,
        number: newNumber,
      };
      personService
        .updateNumber(person.id, personObject)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
          const message = `Se ha modificado el numero de ${response.name}`;
          setMessageErr(message);
        })
        .catch((err) => {
          console.log(`Fail , ${err}`);
          const message = `Informarion of ${person.name} has alrady been removed from server`;
          setMessageErr(message);
          setError(1);
        })
        .finally(() => {
          setNewName("");
          setNewNumber("");
        });
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      const message = `Se ha agregado a ${returnedPerson.name}`;
      setMessageErr(message);
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id, name) => {
    if (confirm(`Delete ${name}???`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        const message = `Se ha eliminado el usuario ${name}`;
        setMessageErr(message);
      });
    }
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

  const namesToShow =
    filterName && findName !== ""
      ? persons.filter((person) => {
          const names = person.name.split(" ");
          if (names.length === 1) {
            return (
              names[0].localeCompare(findName, undefined, {
                sensitivity: "base",
              }) === 0
            );
          } else if (names.length === 2) {
            return (
              names[0].localeCompare(findName, undefined, {
                sensitivity: "base",
              }) === 0 ||
              person.name.localeCompare(findName, undefined, {
                sensitivity: "base",
              }) === 0
            );
          }
          return false;
        })
      : persons;

  useEffect(() => {
    messageErr !== 0 ? setTimeout(() => setMessageErr(0), 2000) : messageErr;
  }, [messageErr]);

  useEffect(() => {
    error !== 0 ? setTimeout(() => setError(0), 2000) : error;
  }, [error]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ShowMessage messageErr={messageErr} error={error} />
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
      <ShowPersons namesToShow={namesToShow} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
