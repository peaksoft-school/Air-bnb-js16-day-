import Box from '@mui/material/Box'
import { Modal as MuiModal, styled } from '@mui/material'

const Modal = ({ open, handleClose, children }) => (
   <MuiModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
   >
      <StyledBox onClick={(e) => e.stopPropagation()}>{children}</StyledBox>
   </MuiModal>
)

export default Modal

const StyledBox = styled(Box)(() => ({
   width: '474px',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   borderRadius: '8px',
   backgroundColor: '#fff',
   padding: '25px',
   boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
   zIndex: 1300,
}))
