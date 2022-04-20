import {useState} from 'react';

const useForm = (callback, initSate) => {
  const [inputs, setInputs] = useState(initSate);
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputChange = (event) => {
    event.persist && event.persist();
    console.log(event.target);
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.files
        ? event.target.files[0]
        : event.target.value,
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useForm;
