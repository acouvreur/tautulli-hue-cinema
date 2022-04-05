# Tautulli Hue Cinema

![CI](https://github.com/acouvreur/tautulli-hue-cinema/workflows/ci/badge.svg)
![Docker Image Size](https://img.shields.io/docker/image-size/acouvreur/tautulli-hue-cinema)
![Docker Pulls](https://img.shields.io/docker/pulls/acouvreur/tautulli-hue-cinema)

## Getting started

1. Obtain a user from the Hue bridge
`docker run --rm acouvreur/tautulli-hue-cinema create-hue-user`
2. Retrieve the light group you want to control
`docker run --rm acouvreur/tautulli-hue-cinema list-scenes`
3. Setup tautulli webhooks


## Environment variables

- `LIGHT_GROUP_ID`
- `HUE_USERNAME`
