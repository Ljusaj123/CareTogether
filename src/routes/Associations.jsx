import { useEffect, useState } from "react";
import { CreateNew, Input, Filter, Title, Card } from "../components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function Associations() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const fetchAssociations = async () => {
    axios.get(`http://localhost:3001/associations`).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchAssociations();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/associations/${id}`).then(() => {
      console.log("deleted");
      fetchAssociations();
    });
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/associations`, form).then(() => {
      console.log("created");
      fetchAssociations();
    });
  };

  return (
    <div>
      <Title title="Associations" />
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
              setForm={setForm}
              required={true}
            />
            <Input
              type="text"
              name="address"
              label="address"
              setForm={setForm}
              required={true}
            />
            <Input
              type="text"
              name="town"
              label="town"
              setForm={setForm}
              required={true}
            />
            <Input
              type="text"
              name="description"
              label="description"
              setForm={setForm}
              required={true}
            />
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </CreateNew>
        <Filter />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
        {data.map((x) => {
          return (
            <Card url="associations" id={x.id} key={x.id}>
              <h3 className="card-title capitalize font-medium text-xl text-primary">
                {x.name}
              </h3>
              <h4 className="capitalize text-md text-secondary">
                {x.address}, <span className="font-medium">{x.town}</span>
              </h4>
              <p>{x.description}</p>
              <button className="btn btn-error">
                <FaTrash onClick={() => handleDelete(x.id)} />
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Associations;
