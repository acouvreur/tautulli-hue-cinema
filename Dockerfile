FROM golang:1.21 AS build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY main.go main.go
COPY Makefile Makefile

ARG BUILDTIME
ARG VERSION
ARG REVISION
ARG TARGETOS
ARG TARGETARCH
RUN make BUILDTIME=${BUILDTIME} VERSION=${VERSION} GIT_REVISION=${REVISION} ${TARGETOS}/${TARGETARCH}

FROM alpine:3.18.3

COPY --from=build /app/tautulli-home-cinema* /usr/bin/tautulli-home-cinema

EXPOSE 8080

ENTRYPOINT [ "/usr/bin/tautulli-home-cinema" ]