import { useEffect, useState } from "react";
import { CreateNew, Input, Filter, Title, List } from "../components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function Activities() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const fetchActivities = () => {
    axios.get(`http://localhost:3001/activities`).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  const handleCreateNew = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/activities`, form).then(() => {
      console.log("created");
      fetchActivities();
    });
  };

  const handleDelete = (event, id) => {
    event.stopPropagation();

    axios.delete(`http://localhost:3001/activities/${id}`).then(() => {
      console.log("deleted");
      fetchActivities();
    });
  };

  return (
    <div>
      <Title title="Activities" />
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
              type="date"
              name="date"
              label="date"
              setForm={setForm}
              required={true}
            />
            <Input
              type="text"
              name="location"
              label="location"
              setForm={setForm}
              required={true}
            />
            <Input
              type="text"
              name="organization"
              label="organization"
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
      <div className="grid mt-12 gap-y-8">
        {data.map((x, index) => {
          return (
            <List url="activities" id={x.id} key={index}>
              <div className="ml-0 sm:ml-16">
                <h3 className="card-title capitalize font-medium text-xl mb-12">
                  {x.name}
                </h3>
                <h4 className=" text-md text-neutral-content">
                  {truncateText(x.description, 150)}
                </h4>
                <p className="text-secondary font-medium sm:ml-auto mt-4">
                  {x.date}
                </p>
              </div>
              <button className="btn btn-error z-10">
                <FaTrash onClick={(event) => handleDelete(event, x.id)} />
              </button>
            </List>
          );
        })}
      </div>
    </div>
  );
}

export default Activities;
