/*
Highcharts JS v3.0.2 (2013-06-05)

(c) 2009-2013 Torstein Hønsi

License: www.highcharts.com/license
*/
(function (k, F) {
    function K(a, b, c) { this.init.call(this, a, b, c) } function L(a, b, c) { a.call(this, b, c); if (this.chart.polar) this.closeSegment = function (a) { var c = this.xAxis.center; a.push("L", c[0], c[1]) }, this.closedStacks = !0 } function M(a, b) {
        var c = this.chart, d = this.options.animation, e = this.group, f = this.markerGroup, g = this.xAxis.center, j = c.plotLeft, l = c.plotTop; if (c.polar) {
            if (c.renderer.isSVG) if (d === !0 && (d = {}), b) {
                if (c = { translateX: g[0] + j, translateY: g[1] + l, scaleX: 0.001, scaleY: 0.001 }, e.attr(c), f) f.attrSetters = e.attrSetters,
f.attr(c)
            } else c = { translateX: j, translateY: l, scaleX: 1, scaleY: 1 }, e.animate(c, d), f && f.animate(c, d), this.animate = null
        } else a.call(this, b)
    } var Q = k.arrayMin, R = k.arrayMax, r = k.each, H = k.extend, m = k.merge, S = k.map, q = k.pick, x = k.pInt, n = k.getOptions().plotOptions, h = k.seriesTypes, A = k.extendClass, N = k.splat, p = k.wrap, O = k.Axis, v = k.Tick, B = k.Series, y = h.column.prototype, u = Math, I = u.round, C = u.floor, J = u.ceil, T = u.min, U = u.max, t = function () { }; H(K.prototype, { init: function (a, b, c) {
        var d = this, e = d.defaultOptions; d.chart = b; if (b.angular) e.background =
{}; d.options = a = m(e, a); (a = a.background) && r([].concat(N(a)).reverse(), function (a) { var b = a.backgroundColor, a = m(d.defaultBackgroundOptions, a); if (b) a.backgroundColor = b; a.color = a.backgroundColor; c.options.plotBands.unshift(a) })
    }, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: { shape: "circle", borderWidth: 1, borderColor: "silver", backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#FFF"], [1, "#DDD"]] }, from: Number.MIN_VALUE, innerRadius: 0, to: Number.MAX_VALUE,
        outerRadius: "105%"
    }
    }); var G = O.prototype, v = v.prototype, V = { getOffset: t, redraw: function () { this.isDirty = !1 }, render: function () { this.isDirty = !1 }, setScale: t, setCategories: t, setTitle: t }, P = { isRadial: !0, defaultRadialGaugeOptions: { labels: { align: "center", x: 0, y: null }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, plotBands: [], tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2 }, defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null,
        distance: 15, x: 0, y: null
    }, maxPadding: 0, minPadding: 0, plotBands: [], showLastLabel: !1, tickLength: 0
    }, defaultRadialYOptions: { gridLineInterpolation: "circle", labels: { align: "right", x: -3, y: -2 }, plotBands: [], showLastLabel: !1, title: { x: 4, text: null, rotation: 90} }, setOptions: function (a) { this.options = m(this.defaultOptions, this.defaultRadialOptions, a) }, getOffset: function () { G.getOffset.call(this); this.chart.axisOffset[this.side] = 0; this.center = this.pane.center = h.pie.prototype.getCenter.call(this.pane) }, getLinePath: function (a,
b) { var c = this.center, b = q(b, c[2] / 2 - this.offset); return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }) }, setAxisTranslation: function () {
    G.setAxisTranslation.call(this); if (this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.isXAxis)) this.minPixelPadding = this.transA * this.minPointOffset + (this.reversed ? (this.endAngleRad - this.startAngleRad) /
4 : 0)
}, beforeSetTickPositions: function () { this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange) }, setAxisSize: function () { G.setAxisSize.call(this); if (this.center) this.len = this.width = this.height = this.isCircular ? this.center[2] * (this.endAngleRad - this.startAngleRad) / 2 : this.center[2] / 2 }, getPosition: function (a, b) { if (!this.isCircular) b = this.translate(a), a = this.min; return this.postTranslate(this.translate(a), q(b, this.center[2] / 2) - this.offset) }, postTranslate: function (a, b) {
    var c =
this.chart, d = this.center, a = this.startAngleRad + a; return { x: c.plotLeft + d[0] + Math.cos(a) * b, y: c.plotTop + d[1] + Math.sin(a) * b}
}, getPlotBandPath: function (a, b, c) {
    var d = this.center, e = this.startAngleRad, f = d[2] / 2, g = [q(c.outerRadius, "100%"), c.innerRadius, q(c.thickness, 10)], j = /%$/, l, o = this.isCircular; this.options.gridLineInterpolation === "polygon" ? d = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (o || (g[0] = this.translate(a), g[1] = this.translate(b)), g = S(g, function (a) { j.test(a) && (a = x(a, 10) * f / 100); return a }),
c.shape === "circle" || !o ? (a = -Math.PI / 2, b = Math.PI * 1.5, l = !0) : (a = e + this.translate(a), b = e + this.translate(b)), d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], g[0], g[0], { start: a, end: b, innerR: q(g[1], g[0] - g[2]), open: l })); return d
}, getPlotLinePath: function (a, b) {
    var c = this.center, d = this.chart, e = this.getPosition(a), f, g, j; this.isCircular ? j = ["M", c[0] + d.plotLeft, c[1] + d.plotTop, "L", e.x, e.y] : this.options.gridLineInterpolation === "circle" ? (a = this.translate(a)) && (j = this.getLinePath(0, a)) : (f = d.xAxis[0],
j = [], a = this.translate(a), c = f.tickPositions, f.autoConnect && (c = c.concat([c[0]])), b && (c = [].concat(c).reverse()), r(c, function (c, b) { g = f.getPosition(c, a); j.push(b ? "L" : "M", g.x, g.y) })); return j
}, getTitlePosition: function () { var a = this.center, b = this.chart, c = this.options.title; return { x: b.plotLeft + a[0] + (c.x || 0), y: b.plotTop + a[1] - { high: 0.5, middle: 0.25, low: 0}[c.align] * a[2] + (c.y || 0)} } 
    }; p(G, "init", function (a, b, c) {
        var i; var d = b.angular, e = b.polar, f = c.isX, g = d && f, j, l; l = b.options; var o = c.pane || 0; if (d) {
            if (H(this, g ? V : P),
j = !f) this.defaultRadialOptions = this.defaultRadialGaugeOptions
        } else if (e) H(this, P), this.defaultRadialOptions = (j = f) ? this.defaultRadialXOptions : m(this.defaultYAxisOptions, this.defaultRadialYOptions); a.call(this, b, c); if (!g && (d || e)) {
            a = this.options; if (!b.panes) b.panes = []; this.pane = (i = b.panes[o] = b.panes[o] || new K(N(l.pane)[o], b, this), o = i); o = o.options; b.inverted = !1; l.chart.zoomType = null; this.startAngleRad = b = (o.startAngle - 90) * Math.PI / 180; this.endAngleRad = l = (q(o.endAngle, o.startAngle + 360) - 90) * Math.PI / 180; this.offset =
a.offset || 0; if ((this.isCircular = j) && c.max === F && l - b === 2 * Math.PI) this.autoConnect = !0
        } 
    }); p(v, "getPosition", function (a, b, c, d, e) { var f = this.axis; return f.getPosition ? f.getPosition(c) : a.call(this, b, c, d, e) }); p(v, "getLabelPosition", function (a, b, c, d, e, f, g, j, l) {
        var o = this.axis, i = f.y, h = f.align, k = (o.translate(this.pos) + o.startAngleRad + Math.PI / 2) / Math.PI * 180; o.isRadial ? (a = o.getPosition(this.pos, o.center[2] / 2 + q(f.distance, -25)), f.rotation === "auto" ? d.attr({ rotation: k }) : i === null && (i = x(d.styles.lineHeight) * 0.9 - d.getBBox().height /
2), h === null && (h = o.isCircular ? k > 20 && k < 160 ? "left" : k > 200 && k < 340 ? "right" : "center" : "center", d.attr({ align: h })), a.x += f.x, a.y += i) : a = a.call(this, b, c, d, e, f, g, j, l); return a
    }); p(v, "getMarkPath", function (a, b, c, d, e, f, g) { var j = this.axis; j.isRadial ? (a = j.getPosition(this.pos, j.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, e, f, g); return b }); n.arearange = m(n.area, { lineWidth: 1, marker: null, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>' },
        trackByArea: !0, dataLabels: { verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0}
    }); h.arearange = k.extendClass(h.area, { type: "arearange", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "low", getSegments: function () { var a = this; r(a.points, function (b) { if (!a.options.connectNulls && (b.low === null || b.high === null)) b.y = null; else if (b.low === null && b.high !== null) b.y = b.high }); B.prototype.getSegments.call(this) }, translate: function () {
        var a = this.yAxis; h.area.prototype.translate.apply(this);
        r(this.points, function (b) { var c = b.low, d = b.high, e = b.plotY; d === null && c === null ? b.y = null : c === null ? (b.plotLow = b.plotY = null, b.plotHigh = a.toPixels(d, !0)) : d === null ? (b.plotLow = e, b.plotHigh = null) : (b.plotLow = e, b.plotHigh = a.toPixels(d, !0)) })
    }, getSegmentPath: function (a) {
        var b, c = [], d = a.length, e = B.prototype.getSegmentPath, f, g; g = this.options; var j = g.step; for (b = HighchartsAdapter.grep(a, function (a) { return a.plotLow !== null }); d--; ) f = a[d], f.plotHigh !== null && c.push({ plotX: f.plotX, plotY: f.plotHigh }); a = e.call(this, b); if (j) j ===
!0 && (j = "left"), g.step = { left: "right", center: "center", right: "left"}[j]; c = e.call(this, c); g.step = j; g = [].concat(a, c); c[0] = "L"; this.areaPath = this.areaPath.concat(a, c); return g
    }, drawDataLabels: function () {
        var a = this.data, b = a.length, c, d = [], e = B.prototype, f = this.options.dataLabels, g, j = this.chart.inverted; if (f.enabled || this._hasPointLabels) {
            for (c = b; c--; ) g = a[c], g.y = g.high, g.plotY = g.plotHigh, d[c] = g.dataLabel, g.dataLabel = g.dataLabelUpper, g.below = !1, j ? (f.align = "left", f.x = f.xHigh) : f.y = f.yHigh; e.drawDataLabels.apply(this,
arguments); for (c = b; c--; ) g = a[c], g.dataLabelUpper = g.dataLabel, g.dataLabel = d[c], g.y = g.low, g.plotY = g.plotLow, g.below = !0, j ? (f.align = "right", f.x = f.xLow) : f.y = f.yLow; e.drawDataLabels.apply(this, arguments)
        } 
    }, alignDataLabel: h.column.prototype.alignDataLabel, getSymbol: h.column.prototype.getSymbol, drawPoints: t
    }); n.areasplinerange = m(n.arearange); h.areasplinerange = A(h.arearange, { type: "areasplinerange", getPointSpline: h.spline.prototype.getPointSpline }); n.columnrange = m(n.column, n.arearange, { lineWidth: 1, pointRange: null });
    h.columnrange = A(h.arearange, { type: "columnrange", translate: function () { var a = this.yAxis, b; y.translate.apply(this); r(this.points, function (c) { var d = c.shapeArgs; c.plotHigh = b = a.translate(c.high, 0, 1, 0, 1); c.plotLow = c.plotY; d.y = b; d.height = c.plotY - b }) }, trackerGroups: ["group", "dataLabels"], drawGraph: t, pointAttrToOptions: y.pointAttrToOptions, drawPoints: y.drawPoints, drawTracker: y.drawTracker, animate: y.animate, getColumnMetrics: y.getColumnMetrics }); n.gauge = m(n.line, { dataLabels: { enabled: !0, y: 15, borderWidth: 1, borderColor: "silver",
        borderRadius: 3, style: { fontWeight: "bold" }, verticalAlign: "top", zIndex: 2
    }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1
    }); v = { type: "gauge", pointClass: k.extendClass(k.Point, { setState: function (a) { this.state = a } }), angular: !0, drawGraph: t, trackerGroups: ["group", "dataLabels"], translate: function () {
        var a = this.yAxis, b = this.options, c = a.center; this.generatePoints(); r(this.points, function (d) {
            var e = m(b.dial, d.dial), f = x(q(e.radius, 80)) * c[2] / 200, g = x(q(e.baseLength, 70)) * f / 100, j = x(q(e.rearLength, 10)) * f / 100,
l = e.baseWidth || 3, o = e.topWidth || 1, i = a.startAngleRad + a.translate(d.y, null, null, null, !0); b.wrap === !1 && (i = Math.max(a.startAngleRad, Math.min(a.endAngleRad, i))); i = i * 180 / Math.PI; d.shapeType = "path"; d.shapeArgs = { d: e.path || ["M", -j, -l / 2, "L", g, -l / 2, f, -o / 2, f, o / 2, g, l / 2, -j, l / 2, "z"], translateX: c[0], translateY: c[1], rotation: i }; d.plotX = c[0]; d.plotY = c[1]
        })
    }, drawPoints: function () {
        var a = this, b = a.yAxis.center, c = a.pivot, d = a.options, e = d.pivot, f = a.chart.renderer; r(a.points, function (c) {
            var b = c.graphic, e = c.shapeArgs, o = e.d,
i = m(d.dial, c.dial); b ? (b.animate(e), e.d = o) : c.graphic = f[c.shapeType](e).attr({ stroke: i.borderColor || "none", "stroke-width": i.borderWidth || 0, fill: i.backgroundColor || "black", rotation: e.rotation }).add(a.group)
        }); c ? c.animate({ translateX: b[0], translateY: b[1] }) : a.pivot = f.circle(0, 0, q(e.radius, 5)).attr({ "stroke-width": e.borderWidth || 0, stroke: e.borderColor || "silver", fill: e.backgroundColor || "black" }).translate(b[0], b[1]).add(a.group)
    }, animate: function (a) {
        var b = this; if (!a) r(b.points, function (a) {
            var d = a.graphic;
            d && (d.attr({ rotation: b.yAxis.startAngleRad * 180 / Math.PI }), d.animate({ rotation: a.shapeArgs.rotation }, b.options.animation))
        }), b.animate = null
    }, render: function () { this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup); h.pie.prototype.render.call(this); this.group.clip(this.chart.clipRect) }, setData: h.pie.prototype.setData, drawTracker: h.column.prototype.drawTracker
    }; h.gauge = k.extendClass(h.line, v); n.boxplot = m(n.column, { fillColor: "#FFFFFF", lineWidth: 1,
        medianWidth: 2, states: { hover: { brightness: -0.3} }, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color};font-weight:bold">{series.name}</span><br/>Minimum: {point.low}<br/>Lower quartile: {point.q1}<br/>Median: {point.median}<br/>Higher quartile: {point.q3}<br/>Maximum: {point.high}<br/>' }, whiskerLength: "50%", whiskerWidth: 2
    }); h.boxplot = A(h.column, { type: "boxplot", pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (a) { return [a.low, a.q1, a.median, a.q3, a.high] }, pointValKey: "high",
        pointAttrToOptions: { fill: "fillColor", stroke: "color", "stroke-width": "lineWidth" }, drawDataLabels: t, translate: function () { var a = this.yAxis, b = this.pointArrayMap; h.column.prototype.translate.apply(this); r(this.points, function (c) { r(b, function (b) { c[b] !== null && (c[b + "Plot"] = a.translate(c[b], 0, 1, 0, 1)) }) }) }, drawPoints: function () {
            var a = this, b = a.points, c = a.options, d = a.chart.renderer, e, f, g, j, l, o, i, h, k, n, s, E, p, w, m, u, y, t, x, v, B, A, z = a.doQuartiles !== !1, D = parseInt(a.options.whiskerLength, 10) / 100; r(b, function (b) {
                k = b.graphic;
                B = b.shapeArgs; s = {}; w = {}; u = {}; A = b.color || a.color; if (b.plotY !== F) if (e = b.pointAttr[b.selected ? "selected" : ""], y = B.width, t = C(B.x), x = t + y, v = I(y / 2), f = C(z ? b.q1Plot : b.lowPlot), g = C(z ? b.q3Plot : b.lowPlot), j = C(b.highPlot), l = C(b.lowPlot), s.stroke = b.stemColor || c.stemColor || A, s["stroke-width"] = q(b.stemWidth, c.stemWidth, c.lineWidth), s.dashstyle = b.stemDashStyle || c.stemDashStyle, w.stroke = b.whiskerColor || c.whiskerColor || A, w["stroke-width"] = q(b.whiskerWidth, c.whiskerWidth, c.lineWidth), u.stroke = b.medianColor || c.medianColor ||
A, u["stroke-width"] = q(b.medianWidth, c.medianWidth, c.lineWidth), i = s["stroke-width"] % 2 / 2, h = t + v + i, n = ["M", h, g, "L", h, j, "M", h, f, "L", h, l, "z"], z && (i = e["stroke-width"] % 2 / 2, h = C(h) + i, f = C(f) + i, g = C(g) + i, t += i, x += i, E = ["M", t, g, "L", t, f, "L", x, f, "L", x, g, "L", t, g, "z"]), D && (i = w["stroke-width"] % 2 / 2, j += i, l += i, p = ["M", h - v * D, j, "L", h + v * D, j, "M", h - v * D, l, "L", h + v * D, l]), i = u["stroke-width"] % 2 / 2, o = I(b.medianPlot) + i, m = ["M", t, o, "L", x, o, "z"], k) b.stem.animate({ d: n }), D && b.whiskers.animate({ d: p }), z && b.box.animate({ d: E }), b.medianShape.animate({ d: m });
                else { b.graphic = k = d.g().add(a.group); b.stem = d.path(n).attr(s).add(k); if (D) b.whiskers = d.path(p).attr(w).add(k); if (z) b.box = d.path(E).attr(e).add(k); b.medianShape = d.path(m).attr(u).add(k) } 
            })
        } 
    }); n.errorbar = m(n.boxplot, { color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: n.arearange.tooltip.pointFormat }, whiskerWidth: null }); h.errorbar = A(h.boxplot, { type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "high", doQuartiles: !1, getColumnMetrics: function () {
        return this.linkedParent &&
this.linkedParent.columnMetrics || h.column.prototype.getColumnMetrics.call(this)
    } 
    }); p(G, "getSeriesExtremes", function (a, b) {
        a.call(this, b); if (!this.isXAxis) {
            var c = this, d = [], e = !0; r(c.series, function (a) {
                if (a.visible && a.stackKey && !(a.type !== "waterfall" || HighchartsAdapter.inArray(a.stackKey) !== -1)) {
                    if (e) c.dataMin = c.dataMax = null, e = !1; var b = a.processedYData, j = b.length, l = b[0], h = b[0], i = a.options.threshold, k = c.stacks, n = a.stackKey, p = "-" + n, s, E, m, w; for (w = 0; w < j; w++) {
                        m = b[w] < i ? p : n; s = k[m][w].total; if (w > i) s += E, k[m][w].setTotal(s),
k[m][w]._cum = null; s < l && (l = s); s > h && (h = s); E = s
                    } a.dataMin = l; a.dataMax = h; c.dataMin = T(q(c.dataMin, l), l, i); c.dataMax = U(q(c.dataMax, h), h, i); d.push(a.stackKey); if (typeof i === "number") if (c.dataMin >= i) c.dataMin = i, c.ignoreMinPadding = !0; else if (c.dataMax < i) c.dataMax = i, c.ignoreMaxPadding = !0
                } 
            })
        } 
    }); n.waterfall = m(n.column, { lineWidth: 1, lineColor: "#333", dashStyle: "dot", borderColor: "#333" }); h.waterfall = A(h.column, { type: "waterfall", upColorProp: "fill", pointArrayMap: ["y", "low"], pointValKey: "y", init: function (a, b) {
        b.stacking =
!0; h.column.prototype.init.call(this, a, b)
    }, translate: function () {
        var a = this.yAxis, b, c, d, e, f, g, j, l, o, i, k, n, m, p = this.options.borderWidth % 2 / 2; h.column.prototype.translate.apply(this); d = this.points; o = j = d[0]; g = l = d[0].y; for (c = 1, b = d.length; c < b; c++) if (e = d[c], f = e.shapeArgs, m = this.getStack(c), k = this.getStack(c - 1), n = this.getStackY(k), o === null && (o = e, l = 0), e.y && !e.isSum && !e.isIntermediateSum && (g += e.y, l += e.y), e.isSum || e.isIntermediateSum) e.isIntermediateSum ? (i = this.getSumEdges(o, d[c - 1]), e.y = l, o = null) : (i = this.getSumEdges(j,
d[c - 1]), e.y = g), f.y = e.plotY = i[1], f.height = i[0] - i[1]; else if (i = m._cum === null ? k.total : m._cum, m._cum = i + e.y, e.y < 0) f.y = J(a.translate(i, 0, 1)) - p, f.height = J(a.translate(m._cum, 0, 1) - f.y); else { if (k.total + e.y < 0) f.y = a.translate(m._cum, 0, 1); f.height = C(n - f.y) } 
    }, processData: function (a) { B.prototype.processData.call(this, a); var a = this.yData, b = a.length, c, d; for (d = 0; d < b; d++) c = a[d], c !== null && typeof c !== "number" && (a[d] = c === "sum" ? null : c === "intermediateSum" ? null : c[0]) }, toYData: function (a) {
        if (a.isSum) return "sum"; else if (a.isIntermediateSum) return "intermediateSum";
        return [a.y]
    }, getAttribs: function () { h.column.prototype.getAttribs.apply(this, arguments); var a = this.options, b = a.states, c = a.upColor || this.color, a = k.Color(c).brighten(0.1).get(), d = m(this.pointAttr), e = this.upColorProp; d[""][e] = c; d.hover[e] = b.hover.upColor || a; d.select[e] = b.select.upColor || c; r(this.points, function (a) { if (a.y > 0 && !a.color) a.pointAttr = d, a.color = c }) }, getGraphPath: function () {
        var a = this.data, b = a.length, c = I(this.options.lineWidth + this.options.borderWidth) % 2 / 2, d = [], e, f, g; for (g = 1; g < b; g++) f = a[g].shapeArgs,
e = a[g - 1].shapeArgs, f = ["M", e.x + e.width, e.y + c, "L", f.x, e.y + c], a[g - 1].y < 0 && (f[2] += e.height, f[5] += e.height), d = d.concat(f); return d
    }, getStack: function (a) { var b = this.yAxis.stacks, c = this.stackKey; this.processedYData[a] < this.options.threshold && (c = "-" + c); return b[c][a] }, getStackY: function (a) { return J(this.yAxis.translate(a.total, null, !0)) }, getSumEdges: function (a, b) {
        var c, d, e; d = this.options.threshold; c = a.y >= d ? a.shapeArgs.y + a.shapeArgs.height : a.shapeArgs.y; d = b.y >= d ? b.shapeArgs.y : b.shapeArgs.y + b.shapeArgs.height;
        d > c && (e = c, c = d, d = e); return [c, d]
    }, drawGraph: B.prototype.drawGraph
    }); n.bubble = m(n.scatter, { dataLabels: { inside: !0, style: { color: "white", textShadow: "0px 0px 3px black" }, verticalAlign: "middle" }, marker: { lineColor: null, lineWidth: 1 }, minSize: 8, maxSize: "20%", tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, zThreshold: 0 }); h.bubble = A(h.scatter, { type: "bubble", pointArrayMap: ["y", "z"], trackerGroups: ["group", "dataLabelsGroup"], pointAttrToOptions: { stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor" },
        applyOpacity: function (a) { var b = this.options.marker, c = q(b.fillOpacity, 0.5), a = a || b.fillColor || this.color; c !== 1 && (a = k.Color(a).setOpacity(c).get("rgba")); return a }, convertAttribs: function () { var a = B.prototype.convertAttribs.apply(this, arguments); a.fill = this.applyOpacity(a.fill); return a }, getRadii: function (a, b, c, d) { var e, f, g, j = this.zData, h = []; for (f = 0, e = j.length; f < e; f++) g = b - a, g = g > 0 ? (j[f] - a) / (b - a) : 0.5, h.push(u.ceil(c + g * (d - c)) / 2); this.radii = h }, animate: function (a) {
            var b = this.options.animation; if (!a) r(this.points,
function (a) { var d = a.graphic, a = a.shapeArgs; d && a && (d.attr("r", 1), d.animate({ r: a.r }, b)) }), this.animate = null
        }, translate: function () { var a, b = this.data, c, d, e = this.radii; h.scatter.prototype.translate.call(this); for (a = b.length; a--; ) c = b[a], d = e ? e[a] : 0, c.negative = c.z < (this.options.zThreshold || 0), d >= this.minPxSize / 2 ? (c.shapeType = "circle", c.shapeArgs = { x: c.plotX, y: c.plotY, r: d }, c.dlBox = { x: c.plotX - d, y: c.plotY - d, width: 2 * d, height: 2 * d }) : c.shapeArgs = c.plotY = c.dlBox = F }, drawLegendSymbol: function (a, b) {
            var c = x(a.itemStyle.fontSize) /
2; b.legendSymbol = this.chart.renderer.circle(c, a.baseline - c, c).attr({ zIndex: 3 }).add(b.legendGroup)
        }, drawPoints: h.column.prototype.drawPoints, alignDataLabel: h.column.prototype.alignDataLabel
    }); O.prototype.beforePadding = function () {
        var a = this, b = this.len, c = this.chart, d = 0, e = b, f = this.isXAxis, g = f ? "xData" : "yData", j = this.min, h = {}, k = u.min(c.plotWidth, c.plotHeight), i = Number.MAX_VALUE, m = -Number.MAX_VALUE, n = this.max - j, p = b / n, s = []; this.tickPositions && (r(this.series, function (b) {
            var c = b.options; if (b.type === "bubble" &&
b.visible && (a.allowZoomOutside = !0, s.push(b), f)) r(["minSize", "maxSize"], function (a) { var b = c[a], d = /%$/.test(b), b = x(b); h[a] = d ? k * b / 100 : b }), b.minPxSize = h.minSize, b = b.zData, b.length && (i = u.min(i, u.max(Q(b), c.displayNegative === !1 ? c.zThreshold : -Number.MAX_VALUE)), m = u.max(m, R(b)))
        }), r(s, function (a) { var b = a[g], c = b.length, k; f && a.getRadii(i, m, h.minSize, h.maxSize); if (n > 0) for (; c--; ) k = a.radii[c], d = Math.min((b[c] - j) * p - k, d), e = Math.max((b[c] - j) * p + k, e) }), n > 0 && q(this.options.min, this.userMin) === F && q(this.options.max,
this.userMax) === F && (e -= b, p *= (b + d - e) / b, this.min += d / p, this.max += e / p))
    }; var z = B.prototype, n = k.Pointer.prototype; z.toXY = function (a) { var b, c = this.chart; b = a.plotX; var d = a.plotY; a.rectPlotX = b; a.rectPlotY = d; a.clientX = b / Math.PI * 180; b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - d); a.plotX = a.polarPlotX = b.x - c.plotLeft; a.plotY = a.polarPlotY = b.y - c.plotTop }; p(h.area.prototype, "init", L); p(h.areaspline.prototype, "init", L); p(h.spline.prototype, "getPointSpline", function (a, b, c, d) {
        var e, f, g, j, h, k, i; if (this.chart.polar) {
            e =
c.plotX; f = c.plotY; a = b[d - 1]; g = b[d + 1]; this.connectEnds && (a || (a = b[b.length - 2]), g || (g = b[1])); if (a && g) j = a.plotX, h = a.plotY, b = g.plotX, k = g.plotY, j = (1.5 * e + j) / 2.5, h = (1.5 * f + h) / 2.5, g = (1.5 * e + b) / 2.5, i = (1.5 * f + k) / 2.5, b = Math.sqrt(Math.pow(j - e, 2) + Math.pow(h - f, 2)), k = Math.sqrt(Math.pow(g - e, 2) + Math.pow(i - f, 2)), j = Math.atan2(h - f, j - e), h = Math.atan2(i - f, g - e), i = Math.PI / 2 + (j + h) / 2, Math.abs(j - i) > Math.PI / 2 && (i -= Math.PI), j = e + Math.cos(i) * b, h = f + Math.sin(i) * b, g = e + Math.cos(Math.PI + i) * k, i = f + Math.sin(Math.PI + i) * k, c.rightContX = g, c.rightContY =
i; d ? (c = ["C", a.rightContX || a.plotX, a.rightContY || a.plotY, j || e, h || f, e, f], a.rightContX = a.rightContY = null) : c = ["M", e, f]
        } else c = a.call(this, b, c, d); return c
    }); p(z, "translate", function (a) { a.call(this); if (this.chart.polar && !this.preventPostTranslate) for (var a = this.points, b = a.length; b--; ) this.toXY(a[b]) }); p(z, "getSegmentPath", function (a, b) {
        var c = this.points; if (this.chart.polar && this.options.connectEnds !== !1 && b[b.length - 1] === c[c.length - 1] && c[0].y !== null) this.connectEnds = !0, b = [].concat(b, [c[0]]); return a.call(this,
b)
    }); p(z, "animate", M); p(y, "animate", M); p(z, "setTooltipPoints", function (a, b) { this.chart.polar && H(this.xAxis, { tooltipLen: 360 }); return a.call(this, b) }); p(y, "translate", function (a) {
        var b = this.xAxis, c = this.yAxis.len, d = b.center, e = b.startAngleRad, f = this.chart.renderer, g, h; this.preventPostTranslate = !0; a.call(this); if (b.isRadial) {
            b = this.points; for (h = b.length; h--; ) g = b[h], a = g.barX + e, g.shapeType = "path", g.shapeArgs = { d: f.symbols.arc(d[0], d[1], c - g.plotY, null, { start: a, end: a + g.pointWidth, innerR: c - q(g.yBottom, c) }) },
this.toXY(g)
        } 
    }); p(y, "alignDataLabel", function (a, b, c, d, e, f) { if (this.chart.polar) { a = b.rectPlotX / Math.PI * 180; if (d.align === null) d.align = a > 20 && a < 160 ? "left" : a > 200 && a < 340 ? "right" : "center"; if (d.verticalAlign === null) d.verticalAlign = a < 45 || a > 315 ? "bottom" : a > 135 && a < 225 ? "top" : "middle"; z.alignDataLabel.call(this, b, c, d, e, f) } else a.call(this, b, c, d, e, f) }); p(n, "getIndex", function (a, b) {
        var c, d = this.chart, e; d.polar ? (e = d.xAxis[0].center, c = b.chartX - e[0] - d.plotLeft, d = b.chartY - e[1] - d.plotTop, c = 180 - Math.round(Math.atan2(c,
d) / Math.PI * 180)) : c = a.call(this, b); return c
    }); p(n, "getCoordinates", function (a, b) { var c = this.chart, d = { xAxis: [], yAxis: [] }; c.polar ? r(c.axes, function (a) { var f = a.isXAxis, g = a.center, h = b.chartX - g[0] - c.plotLeft, g = b.chartY - g[1] - c.plotTop; d[f ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(f ? Math.PI - Math.atan2(h, g) : Math.sqrt(Math.pow(h, 2) + Math.pow(g, 2)), !0) }) }) : d = a.call(this, b); return d })
})(Highcharts);
