"use client";

import React, { useState, useEffect } from "react";
import ImgSlider from "@/components/ImgSlider/page";
import Button from "@/components/Button/Button";
import Image from "next/image";
import HeadingText from "@/components/HeadingText/heading";
import { addAdmissionQuery } from "@/lib/services/admission";
import Loader from "@/components/Loader/Loader";
import { validator } from "@/lib/helpers/validator";
import {
  ADMISSION_SUCCESS,
  ERR_MSG,
  FORM_INITIALS,
} from "@/lib/constants/admission";
import { toast } from "react-toastify";
import Link from "next/link";

const AdmissionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState({ msg: "", type: "" });
  const [formData, setFormData] = useState(FORM_INITIALS);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "/events/bannerCarousel/jpeg-optimizer__DSC0444.JPG",
    "/events/bannerCarousel/jpeg-optimizer__DSC0752.JPG",
    "/events/bannerCarousel/jpeg-optimizer__DSC1401.JPG",
    // Add more images as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000); // Adjust the interval as needed (currently set to 5000 milliseconds or 5 seconds)

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setError({ msg: "", type: "" });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleForceUpdate = () => setError({ msg: "", type: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ msg: "", type: "" });
    let isValid = validator(formData, ERR_MSG, ["otherQuery"]);
    if (isValid === true) {
      try {
        setIsLoading(true);
        let res = await addAdmissionQuery(formData);
        if (res) {
          setFormData(FORM_INITIALS);
          setIsLoading(false);
          setError({ msg: ADMISSION_SUCCESS, type: "success" });
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      toast.error(isValid);
    }
  };

  const sliderImages = [
    {
      id: 1,
      url: "/gallarySlider/jpeg-optimizer_PGS_0670-min.JPG",
    },
    {
      id: 2,
      url: "/gallarySlider/jpeg-optimizer_IMG-20240103-WA0052-min.jpg",
    },
    {
      id: 3,
      url: "/gallarySlider/jpeg-optimizer_PGS_0806-min.JPG",
    },
    {
      id: 4,
      url: "/gallarySlider/jpeg-optimizer_IMG-20240103-WA0035-min.jpg",
    },
    {
      id: 5,
      url: "/gallarySlider/jpeg-optimizer_PGS_0623-min.JPG",
    },
    {
      id: 6,
      url: "/gallarySlider/jpeg-optimizer_DSC_0519-min.JPG",
    },
  ];

  const cardDetails = [
    {
      title: "Connect",
      description:
        "Questions are always entertained at Orchids. Fill out the enquiry form with your details, queries and branch of preference. We assure you that we will revert with all the answers you need!",
      learnMoreLink: "#", // Replace with the appropriate link
      imageUrl: "/target.png",
    },
    {
      title: "Campus Visit",
      description:
        "With assistance from our school counselor, walk down the Halls of Excellence and have a first-hand look into your child's future. Our campuses boast state-of-the-art infrastructure and a capable faculty.",
      learnMoreLink: "#", // Replace with the appropriate link
      imageUrl: "/secure-shield.png",
    },
    {
      title: "Application Form",
      description:
        "Spare no time in completing this leg of your Journey. Purchase the Application Kit for ₹200 and aid your form with all the necessary documents - Your child's destination is not that far!",
      learnMoreLink: "#", // Replace with the appropriate link
      imageUrl: "/puzzle.png",
    },
    // Add more objects as needed for additional cards
  ];

  const admission = [
    {
      title: "Connect",
      description:
        "Questions are always entertained at Orchids. Fill out the enquiry form with your details, queries and branch of preference. We assure you that we will revert with all the answers you need!",
      learnMoreLink: "#", // Replace with the appropriate link
      imageUrl: "/target.png",
    },
    {
      title: "Campus Visit",
      description:
        "With assistance from our school counselor, walk down the Halls of Excellence and have a first-hand look into your child's future. Our campuses boast state-of-the-art infrastructure and a capable faculty.",
      learnMoreLink: "#", // Replace with the appropriate link
      imageUrl: "/secure-shield.png",
    },
    {
      title: "Application Form",
      description:
        "Spare no time in completing this leg of your Journey. Purchase the Application Kit for ₹200 and aid your form with all the necessary documents - Your child's destination is not that far!",
      learnMoreLink: "#", // Replace with the appropriate link
      imageUrl: "/puzzle.png",
    },
    // Add more objects as needed for additional cards
  ];

  const differentAccordionItems = [
    {
      header: "Different Question 1",
      text: "Answer to a different question 1...",
    },
    {
      header: "Different Question 2",
      text: "Answer to a different question 2...",
    },
    // Add more items as needed
  ];

  const buttonData = [
    {
      name: "Get in Touch",
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-white",
    },
    {
      name: "Campus Visit",
      gradient: "from-red-200 via-red-300 to-yellow-200",
      textColor: "text-white",
    },
    {
      name: "Application Form",
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-white",
    },
    {
      name: "Submit Documents",
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-white",
    },
    {
      name: "Receive Enrollment No",
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-white",
    },
    {
      name: "Yay! center learning",
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-white",
    },
  ];

  return (
    // AdmissionForm
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="p-5">
            <div className="flex flex-col md:flex-row md:justify-around items-center bg-cover">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 w-full md:w-80 shadow-md flex flex-col border-indigo-200 rounded-xl "
              >
                <h1 className=" text-xl bg-clip-text bg-gradient-to-r to-yellow-600 from-pink-400">
                  Admisson Form
                </h1>
                <input
                  type="text"
                  name="applicantName"
                  placeholder="Parent Name*"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  placeholder="Mobile*"
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="email"
                  name="applicantEmail"
                  value={formData.applicantEmail}
                  placeholder="your@email.com"
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <select
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="Bhaurasa">Bhaurasa</option>
                  <option value="Bagli">Bagli</option>
                  <option value="Gwaliour">Gwaliour</option>
                  <option value="Nathdwara">Nathdwara</option>
                  {/* Add your cities here */}
                </select>
                <input
                  type="text"
                  name="admissionYear"
                  value={formData.admissionYear}
                  placeholder="2023-2024"
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Any query or message"
                  name="otherQuery"
                  value={formData.otherQuery}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  btnType="primary" // Adjust button type as needed
                  size="large" // Adjust button size as needed
                  className="text-white px-4 py-2 rounded-lg"
                  style={{ background: "#7620a9" }}
                >
                  Submit
                </Button>
              </form>

              <div className="flex flex-col justify-center items-center mt-5 md:mt-0 max-w-3xl">
                <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#9920e9] from-[#c983fd]">
                    Just a Few More Steps
                  </span>

                  <span>
                    {" "}
                    Towards<br></br> Happy Learning.
                  </span>
                </h1>
                <p className="text-lg my-5 font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                  Here, learning is a joy ride!.
                </p>
                <button
                  type="button"
                  className="text-white  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-200 shadow-lg shadow-[#f5e8ff] dark:shadow-lg dark:shadow-[#f5e8ff] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  style={{ background: "#7620a9" }}
                >
                  <Link href="/about"> About Us</Link>
                </button>
              </div>
            </div>

            <div
              className="w-full bg-white py-10 bg-cover "
              style={{ backgroundImage: "url('/Rect Light.svg')" }}
            >
              <div className="md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0 mx-auto">
                <div className="flex flex-col justify-center gap-4 text-center">
                  <p className="py-2 text-2xl text-[#8b21cf] font-medium">
                    Admission
                  </p>
                  <h1 className="md:leading-[72px] py-2 md:text-6xl text-4xl font-semibold">
                    Join Our Family{" "}
                    <span className="text-[#8b21cf]">of Young Learners </span>
                  </h1>
                  <p className="py-2 text-lg text-center text-gray-600">
                    At Pratibha Global School, we welcome you to embark on an
                    exciting educational journey for your child. Our admission
                    process is designed to be transparent, straightforward, and
                    inclusive. Here's a step-by-step guide to joining our
                    school.
                  </p>
                </div>
                <div className="relative">
                  <Image
                    alt="image"
                    src={images[currentSlide]}
                    width={700}
                    height={300}
                    className="md:order-last order-first rounded-full max-h-full"
                  />
                </div>
              </div>
            </div>

            <HeadingText
              title="Our Features"
              subtitle="Fee Structure"
              content="Our fee structure is transparent, and we strive to keep our fees competitive within the education sector. The fees vary based on the program, age group, and any additional services chosen."
            />
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden shadow-xl  rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200  dark:divide-gray-700 ">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="bg-[#c983fd] px-6 py-3 text-center text-xs font-bold text-gray-100 uppercase"
                          >
                            Programme
                          </th>
                          <th
                            scope="col"
                            className="bg-[#c983fd] px-6 py-3 text-center text-xs font-bold text-gray-100 uppercase"
                          >
                            Age Group
                          </th>
                          <th
                            scope="col"
                            className="bg-[#c983fd] px-6 py-3 text-center text-xs font-bold text-gray-100 uppercase"
                          >
                            Annual Tution
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-center shadow-xl">
                        <tr>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800">
                            Nursery to KG-2
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            03 - 06
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            15000/Year
                          </td>
                        </tr>

                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            I - V
                          </td>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-800">
                            06 - 12
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            17500/Year
                          </td>
                        </tr>

                        <tr>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800">
                            VI - VIII
                          </td>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-800">
                            12 - 14
                          </td>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-800">
                            20000/Year
                          </td>
                        </tr>
                        <tr>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800">
                            IX - X
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            14 - 16
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            22500/Year
                          </td>
                        </tr>
                        <tr>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800">
                            XI - XII
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            16 - 18
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            25000/Year
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-10">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden   shadow-xl rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200  dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="bg-[#c983fd] px-6 py-3 text-center text-3xl font-medium text-gray-100 uppercase "
                          >
                            Additional Services
                          </th>

                          <th
                            scope="col"
                            className="bg-[#c983fd] px-6 py-3 text-center text-3xl font-medium text-gray-100 uppercase "
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className=" px-6 py-4 whitespace-nowrap  text-sm font-medium text-gray-800 dark:text-gray-800">
                            Re-Admission Fee
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            600/Rs
                          </td>
                        </tr>

                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            New Admission Fee
                          </td>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-800">
                            1200/Rs
                          </td>
                        </tr>

                        <tr>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-800">
                            Transportation (optional)
                          </td>
                          <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-800">
                            Included in Yearly Fee
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <ImgSlider images={sliderImages} />
          </div>
        </>
      )}
    </>
  );
};

export default AdmissionForm;
