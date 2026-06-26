# AYNI - Presentación de Diapositivas PWA (Offline-First)

Este proyecto es una aplicación web progresiva (PWA) offline-first para reproducir una presentación de diapositivas interactiva (estilo PowerPoint) del branding **AYNI**, basada en el diseño de Figma y construida con **Astro**.

## 🚀 Arquitectura y Características

1. **Slides configurables (`src/data/slides.ts`)**: Todas las diapositivas, sus fondos, enlaces de botones interactivos (como el menú de productos, plan y bonos) y las flechas de navegación están definidos en un archivo de datos estructurado en JS. Cambiar el orden de las diapositivas o agregar nuevas es tan sencillo como modificar este archivo.
2. **Presentación Responsiva (Aspect Ratio Lock)**: La aplicación escala de manera inteligente toda la presentación para ajustarse a cualquier resolución de pantalla (móvil, tablet, desktop) manteniendo siempre un formato de aspecto perfecto de `16:9` (1920x1080) sin deformar el texto o los assets.
3. **PWA Completa & Offline-First**:
   - **Precache total**: Todo el código de la aplicación (HTML, CSS, JS) y las imágenes de fondo se descargan en la primera visita. La aplicación funciona 100% sin conexión después de la primera carga.
   - **iOS Safari Preferente**: Incluye splash screens personalizados para iPhone/iPad en modo horizontal, soporte de iconos táctiles y tags específicos de iOS (`apple-mobile-web-app-capable`).
   - **UX de Conectividad**: Banner de advertencia de estado de red (online/offline) y avisos para actualizaciones silenciosas de nueva versión.
   - **Instalación Directa**: Captura el evento `beforeinstallprompt` en Android/Chrome y muestra instrucciones detalladas con iconos de Safari en iOS.

---

## 🛠️ Cómo Administrar las Diapositivas

El archivo principal para controlar el contenido es `src/data/slides.ts`.

### 1. Cambiar el Orden
Para cambiar el orden de navegación, cambia el orden de los elementos en la constante `SLIDES` y asegúrate de actualizar las propiedades `prevSlide` y `nextSlide` en la configuración `header` de cada diapositiva.

### 2. Agregar un Nuevo Slide
Para añadir una diapositiva:
1. Coloca tu imagen de fondo en `public/assets/` (ej. `bg_nuevo_slide.png`).
2. Agrega un nuevo objeto al array `SLIDES` en `src/data/slides.ts`:
   ```typescript
   {
     id: "nuevo-slide-id",
     name: "Nombre del Slide",
     bgImage: "/assets/bg_nuevo_slide.png",
     header: {
       showClose: true,
       closeTo: "home",
       showArrows: true,
       prevSlide: "slide-anterior-id",
       nextSlide: "slide-siguiente-id"
     }
   }
   ```
3. Modifica el `nextSlide` de la diapositiva anterior y el `prevSlide` de la posterior para encadenarlo en el flujo.

---

## 🧞 Comandos del Proyecto

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala las dependencias del proyecto |
| `npm run dev` | Inicia el servidor de desarrollo local en `localhost:4321` |
| `npm run build` | Compila la aplicación de producción en la carpeta `./dist/` |
| `npm run preview` | Previsualiza localmente el build de producción |

---

## 📱 Cómo Probar el Funcionamiento Offline y PWA

Dado que los Service Workers requieren HTTPS o localhost, sigue estas instrucciones específicas para pruebas locales y en dispositivos reales:

### 1. Probar Offline en tu Computadora (DevTools)
1. Ejecuta la compilación de producción y abre el servidor de previsualización:
   ```bash
   npm run build
   npm run preview
   ```
2. Abre la URL en Chrome u otro navegador (usualmente `http://localhost:4321` o `http://localhost:3000`).
3. Deja que la app cargue por completo para que el Service Worker se registre y descargue los assets.
4. Abre la consola de desarrollo (F12) -> ve a la pestaña **Application** (Aplicación) -> **Service Workers** -> activa el checkbox **Offline** (o desconecta la red wifi de tu computadora).
5. Recarga la página y navega por los slides. ¡Verás que todo carga al instante sin internet!

### 2. Probar en un iPhone o iPad Real (Crítico para iOS)
El simulador de iOS a veces no maneja correctamente el caché del Service Worker de Safari. Para probarlo en un dispositivo real:
1. Conecta tu computadora y tu iPhone a la **misma red Wi-Fi**.
2. Determina la **IP local** de tu computadora (ej. ejecutando `ipconfig` en la terminal de Windows. Busca la dirección IPv4, que suele ser del tipo `192.168.1.X`).
3. Inicia el servidor de previsualización de Astro permitiendo el acceso en tu red local:
   ```bash
   npx astro preview --host
   ```
   Astro te mostrará una dirección de red del tipo `http://192.168.1.X:4321`.
4. Abre **Safari** en tu iPhone y escribe esa dirección exacta.
5. Una vez cargada la página:
   - Pulsa el botón **Compartir** de Safari (icono de la caja con flecha arriba).
   - Selecciona **Añadir a pantalla de inicio**.
   - Cierra Safari y abre la app desde el nuevo icono de **AYNI** en tu pantalla de inicio.
6. Ahora, pon tu iPhone en **Modo Avión** (sin Wi-Fi ni datos móviles).
7. Abre la app de AYNI en tu pantalla de inicio. Verás cómo carga toda la presentación interactiva instantáneamente y de forma fluida.

