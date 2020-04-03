import React from "react";

import "./styles.css";

class DiscussionBoardU extends React.Component {

  // Generic handler for whenever we type in an input box.
  // We change the state for the particular property bound to the textbox from the event.
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // log(name)

    // 'this' is bound to the component in this arrow function.
    this.setState({
      [name]: value // [name] sets the object property name to the value of the 'name' variable.
    });
  };

  // Each section of the Queue now has its own componenet, cleaning up the
  // JSX a lot.
  render() {
    return (
      <div>
        <div className = "title">
          <h1>User Discussion Board</h1>
          <h2>Questions for You</h2>

          <p>CSC309: React for Phase 1</p>
          <p>CSC384: A2 Time Limit For Search and Model Generation</p>

        </div>
        
        <div className = "profile">  </div>


      </div>
    );
  }
}

export default DiscussionBoardU;
