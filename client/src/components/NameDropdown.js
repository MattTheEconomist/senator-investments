import React from "react";
import { useState, useEffect } from "react";

// import { useHistory } from 'react-router-dom';

const NameDropdown = ({ senatorData, isFetching, fetchSenatorData 
,nameSelected
,setNameSelected
}) => {
  const [allSenatorNames, setAllSenatorNames] = useState([])
  const [senatorIdSelected, setSenatorIdSelected ] = useState(0)

  useEffect(() => {
    fetchSenatorData(nameSelected);
    fetchSenatorNames()
  }, []);

  useEffect(() => {
    fetchSenatorData(nameSelected);
    // console.log('name dropdown', nameSelected, senatorData)
  }, [nameSelected]);

  useEffect(() => {
    fetchSenatorData(nameSelected);
    // console.log('name dropdown', nameSelected, senatorData)

        console.log('allSenatorNames',allSenatorNames )
        if(allSenatorNames.length >0){

          let shortNameString = nameSelected.substring(1, nameSelected.length-1)

          let selectedRow = allSenatorNames.filter(row=>row.senator===shortNameString)
            selectedRow = selectedRow[0]
            setSenatorIdSelected(selectedRow.senatorId)

            const senIdSel = selectedRow.senatorId

            console.log('asldkfals;dkjflask', selectedRow, senIdSel, senatorIdSelected)

        }
  }, [nameSelected]);

  useEffect(()=>{
    console.log("brooooo", senatorIdSelected)
  }, [senatorIdSelected])



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



    return (
      <option key={`key${searchFormatName}`} id={rowSenatorId} value={`${searchFormatName}`}>
        {/* <a href="/bro">{appFormatName}</a> */}
      {appFormatName}

      </option>
    );
  });




  const onSelect = async (e) => {
    e.preventDefault();
     setNameSelected(e.target.value)

    fetchSenatorData(nameSelected);

    // history.push(`/senatorprofile/${nameSelected}`)

    // const currentIdSelected = e.target.id 


    // console.log("C", currentIdSelected)


  };

  return <div><select onChange={onSelect}>{optionItems}</select>
  <a href="/bro">sdfsdfsdfs
  </a>
  </div>;
};

export default NameDropdown;
