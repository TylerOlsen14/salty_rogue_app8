import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class RecordList extends Component{
  state = {
    records: [],
  }

  getRecords = async () => {
    const url = 'mongodb://Tucker:Tucker@cluster0-shard-00-00-tihhu.mongodb.net:27017,cluster0-shard-00-01-tihhu.mongodb.net:27017,cluster0-shard-00-02-tihhu.mongodb.net:27017/test.records?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
    // const url = 'localhost:5000/api/record'
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ records: data })
      .catch(error => console.log('Error:', error))
      )}
  
  async componentWillMount() {
    await this.getRecords
  }

  render() {
    console.log(this);
    console.log(this.state);
    console.log(this.state.records);
    const { records } = this.state;
    return(
      <Container>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const record = prompt('Add Record');
            if(record) {
              this.setState(state => ({
                records: []
                // records: [...state.records, {id: uuid(), name }]
              }));
            }
          }}
        >
          Add Record
        </Button>
        <ListGroup>
          <TransitionGroup className="Records-List">
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
                  <div>
                    {this.state.record.map((record,index) => {
                        return (
                      <div className="border" key={index}>
                        <h5>Client Name: </h5>{ClientName}
                        <h5>Client Phone Number: </h5>{ClientPhoneNumber}
                      </div>
                        )
                      })
                    }
                  </div>
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