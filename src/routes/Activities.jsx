import { useEffect, useState } from "react";
import { CreateNew, Input, Title, List, Select } from "../components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function Activities() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isAdmin } = useContext(UserContext);

  const fetchActivities = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/activities`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setForm((prev) => {
      return { ...prev, date: new Date(date).toISOString() };
    });
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  const handleSort = (name, value) => {
    let sortedData = [];
    switch (value) {
      case "Name A-Z":
        sortedData = [...data].sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        setData(sortedData);
        break;
      case "Name Z-A":
        sortedData = [...data].sort((a, b) =>
          a.name > b.name ? -1 : b.name > a.name ? 1 : 0
        );
        setData(sortedData);
        break;

      case "Oldest":
        sortedData = [...data]
          .sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          })
          .reverse();
        setData(sortedData);
        break;

      case "Recent":
        sortedData = [...data].sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        setData(sortedData);
        break;
    }
  };

  const handleCreateNew = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios.post(`http://localhost:3001/activities`, form).then(() => {
      console.log("created");
      fetchActivities();
    });
  };

  const handleDelete = (event, id) => {
    setIsLoading(true);
    axios.delete(`http://localhost:3001/activities/${id}`).then(() => {
      console.log("deleted");
      fetchActivities();
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Title title="Activities" />
      <div className="divider"></div>
      <div className="flex justify-end items-center gap-4">
        {true && (
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

              <label className="form-control w-full max-w-xs">
                <div className="label capitalize">
                  <span className="label-text">Date and Time</span>
                </div>
                <DatePicker
                  className="px-4 py-3 w-full border border-primary rounded-lg"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd HH:mm"
                  showTimeInput
                  required
                />
              </label>

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

              <label className="form-control w-full max-w-xs">
                <div className="label capitalize">
                  <span className="label-text">Description</span>
                </div>
                <textarea
                  id="description"
                  name="description"
                  className="textarea textarea-primary w-full"
                  required
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                ></textarea>
              </label>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </CreateNew>
        )}

        <Select
          options={["Name A-Z", "Name Z-A", "Oldest", "Recent"]}
          setValue={handleSort}
          name="sort"
          defaultText={"Sort by"}
        />
      </div>
      <div className="grid mt-12 gap-y-8">
        {data.length === 0 && (
          <p className="text-center">There are no activities...</p>
        )}
        {data &&
          data.map((x, index) => {
            return (
              <div className="relative" key={x.id}>
                <List url="activities" id={x.id} className="relative">
                  <div className="ml-0 sm:ml-16">
                    <h3 className="card-title capitalize font-medium text-xl mb-12">
                      {x.name}
                    </h3>
                    <h4 className=" text-md text-neutral-content">
                      {truncateText(x.description, 150)}
                    </h4>
                    <p className="text-secondary font-medium sm:ml-auto mt-4">
                      {format(new Date(x.date), "yyyy-MM-dd h:mm a")}
                    </p>
                  </div>
                </List>
                {isAdmin && (
                  <button
                    className="btn btn-error absolute bottom-5 right-32"
                    onClick={(event) => handleDelete(event, x.id)}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Activities;
