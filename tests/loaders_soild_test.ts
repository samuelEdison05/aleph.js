import { assert, assertEquals } from "std/testing/asserts.ts";
import SolidLoader from "../loaders/solid.ts";

Deno.test("[unit] loaders/solid.ts", async (t) => {
  await t.step("SolidLoader", async () => {
    const testCode = `
    import { render} from "https://esm.sh/solid-js/web";
    import { createSignal } from "https://esm.sh/solid-js";

    const foo = "foo";

    function Counter() {
      const [count, setCount] = createSignal(0);
      const increment = () => setCount(count() + 1);

      return (
        <button type="button" onClick={increment}>
          {count()}
        </button>
      );
    }

    render(() => <Counter />, document.getElementById("app")!);
  `;
    const loader = new SolidLoader();
    const { lang, code } = await loader.load("test.tsx", testCode, {});
    assert(loader.test("test.tsx"));
    assertEquals(lang, "js");
    assert(code.includes('_$template(`<button type="button"></button>`,'));
    assert(code.includes("_$createComponent(Counter, {})"));
  });
});
