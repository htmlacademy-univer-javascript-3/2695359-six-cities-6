import { useEffect, useRef, memo } from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer, OfferDetail } from '../../types/offer';

type MapProps = {
  city: City;
  offers: Offer[] | OfferDetail[];
  selectedOffer?: Offer | OfferDetail | null;
  className?: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({ city, offers, selectedOffer, className = 'cities__map' }: MapProps): JSX.Element {
  const mapRef = useRef<leaflet.Map | null>(null);
  const markerLayerRef = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = leaflet.map('map', {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        scrollWheelZoom: false,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        )
        .addTo(mapRef.current);

      markerLayerRef.current.addTo(mapRef.current);
    }
  }, [city]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom
      );
    }
  }, [city]);

  useEffect(() => {
    if (markerLayerRef.current) {
      markerLayerRef.current.clearLayers();

      offers.forEach((offer) => {
        const marker = leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: selectedOffer?.id === offer.id ? activeCustomIcon : defaultCustomIcon,
          }
        );

        marker.addTo(markerLayerRef.current);
      });
    }
  }, [offers, selectedOffer]);

  return <section id="map" className={`map ${className}`}></section>;
}

export default memo(Map);
