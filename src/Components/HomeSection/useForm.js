import { useState,useEffect } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({
    idoc: '',
    ndoc: '',
    contraseña: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    console.log("hai");
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Añadir logica en db
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (isSubmitting) {
        callback();
      }
    }
  );

  return { handleChange, handleSubmit, values };
};

export default useForm;