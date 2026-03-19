# Reproduction: deno compile panic on 2.7.5+

https://github.com/denoland/deno/issues/32821

## Bug

`deno compile` binaries panic with "Expected at least one stalled top-level await" on Deno 2.7.5+. Works on 2.7.4.

## Setup

- Deno workspace with 2 packages
- `@repro/storage`: imports `@db/sqlite` (has top-level await via `@denosaurs/plug` dlopen)
- `@repro/agent`: imports `snowflake-sdk` (CJS) + many AI SDK packages + `@repro/storage`
- 500 generated intermediate modules importing from various npm packages
- Entry point imports from both workspace packages

## Reproduce

```bash
deno install
DENO_SQLITE_PATH=/path/to/libsqlite3.so deno compile --allow-all --no-check --output=myapp main.ts
DENO_SQLITE_PATH=/path/to/libsqlite3.so ./myapp
# Expected: prints "done: ..."
# Actual on 2.7.6: hangs or panics with "Expected at least one stalled top-level await"
```

The CI workflow tests both 2.7.4 and 2.7.6 on real amd64 Linux.
