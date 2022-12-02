

with trans as(
   SELECT transaction_date, type from transactions
WHERE TO_DATE(transaction_date,'YYYY-MM-DD') BETWEEN '2021-04-07' and date '2021-04-07'+ interval '6 months' 
AND 
"senatorId"=100
AND ticker='OXY'
)
, hist as (
   SELECT "date", "SPY", "OXY" from "historical_pricesH_R" 
   -- WHERe TO_DATE("date",'YYYY-MM-DD') BETWEEN '2021-04-07' and date '2021-04-07'+ interval '6 months' 
   WHERE TO_DATE("date",'YYYY-MM-DD') BETWEEN date '2021-04-07' - interval '1 week'  and date '2021-04-07' + interval '6 months' 
    order by "date"
)
  select hist."SPY", hist."OXY",  
   CASE 
    WHEN hist."date" is null
    THEN trans.transaction_date
    ELSE hist."date"
   END as date, 
   trans.type, 
   trans.transaction_date
    from hist 
   full outer join trans 
   on    trans.transaction_date = hist."date"
   order by date
;
--QUERY STRING 

    with trans as(
      SELECT transaction_date, type from transactions
   WHERE TO_DATE(transaction_date,'YYYY-MM-DD')  BETWEEN date '${startDate}' and date '${startDate}' + interval '6 months' 
   AND 
   "senatorId"=${senatorIdInt}
   AND ticker='${ticker}'
   )
   , 
   hist as (
      SELECT "date", "SPY", "${ticker}" from ${tableName}
     WHERE TO_DATE("date",'YYYY-MM-DD')  BETWEEN date '${startDate}' - interval '1 week' and date '${startDate}' + interval '6 months' 
       order by "date"
   )
   select hist."SPY", hist."${ticker}",  
   CASE 
    WHEN hist."date" is null
    THEN trans.transaction_date
    ELSE hist."date"
   END as date, 
   trans.type, 
   trans.transaction_date
    from hist 
   full outer join trans 
   on    trans.transaction_date = hist."date"
   order by date
   ;
