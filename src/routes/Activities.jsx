import React from "react";
import List from "../components/List";
import Filter from "../components/Filter";
import Title from "../components/Title";
import Select from "../components/Select";

const data = [
  {
    activity: "Animal Shelter Volunteer",
    date: "05.05.2024. 10:00",
    description:
      "Spend the day at the local animal shelter caring for dogs and cats at 123 Oak Street, Springfield.",
  },
  {
    activity: "Tree Planting Event",
    date: "12.05.2024. 12:00",
    description:
      "Join us in planting trees in the community park at 456 Elm Avenue, Oakville, to enhance the environment, provide shade, and improve air quality for generations to come.",
  },
  {
    activity: "Soup Kitchen Assistance",
    date: "18.05.2024. 16:00",
    description:
      "Help serve meals to the homeless and less fortunate at the local soup kitchen located at 789 Pine Road, Meadowview.",
  },
  {
    activity: "Elderly Care Workshop",
    date: "02.06.2024. 17:00",
    description:
      "Participate in a workshop focused on elderly care, learning valuable skills and techniques at the Senior Support Center, 555 Maple Lane, Cedarville.",
  },
  {
    activity: "Habitat Restoration Project",
    date: "15.06.2024. 14:00",
    description:
      "Contribute to the restoration of natural habitats by removing invasive species and planting native vegetation in designated conservation areas. Meeting point: 987 Cedar Avenue, Riverside.",
  },
];

function Activities() {
  return (
    <div>
      <Title title="Activities" />
      <div className="divider"></div>
      <div className="flex justify-end items-center">
        <Select />
        <Filter />
      </div>
      <div className="grid mt-12 gap-y-8">
        {data.map((x, index) => {
          return <List data={x} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Activities;
