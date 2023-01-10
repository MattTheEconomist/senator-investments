// import { useState } from "react";
// import React from "react";
import { useEffect, useState } from "react";


import { Link, Outlet } from 'react-router-dom';


const HomePageOutter = ()=> {

    const [topSenatorData, setTopSenatorData] = useState([])
    const  [isFetchingTop, setIsFetchingTop] = useState(false)


    useEffect(()=>{
        fetchTopSenators()
    },[])


    async function fetchTopSenators() {

        setIsFetchingTop(true);
        try {
          const fetchString = `http://localhost:5001/senators-top`; 
          const response = await fetch(fetchString);
          const jsonData = await response.json();
          setTopSenatorData(jsonData)
          setIsFetchingTop(false)
    
        } catch (error) {
          console.error(error);
        }
      
      }

      const topSenatorsTable = topSenatorData.length==0? 
      <></>
      :topSenatorData.map((row, idx)=> {
        return(
            <Link key={`link${idx}`} className="senProfileLink" to={`/senatorProfile/${row.senator_id}`}>
            <div  className="topSenatorsRow" key={`topSenRow${idx}`} >
            <div  className="topSenatorsNameCell"  key={`topSenName${idx}`}>{row.senator}</div>
            <div  className="topSenatorsPurchCell" key={`topSenPurch${idx}`}>{row.purchases}</div>
        </div>
        </Link>
        )
      }
      
    
      )


    return <>

    <div id="titleContainer">
        <h1 id="titleText">Invest Like a Senator</h1></div>

        <div id="homePageContentOutter">

      <div id="firstTextContainer" className="homePageTextContainer">
    <p className="homePageText" id="firstText">Welcome! To detailed information on stock purchases
    made by a senator, click a row from the table below. 
    </p>
      </div>

<div id="topTableAndTextContainer">
<div id="topSenatorTable_Outter">
        <div id="topSenatorTable_Header">
            <div className="topSenatorsNameCell" id="topSenatorsName_Header">Senator</div>
            <div className="topSenatorsPurchCell" id="topSenatorsPurch_Header">Stock Purchases</div>
        </div>

    {topSenatorsTable} 
    </div>

    <div id="explanatoryTextContainer" className="homePageTextContainer">
      <p className="questionText">What is the purpose of this project?</p>
      <p className="answerText">To evaluate the success of stock purchases made by senators. Lots of other websites list senator stock transactions, but its hard to find sites that evaluate the performance of these transactions</p>
      <p className="questionText">How is the success of a stock purchase measured? </p>
      <p className="answerText">There are a lot of ways, within the context of this web application we use <a href="https://www.investopedia.com/terms/a/alpha.asp#:~:text=Alpha%20(%CE%B1)%20is%20a%20term,to%20systematically%20earn%20returns%20that" target="_blank"><span className="boldText">alpha</span></a></p>

      <p className="questionText">What is Alpha? </p>
      <p className="answerText">Alpha is the return generated on an investment in excess of the return achieved by the average investor. To measure the return achieved by the average investor, we use the S&P 500. To measure the excess return (or alpha) we compare growth rate of the S&P 500 and the growth rate of the investment.</p>

      <p className="answerText"> For example, Thomas Carper purchased HBI stock on 01/26/2015. Three months after his purchase, HBI increased 31% while the S&P increased about 1%. The alpha of this investment is 31% - 1% or 30. </p>

      <p className="questionText">Why measure investment success using alpha?  </p>
      <p className="answerText"> In this case, high alpha values are indicative of inside information.  </p>
      </div>

</div>

<div id="homePageSummaryInfo" className="homePageTextContainer">

<h1 id="leaderboardTitle">Leaderboard</h1>
      <div id="leaderboardCardsContainer">
      <div className="summaryStatsCard">
        <div className="statsCardTitle">Highest Alpha Senator</div>
        <div className="statsInfoContainer">
        <p className="statsCardInfo">William Cassidy, mean alpha 10.15</p>

        </div>
      </div>

      <div className="summaryStatsCard">
        <div className="statsCardTitle">Most Traded Stock </div>
        <div className="statsInfoContainer">
        <p className="statsCardInfo">XOM, 50 transactions </p>
        </div>

      </div>


      <div className="summaryStatsCard">
        <div className="statsCardTitle">Best Trade </div>
        <div className="statsInfoContainer">
        <p className="statsCardInfo">Thomas Carper, SI, 11/20/2020,  alpha: 450! </p>
        </div>
      </div>


      </div>



</div>

<div id="homePageFooter">
    <div id="homePageFooterTextContainer">
    <p id="homePageFooterText">This app was created by me, Matt Ashford.  For more information no how this was built, please see <a href="https://github.com/MattTheEconomist/senator-investments" target="_blank" className="footerLink">its github repo</a>. All data (senators, transactions, historical stock prices) is housed within the app. For more information on the exploratory data analysis and ETL please see <a href="https://github.com/MattTheEconomist/Senator-Investments-ETL" target="_blank" className="footerLink">this other github repo</a></p>
    </div>



</div>

</div>
 



    <Outlet /> 
    
    </>
}

export default HomePageOutter