import img from "../assets/img.jpg";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Card = ({ data }) => {
  const { name, address, town, description } = data;
  return (
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
      <div className="card-body items-center text-center gap-4">
        <h3 className="card-title capitalize font-medium text-xl text-primary">
          {name}
        </h3>
        <h4 className="capitalize text-md text-secondary">
          {address}, <span className="font-medium">{town}</span>
        </h4>
        <p>{description}</p>

        <button className="btn btn-error">
          <FaTrash />
        </button>
      </div>
    </Link>
  );
};

export default Card;
