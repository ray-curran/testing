import React, { Component } from 'react';
import LikeButton from './LikeButton.jsx';
import FBApp from './../modules/firebase.js';

export default class EmployeeTile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      person: {},
      likes: 0,
      liked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const self = this;

    this.setState({
      person: this.props.person,
    })


    FBApp.ref('/people/' + this.props.person.id).once('value').then(function(snapshot) {
      var snap = snapshot.val()
      console.log('snap', Object.keys(snap).length)
      self.setState({ likes: Object.keys(snap).length})
      for(var key in snap){
        if(snap[key] == self.props.user) {
          self.setState({ liked: true })
        }
      }
    });
  }  

  handleClick() {
    const { person, liked, likes } = this.state;
    const self = this; 

    if(this.props.user == '') {
      return;
    }
    if(liked) {
      this.setState({ liked: false, likes: likes-1})
      var ref = FBApp.ref('/people/' + this.props.person.id);
      ref.once('value').then(function(snapshot) {
        var snap = snapshot.val()
        for(var key in snap){
          if(snap[key] == self.props.user) {
            ref.child(key).remove()
          }
        }
      });

    } else {
      this.setState({ liked: true, likes: likes+1})
      FBApp.ref('/people/' + this.props.person.id).push(this.props.user)
    }
  }


  render() {
    const { person, likes, liked } = this.state;

    return (
      <div className="tile">
        <img className="headshot" src={person.image_url} />
        <div className="content">
          <h3>{ person.name }</h3>
          <h4>{ person.title }</h4>
          <p>{ person.bio }</p>
          <h5>Want to work with { person.name}?</h5>
          <LikeButton 
            handleClick={this.handleClick}
            liked={liked}
          />
          <p className="yes"><span className="bold">{ likes }</span> people have said Yes!</p>
        </div>
      </div>
    );
  }
}
