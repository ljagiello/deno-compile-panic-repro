import https from "node:https";
const O=https.Agent;function P(this:any,...a:any[]){return Reflect.construct(O,a,new.target||P)}
P.prototype=O.prototype;Object.setPrototypeOf(P,O);
// @ts-expect-error
https.Agent=P;
import snowflake from "snowflake-sdk";
import { adapter } from "@repro/storage";
import { generateText, tool, createProviderRegistry } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import * as Sentry from "@sentry/deno";
import { Hono } from "hono";
import { z } from "zod";
import { Client } from "@hubspot/api-client";
import { trace } from "@opentelemetry/api";
import * as jose from "jose";
import { createMachine } from "xstate";
import JSZip from "jszip";
import { DOMParser } from "@xmldom/xmldom";
const registry = createProviderRegistry({anthropic:createAnthropic(),google:createGoogleGenerativeAI(),openai:createOpenAI()});
export { snowflake, adapter, generateText, tool, z, registry };
