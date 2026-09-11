import type { ImageMetadata } from 'astro';

// Los `pb=` de abajo son el payload opaco que genera Google Maps. Para
// regenerar uno: abrir la dirección en Google Maps, Compartir, Insertar un
// mapa, Copiar HTML, y quedarse con lo que va después de `?pb=`. No se editan
// a mano; el `!1m18!1m12…` codifica encuadre, zoom e id del lugar.
const GOOGLE_MAP_EMBED_BASE_URL = 'https://www.google.com/maps/embed?pb=';

const googleMapEmbedUrl = (payload: string) => `${GOOGLE_MAP_EMBED_BASE_URL}${payload}`;

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
  };
  mapAvailable: boolean;
}

export const PICKUP_COUNTRIES: Record<PickupCountry, PickupCountryConfig> = {
  peru: {
    id: 'peru',
    label: 'Perú',
    mapAvailable: true,
    locations: [
      {
        id: 'surco',
        name: 'Surco',
        address: 'Av. Primavera 2219',
        schedule: ['L - V 9:00 a.m. - 9:00 p.m.', 'S 9:00 a.m. - 5:00 p.m.'],
        preview: {
          type: 'embed',
          url: googleMapEmbedUrl('!1m18!1m12!1m3!1d3901.1103642020266!2d-76.9651827!3d-12.104596500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7a01d1836ef%3A0x24eec2e7ab723f37!2sAv.%20Primavera%202219%2C%20Santiago%20de%20Surco%2015023!5e0!3m2!1ses-419!2spe!4v1789159397315!5m2!1ses-419!2spe'),
          title: 'Mapa de la sede AYNI en Surco',
        },
      },
      {
        id: 'san-isidro',
        name: 'San Isidro',
        address: 'Av. Javier Prado Este 175',
        schedule: ['L - V 9:00 a.m. - 9:00 p.m.', 'S 9:00 a.m. - 1:00 p.m.'],
        preview: {
          type: 'embed',
          url: googleMapEmbedUrl('!1m18!1m12!1m3!1d3901.2963089769883!2d-77.03283309999999!3d-12.091856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8675071a003%3A0xc6c45ed1f8f01e1b!2sTorre%20Tekton%2C%20Av.%20Javier%20Prado%20Este%20175%2C%20San%20Isidro%2015046!5e0!3m2!1ses-419!2spe!4v1789159425840!5m2!1ses-419!2spe'),
          title: 'Mapa de la sede AYNI en San Isidro',
        },
      },
      {
        id: 'la-molina',
        name: 'La Molina',
        address: 'Av. La Molina 3345, Edificio Colibrí',
        schedule: ['L - V 2:00 p.m. - 8:00 p.m.', 'S 2:00 p.m. - 8:00 p.m.'],
        preview: {
          type: 'embed',
          url: googleMapEmbedUrl('!1m18!1m12!1m3!1d3901.3888292268484!2d-76.91698640000001!3d-12.0855118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c0d4a1010b8b%3A0x12bdbf5f8c863cef!2sEdificio%20Los%20Colibris!5e0!3m2!1ses-419!2spe!4v1789159433456!5m2!1ses-419!2spe'),
          title: 'Mapa de la sede AYNI en La Molina',
        },
      },
      {
        id: 'san-martin-de-porres',
        name: 'San Martin De Porres',
        address: 'Av. Angélica Gamarra 2158, Urb. El Pacífico (2do piso)',
        schedule: ['L - V 9:00 a.m. - 6:00 p.m.', 'S 9:00 a.m. - 1:00 p.m.'],
        preview: {
          type: 'embed',
          url: googleMapEmbedUrl('!1m18!1m12!1m3!1d3902.5246877709064!2d-77.08509819999999!3d-12.0073558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce8dd668f1ef%3A0x1f5f7769509f66b3!2sAv.%20Ang%C3%A9lica%20Gamarra%202158%2C%20San%20Mart%C3%ADn%20de%20Porres%2015302!5e0!3m2!1ses-419!2spe!4v1789163295113!5m2!1ses-419!2spe'),
          title: 'Mapa de la sede AYNI en San Martín de Porres',
        },
      },
      {
        id: 'los-olivos',
        name: 'Los Olivos',
        address: 'Avenida Las Palmeras 5792',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
        preview: {
          type: 'embed',
          url: googleMapEmbedUrl('!1m18!1m12!1m3!1d3903.1120687082594!2d-77.06854799999999!3d-11.9667421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce3a86689211%3A0xf9af96c9e73a3366!2sAv.%20Las%20Palmeras%205792%2C%20Los%20Olivos%2015304!5e0!3m2!1ses-419!2spe!4v1789159447958!5m2!1ses-419!2spe'),
          title: 'Mapa de la sede AYNI en Los Olivos',
        },
      },
      {
        id: 'trujillo',
        name: 'Trujillo',
        address: 'Calle Los Laureles 180',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
        preview: {
          type: 'embed',
          url: googleMapEmbedUrl('!1m16!1m12!1m3!1d3949.769754633691!2d-79.0211169!3d-8.124908900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sLos%20Laureles%20180%2C%20Mampuesto%2C%20Trujillo%2C%20Peru!5e0!3m2!1ses-419!2spe!4v1789159531291!5m2!1ses-419!2spe'),
          title: 'Mapa de la sede AYNI en Trujillo',
        },
      },
      {
        id: 'arequipa',
        name: 'Arequipa',
        address: 'Calle Las Orquídeas 111',
        schedule: ['L - V 9:30 a.m. - 6:00 p.m.', 'S 9:30 a.m. - 1:00 p.m.'],
        preview: {
          type: 'embed',
          url: googleMapEmbedUrl('!1m18!1m12!1m3!1d3827.7237053944596!2d-71.5463473!3d-16.3880312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a418637ae87%3A0xab5c29d4dff6eb2!2sLas%20Orqu%C3%ADdeas%20111%2C%20Cayma%2004017!5e0!3m2!1ses-419!2spe!4v1789159498025!5m2!1ses-419!2spe'),
          title: 'Mapa de la sede AYNI en Arequipa',
        },
      },
      {
        id: 'puerto-maldonado',
        name: 'Puerto Maldonado',
        address: 'Jr. Jaime Troncoso 173',
        schedule: ['L - V 9:00 a.m. - 6:00 p.m.', 'S 9:00 a.m. - 12:00 p.m.'],
        preview: {
          type: 'embed',
          url: googleMapEmbedUrl('!1m18!1m12!1m3!1d3893.7741586691595!2d-69.18082869999999!3d-12.597130600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x917b4ea8a601b807%3A0x525443cacc942699!2sJr.%20Jaime%20Troncoso%20173%2C%20Puerto%20Maldonado%2017001!5e0!3m2!1ses-419!2spe!4v1789159465397!5m2!1ses-419!2spe'),
          title: 'Mapa de la sede AYNI en Puerto Maldonado',
        },
      },
    ],
  },
  bolivia: {
    id: 'bolivia',
    label: 'Bolivia',
    mapAvailable: false,
    locations: [],
    auxiliaryContent: {
      title: 'Envíos a domicilio',
      description: 'Por el momento los envíos a Bolivia son directamente a domicilio. Consulta la disponibilidad para tu zona.',
    },
  },
};

export const PICKUP_COUNTRY_ORDER: PickupCountry[] = ['peru', 'bolivia'];
