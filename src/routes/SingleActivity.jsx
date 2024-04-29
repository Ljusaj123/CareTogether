import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../components";

function SingleActivity() {
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  const [form, setForm] = useState({});

  const fetchActivities = async () => {
    axios.get(`http://localhost:3001/activities/${id}`).then((response) => {
      setActivity(response.data);
    });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.patch(`http://localhost:3001/activities/${id}`, )
  };

  const { name, date, description, organization, applicants, location } =
    activity;
  return (
    <div>
      <div className="flex justify-between mb-24">
        <div className="max-w-96">
          <h1 className="text-3xl font-bold text-primary my-8">{name}</h1>
          <h2 className="text-2xl text-secondary my-4">
            Organized by: {organization}
          </h2>
          <p className="text-lg">{description}</p>
          <p className="text-xl my-4 text-info">When: {date}</p>
          <p className="text-xl text-info">Where: {location}</p>
        </div>

        <div className="px-24">
          <h2 className="text-2xl text-primary my-8">Form to apply</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input type="text" name="name" label="name" setForm={setForm} />
            <Input type="email" name="email" label="email" setForm={setForm} />
            <button type="submit" className="btn btn-primary my-8">
              Apply
            </button>
          </form>
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-primary my-4">List of applicants</h2>
        {applicants &&
          applicants.map((applicant) => {
            return <p className="text-lg my-4">{applicant}</p>;
          })}
      </div>
    </div>
  );
}

export default SingleActivity;
