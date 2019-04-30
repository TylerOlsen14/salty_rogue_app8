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
import { connect } from 'react-redux';
import { addRecord } from '../actions/recordActions';
import uuid from 'uuid'

class RecordModal extends Component {
  state = {
    modal: false,
    clientName: '',
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({ 
      [e.target.clientName]: e.target.value,
      [e.target.clientPhoneNumber]: e.target.value,
      [e.target.clientConversation]: e.target.value,    
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const newRecord = {
      id: uuid(),
      clientName: this.state.clientName,
      clientPhoneNumber: this.state.clientPhoneNumber,
      clientConversation: this.state.clientConversation
    }

    // Add record via AddRecord action
    this.props.addRecord(newRecord);

    //Close modal
    this.toggle();
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
              <FormGroup>
                <Label for="record">
                  Phone Record - Keep our conversations and discussions in order
                </Label>
                <Input 
                  type="text"
                  name="clientName"
                  id="item"
                  placeholder="Client Name"
                  onChange={this.onChange}
                />
                <Input 
                  type="number"
                  name="clientPhoneNumber"
                  id="item"
                  placeholder="Create Phone Number"
                  onChange={this.onChange}
                />
                <Input 
                  type="text"
                  name="clientConversation"
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

const mapStateToProps = state => ({
  record: state.record
})

export default connect(mapStateToProps, { addRecord })( RecordModal );