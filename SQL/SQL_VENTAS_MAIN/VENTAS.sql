CREATE TABLE [dbo].[VENTAS]
(
	[Id] INT IDENTITY NOT NULL, 
    [Factura] INT NOT NULL, 
    [Fecha] DATE NOT NULL, 
    [FechaVencimiento] DATE NOT NULL, 
    [Cliente] NCHAR(5) NOT NULL, 
    [Producto] NCHAR(7) NOT NULL, 
    [Cantidad] INT NOT NULL, 
    [Moneda] NCHAR(3) NOT NULL, 
    [Precio] DECIMAL(30, 5) NOT NULL, 
    [Total] DECIMAL(30, 5) NOT NULL, 
    [Almacen] INT NOT NULL, 
    [Vendedor] DECIMAL(5) NOT NULL, 
    [TotalUSD] DECIMAL(30, 5) NOT NULL, 
    [Impuesto] DECIMAL(30, 5) NOT NULL, 
    [ImpuestoUSD] DECIMAL(30, 5) NOT NULL, 
    [TipoDeCambio] DECIMAL(30, 5) NOT NULL, 
    [Ganancia] DECIMAL(30, 5) NOT NULL, 
    [GananciaUSD] DECIMAL(30, 5) NOT NULL,
    CONSTRAINT PK_VENTAS PRIMARY KEY (Id)
)
