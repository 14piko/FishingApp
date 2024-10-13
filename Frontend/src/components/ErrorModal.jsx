import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
export default function ErrorModal({ show, onHide, errors }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Ups!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {errors}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
ErrorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  errors: PropTypes.array,
};