import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Home() {
  const [contacts, setContacts] = useState([]);

  const [pageCount, setPageCount] = useState(0);

  let limit = 5;

  function loadContacts() {
    axios.get('http://localhost:3001/list').then((res) => {
      setContacts(res.data);
    });
  }

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    const getContacts = async () => {
      const res = await fetch(`
        http://localhost:3001/list?_page=1&_limit=${limit}`);
      const data = await res.json();
      const total = res.headers.get('x-total-count');
      setPageCount(Math.ceil(total / limit));
      setContacts(data);
    };
    getContacts();
  }, [limit]);

  const fetchContacts = async (currentPage) => {
    const res = await fetch(
      `http://localhost:3001/list?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const contactsFormServer = await fetchContacts(currentPage);

    setContacts(contactsFormServer);
  };

  return (
    <>
      <div className='w-[100vw] h-full justify-center items-center flex flex-col  mt-2'>
        <h1 className='text-3xl font-bold'>Contact List Management App</h1>
        <div className='flex flex-col'>
          <div className='overflow-x-auto sm:-mx-4 items-center lg:-mx-6'>
            <div className='py-4 inline-block min-w-full sm:px-6 lg:px-6'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-center'>
                  <thead className='border-b bg-gray-800'>
                    <tr>
                      <th
                        scope='col'
                        className='text-sm font-medium text-white px-4 py-4'
                      >
                        Id
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-lg text-white px-4 py-4'
                      >
                        Full Name
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-lg text-white px-4 py-4'
                      >
                        Email Address
                      </th>

                      <th
                        scope='col'
                        className='text-sm font-lg text-white px-4 py-4'
                      >
                        Contact Number
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-lg text-white px-4 py-4'
                      >
                        Location
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-lg text-white px-4 py-4'
                      >
                        Registered Date
                      </th>
                      <th
                        scope='col'
                        className='text-sm font-lg text-white px-4 py-4'
                      ></th>
                    </tr>
                  </thead>
                  <tbody className='border-black border-b-2'>
                    {contacts.map((data, index) => (
                      <tr
                        key={index}
                        className='bg-white border-b-2 border-black'
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 '>
                          {index + 1}
                        </td>
                        <td className='text-sm text-gray-900 font-semibold px-4 py-4 whitespace-nowrap'>
                          {data.name}
                        </td>
                        <td className='text-sm text-gray-900 font-semibold px-4 py-4 whitespace-nowrap'>
                          {data.email}
                        </td>
                        <td className='text-sm text-gray-900 font-semibold px-4 py-4 whitespace-nowrap'>
                          {data.phone}
                        </td>
                        <td className='text-sm text-gray-900 font-semibold px-4 py-4 whitespace-nowrap'>
                          {data.location}
                        </td>
                        <td className='text-xl text-gray-900 font-semibold px-4 py-4 whitespace-nowrap'>
                          {data.date}
                        </td>
                        <td className='text-sm flex justify-between  items-center text-gray-900 font-bold px-4 py-4 space-x-4 whitespace-nowrap'>
                          <Link
                            to={`/list/${data.id}`}
                            className='bg-teal-600 text-white px-4 py-2 rounded-lg'
                          >
                            View
                          </Link>
                          <Link
                            to={`/edit-contact/${data.id}`}
                            className='bg-blue-600 text-white px-4 py-2 rounded-lg'
                          >
                            Update
                          </Link>
                          <Link
                            to={`/delete-contact/${data.id}`}
                            className='bg-red-600 text-white px-4 py-2 rounded-lg'
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='Home'>
          {data} */}
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
}

export default Home;
