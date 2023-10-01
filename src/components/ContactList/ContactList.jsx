import PropTypes from 'prop-types';
import { ContactItem } from './ContactItem';
import css from './css/List.module.css';

export function ContactList({ contacts, handleDeleteContact }) {
  return (
    <ul className={css.list}>
      {contacts.map(el => {
        return (
          <ContactItem
            key={el.id}
            name={el.name}
            number={el.number}
            id={el.id}
            handleDeleteContact={handleDeleteContact}
          />
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
