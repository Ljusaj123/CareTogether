import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input, DeleteModal } from "../components";
import { FaTrash } from "react-icons/fa6";
import { useContext } from "react";
import UserContext from "../context";

function SingleActivity() {
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  const [form, setForm] = useState({});
  const { isAdmin } = useContext(UserContext);
  const [applicantToDelete, setApplicantToDelete] = useState("");

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
        fetchActivities();
      });
  };

  const handleDelete = () => {
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
      });
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
          <Input type="text" name="name" label="name" setForm={setForm} />
          <Input type="text" name="surname" label="surname" setForm={setForm} />
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
