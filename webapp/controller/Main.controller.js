sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        const searchCache = {};

        return Controller.extend("bupamap.controller.Main", {
            onInit: function () {
                const oMapModel = new JSONModel();
                this.getView().setModel(oMapModel, "Map");
                const oItemsBinding = this.byId("table").getBindingInfo("items");
                oItemsBinding.events = {
                    "dataReceived" : () => {
                        const oDataModel = this.getView().getModel();
                        const aBusinessPartner = this.byId("table").getBinding("items").getAllCurrentContexts().map(oContext => oDataModel.getProperty(oContext.getPath()));
                        const aFeaturePromises = aBusinessPartner.map(oBusinessPartner => {
                            return this.getCoordinates(oBusinessPartner.AddressLine1Text);
                        });
                        Promise.all(aFeaturePromises).then(aFeatures => {
                            const oData = {features: aFeatures};
                            oMapModel.setData(oData);
                        });
                    }
                };
            },
            onAddfeature: function() {
                const oBupaVectorSource= this.byId("vectorSource");
                const aExtent = oBupaVectorSource.getExtent();
                if(aExtent && aExtent[0] !== Infinity) {
                    this.byId("map").viewFit(aExtent, true);
                }
            },
            onFilterBupa: function(oEvent) {
                const sSearch = oEvent.getParameter("query");
                if(sSearch) {
                    this.byId("table").getBinding("items").filter([new Filter("Name", FilterOperator.Contains, sSearch)]);
                } else {
                    this.byId("table").getBinding("items").filter([]);
                }
            },
            getCoordinates: function(sValue) {
                const googleMapsApiToken = "AIzaSyB5T8aWSEsK0bMuYiSjUtzQRp9GUCE6mDA";
                if(!(sValue in searchCache)) {
                    searchCache[sValue] = new Promise(function(resolve, reject) {
                        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(sValue) + "&key=" + googleMapsApiToken).then(function(oResponse) {
                            return oResponse.json();
                        }).then(function(oLocation) {
                            try {
                                if ("results" in oLocation && oLocation.results.length > 0) {
                                    var dGoogleLongitude = oLocation.results[0].geometry.location.lng;
                                    var dGoogleLatitude = oLocation.results[0].geometry.location.lat;
                                    console.log(searchCache[sValue]);
                                    // POINT(11.3932675123215 48.2635197942589)
                                    resolve({"wkt": "POINT("+dGoogleLongitude+" "+dGoogleLatitude+")"});
                                }
                            } catch (e) {
                                console.log(e);
                                reject(e);
                            }
                        });
                    });
                }
                return searchCache[sValue];
            }
        });
    });
