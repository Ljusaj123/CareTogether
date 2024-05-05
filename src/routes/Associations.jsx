import { useEffect, useState, useContext } from "react";
import { CreateNew, Input, DeleteModal, Title, Card } from "../components";
import axios from "axios";
import { FaTrash, FaCheck } from "react-icons/fa";
import UserContext from "../context";

function Associations() {
  const { isAdmin } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDelete, setCardToDelete] = useState("");

  useEffect(() => {
    fetchAssociations();
  }, []);

  const fetchAssociations = async () => {
    setIsLoading(true);
    axios.get(`http://localhost:3001/associations`).then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
  };

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:3001/associations/${cardToDelete}`)
      .then(() => {
        console.log("deleted");
        fetchAssociations();
      });
  };

  const handleCheck = (id) => {
    setIsLoading(true);
    axios
      .patch(`http://localhost:3001/associations/${id}`, { requested: false })
      .then(() => {
        console.log("applied");
        fetchAssociations();
      });
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

  const openModal = (id) => {
    setCardToDelete(id);
    document.getElementById("my_modal_1").showModal();
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
              name="imageURL"
              label="image URL"
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
        {data.map((association) => {
          const { requested, id, name, imageURL, address, description, town } =
            association;

          if (!requested) {
            return (
              <Card url="associations" id={id} key={id} img={imageURL}>
                <h3 className="card-title capitalize font-medium text-xl text-primary">
                  {name}
                </h3>
                <h4 className="capitalize text-md text-secondary">
                  {address}, <span className="font-medium">{town}</span>
                </h4>
                <p>{description}</p>
                {isAdmin && (
                  <button
                    title="Delete"
                    className="btn btn-error"
                    onClick={() => openModal(id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </Card>
            );
          }
        })}
      </div>

      {isAdmin && (
        <div>
          <Title title="Requests waiting to approve" />
          <div className="divider"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
            {data.map((association) => {
              const {
                requested,
                id,
                name,
                imageURL,
                address,
                description,
                town,
              } = association;
              if (requested) {
                return (
                  <Card url="associations" id={id} key={id} img={imageURL}>
                    <h3 className="card-title capitalize font-medium text-xl text-primary">
                      {name}
                    </h3>
                    <h4 className="capitalize text-md text-secondary">
                      {address}, <span className="font-medium">{town}</span>
                    </h4>
                    <p>{description}</p>
                    {isAdmin && (
                      <div className="flex gap-4">
                        <button
                          title="Approve"
                          className="btn btn-success"
                          onClick={() => handleCheck(id)}
                        >
                          <FaCheck />
                        </button>
                        <button
                          title="Delete"
                          className="btn btn-error"
                          onClick={() => openModal(id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </Card>
                );
              }
            })}
          </div>
          <DeleteModal
            handleDelete={handleDelete}
            setToDelete={setCardToDelete}
          />
        </div>
      )}
    </div>
  );
}

export default Associations;
