import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './css/ErrorModal.css'; 

export default function ErrorModal({ show, onHide, errors }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>⚠ Ooops! Something went wrong...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted">
          There were some issues with your request. Please check the following errors:
        </p>
        <ul className="error-list">
          {errors && errors.map((error, index) => (
            <li key={index} className="error-item">
              <span className="error-icon">❌</span> {error}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
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