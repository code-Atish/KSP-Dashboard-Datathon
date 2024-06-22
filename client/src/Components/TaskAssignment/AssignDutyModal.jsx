// src/AssignDutyModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const AssignDutyModal = ({ show, handleClose, duty, day, assignDuty }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      axios.get(`${apiUrl}/officers?search=${searchTerm}`)
        .then(response => setOfficers(prev=>response.data))
        .catch(error => console.error('Error fetching officers:', error));
    } else {
      setOfficers([]);
    }
  }, [searchTerm]);

  const handleSelectOfficer = (officer) => {
    setSelectedOfficer(officer);
  };

  const handleAssign = () => {
    if (selectedOfficer) {
      assignDuty(selectedOfficer.id, duty, day);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Duty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Search Officer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter officer name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <ListGroup>
          {officers.map((officer) => (
            <ListGroup.Item
              key={officer.id}
              action
              onClick={() => handleSelectOfficer(officer)}
              active={selectedOfficer?.id === officer.id}
            >
              {officer.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAssign} disabled={!selectedOfficer}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignDutyModal;
