FROM golang:1.22-alpine AS builder
WORKDIR /build
COPY backend/go.mod backend/go.sum backend/main.go ./
COPY backend/hooks ./hooks
COPY backend/auditlog ./auditlog
RUN apk --no-cache add upx make git gcc libtool musl-dev ca-certificates dumb-init \
  && go mod tidy \
  && CGO_ENABLED=0 go build \
  && upx pocketbase

FROM alpine
WORKDIR /app/backend
COPY --from=builder /build/pocketbase /app/backend/pocketbase
# COPY backend/pb_data ./pb_data #not needed
COPY backend/pb_hooks ./pb_hooks
COPY frontend/build ./pb_public
COPY backend/pb_migrations ./pb_migrations
COPY backend/data ./data
# these are the volumes you could mount to your own dirs
VOLUME pb_data pb_public pb_migrations pb_hooks data
CMD ["/app/backend/pocketbase","serve", "--http", "0.0.0.0:8090"]