import React from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import Title from "../components/Title";
import Select from "../components/Select";

const data = [
  {
    name: "Community Action Coalition",
    address: "123 Main Street",
    town: "Springfield",
    description:
      "The Community Action Coalition works to address social and economic issues within the community through various programs and initiatives, including education, advocacy, and outreach.",
  },
  {
    name: "Green Earth Society",
    address: "456 Elm Avenue",
    town: "Oakville",
    description:
      "The Green Earth Society focuses on environmental conservation and sustainability efforts, such as tree planting, recycling programs, and raising awareness about climate change.",
  },
  {
    name: "Helping Hands Foundation",
    address: "789 Pine Road",
    town: "Meadowview",
    description:
      "The Helping Hands Foundation provides support and assistance to individuals and families in need through food drives, financial aid programs, and community outreach initiatives.",
  },
  {
    name: "Animal Welfare League",
    address: "321 Oak Street",
    town: "Willowbrook",
    description:
      "The Animal Welfare League is dedicated to the welfare and protection of animals, including rescue, rehabilitation, and adoption programs for stray and abandoned pets.",
  },
  {
    name: "Senior Support Center",
    address: "555 Maple Lane",
    town: "Cedarville",
    description:
      "The Senior Support Center offers a range of services and activities to enhance the well-being and quality of life for elderly members of the community, including social events, health workshops, and assistance programs.",
  },
  {
    name: "Children's Education Initiative",
    address: "987 Cedar Avenue",
    town: "Riverside",
    description:
      "The Children's Education Initiative focuses on improving educational opportunities and outcomes for children in the community through tutoring programs, after-school activities, and advocacy efforts.",
  },
];

function Associations() {
  return (
    <div>
      <Title title="Associations" />
      <div className="divider"></div>
      <div className="flex justify-end items-center">
        <Select />
        <Filter />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
        {data.map((x, index) => {
          return <Card data={x} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Associations;
