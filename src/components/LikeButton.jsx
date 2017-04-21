import React, { Component } from 'react';
var Icon = require('babel!svg-react!./../assets/img/thumbs-up.svg?name=Icon');


export default class LikeButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    return (
      <div className="inline">
      {(!this.props.liked) &&
        <div onClick={this.props.handleClick} className="button">
          <Icon className='like' />
          <p>Yes!</p>
        </div>
      }
      {(this.props.liked) &&
        <div onClick={this.props.handleClick} className="likedbutton">
          <Icon className='like' />
          <p>Yes!</p>
        </div>
      }
      </div>
    );
  }
}
