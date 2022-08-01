import React from "react";
import { useState, useEffect } from "react";

const NameDropdown = ({ senatorData, isFetching, fetchSenatorData }) => {
  const [nameSelected, setNameSelected] = useState("'Sheldon Whitehouse'");

  useEffect(() => {
    fetchSenatorData(nameSelected);
  }, []);

  const senatorNameList = [
    "Shelley M Capito",
    "Sheldon Whitehouse",
    "Thomas H Tuberville",
  ];

  const optionItems = senatorNameList.map((name) => {
    const formattedName = `'${name}'`;
    return (
      <option key={`key${name}`} value={`${formattedName}`}>
        {name}
      </option>
    );
  });

  const onSelect = async (e) => {
    const nameSelected = e.target.value;
    const column = "senator";

    e.preventDefault();

    fetchSenatorData(nameSelected);
  };

  return <select onChange={onSelect}>{optionItems}</select>;
};

export default NameDropdown;
