/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2013 - 2015
 * @version 3.5.1
 *
 * A simple yet powerful JQuery star rating plugin that allows rendering
 * fractional star ratings and supports Right to Left (RTL) input.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
! function(t) {
	"use strict";
	String.prototype.replaceAll = function(t, e) {
		return this.split(t).join(e)
	};
	var e = 0,
		a = 5,
		n = .5,
		r = function(e, a) {
			return null === e || void 0 === e || 0 === e.length || a && "" === t.trim(e)
		},
		i = function(t, e) {
			t.removeClass(e).addClass(e)
		},
		l = function(t, e, a) {
			var n = r(t.data(e)) ? t.attr(e) : t.data(e);
			return n ? n : a[e]
		},
		o = function(t) {
			var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
			return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0
		},
		s = function(t, e) {
			return parseFloat(t.toFixed(e))
		},
		c = function(e, a) {
			this.$element = t(e), this.init(a)
		};
	c.prototype = {
		constructor: c,
		_parseAttr: function(t, i) {
			var o = this,
				s = o.$element;
			if ("range" === s.attr("type") || "number" === s.attr("type")) {
				var c, u, g = l(s, t, i);
				switch (t) {
					case "min":
						c = e;
						break;
					case "max":
						c = a;
						break;
					default:
						c = n
				}
				return u = r(g) ? c : g, parseFloat(u)
			}
			return parseFloat(i[t])
		},
		setDefault: function(t, e) {
			var a = this;
			r(a[t]) && (a[t] = e)
		},
		listen: function() {
			var e = this;
			e.initTouch(), e.$rating.on("click", function(t) {
				if (!e.inactive) {
					var a = t.pageX - e.$rating.offset().left;
					e.setStars(a), e.$element.trigger("change"), e.$element.trigger("rating.change", [e.$element.val(), e.$caption.html()]), e.starClicked = !0
				}
			}), e.$rating.on("mousemove", function(t) {
				if (e.hoverEnabled && !e.inactive) {
					e.starClicked = !1;
					var a = t.pageX - e.$rating.offset().left,
						n = e.calculate(a);
					e.toggleHover(n), e.$element.trigger("rating.hover", [n.val, n.caption, "stars"])
				}
			}), e.$rating.on("mouseleave", function() {
				if (e.hoverEnabled && !e.inactive && !e.starClicked) {
					var t = e.cache;
					e.toggleHover(t), e.$element.trigger("rating.hoverleave", ["stars"])
				}
			}), e.$clear.on("mousemove", function() {
				if (e.hoverEnabled && !e.inactive && e.hoverOnClear) {
					e.clearClicked = !1;
					var t, a = '<span class="' + e.clearCaptionClass + '">' + e.clearCaption + "</span>",
						n = e.clearValue,
						r = e.getWidthFromValue(n);
					t = {
						caption: a,
						width: r,
						val: n
					}, e.toggleHover(t), e.$element.trigger("rating.hover", [n, a, "clear"])
				}
			}), e.$clear.on("mouseleave", function() {
				if (e.hoverEnabled && !e.inactive && !e.clearClicked && e.hoverOnClear) {
					var t = e.cache;
					e.toggleHover(t), e.$element.trigger("rating.hoverleave", ["clear"])
				}
			}), e.$clear.on("click", function() {
				e.inactive || (e.clear(), e.clearClicked = !0)
			}), t(e.$element[0].form).on("reset", function() {
				e.inactive || e.reset()
			})
		},
		destroy: function() {
			var e = this,
				a = e.$element;
			r(e.$container) || e.$container.before(a).remove(), t.removeData(a.get(0)), a.off("rating").removeClass("hide")
		},
		create: function(t) {
			var e = this,
				a = e.$element;
			t = t || e.options || {}, e.destroy(), a.rating(t)
		},
		setTouch: function(t, e) {
			var a = this,
				n = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch;
			if (n && !a.inactive) {
				var r = t.originalEvent,
					i = r.touches.length > 0 ? r.touches : r.changedTouches,
					l = i[0].pageX - a.$rating.offset().left;
				if (e) a.setStars(l), a.$element.trigger("change"), a.$element.trigger("rating.change", [a.$element.val(), a.$caption.html()]), a.starClicked = !0;
				else {
					var o = a.calculate(l),
						s = o.val <= a.clearValue ? a.fetchCaption(a.clearValue) : o.caption,
						c = a.getWidthFromValue(a.clearValue),
						u = o.val <= a.clearValue ? a.rtl ? 100 - c + "%" : c + "%" : o.width;
					a.$caption.html(s), a.$stars.css("width", u)
				}
			}
		},
		initTouch: function() {
			var t = this;
			t.$rating.on("touchstart touchmove touchend", function(e) {
				var a = "touchend" === e.type;
				t.setTouch(e, a)
			})
		},
		initSlider: function(t) {
			var i = this;
			r(i.$element.val()) && i.$element.val(0), i.initialValue = i.$element.val(), i.min = void 0 !== t.min ? t.min : i._parseAttr("min", t), i.max = void 0 !== t.max ? t.max : i._parseAttr("max", t), i.step = void 0 !== t.step ? t.step : i._parseAttr("step", t), (isNaN(i.min) || r(i.min)) && (i.min = e), (isNaN(i.max) || r(i.max)) && (i.max = a), (isNaN(i.step) || r(i.step) || 0 === i.step) && (i.step = n), i.diff = i.max - i.min
		},
		init: function(e) {
			var a, n, l, o = this,
				s = o.$element;
			o.options = e, t.each(e, function(t, e) {
				o[t] = e
			}), o.starClicked = !1, o.clearClicked = !1, o.initSlider(e), o.checkDisabled(), o.rtl = e.rtl || s.attr("dir"), o.rtl && s.attr("dir", "rtl"), a = o.glyphicon ? "" : "★", o.setDefault("symbol", a), o.setDefault("clearButtonBaseClass", "clear-rating"), o.setDefault("clearButtonActiveClass", "clear-rating-active"), o.setDefault("clearValue", o.min), i(s, "form-control hide"), o.$clearElement = r(e.clearElement) ? null : t(e.clearElement), o.$captionElement = r(e.captionElement) ? null : t(e.captionElement), void 0 === o.$rating && void 0 === o.$container && (o.$rating = t(document.createElement("div")).html('<div class="rating-stars"></div>'), o.$container = t(document.createElement("div")), o.$container.before(o.$rating).append(o.$rating), s.before(o.$container).appendTo(o.$rating)), o.$stars = o.$rating.find(".rating-stars"), o.generateRating(), o.$clear = r(o.$clearElement) ? o.$container.find("." + o.clearButtonBaseClass) : o.$clearElement, o.$caption = r(o.$captionElement) ? o.$container.find(".caption") : o.$captionElement, o.setStars(), o.listen(), o.showClear && o.$clear.attr({
				"class": o.getClearClass()
			}), n = s.val(), l = o.getWidthFromValue(n), o.cache = {
				caption: o.$caption.html(),
				width: (o.rtl ? 100 - l : l) + "%",
				val: n
			}, s.removeClass("rating-loading")
		},
		checkDisabled: function() {
			var t = this;
			t.disabled = l(t.$element, "disabled", t.options), t.readonly = l(t.$element, "readonly", t.options), t.inactive = t.disabled || t.readonly
		},
		getClearClass: function() {
			return this.clearButtonBaseClass + " " + (this.inactive ? "" : this.clearButtonActiveClass)
		},
		generateRating: function() {
			var t = this,
				e = t.renderClear(),
				a = t.renderCaption(),
				n = t.rtl ? "rating-container-rtl" : "rating-container",
				l = t.getStars();
			n += t.glyphicon ? ("" === t.symbol ? " rating-gly-star" : " rating-gly") + t.ratingClass : r(t.ratingClass) ? " rating-uni" : " " + t.ratingClass, t.$rating.attr("class", n), t.$rating.attr("data-content", l), t.$stars.attr("data-content", l), n = t.rtl ? "star-rating-rtl" : "star-rating", t.$container.attr("class", n + " rating-" + t.size), t.$container.removeClass("rating-active rating-disabled"), t.$container.addClass(t.inactive ? "rating-disabled" : "rating-active"), void 0 === t.$caption && void 0 === t.$clear && (t.rtl ? t.$container.prepend(a).append(e) : t.$container.prepend(e).append(a)), r(t.containerClass) || i(t.$container, t.containerClass)
		},
		getStars: function() {
			var t, e = this,
				a = e.stars,
				n = "";
			for (t = 1; a >= t; t++) n += e.symbol;
			return n
		},
		renderClear: function() {
			var t, e = this;
			return e.showClear ? (t = e.getClearClass(), r(e.$clearElement) ? '<div class="' + t + '" title="' + e.clearButtonTitle + '">' + e.clearButton + "</div>" : (i(e.$clearElement, t), e.$clearElement.attr({
				title: e.clearButtonTitle
			}).html(e.clearButton), "")) : ""
		},
		renderCaption: function() {
			var t, e = this,
				a = e.$element.val();
			return e.showCaption ? (t = e.fetchCaption(a), r(e.$captionElement) ? '<div class="caption">' + t + "</div>" : (i(e.$captionElement, "caption"), e.$captionElement.attr({
				title: e.clearCaption
			}).html(t), "")) : ""
		},
		fetchCaption: function(t) {
			var e, a, n, i, l, o = this,
				s = parseFloat(t),
				c = o.starCaptions,
				u = o.starCaptionClasses;
			return i = "function" == typeof u ? u(s) : u[s], n = "function" == typeof c ? c(s) : c[s], a = r(n) ? o.defaultCaption.replaceAll("{rating}", s) : n, e = r(i) ? o.clearCaptionClass : i, l = s === o.clearValue ? o.clearCaption : a, '<span class="' + e + '">' + l + "</span>"
		},
		getWidthFromValue: function(t) {
			var e = this,
				a = e.min,
				n = e.max;
			return a >= t || a === n ? 0 : t >= n ? 100 : 100 * (t - a) / (n - a)
		},
		getValueFromPosition: function(t) {
			var e, a, n = this,
				r = o(n.step),
				i = n.$rating.width();
			return a = n.diff * t / (i * n.step), a = n.rtl ? Math.floor(a) : Math.ceil(a), e = s(parseFloat(n.min + a * n.step), r), e = Math.max(Math.min(e, n.max), n.min), n.rtl ? n.max - e : e
		},
		toggleHover: function(t) {
			var e, a, n, r = this;
			r.hoverChangeCaption && (n = t.val <= r.clearValue ? r.fetchCaption(r.clearValue) : t.caption, r.$caption.html(n)), r.hoverChangeStars && (e = r.getWidthFromValue(r.clearValue), a = t.val <= r.clearValue ? r.rtl ? 100 - e + "%" : e + "%" : t.width, r.$stars.css("width", a))
		},
		calculate: function(t) {
			var e = this,
				a = r(e.$element.val()) ? 0 : e.$element.val(),
				n = arguments.length ? e.getValueFromPosition(t) : a,
				i = e.fetchCaption(n),
				l = e.getWidthFromValue(n);
			return e.rtl && (l = 100 - l), l += "%", {
				caption: i,
				width: l,
				val: n
			}
		},
		setStars: function(t) {
			var e = this,
				a = arguments.length ? e.calculate(t) : e.calculate();
			e.$element.val(a.val), e.$stars.css("width", a.width), e.$caption.html(a.caption), e.cache = a
		},
		clear: function() {
			var t = this,
				e = '<span class="' + t.clearCaptionClass + '">' + t.clearCaption + "</span>";
			t.$stars.removeClass("rated"), t.inactive || t.$caption.html(e), t.$element.val(t.clearValue), t.setStars(), t.$element.trigger("rating.clear")
		},
		reset: function() {
			var t = this;
			t.$element.val(t.initialValue), t.setStars(), t.$element.trigger("rating.reset")
		},
		update: function(t) {
			var e = this;
			arguments.length && (e.$element.val(t), e.setStars())
		},
		refresh: function(e) {
			var a = this;
			arguments.length && (a.$rating.off("rating"), a.$clear.off(), a.init(t.extend(a.options, e)), a.showClear ? a.$clear.show() : a.$clear.hide(), a.showCaption ? a.$caption.show() : a.$caption.hide(), a.$element.trigger("rating.refresh"))
		}
	}, t.fn.rating = function(e) {
		var a = Array.apply(null, arguments);
		return a.shift(), this.each(function() {
			var n = t(this),
				r = n.data("rating"),
				i = "object" == typeof e && e;
			r || n.data("rating", r = new c(this, t.extend({}, t.fn.rating.defaults, i, t(this).data()))), "string" == typeof e && r[e].apply(r, a)
		})
	}, t.fn.rating.defaults = {
		stars: 5,
		glyphicon: !0,
		symbol: null,
		ratingClass: "",
		disabled: !1,
		readonly: !1,
		rtl: !1,
		size: "md",
		showClear: !0,
		showCaption: !0,
		defaultCaption: "{rating} Stars",
		starCaptions: {
			.5: "Half Star",
			1: "One Star",
			1.5: "One & Half Star",
			2: "Two Stars",
			2.5: "Two & Half Stars",
			3: "Three Stars",
			3.5: "Three & Half Stars",
			4: "Four Stars",
			4.5: "Four & Half Stars",
			5: "Five Stars"
		},
		starCaptionClasses: {
			.5: "label label-danger",
			1: "label label-danger",
			1.5: "label label-warning",
			2: "label label-warning",
			2.5: "label label-info",
			3: "label label-info",
			3.5: "label label-primary",
			4: "label label-primary",
			4.5: "label label-success",
			5: "label label-success"
		},
		clearButton: '<i class="glyphicon glyphicon-minus-sign"></i>',
		clearButtonTitle: "Clear",
		clearButtonBaseClass: "clear-rating",
		clearButtonActiveClass: "clear-rating-active",
		clearCaption: "Not Rated",
		clearCaptionClass: "label label-default",
		clearValue: null,
		captionElement: null,
		clearElement: null,
		containerClass: null,
		hoverEnabled: !0,
		hoverChangeCaption: !0,
		hoverChangeStars: !0,
		hoverOnClear: !0
	}, t.fn.rating.Constructor = c, t("input.rating").addClass("rating-loading"), t(document).ready(function() {
		var e = t("input.rating"),
			a = Object.keys(e).length;
		a > 0 && e.rating()
	})
}(window.jQuery);