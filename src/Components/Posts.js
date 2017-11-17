import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import firebase from '../fire';
import Post from './Post';

import '../css/index.css';

class Posts extends Component {
  
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    const { posts, editForm } = this.props;
    return (
      <div className="Posts">
        <div>
          { posts && 
            <ul className="list-group">
              <CSSTransitionGroup
                transitionName="listTrans"
                transitionLeaveTimeout={300} 
                transitionEnterTimeout={300}
              >
              { Object.keys(posts).reverse().map(key => 
                 <Post
                    key={key}
                    id={key}
                    item={posts[key]}
                    editForm={editForm}
                 />
                )
              }
              </CSSTransitionGroup>
            </ul>
          }
          {!posts && 
            <h4> need to add some posts mate </h4>
          }
        </div>
      </div>
    );
  }
}

export default Posts;
