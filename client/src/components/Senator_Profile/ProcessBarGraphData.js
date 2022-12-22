export function preProcessData(rawData){

    if(!rawData){
        return []
    }


    // let rez = rawData
    let rez = []
    let quarterlyChunks = {}
    // console.log(rawData)

    for(let i=0; i<rawData.length; i++){
        const currentRow = rawData[i]
        const currentDate = currentRow.transaction_date
        const currentMonth = currentDate .split("-")[1]
        const currentYear= currentDate .split("-")[0]
        const currentQuarter = Math.ceil(currentMonth/3)
        const currentTrans = currentRow.type

        const chunkKey = `${currentYear}_${currentQuarter}`

        if(!quarterlyChunks[chunkKey]){
            quarterlyChunks[chunkKey] =[]
        }

        quarterlyChunks[chunkKey].push(currentTrans)
    }



        let quarterKeys  = Object.keys(quarterlyChunks)


        //sort keys
            quarterKeys = quarterKeys.sort()

            const startQuarter = quarterKeys[0]
            const endQuarter = quarterKeys.pop()

            if(!startQuarter){
                return []
            }

            const yearDiff = parseInt(endQuarter.split("_")[0]) - parseInt(startQuarter.split("_")[0])+1

            const totalQuarters = yearDiff*4

            let previousQuarter = startQuarter

            let allQuarters = [startQuarter]

            for (let q=1; q<totalQuarters; q++){
                previousQuarter = allQuarters[q-1]
                const previousQuarter_q = parseInt(previousQuarter.split("_")[1])
                const previousQuarter_y = parseInt(previousQuarter.split("_")[0])

                let currentQuarter = ''
                                    
                if(previousQuarter_q===4){
                    currentQuarter= `${previousQuarter_y+1}_1`
                }else{
                    currentQuarter= `${previousQuarter_y}_${previousQuarter_q+1}`
                }

                allQuarters.push(currentQuarter)
            }


            let quarterlyChunks_final = {}

            
        
            for (let g=1; g<allQuarters.length; g++){
                const currentQuarter = allQuarters[g]

                if(!quarterlyChunks[currentQuarter]){
                    quarterlyChunks_final[currentQuarter] = {"Purchase": 0, "Sale":0}
                }else{
                    const currentTransactionsList = quarterlyChunks[currentQuarter]
                    const purchaseCount = currentTransactionsList.filter(trans=> trans==="Purchase").length
                    const saleCount =  currentTransactionsList.length - purchaseCount
                    quarterlyChunks_final[currentQuarter] = {"Purchase": purchaseCount, "Sale":saleCount}
                    

                }

            }

            // console.log(quarterlyChunks_final)
            return quarterlyChunks_final 

}

export default preProcessData

