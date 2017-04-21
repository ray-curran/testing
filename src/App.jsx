import React, { Component } from 'react';
import axios from 'axios';
import EmployeeTile from './components/EmployeeTile.jsx'
import FBApp from './modules/firebase.js';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      people: [],
      user: ''
    };

    this.handleInput = this.handleInput.bind(this);

  }

  getData() {
    var _this = this;
    axios.get('https://api.myjson.com/bins/jhz5z')
      .then(function (response) {
        _this.setState({
          people: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.getData();
  }  

  handleInput(e) {
    if(e.keyCode == 13) {
      var message = e.target.value
      this.setState({ user: message })
    }
  }

  render() {
    const { people, user } = this.state;
    return (
      <div>
      <h2>G2 Crowd Team Roster</h2>
      { (user == '') ? (
          <div>
          <h3>Type your name and click enter to view and select people you would like to work with.</h3>
          <input type="text" placeholder="name" onKeyUp={(e) => this.handleInput(e)} />
          </div>
      ) : (
        <h3>Making selections for: {user}</h3>
      )
    }
      {(user !== '') &&
        <div>
        {people.map(function(person, index){
            return <EmployeeTile user={ user } key={ index } person={ person } />;
          })}
        </div>
      }
      </div>
    );
  }
}
