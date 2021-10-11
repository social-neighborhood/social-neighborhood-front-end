import React from 'react';
import './LoginFormElements.css';
import useForm from './useForm';
const LoginForm = ({ submitForm }) => {
    const { handleChange, handleSubmit, values } = useForm(
      submitForm
    );
  
  return (
    <div className='form-content'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <div className='form-inputs'>
          <label className='form-label'>idoc</label>
          <input
            className='form-input'
            type='text'
            name='idoc'
            placeholder='Enter your username'
            value={values.idoc}
            onChange={handleChange}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>ndoc</label>
          <input
            className='form-input'
            type='text'
            name='ndoc'
            placeholder='Enter your username'
            value={values.ndoc}
            onChange={handleChange}
          />
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='contraseña'
            placeholder='Enter your Password'
            value={values.contraseña}
            onChange={handleChange}
          />
        </div>
        <button className='form-input-btn' type='submit'>
          Send
        </button>
      </form>
    </div>
  );
};

export default LoginForm;