import { useEffect, useState } from "react";



const LeaderboardCard = ({cardId})=> {

        const [isFetchingSummary, setIsFetchingSummary] = useState(false)
        const [summaryData, setSummaryData] = useState([])

        useEffect(()=>{
            fetchSummaryStats()
        },[])

    // create summary table and fetch from here

    async function fetchSummaryStats() {

        setIsFetchingSummary(true);
        try {
          const fetchString = `http://localhost:5001/summary-stats`; 
          const response = await fetch(fetchString);
          const jsonData = await response.json();
          setSummaryData(jsonData)
          setIsFetchingSummary(false)

          console.log("leaderboard card", summaryData)
    
        } catch (error) {
          console.error(error);
        }
      
      }




    const cardIdMap = {
        highestAlphaSen: {title: "Highest Alpha Senator", 
        info: "William Cassidy, mean alpha 10.15" }, 

        mostTradedStock: {title: "Most Traded Stock", 
        info: "XOM, 50 transactions" }, 

        bestTrade: {title: "Best OverallTrade", 
        info: "Thomas Carper, SI, 11/20/2020,  alpha: 450! " }, 

    }




    return (    
      <div className="summaryStatsCard">
        <div className="statsCardTitle">{cardIdMap[cardId].title}</div>
        <div className="statsInfoContainer">
        <p className="statsCardInfo">{cardIdMap[cardId].info}</p>

        {/* <p>asdasdfasdf{JSON.stringify(summaryData)}</p> */}

        </div>
      </div>


        )
}




export default LeaderboardCard;