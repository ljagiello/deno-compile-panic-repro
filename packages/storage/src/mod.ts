import { Database } from "@db/sqlite";
import type { Kv } from "@deno/kv";
export type KvStore = Kv;
export async function openKvCompat(): Promise<any> {
  const { openKv: denoKvOpen } = await import("@deno/kv");
  return denoKvOpen(":memory:");
}
function createAdapter() { return { type: "local", Database }; }
export const adapter = createAdapter();
