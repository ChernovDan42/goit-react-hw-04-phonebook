import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState();

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const saveContact = e => {
    e.preventDefault();

    onSubmit({ name, number, id });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
    setId('');
  };

  const IdNameInput = nanoid();
  const IdNumberInput = nanoid();

  return (
    <form className={css.ContactForm} onSubmit={saveContact}>
      <label htmlFor={IdNameInput} className={css.label}>
        Name
      </label>
      <input
        id={IdNameInput}
        className={css.ContactFormInput}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleInputChange}
        required
      />

      <label htmlFor={IdNumberInput} className={css.label}>
        Number
      </label>
      <input
        className={css.ContactFormInput}
        id={IdNumberInput}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={number}
        onChange={handleInputChange}
        required
      />

      <button type="submit" className={css.submitBtn}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
