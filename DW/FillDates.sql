  DECLARE @start DATE = '2016-01-01'
  WHILE @start < '2022-01-01'
  BEGIN
	INSERT INTO DIM_TIME(Date,
	                     Year, 
						 MonthNumeric, 
						 Day, 
						 Month)
	VALUES(@start,
	        DATEPART(YY,@start),
			DATEPART(mm,@start),
			DATEPART(dd,@start), 
			DATENAME(mm,@start))
	
	SET @start = DATEADD(dd,1,@start)
  END