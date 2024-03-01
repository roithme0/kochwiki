### Stage 1: compile and build angular ###
FROM node:20 as build

# add source code
WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run build --configuration=production

### Stage 2: serve with nginx ###
FROM nginx:1.25

# copy build output to replace the default nginx content
COPY --from=build /usr/local/app/dist/angular/browser /usr/share/nginx/html

# create user to avoid running as root
RUN useradd -m myuser
USER myuser

EXPOSE 80