import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../components";
import { FaTrash } from "react-icons/fa6";

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

  const handleSubmit = (e, applicants) => {
    e.preventDefault();
    applicants.push(e.target.name.value + " " + e.target.surname.value);
    axios
      .patch(`http://localhost:3001/activities/${id}`, { applicants })
      .then(() => {
        console.log("applied");
      });
  };

  const handleDelete = (e, applicant) => {
    // e.preventDefault();
    // const app = applicants.filter((x) => {
    //   x === applicant;
    //   // console.log(x);
    //   // console.log(applicant);
    // });
    // console.log(app);
    // axios
    //   .patch(`http://localhost:3001/activities/${id}`, { applicants })
    //   .then(() => {
    //     console.log("deleted");
    //   });
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
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e, applicants)}
          >
            <Input type="text" name="name" label="name" setForm={setForm} />
            <Input
              type="text"
              name="surname"
              label="surname"
              setForm={setForm}
            />
            <button type="submit" className="btn btn-primary my-8">
              Apply
            </button>
          </form>
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-primary my-4">List of applicants</h2>
        {applicants &&
          applicants.map((applicant, index) => {
            return (
              <div className="flex items-center justify-between" key={index}>
                <p className="text-lg my-4">{applicant}</p>
                <button
                  className="btn btn-error"
                  onClick={(e) => handleDelete(e, applicant)}
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SingleActivity;
