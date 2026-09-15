import type { LegalDocument } from '../legal';

export const POLITICAS_DE_REEMBOLSO: LegalDocument = {
  slug: 'politicas-de-reembolso',
  navLabel: 'Políticas de reembolso',
  title: 'POLÍTICA DE REEMBOLSO DE PRODUCTOS',
  description:
    'Procedimiento para solicitar devoluciones y reembolsos de los productos adquiridos directamente a AYNI.',
  sections: [
    {
      body: [[
        'De conformidad con los principios de respeto y protección al consumidor establecidos en nuestro reglamento interno y la legislación vigente, AYNI WORLD INTERNATIONAL S.A.C., identificada con RUC N.° 20614571242 (en adelante, "AYNI"), establece el siguiente procedimiento para solicitar reembolsos relacionados con la compra de productos físicos, ya sea mediante recogida en tienda o servicio de entrega.',
      ]],
    },
    {
      title: 'Devoluciones elegibles',
      body: [[
        'AYNI solo acepta devoluciones cuando el producto presenta un defecto comprobado de fabricación, almacenamiento o envío, y el solicitante demuestra haberlo adquirido directamente de la empresa (véase la cláusula de Elegibilidad). La solicitud debe enviarse a soporte@ayniworld.com, incluyendo el número de pedido, la fecha de compra y fotos o videos que evidencien el problema. AYNI podrá solicitar información adicional y se reserva el derecho de rechazar las solicitudes que no estén debidamente justificadas o que no correspondan a errores atribuibles a la empresa.',
      ]],
    },
    {
      title: 'Requisitos para solicitar devoluciones',
      body: [[
        'Las devoluciones de productos solo se procesarán si el solicitante demuestra haber adquirido el producto directamente de AYNI, ya sea como empresario independiente o consumidor final que lo compró al por mayor para su propio uso. No se aceptarán solicitudes de personas que hayan adquirido productos a través de terceros, revendedores, distribuidores independientes u otros intermediarios, dado que AYNI mantiene una política exclusiva de venta directa. Todas las solicitudes deben incluir una prueba que demuestre claramente la relación del consumidor con AYNI como requisito indispensable para su evaluación.',
      ]],
    },
    {
      title: 'Condiciones para solicitar una devolución',
      body: [
        ['Para solicitar una devolución, el cliente debe enviar un correo electrónico a soporte@ayniworld.com dentro de un plazo máximo de 7 días naturales a partir de la fecha de entrega o recogida del producto, incluyendo lo siguiente:'],
        ['- Comprobante de pago: Recibo o factura (foto o archivo).'],
        ['- Nota de venta o guía de entrega.'],
        ['- Fotografías del producto que muestran claramente su estado.'],
        ['- Breve explicación del motivo de la devolución.'],
        ['- AYNI confirmará la recepción en un plazo máximo de 48 horas.'],
        ['La evaluación se llevará a cabo en un plazo máximo de cinco (5) días hábiles a partir de la recepción completa de la solicitud. Durante este período, AYNI podrá solicitar información adicional si lo considera necesario.'],
      ],
    },
    {
      title: 'Requisitos del producto',
      body: [[
        'Para que se acepte una devolución, se aplicarán los siguientes criterios:',
        'Si el producto no presenta defectos atribuibles a AYNI, debe estar sin usar, sin daños y sin alteraciones, y conservar su embalaje original con todos sus accesorios, precintos y manuales completos.',
        'Si el producto presenta un defecto de fábrica comprobado, adulteración o daños durante el envío, puede haber sido abierto, siempre que se conserve evidencia del estado en que fue recibido y no se detecte ninguna manipulación indebida por parte del cliente.',
        'AYNI evaluará cada caso y se reserva el derecho de rechazar las devoluciones cuando se determine que el daño fue causado por mal uso, manipulación o intervención externa.',
      ]],
    },
    {
      title: 'Zonas de devolución',
      body: [[
        'Solo se aceptarán devoluciones en los siguientes casos:',
        'Defecto de fábrica comprobado: Cuando el producto presenta fallas o daños atribuibles al proceso de fabricación, almacenamiento o envío. El defecto debe ser verificable según los procedimientos de evaluación de AYNI.',
        'Error en el producto entregado: Cuando el cliente ha recibido un producto diferente al que figura en el recibo de compra emitido por AYNI.',
        'Retraso en la entrega: Cuando el producto no ha sido entregado y se verifica un retraso de más de siete (7) días hábiles con respecto al plazo estimado, siempre que dicho retraso sea directamente atribuible a AYNI',
      ]],
    },
    {
      title: 'Exclusiones',
      body: [
        [
          'No se aceptarán solicitudes de devolución en los siguientes casos:',
          'Producto manipulado o dañado: Cuando el producto muestra signos de uso, daños físicos, alteraciones o ha sido abierto sin justificación válida.',
          'Embalaje incompleto: Cuando el producto no conserva su embalaje original o elementos esenciales (accesorios, manuales, etiquetas, precintos de seguridad).',
          'Falta de relación directa con AYNI: Cuando el solicitante no puede demostrar que compró el producto directamente a AYNI a través de canales oficiales (tienda en línea, tiendas físicas).',
          'Compra a través de terceros: Cuando el producto se haya comprado a través de distribuidores independientes, revendedores o plataformas externas no gestionadas por AYNI, en cuyo caso el solicitante deberá reclamar a quien le vendió el producto.',
        ],
        [
          'Condiciones especiales de venta: Cuando se trate de productos vendidos en liquidación, bajo promociones especiales o como saldos de existencias con indicación expresa de que no se admiten devoluciones.',
          'Razones subjetivas: Cuando la solicitud se basa únicamente en razones personales o expectativas individuales (como cambio de opinión, insatisfacción sin defecto, percepción de tamaño, color, aroma, etc.) y el producto está en perfectas condiciones.',
          'Solicitudes duplicadas: Cuando el cliente ya ha solicitado una devolución o reembolso previo por el mismo producto comprado.',
          'Solicitud fuera de plazo: Cuando la solicitud se presenta después de 7 días naturales contados desde la entrega o recogida del producto.',
          'Cambio previamente aprobado: Cuando el cliente haya solicitado un cambio por otro producto después de haber recibido la compra inicial, no se aceptará la devolución de dicha compra.',
        ],
        [
          'Apertura con aceptación presencial: Cuando el producto haya sido abierto o inspeccionado personalmente en el momento de la recogida y aceptado por el cliente, no se tramitará la devolución a menos que exista un defecto oculto no detectable en el momento de la entrega.',
          'Producto caducado: No se aceptarán cambios ni devoluciones si el producto ya ha caducado en el momento de la solicitud.',
        ],
      ],
    },
    { chapterTitle: 'Procedimiento de devolución del producto' },
    {
      title: 'Presentación de la solicitud',
      body: [
        [
          'El cliente deberá enviar un correo electrónico a soporte@ayniworld.com dentro de un plazo máximo de siete (7) días naturales a partir de la entrega o recogida del producto, incluyendo:',
          'Nombre completo y número de documento de identidad.',
          'Código de cliente y número de pedido.',
          'Fecha de compra y método de entrega.',
          'Especificación de los motivos de la devolución, acompañada de fotografías y/o vídeos claros que evidencien el estado actual del producto y su embalaje.',
          '(Consulte los requisitos detallados en la sección "Condiciones para solicitar una devolución").',
          'Evaluación de la solicitud',
        ],
        ['AYNI confirmará la recepción de la solicitud en un plazo máximo de 48 horas naturales. La evaluación se realizará en los siguientes cinco (5) días hábiles. Durante este periodo, la empresa podrá solicitar información adicional para verificar si la devolución se ajusta a los motivos válidos establecidos en esta política.'],
      ],
    },
    {
      title: 'Entrega física del producto',
      body: [[
        'Una vez aprobada la solicitud, el cliente deberá devolver el producto según el método de entrega original:',
        'Si se trata de recoger el producto en tienda: el cliente debe acudir al establecimiento físico de AYNI para recibirlo.',
        'Si se trata de una entrega a domicilio: AYNI coordinará la recogida a través de un operador logístico. El coste correrá a cargo del cliente, salvo que el motivo de la devolución sea imputable a AYNI (véase la sección «Costes asociados a la devolución»).',
      ]],
    },
    {
      title: 'Condiciones de entrega del producto',
      body: [[
        'El producto deberá entregarse en buen estado, sin signos adicionales de uso, daños o alteraciones atribuibles al cliente. Con su embalaje original completo e impecable, incluyendo precintos, etiquetas, manuales y accesorios, salvo en caso de defecto de fábrica comprobado. (Véase la sección "Requisitos del producto").',
      ]],
    },
    {
      title: 'Condiciones de entrega del producto',
      body: [[
        'El producto deberá entregarse en buen estado, sin signos adicionales de uso, daños o alteraciones atribuibles al cliente. Con su embalaje original completo e impecable, incluyendo precintos, etiquetas, manuales y accesorios, salvo en caso de defecto de fábrica comprobado. (Véase la sección "Requisitos del producto").',
      ]],
    },
    { chapterTitle: 'Costos asociados con la devolución' },
    {
      title: 'Devolución en tienda',
      body: [[
        'El cliente puede acudir a la tienda física de AYNI para recoger el producto, sin coste adicional.',
        'Recogida del producto a domicilio (para su evaluación)',
        'AYNI podrá coordinar la recogida del producto a través de un operador logístico. El coste correrá a cargo del cliente, salvo que exista algún error en el producto entregado o indicios razonables de defecto, en cuyo caso AYNI se hará cargo de la recogida.',
        'Entrega del nuevo producto (si procede la sustitución)',
        'Si tras la evaluación AYNI aprueba el cambio por un producto nuevo, la empresa se encargará de la entrega, sin coste adicional para el cliente.',
        'Si la devolución no es aprobada',
        'Si la solicitud de devolución es rechazada tras la evaluación, AYNI notificará al cliente indicando los motivos. El cliente podrá:',
        'Recoger el producto en la tienda sin costo alguno, o',
        'Solicitar el reenvío a través del operador logístico, asumiendo el costo del servicio.',
        'Si el cliente no recoge el producto ni coordina un nuevo envío en un plazo de 15 días naturales a partir de la notificación, AYNI no se responsabilizará de su conservación ni custodia.',
      ]],
    },
    {
      title: 'Reembolso de dinero',
      body: [[
        'El reembolso se efectuará mediante el mismo método de pago utilizado en la compra, a nombre del titular registrado, aplicando los descuentos correspondientes por comisiones bancarias. El plazo estimado para el reembolso será de hasta treinta (30) días naturales a partir de la aprobación de la solicitud.',
      ]],
    },
    {
      title: 'Cambios voluntarios solicitados por el cliente',
      body: [[
        'Si el cliente solicita un cambio de producto por decisión propia, sin defecto ni error atribuible a AYNI, la empresa podrá aceptar el cambio excepcionalmente y sujeto a evaluación, siempre que:',
        'El producto no haya sido usado ni manipulado.',
        'Se mantenga en perfectas condiciones.',
        'Conserve su embalaje original completo.',
        'Si el nuevo producto tiene un valor inferior al original, la diferencia a favor del cliente podrá utilizarse como crédito para futuras compras, pero no se realizará ningún reembolso en efectivo. Todos los gastos logísticos asociados al cambio (recogida y entrega) correrán a cargo del cliente.',
      ]],
    },
    {
      title: 'Jurisdicción y Ley Aplicable',
      body: [[
        'Esta política se rige por las leyes de la República del Perú. Cualquier controversia que surja de la interpretación, aplicación o ejecución de esta política se someterá a la jurisdicción de los Juzgados y Tribunales competentes de Lima, Perú, renunciando expresamente las partes a cualquier otra jurisdicción que pudiera corresponderles en razón de su domicilio presente o futuro.',
      ]],
    },
    {
      title: 'Declaración del cliente',
      body: [[
        'El cliente declara haber sido debidamente informado y estar de acuerdo con las condiciones establecidas en esta política. Asimismo, declara no tener reclamaciones adicionales contra AYNI una vez procesado el reembolso conforme a los términos aquí descritos.',
        'Para más información, puede contactar con: soporte@ayniworld.com.',
      ]],
    },
  ],
};
