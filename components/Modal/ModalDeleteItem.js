import React from "react";
import Modal from "./index";
import { HStack, Button } from "@chakra-ui/react";

export default function ModalDeleteItem({ open, onClose, item, onDelete }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Are you sure delete this ${item ?? "item"}?`}
    >
      <HStack spacing="4" justifyContent="center">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={onDelete}>
          Delete
        </Button>
      </HStack>
    </Modal>
  );
}
