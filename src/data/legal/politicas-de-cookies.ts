import type { LegalDocument } from '../legal';

export const POLITICAS_DE_COOKIES: LegalDocument = {
  slug: 'politicas-de-cookies',
  navLabel: 'Políticas de cookies',
  title: 'POLÍTICA DE COOKIES',
  description:
    'Qué información almacenan las cookies del sitio de AYNI, para qué se usan y cómo eliminarlas.',
  sections: [
    {
      body: [[
        'En la página web de AYNI, operada por AYNI WORLD INTERNATIONAL S.A.C., identificada con RUC N.° 20614571242, se podrá recopilar y utilizar la información de los trabajadores, clientes, potenciales clientes y proveedores, tal como se indica en nuestra Política de Privacidad. La forma en la que podemos recopilar esta información será a través del uso de la tecnología llamada cookies. A continuación, se expondrá más información sobre el particular:',
      ]],
    },
    {
      title: '1. ¿Qué tipo de información es la que almacena una cookie?',
      body: [[
        'Las cookies no suelen almacenar información sensible de los usuarios, tales como tarjetas de crédito o datos bancarios, fotografías o cualquier tipo de información de naturaleza personal. Los datos que se guardan son aquellos de carácter técnico, estadísticos, preferencias personales, personalización de contenido, entre otros.',
        'El servidor web no asocia al usuario como persona sino a su navegador web. Es decir, si el usuario navega de manera habitual con el navegador Chrome y luego accede al mismo sitio web utilizando otro navegador, como Firefox, notará que la página web no podrá identificar que se trata de la misma persona, ya que las cookies se asocian al navegador y no al usuario.',
      ]],
    },
    {
      title: '2. ¿Qué son las cookies propias y las de terceros?',
      body: [
        ['Las cookies propias son aquellas generadas por la misma página web que el usuario está visitando.'],
        ['Las cookies de terceros son aquellas generadas por servicios o proveedores externos utilizados por el sitio web, como Facebook, Instagram, entre otros.'],
      ],
    },
    {
      title: '3. ¿Qué cookies utiliza esta web?',
      body: [[
        'Las cookies propias son aquellas generadas por la misma página web que el usuario está visitando.',
        'Las cookies de terceros son aquellas generadas por servicios o proveedores externos utilizados por el sitio web, como Facebook, Instagram, entre otros.',
      ]],
    },
    {
      title: '3.1 Personalización',
      body: [[
        'Las cookies ayudan a recordar con qué personas o sitios web ha interactuado el usuario, de este modo podremos mostrarle contenido relacionado.',
      ]],
    },
    {
      title: '3.2 Preferencias',
      body: [[
        'Las cookies permiten recordar los ajustes y preferencias del usuario, por ejemplo, el idioma preferido y su configuración de privacidad.',
      ]],
    },
    {
      title: '3.3 Seguridad',
      body: [[
        'Las cookies ayudan a prevenir riesgos de seguridad, ya que permiten detectar cuando alguien está intentando acceder de forma no autorizada a la información o cuentas del usuario.',
      ]],
    },
    {
      title: '4. ¿Se pueden eliminar las cookies?',
      body: [[
        'Sí. Las cookies pueden eliminarse o bloquearse, ya sea de forma general o de manera específica para un dominio determinado.',
        'Para eliminar las cookies, el usuario únicamente deberá acceder a la configuración de su navegador, buscar aquellas asociadas al dominio correspondiente y proceder a su eliminación.',
      ]],
    },
  ],
};
