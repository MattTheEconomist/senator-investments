CREATE TABLE trades( 
   -- transaction_id SERIAL PRIMARY KEY, 
 transaction_date  VARCHAR(15),
 disclosure_date  VARCHAR(15),
 owner VARCHAR(15),
ticker  VARCHAR(15),
asset_description  VARCHAR(255),
asset_type  VARCHAR(55),
type  VARCHAR(50),
amount  VARCHAR(50),
comment VARCHAR(100),
senator  VARCHAR(100)
ptr_link VARCHAR(255)
   );


DROP TABLE IF EXISTS trades;



COPY trades( 
   -- transaction_id, 
 transaction_date,
 disclosure_date ,
 owner ,
ticker ,
asset_description,
asset_type ,
type ,
amount ,
comment ,
senator, 
ptr_link )
-- FROM 'C:\Users\Public\all_transactions.csv'
FROM 'C:\Users\Public\test.csv'
DELIMITER ','
CSV HEADER;






