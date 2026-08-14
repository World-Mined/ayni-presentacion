import type { ImageMetadata } from 'astro';
import boliviaBase from '../assets/v2/pickup-locations-bolivia-base.png';
import boliviaMap from '../assets/v2/pickup-locations-bolivia-map.png';
import peruBase from '../assets/v2/pickup-locations-peru-base.png';
import peruMap from '../assets/v2/pickup-locations-peru-map.png';

export type PickupCountry = 'peru' | 'bolivia';

export interface PickupLocation {
  name: string;
  address: string;
  schedule: [string, string];
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
  mapBase: ImageMetadata;
  mapAlt: string;
  mapAvailable: boolean;
}

export const PICKUP_COUNTRIES: Record<PickupCountry, PickupCountryConfig> = {
  peru: {
    id: 'peru',
    label: 'Perú',
    map: peruMap,
    mapBase: peruBase,
    mapAlt: 'Mapa de los puntos de recojo de AYNI en Perú',
    mapAvailable: true,
    locations: [
      {
        name: 'Surco',
        address: 'Av. Primavera 2219',
        schedule: ['L - V 9:00 a.m. - 9:00 p.m.', 'S 9:00 a.m. - 5:00 p.m.'],
      },
      {
        name: 'San Isidro:',
        address: 'Av. Javier Prado Este 175',
        schedule: ['L - V 9:00 a.m. - 9:00 p.m.', 'S 9:00 a.m. - 1:00 p.m.'],
      },
      {
        name: 'La Molina',
        address: 'Av. La Molina 3345, Edificio Colibrí',
        schedule: ['L - V 2:00 p.m. - 8:00 p.m.', 'S 2:00 p.m. - 8:00 p.m.'],
      },
      {
        name: 'San Martin De Porres',
        address: 'Av. Angélica Gamarra 2158, Urb. El Pacífico (2do piso)',
        schedule: ['L - V 9:00 a.m. - 6:00 p.m.', 'S 9:00 a.m. - 1:00 p.m.'],
      },
      {
        name: 'Los Olivos',
        address: 'Avenida Las Palmeras 5792',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
      },
      {
        name: 'Trujillo',
        address: 'Calle Los Laureles 180',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
      },
      {
        name: 'Arequipa',
        address: 'Calle Las Orquídeas 111',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
      },
      {
        name: 'Puerto Maldonado',
        address: 'Jr. Jaime Troncoso 173',
        schedule: ['L - V 9:00 a.m. - 6:00 p.m.', 'S 9:00 a.m. - 12:00 p.m.'],
      },
    ],
  },
  bolivia: {
    id: 'bolivia',
    label: 'Bolivia',
    map: boliviaMap,
    mapBase: boliviaBase,
    mapAlt: 'Mapa referencial de Bolivia',
    mapAvailable: false,
    locations: [],
    auxiliaryContent: {
      title: 'Envíos a domicilio',
      description: 'Por el momentos los envíos a Bolivia son directamente a domicilios. Consultar disponibilidad técnica.',
      actionLabel: 'Opcional',
    },
  },
};

export const PICKUP_COUNTRY_ORDER: PickupCountry[] = ['peru', 'bolivia'];
