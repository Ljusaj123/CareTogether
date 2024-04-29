import { NavLink } from "react-router-dom";
import img from "../assets/img.jpg";

function Hero() {
  return (
    <div className="hero min-h-screen bg-accent-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={img} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Welcome to CareTogether!</h1>
          <p className="py-6">
            We believe in the transformative power of collective goodwill, where
            every volunteer embodies the spirit of compassion and solidarity.
            Join us as we come together, hand in hand, to create a brighter
            future for those in need, enriching lives and fostering a community
            bound by care and support."
          </p>

          <NavLink
            className="capitalize bg-ghost text-primary"
            to="/activities"
          >
            <button className="btn btn-primary">Get Started</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Hero;
