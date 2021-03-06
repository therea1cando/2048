(function() {
    var e = this;
    (function() {
        (function() {
            this.Rails = {
                linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                buttonClickSelector: {
                    selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                    exclude: "form button"
                },
                inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                formSubmitSelector: "form",
                formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                fileInputSelector: "input[name][type=file]:not([disabled])",
                linkDisableSelector: "a[data-disable-with], a[data-disable]",
                buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
            }
        }).call(this)
    }).call(e);
    var v = e.Rails;
    (function() {
        (function() {
            v.cspNonce = function() {
                var e;
                return (e = document.querySelector("meta[name=csp-nonce]")) && e.content
            }
        }).call(this),
            function() {
                var r, n;
                n = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector, v.matches = function(e, t) {
                    return null != t.exclude ? n.call(e, t.selector) && !n.call(e, t.exclude) : n.call(e, t)
                }, r = "_ujsData", v.getData = function(e, t) {
                    var n;
                    return null != (n = e[r]) ? n[t] : void 0
                }, v.setData = function(e, t, n) {
                    return null == e[r] && (e[r] = {}), e[r][t] = n
                }, v.$ = function(e) {
                    return Array.prototype.slice.call(document.querySelectorAll(e))
                }
            }.call(this),
            function() {
                var n, r, i;
                n = v.$, i = v.csrfToken = function() {
                    var e;
                    return (e = document.querySelector("meta[name=csrf-token]")) && e.content
                }, r = v.csrfParam = function() {
                    var e;
                    return (e = document.querySelector("meta[name=csrf-param]")) && e.content
                }, v.CSRFProtection = function(e) {
                    var t;
                    if (null != (t = i())) return e.setRequestHeader("X-CSRF-Token", t)
                }, v.refreshCSRFTokens = function() {
                    var e, t;
                    if (t = i(), e = r(), null != t && null != e) return n('form input[name="' + e + '"]').forEach(function(e) {
                        return e.value = t
                    })
                }
            }.call(this),
            function() {
                var i, t, o, n;
                o = v.matches, "function" != typeof(i = window.CustomEvent) && ((i = function(e, t) {
                    var n;
                    return (n = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
                }).prototype = window.Event.prototype, n = i.prototype.preventDefault, i.prototype.preventDefault = function() {
                    var e;
                    return e = n.call(this), this.cancelable && !this.defaultPrevented && Object.defineProperty(this, "defaultPrevented", {
                        get: function() {
                            return !0
                        }
                    }), e
                }), t = v.fire = function(e, t, n) {
                    var r;
                    return r = new i(t, {
                        bubbles: !0,
                        cancelable: !0,
                        detail: n
                    }), e.dispatchEvent(r), !r.defaultPrevented
                }, v.stopEverything = function(e) {
                    return t(e.target, "ujs:everythingStopped"), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation()
                }, v.delegate = function(e, n, t, r) {
                    return e.addEventListener(t, function(e) {
                        var t;
                        for (t = e.target; t instanceof Element && !o(t, n);) t = t.parentNode;
                        if (t instanceof Element && !1 === r.call(t, e)) return e.preventDefault(), e.stopPropagation()
                    })
                }
            }.call(this),
            function() {
                var t, r, e, o, i, s;
                o = v.cspNonce, r = v.CSRFProtection, v.fire, t = {
                    "*": "*/*",
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript",
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                }, v.ajax = function(n) {
                    var r;
                    return n = i(n), r = e(n, function() {
                        var e, t;
                        return t = s(null != (e = r.response) ? e : r.responseText, r.getResponseHeader("Content-Type")), 2 === Math.floor(r.status / 100) ? "function" == typeof n.success && n.success(t, r.statusText, r) : "function" == typeof n.error && n.error(t, r.statusText, r), "function" == typeof n.complete ? n.complete(r, r.statusText) : void 0
                    }), !(null != n.beforeSend && !n.beforeSend(r, n)) && (r.readyState === XMLHttpRequest.OPENED ? r.send(n.data) : void 0)
                }, i = function(e) {
                    return e.url = e.url || location.href, e.type = e.type.toUpperCase(), "GET" === e.type && e.data && (e.url.indexOf("?") < 0 ? e.url += "?" + e.data : e.url += "&" + e.data), null == t[e.dataType] && (e.dataType = "*"), e.accept = t[e.dataType], "*" !== e.dataType && (e.accept += ", */*; q=0.01"), e
                }, e = function(e, t) {
                    var n;
                    return (n = new XMLHttpRequest).open(e.type, e.url, !0), n.setRequestHeader("Accept", e.accept), "string" == typeof e.data && n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), e.crossDomain || n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), r(n), n.withCredentials = !!e.withCredentials, n.onreadystatechange = function() {
                        if (n.readyState === XMLHttpRequest.DONE) return t(n)
                    }, n
                }, s = function(e, t) {
                    var n, r;
                    if ("string" == typeof e && "string" == typeof t)
                        if (t.match(/\bjson\b/)) try {
                                e = JSON.parse(e)
                            } catch (i) {} else if (t.match(/\b(?:java|ecma)script\b/))(r = document.createElement("script")).setAttribute("nonce", o()), r.text = e, document.head.appendChild(r).parentNode.removeChild(r);
                            else if (t.match(/\b(xml|html|svg)\b/)) {
                        n = new DOMParser, t = t.replace(/;.+/, "");
                        try {
                            e = n.parseFromString(e, t)
                        } catch (i) {}
                    }
                    return e
                }, v.href = function(e) {
                    return e.href
                }, v.isCrossDomain = function(e) {
                    var t, n;
                    (t = document.createElement("a")).href = location.href, n = document.createElement("a");
                    try {
                        return n.href = e, !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
                    } catch (r) {
                        return r, !0
                    }
                }
            }.call(this),
            function() {
                var i, o;
                i = v.matches, o = function(e) {
                    return Array.prototype.slice.call(e)
                }, v.serializeElement = function(e, t) {
                    var n, r;
                    return n = [e], i(e, "form") && (n = o(e.elements)), r = [], n.forEach(function(t) {
                        if (t.name && !t.disabled) return i(t, "select") ? o(t.options).forEach(function(e) {
                            if (e.selected) return r.push({
                                name: t.name,
                                value: e.value
                            })
                        }) : t.checked || -1 === ["radio", "checkbox", "submit"].indexOf(t.type) ? r.push({
                            name: t.name,
                            value: t.value
                        }) : void 0
                    }), t && r.push(t), r.map(function(e) {
                        return null != e.name ? encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) : e
                    }).join("&")
                }, v.formElements = function(e, t) {
                    return i(e, "form") ? o(e.elements).filter(function(e) {
                        return i(e, t)
                    }) : o(e.querySelectorAll(t))
                }
            }.call(this),
            function() {
                var t, o, n;
                o = v.fire, n = v.stopEverything, v.handleConfirm = function(e) {
                    if (!t(this)) return n(e)
                }, t = function(e) {
                    var t, n, r;
                    if (!(r = e.getAttribute("data-confirm"))) return !0;
                    if (t = !1, o(e, "confirm")) {
                        try {
                            t = confirm(r)
                        } catch (i) {}
                        n = o(e, "confirm:complete", [t])
                    }
                    return t && n
                }
            }.call(this),
            function() {
                var n, r, i, o, s, a, t, l, u, c, f;
                u = v.matches, l = v.getData, c = v.setData, f = v.stopEverything, t = v.formElements, v.handleDisabledElement = function(e) {
                    if (this.disabled) return f(e)
                }, v.enableElement = function(e) {
                    var t;
                    return t = e instanceof Event ? e.target : e, u(t, v.linkDisableSelector) ? a(t) : u(t, v.buttonDisableSelector) || u(t, v.formEnableSelector) ? o(t) : u(t, v.formSubmitSelector) ? s(t) : void 0
                }, v.disableElement = function(e) {
                    var t;
                    return t = e instanceof Event ? e.target : e, u(t, v.linkDisableSelector) ? i(t) : u(t, v.buttonDisableSelector) || u(t, v.formDisableSelector) ? n(t) : u(t, v.formSubmitSelector) ? r(t) : void 0
                }, i = function(e) {
                    var t;
                    return null != (t = e.getAttribute("data-disable-with")) && (c(e, "ujs:enable-with", e.innerHTML), e.innerHTML = t), e.addEventListener("click", f), c(e, "ujs:disabled", !0)
                }, a = function(e) {
                    var t;
                    return null != (t = l(e, "ujs:enable-with")) && (e.innerHTML = t, c(e, "ujs:enable-with", null)), e.removeEventListener("click", f), c(e, "ujs:disabled", null)
                }, r = function(e) {
                    return t(e, v.formDisableSelector).forEach(n)
                }, n = function(e) {
                    var t;
                    return null != (t = e.getAttribute("data-disable-with")) && (u(e, "button") ? (c(e, "ujs:enable-with", e.innerHTML), e.innerHTML = t) : (c(e, "ujs:enable-with", e.value), e.value = t)), e.disabled = !0, c(e, "ujs:disabled", !0)
                }, s = function(e) {
                    return t(e, v.formEnableSelector).forEach(o)
                }, o = function(e) {
                    var t;
                    return null != (t = l(e, "ujs:enable-with")) && (u(e, "button") ? e.innerHTML = t : e.value = t, c(e, "ujs:enable-with", null)), e.disabled = !1, c(e, "ujs:disabled", null)
                }
            }.call(this),
            function() {
                var l;
                l = v.stopEverything, v.handleMethod = function(e) {
                    var t, n, r, i, o, s, a;
                    if (a = (s = this).getAttribute("data-method")) return o = v.href(s), n = v.csrfToken(), t = v.csrfParam(), r = document.createElement("form"), i = "<input name='_method' value='" + a + "' type='hidden' />", null == t || null == n || v.isCrossDomain(o) || (i += "<input name='" + t + "' value='" + n + "' type='hidden' />"), i += '<input type="submit" />', r.method = "post", r.action = o, r.target = s.target, r.innerHTML = i, r.style.display = "none", document.body.appendChild(r), r.querySelector('[type="submit"]').click(), l(e)
                }
            }.call(this),
            function() {
                var l, u, c, f, d, h, p, m, g, y = [].slice;
                h = v.matches, c = v.getData, m = v.setData, u = v.fire, g = v.stopEverything, l = v.ajax, f = v.isCrossDomain, p = v.serializeElement, d = function(e) {
                    var t;
                    return null != (t = e.getAttribute("data-remote")) && "false" !== t
                }, v.handleRemote = function(e) {
                    var t, n, r, i, o, s, a;
                    return !d(i = this) || (u(i, "ajax:before") ? (a = i.getAttribute("data-with-credentials"), r = i.getAttribute("data-type") || "script", h(i, v.formSubmitSelector) ? (t = c(i, "ujs:submit-button"), o = c(i, "ujs:submit-button-formmethod") || i.method, s = c(i, "ujs:submit-button-formaction") || i.getAttribute("action") || location.href, "GET" === o.toUpperCase() && (s = s.replace(/\?.*$/, "")), "multipart/form-data" === i.enctype ? (n = new FormData(i), null != t && n.append(t.name, t.value)) : n = p(i, t), m(i, "ujs:submit-button", null), m(i, "ujs:submit-button-formmethod", null), m(i, "ujs:submit-button-formaction", null)) : h(i, v.buttonClickSelector) || h(i, v.inputChangeSelector) ? (o = i.getAttribute("data-method"), s = i.getAttribute("data-url"), n = p(i, i.getAttribute("data-params"))) : (o = i.getAttribute("data-method"), s = v.href(i), n = i.getAttribute("data-params")), l({
                        type: o || "GET",
                        url: s,
                        data: n,
                        dataType: r,
                        beforeSend: function(e, t) {
                            return u(i, "ajax:beforeSend", [e, t]) ? u(i, "ajax:send", [e]) : (u(i, "ajax:stopped"), !1)
                        },
                        success: function() {
                            var e;
                            return e = 1 <= arguments.length ? y.call(arguments, 0) : [], u(i, "ajax:success", e)
                        },
                        error: function() {
                            var e;
                            return e = 1 <= arguments.length ? y.call(arguments, 0) : [], u(i, "ajax:error", e)
                        },
                        complete: function() {
                            var e;
                            return e = 1 <= arguments.length ? y.call(arguments, 0) : [], u(i, "ajax:complete", e)
                        },
                        crossDomain: f(s),
                        withCredentials: null != a && "false" !== a
                    }), g(e)) : (u(i, "ajax:stopped"), !1))
                }, v.formSubmitButtonClick = function() {
                    var e, t;
                    if (t = (e = this).form) return e.name && m(t, "ujs:submit-button", {
                        name: e.name,
                        value: e.value
                    }), m(t, "ujs:formnovalidate-button", e.formNoValidate), m(t, "ujs:submit-button-formaction", e.getAttribute("formaction")), m(t, "ujs:submit-button-formmethod", e.getAttribute("formmethod"))
                }, v.handleMetaClick = function(e) {
                    var t, n, r;
                    if (r = ((n = this).getAttribute("data-method") || "GET").toUpperCase(), t = n.getAttribute("data-params"), (e.metaKey || e.ctrlKey) && "GET" === r && !t) return e.stopImmediatePropagation()
                }
            }.call(this),
            function() {
                var e, r, t, n, i, o, s, a, l, u, c, f, d, h;
                if (o = v.fire, t = v.delegate, a = v.getData, e = v.$, h = v.refreshCSRFTokens, r = v.CSRFProtection, i = v.enableElement, n = v.disableElement, u = v.handleDisabledElement, l = v.handleConfirm, d = v.handleRemote, s = v.formSubmitButtonClick, c = v.handleMetaClick, f = v.handleMethod, "undefined" != typeof jQuery && null !== jQuery && null != jQuery.ajax) {
                    if (jQuery.rails) throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
                    jQuery.rails = v, jQuery.ajaxPrefilter(function(e, t, n) {
                        if (!e.crossDomain) return r(n)
                    })
                }
                v.start = function() {
                    if (window._rails_loaded) throw new Error("rails-ujs has already been loaded!");
                    return window.addEventListener("pageshow", function() {
                        return e(v.formEnableSelector).forEach(function(e) {
                            if (a(e, "ujs:disabled")) return i(e)
                        }), e(v.linkDisableSelector).forEach(function(e) {
                            if (a(e, "ujs:disabled")) return i(e)
                        })
                    }), t(document, v.linkDisableSelector, "ajax:complete", i), t(document, v.linkDisableSelector, "ajax:stopped", i), t(document, v.buttonDisableSelector, "ajax:complete", i), t(document, v.buttonDisableSelector, "ajax:stopped", i), t(document, v.linkClickSelector, "click", u), t(document, v.linkClickSelector, "click", l), t(document, v.linkClickSelector, "click", c), t(document, v.linkClickSelector, "click", n), t(document, v.linkClickSelector, "click", d), t(document, v.linkClickSelector, "click", f), t(document, v.buttonClickSelector, "click", u), t(document, v.buttonClickSelector, "click", l), t(document, v.buttonClickSelector, "click", n), t(document, v.buttonClickSelector, "click", d), t(document, v.inputChangeSelector, "change", u), t(document, v.inputChangeSelector, "change", l), t(document, v.inputChangeSelector, "change", d), t(document, v.formSubmitSelector, "submit", u), t(document, v.formSubmitSelector, "submit", l), t(document, v.formSubmitSelector, "submit", d), t(document, v.formSubmitSelector, "submit", function(e) {
                        return setTimeout(function() {
                            return n(e)
                        }, 13)
                    }), t(document, v.formSubmitSelector, "ajax:send", n), t(document, v.formSubmitSelector, "ajax:complete", i), t(document, v.formInputClickSelector, "click", u), t(document, v.formInputClickSelector, "click", l), t(document, v.formInputClickSelector, "click", s), document.addEventListener("DOMContentLoaded", h), window._rails_loaded = !0
                }, window.Rails === v && o(document, "rails:attachBindings") && v.start()
            }.call(this)
    }).call(this), "object" == typeof module && module.exports ? module.exports = v : "function" == typeof define && define.amd && define(v)
}).call(this),
    function(e, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(S, e) {
        "use strict";

        function m(e, t, n) {
            var r, i = (t = t || se).createElement("script");
            if (i.text = e, n)
                for (r in _e) n[r] && (i[r] = n[r]);
            t.head.appendChild(i).parentNode.removeChild(i)
        }

        function g(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? de[he.call(e)] || "object" : typeof e
        }

        function a(e) {
            var t = !!e && "length" in e && e.length,
                n = g(e);
            return !ve(e) && !be(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
        }

        function u(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }

        function t(e, n, r) {
            return ve(n) ? Te.grep(e, function(e, t) {
                return !!n.call(e, t, e) !== r
            }) : n.nodeType ? Te.grep(e, function(e) {
                return e === n !== r
            }) : "string" != typeof n ? Te.grep(e, function(e) {
                return -1 < fe.call(n, e) !== r
            }) : Te.filter(n, e, r)
        }

        function n(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function c(e) {
            var n = {};
            return Te.each(e.match(je) || [], function(e, t) {
                n[t] = !0
            }), n
        }

        function f(e) {
            return e
        }

        function d(e) {
            throw e
        }

        function l(e, t, n, r) {
            var i;
            try {
                e && ve(i = e.promise) ? i.call(e).done(t).fail(n) : e && ve(i = e.then) ? i.call(e, t, n) : t.apply(undefined, [e].slice(r))
            } catch (e) {
                n.apply(undefined, [e])
            }
        }

        function r() {
            se.removeEventListener("DOMContentLoaded", r), S.removeEventListener("load", r), Te.ready()
        }

        function i(e, t) {
            return t.toUpperCase()
        }

        function h(e) {
            return e.replace(He, "ms-").replace(qe, i)
        }

        function o() {
            this.expando = Te.expando + o.uid++
        }

        function s(e) {
            return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Ue.test(e) ? JSON.parse(e) : e)
        }

        function p(e, t, n) {
            var r;
            if (n === undefined && 1 === e.nodeType)
                if (r = "data-" + t.replace(Be, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                    try {
                        n = s(n)
                    } catch (i) {}
                    Fe.set(e, t, n)
                } else n = undefined;
            return n
        }

        function y(e, t, n, r) {
            var i, o, s = 20,
                a = r ? function() {
                    return r.cur()
                } : function() {
                    return Te.css(e, t, "")
                },
                l = a(),
                u = n && n[3] || (Te.cssNumber[t] ? "" : "px"),
                c = (Te.cssNumber[t] || "px" !== u && +l) && Ge.exec(Te.css(e, t));
            if (c && c[3] !== u) {
                for (l /= 2, u = u || c[3], c = +l || 1; s--;) Te.style(e, t, c + u), (1 - o) * (1 - (o = a() / l || .5)) <= 0 && (s = 0), c /= o;
                c *= 2, Te.style(e, t, c + u), n = n || []
            }
            return n && (c = +c || +l || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = u, r.start = c, r.end = i)), i
        }

        function v(e) {
            var t, n = e.ownerDocument,
                r = e.nodeName,
                i = Xe[r];
            return i || (t = n.body.appendChild(n.createElement(r)), i = Te.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), Xe[r] = i)
        }

        function b(e, t) {
            for (var n, r, i = [], o = 0, s = e.length; o < s; o++)(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = We.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && Qe(r) && (i[o] = v(r))) : "none" !== n && (i[o] = "none", We.set(r, "display", n)));
            for (o = 0; o < s; o++) null != i[o] && (e[o].style.display = i[o]);
            return e
        }

        function _(e, t) {
            var n;
            return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], t === undefined || t && u(e, t) ? Te.merge([e], n) : n
        }

        function E(e, t) {
            for (var n = 0, r = e.length; n < r; n++) We.set(e[n], "globalEval", !t || We.get(t[n], "globalEval"))
        }

        function T(e, t, n, r, i) {
            for (var o, s, a, l, u, c, f = t.createDocumentFragment(), d = [], h = 0, p = e.length; h < p; h++)
                if ((o = e[h]) || 0 === o)
                    if ("object" === g(o)) Te.merge(d, o.nodeType ? [o] : o);
                    else if (nt.test(o)) {
                for (s = s || f.appendChild(t.createElement("div")), a = (Ye.exec(o) || ["", ""])[1].toLowerCase(), l = Ze[a] || Ze._default, s.innerHTML = l[1] + Te.htmlPrefilter(o) + l[2], c = l[0]; c--;) s = s.lastChild;
                Te.merge(d, s.childNodes), (s = f.firstChild).textContent = ""
            } else d.push(t.createTextNode(o));
            for (f.textContent = "", h = 0; o = d[h++];)
                if (r && -1 < Te.inArray(o, r)) i && i.push(o);
                else if (u = Te.contains(o.ownerDocument, o), s = _(f.appendChild(o), "script"), u && E(s), n)
                for (c = 0; o = s[c++];) Je.test(o.type || "") && n.push(o);
            return f
        }

        function w() {
            return !0
        }

        function C() {
            return !1
        }

        function A() {
            try {
                return se.activeElement
            } catch (e) {}
        }

        function x(e, t, n, r, i, o) {
            var s, a;
            if ("object" == typeof t) {
                for (a in "string" != typeof n && (r = r || n, n = undefined), t) x(e, a, n, r, t[a], o);
                return e
            }
            if (null == r && null == i ? (i = n, r = n = undefined) : null == i && ("string" == typeof n ? (i = r, r = undefined) : (i = r, r = n, n = undefined)), !1 === i) i = C;
            else if (!i) return e;
            return 1 === o && (s = i, (i = function(e) {
                return Te().off(e), s.apply(this, arguments)
            }).guid = s.guid || (s.guid = Te.guid++)), e.each(function() {
                Te.event.add(this, t, i, r, n)
            })
        }

        function D(e, t) {
            return u(e, "table") && u(11 !== t.nodeType ? t : t.firstChild, "tr") && Te(e).children("tbody")[0] || e
        }

        function O(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function I(e) {
            return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
        }

        function N(e, t) {
            var n, r, i, o, s, a, l, u;
            if (1 === t.nodeType) {
                if (We.hasData(e) && (o = We.access(e), s = We.set(t, o), u = o.events))
                    for (i in delete s.handle, s.events = {}, u)
                        for (n = 0, r = u[i].length; n < r; n++) Te.event.add(t, i, u[i][n]);
                Fe.hasData(e) && (a = Fe.access(e), l = Te.extend({}, a), Fe.set(t, l))
            }
        }

        function k(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && ze.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }

        function j(n, r, i, o) {
            r = ue.apply([], r);
            var e, t, s, a, l, u, c = 0,
                f = n.length,
                d = f - 1,
                h = r[0],
                p = ve(h);
            if (p || 1 < f && "string" == typeof h && !ye.checkClone && ut.test(h)) return n.each(function(e) {
                var t = n.eq(e);
                p && (r[0] = h.call(this, e, t.html())), j(t, r, i, o)
            });
            if (f && (t = (e = T(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
                for (a = (s = Te.map(_(e, "script"), O)).length; c < f; c++) l = e, c !== d && (l = Te.clone(l, !0, !0), a && Te.merge(s, _(l, "script"))), i.call(n[c], l, c);
                if (a)
                    for (u = s[s.length - 1].ownerDocument, Te.map(s, I), c = 0; c < a; c++) l = s[c], Je.test(l.type || "") && !We.access(l, "globalEval") && Te.contains(u, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? Te._evalUrl && Te._evalUrl(l.src) : m(l.textContent.replace(ct, ""), u, l))
            }
            return n
        }

        function L(e, t, n) {
            for (var r, i = t ? Te.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || Te.cleanData(_(r)), r.parentNode && (n && Te.contains(r.ownerDocument, r) && E(_(r, "script")), r.parentNode.removeChild(r));
            return e
        }

        function P(e, t, n) {
            var r, i, o, s, a = e.style;
            return (n = n || dt(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || Te.contains(e.ownerDocument, e) || (s = Te.style(e, t)), !ye.pixelBoxStyles() && ft.test(s) && ht.test(t) && (r = a.width, i = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = r, a.minWidth = i, a.maxWidth = o)), s !== undefined ? s + "" : s
        }

        function R(e, t) {
            return {
                get: function() {
                    if (!e()) return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }

        function H(e) {
            if (e in bt) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = vt.length; n--;)
                if ((e = vt[n] + t) in bt) return e
        }

        function q(e) {
            var t = Te.cssProps[e];
            return t || (t = Te.cssProps[e] = H(e) || e), t
        }

        function M(e, t, n) {
            var r = Ge.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
        }

        function W(e, t, n, r, i, o) {
            var s = "width" === t ? 1 : 0,
                a = 0,
                l = 0;
            if (n === (r ? "border" : "content")) return 0;
            for (; s < 4; s += 2) "margin" === n && (l += Te.css(e, n + Ke[s], !0, i)), r ? ("content" === n && (l -= Te.css(e, "padding" + Ke[s], !0, i)), "margin" !== n && (l -= Te.css(e, "border" + Ke[s] + "Width", !0, i))) : (l += Te.css(e, "padding" + Ke[s], !0, i), "padding" !== n ? l += Te.css(e, "border" + Ke[s] + "Width", !0, i) : a += Te.css(e, "border" + Ke[s] + "Width", !0, i));
            return !r && 0 <= o && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - l - a - .5))), l
        }

        function F(e, t, n) {
            var r = dt(e),
                i = P(e, t, r),
                o = "border-box" === Te.css(e, "boxSizing", !1, r),
                s = o;
            if (ft.test(i)) {
                if (!n) return i;
                i = "auto"
            }
            return s = s && (ye.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === Te.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], s = !0), (i = parseFloat(i) || 0) + W(e, t, n || (o ? "border" : "content"), s, r, i) + "px"
        }

        function U(e, t, n, r, i) {
            return new U.prototype.init(e, t, n, r, i)
        }

        function B() {
            Et && (!1 === se.hidden && S.requestAnimationFrame ? S.requestAnimationFrame(B) : S.setTimeout(B, Te.fx.interval), Te.fx.tick())
        }

        function V() {
            return S.setTimeout(function() {
                _t = undefined
            }), _t = Date.now()
        }

        function G(e, t) {
            var n, r = 0,
                i = {
                    height: e
                };
            for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = Ke[r])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function K(e, t, n) {
            for (var r, i = (X.tweeners[t] || []).concat(X.tweeners["*"]), o = 0, s = i.length; o < s; o++)
                if (r = i[o].call(n, t, e)) return r
        }

        function Q(e, t, n) {
            var r, i, o, s, a, l, u, c, f = "width" in t || "height" in t,
                d = this,
                h = {},
                p = e.style,
                m = e.nodeType && Qe(e),
                g = We.get(e, "fxshow");
            for (r in n.queue || (null == (s = Te._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || a()
                }), s.unqueued++, d.always(function() {
                    d.always(function() {
                        s.unqueued--, Te.queue(e, "fx").length || s.empty.fire()
                    })
                })), t)
                if (i = t[r], St.test(i)) {
                    if (delete t[r], o = o || "toggle" === i, i === (m ? "hide" : "show")) {
                        if ("show" !== i || !g || g[r] === undefined) continue;
                        m = !0
                    }
                    h[r] = g && g[r] || Te.style(e, r)
                } if ((l = !Te.isEmptyObject(t)) || !Te.isEmptyObject(h))
                for (r in f && 1 === e.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], null == (u = g && g.display) && (u = We.get(e, "display")), "none" === (c = Te.css(e, "display")) && (u ? c = u : (b([e], !0), u = e.style.display || u, c = Te.css(e, "display"), b([e]))), ("inline" === c || "inline-block" === c && null != u) && "none" === Te.css(e, "float") && (l || (d.done(function() {
                        p.display = u
                    }), null == u && (c = p.display, u = "none" === c ? "" : c)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", d.always(function() {
                        p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                    })), l = !1, h) l || (g ? "hidden" in g && (m = g.hidden) : g = We.access(e, "fxshow", {
                    display: u
                }), o && (g.hidden = !m), m && b([e], !0), d.done(function() {
                    for (r in m || b([e]), We.remove(e, "fxshow"), h) Te.style(e, r, h[r])
                })), l = K(m ? g[r] : 0, r, d), r in g || (g[r] = l.start, m && (l.end = l.start, l.start = 0))
        }

        function $(e, t) {
            var n, r, i, o, s;
            for (n in e)
                if (i = t[r = h(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (s = Te.cssHooks[r]) && "expand" in s)
                    for (n in o = s.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
                else t[r] = i
        }

        function X(o, e, t) {
            var n, s, r = 0,
                i = X.prefilters.length,
                a = Te.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (s) return !1;
                    for (var e = _t || V(), t = Math.max(0, u.startTime + u.duration - e), n = 1 - (t / u.duration || 0), r = 0, i = u.tweens.length; r < i; r++) u.tweens[r].run(n);
                    return a.notifyWith(o, [u, n, t]), n < 1 && i ? t : (i || a.notifyWith(o, [u, 1, 0]), a.resolveWith(o, [u]), !1)
                },
                u = a.promise({
                    elem: o,
                    props: Te.extend({}, e),
                    opts: Te.extend(!0, {
                        specialEasing: {},
                        easing: Te.easing._default
                    }, t),
                    originalProperties: e,
                    originalOptions: t,
                    startTime: _t || V(),
                    duration: t.duration,
                    tweens: [],
                    createTween: function(e, t) {
                        var n = Te.Tween(o, u.opts, e, t, u.opts.specialEasing[e] || u.opts.easing);
                        return u.tweens.push(n), n
                    },
                    stop: function(e) {
                        var t = 0,
                            n = e ? u.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; t < n; t++) u.tweens[t].run(1);
                        return e ? (a.notifyWith(o, [u, 1, 0]), a.resolveWith(o, [u, e])) : a.rejectWith(o, [u, e]), this
                    }
                }),
                c = u.props;
            for ($(c, u.opts.specialEasing); r < i; r++)
                if (n = X.prefilters[r].call(u, o, c, u.opts)) return ve(n.stop) && (Te._queueHooks(u.elem, u.opts.queue).stop = n.stop.bind(n)), n;
            return Te.map(c, K, u), ve(u.opts.start) && u.opts.start.call(o, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), Te.fx.timer(Te.extend(l, {
                elem: o,
                anim: u,
                queue: u.opts.queue
            })), u
        }

        function z(e) {
            return (e.match(je) || []).join(" ")
        }

        function Y(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }

        function J(e) {
            return Array.isArray(e) ? e : "string" == typeof e && e.match(je) || []
        }

        function Z(n, e, r, i) {
            var t;
            if (Array.isArray(e)) Te.each(e, function(e, t) {
                r || Rt.test(n) ? i(n, t) : Z(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
            });
            else if (r || "object" !== g(e)) i(n, e);
            else
                for (t in e) Z(n + "[" + t + "]", e[t], r, i)
        }

        function ee(o) {
            return function(e, t) {
                "string" != typeof e && (t = e, e = "*");
                var n, r = 0,
                    i = e.toLowerCase().match(je) || [];
                if (ve(t))
                    for (; n = i[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
            }
        }

        function te(t, i, o, s) {
            function a(e) {
                var r;
                return l[e] = !0, Te.each(t[e] || [], function(e, t) {
                    var n = t(i, o, s);
                    return "string" != typeof n || u || l[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), a(n), !1)
                }), r
            }
            var l = {},
                u = t === $t;
            return a(i.dataTypes[0]) || !l["*"] && a("*")
        }

        function ne(e, t) {
            var n, r, i = Te.ajaxSettings.flatOptions || {};
            for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && Te.extend(!0, e, r), e
        }

        function re(e, t, n) {
            for (var r, i, o, s, a = e.contents, l = e.dataTypes;
                "*" === l[0];) l.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
            if (r)
                for (i in a)
                    if (a[i] && a[i].test(r)) {
                        l.unshift(i);
                        break
                    } if (l[0] in n) o = l[0];
            else {
                for (i in n) {
                    if (!l[0] || e.converters[i + " " + l[0]]) {
                        o = i;
                        break
                    }
                    s || (s = i)
                }
                o = o || s
            }
            if (o) return o !== l[0] && l.unshift(o), n[o]
        }

        function ie(e, t, n, r) {
            var i, o, s, a, l, u = {},
                c = e.dataTypes.slice();
            if (c[1])
                for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
            for (o = c.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                if (!(s = u[l + " " + o] || u["* " + o]))
                    for (i in u)
                        if ((a = i.split(" "))[1] === o && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                            !0 === s ? s = u[i] : !0 !== u[i] && (o = a[0], c.unshift(a[1]));
                            break
                        } if (!0 !== s)
                    if (s && e["throws"]) t = s(t);
                    else try {
                        t = s(t)
                    } catch (f) {
                        return {
                            state: "parsererror",
                            error: s ? f : "No conversion from " + l + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }
        var oe = [],
            se = S.document,
            ae = Object.getPrototypeOf,
            le = oe.slice,
            ue = oe.concat,
            ce = oe.push,
            fe = oe.indexOf,
            de = {},
            he = de.toString,
            pe = de.hasOwnProperty,
            me = pe.toString,
            ge = me.call(Object),
            ye = {},
            ve = function ve(e) {
                return "function" == typeof e && "number" != typeof e.nodeType
            },
            be = function be(e) {
                return null != e && e === e.window
            },
            _e = {
                type: !0,
                src: !0,
                noModule: !0
            },
            Ee = "3.3.1",
            Te = function(e, t) {
                return new Te.fn.init(e, t)
            },
            we = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        Te.fn = Te.prototype = {
            jquery: Ee,
            constructor: Te,
            length: 0,
            toArray: function() {
                return le.call(this)
            },
            get: function(e) {
                return null == e ? le.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = Te.merge(this.constructor(), e);
                return t.prevObject = this, t
            },
            each: function(e) {
                return Te.each(this, e)
            },
            map: function(n) {
                return this.pushStack(Te.map(this, function(e, t) {
                    return n.call(e, t, e)
                }))
            },
            slice: function() {
                return this.pushStack(le.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(0 <= n && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ce,
            sort: oe.sort,
            splice: oe.splice
        }, Te.extend = Te.fn.extend = function(e) {
            var t, n, r, i, o, s, a = e || {},
                l = 1,
                u = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[l] || {}, l++), "object" == typeof a || ve(a) || (a = {}), l === u && (a = this, l--); l < u; l++)
                if (null != (t = arguments[l]))
                    for (n in t) r = a[n], a !== (i = t[n]) && (c && i && (Te.isPlainObject(i) || (o = Array.isArray(i))) ? (o ? (o = !1, s = r && Array.isArray(r) ? r : []) : s = r && Te.isPlainObject(r) ? r : {}, a[n] = Te.extend(c, s, i)) : i !== undefined && (a[n] = i));
            return a
        }, Te.extend({
            expando: "jQuery" + (Ee + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isPlainObject: function(e) {
                var t, n;
                return !(!e || "[object Object]" !== he.call(e)) && (!(t = ae(e)) || "function" == typeof(n = pe.call(t, "constructor") && t.constructor) && me.call(n) === ge)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            globalEval: function(e) {
                m(e)
            },
            each: function(e, t) {
                var n, r = 0;
                if (a(e))
                    for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
                else
                    for (r in e)
                        if (!1 === t.call(e[r], r, e[r])) break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(we, "")
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (a(Object(e)) ? Te.merge(n, "string" == typeof e ? [e] : e) : ce.call(n, e)), n
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : fe.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
                return e.length = i, e
            },
            grep: function(e, t, n) {
                for (var r = [], i = 0, o = e.length, s = !n; i < o; i++) !t(e[i], i) !== s && r.push(e[i]);
                return r
            },
            map: function(e, t, n) {
                var r, i, o = 0,
                    s = [];
                if (a(e))
                    for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && s.push(i);
                else
                    for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
                return ue.apply([], s)
            },
            guid: 1,
            support: ye
        }), "function" == typeof Symbol && (Te.fn[Symbol.iterator] = oe[Symbol.iterator]), Te.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            de["[object " + t + "]"] = t.toLowerCase()
        });
        var Se = function(n) {
            function _(e, t, n, r) {
                var i, o, s, a, l, u, c, f = t && t.ownerDocument,
                    d = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== d && 9 !== d && 11 !== d) return n;
                if (!r && ((t ? t.ownerDocument || t : F) !== j && k(t), t = t || j, P)) {
                    if (11 !== d && (l = ye.exec(e)))
                        if (i = l[1]) {
                            if (9 === d) {
                                if (!(s = t.getElementById(i))) return n;
                                if (s.id === i) return n.push(s), n
                            } else if (f && (s = f.getElementById(i)) && M(t, s) && s.id === i) return n.push(s), n
                        } else {
                            if (l[2]) return J.apply(n, t.getElementsByTagName(e)), n;
                            if ((i = l[3]) && T.getElementsByClassName && t.getElementsByClassName) return J.apply(n, t.getElementsByClassName(i)), n
                        } if (T.qsa && !K[e + " "] && (!R || !R.test(e))) {
                        if (1 !== d) f = t, c = e;
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((a = t.getAttribute("id")) ? a = a.replace(Ee, Te) : t.setAttribute("id", a = W), o = (u = A(e)).length; o--;) u[o] = "#" + a + " " + m(u[o]);
                            c = u.join(","), f = ve.test(e) && p(t.parentNode) || t
                        }
                        if (c) try {
                            return J.apply(n, f.querySelectorAll(c)), n
                        } catch (h) {} finally {
                            a === W && t.removeAttribute("id")
                        }
                    }
                }
                return D(e.replace(ae, "$1"), t, n, r)
            }

            function e() {
                function n(e, t) {
                    return r.push(e + " ") > w.cacheLength && delete n[r.shift()], n[e + " "] = t
                }
                var r = [];
                return n
            }

            function l(e) {
                return e[W] = !0, e
            }

            function i(e) {
                var t = j.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function t(e, t) {
                for (var n = e.split("|"), r = n.length; r--;) w.attrHandle[n[r]] = t
            }

            function u(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (r) return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function r(t) {
                return function(e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }

            function o(n) {
                return function(e) {
                    var t = e.nodeName.toLowerCase();
                    return ("input" === t || "button" === t) && e.type === n
                }
            }

            function s(t) {
                return function(e) {
                    return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && Se(e) === t : e.disabled === t : "label" in e && e.disabled === t
                }
            }

            function a(s) {
                return l(function(o) {
                    return o = +o, l(function(e, t) {
                        for (var n, r = s([], e.length, o), i = r.length; i--;) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                    })
                })
            }

            function p(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function c() {}

            function m(e) {
                for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
                return r
            }

            function f(a, e, t) {
                var l = e.dir,
                    u = e.next,
                    c = u || l,
                    f = t && "parentNode" === c,
                    d = B++;
                return e.first ? function(e, t, n) {
                    for (; e = e[l];)
                        if (1 === e.nodeType || f) return a(e, t, n);
                    return !1
                } : function(e, t, n) {
                    var r, i, o, s = [U, d];
                    if (n) {
                        for (; e = e[l];)
                            if ((1 === e.nodeType || f) && a(e, t, n)) return !0
                    } else
                        for (; e = e[l];)
                            if (1 === e.nodeType || f)
                                if (i = (o = e[W] || (e[W] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), u && u === e.nodeName.toLowerCase()) e = e[l] || e;
                                else {
                                    if ((r = i[c]) && r[0] === U && r[1] === d) return s[2] = r[2];
                                    if ((i[c] = s)[2] = a(e, t, n)) return !0
                                } return !1
                }
            }

            function d(i) {
                return 1 < i.length ? function(e, t, n) {
                    for (var r = i.length; r--;)
                        if (!i[r](e, t, n)) return !1;
                    return !0
                } : i[0]
            }

            function v(e, t, n) {
                for (var r = 0, i = t.length; r < i; r++) _(e, t[r], n);
                return n
            }

            function E(e, t, n, r, i) {
                for (var o, s = [], a = 0, l = e.length, u = null != t; a < l; a++)(o = e[a]) && (n && !n(o, r, i) || (s.push(o), u && t.push(a)));
                return s
            }

            function b(h, p, m, g, y, e) {
                return g && !g[W] && (g = b(g)), y && !y[W] && (y = b(y, e)), l(function(e, t, n, r) {
                    var i, o, s, a = [],
                        l = [],
                        u = t.length,
                        c = e || v(p || "*", n.nodeType ? [n] : n, []),
                        f = !h || !e && p ? c : E(c, a, h, n, r),
                        d = m ? y || (e ? h : u || g) ? [] : t : f;
                    if (m && m(f, d, n, r), g)
                        for (i = E(d, l), g(i, [], n, r), o = i.length; o--;)(s = i[o]) && (d[l[o]] = !(f[l[o]] = s));
                    if (e) {
                        if (y || h) {
                            if (y) {
                                for (i = [], o = d.length; o--;)(s = d[o]) && i.push(f[o] = s);
                                y(null, d = [], i, r)
                            }
                            for (o = d.length; o--;)(s = d[o]) && -1 < (i = y ? ee(e, s) : a[o]) && (e[i] = !(t[i] = s))
                        }
                    } else d = E(d === t ? d.splice(u, d.length) : d), y ? y(null, t, d, r) : J.apply(t, d)
                })
            }

            function h(e) {
                for (var i, t, n, r = e.length, o = w.relative[e[0].type], s = o || w.relative[" "], a = o ? 1 : 0, l = f(function(e) {
                        return e === i
                    }, s, !0), u = f(function(e) {
                        return -1 < ee(i, e)
                    }, s, !0), c = [function(e, t, n) {
                        var r = !o && (n || t !== O) || ((i = t).nodeType ? l(e, t, n) : u(e, t, n));
                        return i = null, r
                    }]; a < r; a++)
                    if (t = w.relative[e[a].type]) c = [f(d(c), t)];
                    else {
                        if ((t = w.filter[e[a].type].apply(null, e[a].matches))[W]) {
                            for (n = ++a; n < r && !w.relative[e[n].type]; n++);
                            return b(1 < a && d(c), 1 < a && m(e.slice(0, a - 1).concat({
                                value: " " === e[a - 2].type ? "*" : ""
                            })).replace(ae, "$1"), t, a < n && h(e.slice(a, n)), n < r && h(e = e.slice(n)), n < r && m(e))
                        }
                        c.push(t)
                    } return d(c)
            }

            function g(g, y) {
                var v = 0 < y.length,
                    b = 0 < g.length,
                    e = function(e, t, n, r, i) {
                        var o, s, a, l = 0,
                            u = "0",
                            c = e && [],
                            f = [],
                            d = O,
                            h = e || b && w.find.TAG("*", i),
                            p = U += null == d ? 1 : Math.random() || .1,
                            m = h.length;
                        for (i && (O = t === j || t || i); u !== m && null != (o = h[u]); u++) {
                            if (b && o) {
                                for (s = 0, t || o.ownerDocument === j || (k(o), n = !P); a = g[s++];)
                                    if (a(o, t || j, n)) {
                                        r.push(o);
                                        break
                                    } i && (U = p)
                            }
                            v && ((o = !a && o) && l--, e && c.push(o))
                        }
                        if (l += u, v && u !== l) {
                            for (s = 0; a = y[s++];) a(c, f, t, n);
                            if (e) {
                                if (0 < l)
                                    for (; u--;) c[u] || f[u] || (f[u] = z.call(r));
                                f = E(f)
                            }
                            J.apply(r, f), i && !e && 0 < f.length && 1 < l + y.length && _.uniqueSort(r)
                        }
                        return i && (U = p, O = d), c
                    };
                return v ? l(e) : e
            }
            var y, T, w, S, C, A, x, D, O, I, N, k, j, L, P, R, H, q, M, W = "sizzle" + 1 * new Date,
                F = n.document,
                U = 0,
                B = 0,
                V = e(),
                G = e(),
                K = e(),
                Q = function(e, t) {
                    return e === t && (N = !0), 0
                },
                $ = {}.hasOwnProperty,
                X = [],
                z = X.pop,
                Y = X.push,
                J = X.push,
                Z = X.slice,
                ee = function(e, t) {
                    for (var n = 0, r = e.length; n < r; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
                oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
                se = new RegExp(ne + "+", "g"),
                ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                le = new RegExp("^" + ne + "*," + ne + "*"),
                ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                fe = new RegExp(oe),
                de = new RegExp("^" + re + "$"),
                he = {
                    ID: new RegExp("^#(" + re + ")"),
                    CLASS: new RegExp("^\\.(" + re + ")"),
                    TAG: new RegExp("^(" + re + "|[*])"),
                    ATTR: new RegExp("^" + ie),
                    PSEUDO: new RegExp("^" + oe),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                pe = /^(?:input|select|textarea|button)$/i,
                me = /^h\d$/i,
                ge = /^[^{]+\{\s*\[native \w/,
                ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ve = /[+~]/,
                be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                _e = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                },
                Ee = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                Te = function(e, t) {
                    return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
                },
                we = function() {
                    k()
                },
                Se = f(function(e) {
                    return !0 === e.disabled && ("form" in e || "label" in e)
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                J.apply(X = Z.call(F.childNodes), F.childNodes), X[F.childNodes.length].nodeType
            } catch (Ce) {
                J = {
                    apply: X.length ? function(e, t) {
                        Y.apply(e, Z.call(t))
                    } : function(e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++];);
                        e.length = n - 1
                    }
                }
            }
            for (y in T = _.support = {}, C = _.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }, k = _.setDocument = function(e) {
                    var t, n, r = e ? e.ownerDocument || e : F;
                    return r !== j && 9 === r.nodeType && r.documentElement && (L = (j = r).documentElement, P = !C(j), F !== j && (n = j.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", we, !1) : n.attachEvent && n.attachEvent("onunload", we)), T.attributes = i(function(e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), T.getElementsByTagName = i(function(e) {
                        return e.appendChild(j.createComment("")), !e.getElementsByTagName("*").length
                    }), T.getElementsByClassName = ge.test(j.getElementsByClassName), T.getById = i(function(e) {
                        return L.appendChild(e).id = W, !j.getElementsByName || !j.getElementsByName(W).length
                    }), T.getById ? (w.filter.ID = function(e) {
                        var t = e.replace(be, _e);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }, w.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && P) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }) : (w.filter.ID = function(e) {
                        var n = e.replace(be, _e);
                        return function(e) {
                            var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return t && t.value === n
                        }
                    }, w.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && P) {
                            var n, r, i, o = t.getElementById(e);
                            if (o) {
                                if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                                for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                                    if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                            }
                            return []
                        }
                    }), w.find.TAG = T.getElementsByTagName ? function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : T.qsa ? t.querySelectorAll(e) : void 0
                    } : function(e, t) {
                        var n, r = [],
                            i = 0,
                            o = t.getElementsByTagName(e);
                        if ("*" !== e) return o;
                        for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                        return r
                    }, w.find.CLASS = T.getElementsByClassName && function(e, t) {
                        if ("undefined" != typeof t.getElementsByClassName && P) return t.getElementsByClassName(e)
                    }, H = [], R = [], (T.qsa = ge.test(j.querySelectorAll)) && (i(function(e) {
                        L.appendChild(e).innerHTML = "<a id='" + W + "'></a><select id='" + W + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || R.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + W + "-]").length || R.push("~="), e.querySelectorAll(":checked").length || R.push(":checked"), e.querySelectorAll("a#" + W + "+*").length || R.push(".#.+[+~]")
                    }), i(function(e) {
                        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var t = j.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && R.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && R.push(":enabled", ":disabled"), L.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && R.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), R.push(",.*:")
                    })), (T.matchesSelector = ge.test(q = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function(e) {
                        T.disconnectedMatch = q.call(e, "*"), q.call(e, "[s!='']:x"), H.push("!=", oe)
                    }), R = R.length && new RegExp(R.join("|")), H = H.length && new RegExp(H.join("|")), t = ge.test(L.compareDocumentPosition), M = t || ge.test(L.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    } : function(e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, Q = t ? function(e, t) {
                        if (e === t) return N = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !T.sortDetached && t.compareDocumentPosition(e) === n ? e === j || e.ownerDocument === F && M(F, e) ? -1 : t === j || t.ownerDocument === F && M(F, t) ? 1 : I ? ee(I, e) - ee(I, t) : 0 : 4 & n ? -1 : 1)
                    } : function(e, t) {
                        if (e === t) return N = !0, 0;
                        var n, r = 0,
                            i = e.parentNode,
                            o = t.parentNode,
                            s = [e],
                            a = [t];
                        if (!i || !o) return e === j ? -1 : t === j ? 1 : i ? -1 : o ? 1 : I ? ee(I, e) - ee(I, t) : 0;
                        if (i === o) return u(e, t);
                        for (n = e; n = n.parentNode;) s.unshift(n);
                        for (n = t; n = n.parentNode;) a.unshift(n);
                        for (; s[r] === a[r];) r++;
                        return r ? u(s[r], a[r]) : s[r] === F ? -1 : a[r] === F ? 1 : 0
                    }), j
                }, _.matches = function(e, t) {
                    return _(e, null, null, t)
                }, _.matchesSelector = function(e, t) {
                    if ((e.ownerDocument || e) !== j && k(e), t = t.replace(ce, "='$1']"), T.matchesSelector && P && !K[t + " "] && (!H || !H.test(t)) && (!R || !R.test(t))) try {
                        var n = q.call(e, t);
                        if (n || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                    } catch (Ce) {}
                    return 0 < _(t, j, null, [e]).length
                }, _.contains = function(e, t) {
                    return (e.ownerDocument || e) !== j && k(e), M(e, t)
                }, _.attr = function(e, t) {
                    (e.ownerDocument || e) !== j && k(e);
                    var n = w.attrHandle[t.toLowerCase()],
                        r = n && $.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !P) : undefined;
                    return r !== undefined ? r : T.attributes || !P ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }, _.escape = function(e) {
                    return (e + "").replace(Ee, Te)
                }, _.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, _.uniqueSort = function(e) {
                    var t, n = [],
                        r = 0,
                        i = 0;
                    if (N = !T.detectDuplicates, I = !T.sortStable && e.slice(0), e.sort(Q), N) {
                        for (; t = e[i++];) t === e[i] && (r = n.push(i));
                        for (; r--;) e.splice(n[r], 1)
                    }
                    return I = null, e
                }, S = _.getText = function(e) {
                    var t, n = "",
                        r = 0,
                        i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += S(e)
                        } else if (3 === i || 4 === i) return e.nodeValue
                    } else
                        for (; t = e[r++];) n += S(t);
                    return n
                }, (w = _.selectors = {
                    cacheLength: 50,
                    createPseudo: l,
                    match: he,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(be, _e), e[3] = (e[3] || e[4] || e[5] || "").replace(be, _e), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || _.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && _.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = A(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(be, _e).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = V[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && V(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(n, r, i) {
                            return function(e) {
                                var t = _.attr(e, n);
                                return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(se, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                            }
                        },
                        CHILD: function(p, e, t, m, g) {
                            var y = "nth" !== p.slice(0, 3),
                                v = "last" !== p.slice(-4),
                                b = "of-type" === e;
                            return 1 === m && 0 === g ? function(e) {
                                return !!e.parentNode
                            } : function(e, t, n) {
                                var r, i, o, s, a, l, u = y !== v ? "nextSibling" : "previousSibling",
                                    c = e.parentNode,
                                    f = b && e.nodeName.toLowerCase(),
                                    d = !n && !b,
                                    h = !1;
                                if (c) {
                                    if (y) {
                                        for (; u;) {
                                            for (s = e; s = s[u];)
                                                if (b ? s.nodeName.toLowerCase() === f : 1 === s.nodeType) return !1;
                                            l = u = "only" === p && !l && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (l = [v ? c.firstChild : c.lastChild], v && d) {
                                        for (h = (a = (r = (i = (o = (s = c)[W] || (s[W] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[p] || [])[0] === U && r[1]) && r[2], s = a && c.childNodes[a]; s = ++a && s && s[u] || (h = a = 0) || l.pop();)
                                            if (1 === s.nodeType && ++h && s === e) {
                                                i[p] = [U, a, h];
                                                break
                                            }
                                    } else if (d && (h = a = (r = (i = (o = (s = e)[W] || (s[W] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[p] || [])[0] === U && r[1]), !1 === h)
                                        for (;
                                            (s = ++a && s && s[u] || (h = a = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== f : 1 !== s.nodeType) || !++h || (d && ((i = (o = s[W] || (s[W] = {}))[s.uniqueID] || (o[s.uniqueID] = {}))[p] = [U, h]), s !== e)););
                                    return (h -= g) === m || h % m == 0 && 0 <= h / m
                                }
                            }
                        },
                        PSEUDO: function(e, o) {
                            var t, s = w.pseudos[e] || w.setFilters[e.toLowerCase()] || _.error("unsupported pseudo: " + e);
                            return s[W] ? s(o) : 1 < s.length ? (t = [e, e, "", o], w.setFilters.hasOwnProperty(e.toLowerCase()) ? l(function(e, t) {
                                for (var n, r = s(e, o), i = r.length; i--;) e[n = ee(e, r[i])] = !(t[n] = r[i])
                            }) : function(e) {
                                return s(e, 0, t)
                            }) : s
                        }
                    },
                    pseudos: {
                        not: l(function(e) {
                            var r = [],
                                i = [],
                                a = x(e.replace(ae, "$1"));
                            return a[W] ? l(function(e, t, n, r) {
                                for (var i, o = a(e, null, r, []), s = e.length; s--;)(i = o[s]) && (e[s] = !(t[s] = i))
                            }) : function(e, t, n) {
                                return r[0] = e, a(r, null, n, i), r[0] = null, !i.pop()
                            }
                        }),
                        has: l(function(t) {
                            return function(e) {
                                return 0 < _(t, e).length
                            }
                        }),
                        contains: l(function(t) {
                            return t = t.replace(be, _e),
                                function(e) {
                                    return -1 < (e.textContent || e.innerText || S(e)).indexOf(t)
                                }
                        }),
                        lang: l(function(n) {
                            return de.test(n || "") || _.error("unsupported lang: " + n), n = n.replace(be, _e).toLowerCase(),
                                function(e) {
                                    var t;
                                    do {
                                        if (t = P ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                    } while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function(e) {
                            var t = n.location && n.location.hash;
                            return t && t.slice(1) === e.id
                        },
                        root: function(e) {
                            return e === L
                        },
                        focus: function(e) {
                            return e === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: s(!1),
                        disabled: s(!0),
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !w.pseudos.empty(e)
                        },
                        header: function(e) {
                            return me.test(e.nodeName)
                        },
                        input: function(e) {
                            return pe.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: a(function() {
                            return [0]
                        }),
                        last: a(function(e, t) {
                            return [t - 1]
                        }),
                        eq: a(function(e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: a(function(e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e
                        }),
                        odd: a(function(e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e
                        }),
                        lt: a(function(e, t, n) {
                            for (var r = n < 0 ? n + t : n; 0 <= --r;) e.push(r);
                            return e
                        }),
                        gt: a(function(e, t, n) {
                            for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                            return e
                        })
                    }
                }).pseudos.nth = w.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) w.pseudos[y] = r(y);
            for (y in {
                    submit: !0,
                    reset: !0
                }) w.pseudos[y] = o(y);
            return c.prototype = w.filters = w.pseudos, w.setFilters = new c, A = _.tokenize = function(e, t) {
                var n, r, i, o, s, a, l, u = G[e + " "];
                if (u) return t ? 0 : u.slice(0);
                for (s = e, a = [], l = w.preFilter; s;) {
                    for (o in n && !(r = le.exec(s)) || (r && (s = s.slice(r[0].length) || s), a.push(i = [])), n = !1, (r = ue.exec(s)) && (n = r.shift(), i.push({
                            value: n,
                            type: r[0].replace(ae, " ")
                        }), s = s.slice(n.length)), w.filter) !(r = he[o].exec(s)) || l[o] && !(r = l[o](r)) || (n = r.shift(), i.push({
                        value: n,
                        type: o,
                        matches: r
                    }), s = s.slice(n.length));
                    if (!n) break
                }
                return t ? s.length : s ? _.error(e) : G(e, a).slice(0)
            }, x = _.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    o = K[e + " "];
                if (!o) {
                    for (t || (t = A(e)), n = t.length; n--;)(o = h(t[n]))[W] ? r.push(o) : i.push(o);
                    (o = K(e, g(i, r))).selector = e
                }
                return o
            }, D = _.select = function(e, t, n, r) {
                var i, o, s, a, l, u = "function" == typeof e && e,
                    c = !r && A(e = u.selector || e);
                if (n = n || [], 1 === c.length) {
                    if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (s = o[0]).type && 9 === t.nodeType && P && w.relative[o[1].type]) {
                        if (!(t = (w.find.ID(s.matches[0].replace(be, _e), t) || [])[0])) return n;
                        u && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (i = he.needsContext.test(e) ? 0 : o.length; i-- && (s = o[i], !w.relative[a = s.type]);)
                        if ((l = w.find[a]) && (r = l(s.matches[0].replace(be, _e), ve.test(o[0].type) && p(t.parentNode) || t))) {
                            if (o.splice(i, 1), !(e = r.length && m(o))) return J.apply(n, r), n;
                            break
                        }
                }
                return (u || x(e, c))(r, t, !P, n, !t || ve.test(e) && p(t.parentNode) || t), n
            }, T.sortStable = W.split("").sort(Q).join("") === W, T.detectDuplicates = !!N, k(), T.sortDetached = i(function(e) {
                return 1 & e.compareDocumentPosition(j.createElement("fieldset"))
            }), i(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || t("type|href|height|width", function(e, t, n) {
                if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), T.attributes && i(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || t("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
            }), i(function(e) {
                return null == e.getAttribute("disabled")
            }) || t(te, function(e, t, n) {
                var r;
                if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }), _
        }(S);
        Te.find = Se, Te.expr = Se.selectors, Te.expr[":"] = Te.expr.pseudos, Te.uniqueSort = Te.unique = Se.uniqueSort, Te.text = Se.getText, Te.isXMLDoc = Se.isXML, Te.contains = Se.contains, Te.escapeSelector = Se.escape;
        var Ce = function(e, t, n) {
                for (var r = [], i = n !== undefined;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (i && Te(e).is(n)) break;
                        r.push(e)
                    } return r
            },
            Ae = function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            },
            xe = Te.expr.match.needsContext,
            De = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        Te.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? Te.find.matchesSelector(r, e) ? [r] : [] : Te.find.matches(e, Te.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, Te.fn.extend({
            find: function(e) {
                var t, n, r = this.length,
                    i = this;
                if ("string" != typeof e) return this.pushStack(Te(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (Te.contains(i[t], this)) return !0
                }));
                for (n = this.pushStack([]), t = 0; t < r; t++) Te.find(e, i[t], n);
                return 1 < r ? Te.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(t(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(t(this, e || [], !0))
            },
            is: function(e) {
                return !!t(this, "string" == typeof e && xe.test(e) ? Te(e) : e || [], !1).length
            }
        });
        var Oe, Ie = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (Te.fn.init = function(e, t, n) {
            var r, i;
            if (!e) return this;
            if (n = n || Oe, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : ve(e) ? n.ready !== undefined ? n.ready(e) : e(Te) : Te.makeArray(e, this);
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : Ie.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof Te ? t[0] : t, Te.merge(this, Te.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : se, !0)), De.test(r[1]) && Te.isPlainObject(t))
                    for (r in t) ve(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = se.getElementById(r[2])) && (this[0] = i, this.length = 1), this
        }).prototype = Te.fn, Oe = Te(se);
        var Ne = /^(?:parents|prev(?:Until|All))/,
            ke = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        Te.fn.extend({
            has: function(e) {
                var t = Te(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (Te.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                var n, r = 0,
                    i = this.length,
                    o = [],
                    s = "string" != typeof e && Te(e);
                if (!xe.test(e))
                    for (; r < i; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && Te.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            } return this.pushStack(1 < o.length ? Te.uniqueSort(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? fe.call(Te(e), this[0]) : fe.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(Te.uniqueSort(Te.merge(this.get(), Te(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), Te.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return Ce(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return Ce(e, "parentNode", n)
            },
            next: function(e) {
                return n(e, "nextSibling")
            },
            prev: function(e) {
                return n(e, "previousSibling")
            },
            nextAll: function(e) {
                return Ce(e, "nextSibling")
            },
            prevAll: function(e) {
                return Ce(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return Ce(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return Ce(e, "previousSibling", n)
            },
            siblings: function(e) {
                return Ae((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return Ae(e.firstChild)
            },
            contents: function(e) {
                return u(e, "iframe") ? e.contentDocument : (u(e, "template") && (e = e.content || e), Te.merge([], e.childNodes))
            }
        }, function(r, i) {
            Te.fn[r] = function(e, t) {
                var n = Te.map(this, i, e);
                return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = Te.filter(t, n)), 1 < this.length && (ke[r] || Te.uniqueSort(n), Ne.test(r) && n.reverse()), this.pushStack(n)
            }
        });
        var je = /[^\x20\t\r\n\f]+/g;
        Te.Callbacks = function(r) {
            r = "string" == typeof r ? c(r) : Te.extend({}, r);
            var i, e, t, n, o = [],
                s = [],
                a = -1,
                l = function() {
                    for (n = n || r.once, t = i = !0; s.length; a = -1)
                        for (e = s.shift(); ++a < o.length;) !1 === o[a].apply(e[0], e[1]) && r.stopOnFalse && (a = o.length, e = !1);
                    r.memory || (e = !1), i = !1, n && (o = e ? [] : "")
                },
                u = {
                    add: function() {
                        return o && (e && !i && (a = o.length - 1, s.push(e)), function n(e) {
                            Te.each(e, function(e, t) {
                                ve(t) ? r.unique && u.has(t) || o.push(t) : t && t.length && "string" !== g(t) && n(t)
                            })
                        }(arguments), e && !i && l()), this
                    },
                    remove: function() {
                        return Te.each(arguments, function(e, t) {
                            for (var n; - 1 < (n = Te.inArray(t, o, n));) o.splice(n, 1), n <= a && a--
                        }), this
                    },
                    has: function(e) {
                        return e ? -1 < Te.inArray(e, o) : 0 < o.length
                    },
                    empty: function() {
                        return o && (o = []), this
                    },
                    disable: function() {
                        return n = s = [], o = e = "", this
                    },
                    disabled: function() {
                        return !o
                    },
                    lock: function() {
                        return n = s = [], e || i || (o = e = ""), this
                    },
                    locked: function() {
                        return !!n
                    },
                    fireWith: function(e, t) {
                        return n || (t = [e, (t = t || []).slice ? t.slice() : t], s.push(t), i || l()), this
                    },
                    fire: function() {
                        return u.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!t
                    }
                };
            return u
        }, Te.extend({
            Deferred: function(e) {
                var o = [
                        ["notify", "progress", Te.Callbacks("memory"), Te.Callbacks("memory"), 2],
                        ["resolve", "done", Te.Callbacks("once memory"), Te.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", Te.Callbacks("once memory"), Te.Callbacks("once memory"), 1, "rejected"]
                    ],
                    i = "pending",
                    s = {
                        state: function() {
                            return i
                        },
                        always: function() {
                            return a.done(arguments).fail(arguments), this
                        },
                        "catch": function(e) {
                            return s.then(null, e)
                        },
                        pipe: function() {
                            var i = arguments;
                            return Te.Deferred(function(r) {
                                Te.each(o, function(e, t) {
                                    var n = ve(i[t[4]]) && i[t[4]];
                                    a[t[1]](function() {
                                        var e = n && n.apply(this, arguments);
                                        e && ve(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                                    })
                                }), i = null
                            }).promise()
                        },
                        then: function(t, n, r) {
                            function u(o, s, a, l) {
                                return function() {
                                    var n = this,
                                        r = arguments,
                                        t = function() {
                                            var e, t;
                                            if (!(o < c)) {
                                                if ((e = a.apply(n, r)) === s.promise()) throw new TypeError("Thenable self-resolution");
                                                t = e && ("object" == typeof e || "function" == typeof e) && e.then, ve(t) ? l ? t.call(e, u(c, s, f, l), u(c, s, d, l)) : (c++, t.call(e, u(c, s, f, l), u(c, s, d, l), u(c, s, f, s.notifyWith))) : (a !== f && (n = undefined, r = [e]), (l || s.resolveWith)(n, r))
                                            }
                                        },
                                        i = l ? t : function() {
                                            try {
                                                t()
                                            } catch (e) {
                                                Te.Deferred.exceptionHook && Te.Deferred.exceptionHook(e, i.stackTrace), c <= o + 1 && (a !== d && (n = undefined, r = [e]), s.rejectWith(n, r))
                                            }
                                        };
                                    o ? i() : (Te.Deferred.getStackHook && (i.stackTrace = Te.Deferred.getStackHook()), S.setTimeout(i))
                                }
                            }
                            var c = 0;
                            return Te.Deferred(function(e) {
                                o[0][3].add(u(0, e, ve(r) ? r : f, e.notifyWith)), o[1][3].add(u(0, e, ve(t) ? t : f)), o[2][3].add(u(0, e, ve(n) ? n : d))
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? Te.extend(e, s) : s
                        }
                    },
                    a = {};
                return Te.each(o, function(e, t) {
                    var n = t[2],
                        r = t[5];
                    s[t[1]] = n.add, r && n.add(function() {
                        i = r
                    }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), a[t[0]] = function() {
                        return a[t[0] + "With"](this === a ? undefined : this, arguments), this
                    }, a[t[0] + "With"] = n.fireWith
                }), s.promise(a), e && e.call(a, a), a
            },
            when: function(e) {
                var n = arguments.length,
                    t = n,
                    r = Array(t),
                    i = le.call(arguments),
                    o = Te.Deferred(),
                    s = function(t) {
                        return function(e) {
                            r[t] = this, i[t] = 1 < arguments.length ? le.call(arguments) : e, --n || o.resolveWith(r, i)
                        }
                    };
                if (n <= 1 && (l(e, o.done(s(t)).resolve, o.reject, !n), "pending" === o.state() || ve(i[t] && i[t].then))) return o.then();
                for (; t--;) l(i[t], s(t), o.reject);
                return o.promise()
            }
        });
        var Le = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        Te.Deferred.exceptionHook = function(e, t) {
            S.console && S.console.warn && e && Le.test(e.name) && S.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
        }, Te.readyException = function(e) {
            S.setTimeout(function() {
                throw e
            })
        };
        var Pe = Te.Deferred();
        Te.fn.ready = function(e) {
            return Pe.then(e)["catch"](function(e) {
                Te.readyException(e)
            }), this
        }, Te.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(e) {
                (!0 === e ? --Te.readyWait : Te.isReady) || (Te.isReady = !0) !== e && 0 < --Te.readyWait || Pe.resolveWith(se, [Te])
            }
        }), Te.ready.then = Pe.then, "complete" === se.readyState || "loading" !== se.readyState && !se.documentElement.doScroll ? S.setTimeout(Te.ready) : (se.addEventListener("DOMContentLoaded", r), S.addEventListener("load", r));
        var Re = function(e, t, n, r, i, o, s) {
                var a = 0,
                    l = e.length,
                    u = null == n;
                if ("object" === g(n))
                    for (a in i = !0, n) Re(e, t, a, n[a], !0, o, s);
                else if (r !== undefined && (i = !0, ve(r) || (s = !0), u && (s ? (t.call(e, r), t = null) : (u = t, t = function(e, t, n) {
                        return u.call(Te(e), n)
                    })), t))
                    for (; a < l; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
                return i ? e : u ? t.call(e) : l ? t(e[0], n) : o
            },
            He = /^-ms-/,
            qe = /-([a-z])/g,
            Me = function(e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
            };
        o.uid = 1, o.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = {}, Me(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))), t
            },
            set: function(e, t, n) {
                var r, i = this.cache(e);
                if ("string" == typeof t) i[h(t)] = n;
                else
                    for (r in t) i[h(r)] = t[r];
                return i
            },
            get: function(e, t) {
                return t === undefined ? this.cache(e) : e[this.expando] && e[this.expando][h(t)]
            },
            access: function(e, t, n) {
                return t === undefined || t && "string" == typeof t && n === undefined ? this.get(e, t) : (this.set(e, t, n), n !== undefined ? n : t)
            },
            remove: function(e, t) {
                var n, r = e[this.expando];
                if (r !== undefined) {
                    if (t !== undefined) {
                        n = (t = Array.isArray(t) ? t.map(h) : (t = h(t)) in r ? [t] : t.match(je) || []).length;
                        for (; n--;) delete r[t[n]]
                    }(t === undefined || Te.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = undefined : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return t !== undefined && !Te.isEmptyObject(t)
            }
        };
        var We = new o,
            Fe = new o,
            Ue = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Be = /[A-Z]/g;
        Te.extend({
            hasData: function(e) {
                return Fe.hasData(e) || We.hasData(e)
            },
            data: function(e, t, n) {
                return Fe.access(e, t, n)
            },
            removeData: function(e, t) {
                Fe.remove(e, t)
            },
            _data: function(e, t, n) {
                return We.access(e, t, n)
            },
            _removeData: function(e, t) {
                We.remove(e, t)
            }
        }), Te.fn.extend({
            data: function(n, e) {
                var t, r, i, o = this[0],
                    s = o && o.attributes;
                if (n !== undefined) return "object" == typeof n ? this.each(function() {
                    Fe.set(this, n)
                }) : Re(this, function(e) {
                    var t;
                    if (o && e === undefined) return (t = Fe.get(o, n)) !== undefined ? t : (t = p(o, n)) !== undefined ? t : void 0;
                    this.each(function() {
                        Fe.set(this, n, e)
                    })
                }, null, e, 1 < arguments.length, null, !0);
                if (this.length && (i = Fe.get(o), 1 === o.nodeType && !We.get(o, "hasDataAttrs"))) {
                    for (t = s.length; t--;) s[t] && 0 === (r = s[t].name).indexOf("data-") && (r = h(r.slice(5)), p(o, r, i[r]));
                    We.set(o, "hasDataAttrs", !0)
                }
                return i
            },
            removeData: function(e) {
                return this.each(function() {
                    Fe.remove(this, e)
                })
            }
        }), Te.extend({
            queue: function(e, t, n) {
                var r;
                if (e) return t = (t || "fx") + "queue", r = We.get(e, t), n && (!r || Array.isArray(n) ? r = We.access(e, t, Te.makeArray(n)) : r.push(n)), r || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = Te.queue(e, t),
                    r = n.length,
                    i = n.shift(),
                    o = Te._queueHooks(e, t),
                    s = function() {
                        Te.dequeue(e, t)
                    };
                "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return We.get(e, n) || We.access(e, n, {
                    empty: Te.Callbacks("once memory").add(function() {
                        We.remove(e, [t + "queue", n])
                    })
                })
            }
        }), Te.fn.extend({
            queue: function(t, n) {
                var e = 2;
                return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? Te.queue(this[0], t) : n === undefined ? this : this.each(function() {
                    var e = Te.queue(this, t, n);
                    Te._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && Te.dequeue(this, t)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    Te.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, r = 1,
                    i = Te.Deferred(),
                    o = this,
                    s = this.length,
                    a = function() {
                        --r || i.resolveWith(o, [o])
                    };
                for ("string" != typeof e && (t = e, e = undefined), e = e || "fx"; s--;)(n = We.get(o[s], e + "queueHooks")) && n.empty && (r++, n.empty.add(a));
                return a(), i.promise(t)
            }
        });
        var Ve = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ge = new RegExp("^(?:([+-])=|)(" + Ve + ")([a-z%]*)$", "i"),
            Ke = ["Top", "Right", "Bottom", "Left"],
            Qe = function(e, t) {
                return "none" === (e = t || e).style.display || "" === e.style.display && Te.contains(e.ownerDocument, e) && "none" === Te.css(e, "display")
            },
            $e = function(e, t, n, r) {
                var i, o, s = {};
                for (o in t) s[o] = e.style[o], e.style[o] = t[o];
                for (o in i = n.apply(e, r || []), t) e.style[o] = s[o];
                return i
            },
            Xe = {};
        Te.fn.extend({
            show: function() {
                return b(this, !0)
            },
            hide: function() {
                return b(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    Qe(this) ? Te(this).show() : Te(this).hide()
                })
            }
        });
        var ze = /^(?:checkbox|radio)$/i,
            Ye = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Je = /^$|^module$|\/(?:java|ecma)script/i,
            Ze = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Ze.optgroup = Ze.option, Ze.tbody = Ze.tfoot = Ze.colgroup = Ze.caption = Ze.thead, Ze.th = Ze.td;
        var et, tt, nt = /<|&#?\w+;/;
        et = se.createDocumentFragment().appendChild(se.createElement("div")), (tt = se.createElement("input")).setAttribute("type", "radio"), tt.setAttribute("checked", "checked"), tt.setAttribute("name", "t"), et.appendChild(tt), ye.checkClone = et.cloneNode(!0).cloneNode(!0).lastChild.checked, et.innerHTML = "<textarea>x</textarea>", ye.noCloneChecked = !!et.cloneNode(!0).lastChild.defaultValue;
        var rt = se.documentElement,
            it = /^key/,
            ot = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            st = /^([^.]*)(?:\.(.+)|)/;
        Te.event = {
            global: {},
            add: function(t, e, n, r, i) {
                var o, s, a, l, u, c, f, d, h, p, m, g = We.get(t);
                if (g)
                    for (n.handler && (n = (o = n).handler, i = o.selector), i && Te.find.matchesSelector(rt, i), n.guid || (n.guid = Te.guid++), (l = g.events) || (l = g.events = {}), (s = g.handle) || (s = g.handle = function(e) {
                            return void 0 !== Te && Te.event.triggered !== e.type ? Te.event.dispatch.apply(t, arguments) : undefined
                        }), u = (e = (e || "").match(je) || [""]).length; u--;) h = m = (a = st.exec(e[u]) || [])[1], p = (a[2] || "").split(".").sort(), h && (f = Te.event.special[h] || {}, h = (i ? f.delegateType : f.bindType) || h, f = Te.event.special[h] || {}, c = Te.extend({
                        type: h,
                        origType: m,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && Te.expr.match.needsContext.test(i),
                        namespace: p.join(".")
                    }, o), (d = l[h]) || ((d = l[h] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, p, s) || t.addEventListener && t.addEventListener(h, s)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, c) : d.push(c), Te.event.global[h] = !0)
            },
            remove: function(e, t, n, r, i) {
                var o, s, a, l, u, c, f, d, h, p, m, g = We.hasData(e) && We.get(e);
                if (g && (l = g.events)) {
                    for (u = (t = (t || "").match(je) || [""]).length; u--;)
                        if (h = m = (a = st.exec(t[u]) || [])[1], p = (a[2] || "").split(".").sort(), h) {
                            for (f = Te.event.special[h] || {}, d = l[h = (r ? f.delegateType : f.bindType) || h] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;) c = d[o], !i && m !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, f.remove && f.remove.call(e, c));
                            s && !d.length && (f.teardown && !1 !== f.teardown.call(e, p, g.handle) || Te.removeEvent(e, h, g.handle), delete l[h])
                        } else
                            for (h in l) Te.event.remove(e, h + t[u], n, r, !0);
                    Te.isEmptyObject(l) && We.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, r, i, o, s, a = Te.event.fix(e),
                    l = new Array(arguments.length),
                    u = (We.get(this, "events") || {})[a.type] || [],
                    c = Te.event.special[a.type] || {};
                for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
                if (a.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, a)) {
                    for (s = Te.event.handlers.call(this, a, u), t = 0;
                        (i = s[t++]) && !a.isPropagationStopped();)
                        for (a.currentTarget = i.elem, n = 0;
                            (o = i.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(o.namespace) || (a.handleObj = o, a.data = o.data, (r = ((Te.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, l)) !== undefined && !1 === (a.result = r) && (a.preventDefault(), a.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, a), a.result
                }
            },
            handlers: function(e, t) {
                var n, r, i, o, s, a = [],
                    l = t.delegateCount,
                    u = e.target;
                if (l && u.nodeType && !("click" === e.type && 1 <= e.button))
                    for (; u !== this; u = u.parentNode || this)
                        if (1 === u.nodeType && ("click" !== e.type || !0 !== u.disabled)) {
                            for (o = [], s = {}, n = 0; n < l; n++) s[i = (r = t[n]).selector + " "] === undefined && (s[i] = r.needsContext ? -1 < Te(i, this).index(u) : Te.find(i, this, null, [u]).length), s[i] && o.push(r);
                            o.length && a.push({
                                elem: u,
                                handlers: o
                            })
                        } return u = this, l < t.length && a.push({
                    elem: u,
                    handlers: t.slice(l)
                }), a
            },
            addProp: function(t, e) {
                Object.defineProperty(Te.Event.prototype, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: ve(e) ? function() {
                        if (this.originalEvent) return e(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[t]
                    },
                    set: function(e) {
                        Object.defineProperty(this, t, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: e
                        })
                    }
                })
            },
            fix: function(e) {
                return e[Te.expando] ? e : new Te.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== A() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === A() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && u(this, "input")) return this.click(), !1
                    },
                    _default: function(e) {
                        return u(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        }, Te.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }, Te.Event = function(e, t) {
            if (!(this instanceof Te.Event)) return new Te.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type,
                this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? w : C, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && Te.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[Te.expando] = !0
        }, Te.Event.prototype = {
            constructor: Te.Event,
            isDefaultPrevented: C,
            isPropagationStopped: C,
            isImmediatePropagationStopped: C,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = w, e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = w, e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = w, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, Te.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(e) {
                var t = e.button;
                return null == e.which && it.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && t !== undefined && ot.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, Te.event.addProp), Te.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, o) {
            Te.event.special[e] = {
                delegateType: o,
                bindType: o,
                handle: function(e) {
                    var t, n = this,
                        r = e.relatedTarget,
                        i = e.handleObj;
                    return r && (r === n || Te.contains(n, r)) || (e.type = i.origType, t = i.handler.apply(this, arguments), e.type = o), t
                }
            }
        }), Te.fn.extend({
            on: function(e, t, n, r) {
                return x(this, e, t, n, r)
            },
            one: function(e, t, n, r) {
                return x(this, e, t, n, r, 1)
            },
            off: function(e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, Te(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = undefined), !1 === n && (n = C), this.each(function() {
                    Te.event.remove(this, e, n, t)
                });
                for (i in e) this.off(i, t, e[i]);
                return this
            }
        });
        var at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            lt = /<script|<style|<link/i,
            ut = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ct = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        Te.extend({
            htmlPrefilter: function(e) {
                return e.replace(at, "<$1></$2>")
            },
            clone: function(e, t, n) {
                var r, i, o, s, a = e.cloneNode(!0),
                    l = Te.contains(e.ownerDocument, e);
                if (!(ye.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Te.isXMLDoc(e)))
                    for (s = _(a), r = 0, i = (o = _(e)).length; r < i; r++) k(o[r], s[r]);
                if (t)
                    if (n)
                        for (o = o || _(e), s = s || _(a), r = 0, i = o.length; r < i; r++) N(o[r], s[r]);
                    else N(e, a);
                return 0 < (s = _(a, "script")).length && E(s, !l && _(e, "script")), a
            },
            cleanData: function(e) {
                for (var t, n, r, i = Te.event.special, o = 0;
                    (n = e[o]) !== undefined; o++)
                    if (Me(n)) {
                        if (t = n[We.expando]) {
                            if (t.events)
                                for (r in t.events) i[r] ? Te.event.remove(n, r) : Te.removeEvent(n, r, t.handle);
                            n[We.expando] = undefined
                        }
                        n[Fe.expando] && (n[Fe.expando] = undefined)
                    }
            }
        }), Te.fn.extend({
            detach: function(e) {
                return L(this, e, !0)
            },
            remove: function(e) {
                return L(this, e)
            },
            text: function(e) {
                return Re(this, function(e) {
                    return e === undefined ? Te.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return j(this, arguments, function(e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || D(this, e).appendChild(e)
                })
            },
            prepend: function() {
                return j(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = D(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return j(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return j(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Te.cleanData(_(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function() {
                    return Te.clone(this, e, t)
                })
            },
            html: function(e) {
                return Re(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        r = this.length;
                    if (e === undefined && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !lt.test(e) && !Ze[(Ye.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = Te.htmlPrefilter(e);
                        try {
                            for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (Te.cleanData(_(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (i) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var n = [];
                return j(this, arguments, function(e) {
                    var t = this.parentNode;
                    Te.inArray(this, n) < 0 && (Te.cleanData(_(this)), t && t.replaceChild(e, this))
                }, n)
            }
        }), Te.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, s) {
            Te.fn[e] = function(e) {
                for (var t, n = [], r = Te(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), Te(r[o])[s](t), ce.apply(n, t.get());
                return this.pushStack(n)
            }
        });
        var ft = new RegExp("^(" + Ve + ")(?!px)[a-z%]+$", "i"),
            dt = function(e) {
                var t = e.ownerDocument.defaultView;
                return t && t.opener || (t = S), t.getComputedStyle(e)
            },
            ht = new RegExp(Ke.join("|"), "i");
        ! function() {
            function e() {
                if (l) {
                    a.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", rt.appendChild(a).appendChild(l);
                    var e = S.getComputedStyle(l);
                    n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 36 === l.offsetWidth || "absolute", rt.removeChild(a), l = null
                }
            }

            function t(e) {
                return Math.round(parseFloat(e))
            }
            var n, r, i, o, s, a = se.createElement("div"),
                l = se.createElement("div");
            l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", ye.clearCloneStyle = "content-box" === l.style.backgroundClip, Te.extend(ye, {
                boxSizingReliable: function() {
                    return e(), r
                },
                pixelBoxStyles: function() {
                    return e(), o
                },
                pixelPosition: function() {
                    return e(), n
                },
                reliableMarginLeft: function() {
                    return e(), s
                },
                scrollboxSize: function() {
                    return e(), i
                }
            }))
        }();
        var pt = /^(none|table(?!-c[ea]).+)/,
            mt = /^--/,
            gt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            yt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            vt = ["Webkit", "Moz", "ms"],
            bt = se.createElement("div").style;
        Te.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = P(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var i, o, s, a = h(t),
                        l = mt.test(t),
                        u = e.style;
                    if (l || (t = q(a)), s = Te.cssHooks[t] || Te.cssHooks[a], n === undefined) return s && "get" in s && (i = s.get(e, !1, r)) !== undefined ? i : u[t];
                    "string" === (o = typeof n) && (i = Ge.exec(n)) && i[1] && (n = y(e, t, i), o = "number"), null != n && n == n && ("number" === o && (n += i && i[3] || (Te.cssNumber[a] ? "" : "px")), ye.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, r)) === undefined || (l ? u.setProperty(t, n) : u[t] = n))
                }
            },
            css: function(e, t, n, r) {
                var i, o, s, a = h(t);
                return mt.test(t) || (t = q(a)), (s = Te.cssHooks[t] || Te.cssHooks[a]) && "get" in s && (i = s.get(e, !0, n)), i === undefined && (i = P(e, t, r)), "normal" === i && t in yt && (i = yt[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
            }
        }), Te.each(["height", "width"], function(e, a) {
            Te.cssHooks[a] = {
                get: function(e, t, n) {
                    if (t) return !pt.test(Te.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? F(e, a, n) : $e(e, gt, function() {
                        return F(e, a, n)
                    })
                },
                set: function(e, t, n) {
                    var r, i = dt(e),
                        o = "border-box" === Te.css(e, "boxSizing", !1, i),
                        s = n && W(e, a, n, o, i);
                    return o && ye.scrollboxSize() === i.position && (s -= Math.ceil(e["offset" + a[0].toUpperCase() + a.slice(1)] - parseFloat(i[a]) - W(e, a, "border", !1, i) - .5)), s && (r = Ge.exec(t)) && "px" !== (r[3] || "px") && (e.style[a] = t, t = Te.css(e, a)), M(e, t, s)
                }
            }
        }), Te.cssHooks.marginLeft = R(ye.reliableMarginLeft, function(e, t) {
            if (t) return (parseFloat(P(e, "marginLeft")) || e.getBoundingClientRect().left - $e(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
        }), Te.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(i, o) {
            Te.cssHooks[i + o] = {
                expand: function(e) {
                    for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + Ke[t] + o] = r[t] || r[t - 2] || r[0];
                    return n
                }
            }, "margin" !== i && (Te.cssHooks[i + o].set = M)
        }), Te.fn.extend({
            css: function(e, t) {
                return Re(this, function(e, t, n) {
                    var r, i, o = {},
                        s = 0;
                    if (Array.isArray(t)) {
                        for (r = dt(e), i = t.length; s < i; s++) o[t[s]] = Te.css(e, t[s], !1, r);
                        return o
                    }
                    return n !== undefined ? Te.style(e, t, n) : Te.css(e, t)
                }, e, t, 1 < arguments.length)
            }
        }), (Te.Tween = U).prototype = {
            constructor: U,
            init: function(e, t, n, r, i, o) {
                this.elem = e, this.prop = n, this.easing = i || Te.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (Te.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = U.propHooks[this.prop];
                return e && e.get ? e.get(this) : U.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = U.propHooks[this.prop];
                return this.options.duration ? this.pos = t = Te.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : U.propHooks._default.set(this), this
            }
        }, U.prototype.init.prototype = U.prototype, U.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = Te.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                },
                set: function(e) {
                    Te.fx.step[e.prop] ? Te.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[Te.cssProps[e.prop]] && !Te.cssHooks[e.prop] ? e.elem[e.prop] = e.now : Te.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, U.propHooks.scrollTop = U.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, Te.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, Te.fx = U.prototype.init, Te.fx.step = {};
        var _t, Et, Tt, wt, St = /^(?:toggle|show|hide)$/,
            Ct = /queueHooks$/;
        Te.Animation = Te.extend(X, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return y(n.elem, e, Ge.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                ve(e) ? (t = e, e = ["*"]) : e = e.match(je);
                for (var n, r = 0, i = e.length; r < i; r++) n = e[r], X.tweeners[n] = X.tweeners[n] || [], X.tweeners[n].unshift(t)
            },
            prefilters: [Q],
            prefilter: function(e, t) {
                t ? X.prefilters.unshift(e) : X.prefilters.push(e)
            }
        }), Te.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? Te.extend({}, e) : {
                complete: n || !n && t || ve(e) && e,
                duration: e,
                easing: n && t || t && !ve(t) && t
            };
            return Te.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in Te.fx.speeds ? r.duration = Te.fx.speeds[r.duration] : r.duration = Te.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                ve(r.old) && r.old.call(this), r.queue && Te.dequeue(this, r.queue)
            }, r
        }, Te.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(Qe).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(t, e, n, r) {
                var i = Te.isEmptyObject(t),
                    o = Te.speed(e, n, r),
                    s = function() {
                        var e = X(this, Te.extend({}, t), o);
                        (i || We.get(this, "finish")) && e.stop(!0)
                    };
                return s.finish = s, i || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
            },
            stop: function(i, e, o) {
                var s = function(e) {
                    var t = e.stop;
                    delete e.stop, t(o)
                };
                return "string" != typeof i && (o = e, e = i, i = undefined), e && !1 !== i && this.queue(i || "fx", []), this.each(function() {
                    var e = !0,
                        t = null != i && i + "queueHooks",
                        n = Te.timers,
                        r = We.get(this);
                    if (t) r[t] && r[t].stop && s(r[t]);
                    else
                        for (t in r) r[t] && r[t].stop && Ct.test(t) && s(r[t]);
                    for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                    !e && o || Te.dequeue(this, i)
                })
            },
            finish: function(s) {
                return !1 !== s && (s = s || "fx"), this.each(function() {
                    var e, t = We.get(this),
                        n = t[s + "queue"],
                        r = t[s + "queueHooks"],
                        i = Te.timers,
                        o = n ? n.length : 0;
                    for (t.finish = !0, Te.queue(this, s, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === s && (i[e].anim.stop(!0), i.splice(e, 1));
                    for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete t.finish
                })
            }
        }), Te.each(["toggle", "show", "hide"], function(e, r) {
            var i = Te.fn[r];
            Te.fn[r] = function(e, t, n) {
                return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(G(r, !0), e, t, n)
            }
        }), Te.each({
            slideDown: G("show"),
            slideUp: G("hide"),
            slideToggle: G("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, r) {
            Te.fn[e] = function(e, t, n) {
                return this.animate(r, e, t, n)
            }
        }), Te.timers = [], Te.fx.tick = function() {
            var e, t = 0,
                n = Te.timers;
            for (_t = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || Te.fx.stop(), _t = undefined
        }, Te.fx.timer = function(e) {
            Te.timers.push(e), Te.fx.start()
        }, Te.fx.interval = 13, Te.fx.start = function() {
            Et || (Et = !0, B())
        }, Te.fx.stop = function() {
            Et = null
        }, Te.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, Te.fn.delay = function(r, e) {
            return r = Te.fx && Te.fx.speeds[r] || r, e = e || "fx", this.queue(e, function(e, t) {
                var n = S.setTimeout(e, r);
                t.stop = function() {
                    S.clearTimeout(n)
                }
            })
        }, Tt = se.createElement("input"), wt = se.createElement("select").appendChild(se.createElement("option")), Tt.type = "checkbox", ye.checkOn = "" !== Tt.value, ye.optSelected = wt.selected, (Tt = se.createElement("input")).value = "t", Tt.type = "radio", ye.radioValue = "t" === Tt.value;
        var At, xt = Te.expr.attrHandle;
        Te.fn.extend({
            attr: function(e, t) {
                return Re(this, Te.attr, e, t, 1 < arguments.length)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    Te.removeAttr(this, e)
                })
            }
        }), Te.extend({
            attr: function(e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? Te.prop(e, t, n) : (1 === o && Te.isXMLDoc(e) || (i = Te.attrHooks[t.toLowerCase()] || (Te.expr.match.bool.test(t) ? At : undefined)), n !== undefined ? null === n ? void Te.removeAttr(e, t) : i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = Te.find.attr(e, t)) ? undefined : r)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!ye.radioValue && "radio" === t && u(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, r = 0,
                    i = t && t.match(je);
                if (i && 1 === e.nodeType)
                    for (; n = i[r++];) e.removeAttribute(n)
            }
        }), At = {
            set: function(e, t, n) {
                return !1 === t ? Te.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, Te.each(Te.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var s = xt[t] || Te.find.attr;
            xt[t] = function(e, t, n) {
                var r, i, o = t.toLowerCase();
                return n || (i = xt[o], xt[o] = r, r = null != s(e, t, n) ? o : null, xt[o] = i), r
            }
        });
        var Dt = /^(?:input|select|textarea|button)$/i,
            Ot = /^(?:a|area)$/i;
        Te.fn.extend({
            prop: function(e, t) {
                return Re(this, Te.prop, e, t, 1 < arguments.length)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[Te.propFix[e] || e]
                })
            }
        }), Te.extend({
            prop: function(e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && Te.isXMLDoc(e) || (t = Te.propFix[t] || t, i = Te.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = Te.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : Dt.test(e.nodeName) || Ot.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), ye.optSelected || (Te.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), Te.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            Te.propFix[this.toLowerCase()] = this
        }), Te.fn.extend({
            addClass: function(t) {
                var e, n, r, i, o, s, a, l = 0;
                if (ve(t)) return this.each(function(e) {
                    Te(this).addClass(t.call(this, e, Y(this)))
                });
                if ((e = J(t)).length)
                    for (; n = this[l++];)
                        if (i = Y(n), r = 1 === n.nodeType && " " + z(i) + " ") {
                            for (s = 0; o = e[s++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                            i !== (a = z(r)) && n.setAttribute("class", a)
                        } return this
            },
            removeClass: function(t) {
                var e, n, r, i, o, s, a, l = 0;
                if (ve(t)) return this.each(function(e) {
                    Te(this).removeClass(t.call(this, e, Y(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ((e = J(t)).length)
                    for (; n = this[l++];)
                        if (i = Y(n), r = 1 === n.nodeType && " " + z(i) + " ") {
                            for (s = 0; o = e[s++];)
                                for (; - 1 < r.indexOf(" " + o + " ");) r = r.replace(" " + o + " ", " ");
                            i !== (a = z(r)) && n.setAttribute("class", a)
                        } return this
            },
            toggleClass: function(i, t) {
                var o = typeof i,
                    s = "string" === o || Array.isArray(i);
                return "boolean" == typeof t && s ? t ? this.addClass(i) : this.removeClass(i) : ve(i) ? this.each(function(e) {
                    Te(this).toggleClass(i.call(this, e, Y(this), t), t)
                }) : this.each(function() {
                    var e, t, n, r;
                    if (s)
                        for (t = 0, n = Te(this), r = J(i); e = r[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                    else i !== undefined && "boolean" !== o || ((e = Y(this)) && We.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : We.get(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                var t, n, r = 0;
                for (t = " " + e + " "; n = this[r++];)
                    if (1 === n.nodeType && -1 < (" " + z(Y(n)) + " ").indexOf(t)) return !0;
                return !1
            }
        });
        var It = /\r/g;
        Te.fn.extend({
            val: function(n) {
                var r, e, i, t = this[0];
                return arguments.length ? (i = ve(n), this.each(function(e) {
                    var t;
                    1 === this.nodeType && (null == (t = i ? n.call(this, e, Te(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = Te.map(t, function(e) {
                        return null == e ? "" : e + ""
                    })), (r = Te.valHooks[this.type] || Te.valHooks[this.nodeName.toLowerCase()]) && "set" in r && r.set(this, t, "value") !== undefined || (this.value = t))
                })) : t ? (r = Te.valHooks[t.type] || Te.valHooks[t.nodeName.toLowerCase()]) && "get" in r && (e = r.get(t, "value")) !== undefined ? e : "string" == typeof(e = t.value) ? e.replace(It, "") : null == e ? "" : e : void 0
            }
        }), Te.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = Te.find.attr(e, "value");
                        return null != t ? t : z(Te.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, r, i = e.options,
                            o = e.selectedIndex,
                            s = "select-one" === e.type,
                            a = s ? null : [],
                            l = s ? o + 1 : i.length;
                        for (r = o < 0 ? l : s ? o : 0; r < l; r++)
                            if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !u(n.parentNode, "optgroup"))) {
                                if (t = Te(n).val(), s) return t;
                                a.push(t)
                            } return a
                    },
                    set: function(e, t) {
                        for (var n, r, i = e.options, o = Te.makeArray(t), s = i.length; s--;)((r = i[s]).selected = -1 < Te.inArray(Te.valHooks.option.get(r), o)) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), Te.each(["radio", "checkbox"], function() {
            Te.valHooks[this] = {
                set: function(e, t) {
                    if (Array.isArray(t)) return e.checked = -1 < Te.inArray(Te(e).val(), t)
                }
            }, ye.checkOn || (Te.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        }), ye.focusin = "onfocusin" in S;
        var Nt = /^(?:focusinfocus|focusoutblur)$/,
            kt = function(e) {
                e.stopPropagation()
            };
        Te.extend(Te.event, {
            trigger: function(e, t, n, r) {
                var i, o, s, a, l, u, c, f, d = [n || se],
                    h = pe.call(e, "type") ? e.type : e,
                    p = pe.call(e, "namespace") ? e.namespace.split(".") : [];
                if (o = f = s = n = n || se, 3 !== n.nodeType && 8 !== n.nodeType && !Nt.test(h + Te.event.triggered) && (-1 < h.indexOf(".") && (h = (p = h.split(".")).shift(), p.sort()), l = h.indexOf(":") < 0 && "on" + h, (e = e[Te.expando] ? e : new Te.Event(h, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = null == t ? [e] : Te.makeArray(t, [e]), c = Te.event.special[h] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                    if (!r && !c.noBubble && !be(n)) {
                        for (a = c.delegateType || h, Nt.test(a + h) || (o = o.parentNode); o; o = o.parentNode) d.push(o), s = o;
                        s === (n.ownerDocument || se) && d.push(s.defaultView || s.parentWindow || S)
                    }
                    for (i = 0;
                        (o = d[i++]) && !e.isPropagationStopped();) f = o, e.type = 1 < i ? a : c.bindType || h, (u = (We.get(o, "events") || {})[e.type] && We.get(o, "handle")) && u.apply(o, t), (u = l && o[l]) && u.apply && Me(o) && (e.result = u.apply(o, t), !1 === e.result && e.preventDefault());
                    return e.type = h, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(d.pop(), t) || !Me(n) || l && ve(n[h]) && !be(n) && ((s = n[l]) && (n[l] = null), Te.event.triggered = h, e.isPropagationStopped() && f.addEventListener(h, kt), n[h](), e.isPropagationStopped() && f.removeEventListener(h, kt), Te.event.triggered = undefined, s && (n[l] = s)), e.result
                }
            },
            simulate: function(e, t, n) {
                var r = Te.extend(new Te.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                Te.event.trigger(r, null, t)
            }
        }), Te.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    Te.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return Te.event.trigger(e, t, n, !0)
            }
        }), ye.focusin || Te.each({
            focus: "focusin",
            blur: "focusout"
        }, function(n, r) {
            var i = function(e) {
                Te.event.simulate(r, e.target, Te.event.fix(e))
            };
            Te.event.special[r] = {
                setup: function() {
                    var e = this.ownerDocument || this,
                        t = We.access(e, r);
                    t || e.addEventListener(n, i, !0), We.access(e, r, (t || 0) + 1)
                },
                teardown: function() {
                    var e = this.ownerDocument || this,
                        t = We.access(e, r) - 1;
                    t ? We.access(e, r, t) : (e.removeEventListener(n, i, !0), We.remove(e, r))
                }
            }
        });
        var jt = S.location,
            Lt = Date.now(),
            Pt = /\?/;
        Te.parseXML = function(e) {
            var t;
            if (!e || "string" != typeof e) return null;
            try {
                t = (new S.DOMParser).parseFromString(e, "text/xml")
            } catch (n) {
                t = undefined
            }
            return t && !t.getElementsByTagName("parsererror").length || Te.error("Invalid XML: " + e), t
        };
        var Rt = /\[\]$/,
            Ht = /\r?\n/g,
            qt = /^(?:submit|button|image|reset|file)$/i,
            Mt = /^(?:input|select|textarea|keygen)/i;
        Te.param = function(e, t) {
            var n, r = [],
                i = function(e, t) {
                    var n = ve(t) ? t() : t;
                    r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
                };
            if (Array.isArray(e) || e.jquery && !Te.isPlainObject(e)) Te.each(e, function() {
                i(this.name, this.value)
            });
            else
                for (n in e) Z(n, e[n], t, i);
            return r.join("&")
        }, Te.fn.extend({
            serialize: function() {
                return Te.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = Te.prop(this, "elements");
                    return e ? Te.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !Te(this).is(":disabled") && Mt.test(this.nodeName) && !qt.test(e) && (this.checked || !ze.test(e))
                }).map(function(e, t) {
                    var n = Te(this).val();
                    return null == n ? null : Array.isArray(n) ? Te.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Ht, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Ht, "\r\n")
                    }
                }).get()
            }
        });
        var Wt = /%20/g,
            Ft = /#.*$/,
            Ut = /([?&])_=[^&]*/,
            Bt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Vt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Gt = /^(?:GET|HEAD)$/,
            Kt = /^\/\//,
            Qt = {},
            $t = {},
            Xt = "*/".concat("*"),
            zt = se.createElement("a");
        zt.href = jt.href, Te.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: jt.href,
                type: "GET",
                isLocal: Vt.test(jt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Xt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": Te.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? ne(ne(e, Te.ajaxSettings), t) : ne(Te.ajaxSettings, e)
            },
            ajaxPrefilter: ee(Qt),
            ajaxTransport: ee($t),
            ajax: function(e, t) {
                function n(e, t, n, r) {
                    var i, o, s, a, l, u = t;
                    p || (p = !0, h && S.clearTimeout(h), c = undefined, d = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (a = re(g, T, n)), a = ie(g, a, T, i), i ? (g.ifModified && ((l = T.getResponseHeader("Last-Modified")) && (Te.lastModified[f] = l), (l = T.getResponseHeader("etag")) && (Te.etag[f] = l)), 204 === e || "HEAD" === g.type ? u = "nocontent" : 304 === e ? u = "notmodified" : (u = a.state, o = a.data, i = !(s = a.error))) : (s = u, !e && u || (u = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || u) + "", i ? b.resolveWith(y, [o, u, T]) : b.rejectWith(y, [T, u, s]), T.statusCode(E), E = undefined, m && v.trigger(i ? "ajaxSuccess" : "ajaxError", [T, g, i ? o : s]), _.fireWith(y, [T, u]), m && (v.trigger("ajaxComplete", [T, g]), --Te.active || Te.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (t = e, e = undefined), t = t || {};
                var c, f, d, r, h, i, p, m, o, s, g = Te.ajaxSetup({}, t),
                    y = g.context || g,
                    v = g.context && (y.nodeType || y.jquery) ? Te(y) : Te.event,
                    b = Te.Deferred(),
                    _ = Te.Callbacks("once memory"),
                    E = g.statusCode || {},
                    a = {},
                    l = {},
                    u = "canceled",
                    T = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (p) {
                                if (!r)
                                    for (r = {}; t = Bt.exec(d);) r[t[1].toLowerCase()] = t[2];
                                t = r[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return p ? d : null
                        },
                        setRequestHeader: function(e, t) {
                            return null == p && (e = l[e.toLowerCase()] = l[e.toLowerCase()] || e, a[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return null == p && (g.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (p) T.always(e[T.status]);
                                else
                                    for (t in e) E[t] = [E[t], e[t]];
                            return this
                        },
                        abort: function(e) {
                            var t = e || u;
                            return c && c.abort(t), n(0, t), this
                        }
                    };
                if (b.promise(T), g.url = ((e || g.url || jt.href) + "").replace(Kt, jt.protocol + "//"), g.type = t.method || t.type || g.method || g.type, g.dataTypes = (g.dataType || "*").toLowerCase().match(je) || [""], null == g.crossDomain) {
                    i = se.createElement("a");
                    try {
                        i.href = g.url, i.href = i.href, g.crossDomain = zt.protocol + "//" + zt.host != i.protocol + "//" + i.host
                    } catch (w) {
                        g.crossDomain = !0
                    }
                }
                if (g.data && g.processData && "string" != typeof g.data && (g.data = Te.param(g.data, g.traditional)), te(Qt, g, t, T), p) return T;
                for (o in (m = Te.event && g.global) && 0 == Te.active++ && Te.event.trigger("ajaxStart"), g.type = g.type.toUpperCase(), g.hasContent = !Gt.test(g.type), f = g.url.replace(Ft, ""), g.hasContent ? g.data && g.processData && 0 === (g.contentType || "").indexOf("application/x-www-form-urlencoded") && (g.data = g.data.replace(Wt, "+")) : (s = g.url.slice(f.length), g.data && (g.processData || "string" == typeof g.data) && (f += (Pt.test(f) ? "&" : "?") + g.data, delete g.data), !1 === g.cache && (f = f.replace(Ut, "$1"), s = (Pt.test(f) ? "&" : "?") + "_=" + Lt++ + s), g.url = f + s), g.ifModified && (Te.lastModified[f] && T.setRequestHeader("If-Modified-Since", Te.lastModified[f]), Te.etag[f] && T.setRequestHeader("If-None-Match", Te.etag[f])), (g.data && g.hasContent && !1 !== g.contentType || t.contentType) && T.setRequestHeader("Content-Type", g.contentType), T.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + Xt + "; q=0.01" : "") : g.accepts["*"]), g.headers) T.setRequestHeader(o, g.headers[o]);
                if (g.beforeSend && (!1 === g.beforeSend.call(y, T, g) || p)) return T.abort();
                if (u = "abort", _.add(g.complete), T.done(g.success), T.fail(g.error), c = te($t, g, t, T)) {
                    if (T.readyState = 1, m && v.trigger("ajaxSend", [T, g]), p) return T;
                    g.async && 0 < g.timeout && (h = S.setTimeout(function() {
                        T.abort("timeout")
                    }, g.timeout));
                    try {
                        p = !1, c.send(a, n)
                    } catch (w) {
                        if (p) throw w;
                        n(-1, w)
                    }
                } else n(-1, "No Transport");
                return T
            },
            getJSON: function(e, t, n) {
                return Te.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return Te.get(e, undefined, t, "script")
            }
        }), Te.each(["get", "post"], function(e, i) {
            Te[i] = function(e, t, n, r) {
                return ve(t) && (r = r || n, n = t, t = undefined), Te.ajax(Te.extend({
                    url: e,
                    type: i,
                    dataType: r,
                    data: t,
                    success: n
                }, Te.isPlainObject(e) && e))
            }
        }), Te._evalUrl = function(e) {
            return Te.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                "throws": !0
            })
        }, Te.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (ve(e) && (e = e.call(this[0])), t = Te(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this
            },
            wrapInner: function(n) {
                return ve(n) ? this.each(function(e) {
                    Te(this).wrapInner(n.call(this, e))
                }) : this.each(function() {
                    var e = Te(this),
                        t = e.contents();
                    t.length ? t.wrapAll(n) : e.append(n)
                })
            },
            wrap: function(t) {
                var n = ve(t);
                return this.each(function(e) {
                    Te(this).wrapAll(n ? t.call(this, e) : t)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    Te(this).replaceWith(this.childNodes)
                }), this
            }
        }), Te.expr.pseudos.hidden = function(e) {
            return !Te.expr.pseudos.visible(e)
        }, Te.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }, Te.ajaxSettings.xhr = function() {
            try {
                return new S.XMLHttpRequest
            } catch (e) {}
        };
        var Yt = {
                0: 200,
                1223: 204
            },
            Jt = Te.ajaxSettings.xhr();
        ye.cors = !!Jt && "withCredentials" in Jt, ye.ajax = Jt = !!Jt, Te.ajaxTransport(function(o) {
            var s, a;
            if (ye.cors || Jt && !o.crossDomain) return {
                send: function(e, t) {
                    var n, r = o.xhr();
                    if (r.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
                        for (n in o.xhrFields) r[n] = o.xhrFields[n];
                    for (n in o.mimeType && r.overrideMimeType && r.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
                    s = function(e) {
                        return function() {
                            s && (s = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Yt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                binary: r.response
                            } : {
                                text: r.responseText
                            }, r.getAllResponseHeaders()))
                        }
                    }, r.onload = s(), a = r.onerror = r.ontimeout = s("error"), r.onabort !== undefined ? r.onabort = a : r.onreadystatechange = function() {
                        4 === r.readyState && S.setTimeout(function() {
                            s && a()
                        })
                    }, s = s("abort");
                    try {
                        r.send(o.hasContent && o.data || null)
                    } catch (i) {
                        if (s) throw i
                    }
                },
                abort: function() {
                    s && s()
                }
            }
        }), Te.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }), Te.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return Te.globalEval(e), e
                }
            }
        }), Te.ajaxPrefilter("script", function(e) {
            e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), Te.ajaxTransport("script", function(n) {
            var r, i;
            if (n.crossDomain) return {
                send: function(e, t) {
                    r = Te("<script>").prop({
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", i = function(e) {
                        r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type)
                    }), se.head.appendChild(r[0])
                },
                abort: function() {
                    i && i()
                }
            }
        });
        var Zt, en = [],
            tn = /(=)\?(?=&|$)|\?\?/;
        Te.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = en.pop() || Te.expando + "_" + Lt++;
                return this[e] = !0, e
            }
        }), Te.ajaxPrefilter("json jsonp", function(e, t, n) {
            var r, i, o, s = !1 !== e.jsonp && (tn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(e.data) && "data");
            if (s || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = ve(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(tn, "$1" + r) : !1 !== e.jsonp && (e.url += (Pt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                return o || Te.error(r + " was not called"), o[0]
            }, e.dataTypes[0] = "json", i = S[r], S[r] = function() {
                o = arguments
            }, n.always(function() {
                i === undefined ? Te(S).removeProp(r) : S[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, en.push(r)), o && ve(i) && i(o[0]), o = i = undefined
            }), "script"
        }), ye.createHTMLDocument = ((Zt = se.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Zt.childNodes.length), Te.parseHTML = function(e, t, n) {
            return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (ye.createHTMLDocument ? ((r = (t = se.implementation.createHTMLDocument("")).createElement("base")).href = se.location.href, t.head.appendChild(r)) : t = se), o = !n && [], (i = De.exec(e)) ? [t.createElement(i[1])] : (i = T([e], t, o), o && o.length && Te(o).remove(), Te.merge([], i.childNodes)));
            var r, i, o
        }, Te.fn.load = function(e, t, n) {
            var r, i, o, s = this,
                a = e.indexOf(" ");
            return -1 < a && (r = z(e.slice(a)), e = e.slice(0, a)), ve(t) ? (n = t, t = undefined) : t && "object" == typeof t && (i = "POST"), 0 < s.length && Te.ajax({
                url: e,
                type: i || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments, s.html(r ? Te("<div>").append(Te.parseHTML(e)).find(r) : e)
            }).always(n && function(e, t) {
                s.each(function() {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }), this
        }, Te.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            Te.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), Te.expr.pseudos.animated = function(t) {
            return Te.grep(Te.timers, function(e) {
                return t === e.elem
            }).length
        }, Te.offset = {
            setOffset: function(e, t, n) {
                var r, i, o, s, a, l, u = Te.css(e, "position"),
                    c = Te(e),
                    f = {};
                "static" === u && (e.style.position = "relative"), a = c.offset(), o = Te.css(e, "top"), l = Te.css(e, "left"), ("absolute" === u || "fixed" === u) && -1 < (o + l).indexOf("auto") ? (s = (r = c.position()).top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(l) || 0), ve(t) && (t = t.call(e, n, Te.extend({}, a))), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
            }
        }, Te.fn.extend({
            offset: function(t) {
                if (arguments.length) return t === undefined ? this : this.each(function(e) {
                    Te.offset.setOffset(this, t, e)
                });
                var e, n, r = this[0];
                return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                    top: e.top + n.pageYOffset,
                    left: e.left + n.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n, r = this[0],
                        i = {
                            top: 0,
                            left: 0
                        };
                    if ("fixed" === Te.css(r, "position")) t = r.getBoundingClientRect();
                    else {
                        for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === Te.css(e, "position");) e = e.parentNode;
                        e && e !== r && 1 === e.nodeType && ((i = Te(e).offset()).top += Te.css(e, "borderTopWidth", !0), i.left += Te.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - i.top - Te.css(r, "marginTop", !0),
                        left: t.left - i.left - Te.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && "static" === Te.css(e, "position");) e = e.offsetParent;
                    return e || rt
                })
            }
        }), Te.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, i) {
            var o = "pageYOffset" === i;
            Te.fn[t] = function(e) {
                return Re(this, function(e, t, n) {
                    var r;
                    if (be(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), n === undefined) return r ? r[i] : e[t];
                    r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
                }, t, e, arguments.length)
            }
        }), Te.each(["top", "left"], function(e, n) {
            Te.cssHooks[n] = R(ye.pixelPosition, function(e, t) {
                if (t) return t = P(e, n), ft.test(t) ? Te(e).position()[n] + "px" : t
            })
        }), Te.each({
            Height: "height",
            Width: "width"
        }, function(s, a) {
            Te.each({
                padding: "inner" + s,
                content: a,
                "": "outer" + s
            }, function(r, o) {
                Te.fn[o] = function(e, t) {
                    var n = arguments.length && (r || "boolean" != typeof e),
                        i = r || (!0 === e || !0 === t ? "margin" : "border");
                    return Re(this, function(e, t, n) {
                        var r;
                        return be(e) ? 0 === o.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + s], r["scroll" + s], e.body["offset" + s], r["offset" + s], r["client" + s])) : n === undefined ? Te.css(e, t, i) : Te.style(e, t, n, i)
                    }, a, n ? e : undefined, n)
                }
            })
        }), Te.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
            Te.fn[n] = function(e, t) {
                return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
            }
        }), Te.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }), Te.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }), Te.proxy = function(e, t) {
            var n, r, i;
            return "string" == typeof t && (n = e[t], t = e, e = n), ve(e) ? (r = le.call(arguments, 2), (i = function() {
                return e.apply(t || this, r.concat(le.call(arguments)))
            }).guid = e.guid = e.guid || Te.guid++, i) : undefined
        }, Te.holdReady = function(e) {
            e ? Te.readyWait++ : Te.ready(!0)
        }, Te.isArray = Array.isArray, Te.parseJSON = JSON.parse, Te.nodeName = u, Te.isFunction = ve, Te.isWindow = be, Te.camelCase = h, Te.type = g, Te.now = Date.now, Te.isNumeric = function(e) {
            var t = Te.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        }, "function" == typeof define && define.amd && define("jquery", [], function() {
            return Te
        });
        var nn = S.jQuery,
            rn = S.$;
        return Te.noConflict = function(e) {
            return S.$ === Te && (S.$ = rn), e && S.jQuery === Te && (S.jQuery = nn), Te
        }, e || (S.jQuery = S.$ = Te), Te
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
    }(this, function() {
        "use strict";

        function e(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        }

        function t(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, ue))
            }
        }

        function a(e) {
            return e && "[object Function]" === {}.toString.call(e)
        }

        function _(e, t) {
            if (1 !== e.nodeType) return [];
            var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
            return t ? n[t] : n
        }

        function p(e) {
            return "HTML" === e.nodeName ? e : e.parentNode || e.host
        }

        function m(e) {
            if (!e) return document.body;
            switch (e.nodeName) {
                case "HTML":
                case "BODY":
                    return e.ownerDocument.body;
                case "#document":
                    return e.body
            }
            var t = _(e),
                n = t.overflow,
                r = t.overflowX,
                i = t.overflowY;
            return /(auto|scroll|overlay)/.test(n + i + r) ? e : m(p(e))
        }

        function g(e) {
            return 11 === e ? de : 10 === e ? he : de || he
        }

        function b(e) {
            if (!e) return document.documentElement;
            for (var t = g(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
            var r = n && n.nodeName;
            return r && "BODY" !== r && "HTML" !== r ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) && "static" === _(n, "position") ? b(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
        }

        function l(e) {
            var t = e.nodeName;
            return "BODY" !== t && ("HTML" === t || b(e.firstElementChild) === e)
        }

        function u(e) {
            return null !== e.parentNode ? u(e.parentNode) : e
        }

        function y(e, t) {
            if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
            var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
                r = n ? e : t,
                i = n ? t : e,
                o = document.createRange();
            o.setStart(r, 0), o.setEnd(i, 0);
            var s = o.commonAncestorContainer;
            if (e !== s && t !== s || r.contains(i)) return l(s) ? s : b(s);
            var a = u(e);
            return a.host ? y(a.host, t) : y(e, u(t).host)
        }

        function d(e, t) {
            var n = "top" === (1 < arguments.length && t !== undefined ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
                r = e.nodeName;
            if ("BODY" !== r && "HTML" !== r) return e[n];
            var i = e.ownerDocument.documentElement;
            return (e.ownerDocument.scrollingElement || i)[n]
        }

        function v(e, t, n) {
            var r = 2 < arguments.length && n !== undefined && arguments[2],
                i = d(t, "top"),
                o = d(t, "left"),
                s = r ? -1 : 1;
            return e.top += i * s, e.bottom += i * s, e.left += o * s, e.right += o * s, e
        }

        function h(e, t) {
            var n = "x" === t ? "Left" : "Top",
                r = "Left" === n ? "Right" : "Bottom";
            return parseFloat(e["border" + n + "Width"], 10) + parseFloat(e["border" + r + "Width"], 10)
        }

        function i(e, t, n, r) {
            return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], g(10) ? parseInt(n["offset" + e]) + parseInt(r["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(r["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
        }

        function E(e) {
            var t = e.body,
                n = e.documentElement,
                r = g(10) && getComputedStyle(n);
            return {
                height: i("Height", t, n, r),
                width: i("Width", t, n, r)
            }
        }

        function T(e) {
            return ye({}, e, {
                right: e.left + e.width,
                bottom: e.top + e.height
            })
        }

        function w(e) {
            var t = {};
            try {
                if (g(10)) {
                    t = e.getBoundingClientRect();
                    var n = d(e, "top"),
                        r = d(e, "left");
                    t.top += n, t.left += r, t.bottom += n, t.right += r
                } else t = e.getBoundingClientRect()
            } catch (f) {}
            var i = {
                    left: t.left,
                    top: t.top,
                    width: t.right - t.left,
                    height: t.bottom - t.top
                },
                o = "HTML" === e.nodeName ? E(e.ownerDocument) : {},
                s = o.width || e.clientWidth || i.right - i.left,
                a = o.height || e.clientHeight || i.bottom - i.top,
                l = e.offsetWidth - s,
                u = e.offsetHeight - a;
            if (l || u) {
                var c = _(e);
                l -= h(c, "x"), u -= h(c, "y"), i.width -= l, i.height -= u
            }
            return T(i)
        }

        function S(e, t, n) {
            var r = 2 < arguments.length && n !== undefined && arguments[2],
                i = g(10),
                o = "HTML" === t.nodeName,
                s = w(e),
                a = w(t),
                l = m(e),
                u = _(t),
                c = parseFloat(u.borderTopWidth, 10),
                f = parseFloat(u.borderLeftWidth, 10);
            r && o && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
            var d = T({
                top: s.top - a.top - c,
                left: s.left - a.left - f,
                width: s.width,
                height: s.height
            });
            if (d.marginTop = 0, d.marginLeft = 0, !i && o) {
                var h = parseFloat(u.marginTop, 10),
                    p = parseFloat(u.marginLeft, 10);
                d.top -= c - h, d.bottom -= c - h, d.left -= f - p, d.right -= f - p, d.marginTop = h, d.marginLeft = p
            }
            return (i && !r ? t.contains(l) : t === l && "BODY" !== l.nodeName) && (d = v(d, t)), d
        }

        function C(e, t) {
            var n = 1 < arguments.length && t !== undefined && arguments[1],
                r = e.ownerDocument.documentElement,
                i = S(e, r),
                o = Math.max(r.clientWidth, window.innerWidth || 0),
                s = Math.max(r.clientHeight, window.innerHeight || 0),
                a = n ? 0 : d(r),
                l = n ? 0 : d(r, "left");
            return T({
                top: a - i.top + i.marginTop,
                left: l - i.left + i.marginLeft,
                width: o,
                height: s
            })
        }

        function A(e) {
            var t = e.nodeName;
            return "BODY" !== t && "HTML" !== t && ("fixed" === _(e, "position") || A(p(e)))
        }

        function x(e) {
            if (!e || !e.parentElement || g()) return document.documentElement;
            for (var t = e.parentElement; t && "none" === _(t, "transform");) t = t.parentElement;
            return t || document.documentElement
        }

        function D(e, t, n, r, i) {
            var o = 4 < arguments.length && i !== undefined && arguments[4],
                s = {
                    top: 0,
                    left: 0
                },
                a = o ? x(e) : y(e, t);
            if ("viewport" === r) s = C(a, o);
            else {
                var l = void 0;
                "scrollParent" === r ? "BODY" === (l = m(p(t))).nodeName && (l = e.ownerDocument.documentElement) : l = "window" === r ? e.ownerDocument.documentElement : r;
                var u = S(l, a, o);
                if ("HTML" !== l.nodeName || A(a)) s = u;
                else {
                    var c = E(e.ownerDocument),
                        f = c.height,
                        d = c.width;
                    s.top += u.top - u.marginTop, s.bottom = f + u.top, s.left += u.left - u.marginLeft, s.right = d + u.left
                }
            }
            var h = "number" == typeof(n = n || 0);
            return s.left += h ? n : n.left || 0, s.top += h ? n : n.top || 0, s.right -= h ? n : n.right || 0, s.bottom -= h ? n : n.bottom || 0, s
        }

        function O(e) {
            return e.width * e.height
        }

        function c(e, t, r, n, i, o) {
            var s = 5 < arguments.length && o !== undefined ? arguments[5] : 0;
            if (-1 === e.indexOf("auto")) return e;
            var a = D(r, n, s, i),
                l = {
                    top: {
                        width: a.width,
                        height: t.top - a.top
                    },
                    right: {
                        width: a.right - t.right,
                        height: a.height
                    },
                    bottom: {
                        width: a.width,
                        height: a.bottom - t.bottom
                    },
                    left: {
                        width: t.left - a.left,
                        height: a.height
                    }
                },
                u = Object.keys(l).map(function(e) {
                    return ye({
                        key: e
                    }, l[e], {
                        area: O(l[e])
                    })
                }).sort(function(e, t) {
                    return t.area - e.area
                }),
                c = u.filter(function(e) {
                    var t = e.width,
                        n = e.height;
                    return t >= r.clientWidth && n >= r.clientHeight
                }),
                f = 0 < c.length ? c[0].key : u[0].key,
                d = e.split("-")[1];
            return f + (d ? "-" + d : "")
        }

        function f(e, t, n, r) {
            var i = 3 < arguments.length && r !== undefined ? arguments[3] : null;
            return S(n, i ? x(t) : y(t, n), i)
        }

        function I(e) {
            var t = e.ownerDocument.defaultView.getComputedStyle(e),
                n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
                r = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
            return {
                width: e.offsetWidth + r,
                height: e.offsetHeight + n
            }
        }

        function N(e) {
            var t = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return e.replace(/left|right|bottom|top/g, function(e) {
                return t[e]
            })
        }

        function k(e, t, n) {
            n = n.split("-")[0];
            var r = I(e),
                i = {
                    width: r.width,
                    height: r.height
                },
                o = -1 !== ["right", "left"].indexOf(n),
                s = o ? "top" : "left",
                a = o ? "left" : "top",
                l = o ? "height" : "width",
                u = o ? "width" : "height";
            return i[s] = t[s] + t[l] / 2 - r[l] / 2, i[a] = n === a ? t[a] - r[u] : t[N(a)], i
        }

        function j(e, t) {
            return Array.prototype.find ? e.find(t) : e.filter(t)[0]
        }

        function r(e, t, n) {
            if (Array.prototype.findIndex) return e.findIndex(function(e) {
                return e[t] === n
            });
            var r = j(e, function(e) {
                return e[t] === n
            });
            return e.indexOf(r)
        }

        function L(e, n, t) {
            return (t === undefined ? e : e.slice(0, r(e, "name", t))).forEach(function(e) {
                e["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var t = e["function"] || e.fn;
                e.enabled && a(t) && (n.offsets.popper = T(n.offsets.popper), n.offsets.reference = T(n.offsets.reference), n = t(n, e))
            }), n
        }

        function o() {
            if (!this.state.isDestroyed) {
                var e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                };
                e.offsets.reference = f(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = c(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = k(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = L(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
            }
        }

        function n(e, n) {
            return e.some(function(e) {
                var t = e.name;
                return e.enabled && t === n
            })
        }

        function P(e) {
            for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++) {
                var i = t[r],
                    o = i ? "" + i + n : e;
                if ("undefined" != typeof document.body.style[o]) return o
            }
            return null
        }

        function R() {
            return this.state.isDestroyed = !0, n(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[P("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
        }

        function s(e) {
            var t = e.ownerDocument;
            return t ? t.defaultView : window
        }

        function H(e, t, n, r) {
            var i = "BODY" === e.nodeName,
                o = i ? e.ownerDocument.defaultView : e;
            o.addEventListener(t, n, {
                passive: !0
            }), i || H(m(o.parentNode), t, n, r), r.push(o)
        }

        function q(e, t, n, r) {
            n.updateBound = r, s(e).addEventListener("resize", n.updateBound, {
                passive: !0
            });
            var i = m(e);
            return H(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n
        }

        function M() {
            this.state.eventsEnabled || (this.state = q(this.reference, this.options, this.state, this.scheduleUpdate))
        }

        function W(e, t) {
            return s(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(e) {
                e.removeEventListener("scroll", t.updateBound)
            }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
        }

        function F() {
            this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = W(this.reference, this.state))
        }

        function U(e) {
            return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
        }

        function B(n, r) {
            Object.keys(r).forEach(function(e) {
                var t = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(e) && U(r[e]) && (t = "px"), n.style[e] = r[e] + t
            })
        }

        function V(t, n) {
            Object.keys(n).forEach(function(e) {
                !1 !== n[e] ? t.setAttribute(e, n[e]) : t.removeAttribute(e)
            })
        }

        function G(e) {
            return B(e.instance.popper, e.styles), V(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && B(e.arrowElement, e.arrowStyles), e
        }

        function K(e, t, n, r, i) {
            var o = f(i, t, e, n.positionFixed),
                s = c(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
            return t.setAttribute("x-placement", s), B(t, {
                position: n.positionFixed ? "fixed" : "absolute"
            }), n
        }

        function Q(e, t) {
            var n = t.x,
                r = t.y,
                i = e.offsets.popper,
                o = j(e.instance.modifiers, function(e) {
                    return "applyStyle" === e.name
                }).gpuAcceleration;
            o !== undefined && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
            var s = o !== undefined ? o : t.gpuAcceleration,
                a = b(e.instance.popper),
                l = w(a),
                u = {
                    position: i.position
                },
                c = {
                    left: Math.floor(i.left),
                    top: Math.round(i.top),
                    bottom: Math.round(i.bottom),
                    right: Math.floor(i.right)
                },
                f = "bottom" === n ? "top" : "bottom",
                d = "right" === r ? "left" : "right",
                h = P("transform"),
                p = void 0,
                m = void 0;
            if (m = "bottom" === f ? "HTML" === a.nodeName ? -a.clientHeight + c.bottom : -l.height + c.bottom : c.top, p = "right" === d ? "HTML" === a.nodeName ? -a.clientWidth + c.right : -l.width + c.right : c.left, s && h) u[h] = "translate3d(" + p + "px, " + m + "px, 0)", u[f] = 0, u[d] = 0, u.willChange = "transform";
            else {
                var g = "bottom" === f ? -1 : 1,
                    y = "right" === d ? -1 : 1;
                u[f] = m * g, u[d] = p * y, u.willChange = f + ", " + d
            }
            var v = {
                "x-placement": e.placement
            };
            return e.attributes = ye({}, v, e.attributes), e.styles = ye({}, u, e.styles), e.arrowStyles = ye({}, e.offsets.arrow, e.arrowStyles), e
        }

        function $(e, t, n) {
            var r = j(e, function(e) {
                    return e.name === t
                }),
                i = !!r && e.some(function(e) {
                    return e.name === n && e.enabled && e.order < r.order
                });
            if (!i) {
                var o = "`" + t + "`",
                    s = "`" + n + "`";
                console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
            }
            return i
        }

        function X(e, t) {
            var n;
            if (!$(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var r = t.element;
            if ("string" == typeof r) {
                if (!(r = e.instance.popper.querySelector(r))) return e
            } else if (!e.instance.popper.contains(r)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
            var i = e.placement.split("-")[0],
                o = e.offsets,
                s = o.popper,
                a = o.reference,
                l = -1 !== ["left", "right"].indexOf(i),
                u = l ? "height" : "width",
                c = l ? "Top" : "Left",
                f = c.toLowerCase(),
                d = l ? "left" : "top",
                h = l ? "bottom" : "right",
                p = I(r)[u];
            a[h] - p < s[f] && (e.offsets.popper[f] -= s[f] - (a[h] - p)), a[f] + p > s[h] && (e.offsets.popper[f] += a[f] + p - s[h]), e.offsets.popper = T(e.offsets.popper);
            var m = a[f] + a[u] / 2 - p / 2,
                g = _(e.instance.popper),
                y = parseFloat(g["margin" + c], 10),
                v = parseFloat(g["border" + c + "Width"], 10),
                b = m - e.offsets.popper[f] - y - v;
            return b = Math.max(Math.min(s[u] - p, b), 0), e.arrowElement = r, e.offsets.arrow = (ge(n = {}, f, Math.round(b)), ge(n, d, ""), n), e
        }

        function z(e) {
            return "end" === e ? "start" : "start" === e ? "end" : e
        }

        function Y(e, t) {
            var n = 1 < arguments.length && t !== undefined && arguments[1],
                r = be.indexOf(e),
                i = be.slice(r + 1).concat(be.slice(0, r));
            return n ? i.reverse() : i
        }

        function J(h, p) {
            if (n(h.instance.modifiers, "inner")) return h;
            if (h.flipped && h.placement === h.originalPlacement) return h;
            var m = D(h.instance.popper, h.instance.reference, p.padding, p.boundariesElement, h.positionFixed),
                g = h.placement.split("-")[0],
                y = N(g),
                v = h.placement.split("-")[1] || "",
                b = [];
            switch (p.behavior) {
                case _e.FLIP:
                    b = [g, y];
                    break;
                case _e.CLOCKWISE:
                    b = Y(g);
                    break;
                case _e.COUNTERCLOCKWISE:
                    b = Y(g, !0);
                    break;
                default:
                    b = p.behavior
            }
            return b.forEach(function(e, t) {
                if (g !== e || b.length === t + 1) return h;
                g = h.placement.split("-")[0], y = N(g);
                var n = h.offsets.popper,
                    r = h.offsets.reference,
                    i = Math.floor,
                    o = "left" === g && i(n.right) > i(r.left) || "right" === g && i(n.left) < i(r.right) || "top" === g && i(n.bottom) > i(r.top) || "bottom" === g && i(n.top) < i(r.bottom),
                    s = i(n.left) < i(m.left),
                    a = i(n.right) > i(m.right),
                    l = i(n.top) < i(m.top),
                    u = i(n.bottom) > i(m.bottom),
                    c = "left" === g && s || "right" === g && a || "top" === g && l || "bottom" === g && u,
                    f = -1 !== ["top", "bottom"].indexOf(g),
                    d = !!p.flipVariations && (f && "start" === v && s || f && "end" === v && a || !f && "start" === v && l || !f && "end" === v && u);
                (o || c || d) && (h.flipped = !0, (o || c) && (g = b[t + 1]), d && (v = z(v)), h.placement = g + (v ? "-" + v : ""), h.offsets.popper = ye({}, h.offsets.popper, k(h.instance.popper, h.offsets.reference, h.placement)), h = L(h.instance.modifiers, h, "flip"))
            }), h
        }

        function Z(e) {
            var t = e.offsets,
                n = t.popper,
                r = t.reference,
                i = e.placement.split("-")[0],
                o = Math.floor,
                s = -1 !== ["top", "bottom"].indexOf(i),
                a = s ? "right" : "bottom",
                l = s ? "left" : "top",
                u = s ? "width" : "height";
            return n[a] < o(r[l]) && (e.offsets.popper[l] = o(r[l]) - n[u]), n[l] > o(r[a]) && (e.offsets.popper[l] = o(r[a])), e
        }

        function ee(e, t, n, r) {
            var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                o = +i[1],
                s = i[2];
            if (!o) return e;
            if (0 === s.indexOf("%")) {
                var a = void 0;
                switch (s) {
                    case "%p":
                        a = n;
                        break;
                    case "%":
                    case "%r":
                    default:
                        a = r
                }
                return T(a)[t] / 100 * o
            }
            if ("vh" !== s && "vw" !== s) return o;
            return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o
        }

        function te(e, i, o, t) {
            var s = [0, 0],
                a = -1 !== ["right", "left"].indexOf(t),
                n = e.split(/(\+|\-)/).map(function(e) {
                    return e.trim()
                }),
                r = n.indexOf(j(n, function(e) {
                    return -1 !== e.search(/,|\s/)
                }));
            n[r] && -1 === n[r].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
            var l = /\s*,\s*|\s+/,
                u = -1 !== r ? [n.slice(0, r).concat([n[r].split(l)[0]]), [n[r].split(l)[1]].concat(n.slice(r + 1))] : [n];
            return (u = u.map(function(e, t) {
                var n = (1 === t ? !a : a) ? "height" : "width",
                    r = !1;
                return e.reduce(function(e, t) {
                    return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, r = !0, e) : r ? (e[e.length - 1] += t, r = !1, e) : e.concat(t)
                }, []).map(function(e) {
                    return ee(e, n, i, o)
                })
            })).forEach(function(n, r) {
                n.forEach(function(e, t) {
                    U(e) && (s[r] += e * ("-" === n[t - 1] ? -1 : 1))
                })
            }), s
        }

        function ne(e, t) {
            var n = t.offset,
                r = e.placement,
                i = e.offsets,
                o = i.popper,
                s = i.reference,
                a = r.split("-")[0],
                l = void 0;
            return l = U(+n) ? [+n, 0] : te(n, o, s, a), "left" === a ? (o.top += l[0], o.left -= l[1]) : "right" === a ? (o.top += l[0], o.left += l[1]) : "top" === a ? (o.left += l[0], o.top -= l[1]) : "bottom" === a && (o.left += l[0], o.top += l[1]), e.popper = o, e
        }

        function re(e, r) {
            var t = r.boundariesElement || b(e.instance.popper);
            e.instance.reference === t && (t = b(t));
            var n = P("transform"),
                i = e.instance.popper.style,
                o = i.top,
                s = i.left,
                a = i[n];
            i.top = "", i.left = "", i[n] = "";
            var l = D(e.instance.popper, e.instance.reference, r.padding, t, e.positionFixed);
            i.top = o, i.left = s, i[n] = a, r.boundaries = l;
            var u = r.priority,
                c = e.offsets.popper,
                f = {
                    primary: function d(e) {
                        var t = c[e];
                        return c[e] < l[e] && !r.escapeWithReference && (t = Math.max(c[e], l[e])), ge({}, e, t)
                    },
                    secondary: function h(e) {
                        var t = "right" === e ? "left" : "top",
                            n = c[t];
                        return c[e] > l[e] && !r.escapeWithReference && (n = Math.min(c[t], l[e] - ("right" === e ? c.width : c.height))), ge({}, t, n)
                    }
                };
            return u.forEach(function(e) {
                var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                c = ye({}, c, f[t](e))
            }), e.offsets.popper = c, e
        }

        function ie(e) {
            var t = e.placement,
                n = t.split("-")[0],
                r = t.split("-")[1];
            if (r) {
                var i = e.offsets,
                    o = i.reference,
                    s = i.popper,
                    a = -1 !== ["bottom", "top"].indexOf(n),
                    l = a ? "left" : "top",
                    u = a ? "width" : "height",
                    c = {
                        start: ge({}, l, o[l]),
                        end: ge({}, l, o[l] + o[u] - s[u])
                    };
                e.offsets.popper = ye({}, s, c[r])
            }
            return e
        }

        function oe(e) {
            if (!$(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
                n = j(e.instance.modifiers, function(e) {
                    return "preventOverflow" === e.name
                }).boundaries;
            if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                if (!0 === e.hide) return e;
                e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
            } else {
                if (!1 === e.hide) return e;
                e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
            }
            return e
        }

        function se(e) {
            var t = e.placement,
                n = t.split("-")[0],
                r = e.offsets,
                i = r.popper,
                o = r.reference,
                s = -1 !== ["left", "right"].indexOf(n),
                a = -1 === ["top", "left"].indexOf(n);
            return i[s ? "left" : "top"] = o[n] - (a ? i[s ? "width" : "height"] : 0), e.placement = N(t), e.offsets.popper = T(i), e
        }
        for (var ae = "undefined" != typeof window && "undefined" != typeof document, le = ["Edge", "Trident", "Firefox"], ue = 0, ce = 0; ce < le.length; ce += 1)
            if (ae && 0 <= navigator.userAgent.indexOf(le[ce])) {
                ue = 1;
                break
            } var fe = ae && window.Promise ? e : t,
            de = ae && !(!window.MSInputMethodContext || !document.documentMode),
            he = ae && /MSIE 10/.test(navigator.userAgent),
            pe = function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            me = function() {
                function r(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(e, t, n) {
                    return t && r(e.prototype, t), n && r(e, n), e
                }
            }(),
            ge = function(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            },
            ye = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            ve = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            be = ve.slice(3),
            _e = {
                FLIP: "flip",
                CLOCKWISE: "clockwise",
                COUNTERCLOCKWISE: "counterclockwise"
            },
            Ee = {
                placement: "bottom",
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function we() {},
                onUpdate: function Se() {},
                modifiers: {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: ie
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: ne,
                        offset: 0
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: re,
                        priority: ["left", "right", "top", "bottom"],
                        padding: 5,
                        boundariesElement: "scrollParent"
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: Z
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: X,
                        element: "[x-arrow]"
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: J,
                        behavior: "flip",
                        padding: 5,
                        boundariesElement: "viewport"
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: se
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: oe
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: Q,
                        gpuAcceleration: !0,
                        x: "bottom",
                        y: "right"
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: G,
                        onLoad: K,
                        gpuAcceleration: undefined
                    }
                }
            },
            Te = function() {
                function s(e, t, n) {
                    var r = this,
                        i = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                    pe(this, s), this.scheduleUpdate = function() {
                        return requestAnimationFrame(r.update)
                    }, this.update = fe(this.update.bind(this)), this.options = ye({}, s.Defaults, i), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = e && e.jquery ? e[0] : e, this.popper = t && t.jquery ? t[0] : t, this.options.modifiers = {}, Object.keys(ye({}, s.Defaults.modifiers, i.modifiers)).forEach(function(e) {
                        r.options.modifiers[e] = ye({}, s.Defaults.modifiers[e] || {}, i.modifiers ? i.modifiers[e] : {})
                    }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                        return ye({
                            name: e
                        }, r.options.modifiers[e])
                    }).sort(function(e, t) {
                        return e.order - t.order
                    }), this.modifiers.forEach(function(e) {
                        e.enabled && a(e.onLoad) && e.onLoad(r.reference, r.popper, r.options, e, r.state)
                    }), this.update();
                    var o = this.options.eventsEnabled;
                    o && this.enableEventListeners(), this.state.eventsEnabled = o
                }
                return me(s, [{
                    key: "update",
                    value: function e() {
                        return o.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function t() {
                        return R.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function n() {
                        return M.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function r() {
                        return F.call(this)
                    }
                }]), s
            }();
        return Te.Utils = ("undefined" != typeof window ? window : global).PopperUtils, Te.placements = ve, Te.Defaults = Ee, Te
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : e.Util = t(e.jQuery)
    }(this, function(e) {
        "use strict";
        return function(r) {
            function a(e) {
                return {}.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase()
            }

            function e() {
                return {
                    bindType: i,
                    delegateType: i,
                    handle: function t(e) {
                        return r(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : undefined
                    }
                }
            }

            function t(e) {
                var t = this,
                    n = !1;
                return r(this).one(l.TRANSITION_END, function() {
                    n = !0
                }), setTimeout(function() {
                    n || l.triggerTransitionEnd(t)
                }, e), this
            }

            function n() {
                r.fn.emulateTransitionEnd = t, r.event.special[l.TRANSITION_END] = e()
            }
            var i = "transitionend",
                o = 1e6,
                s = 1e3,
                l = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function u(e) {
                        for (; e += ~~(Math.random() * o), document.getElementById(e););
                        return e
                    },
                    getSelectorFromElement: function c(e) {
                        var t = e.getAttribute("data-target");
                        t && "#" !== t || (t = e.getAttribute("href") || "");
                        try {
                            return document.querySelector(t) ? t : null
                        } catch (n) {
                            return null
                        }
                    },
                    getTransitionDurationFromElement: function f(e) {
                        if (!e) return 0;
                        var t = r(e).css("transition-duration");
                        return parseFloat(t) ? (t = t.split(",")[0], parseFloat(t) * s) : 0
                    },
                    reflow: function d(e) {
                        return e.offsetHeight
                    },
                    triggerTransitionEnd: function h(e) {
                        r(e).trigger(i)
                    },
                    supportsTransitionEnd: function p() {
                        return Boolean(i)
                    },
                    isElement: function m(e) {
                        return (e[0] || e).nodeType
                    },
                    typeCheckConfig: function g(e, t, n) {
                        for (var r in n)
                            if (Object.prototype.hasOwnProperty.call(n, r)) {
                                var i = n[r],
                                    o = t[r],
                                    s = o && l.isElement(o) ? "element" : a(o);
                                if (!new RegExp(i).test(s)) throw new Error(e.toUpperCase() + ': Option "' + r + '" provided type "' + s + '" but expected type "' + i + '".')
                            }
                    }
                };
            return n(), l
        }(e = e && e.hasOwnProperty("default") ? e["default"] : e)
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : e.ScrollSpy = t(e.jQuery, e.Util)
    }(this, function(e, h) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function p(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function m(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                    r = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))), r.forEach(function(e) {
                    i(t, e, n[e])
                })
            }
            return t
        }
        var g, y, v, b, _, t, n, E, T, w, S, C, A, o;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, h = h && h.hasOwnProperty("default") ? h["default"] : h, y = "scrollspy", v = "4.1.3", _ = "." + (b = "bs.scrollspy"), t = ".data-api", n = (g = e).fn[y], E = {
            offset: 10,
            method: "auto",
            target: ""
        }, T = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        }, w = {
            ACTIVATE: "activate" + _,
            SCROLL: "scroll" + _,
            LOAD_DATA_API: "load" + _ + t
        }, S = {
            DROPDOWN_ITEM: "dropdown-item",
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active"
        }, C = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            NAV_ITEMS: ".nav-item",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle"
        }, A = {
            OFFSET: "offset",
            POSITION: "position"
        }, o = function() {
            function n(e, t) {
                var n = this;
                this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + C.NAV_LINKS + "," + this._config.target + " " + C.LIST_ITEMS + "," + this._config.target + " " + C.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, g(this._scrollElement).on(w.SCROLL, function(e) {
                    return n._process(e)
                }), this.refresh(), this._process()
            }
            var e = n.prototype;
            return e.refresh = function r() {
                var t = this,
                    e = this._scrollElement === this._scrollElement.window ? A.OFFSET : A.POSITION,
                    i = "auto" === this._config.method ? e : this._config.method,
                    o = i === A.POSITION ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(e) {
                    var t, n = h.getSelectorFromElement(e);
                    if (n && (t = document.querySelector(n)), t) {
                        var r = t.getBoundingClientRect();
                        if (r.width || r.height) return [g(t)[i]().top + o, n]
                    }
                    return null
                }).filter(function(e) {
                    return e
                }).sort(function(e, t) {
                    return e[0] - t[0]
                }).forEach(function(e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                })
            }, e.dispose = function t() {
                g.removeData(this._element, b), g(this._scrollElement).off(_), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, e._getConfig = function i(e) {
                if ("string" != typeof(e = m({}, E, "object" == typeof e && e ? e : {})).target) {
                    var t = g(e.target).attr("id");
                    t || (t = h.getUID(y), g(e.target).attr("id", t)), e.target = "#" + t
                }
                return h.typeCheckConfig(y, e, T), e
            }, e._getScrollTop = function o() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, e._getScrollHeight = function s() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, e._getOffsetHeight = function a() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, e._process = function l() {
                var e = this._getScrollTop() + this._config.offset,
                    t = this._getScrollHeight(),
                    n = this._config.offset + t - this._getOffsetHeight();
                if (this._scrollHeight !== t && this.refresh(), n <= e) {
                    var r = this._targets[this._targets.length - 1];
                    this._activeTarget !== r && this._activate(r)
                } else {
                    if (this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var i = this._offsets.length; i--;) {
                        this._activeTarget !== this._targets[i] && e >= this._offsets[i] && ("undefined" == typeof this._offsets[i + 1] || e < this._offsets[i + 1]) && this._activate(this._targets[i])
                    }
                }
            }, e._activate = function u(t) {
                this._activeTarget = t, this._clear();
                var e = this._selector.split(",");
                e = e.map(function(e) {
                    return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                });
                var n = g([].slice.call(document.querySelectorAll(e.join(","))));
                n.hasClass(S.DROPDOWN_ITEM) ? (n.closest(C.DROPDOWN).find(C.DROPDOWN_TOGGLE).addClass(S.ACTIVE), n.addClass(S.ACTIVE)) : (n.addClass(S.ACTIVE), n.parents(C.NAV_LIST_GROUP).prev(C.NAV_LINKS + ", " + C.LIST_ITEMS).addClass(S.ACTIVE), n.parents(C.NAV_LIST_GROUP).prev(C.NAV_ITEMS).children(C.NAV_LINKS).addClass(S.ACTIVE)), g(this._scrollElement).trigger(w.ACTIVATE, {
                    relatedTarget: t
                })
            }, e._clear = function c() {
                var e = [].slice.call(document.querySelectorAll(this._selector));
                g(e).filter(C.ACTIVE).removeClass(S.ACTIVE)
            }, n._jQueryInterface = function f(t) {
                return this.each(function() {
                    var e = g(this).data(b);
                    if (e || (e = new n(this, "object" == typeof t && t), g(this).data(b, e)), "string" == typeof t) {
                        if ("undefined" == typeof e[t]) throw new TypeError('No method named "' + t + '"');
                        e[t]()
                    }
                })
            }, p(n, null, [{
                key: "VERSION",
                get: function d() {
                    return v
                }
            }, {
                key: "Default",
                get: function d() {
                    return E
                }
            }]), n
        }(), g(window).on(w.LOAD_DATA_API, function() {
            for (var e = [].slice.call(document.querySelectorAll(C.DATA_SPY)), t = e.length; t--;) {
                var n = g(e[t]);
                o._jQueryInterface.call(n, n.data())
            }
        }), g.fn[y] = o._jQueryInterface, g.fn[y].Constructor = o, g.fn[y].noConflict = function() {
            return g.fn[y] = n, o._jQueryInterface
        }, o
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : e.Collapse = t(e.jQuery, e.Util)
    }(this, function(e, p) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function m(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function g(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                    r = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))), r.forEach(function(e) {
                    i(t, e, n[e])
                })
            }
            return t
        }
        var y, v, b, _, t, n, o, E, T, w, S, C, A, s;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, p = p && p.hasOwnProperty("default") ? p["default"] : p, v = "collapse", b = "4.1.3", t = "." + (_ = "bs.collapse"), n = ".data-api", o = (y = e).fn[v], E = {
            toggle: !0,
            parent: ""
        }, T = {
            toggle: "boolean",
            parent: "(string|element)"
        }, w = {
            SHOW: "show" + t,
            SHOWN: "shown" + t,
            HIDE: "hide" + t,
            HIDDEN: "hidden" + t,
            CLICK_DATA_API: "click" + t + n
        }, S = {
            SHOW: "show",
            COLLAPSE: "collapse",
            COLLAPSING: "collapsing",
            COLLAPSED: "collapsed"
        }, C = {
            WIDTH: "width",
            HEIGHT: "height"
        }, A = {
            ACTIVES: ".show, .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]'
        }, s = function() {
            function l(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = y.makeArray(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(A.DATA_TOGGLE)), r = 0, i = n.length; r < i; r++) {
                    var o = n[r],
                        s = p.getSelectorFromElement(o),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function(e) {
                            return e === t
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(o))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var e = l.prototype;
            return e.toggle = function t() {
                y(this._element).hasClass(S.SHOW) ? this.hide() : this.show()
            }, e.show = function u() {
                var e, t, n = this;
                if (!this._isTransitioning && !y(this._element).hasClass(S.SHOW) && (this._parent && 0 === (e = [].slice.call(this._parent.querySelectorAll(A.ACTIVES)).filter(function(e) {
                        return e.getAttribute("data-parent") === n._config.parent
                    })).length && (e = null), !(e && (t = y(e).not(this._selector).data(_)) && t._isTransitioning))) {
                    var r = y.Event(w.SHOW);
                    if (y(this._element).trigger(r), !r.isDefaultPrevented()) {
                        e && (l._jQueryInterface.call(y(e).not(this._selector), "hide"), t || y(e).data(_, null));
                        var i = this._getDimension();
                        y(this._element).removeClass(S.COLLAPSE).addClass(S.COLLAPSING), this._element.style[i] = 0, this._triggerArray.length && y(this._triggerArray).removeClass(S.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var o = function o() {
                                y(n._element).removeClass(S.COLLAPSING).addClass(S.COLLAPSE).addClass(S.SHOW), n._element.style[i] = "", n.setTransitioning(!1), y(n._element).trigger(w.SHOWN)
                            },
                            s = "scroll" + (i[0].toUpperCase() + i.slice(1)),
                            a = p.getTransitionDurationFromElement(this._element);
                        y(this._element).one(p.TRANSITION_END, o).emulateTransitionEnd(a), this._element.style[i] = this._element[s] + "px"
                    }
                }
            }, e.hide = function c() {
                var e = this;
                if (!this._isTransitioning && y(this._element).hasClass(S.SHOW)) {
                    var t = y.Event(w.HIDE);
                    if (y(this._element).trigger(t), !t.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", p.reflow(this._element), y(this._element).addClass(S.COLLAPSING).removeClass(S.COLLAPSE).removeClass(S.SHOW);
                        var r = this._triggerArray.length;
                        if (0 < r)
                            for (var i = 0; i < r; i++) {
                                var o = this._triggerArray[i],
                                    s = p.getSelectorFromElement(o);
                                if (null !== s) y([].slice.call(document.querySelectorAll(s))).hasClass(S.SHOW) || y(o).addClass(S.COLLAPSED).attr("aria-expanded", !1)
                            }
                        this.setTransitioning(!0);
                        var a = function a() {
                            e.setTransitioning(!1), y(e._element).removeClass(S.COLLAPSING).addClass(S.COLLAPSE).trigger(w.HIDDEN)
                        };
                        this._element.style[n] = "";
                        var l = p.getTransitionDurationFromElement(this._element);
                        y(this._element).one(p.TRANSITION_END, a).emulateTransitionEnd(l)
                    }
                }
            }, e.setTransitioning = function n(e) {
                this._isTransitioning = e
            }, e.dispose = function r() {
                y.removeData(this._element, _), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, e._getConfig = function i(e) {
                return (e = g({}, E, e)).toggle = Boolean(e.toggle), p.typeCheckConfig(v, e, T), e
            }, e._getDimension = function o() {
                return y(this._element).hasClass(C.WIDTH) ? C.WIDTH : C.HEIGHT
            }, e._getParent = function s() {
                var n = this,
                    e = null;
                p.isElement(this._config.parent) ? (e = this._config.parent, "undefined" != typeof this._config.parent.jquery && (e = this._config.parent[0])) : e = document.querySelector(this._config.parent);
                var t = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    r = [].slice.call(e.querySelectorAll(t));
                return y(r).each(function(e, t) {
                    n._addAriaAndCollapsedClass(l._getTargetFromElement(t), [t])
                }), e
            }, e._addAriaAndCollapsedClass = function a(e, t) {
                if (e) {
                    var n = y(e).hasClass(S.SHOW);
                    t.length && y(t).toggleClass(S.COLLAPSED, !n).attr("aria-expanded", n)
                }
            }, l._getTargetFromElement = function f(e) {
                var t = p.getSelectorFromElement(e);
                return t ? document.querySelector(t) : null
            }, l._jQueryInterface = function d(r) {
                return this.each(function() {
                    var e = y(this),
                        t = e.data(_),
                        n = g({}, E, e.data(), "object" == typeof r && r ? r : {});
                    if (!t && n.toggle && /show|hide/.test(r) && (n.toggle = !1), t || (t = new l(this, n), e.data(_, t)), "string" == typeof r) {
                        if ("undefined" == typeof t[r]) throw new TypeError('No method named "' + r + '"');
                        t[r]()
                    }
                })
            }, m(l, null, [{
                key: "VERSION",
                get: function h() {
                    return b
                }
            }, {
                key: "Default",
                get: function h() {
                    return E
                }
            }]), l
        }(), y(document).on(w.CLICK_DATA_API, A.DATA_TOGGLE, function(e) {
            "A" === e.currentTarget.tagName && e.preventDefault();
            var n = y(this),
                t = p.getSelectorFromElement(this),
                r = [].slice.call(document.querySelectorAll(t));
            y(r).each(function() {
                var e = y(this),
                    t = e.data(_) ? "toggle" : n.data();
                s._jQueryInterface.call(e, t)
            })
        }), y.fn[v] = s._jQueryInterface, y.fn[v].Constructor = s, y.fn[v].noConflict = function() {
            return y.fn[v] = o, s._jQueryInterface
        }, s
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : e.Alert = t(e.jQuery, e.Util)
    }(this, function(e, f) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function d(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }
        var h, t, p, m, n, i, o, s, g, y, a;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, f = f && f.hasOwnProperty("default") ? f["default"] : f, t = "alert", p = "4.1.3", n = "." + (m = "bs.alert"), i = ".data-api", o = (h = e).fn[t], s = {
            DISMISS: '[data-dismiss="alert"]'
        }, g = {
            CLOSE: "close" + n,
            CLOSED: "closed" + n,
            CLICK_DATA_API: "click" + n + i
        }, y = {
            ALERT: "alert",
            FADE: "fade",
            SHOW: "show"
        }, a = function() {
            function r(e) {
                this._element = e
            }
            var e = r.prototype;
            return e.close = function n(e) {
                var t = this._element;
                e && (t = this._getRootElement(e)), this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
            }, e.dispose = function t() {
                h.removeData(this._element, m), this._element = null
            }, e._getRootElement = function i(e) {
                var t = f.getSelectorFromElement(e),
                    n = !1;
                return t && (n = document.querySelector(t)), n || (n = h(e).closest("." + y.ALERT)[0]), n
            }, e._triggerCloseEvent = function o(e) {
                var t = h.Event(g.CLOSE);
                return h(e).trigger(t), t
            }, e._removeElement = function s(t) {
                var n = this;
                if (h(t).removeClass(y.SHOW), h(t).hasClass(y.FADE)) {
                    var e = f.getTransitionDurationFromElement(t);
                    h(t).one(f.TRANSITION_END, function(e) {
                        return n._destroyElement(t, e)
                    }).emulateTransitionEnd(e)
                } else this._destroyElement(t)
            }, e._destroyElement = function a(e) {
                h(e).detach().trigger(g.CLOSED).remove()
            }, r._jQueryInterface = function l(n) {
                return this.each(function() {
                    var e = h(this),
                        t = e.data(m);
                    t || (t = new r(this), e.data(m, t)), "close" === n && t[n](this)
                })
            }, r._handleDismiss = function u(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, d(r, null, [{
                key: "VERSION",
                get: function c() {
                    return p
                }
            }]), r
        }(), h(document).on(g.CLICK_DATA_API, s.DISMISS, a._handleDismiss(new a)), h.fn[t] = a._jQueryInterface, h.fn[t].Constructor = a, h.fn[t].noConflict = function() {
            return h.fn[t] = o, a._jQueryInterface
        }, a
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("popper.js"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "popper.js", "./util.js"], t) : e.Tooltip = t(e.jQuery, e.Popper, e.Util)
    }(this, function(e, O, I) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function N(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function k(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                    r = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))), r.forEach(function(e) {
                    i(t, e, n[e])
                })
            }
            return t
        }
        var j, L, P, R, H, t, q, M, W, F, U, B, V, G, K, Q, n;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, O = O && O.hasOwnProperty("default") ? O["default"] : O, I = I && I.hasOwnProperty("default") ? I["default"] : I, L = "tooltip", P = "4.1.3", H = "." + (R = "bs.tooltip"), t = (j = e).fn[L], q = "bs-tooltip", M = new RegExp("(^|\\s)" + q + "\\S+", "g"), U = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !(F = {
                AUTO: "auto",
                TOP: "top",
                RIGHT: "right",
                BOTTOM: "bottom",
                LEFT: "left"
            }),
            selector: !(W = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "(number|string)",
                container: "(string|element|boolean)",
                fallbackPlacement: "(string|array)",
                boundary: "(string|element)"
            }),
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent"
        }, B = {
            SHOW: "show",
            OUT: "out"
        }, V = {
            HIDE: "hide" + H,
            HIDDEN: "hidden" + H,
            SHOW: "show" + H,
            SHOWN: "shown" + H,
            INSERTED: "inserted" + H,
            CLICK: "click" + H,
            FOCUSIN: "focusin" + H,
            FOCUSOUT: "focusout" + H,
            MOUSEENTER: "mouseenter" + H,
            MOUSELEAVE: "mouseleave" + H
        }, G = {
            FADE: "fade",
            SHOW: "show"
        }, K = {
            TOOLTIP: ".tooltip",
            TOOLTIP_INNER: ".tooltip-inner",
            ARROW: ".arrow"
        }, Q = {
            HOVER: "hover",
            FOCUS: "focus",
            CLICK: "click",
            MANUAL: "manual"
        }, n = function() {
            function r(e, t) {
                if (void 0 === O) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
            }
            var e = r.prototype;
            return e.enable = function t() {
                this._isEnabled = !0
            }, e.disable = function n() {
                this._isEnabled = !1
            }, e.toggleEnabled = function i() {
                this._isEnabled = !this._isEnabled
            }, e.toggle = function o(e) {
                if (this._isEnabled)
                    if (e) {
                        var t = this.constructor.DATA_KEY,
                            n = j(e.currentTarget).data(t);
                        n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), j(e.currentTarget).data(t, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (j(this.getTipElement()).hasClass(G.SHOW)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, e.dispose = function s() {
                clearTimeout(this._timeout), j.removeData(this.element, this.constructor.DATA_KEY), j(this.element).off(this.constructor.EVENT_KEY), j(this.element).closest(".modal").off("hide.bs.modal"), this.tip && j(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, e.show = function d() {
                var t = this;
                if ("none" === j(this.element).css("display")) throw new Error("Please use show on visible elements");
                var e = j.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    j(this.element).trigger(e);
                    var n = j.contains(this.element.ownerDocument.documentElement, this.element);
                    if (e.isDefaultPrevented() || !n) return;
                    var r = this.getTipElement(),
                        i = I.getUID(this.constructor.NAME);
                    r.setAttribute("id", i), this.element.setAttribute("aria-describedby", i), this.setContent(), this.config.animation && j(r).addClass(G.FADE);
                    var o = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                        s = this._getAttachment(o);
                    this.addAttachmentClass(s);
                    var a = !1 === this.config.container ? document.body : j(document).find(this.config.container);
                    j(r).data(this.constructor.DATA_KEY, this), j.contains(this.element.ownerDocument.documentElement, this.tip) || j(r).appendTo(a), j(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new O(this.element, r, {
                        placement: s,
                        modifiers: {
                            offset: {
                                offset: this.config.offset
                            },
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: K.ARROW
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function c(e) {
                            e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                        },
                        onUpdate: function f(e) {
                            t._handlePopperPlacementChange(e)
                        }
                    }), j(r).addClass(G.SHOW), "ontouchstart" in document.documentElement && j(document.body).children().on("mouseover", null, j.noop);
                    var l = function l() {
                        t.config.animation && t._fixTransition();
                        var e = t._hoverState;
                        t._hoverState = null, j(t.element).trigger(t.constructor.Event.SHOWN), e === B.OUT && t._leave(null, t)
                    };
                    if (j(this.tip).hasClass(G.FADE)) {
                        var u = I.getTransitionDurationFromElement(this.tip);
                        j(this.tip).one(I.TRANSITION_END, l).emulateTransitionEnd(u)
                    } else l()
                }
            }, e.hide = function a(e) {
                var t = this,
                    n = this.getTipElement(),
                    r = j.Event(this.constructor.Event.HIDE),
                    i = function i() {
                        t._hoverState !== B.SHOW && n.parentNode && n.parentNode.removeChild(n), t._cleanTipClass(), t.element.removeAttribute("aria-describedby"), j(t.element).trigger(t.constructor.Event.HIDDEN), null !== t._popper && t._popper.destroy(), e && e()
                    };
                if (j(this.element).trigger(r), !r.isDefaultPrevented()) {
                    if (j(n).removeClass(G.SHOW), "ontouchstart" in document.documentElement && j(document.body).children().off("mouseover", null, j.noop), this._activeTrigger[Q.CLICK] = !1, this._activeTrigger[Q.FOCUS] = !1, this._activeTrigger[Q.HOVER] = !1, j(this.tip).hasClass(G.FADE)) {
                        var o = I.getTransitionDurationFromElement(n);
                        j(n).one(I.TRANSITION_END, i).emulateTransitionEnd(o)
                    } else i();
                    this._hoverState = ""
                }
            }, e.update = function l() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, e.isWithContent = function u() {
                return Boolean(this.getTitle())
            }, e.addAttachmentClass = function c(e) {
                j(this.getTipElement()).addClass(q + "-" + e)
            }, e.getTipElement = function f() {
                return this.tip = this.tip || j(this.config.template)[0], this.tip
            }, e.setContent = function h() {
                var e = this.getTipElement();
                this.setElementContent(j(e.querySelectorAll(K.TOOLTIP_INNER)), this.getTitle()), j(e).removeClass(G.FADE + " " + G.SHOW)
            }, e.setElementContent = function p(e, t) {
                var n = this.config.html;
                "object" == typeof t && (t.nodeType || t.jquery) ? n ? j(t).parent().is(e) || e.empty().append(t) : e.text(j(t).text()) : e[n ? "html" : "text"](t)
            }, e.getTitle = function m() {
                var e = this.element.getAttribute("data-original-title");
                return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
            }, e._getAttachment = function g(e) {
                return F[e.toUpperCase()]
            }, e._setListeners = function y() {
                var r = this;
                this.config.trigger.split(" ").forEach(function(e) {
                    if ("click" === e) j(r.element).on(r.constructor.Event.CLICK, r.config.selector, function(e) {
                        return r.toggle(e)
                    });
                    else if (e !== Q.MANUAL) {
                        var t = e === Q.HOVER ? r.constructor.Event.MOUSEENTER : r.constructor.Event.FOCUSIN,
                            n = e === Q.HOVER ? r.constructor.Event.MOUSELEAVE : r.constructor.Event.FOCUSOUT;
                        j(r.element).on(t, r.config.selector, function(e) {
                            return r._enter(e)
                        }).on(n, r.config.selector, function(e) {
                            return r._leave(e)
                        })
                    }
                    j(r.element).closest(".modal").on("hide.bs.modal", function() {
                        return r.hide()
                    })
                }), this.config.selector ? this.config = k({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, e._fixTitle = function v() {
                var e = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, e._enter = function b(e, t) {
                var n = this.constructor.DATA_KEY;
                (t = t || j(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), j(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusin" === e.type ? Q.FOCUS : Q.HOVER] = !0), j(t.getTipElement()).hasClass(G.SHOW) || t._hoverState === B.SHOW ? t._hoverState = B.SHOW : (clearTimeout(t._timeout), t._hoverState = B.SHOW, t.config.delay && t.config.delay.show ? t._timeout = setTimeout(function() {
                    t._hoverState === B.SHOW && t.show()
                }, t.config.delay.show) : t.show())
            }, e._leave = function _(e, t) {
                var n = this.constructor.DATA_KEY;
                (t = t || j(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), j(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusout" === e.type ? Q.FOCUS : Q.HOVER] = !1), t._isWithActiveTrigger() || (clearTimeout(t._timeout), t._hoverState = B.OUT, t.config.delay && t.config.delay.hide ? t._timeout = setTimeout(function() {
                    t._hoverState === B.OUT && t.hide()
                }, t.config.delay.hide) : t.hide())
            }, e._isWithActiveTrigger = function E() {
                for (var e in this._activeTrigger)
                    if (this._activeTrigger[e]) return !0;
                return !1
            }, e._getConfig = function T(e) {
                return "number" == typeof(e = k({}, this.constructor.Default, j(this.element).data(), "object" == typeof e && e ? e : {})).delay && (e.delay = {
                    show: e.delay,
                    hide: e.delay
                }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), I.typeCheckConfig(L, e, this.constructor.DefaultType), e
            }, e._getDelegateConfig = function w() {
                var e = {};
                if (this.config)
                    for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                return e
            }, e._cleanTipClass = function S() {
                var e = j(this.getTipElement()),
                    t = e.attr("class").match(M);
                null !== t && t.length && e.removeClass(t.join(""))
            }, e._handlePopperPlacementChange = function C(e) {
                var t = e.instance;
                this.tip = t.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(e.placement))
            }, e._fixTransition = function A() {
                var e = this.getTipElement(),
                    t = this.config.animation;
                null === e.getAttribute("x-placement") && (j(e).removeClass(G.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = t)
            }, r._jQueryInterface = function x(n) {
                return this.each(function() {
                    var e = j(this).data(R),
                        t = "object" == typeof n && n;
                    if ((e || !/dispose|hide/.test(n)) && (e || (e = new r(this, t), j(this).data(R, e)), "string" == typeof n)) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, N(r, null, [{
                key: "VERSION",
                get: function D() {
                    return P
                }
            }, {
                key: "Default",
                get: function D() {
                    return U
                }
            }, {
                key: "NAME",
                get: function D() {
                    return L
                }
            }, {
                key: "DATA_KEY",
                get: function D() {
                    return R
                }
            }, {
                key: "Ev
ent",
                get: function D() {
                    return V
                }
            }, {
                key: "EVENT_KEY",
                get: function D() {
                    return H
                }
            }, {
                key: "DefaultType",
                get: function D() {
                    return W
                }
            }]), r
        }(), j.fn[L] = n._jQueryInterface, j.fn[L].Constructor = n, j.fn[L].noConflict = function() {
            return j.fn[L] = t, n._jQueryInterface
        }, n
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./tooltip.js")) : "function" == typeof define && define.amd ? define(["jquery", "./tooltip.js"], t) : e.Popover = t(e.jQuery, e.Tooltip)
    }(this, function(e, t) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function f(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function n(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                    r = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))), r.forEach(function(e) {
                    i(t, e, n[e])
                })
            }
            return t
        }

        function d(e, t) {
            e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
        }
        var h, p, m, g, y, o, v, b, _, E, T, w, S, s;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, t = t && t.hasOwnProperty("default") ? t["default"] : t, p = "popover", m = "4.1.3", y = "." + (g = "bs.popover"), o = (h = e).fn[p], v = "bs-popover", b = new RegExp("(^|\\s)" + v + "\\S+", "g"), _ = n({}, t.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), E = n({}, t.DefaultType, {
            content: "(string|element|function)"
        }), T = {
            FADE: "fade",
            SHOW: "show"
        }, w = {
            TITLE: ".popover-header",
            CONTENT: ".popover-body"
        }, S = {
            HIDE: "hide" + y,
            HIDDEN: "hidden" + y,
            SHOW: "show" + y,
            SHOWN: "shown" + y,
            INSERTED: "inserted" + y,
            CLICK: "click" + y,
            FOCUSIN: "focusin" + y,
            FOCUSOUT: "focusout" + y,
            MOUSEENTER: "mouseenter" + y,
            MOUSELEAVE: "mouseleave" + y
        }, s = function(e) {
            function r() {
                return e.apply(this, arguments) || this
            }
            d(r, e);
            var t = r.prototype;
            return t.isWithContent = function n() {
                return this.getTitle() || this._getContent()
            }, t.addAttachmentClass = function i(e) {
                h(this.getTipElement()).addClass(v + "-" + e)
            }, t.getTipElement = function o() {
                return this.tip = this.tip || h(this.config.template)[0], this.tip
            }, t.setContent = function s() {
                var e = h(this.getTipElement());
                this.setElementContent(e.find(w.TITLE), this.getTitle());
                var t = this._getContent();
                "function" == typeof t && (t = t.call(this.element)), this.setElementContent(e.find(w.CONTENT), t), e.removeClass(T.FADE + " " + T.SHOW)
            }, t._getContent = function a() {
                return this.element.getAttribute("data-content") || this.config.content
            }, t._cleanTipClass = function l() {
                var e = h(this.getTipElement()),
                    t = e.attr("class").match(b);
                null !== t && 0 < t.length && e.removeClass(t.join(""))
            }, r._jQueryInterface = function u(n) {
                return this.each(function() {
                    var e = h(this).data(g),
                        t = "object" == typeof n ? n : null;
                    if ((e || !/destroy|hide/.test(n)) && (e || (e = new r(this, t), h(this).data(g, e)), "string" == typeof n)) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, f(r, null, [{
                key: "VERSION",
                get: function c() {
                    return m
                }
            }, {
                key: "Default",
                get: function c() {
                    return _
                }
            }, {
                key: "NAME",
                get: function c() {
                    return p
                }
            }, {
                key: "DATA_KEY",
                get: function c() {
                    return g
                }
            }, {
                key: "Event",
                get: function c() {
                    return S
                }
            }, {
                key: "EVENT_KEY",
                get: function c() {
                    return y
                }
            }, {
                key: "DefaultType",
                get: function c() {
                    return E
                }
            }]), r
        }(t), h.fn[p] = s._jQueryInterface, h.fn[p].Constructor = s, h.fn[p].noConflict = function() {
            return h.fn[p] = o, s._jQueryInterface
        }, s
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("popper.js"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "popper.js", "./util.js"], t) : e.Dropdown = t(e.jQuery, e.Popper, e.Util)
    }(this, function(e, g, y) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function v(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function b(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                    r = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))), r.forEach(function(e) {
                    i(t, e, n[e])
                })
            }
            return t
        }
        var _, E, T, w, S, t, n, C, A, x, D, O, I, N, k, j, L, P, R, H, o;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, g = g && g.hasOwnProperty("default") ? g["default"] : g, y = y && y.hasOwnProperty("default") ? y["default"] : y, E = "dropdown", T = "4.1.3", S = "." + (w = "bs.dropdown"), t = ".data-api", n = (_ = e).fn[E], C = 27, A = 32, x = 9, D = 38, O = 40, I = 3, N = new RegExp(D + "|" + O + "|" + C), k = {
            HIDE: "hide" + S,
            HIDDEN: "hidden" + S,
            SHOW: "show" + S,
            SHOWN: "shown" + S,
            CLICK: "click" + S,
            CLICK_DATA_API: "click" + S + t,
            KEYDOWN_DATA_API: "keydown" + S + t,
            KEYUP_DATA_API: "keyup" + S + t
        }, j = {
            DISABLED: "disabled",
            SHOW: "show",
            DROPUP: "dropup",
            DROPRIGHT: "dropright",
            DROPLEFT: "dropleft",
            MENURIGHT: "dropdown-menu-right",
            MENULEFT: "dropdown-menu-left",
            POSITION_STATIC: "position-static"
        }, L = {
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: ".dropdown form",
            MENU: ".dropdown-menu",
            NAVBAR_NAV: ".navbar-nav",
            VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
        }, P = {
            TOP: "top-start",
            TOPEND: "top-end",
            BOTTOM: "bottom-start",
            BOTTOMEND: "bottom-end",
            RIGHT: "right-start",
            RIGHTEND: "right-end",
            LEFT: "left-start",
            LEFTEND: "left-end"
        }, R = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        }, H = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        }, o = function() {
            function u(e, t) {
                this._element = e, this._popper = null, this._config = this._getConfig(t), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var e = u.prototype;
            return e.toggle = function o() {
                if (!this._element.disabled && !_(this._element).hasClass(j.DISABLED)) {
                    var e = u._getParentFromElement(this._element),
                        t = _(this._menu).hasClass(j.SHOW);
                    if (u._clearMenus(), !t) {
                        var n = {
                                relatedTarget: this._element
                            },
                            r = _.Event(k.SHOW, n);
                        if (_(e).trigger(r), !r.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if (void 0 === g) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                var i = this._element;
                                "parent" === this._config.reference ? i = e : y.isElement(this._config.reference) && (i = this._config.reference, "undefined" != typeof this._config.reference.jquery && (i = this._config.reference[0])), "scrollParent" !== this._config.boundary && _(e).addClass(j.POSITION_STATIC), this._popper = new g(i, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === _(e).closest(L.NAVBAR_NAV).length && _(document.body).children().on("mouseover", null, _.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), _(this._menu).toggleClass(j.SHOW), _(e).toggleClass(j.SHOW).trigger(_.Event(k.SHOWN, n))
                        }
                    }
                }
            }, e.dispose = function t() {
                _.removeData(this._element, w), _(this._element).off(S), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, e.update = function n() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, e._addEventListeners = function r() {
                var t = this;
                _(this._element).on(k.CLICK, function(e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                })
            }, e._getConfig = function i(e) {
                return e = b({}, this.constructor.Default, _(this._element).data(), e), y.typeCheckConfig(E, e, this.constructor.DefaultType), e
            }, e._getMenuElement = function s() {
                if (!this._menu) {
                    var e = u._getParentFromElement(this._element);
                    e && (this._menu = e.querySelector(L.MENU))
                }
                return this._menu
            }, e._getPlacement = function a() {
                var e = _(this._element.parentNode),
                    t = P.BOTTOM;
                return e.hasClass(j.DROPUP) ? (t = P.TOP, _(this._menu).hasClass(j.MENURIGHT) && (t = P.TOPEND)) : e.hasClass(j.DROPRIGHT) ? t = P.RIGHT : e.hasClass(j.DROPLEFT) ? t = P.LEFT : _(this._menu).hasClass(j.MENURIGHT) && (t = P.BOTTOMEND), t
            }, e._detectNavbar = function l() {
                return 0 < _(this._element).closest(".navbar").length
            }, e._getPopperConfig = function c() {
                var t = this,
                    e = {};
                "function" == typeof this._config.offset ? e.fn = function(e) {
                    return e.offsets = b({}, e.offsets, t._config.offset(e.offsets) || {}), e
                } : e.offset = this._config.offset;
                var n = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: e,
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (n.modifiers.applyStyle = {
                    enabled: !1
                }), n
            }, u._jQueryInterface = function f(t) {
                return this.each(function() {
                    var e = _(this).data(w);
                    if (e || (e = new u(this, "object" == typeof t ? t : null), _(this).data(w, e)), "string" == typeof t) {
                        if ("undefined" == typeof e[t]) throw new TypeError('No method named "' + t + '"');
                        e[t]()
                    }
                })
            }, u._clearMenus = function d(e) {
                if (!e || e.which !== I && ("keyup" !== e.type || e.which === x))
                    for (var t = [].slice.call(document.querySelectorAll(L.DATA_TOGGLE)), n = 0, r = t.length; n < r; n++) {
                        var i = u._getParentFromElement(t[n]),
                            o = _(t[n]).data(w),
                            s = {
                                relatedTarget: t[n]
                            };
                        if (e && "click" === e.type && (s.clickEvent = e), o) {
                            var a = o._menu;
                            if (_(i).hasClass(j.SHOW) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && e.which === x) && _.contains(i, e.target))) {
                                var l = _.Event(k.HIDE, s);
                                _(i).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && _(document.body).children().off("mouseover", null, _.noop), t[n].setAttribute("aria-expanded", "false"), _(a).removeClass(j.SHOW), _(i).removeClass(j.SHOW).trigger(_.Event(k.HIDDEN, s)))
                            }
                        }
                    }
            }, u._getParentFromElement = function h(e) {
                var t, n = y.getSelectorFromElement(e);
                return n && (t = document.querySelector(n)), t || e.parentNode
            }, u._dataApiKeydownHandler = function p(e) {
                if ((/input|textarea/i.test(e.target.tagName) ? !(e.which === A || e.which !== C && (e.which !== O && e.which !== D || _(e.target).closest(L.MENU).length)) : N.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !_(this).hasClass(j.DISABLED))) {
                    var t = u._getParentFromElement(this),
                        n = _(t).hasClass(j.SHOW);
                    if ((n || e.which === C && e.which === A) && (!n || e.which !== C && e.which !== A)) {
                        var r = [].slice.call(t.querySelectorAll(L.VISIBLE_ITEMS));
                        if (0 !== r.length) {
                            var i = r.indexOf(e.target);
                            e.which === D && 0 < i && i--, e.which === O && i < r.length - 1 && i++, i < 0 && (i = 0), r[i].focus()
                        }
                    } else {
                        if (e.which === C) {
                            var o = t.querySelector(L.DATA_TOGGLE);
                            _(o).trigger("focus")
                        }
                        _(this).trigger("click")
                    }
                }
            }, v(u, null, [{
                key: "VERSION",
                get: function m() {
                    return T
                }
            }, {
                key: "Default",
                get: function m() {
                    return R
                }
            }, {
                key: "DefaultType",
                get: function m() {
                    return H
                }
            }]), u
        }(), _(document).on(k.KEYDOWN_DATA_API, L.DATA_TOGGLE, o._dataApiKeydownHandler).on(k.KEYDOWN_DATA_API, L.MENU, o._dataApiKeydownHandler).on(k.CLICK_DATA_API + " " + k.KEYUP_DATA_API, o._clearMenus).on(k.CLICK_DATA_API, L.DATA_TOGGLE, function(e) {
            e.preventDefault(), e.stopPropagation(), o._jQueryInterface.call(_(this), "toggle")
        }).on(k.CLICK_DATA_API, L.FORM_CHILD, function(e) {
            e.stopPropagation()
        }), _.fn[E] = o._jQueryInterface, _.fn[E].Constructor = o, _.fn[E].noConflict = function() {
            return _.fn[E] = n, o._jQueryInterface
        }, o
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : e.Button = t(e.jQuery)
    }(this, function(e) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function s(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }
        var a, t, l, u, n, i, o, c, f, d, h;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, t = "button", l = "4.1.3", n = "." + (u = "bs.button"), i = ".data-api", o = (a = e).fn[t], c = {
            ACTIVE: "active",
            BUTTON: "btn",
            FOCUS: "focus"
        }, f = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: "input",
            ACTIVE: ".active",
            BUTTON: ".btn"
        }, d = {
            CLICK_DATA_API: "click" + n + i,
            FOCUS_BLUR_DATA_API: "focus" + n + i + " blur" + n + i
        }, h = function() {
            function n(e) {
                this._element = e
            }
            var e = n.prototype;
            return e.toggle = function o() {
                var e = !0,
                    t = !0,
                    n = a(this._element).closest(f.DATA_TOGGLE)[0];
                if (n) {
                    var r = this._element.querySelector(f.INPUT);
                    if (r) {
                        if ("radio" === r.type)
                            if (r.checked && this._element.classList.contains(c.ACTIVE)) e = !1;
                            else {
                                var i = n.querySelector(f.ACTIVE);
                                i && a(i).removeClass(c.ACTIVE)
                            } if (e) {
                            if (r.hasAttribute("disabled") || n.hasAttribute("disabled") || r.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            r.checked = !this._element.classList.contains(c.ACTIVE), a(r).trigger("change")
                        }
                        r.focus(), t = !1
                    }
                }
                t && this._element.setAttribute("aria-pressed", !this._element.classList.contains(c.ACTIVE)), e && a(this._element).toggleClass(c.ACTIVE)
            }, e.dispose = function t() {
                a.removeData(this._element, u), this._element = null
            }, n._jQueryInterface = function r(t) {
                return this.each(function() {
                    var e = a(this).data(u);
                    e || (e = new n(this), a(this).data(u, e)), "toggle" === t && e[t]()
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function i() {
                    return l
                }
            }]), n
        }(), a(document).on(d.CLICK_DATA_API, f.DATA_TOGGLE_CARROT, function(e) {
            e.preventDefault();
            var t = e.target;
            a(t).hasClass(c.BUTTON) || (t = a(t).closest(f.BUTTON)), h._jQueryInterface.call(a(t), "toggle")
        }).on(d.FOCUS_BLUR_DATA_API, f.DATA_TOGGLE_CARROT, function(e) {
            var t = a(e.target).closest(f.BUTTON)[0];
            a(t).toggleClass(c.FOCUS, /^focus(in)?$/.test(e.type))
        }), a.fn[t] = h._jQueryInterface, a.fn[t].Constructor = h, a.fn[t].noConflict = function() {
            return a.fn[t] = o, h._jQueryInterface
        }, h
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : e.Modal = t(e.jQuery, e.Util)
    }(this, function(e, w) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function S(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function C(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                    r = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))), r.forEach(function(e) {
                    i(t, e, n[e])
                })
            }
            return t
        }
        var A, x, D, O, I, t, n, N, k, j, L, P, R, s;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, w = w && w.hasOwnProperty("default") ? w["default"] : w, x = "modal", D = "4.1.3", I = "." + (O = "bs.modal"), t = ".data-api", n = (A = e).fn[x], N = 27, k = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }, j = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }, L = {
            HIDE: "hide" + I,
            HIDDEN: "hidden" + I,
            SHOW: "show" + I,
            SHOWN: "shown" + I,
            FOCUSIN: "focusin" + I,
            RESIZE: "resize" + I,
            CLICK_DISMISS: "click.dismiss" + I,
            KEYDOWN_DISMISS: "keydown.dismiss" + I,
            MOUSEUP_DISMISS: "mouseup.dismiss" + I,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + I,
            CLICK_DATA_API: "click" + I + t
        }, P = {
            SCROLLBAR_MEASURER: "modal-scrollbar-measure",
            BACKDROP: "modal-backdrop",
            OPEN: "modal-open",
            FADE: "fade",
            SHOW: "show"
        }, R = {
            DIALOG: ".modal-dialog",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            STICKY_CONTENT: ".sticky-top"
        }, s = function() {
            function i(e, t) {
                this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(R.DIALOG), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._scrollbarWidth = 0
            }
            var e = i.prototype;
            return e.toggle = function t(e) {
                return this._isShown ? this.hide() : this.show(e)
            }, e.show = function r(e) {
                var t = this;
                if (!this._isTransitioning && !this._isShown) {
                    A(this._element).hasClass(P.FADE) && (this._isTransitioning = !0);
                    var n = A.Event(L.SHOW, {
                        relatedTarget: e
                    });
                    A(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), A(document.body).addClass(P.OPEN), this._setEscapeEvent(), this._setResizeEvent(), A(this._element).on(L.CLICK_DISMISS, R.DATA_DISMISS, function(e) {
                        return t.hide(e)
                    }), A(this._dialog).on(L.MOUSEDOWN_DISMISS, function() {
                        A(t._element).one(L.MOUSEUP_DISMISS, function(e) {
                            A(e.target).is(t._element) && (t._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return t._showElement(e)
                    }))
                }
            }, e.hide = function o(e) {
                var t = this;
                if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                    var n = A.Event(L.HIDE);
                    if (A(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var r = A(this._element).hasClass(P.FADE);
                        if (r && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), A(document).off(L.FOCUSIN), A(this._element).removeClass(P.SHOW), A(this._element).off(L.CLICK_DISMISS), A(this._dialog).off(L.MOUSEDOWN_DISMISS), r) {
                            var i = w.getTransitionDurationFromElement(this._element);
                            A(this._element).one(w.TRANSITION_END, function(e) {
                                return t._hideModal(e)
                            }).emulateTransitionEnd(i)
                        } else this._hideModal()
                    }
                }
            }, e.dispose = function n() {
                A.removeData(this._element, O), A(window, document, this._element, this._backdrop).off(I), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
            }, e.handleUpdate = function s() {
                this._adjustDialog()
            }, e._getConfig = function a(e) {
                return e = C({}, k, e), w.typeCheckConfig(x, e, j), e
            }, e._showElement = function l(e) {
                var t = this,
                    n = A(this._element).hasClass(P.FADE);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && w.reflow(this._element), A(this._element).addClass(P.SHOW), this._config.focus && this._enforceFocus();
                var r = A.Event(L.SHOWN, {
                        relatedTarget: e
                    }),
                    i = function i() {
                        t._config.focus && t._element.focus(), t._isTransitioning = !1, A(t._element).trigger(r)
                    };
                if (n) {
                    var o = w.getTransitionDurationFromElement(this._element);
                    A(this._dialog).one(w.TRANSITION_END, i).emulateTransitionEnd(o)
                } else i()
            }, e._enforceFocus = function u() {
                var t = this;
                A(document).off(L.FOCUSIN).on(L.FOCUSIN, function(e) {
                    document !== e.target && t._element !== e.target && 0 === A(t._element).has(e.target).length && t._element.focus()
                })
            }, e._setEscapeEvent = function c() {
                var t = this;
                this._isShown && this._config.keyboard ? A(this._element).on(L.KEYDOWN_DISMISS, function(e) {
                    e.which === N && (e.preventDefault(), t.hide())
                }) : this._isShown || A(this._element).off(L.KEYDOWN_DISMISS)
            }, e._setResizeEvent = function f() {
                var t = this;
                this._isShown ? A(window).on(L.RESIZE, function(e) {
                    return t.handleUpdate(e)
                }) : A(window).off(L.RESIZE)
            }, e._hideModal = function d() {
                var e = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                    A(document.body).removeClass(P.OPEN), e._resetAdjustments(), e._resetScrollbar(), A(e._element).trigger(L.HIDDEN)
                })
            }, e._removeBackdrop = function h() {
                this._backdrop && (A(this._backdrop).remove(), this._backdrop = null)
            }, e._showBackdrop = function p(e) {
                var t = this,
                    n = A(this._element).hasClass(P.FADE) ? P.FADE : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = P.BACKDROP, n && this._backdrop.classList.add(n), A(this._backdrop).appendTo(document.body), A(this._element).on(L.CLICK_DISMISS, function(e) {
                            t._ignoreBackdropClick ? t._ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" === t._config.backdrop ? t._element.focus() : t.hide())
                        }), n && w.reflow(this._backdrop), A(this._backdrop).addClass(P.SHOW), !e) return;
                    if (!n) return void e();
                    var r = w.getTransitionDurationFromElement(this._backdrop);
                    A(this._backdrop).one(w.TRANSITION_END, e).emulateTransitionEnd(r)
                } else if (!this._isShown && this._backdrop) {
                    A(this._backdrop).removeClass(P.SHOW);
                    var i = function i() {
                        t._removeBackdrop(), e && e()
                    };
                    if (A(this._element).hasClass(P.FADE)) {
                        var o = w.getTransitionDurationFromElement(this._backdrop);
                        A(this._backdrop).one(w.TRANSITION_END, i).emulateTransitionEnd(o)
                    } else i()
                } else e && e()
            }, e._adjustDialog = function m() {
                var e = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, e._resetAdjustments = function g() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, e._checkScrollbar = function y() {
                var e = document.body.getBoundingClientRect();
                this._isBodyOverflowing = e.left + e.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, e._setScrollbar = function v() {
                var i = this;
                if (this._isBodyOverflowing) {
                    var e = [].slice.call(document.querySelectorAll(R.FIXED_CONTENT)),
                        t = [].slice.call(document.querySelectorAll(R.STICKY_CONTENT));
                    A(e).each(function(e, t) {
                        var n = t.style.paddingRight,
                            r = A(t).css("padding-right");
                        A(t).data("padding-right", n).css("padding-right", parseFloat(r) + i._scrollbarWidth + "px")
                    }), A(t).each(function(e, t) {
                        var n = t.style.marginRight,
                            r = A(t).css("margin-right");
                        A(t).data("margin-right", n).css("margin-right", parseFloat(r) - i._scrollbarWidth + "px")
                    });
                    var n = document.body.style.paddingRight,
                        r = A(document.body).css("padding-right");
                    A(document.body).data("padding-right", n).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px")
                }
            }, e._resetScrollbar = function b() {
                var e = [].slice.call(document.querySelectorAll(R.FIXED_CONTENT));
                A(e).each(function(e, t) {
                    var n = A(t).data("padding-right");
                    A(t).removeData("padding-right"), t.style.paddingRight = n || ""
                });
                var t = [].slice.call(document.querySelectorAll("" + R.STICKY_CONTENT));
                A(t).each(function(e, t) {
                    var n = A(t).data("margin-right");
                    void 0 !== n && A(t).css("margin-right", n).removeData("margin-right")
                });
                var n = A(document.body).data("padding-right");
                A(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, e._getScrollbarWidth = function _() {
                var e = document.createElement("div");
                e.className = P.SCROLLBAR_MEASURER, document.body.appendChild(e);
                var t = e.getBoundingClientRect().width - e.clientWidth;
                return document.body.removeChild(e), t
            }, i._jQueryInterface = function E(n, r) {
                return this.each(function() {
                    var e = A(this).data(O),
                        t = C({}, k, A(this).data(), "object" == typeof n && n ? n : {});
                    if (e || (e = new i(this, t), A(this).data(O, e)), "string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n](r)
                    } else t.show && e.show(r)
                })
            }, S(i, null, [{
                key: "VERSION",
                get: function T() {
                    return D
                }
            }, {
                key: "Default",
                get: function T() {
                    return k
                }
            }]), i
        }(), A(document).on(L.CLICK_DATA_API, R.DATA_TOGGLE, function(e) {
            var t, n = this,
                r = w.getSelectorFromElement(this);
            r && (t = document.querySelector(r));
            var i = A(t).data(O) ? "toggle" : C({}, A(t).data(), A(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
            var o = A(t).one(L.SHOW, function(e) {
                e.isDefaultPrevented() || o.one(L.HIDDEN, function() {
                    A(n).is(":visible") && n.focus()
                })
            });
            s._jQueryInterface.call(A(t), i, this)
        }), A.fn[x] = s._jQueryInterface, A.fn[x].Constructor = s, A.fn[x].noConflict = function() {
            return A.fn[x] = n, s._jQueryInterface
        }, s
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : e.Carousel = t(e.jQuery, e.Util)
    }(this, function(e, _) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function E(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function T(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                    r = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable
                }))), r.forEach(function(e) {
                    i(t, e, n[e])
                })
            }
            return t
        }
        var w, S, C, A, x, t, n, D, O, I, N, k, j, L, P, R, o;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, _ = _ && _.hasOwnProperty("default") ? _["default"] : _, S = "carousel", C = "4.1.3", x = "." + (A = "bs.carousel"), t = ".data-api", n = (w = e).fn[S], D = 37, O = 39, N = {
            interval: 5e3,
            keyboard: !0,
            slide: !(I = 500),
            pause: "hover",
            wrap: !0
        }, k = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
        }, j = {
            NEXT: "next",
            PREV: "prev",
            LEFT: "left",
            RIGHT: "right"
        }, L = {
            SLIDE: "slide" + x,
            SLID: "slid" + x,
            KEYDOWN: "keydown" + x,
            MOUSEENTER: "mouseenter" + x,
            MOUSELEAVE: "mouseleave" + x,
            TOUCHEND: "touchend" + x,
            LOAD_DATA_API: "load" + x + t,
            CLICK_DATA_API: "click" + x + t
        }, P = {
            CAROUSEL: "carousel",
            ACTIVE: "active",
            SLIDE: "slide",
            RIGHT: "carousel-item-right",
            LEFT: "carousel-item-left",
            NEXT: "carousel-item-next",
            PREV: "carousel-item-prev",
            ITEM: "carousel-item"
        }, R = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
        }, o = function() {
            function o(e, t) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(t), this._element = w(e)[0], this._indicatorsElement = this._element.querySelector(R.INDICATORS), this._addEventListeners()
            }
            var e = o.prototype;
            return e.next = function t() {
                this._isSliding || this._slide(j.NEXT)
            }, e.nextWhenVisible = function n() {
                !document.hidden && w(this._element).is(":visible") && "hidden" !== w(this._element).css("visibility") && this.next()
            }, e.prev = function r() {
                this._isSliding || this._slide(j.PREV)
            }, e.pause = function i(e) {
                e || (this._isPaused = !0), this._element.querySelector(R.NEXT_PREV) && (_.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, e.cycle = function s(e) {
                e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, e.to = function a(e) {
                var t = this;
                this._activeElement = this._element.querySelector(R.ACTIVE_ITEM);
                var n = this._getItemIndex(this._activeElement);
                if (!(e > this._items.length - 1 || e < 0))
                    if (this._isSliding) w(this._element).one(L.SLID, function() {
                        return t.to(e)
                    });
                    else {
                        if (n === e) return this.pause(), void this.cycle();
                        var r = n < e ? j.NEXT : j.PREV;
                        this._slide(r, this._items[e])
                    }
            }, e.dispose = function l() {
                w(this._element).off(x), w.removeData(this._element, A), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, e._getConfig = function u(e) {
                return e = T({}, N, e), _.typeCheckConfig(S, e, k), e
            }, e._addEventListeners = function c() {
                var t = this;
                this._config.keyboard && w(this._element).on(L.KEYDOWN, function(e) {
                    return t._keydown(e)
                }), "hover" === this._config.pause && (w(this._element).on(L.MOUSEENTER, function(e) {
                    return t.pause(e)
                }).on(L.MOUSELEAVE, function(e) {
                    return t.cycle(e)
                }), "ontouchstart" in document.documentElement && w(this._element).on(L.TOUCHEND, function() {
                    t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout(function(e) {
                        return t.cycle(e)
                    }, I + t._config.interval)
                }))
            }, e._keydown = function f(e) {
                if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                    case D:
                        e.preventDefault(), this.prev();
                        break;
                    case O:
                        e.preventDefault(), this.next()
                }
            }, e._getItemIndex = function d(e) {
                return this._items = e && e.parentNode ? [].slice.call(e.parentNode.querySelectorAll(R.ITEM)) : [], this._items.indexOf(e)
            }, e._getItemByDirection = function h(e, t) {
                var n = e === j.NEXT,
                    r = e === j.PREV,
                    i = this._getItemIndex(t),
                    o = this._items.length - 1;
                if ((r && 0 === i || n && i === o) && !this._config.wrap) return t;
                var s = (i + (e === j.PREV ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, e._triggerSlideEvent = function p(e, t) {
                var n = this._getItemIndex(e),
                    r = this._getItemIndex(this._element.querySelector(R.ACTIVE_ITEM)),
                    i = w.Event(L.SLIDE, {
                        relatedTarget: e,
                        direction: t,
                        from: r,
                        to: n
                    });
                return w(this._element).trigger(i), i
            }, e._setActiveIndicatorElement = function m(e) {
                if (this._indicatorsElement) {
                    var t = [].slice.call(this._indicatorsElement.querySelectorAll(R.ACTIVE));
                    w(t).removeClass(P.ACTIVE);
                    var n = this._indicatorsElement.children[this._getItemIndex(e)];
                    n && w(n).addClass(P.ACTIVE)
                }
            }, e._slide = function g(e, t) {
                var n, r, i, o = this,
                    s = this._element.querySelector(R.ACTIVE_ITEM),
                    a = this._getItemIndex(s),
                    l = t || s && this._getItemByDirection(e, s),
                    u = this._getItemIndex(l),
                    c = Boolean(this._interval);
                if (e === j.NEXT ? (n = P.LEFT, r = P.NEXT, i = j.LEFT) : (n = P.RIGHT, r = P.PREV, i = j.RIGHT), l && w(l).hasClass(P.ACTIVE)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, i).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, c && this.pause(), this._setActiveIndicatorElement(l);
                    var f = w.Event(L.SLID, {
                        relatedTarget: l,
                        direction: i,
                        from: a,
                        to: u
                    });
                    if (w(this._element).hasClass(P.SLIDE)) {
                        w(l).addClass(r), _.reflow(l), w(s).addClass(n), w(l).addClass(n);
                        var d = _.getTransitionDurationFromElement(s);
                        w(s).one(_.TRANSITION_END, function() {
                            w(l).removeClass(n + " " + r).addClass(P.ACTIVE), w(s).removeClass(P.ACTIVE + " " + r + " " + n), o._isSliding = !1, setTimeout(function() {
                                return w(o._element).trigger(f)
                            }, 0)
                        }).emulateTransitionEnd(d)
                    } else w(s).removeClass(P.ACTIVE), w(l).addClass(P.ACTIVE), this._isSliding = !1, w(this._element).trigger(f);
                    c && this.cycle()
                }
            }, o._jQueryInterface = function y(r) {
                return this.each(function() {
                    var e = w(this).data(A),
                        t = T({}, N, w(this).data());
                    "object" == typeof r && (t = T({}, t, r));
                    var n = "string" == typeof r ? r : t.slide;
                    if (e || (e = new o(this, t), w(this).data(A, e)), "number" == typeof r) e.to(r);
                    else if ("string" == typeof n) {
                        if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    } else t.interval && (e.pause(), e.cycle())
                })
            }, o._dataApiClickHandler = function v(e) {
                var t = _.getSelectorFromElement(this);
                if (t) {
                    var n = w(t)[0];
                    if (n && w(n).hasClass(P.CAROUSEL)) {
                        var r = T({}, w(n).data(), w(this).data()),
                            i = this.getAttribute("data-slide-to");
                        i && (r.interval = !1), o._jQueryInterface.call(w(n), r), i && w(n).data(A).to(i), e.preventDefault()
                    }
                }
            }, E(o, null, [{
                key: "VERSION",
                get: function b() {
                    return C
                }
            }, {
                key: "Default",
                get: function b() {
                    return N
                }
            }]), o
        }(), w(document).on(L.CLICK_DATA_API, R.DATA_SLIDE, o._dataApiClickHandler), w(window).on(L.LOAD_DATA_API, function() {
            for (var e = [].slice.call(document.querySelectorAll(R.DATA_RIDE)), t = 0, n = e.length; t < n; t++) {
                var r = w(e[t]);
                o._jQueryInterface.call(r, r.data())
            }
        }), w.fn[S] = o._jQueryInterface, w.fn[S].Constructor = o, w.fn[S].noConflict = function() {
            return w.fn[S] = n, o._jQueryInterface
        }, o
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : e.Tab = t(e.jQuery, e.Util)
    }(this, function(e, c) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }

        function o(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), e
        }
        var f, t, a, d, n, i, s, h, p, m, l;
        return e = e && e.hasOwnProperty("default") ? e["default"] : e, c = c && c.hasOwnProperty("default") ? c["default"] : c, t = "tab", a = "4.1.3", n = "." + (d = "bs.tab"), i = ".data-api", s = (f = e).fn[t], h = {
            HIDE: "hide" + n,
            HIDDEN: "hidden" + n,
            SHOW: "show" + n,
            SHOWN: "shown" + n,
            CLICK_DATA_API: "click" + n + i
        }, p = {
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active",
            DISABLED: "disabled",
            FADE: "fade",
            SHOW: "show"
        }, m = {
            DROPDOWN: ".dropdown",
            NAV_LIST_GROUP: ".nav, .list-group",
            ACTIVE: ".active",
            ACTIVE_UL: "> li > .active",
            DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
            DROPDOWN_TOGGLE: ".dropdown-toggle",
            DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
        }, l = function() {
            function r(e) {
                this._element = e
            }
            var e = r.prototype;
            return e.show = function u() {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && f(this._element).hasClass(p.ACTIVE) || f(this._element).hasClass(p.DISABLED))) {
                    var e, r, t = f(this._element).closest(m.NAV_LIST_GROUP)[0],
                        i = c.getSelectorFromElement(this._element);
                    if (t) {
                        var o = "UL" === t.nodeName ? m.ACTIVE_UL : m.ACTIVE;
                        r = (r = f.makeArray(f(t).find(o)))[r.length - 1]
                    }
                    var s = f.Event(h.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = f.Event(h.SHOW, {
                            relatedTarget: r
                        });
                    if (r && f(r).trigger(s), f(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        i && (e = document.querySelector(i)), this._activate(this._element, t);
                        var l = function l() {
                            var e = f.Event(h.HIDDEN, {
                                    relatedTarget: n._element
                                }),
                                t = f.Event(h.SHOWN, {
                                    relatedTarget: r
                                });
                            f(r).trigger(e), f(n._element).trigger(t)
                        };
                        e ? this._activate(e, e.parentNode, l) : l()
                    }
                }
            }, e.dispose = function t() {
                f.removeData(this._element, d), this._element = null
            }, e._activate = function l(e, t, n) {
                var r = this,
                    i = ("UL" === t.nodeName ? f(t).find(m.ACTIVE_UL) : f(t).children(m.ACTIVE))[0],
                    o = n && i && f(i).hasClass(p.FADE),
                    s = function s() {
                        return r._transitionComplete(e, i, n)
                    };
                if (i && o) {
                    var a = c.getTransitionDurationFromElement(i);
                    f(i).one(c.TRANSITION_END, s).emulateTransitionEnd(a)
                } else s()
            }, e._transitionComplete = function s(e, t, n) {
                if (t) {
                    f(t).removeClass(p.SHOW + " " + p.ACTIVE);
                    var r = f(t.parentNode).find(m.DROPDOWN_ACTIVE_CHILD)[0];
                    r && f(r).removeClass(p.ACTIVE), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !1)
                }
                if (f(e).addClass(p.ACTIVE), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), c.reflow(e), f(e).addClass(p.SHOW), e.parentNode && f(e.parentNode).hasClass(p.DROPDOWN_MENU)) {
                    var i = f(e).closest(m.DROPDOWN)[0];
                    if (i) {
                        var o = [].slice.call(i.querySelectorAll(m.DROPDOWN_TOGGLE));
                        f(o).addClass(p.ACTIVE)
                    }
                    e.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, r._jQueryInterface = function i(n) {
                return this.each(function() {
                    var e = f(this),
                        t = e.data(d);
                    if (t || (t = new r(this), e.data(d, t)), "string" == typeof n) {
                        if ("undefined" == typeof t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, o(r, null, [{
                key: "VERSION",
                get: function n() {
                    return a
                }
            }]), r
        }(), f(document).on(h.CLICK_DATA_API, m.DATA_TOGGLE, function(e) {
            e.preventDefault(), l._jQueryInterface.call(f(this), "show")
        }), f.fn[t] = l._jQueryInterface, f.fn[t].Constructor = l, f.fn[t].noConflict = function() {
            return f.fn[t] = s, l._jQueryInterface
        }, l
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.ActiveStorage = {})
    }(this, function(e) {
        "use strict";

        function t(e, t) {
            return e(t = {
                exports: {}
            }, t.exports), t.exports
        }

        function s(e) {
            var t = r(document.head, 'meta[name="' + e + '"]');
            if (t) return t.getAttribute("content")
        }

        function i(e, t) {
            return "string" == typeof e && (t = e, e = document), o(e.querySelectorAll(t))
        }

        function r(e, t) {
            return "string" == typeof e && (t = e, e = document), e.querySelector(t)
        }

        function l(e, t, n) {
            var r = 2 < arguments.length && n !== undefined ? arguments[2] : {},
                i = e.disabled,
                o = r.bubbles,
                s = r.cancelable,
                a = r.detail,
                l = document.createEvent("Event");
            l.initEvent(t, o || !0, s || !0), l.detail = a || {};
            try {
                e.disabled = !1, e.dispatchEvent(l)
            } finally {
                e.disabled = i
            }
            return l
        }

        function o(e) {
            return Array.isArray(e) ? e : Array.from ? Array.from(e) : [].slice.call(e)
        }

        function a(e, t) {
            if (e && "function" == typeof e[t]) {
                for (var n = arguments.length, r = Array(2 < n ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
                return e[t].apply(e, r)
            }
        }

        function n() {
            N || (N = !0, document.addEventListener("click", u, !0), document.addEventListener("submit", c), document.addEventListener("ajax:before", f))
        }

        function u(e) {
            var t = e.target;
            "INPUT" != t.tagName && "BUTTON" != t.tagName || "submit" != t.type || !t.form || I.set(t.form, t)
        }

        function c(e) {
            d(e)
        }

        function f(e) {
            "FORM" == e.target.tagName && d(e)
        }

        function d(e) {
            var t = e.target;
            if (t.hasAttribute(O)) e.preventDefault();
            else {
                var n = new D(t),
                    r = n.inputs;
                r.length && (e.preventDefault(), t.setAttribute(O, ""), r.forEach(p), n.start(function(e) {
                    t.removeAttribute(O), e ? r.forEach(m) : h(t)
                }))
            }
        }

        function h(e) {
            var t = I.get(e) || r(e, "input[type=submit], button[type=submit]");
            if (t) {
                var n = t.disabled;
                t.disabled = !1, t.focus(), t.click(), t.disabled = n
            } else(t = document.createElement("input")).type = "submit", t.style.display = "none", e.appendChild(t), t.click(), e.removeChild(t);
            I["delete"](e)
        }

        function p(e) {
            e.disabled = !0
        }

        function m(e) {
            e.disabled = !1
        }

        function g() {
            window.ActiveStorage && n()
        }
        var y = t(function(e) {
                var t;
                t = function(c) {
                    function u(e, t) {
                        var n = e[0],
                            r = e[1],
                            i = e[2],
                            o = e[3];
                        r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + t[0] - 680876936 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + t[1] - 389564586 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + t[2] + 606105819 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + t[3] - 1044525330 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + t[4] - 176418897 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + t[5] + 1200080426 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + t[6] - 1473231341 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + t[7] - 45705983 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + t[8] + 1770035416 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + t[9] - 1958414417 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + t[10] - 42063 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + t[11] - 1990404162 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & i | ~r & o) + t[12] + 1804603682 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & i) + t[13] - 40341101 | 0) << 12 | o >>> 20) + n | 0) & n | ~o & r) + t[14] - 1502002290 | 0) << 17 | i >>> 15) + o | 0) & o | ~i & n) + t[15] + 1236535329 | 0) << 22 | r >>> 10) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + t[1] - 165796510 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + t[6] - 1069501632 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + t[11] + 643717713 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + t[0] - 373897302 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + t[5] - 701558691 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + t[10] + 38016083 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + t[15] - 660478335 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + t[4] - 405537848 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + t[9] + 568446438 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + t[14] - 1019803690 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + t[3] - 187363961 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + t[8] + 1163531501 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r & o | i & ~o) + t[13] - 1444681467 | 0) << 5 | n >>> 27) + r | 0) & i | r & ~i) + t[2] - 51403784 | 0) << 9 | o >>> 23) + n | 0) & r | n & ~r) + t[7] + 1735328473 | 0) << 14 | i >>> 18) + o | 0) & n | o & ~n) + t[12] - 1926607734 | 0) << 20 | r >>> 12) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + t[5] - 378558 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + t[8] - 2022574463 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + t[11] + 1839030562 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + t[14] - 35309556 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + t[1] - 1530992060 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + t[4] + 1272893353 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + t[7] - 155497632 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + t[10] - 1094730640 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + t[13] + 681279174 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + t[0] - 358537222 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + t[3] - 722521979 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + t[6] + 76029189 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((i = ((i += ((o = ((o += ((n = ((n += (r ^ i ^ o) + t[9] - 640364487 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ i) + t[12] - 421815835 | 0) << 11 | o >>> 21) + n | 0) ^ n ^ r) + t[15] + 530742520 | 0) << 16 | i >>> 16) + o | 0) ^ o ^ n) + t[2] - 995338651 | 0) << 23 | r >>> 9) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + t[0] - 198630844 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + t[7] + 1126891415 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + t[14] - 1416354905 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + t[5] - 57434055 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + t[12] + 1700485571 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + t[3] - 1894986606 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + t[10] - 1051523 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + t[1] - 2054922799 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + t[8] + 1873313359 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + t[15] - 30611744 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + t[6] - 1560198380 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + t[13] + 1309151649 | 0) << 21 | r >>> 11) + i | 0, r = ((r += ((o = ((o += (r ^ ((n = ((n += (i ^ (r | ~o)) + t[4] - 145523070 | 0) << 6 | n >>> 26) + r | 0) | ~i)) + t[11] - 1120210379 | 0) << 10 | o >>> 22) + n | 0) ^ ((i = ((i += (n ^ (o | ~r)) + t[2] + 718787259 | 0) << 15 | i >>> 17) + o | 0) | ~n)) + t[9] - 343485551 | 0) << 21 | r >>> 11) + i | 0, e[0] = n + e[0] | 0, e[1] = r + e[1] | 0, e[2] = i + e[2] | 0, e[3] = o + e[3] | 0
                    }

                    function f(e) {
                        var t, n = [];
                        for (t = 0; t < 64; t += 4) n[t >> 2] = e.charCodeAt(t) + (e.charCodeAt(t + 1) << 8) + (e.charCodeAt(t + 2) << 16) + (e.charCodeAt(t + 3) << 24);
                        return n
                    }

                    function d(e) {
                        var t, n = [];
                        for (t = 0; t < 64; t += 4) n[t >> 2] = e[t] + (e[t + 1] << 8) + (e[t + 2] << 16) + (e[t + 3] << 24);
                        return n
                    }

                    function r(e) {
                        var t, n, r, i, o, s, a = e.length,
                            l = [1732584193, -271733879, -1732584194, 271733878];
                        for (t = 64; t <= a; t += 64) u(l, f(e.substring(t - 64, t)));
                        for (n = (e = e.substring(t - 64)).length, r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < n; t += 1) r[t >> 2] |= e.charCodeAt(t) << (t % 4 << 3);
                        if (r[t >> 2] |= 128 << (t % 4 << 3), 55 < t)
                            for (u(l, r), t = 0; t < 16; t += 1) r[t] = 0;
                        return i = (i = 8 * a).toString(16).match(/(.*?)(.{0,8})$/), o = parseInt(i[2], 16), s = parseInt(i[1], 16) || 0, r[14] = o, r[15] = s, u(l, r), l
                    }

                    function i(e) {
                        var t, n, r, i, o, s, a = e.length,
                            l = [1732584193, -271733879, -1732584194, 271733878];
                        for (t = 64; t <= a; t += 64) u(l, d(e.subarray(t - 64, t)));
                        for (n = (e = t - 64 < a ? e.subarray(t - 64) : new Uint8Array(0)).length, r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < n; t += 1) r[t >> 2] |= e[t] << (t % 4 << 3);
                        if (r[t >> 2] |= 128 << (t % 4 << 3), 55 < t)
                            for (u(l, r), t = 0; t < 16; t += 1) r[t] = 0;
                        return i = (i = 8 * a).toString(16).match(/(.*?)(.{0,8})$/), o = parseInt(i[2], 16), s = parseInt(i[1], 16) || 0, r[14] = o, r[15] = s, u(l, r), l
                    }

                    function n(e) {
                        var t, n = "";
                        for (t = 0; t < 4; t += 1) n += m[e >> 8 * t + 4 & 15] + m[e >> 8 * t & 15];
                        return n
                    }

                    function s(e) {
                        var t;
                        for (t = 0; t < e.length; t += 1) e[t] = n(e[t]);
                        return e.join("")
                    }

                    function o(e) {
                        return /[\u0080-\uFFFF]/.test(e) && (e = unescape(encodeURIComponent(e))), e
                    }

                    function t(e, t) {
                        var n, r = e.length,
                            i = new ArrayBuffer(r),
                            o = new Uint8Array(i);
                        for (n = 0; n < r; n += 1) o[n] = e.charCodeAt(n);
                        return t ? o : i
                    }

                    function a(e) {
                        return String.fromCharCode.apply(null, new Uint8Array(e))
                    }

                    function l(e, t, n) {
                        var r = new Uint8Array(e.byteLength + t.byteLength);
                        return r.set(new Uint8Array(e)), r.set(new Uint8Array(t), e.byteLength), n ? r : r.buffer
                    }

                    function h(e) {
                        var t, n = [],
                            r = e.length;
                        for (t = 0; t < r - 1; t += 2) n.push(parseInt(e.substr(t, 2), 16));
                        return String.fromCharCode.apply(String, n)
                    }

                    function p() {
                        this.reset()
                    }
                    var m = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
                    return s(r("hello")), "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
                        function u(e, t) {
                            return (e = 0 | e || 0) < 0 ? Math.max(e + t, 0) : Math.min(e, t)
                        }
                        ArrayBuffer.prototype.slice = function(e, t) {
                            var n, r, i, o, s = this.byteLength,
                                a = u(e, s),
                                l = s;
                            return t !== c && (l = u(t, s)), l < a ? new ArrayBuffer(0) : (n = l - a, r = new ArrayBuffer(n), i = new Uint8Array(r), o = new Uint8Array(this, a, n), i.set(o), r)
                        }
                    }(), p.prototype.append = function(e) {
                        return this.appendBinary(o(e)), this
                    }, p.prototype.appendBinary = function(e) {
                        this._buff += e, this._length += e.length;
                        var t, n = this._buff.length;
                        for (t = 64; t <= n; t += 64) u(this._hash, f(this._buff.substring(t - 64, t)));
                        return this._buff = this._buff.substring(t - 64), this
                    }, p.prototype.end = function(e) {
                        var t, n, r = this._buff,
                            i = r.length,
                            o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        for (t = 0; t < i; t += 1) o[t >> 2] |= r.charCodeAt(t) << (t % 4 << 3);
                        return this._finish(o, i), n = s(this._hash), e && (n = h(n)), this.reset(), n
                    }, p.prototype.reset = function() {
                        return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
                    }, p.prototype.getState = function() {
                        return {
                            buff: this._buff,
                            length: this._length,
                            hash: this._hash
                        }
                    }, p.prototype.setState = function(e) {
                        return this._buff = e.buff, this._length = e.length, this._hash = e.hash, this
                    }, p.prototype.destroy = function() {
                        delete this._hash, delete this._buff, delete this._length
                    }, p.prototype._finish = function(e, t) {
                        var n, r, i, o = t;
                        if (e[o >> 2] |= 128 << (o % 4 << 3), 55 < o)
                            for (u(this._hash, e), o = 0; o < 16; o += 1) e[o] = 0;
                        n = (n = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), r = parseInt(n[2], 16), i = parseInt(n[1], 16) || 0, e[14] = r, e[15] = i, u(this._hash, e)
                    }, p.hash = function(e, t) {
                        return p.hashBinary(o(e), t)
                    }, p.hashBinary = function(e, t) {
                        var n = s(r(e));
                        return t ? h(n) : n
                    }, p.ArrayBuffer = function() {
                        this.reset()
                    }, p.ArrayBuffer.prototype.append = function(e) {
                        var t, n = l(this._buff.buffer, e, !0),
                            r = n.length;
                        for (this._length += e.byteLength, t = 64; t <= r; t += 64) u(this._hash, d(n.subarray(t - 64, t)));
                        return this._buff = t - 64 < r ? new Uint8Array(n.buffer.slice(t - 64)) : new Uint8Array(0), this
                    }, p.ArrayBuffer.prototype.end = function(e) {
                        var t, n, r = this._buff,
                            i = r.length,
                            o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        for (t = 0; t < i; t += 1) o[t >> 2] |= r[t] << (t % 4 << 3);
                        return this._finish(o, i), n = s(this._hash), e && (n = h(n)), this.reset(), n
                    }, p.ArrayBuffer.prototype.reset = function() {
                        return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
                    }, p.ArrayBuffer.prototype.getState = function() {
                        var e = p.prototype.getState.call(this);
                        return e.buff = a(e.buff), e
                    }, p.ArrayBuffer.prototype.setState = function(e) {
                        return e.buff = t(e.buff, !0), p.prototype.setState.call(this, e)
                    }, p.ArrayBuffer.prototype.destroy = p.prototype.destroy, p.ArrayBuffer.prototype._finish = p.prototype._finish, p.ArrayBuffer.hash = function(e, t) {
                        var n = s(i(new Uint8Array(e)));
                        return t ? h(n) : n
                    }, p
                }, e.exports = t()
            }),
            v = function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            b = function() {
                function r(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(e, t, n) {
                    return t && r(e.prototype, t), n && r(e, n), e
                }
            }(),
            _ = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            E = function() {
                function n(e) {
                    v(this, n), this.file = e, this.chunkSize = 2097152, this.chunkCount = Math.ceil(this.file.size / this.chunkSize), this.chunkIndex = 0
                }
                return b(n, null, [{
                    key: "create",
                    value: function r(e, t) {
                        new n(e).create(t)
                    }
                }]), b(n, [{
                    key: "create",
                    value: function r(e) {
                        var t = this;
                        this.callback = e, this.md5Buffer = new y.ArrayBuffer, this.fileReader = new FileReader, this.fileReader.addEventListener("load", function(e) {
                            return t.fileReaderDidLoad(e)
                        }), this.fileReader.addEventListener("error", function(e) {
                            return t.fileReaderDidError(e)
                        }), this.readNextChunk()
                    }
                }, {
                    key: "fileReaderDidLoad",
                    value: function i(e) {
                        if (this.md5Buffer.append(e.target.result), !this.readNextChunk()) {
                            var t = this.md5Buffer.end(!0),
                                n = btoa(t);
                            this.callback(null, n)
                        }
                    }
                }, {
                    key: "fileReaderDidError",
                    value: function e() {
                        this.callback("Error reading " + this.file.name)
                    }
                }, {
                    key: "readNextChunk",
                    value: function o() {
                        if (this.chunkIndex < this.chunkCount || 0 == this.chunkIndex && 0 == this.chunkCount) {
                            var e = this.chunkIndex * this.chunkSize,
                                t = Math.min(e + this.chunkSize, this.file.size),
                                n = _.call(this.file, e, t);
                            return this.fileReader.readAsArrayBuffer(n), this.chunkIndex++, !0
                        }
                        return !1
                    }
                }]), n
            }(),
            T = function() {
                function i(e, t, n) {
                    var r = this;
                    v(this, i), this.file = e, this.attributes = {
                        filename: e.name,
                        content_type: e.type,
                        byte_size: e.size,
                        checksum: t
                    }, this.xhr = new XMLHttpRequest, this.xhr.open("POST", n, !0), this.xhr.responseType = "json", this.xhr.setRequestHeader("Content-Type", "application/json"), this.xhr.setRequestHeader("Accept", "application/json"), this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xhr.setRequestHeader("X-CSRF-Token", s("csrf-token")), this.xhr.addEventListener("load", function(e) {
                        return r.requestDidLoad(e)
                    }), this.xhr.addEventListener("error", function(e) {
                        return r.requestDidError(e)
                    })
                }
                return b(i, [{
                    key: "create",
                    value: function t(e) {
                        this.callback = e, this.xhr.send(JSON.stringify({
                            blob: this.attributes
                        }))
                    }
                }, {
                    key: "requestDidLoad",
                    value: function r(e) {
                        if (200 <= this.status && this.status < 300) {
                            var t = this.response,
                                n = t.direct_upload;
                            delete t.direct_upload, this.attributes = t, this.directUploadData = n, this.callback(null, this.toJSON())
                        } else this.requestDidError(e)
                    }
                }, {
                    key: "requestDidError",
                    value: function e() {
                        this.callback('Error creating Blob for "' + this.file.name + '". Status: ' + this.status)
                    }
                }, {
                    key: "toJSON",
                    value: function n() {
                        var e = {};
                        for (var t in this.attributes) e[t] = this.attributes[t];
                        return e
                    }
                }, {
                    key: "status",
                    get: function o() {
                        return this.xhr.status
                    }
                }, {
                    key: "response",
                    get: function o() {
                        var e = this.xhr,
                            t = e.responseType,
                            n = e.response;
                        return "json" == t ? n : JSON.parse(n)
                    }
                }]), i
            }(),
            w = function() {
                function s(e) {
                    var t = this;
                    v(this, s), this.blob = e, this.file = e.file;
                    var n = e.directUploadData,
                        r = n.url,
                        i = n.headers;
                    for (var o in this.xhr = new XMLHttpRequest, this.xhr.open("PUT", r, !0), this.xhr.responseType = "text", i) this.xhr.setRequestHeader(o, i[o]);
                    this.xhr.addEventListener("load", function(e) {
                        return t.requestDidLoad(e)
                    }), this.xhr.addEventListener("error", function(e) {
                        return t.requestDidError(e)
                    })
                }
                return b(s, [{
                    key: "create",
                    value: function t(e) {
                        this.callback = e, this.xhr.send(this.file.slice())
                    }
                }, {
                    key: "requestDidLoad",
                    value: function i(e) {
                        var t = this.xhr,
                            n = t.status,
                            r = t.response;
                        200 <= n && n < 300 ? this.callback(null, r) : this.requestDidError(e)
                    }
                }, {
                    key: "requestDidError",
                    value: function e() {
                        this.callback('Error storing "' + this.file.name + '". Status: ' + this.xhr.status)
                    }
                }]), s
            }(),
            S = 0,
            C = function() {
                function r(e, t, n) {
                    v(this, r), this.id = ++S, this.file = e, this.url = t, this.delegate = n
                }
                return b(r, [{
                    key: "create",
                    value: function e(r) {
                        var i = this;
                        E.create(this.file, function(e, t) {
                            if (e) r(e);
                            else {
                                var n = new T(i.file, t, i.url);
                                a(i.delegate, "directUploadWillCreateBlobWithXHR", n.xhr), n.create(function(e) {
                                    if (e) r(e);
                                    else {
                                        var t = new w(n);
                                        a(i.delegate, "directUploadWillStoreFileWithXHR", t.xhr), t.create(function(e) {
                                            e ? r(e) : r(null, n.toJSON())
                                        })
                                    }
                                })
                            }
                        })
                    }
                }]), r
            }(),
            A = function() {
                function n(e, t) {
                    v(this, n), this.input = e, this.file = t, this.directUpload = new C(this.file, this.url, this), this.dispatch("initialize")
                }
                return b(n, [{
                    key: "start",
                    value: function e(n) {
                        var r = this,
                            i = document.createElement("input");
                        i.type = "hidden", i.name = this.input.name, this.input.insertAdjacentElement("beforebegin", i), this.dispatch("start"), this.directUpload.create(function(e, t) {
                            e ? (i.parentNode.removeChild(i), r.dispatchError(e)) : i.value = t.signed_id, r.dispatch("end"), n(e)
                        })
                    }
                }, {
                    key: "uploadRequestDidProgress",
                    value: function r(e) {
                        var t = e.loaded / e.total * 100;
                        t && this.dispatch("progress", {
                            progress: t
                        })
                    }
                }, {
                    key: "dispatch",
                    value: function i(e, t) {
                        var n = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                        return n.file = this.file, n.id = this.directUpload.id, l(this.input, "direct-upload:" + e, {
                            detail: n
                        })
                    }
                }, {
                    key: "dispatchError",
                    value: function t(e) {
                        this.dispatch("error", {
                            error: e
                        }).defaultPrevented || alert(e)
                    }
                }, {
                    key: "directUploadWillCreateBlobWithXHR",
                    value: function o(e) {
                        this.dispatch("before-blob-request", {
                            xhr: e
                        })
                    }
                }, {
                    key: "directUploadWillStoreFileWithXHR",
                    value: function s(e) {
                        var t = this;
                        this.dispatch("before-storage-request", {
                            xhr: e
                        }), e.upload.addEventListener("progress", function(e) {
                            return t.uploadRequestDidProgress(e)
                        })
                    }
                }, {
                    key: "url",
                    get: function a() {
                        return this.input.getAttribute("data-direct-upload-url")
                    }
                }]), n
            }(),
            x = "input[type=file][data-direct-upload-url]:not([disabled])",
            D = function() {
                function t(e) {
                    v(this, t), this.form = e, this.inputs = i(e, x).filter(function(e) {
                        return e.files.length
                    })
                }
                return b(t, [{
                    key: "start",
                    value: function e(t) {
                        var n = this,
                            r = this.createDirectUploadControllers(),
                            i = function i() {
                                var e = r.shift();
                                e ? e.start(function(e) {
                                    e ? (t(e), n.dispatch("end")) : i()
                                }) : (t(), n.dispatch("end"))
                            };
                        this.dispatch("start"), i()
                    }
                }, {
                    key: "createDirectUploadControllers",
                    value: function n() {
                        var r = [];
                        return this.inputs.forEach(function(n) {
                            o(n.files).forEach(function(e) {
                                var t = new A(n, e);
                                r.push(t)
                            })
                        }), r
                    }
                }, {
                    key: "dispatch",
                    value: function r(e, t) {
                        var n = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                        return l(this.form, "direct-uploads:" + e, {
                            detail: n
                        })
                    }
                }]), t
            }(),
            O = "data-direct-uploads-processing",
            I = new WeakMap,
            N = !1;
        setTimeout(g, 1), e.start = n, e.DirectUpload = C, Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }),
    function() {
        var e = this;
        (function() {
            (function() {
                var n = [].slice;
                this.ActionCable = {
                    INTERNAL: {
                        message_types: {
                            welcome: "welcome",
                            ping: "ping",
                            confirmation: "confirm_subscription",
                            rejection: "reject_subscription"
                        },
                        default_mount_path: "/cable",
                        protocols: ["actioncable-v1-json", "actioncable-unsupported"]
                    },
                    WebSocket: window.WebSocket,
                    logger: window.console,
                    createConsumer: function(e) {
                        var t;
                        return null == e && (e = null != (t = this.getConfig("url")) ? t : this.INTERNAL.default_mount_path), new l.Consumer(this.createWebSocketURL(e))
                    },
                    getConfig: function(e) {
                        var t;
                        return null != (t = document.head.querySelector("meta[name='action-cable-" + e + "']")) ? t.getAttribute("content") : void 0
                    },
                    createWebSocketURL: function(e) {
                        var t;
                        return e && !/^wss?:/i.test(e) ? ((t = document.createElement("a")).href = e, t.href = t.href, t.protocol = t.protocol.replace("http", "ws"), t.href) : e
                    },
                    startDebugging: function() {
                        return this.debugging = !0
                    },
                    stopDebugging: function() {
                        return this.debugging = null
                    },
                    log: function() {
                        var e, t;
                        if (e = 1 <= arguments.length ? n.call(arguments, 0) : [], this.debugging) return e.push(Date.now()), (t = this.logger).log.apply(t, ["[ActionCable]"].concat(n.call(e)))
                    }
                }
            }).call(this)
        }).call(e);
        var l = e.ActionCable;
        (function() {
            (function() {
                var r = function(e, t) {
                    return function() {
                        return e.apply(t, arguments)
                    }
                };
                l.ConnectionMonitor = function() {
                    function e(e) {
                        this.connection = e, this.visibilityDidChange = r(this.visibilityDidChange, this), this.reconnectAttempts = 0
                    }
                    var i, t, n;
                    return e.pollInterval = {
                        min: 3,
                        max: 30
                    }, e.staleThreshold = 6, e.prototype.start = function() {
                        if (!this.isRunning()) return this.startedAt = t(), delete this.stoppedAt, this.startPolling(), document.addEventListener("visibilitychange", this.visibilityDidChange), l.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms")
                    }, e.prototype.stop = function() {
                        if (this.isRunning()) return this.stoppedAt = t(), this.stopPolling(), document.removeEventListener("visibilitychange", this.visibilityDidChange), l.log("ConnectionMonitor stopped")
                    }, e.prototype.isRunning = function() {
                        return null != this.startedAt && null == this.stoppedAt
                    }, e.prototype.recordPing = function() {
                        return this.pingedAt = t()
                    }, e.prototype.recordConnect = function() {
                        return this.reconnectAttempts = 0, this.recordPing(), delete this.disconnectedAt, l.log("ConnectionMonitor recorded connect")
                    }, e.prototype.recordDisconnect = function() {
                        return this.disconnectedAt = t(), l.log("ConnectionMonitor recorded disconnect")
                    }, e.prototype.startPolling = function() {
                        return this.stopPolling(), this.poll()
                    }, e.prototype.stopPolling = function() {
                        return clearTimeout(this.pollTimeout)
                    }, e.prototype.poll = function() {
                        return this.pollTimeout = setTimeout((e = this, function() {
                            return e.reconnectIfStale(), e.poll()
                        }), this.getPollInterval());
                        var e
                    }, e.prototype.getPollInterval = function() {
                        var e, t, n, r;
                        return n = (r = this.constructor.pollInterval).min, t = r.max, e = 5 * Math.log(this.reconnectAttempts + 1), Math.round(1e3 * i(e, n, t))
                    }, e.prototype.reconnectIfStale = function() {
                        if (this.connectionIsStale()) return l.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + n(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s"), this.reconnectAttempts++, this.disconnectedRecently() ? l.log("ConnectionMonitor skipping reopening recent disconnect") : (l.log("ConnectionMonitor reopening"), this.connection.reopen())
                    }, e.prototype.connectionIsStale = function() {
                        var e;
                        return n(null != (e = this.pingedAt) ? e : this.startedAt) > this.constructor.staleThreshold
                    }, e.prototype.disconnectedRecently = function() {
                        return this.disconnectedAt && n(this.disconnectedAt) < this.constructor.staleThreshold
                    }, e.prototype.visibilityDidChange = function() {
                        if ("visible" === document.visibilityState) return setTimeout((e = this, function() {
                            if (e.connectionIsStale() || !e.connection.isOpen()) return l.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState), e.connection.reopen()
                        }), 200);
                        var e
                    }, t = function() {
                        return (new Date).getTime()
                    }, n = function(e) {
                        return (t() - e) / 1e3
                    }, i = function(e, t, n) {
                        return Math.max(t, Math.min(n, e))
                    }, e
                }()
            }).call(this),
                function() {
                    var e, i, t, n, r, o = [].slice,
                        s = function(e, t) {
                            return function() {
                                return e.apply(t, arguments)
                            }
                        },
                        a = [].indexOf || function(e) {
                            for (var t = 0, n = this.length; t < n; t++)
                                if (t in this && this[t] === e) return t;
                            return -1
                        };
                    n = l.INTERNAL, i = n.message_types, t = n.protocols, r = 2 <= t.length ? o.call(t, 0, e = t.length - 1) : (e = 0, []), t[e++], l.Connection = function() {
                        function e(e) {
                            this.consumer = e, this.open = s(this.open, this), this.subscriptions = this.consumer.subscriptions, this.monitor = new l.ConnectionMonitor(this), this.disconnected = !0
                        }
                        return e.reopenDelay = 500, e.prototype.send = function(e) {
                            return !!this.isOpen() && (this.webSocket.send(JSON.stringify(e)), !0)
                        }, e.prototype.open = function() {
                            return this.isActive() ? (l.log("Attempted to open WebSocket, but existing socket is " + this.getState()), !1) : (l.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + t), null != this.webSocket && this.uninstallEventHandlers(), this.webSocket = new l.WebSocket(this.consumer.url, t), this.installEventHandlers(), this.monitor.start(), !0)
                        }, e.prototype.close = function(e) {
                            var t;
                            if ((null != e ? e : {
                                    allowReconnect: !0
                                }).allowReconnect || this.monitor.stop(), this.isActive()) return null != (t = this.webSocket) ? t.close() : void 0
                        }, e.prototype.reopen = function() {
                            var e;
                            if (l.log("Reopening WebSocket, current state is " + this.getState()), !this.isActive()) return this.open();
                            try {
                                return this.close()
                            } catch (t) {
                                return e = t, l.log("Failed to reopen WebSocket", e)
                            } finally {
                                l.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms"), setTimeout(this.open, this.constructor.reopenDelay)
                            }
                        }, e.prototype.getProtocol = function() {
                            var e;
                            return null != (e = this.webSocket) ? e.protocol : void 0
                        }, e.prototype.isOpen = function() {
                            return this.isState("open")
                        }, e.prototype.isActive = function() {
                            return this.isState("open", "connecting")
                        }, e.prototype.isProtocolSupported = function() {
                            var e;
                            return e = this.getProtocol(), 0 <= a.call(r, e)
                        }, e.prototype.isState = function() {
                            var e, t;
                            return t = 1 <= arguments.length ? o.call(arguments, 0) : [], e = this.getState(), 0 <= a.call(t, e)
                        }, e.prototype.getState = function() {
                            var e, t;
                            for (t in WebSocket)
                                if (WebSocket[t] === (null != (e = this.webSocket) ? e.readyState : void 0)) return t.toLowerCase();
                            return null
                        }, e.prototype.installEventHandlers = function() {
                            var e, t;
                            for (e in this.events) t = this.events[e].bind(this), this.webSocket["on" + e] = t
                        }, e.prototype.uninstallEventHandlers = function() {
                            var e;
                            for (e in this.events) this.webSocket["on" + e] = function() {}
                        }, e.prototype.events = {
                            message: function(e) {
                                var t, n, r;
                                if (this.isProtocolSupported()) switch (t = (r = JSON.parse(e.data)).identifier, n = r.message, r.type) {
                                    case i.welcome:
                                        return this.monitor.recordConnect(), this.subscriptions.reload();
                                    case i.ping:
                                        return this.monitor.recordPing();
                                    case i.confirmation:
                                        return this.subscriptions.notify(t, "connected");
                                    case i.rejection:
                                        return this.subscriptions.reject(t);
                                    default:
                                        return this.subscriptions.notify(t, "received", n)
                                }
                            },
                            open: function() {
                                if (l.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol"), this.disconnected = !1, !this.isProtocolSupported()) return l.log("Protocol is unsupported. Stopping monitor and disconnecting."), this.close({
                                    allowReconnect: !1
                                })
                            },
                            close: function() {
                                if (l.log("WebSocket onclose event"), !this.disconnected) return this.disconnected = !0, this.monitor.recordDisconnect(), this.subscriptions.notifyAll("disconnected", {
                                    willAttemptReconnect: this.monitor.isRunning()
                                })
                            },
                            error: function() {
                                return l.log("WebSocket onerror event")
                            }
                        }, e
                    }()
                }.call(this),
                function() {
                    var u = [].slice;
                    l.Subscriptions = function() {
                        function e(e) {
                            this.consumer = e, this.subscriptions = []
                        }
                        return e.prototype.create = function(e, t) {
                            var n, r, i;
                            return r = "object" == typeof(n = e) ? n : {
                                channel: n
                            }, i = new l.Subscription(this.consumer, r, t), this.add(i)
                        }, e.prototype.add = function(e) {
                            return this.subscriptions.push(e), this.consumer.ensureActiveConnection(), this.notify(e, "initialized"), this.sendCommand(e, "subscribe"), e
                        }, e.prototype.remove = function(e) {
                            return this.forget(e), this.findAll(e.identifier).length || this.sendCommand(e, "unsubscribe"), e
                        }, e.prototype.reject = function(e) {
                            var t, n, r, i, o;
                            for (i = [], t = 0, n = (r = this.findAll(e)).length; t < n; t++) o = r[t], this.forget(o), this.notify(o, "rejected"), i.push(o);
                            return i
                        }, e.prototype.forget = function(i) {
                            var o;
                            return this.subscriptions = function() {
                                var e, t, n, r;
                                for (r = [], e = 0, t = (n = this.subscriptions).length; e < t; e++)(o = n[e]) !== i && r.push(o);
                                return r
                            }.call(this), i
                        }, e.prototype.findAll = function(e) {
                            var t, n, r, i, o;
                            for (i = [], t = 0, n = (r = this.subscriptions).length; t < n; t++)(o = r[t]).identifier === e && i.push(o);
                            return i
                        }, e.prototype.reload = function() {
                            var e, t, n, r, i;
                            for (r = [], e = 0, t = (n = this.subscriptions).length; e < t; e++) i = n[e], r.push(this.sendCommand(i, "subscribe"));
                            return r
                        }, e.prototype.notifyAll = function(e) {
                            var t, n, r, i, o, s, a;
                            for (n = e, t = 2 <= arguments.length ? u.call(arguments, 1) : [], s = [], r = 0, i = (o = this.subscriptions).length; r < i; r++) a = o[r], s.push(this.notify.apply(this, [a, n].concat(u.call(t))));
                            return s
                        }, e.prototype.notify = function(e, t) {
                            var n, r, i, o, s, a, l;
                            for (a = e, r = t, n = 3 <= arguments.length ? u.call(arguments, 2) : [], s = [], i = 0, o = (l = "string" == typeof a ? this.findAll(a) : [a]).length; i < o; i++) a = l[i], s.push("function" == typeof a[r] ? a[r].apply(a, n) : void 0);
                            return s
                        }, e.prototype.sendCommand = function(e, t) {
                            var n;
                            return n = e.identifier, this.consumer.send({
                                command: t,
                                identifier: n
                            })
                        }, e
                    }()
                }.call(this),
                function() {
                    l.Subscription = function() {
                        function e(e, t, n) {
                            this.consumer = e, null == t && (t = {}), this.identifier = JSON.stringify(t), r(this, n)
                        }
                        var r;
                        return e.prototype.perform = function(e, t) {
                            return null == t && (t = {}), t.action = e, this.send(t)
                        }, e.prototype.send = function(e) {
                            return this.consumer.send({
                                command: "message",
                                identifier: this.identifier,
                                data: JSON.stringify(e)
                            })
                        }, e.prototype.unsubscribe = function() {
                            return this.consumer.subscriptions.remove(this)
                        }, r = function(e, t) {
                            var n, r;
                            if (null != t)
                                for (n in t) r = t[n], e[n] = r;
                            return e
                        }, e
                    }()
                }.call(this),
                function() {
                    l.Consumer = function() {
                        function e(e) {
                            this.url = e, this.subscriptions = new l.Subscriptions(this), this.connection = new l.Connection(this)
                        }
                        return e.prototype.send = function(e) {
                            return this.connection.send(e)
                        }, e.prototype.connect = function() {
                            return this.connection.open()
                        }, e.prototype.disconnect = function() {
                            return this.connection.close({
                                allowReconnect: !1
                            })
                        }, e.prototype.ensureActiveConnection = function() {
                            if (!this.connection.isActive()) return this.connection.open()
                        }, e
                    }()
                }.call(this)
        }).call(this), "object" == typeof module && module.exports ? module.exports = l : "function" == typeof define && define.amd && define(l)
    }.call(this),
    function() {
        this.App || (this.App = {}), App.cable = ActionCable.createConsumer()
    }.call(this);