"use client";
import React, { useState, useEffect } from "react";
import EventForm from "@/components/Event/EventForm"; // Assuming you have an EventForm component
import { addEvent, updateEvent } from "@/lib/services/events/eventSevices"; // Replace with your actual API path
import Loader from "@/components/Loader/Loader";
import { validator } from "@/lib/helpers/validator";
import Notification from "@/components/Toast/Notification";
import { scrollToTop } from "@/lib/helpers/scrollToTopOfContainer";
import moment from "moment";
import { uploadImg } from "@/lib/services/files/fileServices";
export const EVENTS_INITIAL = {
  title: "",
  description: "",
  thumbNail: "",
  location: "",
  startDate: "",
  category: "",
  endDate: "",
  OrganizationUuid: "89e7bf84-7422-42f4-b5e4-acc76b582dd6",
  type: "",
  registrationRequired: false,
  capacity: 0,
  registeredParticipants: 0,
};
const fields = [
  { name: "title", label: "Title", type: "text", placeholder: "Enter Title" },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter Description",
  },
  {
    name: "thumbNail",
    label: "Thumbnail",
    type: "file",
    placeholder: "Upload Thumbnail",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Enter Location",
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "date-time",
    placeholder: "Select Start Date",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Enter Category",
  },
  {
    name: "endDate",
    label: "End Date",
    type: "date-time",
    placeholder: "Select End Date",
  },
  {
    name: "OrganizationUuid",
    label: "Organization UUID",
    type: "text",
    placeholder: "Enter Organization UUID",
  },
  { name: "type", label: "Type", type: "text", placeholder: "Enter Type" },
  {
    name: "registrationRequired",
    label: "Registration Required",
    type: "checkbox",
  },
  {
    name: "capacity",
    label: "Capacity",
    type: "number",
    placeholder: "Enter Capacity",
  },
  {
    name: "registeredParticipants",
    label: "Registered Participants",
    type: "number",
    placeholder: "Enter Registered Participants",
  },
];
// NewsForm component
export default function NewsForm({
  onFormSubmit,
  events = [],
  selectedEventId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState({ msg: "", type: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [formReset, setFormReset] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [eventData, setEventData] = useState({
    ...EVENTS_INITIAL,
    startDate: moment().format("YYYY-MM-DDTHH:mm"), // Initialize with current date and time
    endDate: moment().format("YYYY-MM-DDTHH:mm"), // Initialize with current date and time
  });
  useEffect(() => {
    if (selectedEventId) {
      const selectedEvent = events.find(
        (eventData) => eventData.uuid === selectedEventId
      );
      if (selectedEvent) {
        setEventData({
          title: selectedEvent.title,
          description: selectedEvent.description,
          thumbNail: selectedEvent.thumbNail,
          startDate: moment(selectedEvent.startDate).format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
          endDate: moment(selectedEvent.endDate).format("YYYY-MM-DDTHH:mm:ss"),
          location: selectedEvent.location,
          category: selectedEvent.category,
          OrganizationUuid: selectedEvent.OrganizationUuid,
          type: selectedEvent.type,
          registrationRequired: selectedEvent.registrationRequired,
          capacity: selectedEvent.capacity,
          registeredParticipants: selectedEvent.registeredParticipants,
        });
        setIsEditMode(true);
      }
    } else {
      setEventData({
        ...EVENTS_INITIAL,
        startDate: moment().format("YYYY-MM-DDTHH:mm"),
        endDate: moment().format("YYYY-MM-DDTHH:mm"),
      });
      setIsEditMode(false);
    }
  }, [selectedEventId, events]);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (name === "thumbNail") {
      setEventData((prev) => ({ ...prev, thumbNail: target.files[0] }));
    } else {
      setError({ msg: "", type: "" });
      let rawValue;
      if (type === "datetime-local") {
        rawValue = moment(value).toISOString();
      } else if (type === "checkbox") {
        rawValue = checked;
      } else {
        rawValue = value;
      }

      setEventData((prev) => ({ ...prev, [name]: rawValue }));

      if (!value && type !== "checkbox") {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "This field is required",
        }));

        setEventData((prev) => ({ ...prev, [name]: rawValue }));
      }
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    setValidationErrors({}); // Clear previous validation errors
    setError({ msg: "", type: "" });

    try {
      // Validation for empty fields
      const newValidationErrors = {};
      fields.forEach((field) => {
        if (!eventData[field.name] && field.type !== "checkbox") {
          newValidationErrors[field.name] = "This field is required";
        }
      });
      if (Object.keys(newValidationErrors).length > 0) {
        setValidationErrors(newValidationErrors);
        return;
      }

      setIsLoading(true);

      const formattedDate = moment(eventData.startDate).toISOString();
      const imgRes = await uploadImg({
        img: eventData.thumbNail,
        category: "events",
      });

      let res;
      if (isEditMode) {
        res = await updateEvent({
          ...eventData,
          thumbNail: imgRes,
          startDate: formattedDate,
          endDate: formattedDate,
          uuid: selectedEventId, // Corrected duplicated uuid property
        });
      } else {
        res = await addEvent({
          ...eventData,
          thumbNail: imgRes,
          publishedDate: formattedDate,
        });
      }

      if (res) {
        setError({ msg: "Event submitted successfully", type: "success" });
        setIsEditMode(false);
        setEventData({
          ...EVENTS_INITIAL,
          startDate: moment().format("YYYY-MM-DDTHH:mm"),
          endDate: moment().format("YYYY-MM-DDTHH:mm"),
        });
      }
    } catch (error) {
      setError({ msg: error.message || "An error occurred", type: "error" });
      console.error("Error submitting form:", error);
    } finally {
      onFormSubmit();
      setIsLoading(false);
      setEventData(EVENTS_INITIAL);
    }
  };

  return (
    <>
      <div className='flex flex-col w-full justify-center items-center bg-[url("/MessageSvg.svg")]'>
        <h1 className="text-center mx-auto w-full my-3 text-4xl font-bold text-tgreen ">
          Event Details Form
        </h1>
        <div
          className="w-11/12 rounded-lg flex flex-col justify-center items-center bg-bgreen opacity-75 p-5"
          onSubmit={handleSubmit}
        >
          <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 ">
            {fields.map((field) => (
              <div
                key={field.name}
                className="w-full flex justify-center py-2 px-4"
              >
                <label
                  htmlFor={field.name}
                  className={`w-32 md:w-40 lg:w-40 p-2 text-xl font-bold`}
                >
                  {field.label}
                </label>
                <input
                  name={field.name}
                  className="w-1/2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                  id={field.name}
                  type={field.type}
                  value={
                    field.name === "thumbNail"
                      ? eventData[field.name]?.File?.filename
                      : eventData[field.name]
                  }
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                />
                {validationErrors[field.name] && (
                  <span className="text-red-500">
                    {validationErrors[field.name]}
                  </span>
                )}
              </div>
            ))}
          </div>
          {isEditMode ? (
            <>
              <button
                onClick={handleSubmit}
                className="w-20 my-5 mx-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white hover:bg-tgreen"
              >
                Update
              </button>
              <button
                onClick={handleCancelEdit}
                className="w-20 my-5 mx-2 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white hover:bg-red-500 text-red-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-20 my-5 mx-auto p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white hover:bg-purple-500 text-purple-500"
            >
              Submit
            </button>
          )}
        </div>
        {isLoading && <Loader />} {/* Display loader if isLoading is true */}
      </div>
    </>
  );
}
