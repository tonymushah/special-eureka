import {
  ClientStyleContext,
  ServerStyleContext
} from "/build/_shared/chunk-SKXFVXOS.js";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  __toESM,
  require_emotion_react_cjs,
  require_jsx_dev_runtime,
  require_react
} from "/build/_shared/chunk-ACTGWXG2.js";

// app/root.tsx
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_emotion_react_cjs(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
var links = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
    }
  ];
};
var Document = (0, import_react2.withEmotionCache)(
  ({ children }, emotionCache) => {
    const serverStyleData = (0, import_react.useContext)(ServerStyleContext);
    const clientStyleData = (0, import_react.useContext)(ClientStyleContext);
    (0, import_react.useEffect)(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        emotionCache.sheet._insertTag(tag);
      });
      clientStyleData?.reset();
    }, []);
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
      lang: "en",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
              fileName: "app/root.tsx",
              lineNumber: 60,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
              fileName: "app/root.tsx",
              lineNumber: 61,
              columnNumber: 11
            }, this),
            serverStyleData?.map(({ key, ids, css }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("style", {
              "data-emotion": `${key} ${ids.join(" ")}`,
              dangerouslySetInnerHTML: { __html: css }
            }, key, false, {
              fileName: "app/root.tsx",
              lineNumber: 63,
              columnNumber: 13
            }, this))
          ]
        }, void 0, true, {
          fileName: "app/root.tsx",
          lineNumber: 59,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", {
          children: [
            children,
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
              fileName: "app/root.tsx",
              lineNumber: 72,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
              fileName: "app/root.tsx",
              lineNumber: 73,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
              fileName: "app/root.tsx",
              lineNumber: 74,
              columnNumber: 11
            }, this)
          ]
        }, void 0, true, {
          fileName: "app/root.tsx",
          lineNumber: 70,
          columnNumber: 9
        }, this)
      ]
    }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this);
  }
);
export {
  links,
  meta
};
//# sourceMappingURL=/build/root-J4MSKL4O.js.map
