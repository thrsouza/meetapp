import { toast } from 'react-toastify';

const success = (message) => {
  if (message) {
    toast.info(message);
  } else {
    toast.info('Informações salvas com sucesso!');
  }
};

const error = (message) => {
  toast.error(message);
};

const unexpectedError = () => {
  toast.error('Ocorreu um erro inesperado.');
};

const invalidFieldsError = ({ data }) => {
  if (data.error) {
    unexpectedError();
  } else if (Array.isArray(data)) {
    error('Preencha o formulário corretamente.');
  }
};

export default {
  success,
  error,
  unexpectedError,
  invalidFieldsError,
};
