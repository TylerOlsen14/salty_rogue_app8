import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RecordModal from './RecordModal'

class RecordList extends Component{
  state = {
    records: [],
  }

  getRecords = async () => {
    await fetch('http://localhost:5000/')
      .then(response => {
        return response.json();
      })
      .then(data => 
        this.setState({ records: data }))
      .catch(error => console.log('Error:', error))
      }
  
  componentWillMount() {
    this.getRecords()
  }

  onDeleteClick = async (_id) => {
    await fetch('http://localhost:5000/' + _id, {
      method: "DELETE"
    })
    .then(resp => {
      this.getRecords();
  });
}

  render() {
    console.log(this);
    console.log(this.state);
    console.log(this.state.record);
    return(
      <Container>
        <RecordModal refresh={this.getRecords}/> 
        {/* //takes function, assigns it a prop, to a child component. Child component can call the function because I'm passing it in. */}
        <ListGroup>
          <TransitionGroup className="Records-List">
            {this.state.records.map((record, _id) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                        <h5>Client Name: {record.ClientName}</h5>
                        <h5>Client Phone Number: {record.ClientPhoneNumber}</h5>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.onDeleteClick(record._id)}
                    >
                    &times;
                  </Button>
                  
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}


export default RecordList