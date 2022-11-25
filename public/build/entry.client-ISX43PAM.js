import {
  ClientStyleContext
} from "/build/_shared/chunk-SKXFVXOS.js";
import {
  require_react_dom
} from "/build/_shared/chunk-636IU3OZ.js";
import {
  RemixBrowser,
  __toESM,
  require_emotion_cache_cjs,
  require_emotion_react_cjs,
  require_jsx_dev_runtime,
  require_react
} from "/build/_shared/chunk-ACTGWXG2.js";

// app/entry.client.tsx
var import_react = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var import_react2 = __toESM(require_emotion_react_cjs(), 1);

// app/createEmotionCache.ts
var import_cache = __toESM(require_emotion_cache_cjs(), 1);
function createEmotionCache() {
  return (0, import_cache.default)({ key: "css" });
}

// app/entry.client.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function ClientCacheProvider({ children }) {
  const [cache, setCache] = (0, import_react.useState)(createEmotionCache());
  function reset() {
    setCache(createEmotionCache());
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientStyleContext.Provider, {
    value: { reset },
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.CacheProvider, {
      value: cache,
      children
    }, void 0, false, {
      fileName: "app/entry.client.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: "app/entry.client.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}
(0, import_react_dom.hydrate)(
  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClientCacheProvider, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixBrowser, {}, void 0, false, {
      fileName: "app/entry.client.tsx",
      lineNumber: 30,
      columnNumber: 5
    }, this)
  }, void 0, false, {
    fileName: "app/entry.client.tsx",
    lineNumber: 29,
    columnNumber: 3
  }, this),
  document
);
//# sourceMappingURL=/build/entry.client-ISX43PAM.js.map
