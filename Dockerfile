# build environment
FROM node:12.19.0-buster as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

# production environment
FROM node:12.19.0-buster-slim
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY package.json ./
RUN npm install --production

COPY ./public ./public
COPY --from=build /app/.next ./.next

ENV NEXTAUTH_URL=''

EXPOSE 80
CMD npm run start:prod
