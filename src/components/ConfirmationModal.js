import { Box, Button, Modal, Zoom } from '@mui/material'; // Thêm Slide vào import
import Map from '../components/Map/map';

const style = {
  outline: 'none',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center'
};

const ConfirmationModal = ({ open, handleClose, handleConfirm, title, content, content2, modelCountry, isMaxLevel, isLoading }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        border: 'none',
        outline: 'none',
        "&:focus": {
          outline: 'none',
        },
        afterFocus: {
          outline: 'none',
        },
        "&::after": {
          outline: 'none',
          border: 'none',
        },
        "&::before": {
          outline: 'none',
          border: 'none',
        }
      }}
    >
      <Zoom in={open}>
        <Box
          style={style}
        >
          {title === 'Boost Map' && <Map modelCountry={modelCountry} />}
          <Box
            sx={{
              width: '100%',
              background: 'linear-gradient(to bottom, #F3E2A3, #F3E2A3)',
              boxShadow: 'inset 2px 0 24px #41310035',
              borderTopRightRadius: '14px',
              borderTopLeftRadius: '14px',
              p: 0,
              textAlign: 'center',
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            <h2 id='drawer-title' className='akaInDic' style={{ marginBlockEnd: '0.3em' }}>{title}</h2>
            <p id='drawer-description' style={{ marginBlockStart: '0.3em', marginBlockEnd: '0.3em' }}>{content}</p>
            <p id='drawer-description' style={{ marginBlockStart: '0.3em', marginBlockEnd: '0.3em' }}>{content2}</p>
            <div className='drawer-buttons'>
              {isMaxLevel && title === 'Boost Map' ? (
                <Button
                  variant='contained'
                  onClick={handleClose}
                  id="cancel"
                  style={{
                    width: '30%',
                    transform: 'translateX(120%)',
                  }}
                >
                  Cancel
                </Button>
              ) : <Button
                variant='contained'
                onClick={handleClose}
                id="cancel"
              >
                Cancel
              </Button>}
              {title === 'Boost Map' ? (
                !isMaxLevel && (
                  <Button
                    variant='contained'
                    onClick={!isLoading ? handleConfirm : null}
                    id="confirm2"
                    sx={{ marginRight: 2 }}
                  >
                    <img
                      src={'/images/matic.png'}
                      alt='Lotus Icon'
                      style={{ paddingRight: '5px', width: '22px', height: '22px' }}
                    />
                    0.0001
                  </Button>
                )
              ) : (
                (
                  <Button
                    variant='contained'
                    onClick={!isLoading ? handleConfirm : null}
                    id="confirm"
                    sx={{ marginRight: 2 }}
                  >
                    <img
                      src={'/images/nir-logo.svg'}
                      alt='Lotus Icon'
                      style={{ paddingRight: '5px', width: '22px', height: '22px' }}
                    />
                    2
                  </Button>
                )
              )}
            </div>
          </Box>
        </Box>
      </Zoom>
    </Modal>
  );
};

export default ConfirmationModal;