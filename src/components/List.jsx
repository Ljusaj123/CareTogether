import React from "react";
import img from "../assets/img.jpg";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function List({ data }) {
  const { activity, description, date } = data;
  return (
    <Link
      to={`/products/1`}
      className="relative shadow-xl hover:shadow-2xl duration-300 transition p-8 rounded-xl flex flex-col justify-between sm:flex-row gap-y-4 bg-base-100 group mx-24"
    >
      <figure>
        <img
          src={img}
          alt="AAA"
          className="rounded-lg h-64 md:h-48 w-full object-cover min-w-40"
        />
      </figure>
      <div className="ml-0 sm:ml-16">
        <h3 className="card-title capitalize font-medium text-xl mb-12">
          {activity}
        </h3>
        <h4 className=" text-md text-neutral-content">{description}</h4>
        <p className="text-secondary font-medium sm:ml-auto mt-4">{date}</p>
        <button className="btn btn-error absolute right-4 bottom-4">
          <FaTrash />
        </button>
      </div>
    </Link>
  );
}

export default List;
