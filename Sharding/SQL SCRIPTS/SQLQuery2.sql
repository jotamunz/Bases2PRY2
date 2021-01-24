USE Demo_Complete_DataWarehouse

CREATE TABLE DESTINATION_DATATYPES
    (
		id int primary key not null,
        ArticleID int,
		SellerID int,
		ClientID int,
		TimeID int,
		Quantity int,
		UnitPriceColones decimal(18,4),
		TotalColones decimal (18,4),
		TaxColones decimal(18,4),
		ProfitColones decimal(18,4),
		UnitPriceDollars decimal(18,4),
		TotalDollars decimal(18,4),
		ProfitDollars decimal(18,4),
		TaxDollars decimal(18,4)
    )


CREATE TABLE DESTINATION_STRINGS
    (
		id int IDENTITY(1,1) primary key not null,
        Almacen nvarchar(50),
		Cantidad nvarchar(50),
		Cliente nvarchar(50),
		Fecha nvarchar(50),
		FechaVencimiento nvarchar(50),
		Ganancia nvarchar(50),
		GananciaUSD nvarchar(50),
		Impuesto nvarchar(50),
		ImpuestoUSD nvarchar(50),
		Moneda nvarchar(50),
		Precio nvarchar(50),
		Producto nvarchar(50),
		Tipo_de_cambio nvarchar(50),
		Total nvarchar(50),
		TotalUSD nvarchar(50),
		Vendedor nvarchar(50)
    )

CREATE TABLE DESTINATION_CASTING
    (
		id int primary key not null,
        Almacen nvarchar(50),
		Cantidad int,
		Cliente nvarchar(50),
		Fecha date,
		FechaVencimiento date,
		Ganancia decimal(18,4),
		GananciaUSD decimal(18,4),
		Impuesto decimal(18,4),
		ImpuestoUSD decimal(18,4),
		Moneda nvarchar(50),
		Precio decimal(18,4),
		Producto nvarchar(50),
		Tipo_de_cambio decimal(18,4),
		Total decimal(18,4),
		TotalUSD decimal(18,4),
		Vendedor decimal(18,4),
		PrecioUSD decimal(18,4) DEFAULT(0)
    )

DROP TABLE DESTINATION_STRINGS
DROP TABLE DESTINATION_CASTING
DROP TABLE DESTINATION_DATATYPES


INSERT INTO dbo.DESTINATION_CASTING (
	   [id]
      ,[Fecha]
      ,[FechaVencimiento]
      ,[Cliente]
	  ,[Producto]
      ,[Cantidad]
      ,[Moneda]
      ,[Precio]
      ,[Total]
      ,[Almacen]
      ,[Vendedor]
      ,[TotalUSD]
      ,[Impuesto]
      ,[ImpuestoUSD]
      ,[Tipo_de_cambio]
      ,[Ganancia]
      ,[GananciaUSD]
)
SELECT 
T1.id,
Convert(date,T1.Fecha,102) ,
Convert(date,T1.FechaVencimiento,102) ,
CAST (T1.Cliente AS NCHAR(5)),
CAST (T1.Producto AS NCHAR(7)),
CAST ((CONVERT(DECIMAL(10,2), T1.Cantidad)) AS INT),
CAST (T1.Moneda AS NCHAR (3)),
CAST (T1.Precio AS DECIMAL (30, 5)),
CAST (T1.Total AS DECIMAL (30, 5)),
CAST (T1.Almacen AS INT),
CAST (T1.Vendedor AS INT),
CONVERT(DECIMAL(18,4),T1.TotalUSD),
CONVERT(DECIMAL(18,4),T1.Impuesto),
CONVERT(DECIMAL(18,4),T1.ImpuestoUSD),
CONVERT(DECIMAL(18,4),T1.Tipo_de_cambio),
CONVERT(DECIMAL(18,4),T1.Ganancia),
CONVERT(DECIMAL(18,4),T1.GananciaUSD)
FROM dbo.DESTINATION_STRINGS AS T1


DROP TABLE DESTINATION_CASTING

SELECT Impuesto FROM dbo.DESTINATION_STRINGS
SELECT * FROM dbo.DESTINATION_CASTING














INSERT INTO VENTAS (
    [Factura],
    [Fecha],
    [FechaVencimiento],
    [Cliente],
    [Producto],
    [Cantidad],
    [Moneda],
    [Precio],
    [Total],
    [Almacen],
    [Vendedor],
    [TotalUSD],
    [Impuesto],
    [ImpuestoUSD],
    [TipoDeCambio],
    [Ganancia],
    [GananciaUSD]

)
SELECT
CAST (T1.Factura AS INT),
Convert(date,T1.Fecha,103),
Convert(date,T1.FechaVencimiento,103),
CAST (T1.Cliente AS NCHAR(5)),
CAST (T1.Producto AS NCHAR(7)),
CAST ((CONVERT(DECIMAL(10,2), REPLACE(T1.Cantidad, ',', ''))) AS INT),
CAST (ISNULL(T1.Moneda, N'CRC') AS NCHAR (3)),
CAST (REPLACE(T1.Precio, ',', '') AS DECIMAL (30, 5)),
CAST (REPLACE(T1.Total, ',', '') AS DECIMAL (30, 5)),
CAST (T1.Almacén AS INT),
CAST (T1.Vendedor AS INT),
CAST (REPLACE(T1.TotalUSD, ',', '') AS DECIMAL (30, 5)),
CAST (REPLACE(T1.Impuesto, ',', '') AS DECIMAL (30, 5)),
CAST (REPLACE(T1.ImpuestoUSD, ',', '') AS DECIMAL (30, 5)),
CAST (REPLACE(T1.[Tipo de cambio], ',', '') AS DECIMAL (30, 5)),
CAST (REPLACE(T1.Ganacia, ',', '') AS DECIMAL (30, 5)),
CAST (REPLACE(T1.GananciaUSD, ',', '') AS DECIMAL (30, 5))
FROM [dbo].[DESTINATION_STRINGS] AS T1