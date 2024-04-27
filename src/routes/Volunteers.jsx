import React from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import Title from "../components/Title";
import Select from "../components/Select";

const data = [
  {
    name: "Alice Johnson",
    age: 25,
    email: "alice@example.com",
    phone: "123-456-7890",
    association: "Community Action Coalition",
  },
  {
    name: "David Smith",
    age: 30,
    email: "david@example.com",
    phone: "234-567-8901",
    association: "Green Earth Society",
  },
  {
    name: "Emily Brown",
    age: 22,
    email: "emily@example.com",
    phone: "345-678-9012",
    association: "Helping Hands Foundation",
  },
  {
    name: "Michael Wilson",
    age: 28,
    email: "michael@example.com",
    phone: "456-789-0123",
    association: "Animal Welfare League",
  },
  {
    name: "Sophia Martinez",
    age: 26,
    email: "sophia@example.com",
    phone: "567-890-1234",
    association: "Senior Support Center",
  },
  {
    name: "James Taylor",
    age: 35,
    email: "james@example.com",
    phone: "678-901-2345",
    association: "Children's Education Initiative",
  },
];

function Volunteers() {
  return (
    <div>
      <Title title="Volunteers" />
      <div className="divider"></div>
      <div className="flex justify-end items-center">
        <Select />
        <Filter />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
        {/* {data.map((x, index) => {
          return <Card data={x} key={index} />;
        })} */}
      </div>
    </div>
  );
}

export default Volunteers;
