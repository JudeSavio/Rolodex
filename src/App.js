import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import logo from './logo.svg';
import './App.css';
import { type } from '@testing-library/user-event/dist/type';

class App extends Component {

  constructor() {
    super();
    this.state = {
      monsters : [],
      searchField : ''
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState( () => {
      return {monsters:users}
    }));
  }

  searchChange = (event) => {
    var searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {searchField};
    });
  }

  render () {
    const {monsters , searchField} = this.state;
    const {searchChange} = this;
    var filtered_Monsters = monsters.filter( (monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })
    return (
      <div className="App">
        <input 
        className="search-box" 
        type="search" 
        placeholder='enter monsters' 
        onChange={searchChange}
        />
        {
          /*
          filtered_Monsters.map((monster) => {
            return <h1 key={monster.id}>{monster.name}</h1> 
          })
          */
        }
        <CardList monsters={filtered_Monsters}/> 
      </div>
    );
  }
}

export default App;
