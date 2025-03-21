import { spawn } from "child_process";
import { posix } from "path";
import { watchAndRun } from "vite-plugin-watch-and-run";
import { cyan, gray, green, italic, Log, red, stry0, yellow } from "@kitql/helpers";
import { dirname, read, write } from "@kitql/internals";
import {
	getActionsOfServerPages,
	getMethodsOfServerFiles
} from "../node_modules/vite-plugin-kit-routes/esm/ast.js";
import { appendSp, format, routeFn } from "../node_modules/vite-plugin-kit-routes/esm/format";
import { readdirSync } from "fs";
import { join, relative } from "path";

function getFilesUnder(rootFolder) {
	const files = [];
	function traverseDirectory(dir) {
		try {
			const entries = readdirSync(dir, { withFileTypes: true });
			for (const entry of entries) {
				const fullPath = join(dir, entry.name);
				if (entry.isDirectory()) {
					traverseDirectory(fullPath);
				} else if (entry.isSymbolicLink()) {
					traverseDirectory(fullPath);
				} else {
					const relativePath = relative(rootFolder, fullPath);
					files.push(relativePath);
				}
			}
		} catch (error) {}
	}
	traverseDirectory(rootFolder);
	return files;
}

export const log = new Log("Kit Routes");
export function routes_path(routes_path = "src/routes") {
	return posix.join(process.cwd(), routes_path);
}
export function rmvGroups(key) {
	const toRet = key
		// rmv /(groups)
		.replace(/\/\([^)]*\)/g, "")
		// rmv (groups)
		.replace(/\([^)]*\)/g, "");
	return toRet;
}
export function rmvOptional(key) {
	const toRet = key
		// rmv /[[Optional]]
		.replace(/\/\[\[.*?\]\]/g, "")
		// rmv [[Optional]]
		.replace(/\[\[.*?\]\]/g, "");
	return toRet;
}
export function formatKey(key, o) {
	const options = getDefaultOption(o);
	let toRet = o.format_page_route_id ? key : rmvGroups(rmvOptional(key));
	// In case we have only an optional param
	if (toRet === "") {
		toRet = "/";
	}
	if (options.format.includes("path")) {
		return toRet;
	}
	const toReplace = ["/", "[", "]", "(", ")", "-", "=", ".", ":"];
	toRet = toRet
		.split("")
		.map((c) => (toReplace.includes(c) ? "_" : c))
		.join("")
		.replaceAll("...", "")
		.replaceAll("__", "_")
		.replaceAll("__", "_")
		.replaceAll("__", "_");
	if (toRet.startsWith("_")) {
		toRet = toRet.slice(1);
	}
	if (toRet.endsWith("_")) {
		toRet = toRet.slice(0, -1);
	}
	if (toRet === "") {
		toRet = "_ROOT";
	}
	return toRet;
}
const getMetadata = (files, type, o, withAppendSp) => {
	const options = getDefaultOption(o);
	const useWithAppendSp = withAppendSp && options?.extra_search_params === "with";
	if (type === "LINKS") {
		const toRet = Object.entries(options?.LINKS ?? {}).flatMap((c) => {
			const hrefToUse = typeof c[1] === "string" ? c[1] : c[1].href;
			return transformToMetadata(c[0], hrefToUse, type, options, useWithAppendSp);
		});
		return toRet.filter((c) => c !== null);
	}
	const lookFor =
		type === "PAGES" ? "+page.svelte" : type === "SERVERS" ? "+server.ts" : "+page.server.ts";
	// For windows
	files = files.map((c) => c.replaceAll("\\", "/"));
	// remove the layout info
	files = files.map((c) => c.replace(/@[^.]*\./, "."));
	const toRet = files
		.filter((file) => file.endsWith(lookFor))
		.map((file) => `/` + file.replace(`/${lookFor}`, "").replace(lookFor, ""))
		// Keep the sorting at this level, it will make more sense
		.sort()
		.flatMap((original) =>
			transformToMetadata(original, original, type, options, useWithAppendSp)
		);
	return toRet.filter((c) => c !== null);
};
export const transformToMetadata = (original, originalValue, type, options, useWithAppendSp) => {
	const keyToUse = formatKey(original, options);
	const toRet = rmvGroups(originalValue);
	const list = [];
	const getSep = () => {
		return options?.format?.includes("route") || options?.format?.includes("path") ? ` ` : `_`;
	};
	if (type === "ACTIONS") {
		const { actions } = getActionsOfServerPages(originalValue);
		if (actions.length === 0) {
			// Nothing to do
		} else if (actions.length === 1 && actions[0] === "default") {
			list.push(
				buildMetadata(
					type,
					originalValue,
					"default" + getSep() + keyToUse,
					keyToUse,
					useWithAppendSp,
					"",
					toRet,
					options
				)
			);
		} else {
			actions.map((action) => {
				list.push(
					buildMetadata(
						type,
						originalValue,
						action + getSep() + keyToUse,
						keyToUse,
						useWithAppendSp,
						`?/${action}`,
						toRet,
						options
					)
				);
			});
		}
	} else if (type === "SERVERS") {
		const methods = getMethodsOfServerFiles(originalValue);
		if (methods.length === 0) {
			return [];
		} else {
			methods.map((method) => {
				list.push(
					buildMetadata(
						type,
						originalValue,
						method + getSep() + keyToUse,
						keyToUse,
						useWithAppendSp,
						``,
						toRet,
						options
					)
				);
			});
		}
	} else {
		list.push(
			buildMetadata(
				type,
				originalValue,
				keyToUse,
				keyToUse,
				useWithAppendSp,
				"",
				toRet,
				options
			)
		);
	}
	return list;
};
export function buildMetadata(
	type,
	originalValue,
	keyToUse,
	key_wo_prefix,
	useWithAppendSp,
	actionsFormat,
	toRet,
	o
) {
	const options = getDefaultOption(o);
	// custom conf
	const viteCustomPathConfig = options?.[type];
	let customConf = {
		extra_search_params: "default"
	};
	if (viteCustomPathConfig && viteCustomPathConfig[keyToUse]) {
		// @ts-expect-error
		customConf = viteCustomPathConfig[keyToUse];
	}
	const paramsFromPath = extractParamsFromPath(originalValue, options);
	// custom Param?
	if (customConf.params) {
		Object.entries(customConf.params).forEach((sp) => {
			for (let i = 0; i < paramsFromPath.length; i++) {
				if (paramsFromPath[i].name === sp[0]) {
					if (sp[1] && sp[1].type) {
						paramsFromPath[i].type = sp[1].type;
					}
					if (sp[1] && sp[1].default !== undefined) {
						paramsFromPath[i].default = sp[1].default;
						// It's becoming optional because it has a default
						paramsFromPath[i].optional = true;
					}
				}
			}
		});
	}
	// If empty... (it's in a group for example). Let's add a `/`
	if (toRet === "") {
		toRet = `/`;
	}
	paramsFromPath.forEach((c) => {
		const sMatcher = `${c.matcher ? `=${c.matcher}` : ""}`;
		// Very special case (only an optional param)
		if (toRet === `/[[${c.name + sMatcher}]]`) {
			toRet = `\${params?.['${c.name}'] ? \`/\${params?.['${c.name}']}\`: '/'}`;
		} else {
			// Always 2 cases, with "/" prefix and without
			const cases = ["/", ""];
			// First -> optionnals
			cases.forEach((prefix) => {
				toRet = toRet.replaceAll(
					`${prefix}[[${c.name + sMatcher}]]`,
					`\${params?.['${c.name}'] ? \`${prefix}\${params?.['${c.name}']}\`: ''}`
				);
			});
			// Second -> params
			cases.forEach((prefix) => {
				toRet = toRet.replaceAll(
					`${prefix}[${c.name + sMatcher}]`,
					`${prefix}\${params['${c.name}']}`
				);
			});
			// Third -> [...rest]
			cases.forEach((prefix) => {
				toRet = toRet.replaceAll(
					`${prefix}[...${c.name + sMatcher}]`,
					`${prefix}\${params['${c.name}']?.join('/')}`
				);
			});
		}
	});
	const params = [];
	let isAllOptional = paramsFromPath.filter((c) => !c.optional).length === 0;
	const paramsReq = paramsFromPath.filter((c) => !c.optional);
	if (customConf.hash) {
		customConf.explicit_search_params = {
			...customConf.explicit_search_params,
			hash: {
				type: customConf.hash.type,
				required: customConf.hash.required,
				default: customConf.hash.default,
				// @ts-expect-error
				isAnchor: true
			}
		};
	}
	// custom search Param?
	const explicit_search_params_to_function = [];
	if (customConf.explicit_search_params) {
		let someParamsHaveDefault =
			paramsFromPath.filter((c) => c.default !== undefined).length > 0;
		Object.entries(customConf.explicit_search_params).forEach((sp) => {
			const param = {
				name: sp[0],
				optional: !sp[1].required,
				type: sp[1].type,
				default: sp[1].default,
				isArray: false,
				// @ts-expect-error
				isAnchor: sp[1].isAnchor
			};
			paramsFromPath.push(param);
			if (sp[1].required) {
				isAllOptional = false;
				paramsReq.push(param);
			}
			if (sp[1].default !== undefined) {
				someParamsHaveDefault = true;
			}
		});
		let paramsIsOptional = isAllOptional;
		if (options.format_short && paramsReq.length === 1) {
			paramsIsOptional = true;
		}
		if (someParamsHaveDefault) {
			paramsIsOptional = false;
		}
		Object.entries(customConf.explicit_search_params).forEach((sp) => {
			const val = paramsIsOptional ? `params?.['${sp[0]}']` : `params['${sp[0]}']`;
			let key = sp[0];
			// @ts-expect-error
			if (sp[1].isAnchor) {
				key = `__KIT_ROUTES_ANCHOR__`;
			}
			explicit_search_params_to_function.push([key, getSpValue(val, sp[1])]);
		});
	}
	if (paramsFromPath.length > 0) {
		if (options.format_short && paramsReq.length === 1) {
			// If only ONE required param, and we have only one, then let's put params optional
			isAllOptional = true;
			params.push(formatArg(paramsReq[0], options));
			// If it's in the explicite and it's THIS one, let's change the array...
			if (
				explicit_search_params_to_function.length === 1 &&
				(explicit_search_params_to_function[0][0] === paramsReq[0].name ||
					explicit_search_params_to_function[0][0] === `__KIT_ROUTES_ANCHOR__`)
			) {
				const sp = customConf.explicit_search_params[paramsReq[0].name];
				explicit_search_params_to_function[0][1] = getSpValue(paramsReq[0].name, sp);
			} else {
				// in params
				toRet = toRet.replaceAll(`params['${paramsReq[0].name}']`, paramsReq[0].name);
			}
		}
		params.push(
			`params${isAllOptional ? "?" : ""}: { ${formatArgs(paramsFromPath, options)} }`
		);
	}
	const explicit_search_params = explicit_search_params_to_function
		.map(([param, val]) => (param === val ? param : `'${param}': ${val}`))
		.join(", ");
	let fullSP = "";
	const wExtraSP =
		(customConf.extra_search_params === "default" && useWithAppendSp) ||
		customConf.extra_search_params === "with";
	const appendSpPrefix = actionsFormat ? `, '&'` : "";
	if (wExtraSP && !customConf.explicit_search_params) {
		params.push(`sp?: Record<string, string | number>`);
		fullSP = `\${appendSp(sp${appendSpPrefix})}`;
	} else if (wExtraSP && customConf.explicit_search_params) {
		params.push(`sp?: Record<string, string | number>`);
		// We want explicite to be stronger and override sp
		fullSP = `\${appendSp({ ...sp, ${explicit_search_params} }${appendSpPrefix})}`;
	} else if (!wExtraSP && customConf.explicit_search_params) {
		fullSP = `\${appendSp({ ${explicit_search_params} }${appendSpPrefix})}`;
	}
	let paramsDefaults = paramsFromPath
		.filter((c) => c.default !== undefined)
		.map((c) => {
			return `params['${c.name}'] = params['${c.name}'] ?? ${c.default}; `;
		});
	if (paramsDefaults.length > 0 && isAllOptional) {
		paramsDefaults = ["params = params ?? {}", ...paramsDefaults];
	}
	const pathBaesStr = options?.router_type === "hash" ? "#" : options?.path_base ? "${base}" : "";
	const strDefault = paramsDefaults.length > 0 ? `${paramsDefaults.join("\n")}` : "";
	const completeToRet = `${pathBaesStr}${toRet}`;
	const trailingSlashToUse =
		o.trailingSlash === "always" && !completeToRet.endsWith("/") ? "/" : "";
	const strReturn = `\`${completeToRet}${trailingSlashToUse}${actionsFormat}${fullSP}\``;
	const strParams = params.join(", ");
	const baseToReturn = {
		keyToUse,
		key_wo_prefix,
		// prop,
		paramsFromPath,
		strDefault,
		strReturn,
		strParams
	};
	return baseToReturn;
}
function getSpValue(rawValue, param) {
	if (param.arrayMode === "join") {
		if (param.required || param.default !== undefined) {
			return `String(${rawValue})`;
		}
		return `${rawValue} === undefined ? undefined : String(${rawValue})`;
	}
	return rawValue;
}
export function extractParamsFromPath(path, o) {
	const options = getDefaultOption(o);
	const paramPattern = /\[+([^\]]+)]+/g;
	const params = [];
	const relToParams = posix.relative(dirname(options.generated_file_path), options.path_params);
	let match;
	while ((match = paramPattern.exec(path)) !== null) {
		// Check if it's surrounded by double brackets indicating an optional parameter
		const isOptional = match[0].startsWith("[[");
		const isArray = match[0].includes("...");
		const matcher = match[1].split("=");
		if (matcher.length === 2) {
			params.push({
				name: matcher[0].replace("...", ""),
				optional: isOptional,
				matcher: matcher[1],
				fromPath: true,
				isArray,
				// this will bring the type of the first arg of the function to to the match
				type: `Parameters<typeof import('${relToParams}/${matcher[1]}.ts').match>[0]`
			});
		} else {
			params.push({
				name: match[1].replace("...", ""),
				optional: isOptional,
				fromPath: true,
				isArray
			});
		}
	}
	return params;
}
const formatArgs = (params, o) => {
	const options = getDefaultOption(o);
	const paramsReq = params.filter((c) => !c.optional);
	if (options.format_short && paramsReq.length === 1) {
		params = params.filter((c) => c.optional);
	}
	const str = params
		.sort((a, b) => {
			// if (a.optional === b.optional) {
			//   // When 'optional' is the same, sort by 'name'
			//   return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
			// }
			// Otherwise, sort by 'optional'
			// Let's sort only by 'optional' at the end.
			return a.optional < b.optional ? -1 : 1;
		})
		.map((c) => {
			return formatArg(c, o);
		})
		.join(", ");
	return str;
};
const formatArg = (c, o) => {
	const options = getDefaultOption(o);
	const override_params = Object.entries(options?.override_params ?? {}).filter(
		(d) => d[0] === c.name
	);
	let override_param = undefined;
	if (override_params.length > 0) {
		override_param = override_params[0][1]?.type;
	}
	const nameEscaped = c.name.includes("-") ? `'${c.name}'` : c.name;
	return (
		`${nameEscaped}${c.optional ? "?" : ""}: ` +
		`(${c.type ?? override_param ?? options?.default_type ?? "string | number"})` +
		`${c.isArray ? "[]" : ""}`
	);
};
const shouldLog = (kind, o) => {
	const options = getDefaultOption(o);
	if (options.logs.update && kind === "update") {
		return true;
	} else if (options.logs.post_update_run && kind === "post_update_run") {
		return true;
	} else if (options.logs.errors && kind === "errors") {
		return true;
	} else if (options.logs.stats && kind === "stats") {
		return true;
	}
	return false;
};
export const getDefaultOption = (o) => {
	const options = {
		...o,
		logs: {
			update: true,
			post_update_run: true,
			errors: true,
			stats: false,
			...o?.logs
		},
		format: o?.format ?? "route(path)",
		generated_file_path: o?.generated_file_path ?? "src/lib/ROUTES.ts",
		path_params: o?.path_params ?? "src/params"
	};
	return options;
};
const arrayToRecord = (arr) => {
	if (arr && arr.length > 0) {
		return `: { ${arr.join(", ")} }`;
	}
	return `: Record<string, never>`;
};
export const run = async (atStart, o) => {
	const options = getDefaultOption(o);
	const files = getFilesUnder(routes_path(options.routes_path));
	// TODO check if harcoded links are around?
	// for (let i = 0; i < files.length; i++) {
	//   if (files[i].endsWith('.svelte')) {
	//     const pathToCheck = (options.routes_path ?? '/src/routes') + '/' + files[i]
	//     try {
	//       const found = extractHtmlElementAttr_Text(pathToCheck, [{ type: 'a', attr: 'href' }])
	//     } catch (error) {
	//       console.log(`error`, error)
	//     }
	//     // console.log(`found`, found, files[i])
	//     // log.info(
	//     //   `⚠️ Warning ${yellow(`action="?/save"`)} detected ` +
	//     //     `in ${gray('/routes/card/+page.svelte')} is not safe. ` +
	//     //     `You could use: ${green(`href={route('/card'}`)}`,
	//     // )
	//   }
	// }
	const objTypes = [
		{ type: "PAGES", files: getMetadata(files, "PAGES", options, true) },
		{ type: "SERVERS", files: getMetadata(files, "SERVERS", options, true) },
		{ type: "ACTIONS", files: getMetadata(files, "ACTIONS", options, false) },
		{ type: "LINKS", files: getMetadata(files, "LINKS", options, false) }
	];
	// Validate options
	const allOk = true;
	objTypes
		.filter((c) => c.type !== "LINKS")
		.forEach((o) => {
			Object.entries(options?.[o.type] ?? {}).forEach((e) => {
				const [key, cPath] = e;
				const found = o.files.find((c) => c.keyToUse === key);
				if (!found) {
					if (shouldLog("errors", options)) {
						log.error(
							`Can't extend "${green(`${o.type}.`)}${red(key)}" as this path doesn't exist!`
						);
					}
					// Even with warning, we should wite the file
					// allOk = false
				} else {
					if (cPath) {
						Object.entries(cPath.params ?? {}).forEach((p) => {
							const [pKey] = p;
							const paramsFromPathFound = found.paramsFromPath.find(
								(c) => c.name === pKey
							);
							if (!paramsFromPathFound) {
								if (shouldLog("errors", options)) {
									log.error(
										`Can't extend "${green(`${o.type}.${key}.params.`)}${red(pKey)}" as this param doesn't exist!`
									);
								}
								// Even with warning, we should wite the file
								// allOk = false
							}
						});
					}
				}
			});
		});
	if (allOk) {
		const result = write(options.generated_file_path, [
			`/* eslint-disable */
/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */${options?.path_base ? `\nimport { base } from '$app/paths'` : ""}
`,
			// consts
			options?.format === "variables"
				? // Format variables
					objTypes
						.map((c) => {
							return `/**\n * ${c.type}\n */
${c.files
	.map((key) => {
		if (key.strParams) {
			return (
				`export const ${c.type.slice(0, -1)}_${key.keyToUse} = (${key.strParams}) => {` +
				`${format({ bottom: 0, top: 1, left: 2 }, key.strDefault)}
  return ${key.strReturn}
}`
			);
		} else {
			return `export const ${c.type.slice(0, -1)}_${key.keyToUse} = ${key.strReturn}`;
		}
	})
	.join("\n")}`;
						})
						.join(`\n\n`)
				: // Format Others
					objTypes
						.map((c) => {
							return (
								`/**\n * ${c.type}\n */
${options?.exportObjects || options?.format?.includes("object") ? `export ` : ``}` +
								`const ${c.type} = {
  ${c.files
		.map((key) => {
			if (key.strParams) {
				return (
					`"${key.keyToUse}": (${key.strParams}) => {` +
					`${format({ bottom: 0, top: 1, left: 4 }, key.strDefault)}
    return ${key.strReturn}
  }`
				);
			} else {
				return `"${key.keyToUse}": ${key.strReturn}`;
			}
		})
		.join(",\n  ")}
}`
							);
						})
						.join(`\n\n`),
			format({ top: 1, left: 0 }, appendSp),
			// add appendSp
			...(options?.format?.includes("route") ? [format({ left: 0 }, routeFn)] : []),
			// types
			`/**
* Add this type as a generic of the vite plugin \`kitRoutes<KIT_ROUTES>\`.
*
* Full example:
* \`\`\`ts
* import type { KIT_ROUTES } from '${dolLib}/ROUTES'
* import { kitRoutes } from 'vite-plugin-kit-routes'
*
* kitRoutes<KIT_ROUTES>({
*  PAGES: {
*    // here, key of object will be typed!
*  }
* })
* \`\`\`
*/
export type KIT_ROUTES = {
${objTypes
	.map((c) => {
		return `  ${c.type}${arrayToRecord(
			c.files.map((d) => {
				return `'${d.keyToUse}': ${
					d.paramsFromPath.filter((e) => e.fromPath === true).length === 0
						? "never"
						: d.paramsFromPath
								.filter((e) => e.fromPath === true)
								.map((e) => {
									return `'${e.name}'`;
								})
								.join(" | ")
				}`;
			})
		)}`;
	})
	.join("\n")}
  Params${arrayToRecord([
		...new Set(
			objTypes.flatMap((c) =>
				c.files.flatMap((d) => d.paramsFromPath.map((e) => `'${e.name}': never`))
			)
		)
  ])}
}
`
		]);
		if (options?.post_update_run) {
			if (shouldLog("post_update_run", options)) {
				log.info(
					`${yellow(`post_update_run`)} "${green(options?.post_update_run)}" running...`
				);
			}
			// do the stuff
			const child = spawn(options.post_update_run, { shell: true });
			// report things
			if (shouldLog("post_update_run", options)) {
				child.stderr.on("data", (data) => {
					if (data.toString()) {
						log.info(data.toString());
					}
				});
			}
			// report errors
			if (shouldLog("errors", options)) {
				child.stderr.on("error", (data) => {
					const msg = data.toString().replace(/\n$/, "");
					if (msg.includes("DEP0040") && msg.includes("punycode")) {
						// silent error
					} else {
						log.error(msg);
					}
				});
			}
			const exitPromise = new Promise((resolve) => {
				child.on("close", () => resolve());
			});
			await exitPromise;
			if (shouldLog("update", options)) {
				theEnd(atStart, result, objTypes, options);
			}
		} else {
			theEnd(atStart, result, objTypes, options);
		}
		return true;
	}
	return false;
};
const dolLib = ["$", "lib"].join("");
function theEnd(atStart, result, objTypes, o) {
	const options = getDefaultOption(o);
	if (result) {
		if (shouldLog("update", options)) {
			log.success(`${yellow(options.generated_file_path)} updated`);
		}
	}
	if (atStart && shouldLog("stats", options)) {
		let version = "";
		try {
			const pkg = JSON.parse(read("./package.json") ?? "{}");
			version =
				pkg.devDependencies["vite-plugin-kit-routes"] ??
				pkg.dependencies["vite-plugin-kit-routes"] ??
				"";
		} catch (_error) {
			// silent error
		}
		const stats = [];
		const nbRoutes = objTypes.flatMap((c) => c.files).length;
		stats.push(
			`Routes: ${yellow("" + nbRoutes)} ` +
				`${italic(`(${objTypes.map((c) => `${c.type}: ${yellow("" + c.files.length)}`).join(", ")})`)}`
		);
		const confgPoints = stry0(Object.entries(options ?? {})).length;
		const shortV = options.format_short ? " short" : "";
		stats.push(`Points: ${yellow("" + confgPoints)}`);
		const score = (confgPoints / nbRoutes).toFixed(2);
		stats.push(`Score: ${yellow(score)}`);
		stats.push(`Format: "${yellow("" + options?.format + shortV)}"`);
		log.success(`${green("Stats:")} ${stats.join(" | ")}`);
		log.info(
			`${gray(" Share on bluesky:")} ${cyan(
				createBSkyIntent([
					`🚀 Check out my #KitRoutes stats 🚀`,
					"",
					`- Routes: ${nbRoutes} (${objTypes.map((c) => c.files.length).join(", ")})`,
					`- Points: ${confgPoints}`,
					`- Score: ${score}`,
					`- Format: "${options?.format}${shortV}"`,
					`- Version: ${version}`,
					"",
					`@jyc.dev 👀`
				])
			)}`
		);
	}
}
// TODO: fix this one day!
// https://github.com/bluesky-social/social-app/issues/6133
export function createBSkyIntent(msg) {
	// const lowerCaseUserAgent = navigator.userAgent.toLowerCase()
	// let lineBreak = '\r\n'
	// if (lowerCaseUserAgent.includes('windows')) {
	// }
	const lineBreak = "<br />";
	// console.log(`lowerCaseUserAgent`, { lowerCaseUserAgent, lineBreak })
	return `https://bsky.app/intent/compose?text=${encodeURIComponent(msg.join(lineBreak))}`;
}
/**
 * First you can start with something simple:
 * ```ts
 * import { kitRoutes } from 'vite-plugin-kit-routes'
 *
 * kitRoutes({
 *  // Conf
 * })
 * ```
 * ---
 * Then, you can add the `ROUTES` type... It will be crazy good!
 * ```ts
 * import type { KIT_ROUTES } from './ROUTES'
 * import { kitRoutes } from 'vite-plugin-kit-routes'
 *
 * kitRoutes<KIT_ROUTES>({
 *  // Conf
 * })
 * ```
 */
export function kitRoutes(options) {
	return [
		// Run the thing at startup
		{
			name: "kit-routes",
			async buildStart() {
				await run(true, options);
			}
		},
		// Run the thing when any change in a +page.svelte (add, remove, ...)
		watchAndRun([
			{
				name: "kit-routes-watch-svelte-files",
				logs: [],
				watchKind: ["add", "unlink"],
				watch: ["**/+page.svelte"],
				run: async () => {
					await run(false, options);
				}
			},
			{
				name: "kit-routes-watch-server-files",
				logs: [],
				watch: ["**/+page.server.ts", "**/+server.ts"],
				run: async () => {
					await run(false, options);
				}
			}
		])
	];
}
