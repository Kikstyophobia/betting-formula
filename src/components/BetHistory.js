import React, { useState, useContext } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import statistic from '../assets/statistic.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "50%",
  maxWidth: "800px",
  maxHeight: "500px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};


export default function BetHistory({ history }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const columns = [
    {
      id: 'race',
      label: 'Race',
      minWidth: 100,
      maxWidth: 200,
      align: 'left',
    },
    {
      id: 'betDriver',
      label: 'Bet',
      minWidth: 100,
      maxWidth: 200,
      align: 'left',
    },
    {
      id: 'winLose',
      label: 'Win / Lose',
      minWidth: 75,
      maxWidth: 200,
      align: 'center',
    },
    {
      id: 'bet',
      label: 'Bet Amount',
      align: 'center',
      minWidth: 75,
      maxWidth: 200
    },
    {
      id: 'balance',
      label: 'Balance',
      align: 'center',
      minWidth: 75,
      maxWidth: 200
    }
  ];

  return (
    <div>
      <img src={statistic} height={25} onClick={handleOpen} ></img>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            <p>Bet History</p>

            <div className="bet-history-list">

              <TableContainer sx={{ maxHeight: 340 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell
                          key={index}
                          align={column.align}
                          style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history
                      .map((row, index) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map((column) => {
                              const value = row[column.id];

                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format ? column.format(value) : value}
                                </TableCell>
                              );

                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

            </div>


          </Typography>

        </Box>
      </Modal>
    </div>
  );
}