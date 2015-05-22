define(function(){
    return {
        init : function(fn){
            var fn = fn || {};
            function launchParticlesJS(tag_id, params) {
                function launchParticles() {
                    pJS.fn.canvasInit(),
                    pJS.fn.canvasSize(),
                    pJS.fn.canvasPaint(),
                    pJS.fn.particlesCreate(),
                    pJS.fn.particlesDraw(),
                    pJS.fn.densityAuto()
                }
                function launchAnimation() {
                    pJS.fn.particlesDraw(),
                    pJS.fn.requestAnimFrame = requestAnimFrame(launchAnimation)
                }
                var canvas_el = document.querySelector("#" + tag_id + " > canvas");
                pJS = {
                    canvas: {
                        el: canvas_el,
                        w: canvas_el.offsetWidth,
                        h: canvas_el.offsetHeight
                    },
                    particles: {
                        color: "#fff",
                        color_random: !1,
                        shape: "circle",
                        opacity: {
                            opacity: 1,
                            anim: {
                                enable: !1,
                                speed: 2,
                                opacity_min: 0,
                                sync: !1
                            }
                        },
                        size: 2.5,
                        size_random: !0,
                        nb: 200,
                        line_linked: {
                            enable_auto: !0,
                            distance: 100,
                            color: "#fff",
                            opacity: 1,
                            width: 1,
                            condensed_mode: {
                                enable: !1,
                                rotateX: 3e3,
                                rotateY: 3e3
                            }
                        },
                        anim: {
                            enable: !0,
                            speed: 2
                        },
                        array: []
                    },
                    interactivity: {
                        enable: !0,
                        mouse: {
                            distance: 100
                        },
                        detect_on: "canvas",
                        mode: "grab",
                        line_linked: {
                            opacity: 1
                        },
                        events: {
                            onclick: {
                                enable: !0,
                                mode: "push",
                                nb: 4
                            },
                            onresize: {
                                enable: !0,
                                mode: "out",
                                density_auto: !1,
                                density_area: 800
                            }
                        }
                    },
                    retina_detect: !1,
                    fn: {
                        vendors: {
                            interactivity: {}
                        }
                    }
                },
                Object.deepExtend = function(destination, source) {
                    for (var property in source) source[property] && source[property].constructor && source[property].constructor === Object ? (destination[property] = destination[property] || {},
                            arguments.callee(destination[property], source[property])) : destination[property] = source[property];
                    return destination
                },
                params && Object.deepExtend(pJS, params),
                pJS.particles.color_rgb = hexToRgb(pJS.particles.color),
                pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color),
                pJS.retina_detect && window.devicePixelRatio > 1 && (pJS.retina = !0, pJS.canvas.pxratio = window.devicePixelRatio, pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio, pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio, pJS.particles.anim.speed = pJS.particles.anim.speed * pJS.canvas.pxratio, pJS.particles.line_linked.distance = pJS.particles.line_linked.distance * pJS.canvas.pxratio, pJS.particles.line_linked.width = pJS.particles.line_linked.width * pJS.canvas.pxratio, pJS.interactivity.mouse.distance = pJS.interactivity.mouse.distance * pJS.canvas.pxratio),
                pJS.fn.canvasInit = function() {
                    pJS.canvas.ctx = pJS.canvas.el.getContext("2d");
                },
                pJS.fn.canvasSize = function() {
                    pJS.canvas.el.width = pJS.canvas.w,
                    pJS.canvas.el.height = pJS.canvas.h,
                    window.addEventListener("resize",
                            function() {
                                pJS && pJS.interactivity.events.onresize.enable && (pJS.canvas.w = pJS.canvas.el.offsetWidth, pJS.canvas.h = pJS.canvas.el.offsetHeight, pJS.retina && (pJS.canvas.w *= pJS.canvas.pxratio, pJS.canvas.h *= pJS.canvas.pxratio), pJS.canvas.el.width = pJS.canvas.w, pJS.canvas.el.height = pJS.canvas.h, pJS.fn.canvasPaint(), pJS.particles.anim.enable || (pJS.fn.particlesRemove(), pJS.fn.canvasRemove(), launchParticles()), pJS.fn.densityAuto())
                            })
                },
                pJS.fn.densityAuto = function() {
                    if (pJS.interactivity.events.onresize.density_auto) {
                        var area = pJS.canvas.el.width * pJS.canvas.el.height / 1e3;
                        pJS.retina && (area /= 2 * pJS.canvas.pxratio);
                        var nb_particles = area * pJS.particles.nb / pJS.interactivity.events.onresize.density_area,
                        missing_particles = pJS.particles.array.length - nb_particles;
                        0 > missing_particles ? pJS.fn.vendors.interactivity.pushParticles(Math.abs(missing_particles)) : pJS.fn.vendors.interactivity.removeParticles(missing_particles)
                    }
                },
                pJS.fn.canvasPaint = function() {
                    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h)
                },
                pJS.fn.canvasRemove = function() {
                    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h)
                },
                pJS.fn.particle = function(color, opacity, position) {
                    this.x = position ? position.x: Math.random() * pJS.canvas.w,
                    this.y = position ? position.y: Math.random() * pJS.canvas.h,
                    this.radius = (pJS.particles.size_random ? Math.random() : 1) * pJS.particles.size,
                    pJS.retina && (this.radius *= pJS.canvas.pxratio),
                    pJS.particles.color_random === !0 ? this.color = {
                        r: Math.floor(256 * Math.random()) + 0,
                        g: Math.floor(256 * Math.random()) + 0,
                        b: Math.floor(256 * Math.random()) + 0
                    }: pJS.particles.color_random instanceof Array ? (this.color = pJS.particles.color_random[Math.floor(Math.random() * pJS.particles.color_random.length)], this.color = hexToRgb(this.color)) : this.color = color,
                    this.opacity = opacity,
                    pJS.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = pJS.particles.opacity.anim.speed / 100, pJS.particles.opacity.anim.sync || (this.vo = this.vo * Math.random())),
                    this.vx = -.5 + Math.random(),
                    this.vy = -.5 + Math.random()
                },
                pJS.fn.particle.prototype.draw = function() {
                    switch (pJS.canvas.ctx.fillStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.opacity + ")", pJS.canvas.ctx.beginPath(), pJS.particles.shape) {
                        case "circle":
                            pJS.canvas.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1);
                            break;
                        case "edge":
                            pJS.canvas.ctx.rect(this.x, this.y, 2 * this.radius, 2 * this.radius);
                            break;
                        case "triangle":
                            pJS.canvas.ctx.moveTo(this.x, this.y - this.radius),
                            pJS.canvas.ctx.lineTo(this.x + this.radius, this.y + this.radius),
                            pJS.canvas.ctx.lineTo(this.x - this.radius, this.y + this.radius),
                            pJS.canvas.ctx.closePath()
                    }
                    pJS.canvas.ctx.fill()
                },
                pJS.fn.particlesCreate = function() {
                    for (var i = 0; i < pJS.particles.nb; i++) pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity.opacity))
                },
                pJS.fn.particlesAnimate = function() {
                    for (var i = 0; i < pJS.particles.array.length; i++) {
                        var p = pJS.particles.array[i];
                        switch (p.x += p.vx * (pJS.particles.anim.speed / 2), p.y += p.vy * (pJS.particles.anim.speed / 2), pJS.particles.opacity.anim.enable && (1 == p.opacity_status ? (p.opacity >= pJS.particles.opacity.opacity && (p.opacity_status = !1), p.opacity += p.vo) : (p.opacity <= pJS.particles.opacity.anim.opacity_min && (p.opacity_status = !0), p.opacity -= p.vo)), pJS.interactivity.events.onresize.mode) {
                            case "bounce":
                                p.x - p.radius > pJS.canvas.w ? p.vx = -p.vx: p.x + p.radius < 0 && (p.vx = -p.vx),
                                p.y - p.radius > pJS.canvas.h ? p.vy = -p.vy: p.y + p.radius < 0 && (p.vy = -p.vy);
                                break;
                            case "out":
                                p.x - p.radius > pJS.canvas.w ? p.x = p.radius: p.x + p.radius < 0 && (p.x = pJS.canvas.w + p.radius),
                                p.y - p.radius > pJS.canvas.h ? p.y = p.radius: p.y + p.radius < 0 && (p.y = pJS.canvas.h + p.radius)
                        }
                        for (var j = i + 1; j < pJS.particles.array.length; j++) {
                            var p2 = pJS.particles.array[j];
                            if (pJS.particles.line_linked.enable_auto && pJS.fn.vendors.distanceParticles(p, p2), pJS.interactivity.enable) switch (pJS.interactivity.mode) {
                                case "grab":
                                    pJS.fn.vendors.interactivity.grabParticles(p, p2)
                            }
                        }
                    }
                },
                pJS.fn.particlesDraw = function() {
                    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h),
                    pJS.fn.particlesAnimate();
                    for (var i = 0; i < pJS.particles.array.length; i++) {
                        var p = pJS.particles.array[i];
                        p.draw("rgba(" + p.color.r + "," + p.color.g + "," + p.color.b + "," + p.opacity + ")")
                    }
                },
                pJS.fn.particlesRemove = function() {
                    pJS.particles.array = []
                },
                pJS.fn.vendors.distanceParticles = function(p1, p2) {
                    var dx = p1.x - p2.x,
                    dy = p1.y - p2.y,
                    dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist <= pJS.particles.line_linked.distance) {
                        var color_line = pJS.particles.line_linked.color_rgb_line;
                        if (pJS.canvas.ctx.beginPath(), pJS.canvas.ctx.strokeStyle = "rgba(" + color_line.r + "," + color_line.g + "," + color_line.b + "," + (pJS.particles.line_linked.opacity - dist / pJS.particles.line_linked.distance) + ")", pJS.canvas.ctx.moveTo(p1.x, p1.y), pJS.canvas.ctx.lineTo(p2.x, p2.y), pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width, pJS.canvas.ctx.stroke(), pJS.canvas.ctx.closePath(), pJS.particles.line_linked.condensed_mode.enable) {
                            var dx = p1.x - p2.x,
                                dy = p1.y - p2.y,
                                ax = dx / (1e3 * pJS.particles.line_linked.condensed_mode.rotateX),
                                ay = dy / (1e3 * pJS.particles.line_linked.condensed_mode.rotateY);
                            p2.vx += ax,
                            p2.vy += ay
                        }
                    }
                },
                pJS.fn.vendors.interactivity.listeners = function() {
                    if ("window" == pJS.interactivity.detect_on) var detect_el = window;
                    else var detect_el = pJS.canvas.el;
                    if (detect_el.onmousemove = function(e) {
                        if (detect_el == window) var pos_x = e.clientX,
                            pos_y = e.clientY;
                        else var pos_x = e.offsetX || e.clientX,
                        pos_y = e.offsetY || e.clientY;
                        pJS && (pJS.interactivity.mouse.pos_x = pos_x, pJS.interactivity.mouse.pos_y = pos_y, pJS.retina && (pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio, pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio), pJS.interactivity.status = "mousemove")
                    },
                    detect_el.onmouseleave = function() {
                        pJS && (pJS.interactivity.mouse.pos_x = 0, pJS.interactivity.mouse.pos_y = 0, pJS.interactivity.status = "mouseleave")
                    },
                    pJS.interactivity.events.onclick.enable) switch (pJS.interactivity.events.onclick.mode) {
                        case "push":
                            detect_el.onclick = function() {
                                pJS.fn.vendors.interactivity.pushParticles(pJS.interactivity.events.onclick.nb, pJS.interactivity.mouse)
                            };
                            break;
                        case "remove":
                            detect_el.onclick = function() {
                                pJS.fn.vendors.interactivity.removeParticles(pJS.interactivity.events.onclick.nb)
                            }
                    }
                },
                pJS.fn.vendors.interactivity.pushParticles = function(nb, pos) {
                    if (pJS) for (var i = 0; nb > i; i++) pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color_rgb, pJS.particles.opacity.opacity, {
                        x: pos ? pos.pos_x: Math.random() * pJS.canvas.w,
                        y: pos ? pos.pos_y: Math.random() * pJS.canvas.h
                    }))
                },
                pJS.fn.vendors.interactivity.removeParticles = function(nb) {
                    pJS && pJS.particles.array.splice(0, nb)
                },
                pJS.fn.vendors.interactivity.grabParticles = function(p1, p2) {
                    var dx = p1.x - p2.x,
                    dy = p1.y - p2.y,
                    dist = Math.sqrt(dx * dx + dy * dy),
                    dx_mouse = p1.x - pJS.interactivity.mouse.pos_x,
                    dy_mouse = p1.y - pJS.interactivity.mouse.pos_y,
                    dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
                    if (dist <= pJS.particles.line_linked.distance && dist_mouse <= pJS.interactivity.mouse.distance && "mousemove" == pJS.interactivity.status) {
                        var color_line = pJS.particles.line_linked.color_rgb_line;
                        pJS.canvas.ctx.beginPath(),
                        pJS.canvas.ctx.strokeStyle = "rgba(" + color_line.r + "," + color_line.g + "," + color_line.b + "," + (pJS.interactivity.line_linked.opacity - dist_mouse / pJS.interactivity.mouse.distance) + ")",
                        pJS.canvas.ctx.moveTo(p1.x, p1.y),
                        pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y),
                        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width,
                        pJS.canvas.ctx.stroke(),
                        pJS.canvas.ctx.closePath()
                    }
                },
                pJS.fn.vendors.destroy = function() {
                    cancelAnimationFrame(pJS.fn.requestAnimFrame),
                    canvas_el.remove(),
                    pJS = null
                },
                launchParticles(),
                pJS.particles.anim.enable && launchAnimation(),
                pJS.interactivity.enable && pJS.fn.vendors.interactivity.listeners()
            };
            var hexToRgb = function(hex) {
                var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                hex = hex.replace(shorthandRegex,
                        function(m, r, g, b) {
                            return r + r + g + g + b + b
                        });
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                }: null
            };
            var particlesJS = function(tag_id, params) {
                "string" != typeof tag_id && (params = tag_id, tag_id = "particles-js"),
                tag_id || (tag_id = "particles-js");
                var canvas_el = document.createElement("canvas");
                canvas_el.style.width = "100%",
                canvas_el.style.height = "100%";
                var canvas = document.getElementById(tag_id).appendChild(canvas_el);
                null != canvas && launchParticlesJS(tag_id, params)
            };
            var requestAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1e3 / 60)
                    }
            }();
            var initParticleCount = Math.floor(2840 / 10);
            particlesJS("particles-js", {
                particles: {
                    color: "#3b1f8",
                    color_random: ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"],
                    shape: "circle",
                    opacity: {
                        opacity: .5,
                        anim: {
                            enable: !1,
                            speed: 1.5,
                            opacity_min: .15,
                            sync: !1
                        }
                    },
                    size: 2.5,
                    size_random: !0,
                    nb: initParticleCount,
                    line_linked: {
                        enable_auto: !0,
                        distance: 250,
                        color: "#33b1f8",
                        opacity: .25,
                        width: 1
                    },
                    anim: {
                        enable: !0,
                        speed: 1.5
                    }
                },
                interactivity: {
                    enable: !0,
                    mouse: {
                        distance: 250
                    },
                    detect_on: "canvas",
                    mode: !1,
                    line_linked: {
                        opacity: .5
                    },
                    events: {
                        onclick: {
                            enable: !0,
                            mode: "push",
                            nb: 4
                        },
                        onresize: {
                            enable: !0,
                            mode: "bounce",
                            density_auto: !1,
                            density_area: 800
                        }
                    }
                },
                retina_detect: !0
            });
        }
    }
});
