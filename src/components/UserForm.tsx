import { TextField } from "@mui/material";
import { createTheme,Button,Dialog,DialogActions,DialogContent,DialogTitle } from "@mui/material";
import {useState} from 'react';
import { ThemeProvider, styled } from '@mui/system'; 
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

const FormContainer = styled('div')({
    textAlign: 'center',
    padding: theme.spacing(4),
    background: '#f0f0f0'
  });

  const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '400px',
    margin: '0 auto',
  });

  const SubmitButton = styled(Button)({
    marginTop: theme.spacing(2),
  });

  const Heading = styled('h2')({
  color: '#000', 
  fontSize: '28px', 
  marginBottom: theme.spacing(2), 
  textTransform: 'uppercase'
  })


const UserForm: React.FC = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        name:'',
        phoneNumber:'',
        email:'',
    });

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = () => {
        if (formData.name && formData.phoneNumber && formData.email) {
          localStorage.setItem('userDetails', JSON.stringify(formData));
          navigate('/second-page');
        } else {
          handleOpen(); 
        }
      };
  

  return (
    <ThemeProvider theme={theme}>
        <FormContainer>
            <Heading>User Data</Heading>
            <Form>
              <TextField
                label="Name"
                name="name"
                onChange={handleInputChange}
                value={formData.name}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              <SubmitButton
                 variant="contained"
                 color="primary"
                 onClick={handleSubmit}
                >
                  Submit
              </SubmitButton>
      
            </Form>
            <Dialog open={open} onClose={handleClose} >
              <DialogTitle>Incomplete Form</DialogTitle>
                 <DialogContent>
                    Please fill in all fields before submitting.
                 </DialogContent>
                 <DialogActions>
                    <Button onClick={handleClose} color="primary">
                       OK
                    </Button>
                 </DialogActions>
            </Dialog>
        </FormContainer>

    </ThemeProvider>
  );
};

export default UserForm;
