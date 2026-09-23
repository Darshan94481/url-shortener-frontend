import * as React from 'react';
import Modal from '@mui/material/Modal';
import CreateNewShorten from './CreateNewShorten';

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create-shorten-title"
      className="backdrop-blur-sm bg-slate-900/40 transition-all"
    >
      <div className="flex justify-center items-center min-h-screen px-4 py-6 outline-none">
        <CreateNewShorten setOpen={setOpen} refetch={refetch} />
      </div>
    </Modal>
  );
};

export default ShortenPopUp;
