import React from "react";
import styles from "./contactList.module.css";
import "./contactList.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function ContactList({ contacts, onRemoveContact }) {
  return (
    <TransitionGroup className={styles.contactList}>
      {contacts.map((contact) => (
        <CSSTransition
          key={contact.id}
          timeout={1500}
          classNames="contactListItem"
          className={styles.contactListItem}
        >
          <div>
            <div className={styles.contactWrapper}>
              <span className={styles.contactName}>{contact.name}:</span>
              <span className={styles.contactNumber}>{contact.number}</span>
            </div>
            <button
              type="button"
              onClick={() => onRemoveContact(contact.id)}
              className={styles.btnDelete}
            >
              &#10060;
            </button>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default ContactList;
