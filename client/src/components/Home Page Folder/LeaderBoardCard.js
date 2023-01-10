import { useEffect, useState } from "react";



const LeaderboardCard = ({cardId})=> {

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

        </div>
      </div>


        )
}


export default LeaderboardCard;