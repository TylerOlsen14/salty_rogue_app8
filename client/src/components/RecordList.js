import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';

const mongodb = 'mongodb://Tucker:Tucker@cluster0-shard-00-00-tihhu.mongodb.net:27017,cluster0-shard-00-01-tihhu.mongodb.net:27017,cluster0-shard-00-02-tihhu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

const getRecords = {
  fetch(mongodb, {
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
}


class RecordList extends Component{
  state= {
    records: [
      { id: uuid(), ClientName: 'Tyler', ClientPhoneNumber: 8, ClientNotes: 'We talked' },
      { id: uuid(), ClientName: 'Chloe', ClientPhoneNumber: 5, ClientNotes: 'We laughed' },
      { id: uuid(), ClientName: 'Carter', ClientPhoneNumber: 6, ClientNotes: 'We drank' },
      { id: uuid(), ClientName: 'Laurel', ClientPhoneNumber: 7, ClientNotes: 'We ate' },
    ]
  }

  render() {
    const { records } = this.state;
    return(
      <Container>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const name = prompt('Add Record');
            if(name) {
              this.setState(state => ({
                records: [...state.records, {id: uuid(), name }]
              }));
            }
          }}
        >
          Add Record
        </Button>
        <ListGroup>
          <TransitionGroup className="Record-List">
            {records.map(({ id, ClientName, ClientPhoneNumber, ClientNotes}) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      this.setState(state => ({
                        records: state.records.filter(record => record.id !==id)
                      }))
                    }}
                    >
                    &times;
                  </Button>
                  {ClientName}, {ClientPhoneNumber}
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