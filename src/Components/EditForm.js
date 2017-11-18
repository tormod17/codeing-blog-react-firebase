import React, { PureComponent } from 'react';
import firebase from '../fire';
import '../css/index.css';

class EditForm extends PureComponent {
  constructor(props){
    super(props)
    const { post } = props;
    this.state = {
      ...post,
    };
    this.editPost = this.editPost.bind(this);
    this.addMore = this.addMore.bind(this);
  }

  updateFieldValue = e => {
    e.stopPropagation();
    const val = e.target.value
    const name = e.target.getAttribute('name');
    this.setState(prevState=> ({
      ...prevState,
      [name]: val,
    }))
  }

  addMore = () => {
    const arrNumbers = Object.keys(this.state).map(key => key.match(/\d+/))
    const nextFieldNumber = Math.max(...arrNumbers) + 1;
    const newFields = {
      [`subTitle${nextFieldNumber}`]: '',
      [`image${nextFieldNumber}`]: '',
      [`text${nextFieldNumber}`]: '',
      [`list${nextFieldNumber}`]: '',
    }
    this.setState(prevState=> ({
      ...newFields,
      ...prevState,
    }))
  }

  editPost = (e) => {
    e.preventDefault();
    const state = { ...this.state };
    const { id, closeForm } = this.props;

    const cleanState = Object.keys(state).reduce((p,c) => {
      if (state[c] !== '') {
        p[c] = state[c];
      }
      return p;
    }, {})
    const dbRef = firebase.database().ref('meBlog/'+ id).set(cleanState)
    closeForm();
  }

  renderPostFields = (key) => {
      const post = { ...this.state };
      if (key === 'numberOfInputs') {
        return false;
      }
      return (
         <div key={key} className="form-group">
          <label htmlFor={key}>{`${key}`}</label>
            { !key.includes('text') && 
              <input 
                type="text"
                className="form-control" 
                name={key}
                onChange={this.updateFieldValue}
                value={post[key]}
              />
            }
            { key.includes('text') && 
              <textarea
                name={key} 
                className="form-control"
                rows="3"
                id="text"
                onChange={this.updateFieldValue}
                value={post[key]}
              >
              </textarea>
            }
        </div>
      )
  }

  getNewOrderWithExtraFields = item => {
    const newOrder = ['title'];
    const itemFields = Object.keys(item);
    const items = itemFields.filter(field => field.match(/\d+/));
    items.sort((a,b) => a.slice(-1) - b.slice(-1))
    return ['title', ...items ]
  }

  render(){
    const newOrder = this.getNewOrderWithExtraFields(this.state);

    return (
       <form className="form-horizontal" onSubmit={this.editPost}>     
          { newOrder.map(key => this.renderPostFields(key)) }
          <div className="form-group">        
            <div className="buttonPair">
              <button 
                  type="button"
                  className="btn btn-success btn-small"
                  onClick={this.addMore}
                >
                  Add more
              </button>
              <button 
                  type="submit"
                  className="btn btn-primary btn-small"
                >
                  Submit
              </button>
            </div>
          </div>
        </form>
    )
  }
}

export default EditForm;
