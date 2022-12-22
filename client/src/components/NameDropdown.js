import React from "react";
import { useState, useEffect } from "react";

const NameDropdown = ({ senatorData, isFetching, fetchSenatorData 
,nameSelected
,setNameSelected
}) => {
  const [allSenatorNames, setAllSenatorNames] = useState([])

  useEffect(() => {
    fetchSenatorData(nameSelected);
    fetchSenatorNames()
    // console.log(allSenatorNames)
  }, []);

  useEffect(() => {
    fetchSenatorData(nameSelected);
    // console.log(allSenatorNames)
  }, [nameSelected]);



  async function fetchSenatorNames() {
    try {
      const fetchString = `http://localhost:5001/senators-unique`;
      const response = await fetch(fetchString);
      let jsonData = await response.json();

      //remove duplicates 
      jsonData = jsonData.filter((value, index, self) =>
      index === self.findIndex((row) => (
        row.senatorId === value.senatorId 
      ))
    )
    setAllSenatorNames(jsonData)


    } catch (error) {
      console.error(error);
    }
  }



  const optionItems = !allSenatorNames ? <></>: allSenatorNames.map((row) => {
    const searchFormatName = `'${row.senator}'`;
    const appFormatName = `${row.senator}`

    return (
      <option key={`key${searchFormatName}`} value={`${searchFormatName}`}>
        {appFormatName}
      </option>
    );
  });




  const onSelect = async (e) => {
    e.preventDefault();
     setNameSelected (e.target.value)

    fetchSenatorData(nameSelected);
  };

  return <select onChange={onSelect}>{optionItems}</select>;
};

export default NameDropdown;
