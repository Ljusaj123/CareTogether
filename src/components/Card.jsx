import img from "../assets/img.jpg";

const Card = ({ children }) => {
  return (
    <div className="shadow-xl hover:shadow-2xl duration-300 transition card w-full">
      <figure className="px-4 pt-4">
        <img
          src={img}
          alt="img"
          className="rounded-xl h-64 md:h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center gap-4">{children}</div>
    </div>
  );
};

export default Card;
