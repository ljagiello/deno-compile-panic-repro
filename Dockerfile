ARG DENO_VERSION=alpine-2.7.6
FROM denoland/deno:${DENO_VERSION} AS builder
RUN apk add --no-cache sqlite-libs
ENV DENO_SQLITE_PATH=/usr/lib/libsqlite3.so.0
WORKDIR /app
COPY . .
RUN deno install
# Increase stack size to avoid qemu stack overflow
RUN ulimit -s unlimited 2>/dev/null; deno compile --allow-all --no-check --output=myapp --v8-flags=--stack-size=8192000 main.ts || echo "COMPILE FAILED: $?"

FROM denoland/deno:${DENO_VERSION}
RUN apk add --no-cache sqlite-libs
ENV DENO_SQLITE_PATH=/usr/lib/libsqlite3.so.0
COPY --from=builder /app/myapp /usr/local/bin/myapp
CMD ["myapp"]
