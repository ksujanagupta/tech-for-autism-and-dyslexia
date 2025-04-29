import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/Images TAD/Slider/home_main.jpg";
import image2 from "../assets/Images TAD/Slider/1.jpg";
import image3 from "../assets/Images TAD/Slider/01.jpg";
import image4 from "../assets/Images TAD/Slider/3.jpg";
import image5 from "../assets/Images TAD/Slider/4.jpg";
import image6 from "../assets/Images TAD/Slider/rt.jpg";

import Therapy1 from "../assets/Therapies/1.png";
import Therapy2 from "../assets/Therapies/2.png";
import Therapy3 from "../assets/Therapies/3.png";
import Therapy4 from "../assets/Therapies/4.png";
import Therapy5 from "../assets/Therapies/5.png";
import Therapy6 from "../assets/Therapies/6.png";

import Assessment1 from "../assets/Assessment/1.jpg";
import Assessment2 from "../assets/Assessment/2.jpg";
import Assessment3 from "../assets/Assessment/3.jpg";
import Assessment4 from "../assets/Assessment/4.jpg";
import Assessment5 from "../assets/Assessment/5.jpg";
import Assessment6 from "../assets/Assessment/6.jpg";

import Treatment1 from "../assets/Treatment/1.jpg";
import Treatment2 from "../assets/Treatment/2.jpg";
import Treatment3 from "../assets/Treatment/3.jpg";
import Treatment4 from "../assets/Treatment/4.jpg";
import Treatment5 from "../assets/Treatment/5.jpg";
import Treatment6 from "../assets/Treatment/6.jpg";
import Treatment7 from "../assets/Treatment/7.jpg";
import Treatment8 from "../assets/Treatment/8.jpg";
import Treatment9 from "../assets/Treatment/9.jpg";
import Treatment10 from "../assets/Treatment/10.jpg";
import Treatment11 from "../assets/Treatment/11.jpg";
import Treatment12 from "../assets/Treatment/12.jpg";
import Treatment13 from "../assets/Treatment/13.jpg";

const branches = [
  {
    image: Assessment1,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Bowenpally",
    //contact: "Suma Singh",
    phone: "+91 88865 78697  ",
    color: "bg-cyan-500",
  },
  {
    image: Assessment2,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Barkatpura",
    //contact: "Sridhar",
    phone: "+91 88864 78697 ",
    color: "bg-red-500",
  },
  {
    image: Assessment3,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Kukatpally",
    //contact: "Padmashri",
    phone: "+91 90632 08697 ",
    color: "bg-lime-500",
  },
  {
    image: Assessment4,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Suchitra",
    //contact: "Sophia Pirani",
    phone: "+91 99594 18697 ",
    color: "bg-yellow-400",
  },
  {
    image: Assessment5,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Banjara Hills",
    //contact: "Akram",
    phone: "+91 87905 88697",
    color: "bg-fuchsia-500",
  },
  {
    image: Assessment6,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Manikonda",
    //contact: "Gomathi Sharma",
    phone: "+91 89786 88697",
    color: "bg-orange-400",
  },
  {
    image: Assessment6,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Nacharam",
    //contact: "Gomathi Sharma",
    phone: "+91 90003 28697 ",
    color: "bg-orange-400",
  },
  {
    image: Assessment6,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Neredmet",
    //contact: "Gomathi Sharma",
    phone: "+91 90003 48697",
    color: "bg-orange-400",
  },
  {
    image: Assessment6,
    name: "TOTAL SOLUTION REHABILITATION SOCIETY",
    location: "Champapet",
    //contact: "Gomathi Sharma",
    phone: "+91 99493 08697",
    color: "bg-orange-400",
  },
  {
    image: Assessment6,
    name: "SPECIAL EDUCATION CENTER",
    location: "Barkatpura",
    //contact: "Gomathi Sharma",
    phone: "+91 70754 88697",
    color: "bg-orange-400",
  },
];

const therapies = [
  {
    name: "Assessment & Evaluation",
    image: Therapy1,
    path: "/services/assessment-evaluation",
  },
  {
    name: "Occupational Therapy",
    image: Therapy2,
    path: "/services/occupational-therapy",
  },
  {
    name: "Behaviour Therapy",
    image: Therapy3,
    path: "/services/behaviour-therapy",
  },
  {
    name: "Remedial Therapy",
    image: Therapy4,
    path: "/services/remedial-therapy",
  },
  {
    name: "Behaviour Modification",
    image: Therapy5,
    path: "/services/behaviour-modification",
  },
  { name: "Speech Therapy", image: Therapy6, path: "/services/speech-therapy" },
];

const items = [image1, image2, image3, image4, image5, image6];

const images = [
  Treatment1,
  Treatment2,
  Treatment3,
  Treatment4,
  Treatment5,
  Treatment6,
  Treatment7,
  Treatment8,
  Treatment9,
  Treatment10,
  Treatment11,
  Treatment12,
  Treatment13,
];

export default function Home() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [current, setCurrent] = useState(0);
  const visibleImages = 3;

  const handleCarousel = (direction) => {
    const totalItems = items.length;
    let newIndex =
      direction === "next"
        ? (currentIndex + 1) % totalItems
        : (currentIndex - 1 + totalItems) % totalItems;

    setCurrentIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${newIndex * 100}%)`;
    }
  };

  const nextSlide = () => {
    if (current < images.length - visibleImages) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div>
      <div className="relative w-full  overflow-hidden mx-auto">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          ref={carouselRef}
        >
          {items.map((src, index) => (
            <div
              key={index}
              className="min-w-full h-full flex items-center justify-center bg-black"
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-[80%] object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-6">
          <button
            onClick={() => handleCarousel("prev")}
            className="bg-white/80 hover:bg-white text-black font-semibold py-2 px-4 rounded-full shadow"
          >
            Previous
          </button>
          <button
            onClick={() => handleCarousel("next")}
            className="bg-white/80 hover:bg-white text-black font-semibold py-2 px-4 rounded-full shadow"
          >
            Next
          </button>
        </div>
      </div>

      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 px-4">
            {therapies.map((therapy, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-square max-w-[180px] mx-auto"
              >
                <Link to={therapy.path} className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 z-10 bg-[#ab1c1c] rounded-full">
                  <span className="text-white text-sm md:text-base font-semibold text-center px-2">
                    {/* {therapy.name} */}
                    <p>{therapy.name}</p>
                  </span>
                </Link>

                <div className="relative w-full h-full flex items-center justify-center bg-[#ab1c1c] rounded-full transition-opacity duration-300 hover:opacity-0">
                  <img
                    src={therapy.image}
                    alt={therapy.name}
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="bg-white px-4 md:px-16 py-12 text-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900">
          Welcome to Total Solution
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto mt-2 mb-8"></div>

        <p className="max-w-6xl mx-auto text-lg text-justify">
          We are a provider of rehabilitation services for children with
          Developmental Disorders, Learning Difficulties and Emotional
          Difficulties. With over 15 years of experience in providing a flexible
          and varied range of services, including life skills training, packages
          for out of station clients, home based programs, and school based
          rehabilitation. The people we support may have a range of needs that
          require intensive support, including:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-6 max-w-6xl mx-auto">
          {[
            "Autism Spectrum Disorder (ASD).",
            "Sensory processing difficulties.",
            "Epilepsy.",
            "Learning Disorders (SLD).",
            "Attention Deficit Disorder (ADD).",
            "Attention Deficit Hyperactive Disorder (ADHD).",
            "Children with Behavioural challenges and emotional difficulties.",
            "School Rejection",
            "Phobia",
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-2">
              <span className="text-blue-600">➜</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-8 space-y-6 text-lg text-justify">
          <p>
            We have succeeded in supporting children to live independently with
            their own assured tenancies when previously they were in secure
            accommodation. We aim to support each individual to integrate fully
            into their local community and live the life of their choice. This
            is based on a culture of person centered planning and, where
            appropriate, the use of assistive technology to help people become
            more independent.
          </p>

          <p>
            Total solution has policies in place to ensure all children have
            equal opportunity to achieve their educational goals. The primary
            aim of Total solution is to provide confidential support for
            children identified with Learning Difficulties in, Attention Deficit
            Hyperactivity Disorder (ADHD) or Autism Spectrum Disorder (ASD), in
            order to facilitate their academic, personal and career goals.
          </p>
          <p>
          Special Education Centre (SEC) is an initiative by Total Solution Rehabilitation Society 
          (TSRS) for rehabilitation of children with special needs in 2018. It was started at 
          Barkatpura as a need to give special education services to children who were not 
          able to gain admission or adjust in a regular school.
          As on day, the SEC has 25 children with autism spectrum disorder, cerebral palsy, 
          cognitive impairment, down’s syndrome, visual impairment and multiple disabilities too.
          </p>
        </div>
      </section>
      <section className="bg-gray-200 py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-900">
          Our Branches and Services
        </h2>
        <div className="w-20 h-1 bg-red-600 mx-auto my-2"></div>

        <div className="max-w-6xl mx-auto px-4 mt-10">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {branches.map((branch, idx) => (
              <div
                key={idx}
                className={`rounded shadow-lg overflow-hidden bg-white`}
              >
                <div className={`${branch.color} p-1`}>
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {branch.name}
                  </h3>
                  <p className="text-gray-600 mb-2 text-xl">{branch.location}</p>
                  <p className="text-red-700 text-sm font-medium">
                    Contact Number : {branch.contact}
                  </p>
                  <p className="text-gray-800 font-semibold">{branch.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-10">
        <h2 className="text-2xl font-bold text-center text-blue-900">
          Treatment
        </h2>
        <div className="w-20 h-1 bg-red-600 mx-auto my-2"></div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / visibleImages)}%)`,
              }}
            >
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Slide ${idx}`}
                  className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 object-cover p-2"
                />
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button
              onClick={prevSlide}
              className="bg-white border rounded-full p-2 shadow hover:bg-gray-100"
              disabled={current === 0}
            >
              ◀
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button
              onClick={nextSlide}
              className="bg-white border rounded-full p-2 shadow hover:bg-gray-100"
              disabled={current >= images.length - visibleImages}
            >
              ▶
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
