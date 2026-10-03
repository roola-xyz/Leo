import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import { useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
//#region src/cn.ts
function c(...e) {
	return e.filter(Boolean).join(" ");
}
//#endregion
//#region src/components/Alert/index.tsx
var l = {
	error: "bg-error-container text-on-error-container",
	success: "bg-success-container text-on-success-container",
	info: "bg-primary-container text-on-primary-container",
	warning: "bg-warning-container text-on-warning-container"
};
function u({ tone: e = "info", children: n }) {
	return /* @__PURE__ */ t("div", {
		role: e === "error" ? "alert" : "status",
		className: c("rounded-field px-4 py-3 text-sm leading-5", l[e]),
		children: n
	});
}
//#endregion
//#region src/components/Avatar/index.tsx
var d = [
	"bg-[#c2410c]",
	"bg-[#b91c1c]",
	"bg-[#be185d]",
	"bg-[#7e22ce]",
	"bg-[#4338ca]",
	"bg-[#1d4ed8]",
	"bg-[#0369a1]",
	"bg-[#0f766e]",
	"bg-[#15803d]",
	"bg-[#4d7c0f]",
	"bg-[#a16207]",
	"bg-[#9a3412]"
], f = {
	xs: "size-6 text-[0.625rem]",
	sm: "size-9 text-sm",
	md: "size-10 text-base",
	lg: "size-20 text-2xl",
	xl: "size-32 text-5xl"
};
function p(e) {
	let t = 0;
	for (let n = 0; n < e.length; n += 1) t = t * 31 + e.charCodeAt(n) | 0;
	return Math.abs(t) % d.length;
}
function m({ name: e, handle: n, src: r, size: i = "sm", className: a }) {
	let [o, l] = s(!1);
	if (r && !o) return /* @__PURE__ */ t("img", {
		alt: "",
		className: c("shrink-0 rounded-full object-cover", f[i], a),
		loading: "lazy",
		onError: () => l(!0),
		src: r
	});
	let u = e.trim().charAt(0).toUpperCase() || "?";
	return /* @__PURE__ */ t("span", {
		"aria-hidden": "true",
		className: c("inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium text-white", d[p(n || e)], f[i], a),
		children: u
	});
}
//#endregion
//#region src/components/Badge/index.tsx
var h = {
	neutral: "bg-secondary-container text-on-secondary-container",
	green: "bg-success-container text-on-success-container",
	red: "bg-error-container text-on-error-container",
	amber: "bg-warning-container text-on-warning-container",
	blue: "bg-primary-container text-on-primary-container"
};
function g({ tone: e = "neutral", children: n }) {
	return /* @__PURE__ */ t("span", {
		className: c("inline-flex h-6 items-center rounded-lg px-2 text-xs font-medium", h[e]),
		children: n
	});
}
//#endregion
//#region src/components/Button/index.tsx
var _ = {
	filled: "bg-primary text-on-primary hover:brightness-110 active:brightness-95",
	tonal: "bg-secondary-container text-on-secondary-container hover:brightness-105 active:brightness-95",
	outlined: "border border-outline text-primary hover:bg-primary/8 active:bg-primary/12",
	text: "text-primary hover:bg-primary/8 active:bg-primary/12"
};
function v({ variant: e = "filled", loading: r = !1, icon: i, className: a, disabled: o, children: s, ...l }) {
	return /* @__PURE__ */ n("button", {
		disabled: o || r,
		"aria-busy": r,
		className: c("inline-flex h-10 items-center justify-center gap-2 rounded-full px-6", "text-sm font-medium tracking-[0.00714em] transition-all", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", "disabled:pointer-events-none disabled:opacity-38", _[e], a),
		...l,
		children: [r ? /* @__PURE__ */ n("svg", {
			className: "size-4 shrink-0 animate-spin",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ t("circle", {
				className: "opacity-25",
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				strokeWidth: "4",
				fill: "none"
			}), /* @__PURE__ */ t("path", {
				className: "opacity-75",
				fill: "currentColor",
				d: "M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
			})]
		}) : i, s]
	});
}
//#endregion
//#region src/components/Card/index.tsx
function y({ className: e, children: n }) {
	return /* @__PURE__ */ t("div", {
		className: c("rounded-card bg-surface", e),
		children: n
	});
}
function b({ title: e, description: r }) {
	return /* @__PURE__ */ n("div", {
		className: "px-6 pt-6 pb-2",
		children: [/* @__PURE__ */ t("h2", {
			className: "text-xl leading-7 font-normal text-on-surface",
			children: e
		}), r && /* @__PURE__ */ t("p", {
			className: "mt-1 text-sm leading-5 text-on-surface-variant",
			children: r
		})]
	});
}
function x({ className: e, children: n }) {
	return /* @__PURE__ */ t("div", {
		className: c("px-6 pt-2 pb-6", e),
		children: n
	});
}
//#endregion
//#region src/components/Chip/index.tsx
function S({ selected: e = !1, onClick: n, children: r }) {
	return /* @__PURE__ */ t("button", {
		type: "button",
		role: "radio",
		"aria-checked": e,
		onClick: n,
		className: c("h-8 shrink-0 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", e ? "bg-on-surface text-surface" : "bg-surface-container text-on-surface hover:bg-surface-high"),
		children: r
	});
}
//#endregion
//#region src/components/Field/index.tsx
function C({ label: e, error: r, hint: i, className: o, ...s }) {
	let l = a(), u = `${l}-error`, d = `${l}-hint`;
	return /* @__PURE__ */ n("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ n("div", {
				className: "relative",
				children: [/* @__PURE__ */ t("input", {
					id: l,
					placeholder: " ",
					"aria-invalid": r ? !0 : void 0,
					"aria-describedby": c(r && u, i && d) || void 0,
					className: c("peer h-14 w-full rounded-field border bg-transparent px-4 pt-4", "text-base text-on-surface transition-colors outline-none", "placeholder:text-transparent", r ? "border-error focus:border-error" : "border-outline focus:border-primary focus:border-2", o),
					...s
				}), /* @__PURE__ */ t("label", {
					htmlFor: l,
					className: c("pointer-events-none absolute left-3 px-1 transition-all", "top-1 text-xs", "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base", "peer-focus:top-1 peer-focus:text-xs", "bg-surface", r ? "text-error" : "text-on-surface-variant peer-focus:text-primary"),
					children: e
				})]
			}),
			i && !r && /* @__PURE__ */ t("p", {
				id: d,
				className: "px-4 text-xs text-on-surface-variant",
				children: i
			}),
			r && /* @__PURE__ */ t("p", {
				id: u,
				className: "px-4 text-xs font-medium text-error",
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/Icon/index.tsx
var w = {
	menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
	search: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
	home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
	subscriptions: "M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z",
	library: "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z",
	play: "M8 5v14l11-7z",
	pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
	replay: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z",
	replay10: "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm-1.1 10.7H10v-3.15l-.97.3v-.66l1.78-.63h.09v4.14zm4.28-1.72c0 .28-.03.53-.09.73a1.4 1.4 0 0 1-.26.5c-.11.13-.25.22-.4.28a1.5 1.5 0 0 1-.52.09c-.19 0-.36-.03-.52-.09a1.11 1.11 0 0 1-.41-.28 1.42 1.42 0 0 1-.27-.5 2.4 2.4 0 0 1-.09-.73v-.6c0-.28.03-.52.09-.72a1.4 1.4 0 0 1 .26-.5c.11-.13.25-.22.4-.28a1.5 1.5 0 0 1 .52-.09c.19 0 .36.03.52.09.16.06.29.15.41.28.11.13.2.29.26.5.06.2.1.44.1.72v.6zm-.76-.71c0-.17-.01-.31-.04-.42a.86.86 0 0 0-.1-.27.38.38 0 0 0-.17-.15.5.5 0 0 0-.21-.04.5.5 0 0 0-.22.04.4.4 0 0 0-.17.15.79.79 0 0 0-.1.27c-.02.11-.04.25-.04.42v.82c0 .17.02.31.04.42.03.11.06.2.11.27.04.07.1.12.17.15a.53.53 0 0 0 .43 0 .37.37 0 0 0 .16-.15.8.8 0 0 0 .1-.27c.03-.11.04-.25.04-.42v-.82z",
	forward10: "M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8zm-1.1 10.7H10v-3.15l-.97.3v-.66l1.78-.63h.09v4.14zm4.28-1.72c0 .28-.03.53-.09.73a1.4 1.4 0 0 1-.26.5c-.11.13-.25.22-.4.28a1.5 1.5 0 0 1-.52.09c-.19 0-.36-.03-.52-.09a1.11 1.11 0 0 1-.41-.28 1.42 1.42 0 0 1-.27-.5 2.4 2.4 0 0 1-.09-.73v-.6c0-.28.03-.52.09-.72a1.4 1.4 0 0 1 .26-.5c.11-.13.25-.22.4-.28a1.5 1.5 0 0 1 .52-.09c.19 0 .36.03.52.09.16.06.29.15.41.28.11.13.2.29.26.5.06.2.1.44.1.72v.6zm-.76-.71c0-.17-.01-.31-.04-.42a.86.86 0 0 0-.1-.27.38.38 0 0 0-.17-.15.5.5 0 0 0-.21-.04.5.5 0 0 0-.22.04.4.4 0 0 0-.17.15.79.79 0 0 0-.1.27c-.02.11-.04.25-.04.42v.82c0 .17.02.31.04.42.03.11.06.2.11.27.04.07.1.12.17.15a.53.53 0 0 0 .43 0 .37.37 0 0 0 .16-.15.8.8 0 0 0 .1-.27c.03-.11.04-.25.04-.42v-.82z",
	loop: "M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z",
	next: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z",
	previous: "M18 6l-8.5 6 8.5 6V6zM8 6v12H6V6h2z",
	autoplay: "M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10zM10 8.5v7l6-3.5-6-3.5z",
	miniplayer: "M3 5h18v8h-2V7H5v10h6v2H3V5zm10 9h9v7h-9v-7z",
	theater: "M2 6v12h20V6H2zm18 10H4V8h16v8z",
	theaterExit: "M2 6v12h20V6H2zm12 10H4V8h10v8zm6 0h-4V8h4v8z",
	speed: "M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z",
	volumeHigh: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
	volumeLow: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z",
	volumeMute: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z",
	fullscreen: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z",
	fullscreenExit: "M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z",
	pictureInPicture: "M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z",
	cast: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zM21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z",
	castConnected: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z",
	live: "M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.24 6.24a5.98 5.98 0 0 1 0-8.48L6.34 6.34a8 8 0 0 0 0 11.31l1.42-1.41zm8.48-8.48a5.98 5.98 0 0 1 0 8.48l1.42 1.41a8 8 0 0 0 0-11.31l-1.42 1.42zM4.93 3.93a11.96 11.96 0 0 0 0 16.14l1.41-1.42a9.97 9.97 0 0 1 0-13.3L4.93 3.93zm14.14 0-1.41 1.42a9.97 9.97 0 0 1 0 13.3l1.41 1.42a11.96 11.96 0 0 0 0-16.14z",
	upload: "M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z",
	create: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",
	like: "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z",
	share: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z",
	more: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
	close: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
	check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
	block: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.902 7.902 0 0 1 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.902 7.902 0 0 1 20 12c0 4.42-3.58 8-8 8z",
	flag: "M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6zM18 13h-4l-.4-2H7V6h5.6l.4 2h5v5z",
	chevronDown: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
	chevronLeft: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z",
	chevronRight: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z",
	person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
	settings: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
	signOut: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
	globe: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93A7.99 7.99 0 0 1 4 12c0-.62.08-1.21.21-1.79L9 15v1a2 2 0 0 0 2 2v1.93zm6.9-2.54A1.99 1.99 0 0 0 16 16h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41A7.98 7.98 0 0 1 20 12c0 2.08-.8 3.97-2.1 5.39z",
	info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v2h-2V7zm0 4h2v6h-2v-6z",
	link: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 0-10z",
	lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 0 1 6.2 0v2z",
	sun: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-1-5h2v3h-2V2zm0 17h2v3h-2v-3zM2 11h3v2H2v-2zm17 0h3v2h-3v-2zM4.22 5.64l1.42-1.42 2.12 2.12-1.41 1.42-2.13-2.12zm11.02 11.02 1.41-1.42 2.12 2.13-1.41 1.41-2.12-2.12zm2.12-12.44 1.42 1.42-2.13 2.12-1.41-1.42 2.12-2.12zM5.64 19.78l-1.42-1.41 2.13-2.12 1.41 1.41-2.12 2.12z",
	moon: "M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z",
	desktop: "M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z",
	music: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
	gaming: "M21 6H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
	film: "M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4h-4z",
	sport: "M19 5h-2V3H7v2H5a2 2 0 0 0-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7a2 2 0 0 0-2-2zM5 8V7h2v3.82A3.005 3.005 0 0 1 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z",
	news: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
	learning: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z",
	technology: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
	comedy: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm3.5-9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
	travel: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
	food: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z",
	making: "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z",
	talks: "M12 14c1.66 0 3-1.34 3-3V5a3 3 0 0 0-6 0v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z",
	orientation: "M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16.01H3V4.99h18v14.02zM7 9h3V7H5v5h2V9zm12 6h-2v-3h-3v-2h5v5z",
	tune: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z",
	explore: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19zM12 10.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z",
	trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
	edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
	thumbUp: "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z",
	thumbDown: "M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z",
	mail: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
	ballot: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
	raiseHand: "M13 2v8h-2V2h2zm4.5 3.5L16 4l-3 3 1.5 1.5 3-3zM7 4L5.5 5.5l3 3L10 7 7 4zm10.9 8.6c-.3-.9-1.2-1.6-2.2-1.6H13V7c0-.6-.4-1-1-1s-1 .4-1 1v9.5l-3-.6c-.4-.1-.8.1-1 .4-.3.4-.2 1 .2 1.3l4.6 3.6c.4.3.9.5 1.4.5h4.1c1 0 1.9-.7 2.1-1.7l.9-4.4c.1-.6 0-1.2-.4-1.6-.3-.3-.6-.4-1-.4z"
};
function T({ name: e, className: n, filled: r = !0 }) {
	return /* @__PURE__ */ t("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		focusable: "false",
		className: c("shrink-0", n ?? "size-6"),
		children: /* @__PURE__ */ t("path", {
			d: w[e],
			fill: r ? "currentColor" : "none",
			stroke: r ? void 0 : "currentColor",
			strokeWidth: r ? void 0 : 2
		})
	});
}
//#endregion
//#region src/components/IconButton/index.tsx
function E({ icon: e, label: n, size: r = "md", active: i = !1, className: a, ...o }) {
	return /* @__PURE__ */ t("button", {
		type: "button",
		"aria-label": n,
		title: n,
		"aria-pressed": i || void 0,
		className: c("inline-flex items-center justify-center rounded-full transition-colors", "text-on-surface hover:bg-surface-high active:bg-surface-high", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", "disabled:pointer-events-none disabled:opacity-38", r === "sm" ? "size-9" : "size-10", i && "bg-surface-high", a),
		...o,
		children: /* @__PURE__ */ t(T, {
			name: e,
			className: r === "sm" ? "size-5" : "size-6"
		})
	});
}
//#endregion
//#region src/components/LanguageSelect/index.tsx
function D({ value: e, options: r, onChange: i, label: a, className: o }) {
	let s = r.find((t) => t.value === e);
	return /* @__PURE__ */ n("div", {
		className: c("relative inline-flex h-8 items-center gap-1.5 rounded-full", "border border-outline-variant pr-2 pl-2.5 text-sm text-on-surface", "transition-colors hover:bg-primary/8", "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary", o),
		children: [
			/* @__PURE__ */ t(O, {}),
			/* @__PURE__ */ t("span", {
				"aria-hidden": "true",
				className: "max-w-44 truncate",
				children: s?.label ?? e
			}),
			/* @__PURE__ */ t(k, {}),
			/* @__PURE__ */ t("select", {
				value: e,
				onChange: (e) => i(e.target.value),
				"aria-label": a,
				className: "absolute inset-0 w-full cursor-pointer opacity-0",
				children: r.map((e) => /* @__PURE__ */ t("option", {
					value: e.value,
					children: e.label
				}, e.value))
			})
		]
	});
}
function O() {
	return /* @__PURE__ */ n("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.7,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className: "size-4 shrink-0 text-on-surface-variant",
		children: [
			/* @__PURE__ */ t("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}),
			/* @__PURE__ */ t("path", { d: "M3.6 9h16.8M3.6 15h16.8" }),
			/* @__PURE__ */ t("path", { d: "M12 3a15 15 0 010 18a15 15 0 010-18z" })
		]
	});
}
function k() {
	return /* @__PURE__ */ t("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className: "size-4 shrink-0 text-on-surface-variant",
		children: /* @__PURE__ */ t("path", { d: "M6 9l6 6 6-6" })
	});
}
//#endregion
//#region src/components/Menu/index.tsx
function A({ trigger: e, align: l = "end", children: u, className: d }) {
	let [f, p] = s(!1), m = o(null), h = o(null), g = a(), _ = r(() => p(!1), []);
	return i(() => {
		if (!f) return;
		function e(e) {
			m.current?.contains(e.target) || p(!1);
		}
		function t(e) {
			e.key === "Escape" && (p(!1), h.current?.focus());
		}
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", t);
		};
	}, [f]), /* @__PURE__ */ n("div", {
		ref: m,
		className: "relative",
		children: [/* @__PURE__ */ t("button", {
			ref: h,
			type: "button",
			"aria-haspopup": "menu",
			"aria-expanded": f,
			"aria-controls": f ? g : void 0,
			onClick: () => p((e) => !e),
			className: "flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
			children: e
		}), f && /* @__PURE__ */ t("div", {
			id: g,
			role: "menu",
			className: c("absolute top-full z-50 mt-2 min-w-64 overflow-hidden rounded-field border border-outline-variant", "bg-surface py-2 shadow-lg shadow-black/20", l === "end" ? "right-0" : "left-0", d),
			children: typeof u == "function" ? u(_) : u
		})]
	});
}
function j({ icon: r, href: i, onClick: a, selected: o, danger: s = !1, children: l }) {
	let u = c("flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors", "hover:bg-surface-high focus-visible:bg-surface-high focus-visible:outline-none", s ? "text-error" : "text-on-surface"), d = /* @__PURE__ */ n(e, { children: [
		r && /* @__PURE__ */ t(T, {
			name: r,
			className: "size-5 text-on-surface-variant"
		}),
		/* @__PURE__ */ t("span", {
			className: "flex-1 truncate",
			children: l
		}),
		o !== void 0 && /* @__PURE__ */ t("span", {
			className: "w-5 shrink-0",
			children: o && /* @__PURE__ */ t(T, {
				name: "check",
				className: "size-5 text-primary"
			})
		})
	] });
	return i ? /* @__PURE__ */ t("a", {
		role: "menuitem",
		href: i,
		onClick: a,
		className: u,
		children: d
	}) : /* @__PURE__ */ t("button", {
		role: o === void 0 ? "menuitem" : "menuitemradio",
		"aria-checked": o,
		type: "button",
		onClick: a,
		className: u,
		children: d
	});
}
function M() {
	return /* @__PURE__ */ t("hr", { className: "my-2 border-outline-variant" });
}
function N({ children: e }) {
	return /* @__PURE__ */ t("p", {
		className: "px-4 pt-1 pb-2 text-xs font-medium tracking-wide text-on-surface-variant uppercase",
		children: e
	});
}
//#endregion
//#region src/components/Select/index.tsx
function P({ label: e, error: r, hint: i, options: o, placeholder: s, className: l, ...u }) {
	let d = a(), f = `${d}-error`, p = `${d}-hint`;
	return /* @__PURE__ */ n("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ n("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ n("select", {
						id: d,
						"aria-invalid": r ? !0 : void 0,
						"aria-describedby": c(r && f, i && p) || void 0,
						className: c("h-14 w-full appearance-none rounded-field border bg-transparent px-4 pt-4", "text-base text-on-surface transition-colors outline-none", r ? "border-error focus:border-error" : "border-outline focus:border-primary focus:border-2", l),
						...u,
						children: [s !== void 0 && /* @__PURE__ */ t("option", {
							value: "",
							children: s
						}), o.map((e) => /* @__PURE__ */ t("option", {
							value: e.value,
							children: e.label
						}, e.value))]
					}),
					/* @__PURE__ */ t("label", {
						htmlFor: d,
						className: c("pointer-events-none absolute top-1 left-3 bg-surface px-1 text-xs", r ? "text-error" : "text-on-surface-variant"),
						children: e
					}),
					/* @__PURE__ */ t("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: 2,
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						className: "pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-on-surface-variant",
						children: /* @__PURE__ */ t("path", { d: "M6 9l6 6 6-6" })
					})
				]
			}),
			i && !r && /* @__PURE__ */ t("p", {
				id: p,
				className: "px-4 text-xs text-on-surface-variant",
				children: i
			}),
			r && /* @__PURE__ */ t("p", {
				id: f,
				className: "px-4 text-xs font-medium text-error",
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/Skeleton/index.tsx
function F({ className: e }) {
	return /* @__PURE__ */ t("span", {
		"aria-hidden": "true",
		className: c("block animate-pulse rounded-md bg-surface-high", e)
	});
}
//#endregion
//#region src/components/Spinner/index.tsx
function I({ label: e = "Loading", className: r }) {
	return /* @__PURE__ */ n("span", {
		role: "status",
		className: c("inline-flex items-center gap-2", r),
		children: [/* @__PURE__ */ n("svg", {
			className: "size-5 animate-spin text-on-surface-variant",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ t("circle", {
				className: "opacity-25",
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				strokeWidth: "4",
				fill: "none"
			}), /* @__PURE__ */ t("path", {
				className: "opacity-75",
				fill: "currentColor",
				d: "M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
			})]
		}), /* @__PURE__ */ t("span", {
			className: "sr-only",
			children: e
		})]
	});
}
//#endregion
//#region src/components/TextArea/index.tsx
function L({ label: e, error: r, hint: i, className: o, rows: s = 6, ...l }) {
	let u = a(), d = `${u}-error`, f = `${u}-hint`;
	return /* @__PURE__ */ n("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ n("div", {
				className: "relative",
				children: [/* @__PURE__ */ t("textarea", {
					id: u,
					rows: s,
					"aria-invalid": r ? !0 : void 0,
					"aria-describedby": c(r && d, i && f) || void 0,
					className: c("w-full rounded-field border bg-transparent px-4 pt-5 pb-3", "text-base text-on-surface transition-colors outline-none", "resize-y", r ? "border-error focus:border-error" : "border-outline focus:border-primary focus:border-2", o),
					...l
				}), /* @__PURE__ */ t("label", {
					htmlFor: u,
					className: c("pointer-events-none absolute top-1 left-3 bg-surface px-1 text-xs", r ? "text-error" : "text-on-surface-variant"),
					children: e
				})]
			}),
			i && !r && /* @__PURE__ */ t("p", {
				id: f,
				className: "px-4 text-xs text-on-surface-variant",
				children: i
			}),
			r && /* @__PURE__ */ t("p", {
				id: d,
				className: "px-4 text-xs font-medium text-error",
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/ThemeToggle/index.tsx
var R = [
	{
		value: "system",
		label: "Match system",
		icon: "◐"
	},
	{
		value: "light",
		label: "Light",
		icon: "☀"
	},
	{
		value: "dark",
		label: "Dark",
		icon: "☾"
	}
];
function z({ value: e, onChange: n }) {
	return /* @__PURE__ */ t("div", {
		role: "radiogroup",
		"aria-label": "Appearance",
		className: "inline-flex h-8 overflow-hidden rounded-full border border-outline-variant",
		children: R.map((r) => {
			let i = e === r.value;
			return /* @__PURE__ */ t("button", {
				type: "button",
				role: "radio",
				"aria-checked": i,
				"aria-label": r.label,
				title: r.label,
				onClick: () => n(r.value),
				className: c("w-9 text-xs transition-colors", i ? "bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:bg-primary/8"),
				children: /* @__PURE__ */ t("span", {
					"aria-hidden": "true",
					children: r.icon
				})
			}, r.value);
		})
	});
}
//#endregion
//#region src/components/AppsMenu/index.tsx
function B({ accountsUrl: e }) {
	let [r, a] = s(!1), [l, u] = s([]), d = o(null), f = o(null);
	return i(() => {
		!r || l.length > 0 || fetch(`${e}/api/apps`, { headers: { Accept: "application/json" } }).then((e) => e.ok ? e.json() : { apps: [] }).then((e) => u(e.apps ?? [])).catch(() => void 0);
	}, [r, l.length]), i(() => {
		if (!r) return;
		function e(e) {
			d.current?.contains(e.target) || a(!1);
		}
		function t(e) {
			e.key === "Escape" && (a(!1), f.current?.focus());
		}
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [r]), /* @__PURE__ */ n("div", {
		ref: d,
		className: "relative",
		children: [/* @__PURE__ */ t("button", {
			ref: f,
			type: "button",
			onClick: () => a((e) => !e),
			"aria-expanded": r,
			"aria-haspopup": "true",
			"aria-label": "Roola apps",
			title: "Roola apps",
			className: c("flex size-9 items-center justify-center rounded-full transition-colors", "text-on-surface-variant hover:bg-surface-container hover:text-on-surface", r && "bg-surface-container text-on-surface"),
			children: /* @__PURE__ */ t(V, {})
		}), r && /* @__PURE__ */ t("div", {
			"aria-label": "Roola apps",
			className: c("absolute right-0 z-50 mt-2 w-80 rounded-2xl p-2", "border border-outline-variant bg-surface shadow-lg"),
			children: l.length === 0 ? /* @__PURE__ */ t("p", {
				className: "p-4 text-center text-sm text-on-surface-variant",
				children: "Loading…"
			}) : /* @__PURE__ */ t("ul", {
				className: "grid grid-cols-3 gap-1",
				children: l.map((e) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ n("a", {
					href: e.url,
					title: e.description,
					className: c("flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center", "transition-colors hover:bg-surface-container"),
					children: [/* @__PURE__ */ t("span", {
						className: "flex size-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container",
						children: /* @__PURE__ */ t(U, { name: e.icon })
					}), /* @__PURE__ */ t("span", {
						className: "text-xs leading-4 font-medium text-on-surface",
						children: e.name
					})]
				}) }, e.name))
			})
		})]
	});
}
function V() {
	return /* @__PURE__ */ t("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		className: "size-5",
		children: [
			5,
			12,
			19
		].map((e) => [
			5,
			12,
			19
		].map((n) => /* @__PURE__ */ t("circle", {
			cx: n,
			cy: e,
			r: "1.8"
		}, `${n}-${e}`)))
	});
}
var H = {
	account: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1",
	cloud: "M7 18a4 4 0 010-8 5.5 5.5 0 0110.5-1.5A3.75 3.75 0 0118 18z",
	console: "M4 17l6-6-6-6M12 19h8",
	socialise: "M8 12a3 3 0 100-6 3 3 0 000 6zM2 20v-1a5 5 0 015-5h2a5 5 0 015 5v1M17 11l2 2 4-4",
	docs: "M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7",
	support: "M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1.2-1.5 2M12 17h.01",
	politicise: "M4 20h16M6 20V9M18 20V9M4 9h16l-2-4H6zM10 20v-5h4v5M9 12h6M9 15.5h6",
	helix: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"
};
function U({ name: e }) {
	return /* @__PURE__ */ t("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 1.7,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		className: "size-5",
		children: /* @__PURE__ */ t("path", { d: H[e] ?? H.helix })
	});
}
//#endregion
//#region src/components/ReportDialog/index.tsx
function W({ heading: r, doneHeading: a = "Thank you", subject: l, prompt: d, reasons: f, reasonsError: p, noteLabel: m = "Anything else? (optional)", notePlaceholder: h, submitLabel: g = "Report", onSubmit: _, onClose: y, children: b }) {
	let [x, S] = s(""), [C, w] = s(""), [E, D] = s(!1), [O, k] = s(null), [A, j] = s(null), M = o(null);
	i(() => {
		function e(e) {
			e.key === "Escape" && y();
		}
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [y]), i(() => {
		M.current?.focus();
	}, []);
	async function N() {
		D(!0), j(null);
		try {
			k(await _(x, C || void 0));
		} catch (e) {
			j(e instanceof Error && e.message ? e.message : "That could not be sent. Please try again."), D(!1);
		}
	}
	let P = A ?? p ?? null;
	return /* @__PURE__ */ t("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-scrim/40 p-0 sm:items-center sm:p-4",
		onClick: y,
		children: /* @__PURE__ */ n("div", {
			ref: M,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "report-heading",
			tabIndex: -1,
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-lg rounded-t-3xl bg-surface p-6 shadow-lg outline-none sm:rounded-3xl",
			children: [/* @__PURE__ */ n("div", {
				className: "mb-4 flex items-start gap-3",
				children: [/* @__PURE__ */ t("h2", {
					id: "report-heading",
					className: "text-xl font-normal text-on-surface",
					children: O ? a : r
				}), /* @__PURE__ */ t("button", {
					type: "button",
					onClick: y,
					"aria-label": "Close",
					className: "ml-auto -mr-2 -mt-1 inline-flex size-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container",
					children: /* @__PURE__ */ t(T, {
						name: "close",
						className: "size-5"
					})
				})]
			}), O ? /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t("p", {
				className: "text-sm text-on-surface-variant",
				children: O
			}), /* @__PURE__ */ t("div", {
				className: "mt-6 flex justify-end",
				children: /* @__PURE__ */ t(v, {
					onClick: y,
					children: "Done"
				})
			})] }) : /* @__PURE__ */ n(e, { children: [
				l && /* @__PURE__ */ t("p", {
					className: "mb-4 truncate text-sm text-on-surface-variant",
					title: l,
					children: l
				}),
				b,
				P && /* @__PURE__ */ t("div", {
					className: "mb-4",
					children: /* @__PURE__ */ t(u, {
						tone: "error",
						children: P
					})
				}),
				/* @__PURE__ */ n("fieldset", {
					className: "space-y-1",
					children: [/* @__PURE__ */ t("legend", {
						className: "sr-only",
						children: d
					}), f === null ? !p && /* @__PURE__ */ t("p", {
						className: "text-sm text-on-surface-variant",
						children: "Loading…"
					}) : f.map((e) => /* @__PURE__ */ n("label", {
						className: c("flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors", x === e.value ? "bg-secondary-container text-on-secondary-container" : "text-on-surface hover:bg-surface-container"),
						children: [/* @__PURE__ */ t("input", {
							type: "radio",
							name: "report-reason",
							value: e.value,
							checked: x === e.value,
							onChange: (e) => S(e.target.value),
							className: "size-4 accent-primary"
						}), e.label]
					}, e.value))]
				}),
				/* @__PURE__ */ n("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ t("label", {
						htmlFor: "report-note",
						className: "text-xs font-medium text-on-surface-variant",
						children: m
					}), /* @__PURE__ */ t("textarea", {
						id: "report-note",
						rows: 2,
						maxLength: 500,
						value: C,
						onChange: (e) => w(e.target.value),
						placeholder: h,
						className: "mt-1 block w-full rounded-lg border border-outline bg-transparent px-3 py-2 text-sm text-on-surface"
					})]
				}),
				/* @__PURE__ */ n("div", {
					className: "mt-6 flex justify-end gap-2",
					children: [/* @__PURE__ */ t(v, {
						variant: "text",
						onClick: y,
						children: "Cancel"
					}), /* @__PURE__ */ t(v, {
						onClick: N,
						loading: E,
						disabled: !x,
						children: g
					})]
				})
			] })]
		})
	});
}
//#endregion
//#region src/components/UserMenu/index.tsx
var G = {
	panel: "Account",
	appearance: "Appearance",
	signOut: "Sign out"
};
function K({ user: e, theme: r, onThemeChange: a, onSignOut: l, labels: u, children: d }) {
	let f = {
		...G,
		...u
	}, [p, m] = s(!1), h = o(null), g = o(null);
	return i(() => {
		if (!p) return;
		function e(e) {
			h.current?.contains(e.target) || m(!1);
		}
		function t(e) {
			e.key === "Escape" && (m(!1), g.current?.focus());
		}
		return document.addEventListener("mousedown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("mousedown", e), document.removeEventListener("keydown", t);
		};
	}, [p]), /* @__PURE__ */ n("div", {
		ref: h,
		className: "relative",
		children: [/* @__PURE__ */ n("button", {
			ref: g,
			type: "button",
			onClick: () => m((e) => !e),
			"aria-expanded": p,
			"aria-haspopup": "true",
			className: c("flex items-center gap-2 rounded-full py-1 pr-2 pl-1 transition-colors", "hover:bg-surface-container", p && "bg-surface-container"),
			children: [
				/* @__PURE__ */ t(J, {
					name: e.name,
					image: e.image
				}),
				/* @__PURE__ */ t("span", {
					className: "hidden max-w-40 truncate text-sm font-medium text-on-surface sm:block",
					children: Y(e.name)
				}),
				/* @__PURE__ */ t("svg", {
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: 2,
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": "true",
					className: c("size-4 shrink-0 text-on-surface-variant transition-transform", p && "rotate-180"),
					children: /* @__PURE__ */ t("path", { d: "M6 9l6 6 6-6" })
				})
			]
		}), p && /* @__PURE__ */ n("div", {
			"aria-label": f.panel,
			className: c("absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl", "border border-outline-variant bg-surface shadow-lg"),
			children: [
				/* @__PURE__ */ n("div", {
					className: "flex items-center gap-3 px-4 py-4",
					children: [/* @__PURE__ */ t(J, {
						name: e.name,
						image: e.image,
						size: "lg"
					}), /* @__PURE__ */ n("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ t("p", {
								className: "truncate text-sm font-medium text-on-surface",
								children: Y(e.name)
							}),
							/* @__PURE__ */ t("p", {
								className: "text-xs break-all text-on-surface-variant",
								children: e.email
							}),
							e.reference && /* @__PURE__ */ t("p", {
								className: "font-mono text-xs text-on-surface-variant",
								children: e.reference
							})
						]
					})]
				}),
				/* @__PURE__ */ t("div", { className: "border-t border-outline-variant" }),
				/* @__PURE__ */ n("div", {
					className: "flex items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ t("span", {
						className: "text-sm text-on-surface",
						children: f.appearance
					}), /* @__PURE__ */ t(z, {
						value: r,
						onChange: a
					})]
				}),
				d,
				/* @__PURE__ */ t("div", { className: "border-t border-outline-variant" }),
				/* @__PURE__ */ n("button", {
					type: "button",
					onClick: () => {
						m(!1), l();
					},
					className: c("flex w-full items-center gap-3 px-4 py-3 text-left text-sm", "text-on-surface transition-colors hover:bg-surface-container"),
					children: [/* @__PURE__ */ t("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: 1.7,
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						className: "size-5 text-on-surface-variant",
						children: /* @__PURE__ */ t("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" })
					}), f.signOut]
				})
			]
		})]
	});
}
function q({ label: e, children: r }) {
	return /* @__PURE__ */ n("div", {
		className: "flex items-center justify-between gap-3 px-4 pb-3",
		children: [/* @__PURE__ */ t("span", {
			className: "text-sm text-on-surface",
			children: e
		}), r]
	});
}
function J({ name: e, image: n, size: r = "sm" }) {
	let i = r === "lg" ? "size-10 text-sm" : "size-8 text-xs";
	if (n) return /* @__PURE__ */ t("img", {
		src: n,
		alt: "",
		className: c("shrink-0 rounded-full object-cover", i)
	});
	let a = e.split(/\s+/).filter(Boolean).slice(0, 2).map((e) => e[0]?.toUpperCase() ?? "").join("");
	return /* @__PURE__ */ t("span", {
		"aria-hidden": "true",
		className: c("flex shrink-0 items-center justify-center rounded-full", "bg-primary-container font-medium text-on-primary-container", i),
		children: a || "?"
	});
}
function Y(e) {
	return e.split(/\s+/).filter(Boolean)[0] ?? e;
}
//#endregion
//#region src/components/VerificationToast/index.tsx
function X({ verification: e, onApprove: r, onDeny: a, onLapse: o }) {
	let [c, l] = s(e.seconds_remaining), [u, d] = s(null);
	i(() => {
		let t = new Date(e.expires_at).getTime(), n = () => {
			let n = Math.max(0, Math.round((t - Date.now()) / 1e3));
			l(n), n === 0 && o(e.uid);
		};
		n();
		let r = setInterval(n, 1e3);
		return () => clearInterval(r);
	}, [
		e.uid,
		e.expires_at,
		o
	]);
	async function f(t) {
		d(t);
		try {
			await (t === "approve" ? r : a)(e.uid);
		} catch {} finally {
			d(null);
		}
	}
	return /* @__PURE__ */ n("div", {
		role: "alertdialog",
		"aria-live": "assertive",
		"aria-labelledby": `verification-${e.uid}-title`,
		className: "w-full max-w-sm overflow-hidden rounded-card bg-surface shadow-lg ring-1 ring-outline-variant",
		children: [/* @__PURE__ */ n("div", {
			className: "flex items-start gap-3 border-b border-outline-variant px-4 py-3",
			children: [/* @__PURE__ */ t("span", {
				className: "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-warning-container text-on-warning-container",
				children: /* @__PURE__ */ t("svg", {
					className: "size-4",
					viewBox: "0 0 20 20",
					fill: "currentColor",
					"aria-hidden": "true",
					children: /* @__PURE__ */ t("path", {
						fillRule: "evenodd",
						d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
						clipRule: "evenodd"
					})
				})
			}), /* @__PURE__ */ n("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ t("h2", {
					id: `verification-${e.uid}-title`,
					className: "text-sm font-semibold text-on-surface",
					children: "Identity check requested"
				}), /* @__PURE__ */ n("p", {
					className: "mt-0.5 text-sm text-on-surface-variant",
					children: [/* @__PURE__ */ t("span", {
						className: "font-medium",
						children: e.agent_name
					}), " from Roola support is asking you to confirm it is really you."]
				})]
			})]
		}), /* @__PURE__ */ n("div", {
			className: "space-y-3 px-4 py-3",
			children: [
				/* @__PURE__ */ n("div", { children: [/* @__PURE__ */ t("p", {
					className: "text-xs text-on-surface-variant",
					children: "Reason given"
				}), /* @__PURE__ */ t("p", {
					className: "text-sm text-on-surface",
					children: e.reason
				})] }),
				/* @__PURE__ */ n("div", {
					className: "rounded-field bg-surface-container px-3 py-2",
					children: [
						/* @__PURE__ */ t("p", {
							className: "text-xs text-on-surface-variant",
							children: "The agent should read out this number"
						}),
						/* @__PURE__ */ t("p", {
							className: "font-mono text-lg font-semibold tracking-[0.2em] text-on-surface",
							children: e.challenge
						}),
						/* @__PURE__ */ t("p", {
							className: "mt-1 text-xs text-on-surface-variant",
							children: "If it does not match what you are being told, press Deny."
						})
					]
				}),
				/* @__PURE__ */ n("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ n("p", {
						className: c <= 15 ? "text-xs font-medium text-error" : "text-xs text-on-surface-variant",
						children: [
							"Expires in ",
							c,
							"s"
						]
					}), /* @__PURE__ */ n("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ t(v, {
							variant: "outlined",
							onClick: () => f("deny"),
							loading: u === "deny",
							disabled: u !== null,
							children: "Deny"
						}), /* @__PURE__ */ t(v, {
							onClick: () => f("approve"),
							loading: u === "approve",
							disabled: u !== null,
							children: "It's me"
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/hooks/useScrolled.ts
function Z(e = 0) {
	let [t, n] = s(!1);
	return i(() => {
		let t = () => n(window.scrollY > e);
		return t(), window.addEventListener("scroll", t, { passive: !0 }), () => window.removeEventListener("scroll", t);
	}, [e]), t;
}
//#endregion
export { u as Alert, B as AppsMenu, m as Avatar, g as Badge, v as Button, y as Card, x as CardBody, b as CardHeader, S as Chip, C as Field, T as Icon, E as IconButton, D as LanguageSelect, A as Menu, j as MenuItem, N as MenuLabel, M as MenuSeparator, W as ReportDialog, P as Select, F as Skeleton, I as Spinner, L as TextArea, z as ThemeToggle, K as UserMenu, q as UserMenuRow, X as VerificationToast, c as cn, Z as useScrolled };
