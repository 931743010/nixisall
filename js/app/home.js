define(['jquery','canvas'],function($,canvas){
    canvas.particlesJS( 'particles-js' , {
        particles: {
            color: "#3b1f8",
            color_random: ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"],
            shape: "circle",
            opacity: {
                opacity: .8,
                anim: {
                    enable: !1,
                    speed: 2,
                    opacity_min: .15,
                    sync: !1
                }
            },
            size:2.5,
            size_random: !0,
            nb : Math.floor(document.body.clientWidth / 15),
            line_linked: {
                enable_auto: !0,
                distance: 250,
                color: "#33b1f8",
                opacity: .25,
                width: 1
            },
            anim: {
                enable: !0,
                speed:5
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
                    nb:4
                },
                onresize: {
                    enable: !0,
                    mode: "bounce",
                    density_auto: !0,
                    density_area: 800
                }
            }
        },
        retina_detect: !0
    });
});
