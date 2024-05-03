import { useEffect, useState } from "react";
import { CreateNew, Input, Filter, Title, Card } from "../components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../context";
import { FaCheck } from "react-icons/fa";

function Associations() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin } = useContext(UserContext);

  const fetchAssociations = async () => {
    setIsLoading(true);
    axios.get(`http://localhost:3001/associations`).then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchAssociations();
  }, []);

  const handleDelete = (id) => {
    setIsLoading(true);
    axios.delete(`http://localhost:3001/associations/${id}`).then(() => {
      console.log("deleted");
      fetchAssociations();
    });
  };

  const handleCheck = (e, id) => {
    e.preventDefault();
    // axios.patch(`http://localhost:3001/associations/${id}`).then(() => {
    //   console.log("applied");
    //   fetchAssociations();
    // });
  };

  const handleCreateNew = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post(`http://localhost:3001/associations`, { ...form, requested: true })
      .then(() => {
        console.log("created");
        fetchAssociations();
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
      </div>

      {data.length === 0 && (
        <p className="text-center">There are no associations...</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12 mb-24">
        {data.map((x) => {
          if (!x.requested) {
            return (
              <Card url="associations" id={x.id} key={x.id}>
                <h3 className="card-title capitalize font-medium text-xl text-primary">
                  {x.name}
                </h3>
                <h4 className="capitalize text-md text-secondary">
                  {x.address}, <span className="font-medium">{x.town}</span>
                </h4>
                <p>{x.description}</p>
                {isAdmin && (
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(x.id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </Card>
            );
          }
        })}
      </div>

      <Title title="Requests waiting to approve" />
      <div className="divider"></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
        {data.map((x) => {
          if (x.requested && isAdmin) {
            return (
              <Card url="associations" id={x.id} key={x.id}>
                <h3 className="card-title capitalize font-medium text-xl text-primary">
                  {x.name}
                </h3>
                <h4 className="capitalize text-md text-secondary">
                  {x.address}, <span className="font-medium">{x.town}</span>
                </h4>
                <p>{x.description}</p>
                {isAdmin && (
                  <div className="flex gap-4">
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(x.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleCheck(x.id)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Associations;
