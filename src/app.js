
"use strict";

class mapDirectionService {
    constructor() {
        console.log('Init')
        this.initMap();
    }

    // Initilize Map
    initMap() {
        const directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });

        const directionsService = new google.maps.DirectionsService;

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: 37.77, lng: -122.447 }
        });
        // First marker without destination
        let directionMarker;

        const points = {};
        google.maps.event.addListener(map, 'click', event => {
            const newMarker = event.latLng;
            console.log(newMarker.toJSON())
            // First click set the origin point
            // Second click set the destination point
                if (!points.origin) {
                    points.origin = newMarker.toJSON();
                    directionMarker = new google.maps.Marker({
                        position: newMarker, 
                        map: map
                    });
                } else{
                    // Hide the first marker
                    directionMarker.setMap(null);
                    points.destination = newMarker.toJSON();
                    this.calculateAndDisplayRoute(directionsService, directionsDisplay, points);
                }
                
        });
        directionsDisplay.setMap(map);
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay, points) {
        if (points.origin && points.destination) {
            directionsService.route({
                origin: points.origin,  // Point A
                destination: points.destination,  // Point B.
                // Note that Javascript allows us to access the constant
                // using square brackets and a string value as its
                // "property."
                travelMode: google.maps.TravelMode['DRIVING'],
            }, (response, status) => {
                console.log(response, status);
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert(`Directions request failed due to ${status}`);
                }
            });
        }
    }
}



