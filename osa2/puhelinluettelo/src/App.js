import React, { useState, useEffect } from 'react';

import List from './components/List';
import Form from './components/Form';
import Filter from './components/Filter';

import personsService from './services/persons';
import Notification from './components/Notification';
import notification from './services/notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [namefilter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    personsService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((i) => i.name === newName);
    if (person) {
      if (
        window.confirm(
          `${newName} already added to phonebook, replace the old number with new one?`
        )
      ) {
        personsService
          .update(person.id, { ...person, number: newNumber })
          .then((data) => {
            setPersons(
              persons.map((p) => {
                if (p.id === data.id) {
                  return data;
                }
                return p;
              })
            );
            notification.success(`Updated ${data.name}`, setErrorMessage);
          })
          .catch((error) => {
            notification.failure(
              `Information of ${person.name} already removed.`,
              setErrorMessage
            );
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
      return;
    }
    personsService
      .create({ name: newName, number: newNumber })
      .then((data) => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
        notification.success(`Added ${data.name}`, setErrorMessage);
      })
      .catch((err) => {
        notification.failure(err.response.data.error, setErrorMessage);
      });
  };

  const removeButton = (event) => {
    let name = persons.find((p) => p.id === event.target.value).name;
    if (window.confirm(`Delete ${name} ?`)) {
      personsService.remove(event.target.value).then((data) => {
        setPersons(persons.filter((p) => p.id !== event.target.value));
      });
      notification.success(`Deleted ${name}`, setErrorMessage);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={errorMessage} />
      <Filter val={namefilter} change={handleFilter} />
      <h2>add a new</h2>
      <Form
        name={newName}
        namechange={handleNameChange}
        number={newNumber}
        numberchange={handleNumberChange}
        add={addPerson}
      />
      <h2>Numbers</h2>
      <List persons={persons} namefilter={namefilter} button={removeButton} />
    </div>
  );
};

export default App;
