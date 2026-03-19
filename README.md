# Deno 2.7.6 panic repro

This repo contains only public code. It vendors the exact public `snowflake-sdk`
dependency tree under `node_modules/` and uses `jsr:@db/sqlite@0.13.0`.

Verified on macOS arm64 with Homebrew `sqlite3`.

## Reproduce

Use this exact command sequence:

```bash
git clone https://github.com/ljagiello/deno-compile-panic-repro
cd deno-compile-panic-repro
export DENO_SQLITE_PATH="$(brew --prefix sqlite3)/lib/libsqlite3.dylib"
npx -y deno@2.7.6 eval --node-modules-dir=manual --ext=ts 'import "./main.ts"'
```

Expected result on `2.7.6`: Deno panics with:

```text
internal error: entered unreachable code: Expected at least one stalled top-level await
```

## Control

```bash
git clone https://github.com/ljagiello/deno-compile-panic-repro
cd deno-compile-panic-repro
export DENO_SQLITE_PATH="$(brew --prefix sqlite3)/lib/libsqlite3.dylib"
npx -y deno@2.7.4 eval --node-modules-dir=manual --ext=ts 'import "./main.ts"'
```

Expected result on `2.7.4`: exits cleanly.

Use `deno eval` exactly as shown above. In this reduced repro, `deno run main.ts`
did not reproduce the panic.
