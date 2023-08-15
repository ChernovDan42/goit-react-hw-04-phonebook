import { Component } from "react"
import { ContactForm } from "./ContactForm/ContactForm"
import { Filter } from "./Filter/Filter"
import { ContactList } from "./ContactList/ContactList"







export class App extends Component {


  state = {
    contacts: [],
    filter: '',
  }


  onFilterChange = e => {
   this.setState({
      filter: e.currentTarget.value
    })
  }   


  componentDidUpdate(perevProps,prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
      
    }
    
  }

  componentDidMount() {
    const localContacts = localStorage.getItem("contacts")
    const parsed=JSON.parse(localContacts)
    
    if (parsed) {
      this.setState({contacts:parsed})
      
    }
  }
  

  searchName(obj) {
    
return this.state.contacts.find(el=> el.name===obj.name)

  }
  

  onSubmit = obj => {

    if (this.searchName(obj)) {
      return alert(`${obj.name} is already in contacts`)
    }

    this.setState(prevState=>({
      contacts: [...prevState.contacts, obj ]
    
    }))
  }

  
  handleDeleteContact = (id) => {

    const { contacts } = this.state
    const updateState = contacts.filter(el => el.id !== id);
    
    this.setState({
     contacts: updateState 
    });

  }

  filteredContacts = () => {
    const { filter, contacts } = this.state
  const normalized=filter.toLowerCase()

  
    
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalized))
    

  }

 
  render() {

    const visibleContacts = this.filteredContacts();

  

    return (
      <div style={{
        marginLeft: 50,
      }}>
        <h1>Phonebook</h1>
        
      <ContactForm onSubmit={this.onSubmit}/>


        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={ this.onFilterChange} />
       
        < ContactList 
          contacts={visibleContacts}
          handleDeleteContact={this.handleDeleteContact}
          />
        

    </div>

  
)
  
  }
};
