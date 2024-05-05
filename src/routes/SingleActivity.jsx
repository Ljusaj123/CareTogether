import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../context";
import { Input, DeleteModal } from "../components";
import { FaTrash } from "react-icons/fa6";

function SingleActivity() {
  const { id } = useParams();
  const { isAdmin } = useContext(UserContext);
  const [activity, setActivity] = useState([]);
  const [applicantToDelete, setApplicantToDelete] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/activities/${id}`)
      .then((response) => {
        setActivity(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e, applicants) => {
    setIsLoading(true);
    e.preventDefault();
    applicants.push(e.target.name.value + " " + e.target.surname.value);
    axios
      .patch(`http://localhost:3001/activities/${id}`, { applicants })
      .then(() => {
        console.log("applied");
        fetchActivities();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    setIsLoading(true);
    const filteredApplicants = applicants.filter((x) => {
      return x !== applicantToDelete;
    });
    axios
      .patch(`http://localhost:3001/activities/${id}`, {
        ...activity,
        applicants: filteredApplicants,
      })
      .then(() => {
        console.log("deleted");
        fetchActivities();
      })
      .catch((err) => console.log(err));
  };

  const openModal = (applicant) => {
    setApplicantToDelete(applicant);
    document.getElementById("my_modal_1").showModal();
  };

  const {
    name,
    date,
    description,
    organization,
    applicants,
    location,
    imageURL,
  } = activity;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-24 items-start">
      <div className="max-w-96">
        <h1 className="text-3xl font-bold text-primary mb-4">{name}</h1>
        <h2 className="text-2xl text-secondary my-4">
          Organized by: {organization}
        </h2>
        <p className="text-lg">{description}</p>
        <p className="text-xl my-4 text-info">When: {date}</p>
        <p className="text-xl text-info">Where: {location}</p>
      </div>

      <figure>
        <img
          src={imageURL}
          alt="img"
          className="rounded-lg w-full object-cover min-w-40"
        />
      </figure>

      <div>
        <h2 className="text-2xl text-primary my-4">Form to apply</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => handleSubmit(e, applicants)}
        >
          <Input type="text" name="name" label="name" />
          <Input type="text" name="surname" label="surname" />
          <button type="submit" className="btn btn-primary max-w-24 my-4">
            Apply
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl text-primary my-4">List of applicants</h2>
        {applicants &&
          applicants.map((applicant, index) => {
            return (
              <div className="flex items-center justify-between" key={index}>
                <p className="text-lg my-4">{applicant}</p>
                {isAdmin && (
                  <button
                    title="Delete"
                    className="btn btn-error"
                    onClick={() => openModal(applicant)}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            );
          })}
      </div>
      <DeleteModal
        handleDelete={handleDelete}
        setToDelete={setApplicantToDelete}
      />
    </div>
  );
}

export default SingleActivity;
