# Srage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:20 as build

# Add the source code to app
WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run build --configuration=production

# Stage 2: Serve app with nginx server

FROM nginx:1.25

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/angular/browser /usr/share/nginx/html

EXPOSE 80