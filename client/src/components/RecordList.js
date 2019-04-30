import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
  // async componentWillMount() {
  //   await this.getRecords
  // }

  onDeleteClick = (id) => {
    this.props.deleteRecord(id)
  }

  render() {
    console.log(this);
    console.log(this.state);
    console.log(this.state.record);
    // const { record } = this.state;
    return(
      <Container>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const record = prompt('Add Record');
            if(record) {
              this.setState(state => ({
                records: [...state.records]
                // records: [...state.records, {id: uuid(), name }]
              }));
            }
          }}
        >
          Add Record
        </Button>
        <ListGroup>
          <TransitionGroup className="Records-List">
            {this.state.records.map((record, _id) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                        <h5>Client Name: {record.ClientName}, {record._id}</h5>
                        <h5>Client Phone Number: {record.ClientPhoneNumber}</h5>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
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