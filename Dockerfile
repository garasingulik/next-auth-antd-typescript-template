# build environment
FROM node:14.15.4-buster as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./
RUN npm run build

# production environment
FROM node:14.15.4-buster
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY package.json ./
COPY package-lock.json ./

RUN npm install --production

COPY ./public ./public
COPY --from=build /app/.next ./.next

ENV FIRST_USER_USERNAME='' \
    FIRST_USER_PASSWORD='' \
    NEXTAUTH_URL='' \
    DATABASE_URL='' \
    SESSION_SECRET='' \
    JWT_SECRET='' \
    EMAIL_SERVER='' \
    EMAIL_FROM=''

EXPOSE 80
CMD npm run start:prod
