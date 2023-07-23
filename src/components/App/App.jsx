import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { createGlobalStyle } from 'styled-components';
import {
  BackgroundContainer,
  Stars,
  Stars2,
  Stars3,
} from '../Background/Background.styled';
import { Container, Wrapper, Title, SubTitle } from '../App/App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // add new contact
  addContact = contact => {
    const { name, number } = contact;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts.some(existingContact => existingContact.name === name)
    ) {
      alert('Contact already exists');
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  // delete a contact
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // handle the filter
  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  // render
  render() {
    const { filter } = this.state;

    return (
      <>
        <GlobalStyle />
        <BackgroundContainer>
          <Stars />
          <Stars2 />
          <Stars3 />
          <Container>
            <Title>
              Phone<span>book</span>
            </Title>
            <ContactForm onSubmit={this.addContact} />
            <SubTitle>Contacts</SubTitle>
            {this.state.contacts.length > 0 ? (
              <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
            ) : (
              <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
            )}
            {this.state.contacts.length > 0 && (
              <ContactList
                contacts={this.getFilteredContacts()}
                onDeleteContact={this.deleteContact}
              />
            )}
          </Container>
        </BackgroundContainer>
      </>
    );
  }
}

export default App;
