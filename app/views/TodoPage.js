/**
 * Created by eatong on 17-3-13.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

@inject('todo') @observer
class TodoPage extends React.Component {

  render() {
    const {todo} = this.props;
    return (
      <div className="home-page">

      </div>
    );
  }
}
export default TodoPage;
