import React, { Component } from 'react';
import '../css/index.css';

class Menu extends Component {
  constructor(props){
    super(props)
    this.state= {}
  }

  render() {
    const { posts } = this.props;
    return (
      <aside className="Menu info aside section">
        { posts && 
          <ul className="list-group">
            { Object.keys(posts).map(key => {
                return(
                  <li 
                    key={key}
                    className="list-group-item"
                  >
                    <a href={`#${key}`}>
                      <span>{posts[key].title}</span>
                      <span>{posts[key].today}</span>
                    </a>
                  </li>
                );                
              }) 
            }
          </ul>
        }
        {!posts &&
          <h4>need to add some posts</h4>
        }
      </aside>
    );
  }
}

export default Menu;
