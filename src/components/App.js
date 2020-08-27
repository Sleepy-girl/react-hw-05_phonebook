import React, { Component } from "react";
import ContactForm from "./contactForm/ContactForm";
import Filter from "./filter/Filter";
import ContactList from "./contactList/ContactList";
import { object } from "prop-types";
import styles from "./app.module.css";
import "./app.css";
import { CSSTransition } from "react-transition-group";
import AlertError from "./alertError/AlertError";

export class App extends Component {
  state = {
    // phonebook: false,
    alert: false,
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    console.log("Contact componentDidMount");
    // this.setState((prevState) => ({ phonebook: !prevState.phonebook }));

    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Contact componentDidUpdate"); // вызывается каждый раз при смене состояния state
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addToContacts = (objectContact) => {
    this.state.contacts.find((contact) => contact.name === objectContact.name)
      ? this.setState((prevState) => ({ alert: true }))
      : this.setState((prevState) => {
          return {
            contacts: [...prevState.contacts, objectContact],
          };
        });
  };

  closeAlert = () => {
    this.setState((prevState) => ({ alert: !prevState.alert }));
  };

  getFilterValue = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredData = (e) => {
    return this.state.filter
      ? this.state.contacts.filter((contact) =>
          contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
        )
      : this.state.contacts;
  };

  removeContact = (id) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((contact) => contact.id !== id),
      };
    });
  };

  render() {
    const { filter, contacts, alert, phonebook } = this.state;
    // const contacts = this.state.contacts;

    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapperTitleWithAlert}>
          <CSSTransition
            classNames="fade"
            in={true}
            appear={true}
            timeout={500}
            unmountOnExit
          >
            <h1 className={styles.title}>Phonebook</h1>
          </CSSTransition>
          {/* <CSSTransition
            classNames="alert"
            in={alert}
            timeout={250}
            unmountOnExit
          > */}
          <AlertError closeAlert={this.closeAlert} alert={alert} />
          {/* </CSSTransition> */}
        </div>
        <ContactForm onSubmit={this.addToContacts} />
        {contacts.length > 0 ? (
          <div>
            {contacts.length > 1 && (
              <Filter getFilterValue={this.getFilterValue} value={filter} />
            )}

            <ContactList
              contacts={this.getFilteredData()}
              onRemoveContact={this.removeContact}
            />
          </div>
        ) : (
          <h2 className={styles.titleEmpty}>
            Your phonebook is empty, please add your first contact
          </h2>
        )}
      </div>
    );
  }
}

export default App;
