import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Add() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();
  const data = {
    name: name,
    email: email,
    phone: phone,
    location: location,
    date: date,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
  };

  function submitForm(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/list', data).then(navigate('/'));
  }

  return (
    <div className='w-screen h-full flex flex-col justify-center items-center mt-16'>
      <h2 className='text-4xl font-bold text-green-600 font-extrabold leading-loose'>
        ADD NEW CONTACT
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
        className='w-[50%] h-full flex flex-col mt-2'
      >
        <label class='text-left text-lg leading-normal text-zinc-400 leading-normal font-bold indent-3'>
          FULL NAME
        </label>
        <input
          {...register('name', {
            required: 'Full Name field cannot be blank',
            maxLength: {
              value: 30,
              message: 'Full name field accept up to 30 in size only',
            },
            pattern: {
              value: /^[A-Za-z\\,\\. ]+$/i,
              message: 'Full name field accept characters values only',
            },
          })}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='bg-white/10 outline-none font-normal border border-zinc-400
        rounded-lg py-4 pl-4 mt-2'
          type='text'
          placeholder='Last Name First Name
        Middle Initial'
        />
        <p className='text-red-500 text-left indent-3 mb-3 font-normal'>
          {errors.name?.message}
        </p>
        <label class='text-left text-lg leading-normal text-zinc-400 leading-normal font-bold indent-3'>
          EMAIL ADDRESS
        </label>
        <input
          {...register('email', {
            required: 'Email field cannot be blank',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email address field should have email domain',
            },
            maxLength: {
              value: 45,
              message: 'Email address field accept up to 45 in size only',
            },
          })}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-white/10 outline-none font-normal border border-zinc-400 rounded-lg py-4 pl-4 mt-2'
          type='email'
          placeholder='example@email.com'
          required='true'
        />
        <p className='text-red-500 text-left indent-3 mb-3 font-normal'>
          {errors.email?.message}
        </p>
        <label class='text-left text-lg leading-normal text-zinc-400 leading-normal font-bold indent-3'>
          CONTACT NUMBER
        </label>
        <input
          {...register('phone', {
            required: 'Contact field cannot be blank',
            pattern: {
              value: /^[0-9\b]+$/i,
              message: 'Contact field accept numeric values only',
            },
            maxLength: {
              value: 11,
              message: 'Contact number field accept up to 11 in size only',
            },
            minLength: {
              value: 11,
              message: 'Contact number field accept up to 11 in size only',
            },
          })}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='bg-white/10 outline-none font-normal border border-zinc-400 rounded-lg py-4 pl-4 mt-2'
          placeholder='999999999'
        />
        <p className='text-red-500 text-left indent-3 mb-3 font-normal'>
          {errors.phone?.message}
        </p>
        <label class='text-left text-lg leading-normal text-zinc-400 leading-normal font-bold indent-3'>
          LOCATION
        </label>
        <select
          {...register('location', {
            required: 'Location field cannot be blank',
          })}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='bg-white/10 outline-none font-normal border border-zinc-400 rounded-lg py-4 pl-4 mt-2'
          type='text'
          placeholder='Select Location'
        >
          <option value='' disabled={true}>
            Select Location
          </option>
          <option value='Manila'>Manila</option>
          <option value='Cebu'>Cebu</option>
        </select>
        <p className='text-red-500 text-left indent-3 mb-3 font-normal'>
          {errors.location?.message}
        </p>
        <label class='text-left text-lg leading-normal text-zinc-400 leading-normal font-bold indent-3'>
          REGISTERED DATE
        </label>
        <input
          {...(register &&
            date === null &&
            ('date',
            {
              required: 'Date field cannot be blank',
            }))}
          value={date}
          className='bg-white/10 outline-none font-normal border border-zinc-400 rounded-lg py-4 pl-4 mt-2'
          datepicker
          datepicker-format='mm/dd/yyyy'
          type='text'
          placeholder='Select Current Date'
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
          onChange={(e) => setDate(e.target.value)}
        />
        <p className='text-red-500 text-left indent-3 mb-3 font-normal'>
          {errors.date?.message}
        </p>
        <div>
          <button
            className='bg-teal-600 outline-none font-bold border text-white rounded-lg border-zinc-400 w-2/4 py-4 pl-4 mt-4 '
            type='submit'
            onClick={submitForm}
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
