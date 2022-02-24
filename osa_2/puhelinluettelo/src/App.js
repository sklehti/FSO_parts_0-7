//import axios from "axios";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const Information = ({ message }) => {
  const footer = {
    color: "green",
    background: "lightgray",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) {
    return null;
  }
  return <div style={footer}>{message}</div>;
};

const DeleteInformation = ({ message }) => {
  const footer = {
    color: "red",
    background: "lightgray",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) {
    return null;
  }
  return <div style={footer}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showPerson, setShowPerson] = useState("");
  const [informationMessage, setInformationMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const sameName = persons.some(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (!sameName) {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setInformationMessage(`Added ${newName}`);
          setTimeout(() => {
            setInformationMessage(null);
          }, 2000);
        })
        .catch((error) => {
          setDeleteMessage(
            `Person validation failed: name and/or number: Path 'name' and/or 'number' (${newName}) and/or (${newNumber}) is shorter than the minimum allowed length (3) and (8).`
          );
          setTimeout(() => {
            setDeleteMessage(null);
          }, 2000);
        });

      setNewName("");
      setNewNumber("");
    } else {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );

      if (result) {
        const personId = persons.find((p) => p.name === newName);
        console.log("testi", personId);
        personService
          .update(personId.id, personObject)
          .then((returnedPerson) => {
            console.log(returnedPerson, "testi2");
            setPersons(
              persons.map((p) => (p.id !== personId.id ? p : returnedPerson))
            );

            setInformationMessage(`Updated ${newName}`);
            setTimeout(() => {
              setInformationMessage(null);
            }, 2000);
          })

          .catch((error) => {
            setDeleteMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => {
              setDeleteMessage(null);
            }, 2000);

            setPersons(persons.filter((p) => p.name !== newName));
          });
      }

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

  const handleShowPerson = (event) => {
    setShowPerson(event.target.value);
  };

  const personFilter = persons.filter((p) => {
    return p.name.toLowerCase().includes(showPerson.toLowerCase());
  });

  const handlePersonDelete = (id, name) => {
    const result = window.confirm(`Delete ${name}`);

    if (result) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));

          setInformationMessage(`Deleted ${name}`);
          setTimeout(() => {
            setInformationMessage(null);
          }, 2000);
        })
        .catch((error) => {
          setDeleteMessage(
            `Information of ${newName} has already been removed from server`
          );
          setTimeout(() => {
            setDeleteMessage(null);
          }, 2000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Information message={informationMessage} />
      <DeleteInformation message={deleteMessage} />
      <Filter showPerson={showPerson} handleShowPerson={handleShowPerson} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personFilter.map((p) => (
        <Persons
          key={p.name}
          p={p}
          handlePersonDelete={() => handlePersonDelete(p.id, p.name)}
        />
      ))}
    </div>
  );
};

export default App;
