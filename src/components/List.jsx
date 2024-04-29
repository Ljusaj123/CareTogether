import React from "react";
import img from "../assets/img.jpg";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function List({ url, id, children }) {
  return (
    <Link
      to={`/${url}/${id}`}
      className="relative shadow-xl hover:shadow-2xl duration-300 transition p-8 rounded-xl flex flex-col sm:flex-row gap-y-4 bg-base-100 group mx-24"
    >
      <figure>
        <img
          src={img}
          alt="img"
          className="rounded-lg h-64 md:h-48 w-full object-cover min-w-40"
        />
      </figure>
      {children}
    </Link>
  );
}

export default List;
