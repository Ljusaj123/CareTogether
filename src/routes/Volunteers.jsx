import { useEffect, useState } from "react";
import { CreateNew, Input, Filter, Title, Card } from "../components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

function Volunteers() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchVolunteers = async () => {
    setIsLoading(true);
    axios.get(`http://localhost:3001/volunteers`).then((response) => {
      setData(response.data);
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

  const handleEdit = (id) => {};

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Title title="Volunteers" />
      <div className="divider"></div>
      <div className="flex justify-end items-center gap-4">
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
              name="location"
              label="location"
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
            {/* // interests */}
            {/* availability */}

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </CreateNew>
        <Filter />
      </div>

      {data.length === 0 && (
        <p className="text-center">There are no volunteers...</p>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
        {data.map((x) => {
          return (
            <Card key={x.id}>
              <h3 className="card-title capitalize font-medium text-xl text-primary">
                {x.name}
              </h3>
              <p className=" text-lg text-secondary font-bold">
                {x.association}
              </p>
              <h4 className="text-md text-neutral">{x.email}</h4>
              <h4 className="capitalize text-md text-neutral">{x.location}</h4>
              <p>
                Interests:
                {x.interests &&
                  x.interests.map((interest) => {
                    return <span>{interest}</span>;
                  })}
              </p>

              <p>
                Availability:{" "}
                {x.availability &&
                  x.availability.map((a) => {
                    return <span>{a}</span>;
                  })}
              </p>
              <div className="flex gap-4">
                <button className="btn btn-error">
                  <FaTrash onClick={() => handleDelete(x.id)} />
                </button>
                <button className="btn btn-warning">
                  <FiEdit3 onClick={() => handleEdit(x.id)} />
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Volunteers;
