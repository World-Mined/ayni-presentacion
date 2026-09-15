FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Opcional: otro bucket para staging. Vacío usa el de producción (`media.ts`).
ARG PUBLIC_MEDIA_BASE_URL=
ENV PUBLIC_MEDIA_BASE_URL=$PUBLIC_MEDIA_BASE_URL

# La CSP se recalcula sobre esta misma build: los hashes de los scripts en
# línea y los orígenes de video dependen de lo que acaba de emitirse, y una
# cabecera desfasada bloquearía el JS del sitio en producción.
RUN npm run build && npm run csp:write

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
