import React, { Component } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';

const filterContacts = (contacts, filter) =>
  contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const fromLS = JSON.parse(localStorage.getItem('contacts'));
    if (fromLS) {
      this.setState({ contacts: fromLS });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  onDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  onFormSubmit = formData => {
    const { contacts } = this.state;

    const contactToAdd = {
      id: uuidv4(),
      name: formData.name,
      number: formData.number,
    };

    if (contacts.find(contact => contact.name === contactToAdd.name)) {
      alert(contactToAdd.name + 'is already in contacts');
      return;
    }
    this.setState({
      contacts: [...contacts, contactToAdd],
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = filterContacts(contacts, filter);

    return (
      <>
        <h1>Phonebook</h1>

        <ContactForm onFormSubmit={this.onFormSubmit} />
        {contacts.length !== 0 && (
          <>
            <h2>Contacts</h2>
            {contacts.length > 1 && (
              <Filter value={filter} onChangeFilter={this.changeFilter} />
            )}
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.onDeleteContact}
            />
          </>
        )}
      </>
    );
  }
}
