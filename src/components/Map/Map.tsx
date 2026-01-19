import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '../../types/offer';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer?: Offer | null;
  className?: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activeCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ city, offers, selectedOffer, className = 'cities__map' }: MapProps): JSX.Element {
  const mapRef = useRef<leaflet.Map | null>(null);
  const markersRef = useRef<leaflet.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    const map = leaflet.map('map', {
      center: [city.location.latitude, city.location.longitude],
      zoom: city.location.zoom,
    });

    leaflet
      .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      })
      .addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [city]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    offers.forEach((offer) => {
      const marker = leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: selectedOffer?.id === offer.id ? activeCustomIcon : defaultCustomIcon,
        })
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [offers, selectedOffer]);

  return <section className={`${className} map`} id="map"></section>;
}

export default Map;
