	CREATE TABLE [dbo].[VENTAS_CR]
(
	[Id] INT NOT NULL, 
    [Factura] INT NOT NULL, 
    [Fecha] DATE NOT NULL, 
    [FechaVencimiento] DATE NOT NULL, 
    [Cliente] NCHAR(5) NOT NULL, 
    [Producto ] NCHAR(6) NOT NULL, 
    [Cantidad] INT NOT NULL, 
    [Moneda] NCHAR(3) NOT NULL, 
    [Precio] DECIMAL(20, 4) NOT NULL, 
    [Total] DECIMAL(20, 4) NOT NULL, 
    [Almacen] INT NOT NULL, 
    [Vendedor] DECIMAL(5) NOT NULL, 
    [TotalUSD] DECIMAL(20, 4) NOT NULL, 
    [Impuesto] DECIMAL(20, 4) NOT NULL, 
    [ImpuestoUSD] DECIMAL(20, 4) NOT NULL, 
    [TipoDeCambio] DECIMAL(20, 4) NOT NULL, 
    [Ganancia] DECIMAL(20, 4) NOT NULL, 
    [GananciaUSD] DECIMAL(20, 4) NOT NULL,
    CONSTRAINT PK_VENTAS PRIMARY KEY (Id)
)

