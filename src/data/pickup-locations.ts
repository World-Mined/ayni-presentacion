import type { ImageMetadata } from 'astro';
import pickupLocationsMap from '../assets/v2/pickup-locations-map.webp';

export type PickupCountry = 'peru' | 'bolivia';

export type PickupLocationPreview =
  | {
      type: 'image';
      image: ImageMetadata;
      alt: string;
    }
  | {
      type: 'embed';
      url: string;
      title: string;
    }
  | {
      type: 'coordinates';
      latitude: number;
      longitude: number;
      zoom?: number;
    }
  | {
      type: 'placeholder';
      label?: string;
    };

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  schedule: [string, string];
  preview?: PickupLocationPreview;
}

export interface PickupCountryConfig {
  id: PickupCountry;
  label: string;
  locations: PickupLocation[];
  auxiliaryContent?: {
    title: string;
    description: string;
    actionLabel: string;
  };
  map: ImageMetadata;
  mapAlt: string;
  mapAvailable: boolean;
}

export const PICKUP_COUNTRIES: Record<PickupCountry, PickupCountryConfig> = {
  peru: {
    id: 'peru',
    label: 'Perú',
    map: pickupLocationsMap,
    mapAlt: 'Mapa de los puntos de recojo de AYNI en Perú',
    mapAvailable: true,
    locations: [
      {
        id: 'surco',
        name: 'Surco',
        address: 'Av. Primavera 2219',
        schedule: ['L - V 9:00 a.m. - 9:00 p.m.', 'S 9:00 a.m. - 5:00 p.m.'],
      },
      {
        id: 'san-isidro',
        name: 'San Isidro',
        address: 'Av. Javier Prado Este 175',
        schedule: ['L - V 9:00 a.m. - 9:00 p.m.', 'S 9:00 a.m. - 1:00 p.m.'],
      },
      {
        id: 'la-molina',
        name: 'La Molina',
        address: 'Av. La Molina 3345, Edificio Colibrí',
        schedule: ['L - V 2:00 p.m. - 8:00 p.m.', 'S 2:00 p.m. - 8:00 p.m.'],
      },
      {
        id: 'san-martin-de-porres',
        name: 'San Martin De Porres',
        address: 'Av. Angélica Gamarra 2158, Urb. El Pacífico (2do piso)',
        schedule: ['L - V 9:00 a.m. - 6:00 p.m.', 'S 9:00 a.m. - 1:00 p.m.'],
      },
      {
        id: 'los-olivos',
        name: 'Los Olivos',
        address: 'Avenida Las Palmeras 5792',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
      },
      {
        id: 'trujillo',
        name: 'Trujillo',
        address: 'Calle Los Laureles 180',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
      },
      {
        id: 'arequipa',
        name: 'Arequipa',
        address: 'Calle Las Orquídeas 111',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
      },
      {
        id: 'puerto-maldonado',
        name: 'Puerto Maldonado',
        address: 'Jr. Jaime Troncoso 173',
        schedule: ['L - V 9:00 a.m. - 6:00 p.m.', 'S 9:00 a.m. - 12:00 p.m.'],
      },
    ],
  },
  bolivia: {
    id: 'bolivia',
    label: 'Bolivia',
    map: pickupLocationsMap,
    mapAlt: 'Mapa referencial: todavía no hay puntos de recojo en Bolivia',
    mapAvailable: false,
    locations: [],
    auxiliaryContent: {
      title: 'Envíos a domicilio',
      description: 'Por el momento los envíos a Bolivia son directamente a domicilio. Consulta la disponibilidad para tu zona.',
      actionLabel: 'Opcional',
    },
  },
};

export const PICKUP_COUNTRY_ORDER: PickupCountry[] = ['peru', 'bolivia'];
