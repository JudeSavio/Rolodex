import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
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
        <h1 className="robots-title">Robots Rolodex</h1>
        <SearchBox 
          OnChangeHandler={searchChange} 
          placeholder={'search robots'} 
          className={'robots-search-box'}
        />
        <CardList monsters={filtered_Monsters}/> 
      </div>
    );
  }
}

export default App;
