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
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import UserContext from "../context";
import { LuSave } from "react-icons/lu";
import { MdCancel } from "react-icons/md";

function Volunteers() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const { isAdmin } = useContext(UserContext);
  const [cardToEdit, setCardToEdit] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [cardToDelete, setCardToDelete] = useState("");

  const fetchVolunteers = () => {
    setIsLoading(true);
    axios.get(`http://localhost:3001/volunteers`).then((response) => {
      setData(response.data);
      setFilteredData(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

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

  const openModal = (id) => {
    setCardToDelete(id);
    document.getElementById("my_modal_1").showModal();
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
              options={["Springfield", "Oakville", "Meadowview"]}
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
        {filteredData.map((x) => {
          return (
            <Card key={x.id}>
              {editMode && x.id === cardToEdit ? (
                <Input
                  type="text"
                  name="name"
                  label="name"
                  required={true}
                  defaultValue={x.name}
                  setForm={setForm}
                />
              ) : (
                <h3 className="card-title capitalize font-medium text-xl text-primary">
                  {x.name}
                </h3>
              )}

              {editMode && x.id === cardToEdit ? (
                <Input
                  type="text"
                  name="association"
                  label="association"
                  required={true}
                  defaultValue={x.association}
                  setForm={setForm}
                />
              ) : (
                <h4 className=" text-lg text-secondary font-bold">
                  {x.association}
                </h4>
              )}

              {editMode && x.id === cardToEdit ? (
                <Input
                  type="email"
                  name="email"
                  label="email"
                  required={true}
                  defaultValue={x.email}
                  setForm={setForm}
                />
              ) : (
                <p className="text-md text-neutral">{x.email}</p>
              )}

              {editMode && x.id === cardToEdit ? (
                <Input
                  type="text"
                  name="town"
                  label="town"
                  required={true}
                  defaultValue={x.town}
                  setForm={setForm}
                />
              ) : (
                <p className="capitalize text-md text-neutral underline">
                  {x.town}
                </p>
              )}

              <p className="font-bold">Interests</p>

              {editMode && x.id === cardToEdit ? (
                <Input
                  type="text"
                  name="interests"
                  label="interests (use comma to seperate)"
                  required={true}
                  defaultValue={x.interests}
                  setForm={setForm}
                />
              ) : x.interests ? (
                x.interests.split(",").map((interest, index) => {
                  return <p key={index}>{interest}</p>;
                })
              ) : (
                <p>None</p>
              )}

              <p className="font-bold">Availability</p>

              {editMode && x.id === cardToEdit ? (
                <Input
                  type="text"
                  name="availability"
                  label="availability (use comma to seperate)"
                  required={true}
                  defaultValue={x.availability}
                  setForm={setForm}
                />
              ) : x.availability ? (
                x.availability.split(",").map((a, index) => {
                  return <p key={index}>{a}</p>;
                })
              ) : (
                <p>None</p>
              )}
              {isAdmin &&
                (editMode && x.id === cardToEdit ? (
                  <div className="flex gap-4">
                    <button
                      title="Save"
                      className="btn btn-warning"
                      onClick={() => handleSave(x.id)}
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
                      onClick={() => openModal(x.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      title="Edit"
                      className="btn btn-warning"
                      onClick={() => handleEdit(x.id)}
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
