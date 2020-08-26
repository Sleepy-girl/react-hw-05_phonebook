import React, { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';
import { object } from 'prop-types';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    console.log('Contact componentDidMount');
    const persistedContacts = localStorage.getItem('contacts');
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Contact componentDidUpdate'); // вызывается каждый раз при смене состояния state
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addToContacts = objectContact => {
    this.state.contacts.find(contact => contact.name === objectContact.name)
      ? alert(`${objectContact.name} is already in contacts.`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, objectContact],
          };
        });
  };

  getFilterValue = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredData = e => {
    return this.state.filter
      ? this.state.contacts.filter(contact =>
          contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
        )
      : this.state.contacts;
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    console.log('App Render');

    const filter = this.state.filter;
    const contacts = this.state.contacts;

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addToContacts} />
        {contacts.length > 0 ? (
          <div>
            <h2>Contacts</h2>
            <Filter getFilterValue={this.getFilterValue} value={filter} />
            <ContactList
              contacts={this.getFilteredData()}
              onRemoveContact={this.removeContact}
            />
          </div>
        ) : (
          <h2>Your phonebook is empty, please add your first contact</h2>
        )}
      </>
    );
  }
}

export default App;
