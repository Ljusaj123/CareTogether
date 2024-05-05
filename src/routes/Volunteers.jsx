import { useEffect, useState, useContext } from "react";
import { CreateNew, Input, Filter, Title, Card, Select } from "../components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import UserContext from "../context";

function Volunteers() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const { isAdmin } = useContext(UserContext);

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

  const handleDelete = (id) => {
    setIsLoading(true);
    axios.delete(`http://localhost:3001/volunteers/${id}`).then(() => {
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

  const removeFilters = () => {
    fetchVolunteers();
  };

  const handleEdit = (id) => {};

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
              label="interests"
              setForm={setForm}
            />

            <Input
              type="text"
              name="availability"
              label="availability"
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
              <h3 className="card-title capitalize font-medium text-xl text-primary">
                {x.name}
              </h3>
              <p className=" text-lg text-secondary font-bold">
                {x.association}
              </p>
              <h4 className="text-md text-neutral">{x.email}</h4>
              <h4 className="capitalize text-md text-neutral underline">
                {x.town}
              </h4>
              <p className="font-bold">Interests</p>

              {x.interests ? (
                x.interests.split(",").map((interest, index) => {
                  return <p key={index}>{interest}</p>;
                })
              ) : (
                <p>None</p>
              )}

              <p className="font-bold">Availability</p>
              {x.availability ? (
                x.availability.split(",").map((a, index) => {
                  return <p key={index}>{a}</p>;
                })
              ) : (
                <p>None</p>
              )}
              {isAdmin && (
                <div className="flex gap-4">
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(x.id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(x.id)}
                  >
                    <FiEdit3 />
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Volunteers;
