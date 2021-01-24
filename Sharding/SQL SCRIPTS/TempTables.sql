-- This temp table is created for the database
-- It looks really clean but the system can't acces the data from the SISS

IF OBJECT_ID('tempdb..##tmpMongo') IS NOT NULL
    DROP TABLE ##tmpMongo
    CREATE TABLE ##tmpMongo
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
		Vendedor decimal(18,4)
    )

INSERT INTO ##tmpMongo(id)
	SELECT id 
	FROM Demo_Complete_DataWarehouse.dbo.DESTINATION_CASTING

SELECT * FROM ##tmpMongo

-- INSERTAR: de una tabla temporal a una base de datos. 

INSERT INTO ##tmpMongo (id) VALUES (999999)

INSERT INTO Demo_Complete_DataWarehouse.dbo.DESTINATION_CASTING(id)
	SELECT id
	FROM ##tmpMongo WHERE id=999999

SELECT * FROM Demo_Complete_DataWarehouse.dbo.DESTINATION_CASTING

-- DELETE: delete de las pruebas anteriores

DELETE FROM Demo_Complete_DataWarehouse.dbo.DESTINATION_CASTING WHERE id=999999

-- TEST OF THE SAMPLE OF DATABASE WITH THE TABLE DATA LOADED

