import { useEffect, useState, useContext } from "react";
import {
  CreateNew,
  Input,
  Filter,
  Title,
  Card,
  Select,
  DeleteModal,
} from "../components";
import axios from "axios";
import UserContext from "../context";
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { LuSave } from "react-icons/lu";
import { MdCancel } from "react-icons/md";

function Volunteers() {
  const { isAdmin } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cardToEdit, setCardToEdit] = useState("");
  const [cardToDelete, setCardToDelete] = useState("");

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = () => {
    setIsLoading(true);
    axios.get(`http://localhost:3001/volunteers`).then((response) => {
      setData(response.data);
      setFilteredData(response.data);
      setIsLoading(false);
    });
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`http://localhost:3001/volunteers`, form).then(() => {
      console.log("created");
      fetchVolunteers();
    });
  };

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:3001/volunteers/${cardToDelete}`)
      .then(() => {
        console.log("deleted");
        fetchVolunteers();
      });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const filteredData = data.filter((x) => {
      if (filter.association && filter.town) {
        return x.town === filter.town && x.association === filter.association;
      }
      if (filter.town) {
        return x.town === filter.town;
      }
      if (filter.association) {
        return x.association === filter.association;
      }
    });
    setFilteredData(filteredData);
  };

  const openModal = (id) => {
    setCardToDelete(id);
    document.getElementById("my_modal_1").showModal();
  };

  const removeFilters = () => {
    fetchVolunteers();
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setCardToEdit(id);
  };

  const handleSave = (id) => {
    axios
      .patch(`http://localhost:3001/volunteers/${id}`, form)
      .then(() => fetchVolunteers());
    setEditMode(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Title title="Volunteers" />
      <div className="divider"></div>
      <div className="flex justify-end items-start gap-4">
        <CreateNew>
          <form
            className="flex flex-col gap-8 items-center"
            onSubmit={handleCreateNew}
          >
            <Input
              type="text"
              name="name"
              label="name"
              required={true}
              setForm={setForm}
            />
            <Input
              type="email"
              name="email"
              label="email"
              required={true}
              setForm={setForm}
            />
            <Input
              type="text"
              name="town"
              label="town"
              required={true}
              setForm={setForm}
            />
            <Input
              type="text"
              name="association"
              label="association"
              required={true}
              setForm={setForm}
            />
            <Input
              type="text"
              name="imageURL"
              label="image URL"
              setForm={setForm}
              required={true}
            />

            <Input
              type="text"
              name="interests"
              label="interests (use comma to seperate)"
              setForm={setForm}
            />

            <Input
              type="text"
              name="availability"
              label="availability (use comma to seperate)"
              setForm={setForm}
            />

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </CreateNew>
        <Filter>
          <form onSubmit={handleFilter}>
            <Select
              label="Town"
              name="town"
              options={[
                "Springfield",
                "Oakville",
                "Meadowview",
                "Cedarville",
                "Riverside",
              ]}
              setValue={(name, value) =>
                setFilter((prev) => {
                  return { ...prev, [name]: value };
                })
              }
            />
            <Select
              label="Association"
              name="association"
              options={[
                "Helping Hands Foundation",
                "Community Arts Collective",
                "Community Development Initiative",
                "Green Earth Society",
                "Community Action Coalition",
              ]}
              setValue={(name, value) =>
                setFilter((prev) => {
                  return { ...prev, [name]: value };
                })
              }
            />
            <button className="btn btn-primary mt-8 mr-4" type="submit">
              Filter
            </button>
            <button className="btn btn-secondary" onClick={removeFilters}>
              Remove Filters
            </button>
          </form>
        </Filter>
      </div>

      {filteredData.length === 0 && (
        <p className="text-center">There are no volunteers...</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-12">
        {filteredData.map((volunteer) => {
          const {
            id,
            name,
            imageURL,
            association,
            email,
            interests,
            availability,
            town,
          } = volunteer;
          return (
            <Card key={id} img={imageURL}>
              {editMode && id === cardToEdit ? (
                <Input
                  type="text"
                  name="name"
                  label="name"
                  required={true}
                  defaultValue={name}
                  setForm={setForm}
                />
              ) : (
                <h3 className="card-title capitalize font-medium text-xl text-primary">
                  {name}
                </h3>
              )}

              {editMode && id === cardToEdit ? (
                <Input
                  type="text"
                  name="association"
                  label="association"
                  required={true}
                  defaultValue={association}
                  setForm={setForm}
                />
              ) : (
                <h4 className=" text-lg text-secondary font-bold">
                  {association}
                </h4>
              )}

              {editMode && id === cardToEdit ? (
                <Input
                  type="email"
                  name="email"
                  label="email"
                  required={true}
                  defaultValue={email}
                  setForm={setForm}
                />
              ) : (
                <p className="text-md text-neutral">{email}</p>
              )}

              {editMode && id === cardToEdit ? (
                <Input
                  type="text"
                  name="town"
                  label="town"
                  required={true}
                  defaultValue={town}
                  setForm={setForm}
                />
              ) : (
                <p className="capitalize text-md text-neutral underline">
                  {town}
                </p>
              )}

              <p className="font-bold">Interests</p>

              {editMode && id === cardToEdit ? (
                <Input
                  type="text"
                  name="interests"
                  label="interests (use comma to seperate)"
                  defaultValue={interests}
                  setForm={setForm}
                />
              ) : interests ? (
                interests.split(",").map((interest, index) => {
                  return <p key={index}>{interest}</p>;
                })
              ) : (
                <p>None</p>
              )}

              <p className="font-bold">Availability</p>

              {editMode && id === cardToEdit ? (
                <Input
                  type="text"
                  name="availability"
                  label="availability (use comma to seperate)"
                  defaultValue={availability}
                  setForm={setForm}
                />
              ) : availability ? (
                availability.split(",").map((x, index) => {
                  return <p key={index}>{x}</p>;
                })
              ) : (
                <p>None</p>
              )}
              {isAdmin &&
                (editMode && id === cardToEdit ? (
                  <div className="flex gap-4">
                    <button
                      title="Save"
                      className="btn btn-warning"
                      onClick={() => handleSave(id)}
                    >
                      <LuSave />
                    </button>
                    <button
                      title="Cancel"
                      className="btn btn-error"
                      onClick={() => setEditMode(false)}
                    >
                      <MdCancel />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button
                      title="Delete"
                      className="btn btn-error"
                      onClick={() => openModal(id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      title="Edit"
                      className="btn btn-warning"
                      onClick={() => handleEdit(id)}
                    >
                      <FiEdit3 />
                    </button>
                  </div>
                ))}
            </Card>
          );
        })}
      </div>
      <DeleteModal handleDelete={handleDelete} setToDelete={setCardToDelete} />
    </div>
  );
}

export default Volunteers;
