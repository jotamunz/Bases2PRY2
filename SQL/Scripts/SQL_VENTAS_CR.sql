USE [master]
GO
/****** Object:  Database [SQL_VENTAS_CR]    Script Date: 1/15/2021 8:48:55 AM ******/
CREATE DATABASE [SQL_VENTAS_CR]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SQL_VENTAS_CR', FILENAME = N'G:\SQLSERVER\MSSQL15.MSSQLSERVER\MSSQL\DATA\SQL_VENTAS_CR_Primary.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SQL_VENTAS_CR_log', FILENAME = N'G:\SQLSERVER\MSSQL15.MSSQLSERVER\MSSQL\DATA\SQL_VENTAS_CR_Primary.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SQL_VENTAS_CR] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SQL_VENTAS_CR].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SQL_VENTAS_CR] SET ANSI_NULL_DEFAULT ON 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET ANSI_NULLS ON 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET ANSI_PADDING ON 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET ANSI_WARNINGS ON 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET ARITHABORT ON 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET CURSOR_DEFAULT  LOCAL 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET CONCAT_NULL_YIELDS_NULL ON 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET QUOTED_IDENTIFIER ON 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET RECOVERY FULL 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET  MULTI_USER 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET PAGE_VERIFY NONE  
GO
ALTER DATABASE [SQL_VENTAS_CR] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SQL_VENTAS_CR] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'SQL_VENTAS_CR', N'ON'
GO
ALTER DATABASE [SQL_VENTAS_CR] SET QUERY_STORE = OFF
GO
USE [SQL_VENTAS_CR]
GO
/****** Object:  User [JOS-PC\repl_distribution]    Script Date: 1/15/2021 8:48:55 AM ******/
CREATE USER [JOS-PC\repl_distribution] FOR LOGIN [JOS-PC\repl_distribution] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [JOS-PC\repl_distribution]
GO
/****** Object:  Table [dbo].[VENTAS]    Script Date: 1/15/2021 8:48:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VENTAS](
	[Id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[Factura] [int] NOT NULL,
	[Fecha] [date] NOT NULL,
	[FechaVencimiento] [date] NOT NULL,
	[Cliente] [nchar](5) NOT NULL,
	[Producto] [nchar](7) NOT NULL,
	[Cantidad] [int] NOT NULL,
	[Moneda] [nchar](3) NOT NULL,
	[Precio] [decimal](30, 5) NOT NULL,
	[Total] [decimal](30, 5) NOT NULL,
	[Almacen] [int] NOT NULL,
	[Vendedor] [decimal](5, 0) NOT NULL,
	[TotalUSD] [decimal](30, 5) NOT NULL,
	[Impuesto] [decimal](30, 5) NOT NULL,
	[ImpuestoUSD] [decimal](30, 5) NOT NULL,
	[TipoDeCambio] [decimal](30, 5) NOT NULL,
	[Ganancia] [decimal](30, 5) NOT NULL,
	[GananciaUSD] [decimal](30, 5) NOT NULL,
 CONSTRAINT [PK_VENTAS] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[sp_MSdel_dboVENTAS]    Script Date: 1/15/2021 8:48:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_MSdel_dboVENTAS]
		@pkc1 int
as
begin  
	declare @primarykey_text nvarchar(100) = ''
	delete [dbo].[VENTAS] 
	where [Id] = @pkc1
if @@rowcount = 0
    if @@microsoftversion>0x07320000
		Begin
			if exists (Select * from sys.all_parameters where object_id = OBJECT_ID('sp_MSreplraiserror') and [name] = '@param3')
			Begin
				
				set @primarykey_text = @primarykey_text + '[Id] = ' + convert(nvarchar(100),@pkc1,1)
				exec sp_MSreplraiserror @errorid=20598, @param1=N'[dbo].[VENTAS]', @param2=@primarykey_text, @param3=13234 
			End
			Else
				exec sp_MSreplraiserror @errorid=20598
		End
end  
GO
/****** Object:  StoredProcedure [dbo].[sp_MSins_dboVENTAS]    Script Date: 1/15/2021 8:48:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_MSins_dboVENTAS]
    @c1 int,
    @c2 int,
    @c3 date,
    @c4 date,
    @c5 nchar(5),
    @c6 nchar(7),
    @c7 int,
    @c8 nchar(3),
    @c9 decimal(30,5),
    @c10 decimal(30,5),
    @c11 int,
    @c12 decimal(5,0),
    @c13 decimal(30,5),
    @c14 decimal(30,5),
    @c15 decimal(30,5),
    @c16 decimal(30,5),
    @c17 decimal(30,5),
    @c18 decimal(30,5)
as
begin  
	insert into [dbo].[VENTAS] (
		[Id],
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
	) values (
		@c1,
		@c2,
		@c3,
		@c4,
		@c5,
		@c6,
		@c7,
		@c8,
		@c9,
		@c10,
		@c11,
		@c12,
		@c13,
		@c14,
		@c15,
		@c16,
		@c17,
		@c18	) 
end  
GO
/****** Object:  StoredProcedure [dbo].[sp_MSupd_dboVENTAS]    Script Date: 1/15/2021 8:48:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_MSupd_dboVENTAS]
		@c1 int = NULL,
		@c2 int = NULL,
		@c3 date = NULL,
		@c4 date = NULL,
		@c5 nchar(5) = NULL,
		@c6 nchar(7) = NULL,
		@c7 int = NULL,
		@c8 nchar(3) = NULL,
		@c9 decimal(30,5) = NULL,
		@c10 decimal(30,5) = NULL,
		@c11 int = NULL,
		@c12 decimal(5,0) = NULL,
		@c13 decimal(30,5) = NULL,
		@c14 decimal(30,5) = NULL,
		@c15 decimal(30,5) = NULL,
		@c16 decimal(30,5) = NULL,
		@c17 decimal(30,5) = NULL,
		@c18 decimal(30,5) = NULL,
		@pkc1 int = NULL,
		@bitmap binary(3)
as
begin  
	declare @primarykey_text nvarchar(100) = ''
update [dbo].[VENTAS] set
		[Factura] = case substring(@bitmap,1,1) & 2 when 2 then @c2 else [Factura] end,
		[Fecha] = case substring(@bitmap,1,1) & 4 when 4 then @c3 else [Fecha] end,
		[FechaVencimiento] = case substring(@bitmap,1,1) & 8 when 8 then @c4 else [FechaVencimiento] end,
		[Cliente] = case substring(@bitmap,1,1) & 16 when 16 then @c5 else [Cliente] end,
		[Producto] = case substring(@bitmap,1,1) & 32 when 32 then @c6 else [Producto] end,
		[Cantidad] = case substring(@bitmap,1,1) & 64 when 64 then @c7 else [Cantidad] end,
		[Moneda] = case substring(@bitmap,1,1) & 128 when 128 then @c8 else [Moneda] end,
		[Precio] = case substring(@bitmap,2,1) & 1 when 1 then @c9 else [Precio] end,
		[Total] = case substring(@bitmap,2,1) & 2 when 2 then @c10 else [Total] end,
		[Almacen] = case substring(@bitmap,2,1) & 4 when 4 then @c11 else [Almacen] end,
		[Vendedor] = case substring(@bitmap,2,1) & 8 when 8 then @c12 else [Vendedor] end,
		[TotalUSD] = case substring(@bitmap,2,1) & 16 when 16 then @c13 else [TotalUSD] end,
		[Impuesto] = case substring(@bitmap,2,1) & 32 when 32 then @c14 else [Impuesto] end,
		[ImpuestoUSD] = case substring(@bitmap,2,1) & 64 when 64 then @c15 else [ImpuestoUSD] end,
		[TipoDeCambio] = case substring(@bitmap,2,1) & 128 when 128 then @c16 else [TipoDeCambio] end,
		[Ganancia] = case substring(@bitmap,3,1) & 1 when 1 then @c17 else [Ganancia] end,
		[GananciaUSD] = case substring(@bitmap,3,1) & 2 when 2 then @c18 else [GananciaUSD] end
	where [Id] = @pkc1
if @@rowcount = 0
    if @@microsoftversion>0x07320000
		Begin
			if exists (Select * from sys.all_parameters where object_id = OBJECT_ID('sp_MSreplraiserror') and [name] = '@param3')
			Begin
				
				set @primarykey_text = @primarykey_text + '[Id] = ' + convert(nvarchar(100),@pkc1,1)
				exec sp_MSreplraiserror @errorid=20598, @param1=N'[dbo].[VENTAS]', @param2=@primarykey_text, @param3=13233 
			End
			Else
				exec sp_MSreplraiserror @errorid=20598
		End
end 
GO
USE [master]
GO
ALTER DATABASE [SQL_VENTAS_CR] SET  READ_WRITE 
GO
