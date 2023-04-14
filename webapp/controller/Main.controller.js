sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        const searchCache = {};

        return Controller.extend("bupamap.controller.Main", {
            onInit: function () {

            },
            onAddfeature: function() {
                var oCultivationVectorSource= this.byId("vectorSource");
                var aExtent = oCultivationVectorSource.getExtent();
                if(aExtent && aExtent[0] !== Infinity) {
                    this.byId("map").viewFit(aExtent, true);
                }
            },
            getCoordinates: function(sValue) {
                const googleMapsApiToken = "AIzaSyB5T8aWSEsK0bMuYiSjUtzQRp9GUCE6mDA";
                if(!(sValue in searchCache)) {
                    searchCache[sValue] = false;
                
                    // POINT(11.3932675123215 48.2635197942589)
                    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(sValue) + "&key=" + googleMapsApiToken).then(function(oResponse) {
                        return oResponse.json();
                    }).then(function(oLocation) {
                        try {
                            if ("results" in oLocation && oLocation.results.length > 0) {
                                var dGoogleLongitude = oLocation.results[0].geometry.location.lng;
                                var dGoogleLatitude = oLocation.results[0].geometry.location.lat;
                                searchCache[sValue] = "POINT("+dGoogleLongitude+" "+dGoogleLatitude+")";
                                console.log(searchCache[sValue]);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    });
                } else {
                    return searchCache[sValue];
                }
            }
        });
    });
