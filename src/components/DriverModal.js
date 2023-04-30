import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './DriverModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default function DriverModal({ driver }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{driver.name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            {driver.name} {driver.driverInfo.country_code}
          </Typography>
          <div className='modal-driver'>
            Car Number: {driver.driverInfo.result.car_number}
            Nationality: {driver.driverInfo.nationality}
          </div>
          <div className='modal-team'>
            <p><strong>Team: </strong> {driver.driverInfo.team.name}</p>
            <p><strong>Team Nationality: </strong>{driver.driverInfo.team.nationality}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}