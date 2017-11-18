import React, { Component } from 'react';
import firebase from '../fire';
import '../css/index.css';

const repeat = x => func => {
  if (x > 0) {
    func()
    repeat (x - 1)(func)
  }
}
const today = new Date().toISOString().slice(0, 10)


class AddForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberOfInputs: 1,
      today,
    };
    this.addPost = this.addPost.bind(this);
  }

  renderImageTextInput = (key) => { 
    const fieldsRequired = [ 'subTitle', 'Image', 'Iframe', 'text', 'list']
    
    const fields = fieldsRequired.map(field => 
      <div className="form-group">
        <label htmlFor={field}>{field}</label>
        { field !== 'text' && 
          <input 
            type="text"
            className="form-control" 
            name={`${key.replace('key', field)}`}
            onChange={this.updateFieldValue}
          />
        }
        { field === 'text' && 
          <textarea
            name={`${key.replace('key',field)}`} 
            className="form-control"
            rows="3"
            id="text"
            onChange={this.updateFieldValue}
          >
          </textarea>
        }
      </div>
    )

    return (
      <div key={key}>
        {fields}
      </div>
    );
  }

  addMoreInput = e => {
    e.stopPropagation();
    this.setState({
      numberOfInputs: this.state.numberOfInputs += 1,
    });
  }

  addPost(e){
    e.preventDefault();
    const dbRef = firebase.database().ref().child('meBlog');
    dbRef.push(this.state);
    this.props.closeForm();
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

  render(){
    const { numberOfInputs, title } = this.state;
    const { closeForm, editingPost } = this.props;

    let newNoOfInputs = numberOfInputs;
    let list =[];
    let key = 0;

    repeat(newNoOfInputs)(() => {
      list.push(this.renderImageTextInput(`key${key++}`))
    })

    return (
        <form className="form-horizontal" onSubmit={this.addPost}>     
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text"
              className="form-control" 
              name="title"
              onChange={this.updateFieldValue}
              value={title}
              required
            />
          </div>
          {list}
          <div className="form-group">        
            <div className="buttonPair">
              <button 
                type="button"
                className="btn btn-success btn-xs"
                onClick={this.addMoreInput}
              >
                Add More
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

export default AddForm;