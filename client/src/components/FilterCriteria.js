// import React from "react";

// const FilterCriteria = () => {
//   const amounts = [
//     "$1,001 - $15,000",
//     "$15,001 - $50,000",
//     "$50,001 - $100,000",
//     "$100,001 - $250,000",
//     "$250,001 - $500,000",
//     "$500,001 - $1,000,000",
//     "$1,000,001 - $5,000,000",
//     "$5,000,001 - $25,000,000",
//     "$25,000,001 - $50,000,000",
//     "Over $50,000,000",
//     "Unknown",
//   ];

//   const optionItems = amounts.map((amount) => {
//     return (
//       <option key={`key${amount}`} value={`${amount}`}>
//         {amount}
//       </option>
//     );
//   });

//   const onSelect = async (e) => {
//     const amountSelected = e.target.value;
//     const column = "amount";

//     e.preventDefault();

//     try {
//       let fetchString = `http://localhost:5000/trades`;
//       fetchString += `?${column}='${amountSelected}'`;


//       const response = await fetch(fetchString);
//       const jsonData = await response.json();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <select className="form-select" onChange={onSelect}>
//         {optionItems}
//       </select>
//     </>
//   );
// };

// export default FilterCriteria;
