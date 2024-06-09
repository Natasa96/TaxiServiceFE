import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function AcceptRideModal({ onClick, isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Accept new ride</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Hello!</ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={onClick}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

AcceptRideModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AcceptRideModal;
