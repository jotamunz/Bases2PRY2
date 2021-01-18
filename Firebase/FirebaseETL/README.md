# Firebase / Microsoft SQL Server ETL

> JavaScript service that extracts data from Firebase Cloud Firestore to Microsoft SQL Server

## Usage

```bash
$ npm install # Install project dependencies

$ npm run dev # Run service in development mode

$ npm start # Start service
```

## Database authentication

If you are running your Cloud firestore in production mode, you might need to add the `firebase/authentication` module and use it to connect to your firestore.

## Environment variables and setup

### Microsoft SQL Server

You will need to create a `.env` file that contains your Microsoft SQL Server host, user, password and database name.

```
# For example
MSSQL_HOST=YOUR_HOST
MSSQL_DB_NAME=YOUR_DB
MSSQL_PASSWORD=YOUR_PASSWORD
MSSQL_USER=YOUR_DATABASE_USER
```

### Firebase & Cloud Firestore

In the same `.env` file where you have your SQL Server information, you will need to add your firebase project id, API key and auth domain.

```
# For example
FB_API_KEY=YOUR_API_KEY
FB_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
FB_PROJECT_ID=YOUR_PROJECT_ID
```

## Application Info

### Version

1.0.0
