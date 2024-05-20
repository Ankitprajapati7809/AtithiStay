import { toast } from 'react-toastify';

export const showSuccessMessage = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
  }); 
};

export const showErrorMessage = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const showInfoMessage = (message) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};
