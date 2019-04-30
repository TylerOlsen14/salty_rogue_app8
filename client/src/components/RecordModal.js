import React, { Component } from 'react';
import {
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from 'reactstrap';

class RecordModal extends Component {
  state = {
    modal: false,
    ClientName: '',
    ClientPhoneNumber: '',
    ClientConversation: '',
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    this.props.onSubmit(this.state)
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    console.log(this.state)
    this.setState({ 
      [e.target.name]: e.target.value,   
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    await fetch(`http://localhost:5000/`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
          "Content-Type": "application/json",
        }
      }
    )};
    
  newRecord = {
    ClientName: this.state.ClientName,
    ClientPhoneNumber: this.state.ClientPhoneNumber,
    ClientConversation: this.state.ClientConversation
  }

  render() {
    return(
      <div>
        <Button
          color="dark"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >
          Add Record
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader
            toggle={this.toggle}
          >
            Create New Record
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup onSubmit={this.handleSubmit}>
                <Label for="record">
                  Phone Record - Keep our conversations and discussions in order
                </Label>
                <Input 
                  type="text"
                  name="ClientName"
                  id="item"
                  placeholder="Client Name"
                  onChange={this.onChange}
                />
                <Input 
                  type="number"
                  name="ClientPhoneNumber"
                  id="item"
                  placeholder="Create Phone Number"
                  onChange={this.onChange}
                />
                <Input 
                  type="text"
                  name="ClientConversation"
                  id="item"
                  placeholder="Create record"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                  Create Phone Record
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ( RecordModal );