import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';

function loadFromLocaleStorage() {
  return JSON.parse(window.localStorage.getItem('contacts'));
}

export function App() {
  const [contacts, setContacts] = useState(() => loadFromLocaleStorage() || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const searchName = obj => {
    if (contacts) {
      return contacts.find(
        el => el.name.toLowerCase() === obj.name.toLowerCase()
      );
    }
  };

  const onSubmit = obj => {
    if (searchName(obj)) {
      return alert(`${obj.name} is already in contacts`);
    }

    setContacts(state => [...state, { ...obj, id: nanoid() }]);
  };

  const handleDeleteContact = id => {
    setContacts(state => state.filter(el => el.id !== id));
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = useMemo(() => {
    const normalized = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  }, [filter, contacts]);

  return (
    <div
      style={{
        marginLeft: 50,
      }}
    >
      <h1>Phonebook</h1>

      <ContactForm onSubmit={onSubmit} />

      <Filter filter={filter} onChange={onFilterChange} />

      <ContactList
        contacts={filteredContacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
}
