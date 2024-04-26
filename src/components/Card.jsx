import img from "../assets/img.jpg";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Card = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
      <Link
        to={`/associations/1`}
        className="shadow-xl hover:shadow-2xl duration-300 transition card w-full"
      >
        <figure className="px-4 pt-4">
          <img
            src={img}
            alt="AAA"
            className="rounded-xl h-64 md:h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h3 className="card-title capitalize font-medium text-lg">title</h3>
          <h4 className="capitalize text-md text-neutral-content">desc</h4>

          <span className="text-secondary font-medium">date</span>

          <button className="btn btn-error">
            <FaTrash />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Card;
