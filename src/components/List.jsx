import { Link } from "react-router-dom";

function List({ url, id, children, img }) {
  return (
    <Link
      to={`/${url}/${id}`}
      className="shadow-xl hover:shadow-2xl duration-300 transition p-8 rounded-xl flex flex-col md:flex-row gap-y-4 bg-base-100 group mx-6 md:mx-24"
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
