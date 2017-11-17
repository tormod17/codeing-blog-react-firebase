import React, { Component } from 'react';
import firebase from '../fire';

import '../css/index.css';

class Post extends Component {
  constructor(props){
    super(props)
  }

  deletePost = key => {
    const dbRef = firebase.database().ref('meBlog/'+ key).remove();  
  }

  editPost = key => {
    this.props.editForm(key);
  }

  getNewOrderWithExtraFields = item => {
    const newOrder = ['title'];
    const itemFields = Object.keys(item);
    const items = itemFields.filter(field => field.match(/\d+/));
    items.sort((a,b) => a.slice(-1) - b.slice(-1))
    return ['title', ...items ]
  }

  formatTextArea = (text) => {
    return <p>{text}</p>
  }

  formatList = list => {
    const listItems = list.split(',');
    const jsxList = listItems.map(item => <li key={item} >{item}</li> )  
    return (
      <ul className="postList">
        {jsxList}
      </ul>
    )
  }

  renderTextImages = item => {
    const newOrder = this.getNewOrderWithExtraFields(item);
    return newOrder.map(key => { 
      let content ;
      switch (true) {
        case key === 'title':
          content = <div><h4>{`${item[key].toUpperCase()}`}</h4><p>{`${item.today}`}</p></div>
          break;
        case key.includes('text'):
          content = this.formatTextArea(item[key]);
          break;
        case key.includes('list'):
          content = this.formatList(item[key]);
          break;
        case key.includes('Image'):
          content = item[key] && <img src={item[key]} className="img-rounded thumbnail" width="300"/>
          break;
        case key.includes('iframe'):
          content = item[key] && <iframe src={item[key]} className="iframe" width="500"/>      
          break;
        case key.includes('subTitle'):
          content = <h5>{`${item[key].toUpperCase()}`}</h5> 
          break;
        default:
          content = item[key];
      }
      return (
        <div key={key} className="list-group-item">
          {content}
        </div>
      )
   })
  }

  render () {
    const { item, id } = this.props;
    return (
      <li 
        id={id}
        className="list-group-item"
      >
      <div>
        {this.renderTextImages(item)}
      </div>
          <div className="buttonPair">     
              <button 
                type="button"
                className="btn btn-danger btn-xs"
                onClick={() => this.deletePost(id)}
              >
                delete
              </button>
              <button 
                type="button"
                className="btn btn-default btn-xs"
                onClick={() => this.editPost(id)}
              >
                edit
              </button>
          </div>
      </li>
    );
  }
}

export default Post;