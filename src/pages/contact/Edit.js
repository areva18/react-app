import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Add() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/list/${id}`).then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      setLocation(res.data.location);
      setDate(res.data.date);
    });
  }, [id]);

  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const navigate = useNavigate();

  const data = {
    name: name,
    email: email,
    phone: phone,
    location: location,
    date: date,
  };

  function Update(e) {
    e.preventDefault();
    axios.put(`http://localhost:3001/list/${id}`, data).then(navigate('/'));
    alert(`Update Contact successfully`, +id);
  }
  return (
    <div className='w-screen h-full flex flex-col justify-center items-center'>
      <h2 className='text-4xl font-bold text-green-600 font-extrabold leading-loose'>
        UPDATE CONTACT DETAILS
      </h2>
      <form className='w-[50%] h-full flex flex-col'>
        <label class='text-left text-lg leading-normal text-zinc-400 leading-normal font-bold indent-3'>
          ID
        </label>
        <input
          disabled
          value={id}
          className='bg-white/10 outline-none font-normal border border-zinc-400
        rounded-lg py-4 pl-4 mt-2'
        />
        <p className='text-red-500 text-left indent-3 mb-3 font-normal'>
          {errors.name?.message}
        </p>
        <label class='text-left text-lg leading-normal text-zinc-400 leading-normal font-bold indent-3'>
          FULL NAME
        </label>
        <input
          disabled
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
          value={name + ' (view)'}
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
          disabled
          {...register('date', {
            required: 'Registered date field cannot be blank',
          })}
          datepicker
          type='text'
          class='bg-gray-50 border border-zinc-400 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Select Current Date'
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
          dateFormat='MM/dd/yyyy'
          onChange={(e) => setDate(e.target.value)}
          value={date + ' (view)'}
          className='bg-white/10 outline-none font-normal border border-zinc-400 rounded-lg py-4 pl-4 mt-2'
        />
        <p className='text-red-500 text-left indent-3 font-normal'>
          {errors.date?.message}
        </p>
        <div>
          <Link
            to={`/`}
            className='hover:bg-teal-600 bg-white hover:shadow-md outline-none rounded-xl font-bold border w-3/4 hover:text-teal-200 text-teal-600 border-zinc-400 text-center py-4 px-32 pl-4 '
          >
            Back
          </Link>
          <button
            className='hover:bg-red-600 bg-white hover:shadow-md text-center outline-none rounded-xl font-bold border w-48 mt-8 hover:text-red-200 text-red-600 border-zinc-400 py-4 px-4 pl-4 ml-5'
            type='submit'
            onClick={Update}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
