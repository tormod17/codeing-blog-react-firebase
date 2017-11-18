import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import logo from '../logo.svg';
import '../css/App.css';
import Header from './Header';
import Posts from './Posts';
import Menu from './Menu';
import Form from './Form';
import firebase from '../fire';

const dbRef = firebase.database().ref().child('meBlog');

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showForm: false,
    };
    this.showHideForm = this.showHideForm.bind(this);
    this.editForm = this.editForm.bind(this);
  }

  componentWillMount() {    
    dbRef.on('value', snapshot => {
      this.setState({
        posts: snapshot.val(),
      })
    });
  }

  editForm(key) {
    this.showHideForm();
    this.setState({
      editingId: key,
    })
  }

  showHideForm() {
    this.setState({
      showForm: !this.state.showForm,
      editingId: '',
    })
  }
  
  render() {
    const { showForm, posts, editingId } = this.state;

    return (
      <div className="App pageWrapper">
        <Header />
        <div className="row">
          <div className="col-xs-6 col-sm-10 center">
            <div className="">
              <h3>Posts</h3>
            </div>
          </div>
          <div className="col-xs-6 col-sm-2 sideWrapper">
            <div className="info aside section">
              <button 
                type="button"
                className="btn btn-success"
                onClick={this.showHideForm}
              >
                Add post
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10 postsWrapper">
            <Posts
              posts={posts}
              editForm={this.editForm}
            />
          </div>
          <div className="col-sm-2 sideWrapper">
              <Menu 
                posts={posts}
              />
            </div>
        </div>
        { showForm &&
          <CSSTransitionGroup
            transitionName="formTrans"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Form 
              closeForm={this.showHideForm}
              editingPost={posts && posts[editingId]}
              editingId={editingId}
            />
          </CSSTransitionGroup>
        }
      </div>
    );
  }
}

export default App;
