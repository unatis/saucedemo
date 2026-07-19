import { type Browser, type BrowserType, type Page, test } from "@playwright/test";

/*const OBJECT_PROTO_PROPS = new Set(Object.getOwnPropertyNames(Object.prototype));
const SKIP_METHOD_NAMES = new Set(["constructor", "step_Note"]);

function truncate(value: string, max: number): string {
    return value.length > max ? `${value.slice(0, max)}…` : value;
}

function stringifyArg(value: unknown, max = 80): string {
    if (typeof value === "string") return truncate(JSON.stringify(value), max);
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "function") return `[Function: ${value.name || "anonymous"}]`;
    if (Array.isArray(value)) return `[${value.map((v) => stringifyArg(v, max)).join(", ")}]`;
    if (typeof value === "object") {
        try {
            return truncate(JSON.stringify(value), max);
        } catch {
            return "[Object]";
        }
    }
    return String(value);
}

function buildStepTitle(name: string, args: unknown[]): string {
    return `${name}(${args.map((a) => stringifyArg(a)).join(", ")})`;
}

function wrapAsStep(fn: Function, name: string, receiver: object) {
    return function (...args: unknown[]) {
        const title = buildStepTitle(name, args);
        return test.step(title, async () => {
            return await Reflect.apply(fn, receiver, args);
        });
    };
}

function createInstrumentedProxy<T extends object>(target: T): T {
    return new Proxy(target, {
        get(obj, prop, receiver) {
            const value = Reflect.get(obj, prop, receiver);

            if (typeof prop === "symbol") return value;
            if (typeof value !== "function") return value;
            if (SKIP_METHOD_NAMES.has(prop)) return value;
            if (OBJECT_PROTO_PROPS.has(prop)) return value;

            return wrapAsStep(value, prop, receiver);
        },
    });
}
*/
export abstract class BasePage<TMap> {

    protected readonly page: Page;
    public readonly map: TMap;

    constructor(page: Page, MapClass: new (page: Page) => TMap) {
        this.page = page;
        this.map = new MapClass(page);

        //return createInstrumentedProxy(this) as this;
    }

    /*protected async step_Note(message: string): Promise<void> {
        await test.step(message, async () => { });
    }*/
}
