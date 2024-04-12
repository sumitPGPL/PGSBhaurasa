// import React, { useState } from 'react';
// import DeleteButton from '@/components/UploadEvents/EventTable/DeleteButton/delete';
//   // Import the DeleteConfirmationModal component

// const EventTable = ({ events, onDelete, onEdit }) => {
//   console.log(events)
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedEventId, setSelectedEventId] = useState(null);

//   const handleDelete = (uuid) => {
//     setSelectedEventId(uuid);
//     setShowDeleteModal(true);
//   };

//   const handleEdit = (uuid) => {
//     onEdit(uuid);
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteModal(false);
//     setSelectedEventId(null);
//   };

//   const handleConfirmDelete = () => {
//     onDelete(selectedEventId);
//     setShowDeleteModal(false);
//     setSelectedEventId(null);
//   };

//   return (
//     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//           <tr>
//             <th scope="col" className="px-6 py-3">
//               Title
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Description
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Action
//             </th>
//             <th scope="col" className="px-6 py-3">
//               Update
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((event, index) => (
//             <tr
//               key={index}
//               className={`${
//                 index % 2 === 0
//                   ? 'even:bg-gray-50 even:dark:bg-gray-800'
//                   : 'odd:bg-white odd:dark:bg-gray-900'
//               } border-b dark:border-gray-700`}
//             >
//               <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                 {event.title}
//               </td>
//               <td className="px-6 py-4">{event.description}</td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleDelete(event.uuid)}
//                   className="font-medium text-red-600 dark:text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//               <td className="px-6 py-4">
//                 <button
//                   onClick={() => handleEdit(event.uuid)}
//                   className="font-medium text-purple-600 dark:text-purple-500 hover:underline"
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showDeleteModal && (
//         <DeleteButton onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
//       )}
//     </div>
//   );
// };

// export default EventTable;
"use client";
import React, { useState, useEffect } from "react";
import DeleteButton from "@/components/Event/delete";
import Pagination from "@/components/Pagination/Pagination"; // Import your Pagination component

const EventTable = ({ events, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Set your desired items per page
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [paginatedEvents, setPaginatedEvents] = useState([]);

  useEffect(() => {
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    setPaginatedEvents(events.slice(indexOfFirstEvent, indexOfLastEvent));
  }, [currentPage, itemsPerPage, events]);

  const handleDelete = (uuid) => {
    setSelectedEventId(uuid);
    setShowDeleteModal(true);
  };

  const handleEdit = (uuid) => {
    onEdit(uuid);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedEventId(null);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedEventId);
    setShowDeleteModal(false);
    setSelectedEventId(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Update
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedEvents.map((event, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "even:bg-gray-50 even:dark:bg-gray-800"
                  : "odd:bg-white odd:dark:bg-gray-900"
              } border-b dark:border-gray-700`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {event.title}
              </td>
              <td className="px-6 py-4">{event.description}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(event.uuid)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(event.uuid)}
                  className="font-medium text-purple-600 dark:text-purple-500 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination component */}
      <Pagination
        totalItems={events.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <DeleteButton
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default EventTable;
