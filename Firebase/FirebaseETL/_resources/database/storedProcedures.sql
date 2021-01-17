SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Inserts a new sales goal into the FACT_GOALS table
CREATE PROCEDURE insertSalesGoal
	@SellerId int,
	@TimeId int,
	@Amount decimal(18, 4),
	@GroupId int
AS
BEGIN
	INSERT INTO FACT_GOALS(SellerID, TimeID, Amount, GroupID) 
	VALUES (@SellerId, @TimeId, @Amount, @GroupId);
END
GO
