## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Fri Apr 14 2023 07:26:16 GMT+0000 (Coordinated Universal Time)|
|**App Generator**<br>@sap/generator-fiori-freestyle|
|**App Generator Version**<br>1.9.3|
|**Generation Platform**<br>SAP Business Application Studio|
|**Template Used**<br>simple|
|**Service Type**<br>OData Url|
|**Service URL**<br>https://obd.in4md-service.de/sap/opu/odata/sap/MD_BUSINESSPARTNER_SRV/
|**Module Name**<br>bupa_map|
|**Application Title**<br>Geschäftspartner auf einer Map anzeigen|
|**Namespace**<br>|
|**UI5 Theme**<br>sap_horizon|
|**UI5 Version**<br>1.112.1|
|**Enable Code Assist Libraries**<br>False|
|**Enable TypeScript**<br>False|
|**Add Eslint configuration**<br>False|

## bupa_map

Diese Fiori Applikation zeigt Geschäftspartner auf einer Map an.

## Screenshot

![](docs/Screenshot.png?raw=true "Architektur der Anwendung")

## Architecture

![](docs/bupa_map.png?raw=true "Business Partner Map")

### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  In order to launch the generated app, simply run the following from the generated app root folder:

```
    npx fiori run --config ./ui5.yaml --open index.html
```

- It is also possible to run the application using mock data that reflects the OData Service URL supplied during application generation.  In order to run the application with Mock Data, run the following from the generated app root folder:

```
    npm run start-mock
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)


