import React from "react";
import { useRouter } from "next/router";

const AboutUs = () => {
  const router = useRouter();

  const students = [
    {
      name: "Hemant S Banur",
      description: "Student from PES University interested in Web Dev & ML",
    },
    {
      name: "B R Arjun",
      description: "Student from PES University interested in Game Dev & ML",
    },
    {
      name: "Abhishek H S",
      description: "Student from PES University interested in DevOps & ML",
    },
    {
      name: "Atheek Hebbar",
      description: "Student from PES University interested in Web Dev & ML",
    },
  ];

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-4xl font-bold mb-10 text-center">About Us</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {students.map((student, index) => (
          <div
            key={index}
            className="card border p-5 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <h2 className="card-title text-2xl font-semibold mb-3">
              {student.name}
            </h2>
            <p className="card-desc text-gray-700">{student.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={() => router.back()}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
