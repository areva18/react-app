import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Delete() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/list/${id}`).then((res) => {
      setContacts(res.data);
    });
  }, [id]);

  function deleteContacts(id) {
    axios.delete(`http://localhost:3001/list/${id}`).then(navigate('/'));
    window.confirm(`Are you sure you want to delete the record?`);
  }
  console.log(contacts);

  return (
    <>
      <div className='w-screen h-full flex flex-col justify-center items-center'>
        <h2 className='text-4xl font-bold text-green-600 font-extrabold leading-loose'>
          DELETE CONTACT DETAILS
        </h2>

        {contacts && (
          <div className='w-[800px] h-[500] px-6 py-4 flex shadow-xl rounded-xl justify-center items-center bg-teal-700 mt-5 border-teal-800 border-2'>
            <div className='w-5/12 flex flex-col space-y-4'>
              <h2 className='text-white font-bold text-3xl text-left'>Id :</h2>
              <h2 className='text-white font-bold text-3xl text-left'>
                Full Name :
              </h2>
              <h2 className='text-white font-bold text-3xl text-left'>
                Email Address :
              </h2>
              <h2 className='text-white font-bold text-3xl text-left '>
                Contact Number :
              </h2>
              <h2 className='text-white font-bold text-3xl text-left'>
                Location :
              </h2>
              <h2 className='text-white font-bold text-3xl text-left '>
                Registered Date :
              </h2>
            </div>
            <div className='w-7/12 flex flex-col space-y-4  '>
              <h2 className='text-teal-200 font-bold text-3xl '>
                {contacts.id}
              </h2>
              <h2 className='text-teal-200 font-bold text-3xl '>
                {contacts.name}
              </h2>
              <h2 className='text-teal-200 font-bold text-3xl '>
                {contacts.email}
              </h2>
              <h2 className='text-teal-200 font-bold text-3xl '>
                {contacts.phone}
              </h2>
              <h2 className='text-teal-200 font-bold text-3xl '>
                {contacts.location}
              </h2>
              <h2 className='text-teal-200 font-bold text-3xl '>
                {contacts.date}
              </h2>
            </div>
          </div>
        )}
      </div>
      <div>
        <Link
          to={`/`}
          className='hover:bg-teal-600 bg-white hover:shadow-md outline-none rounded-xl font-bold border w-3/4 mt-8 hover:text-teal-200 text-teal-600 border-zinc-400 text-center py-4 px-32 pl-4 '
        >
          Back
        </Link>

        <button
          className='hover:bg-red-600 bg-white hover:shadow-md text-center outline-none rounded-xl font-bold border w-48 mt-8 hover:text-red-200 text-red-600 border-zinc-400 py-4 px-4 pl-4 ml-5'
          type='submit'
          onClick={() => deleteContacts(id)}
          to={'#'}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default Delete;
