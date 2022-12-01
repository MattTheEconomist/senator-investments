



with trans as(
   SELECT transaction_date, type from transactions
-- WHERE TO_DATE(transaction_date,'YYYY-MM-DD') BETWEEN '2021-04-07' and date '2021-04-07'+ interval '6 months' 
-- AND 
WHERE 
"senatorId"=100
AND ticker='OXY'
)
, hist as (
   SELECT "date", "SPY", "OXY" from "historical_pricesH_R"  order by "date"
)
select hist."date",  hist."SPY", hist."OXY", trans.type, 
trans.transaction_date
 from hist 
left join trans 
on 
trans.transaction_date = hist."date"
-- select * from trans


;



-- select * from cte
-- select historical_pricesH_R.OXY limit 1
-- select "historical_pricesH_R"."OXY" limit 1


--find senatorId column 

select "senatorId" from transactions limit 1;



-- select * from transactions where false ; 

SELECT "date", "SPY", "${ticker}" from ${tableName} order by "date"
SELECT "date", "SPY", "A" from "historical_pricesA_G" order by "date" limit 3; 

