import React from "react";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom"

const NameDropdown = ({ senatorData, isFetching, fetchSenatorData 
,nameSelected
,setNameSelected
,senatorIdSelected 
,setSenatorIdSelected

// ,idSelected

}) => {
  const [allSenatorNames, setAllSenatorNames] = useState([])

  useEffect(() => {

    fetchSenatorNames()
  }, []);

  useEffect(() => {
    // fetchSenatorData(nameSelected);
    fetchSenatorData(senatorIdSelected );
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
    const rowSenatorId = row.senatorId

    // const linkAddress = `/senatorProfile/'${rowSenatorId}'`
    const linkAddress = `/senatorProfile/${rowSenatorId}`



    return (
      <option key={`key${searchFormatName}`} id={rowSenatorId} value={`${searchFormatName}`}>
        {/* <a href="/bro">{appFormatName}</a> */}
      {/* <Link to={linkAddress} > */}
        {appFormatName}
{/* </Link> */}
      </option>
    );
  });




  const onSelect = async (e) => {
    e.preventDefault();
     setNameSelected(e.target.value)
     setSenatorIdSelected(e.target.id)
      fetchSenatorData(e.target.id);


  };

  return <div><select onChange={onSelect}>{optionItems}</select>
  </div>;
};

export default NameDropdown;
