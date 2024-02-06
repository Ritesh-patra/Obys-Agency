function smooth() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}

function loaderanimation() {
  var tl = gsap.timeline();

  tl.from(".line h1,.line h2", {
    y: 150,
    stagger: .25,
    duration: .6,
    delay: .5
  })



  tl.from("#line-part1 h5,#line-part1 h6", {
    opacity: 0,
    duration: .6,
    onStart: function () {
      var growh5 = document.querySelector("#line-part1 h5");
      var grow = 0;
      setInterval(function () {
        grow++
        if (grow <= 100) {
          growh5.innerHTML = grow;
        } else {
          grow = 100;
          growh5.innerHTML = grow;
        }
      }, 30)
    }
  })



  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 2.8
  })

  tl.from("#page1", {
    delay: .2,
    y: 1200,
    esce: Power3,
    pin: true
  })
  tl.to("#loader", {
    display: "none"
  })
  tl.from("#nav", {
    opacity: 0
  })
  tl.from(".hero h1,#hero3 h2,.hero h3", {
    y: 150,
    stagger: .3,
  })


}

function cursormove() {
  document.addEventListener("mouseenter", function () {
    var cursor = document.querySelector("#cursor");
    cursor.style.opacity = 1
  })
  document.addEventListener("mouseleave", function () {
    cursor.style.opacity = 0
  })


  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      y: dets.y - cursor.offsetHeight / 2,
      x: dets.x - cursor.offsetWidth / 2
    })
  })
  var page2 = document.querySelector("#page2");
  page2.addEventListener("mouseenter", function () {
    var cursor = document.querySelector("#cursor");
    cursor.style.opacity = 0
  })
  page2.addEventListener("mouseleave", function () {
    cursor.style.opacity = 1
  })
}

Shery.makeMagnet("#nav-part2 h4,#nav svg ");

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 3,
    config: { "uFrequencyX": { "value": 12, "range": [0, 100] }, "uFrequencyY": { "value": 12, "range": [0, 100] }, "uFrequencyZ": { "value": 10, "range": [0, 100] }, "geoVertex": { "range": [1, 64], "value": 17.35 }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7428538298036819 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": true }, "growSize": { "value": 3.35, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.37, "range": [1, 5] }, "scrollType": { "value": 0 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.23, "range": [0, 2], "_gsap": { "id": 3 } }, "discard_threshold": { "value": 0.51, "range": [0, 1] }, "antialias_threshold": { "value": 0.02, "range": [0, 0.1] }, "noise_height": { "value": 0.43, "range": [0, 2] }, "noise_scale": { "value": 14.5, "range": [0, 100] } },
    gooey: true,
    // debug:true,
  });
}

function videoAnimation() {
  var videocon = document.querySelector("#main-vd");
  var videoCursor = document.querySelector("#video-cont");
  var on = 0;
  videoCursor.addEventListener("click", function () {
    if (on === 0) {
      videocon.play();
      videocon.style.opacity = 1,
        document.querySelector("#play").innerHTML = `<i class="ri-pause-line"></i>`
      gsap.to("#play", {
        scale: .8
      })
      on = 1;
    } else {
      videocon.pause();
      videocon.style.opacity = 0,
        document.querySelector("#play").innerHTML = ` <i class="ri-play-fill"></i>`
      gsap.to("#play", {
        scale: 1
      })
      on = 0;
    }
  })
  videoCursor.addEventListener("mousemove", function (dets) {
    gsap.to("#play", {
      left: dets.x - 420,
      top: dets.y - 200
    })
  })

  var videoCursor = document.querySelector("#video-cont")
    .addEventListener("mouseleave", function (dets) {
      gsap.to("#play", {
        left: "70%",
        top: dets.y - "4.3vw"
      })
    })
}


document.addEventListener("mousemove", function (dets) {
  gsap.to("#flag", {
    left: dets.x,
    top: dets.y
  })
})

var flag = document.querySelector("#flag");
document.querySelector("#hero3").addEventListener("mouseenter", function () {
  flag.style.opacity = 1;
})

document.querySelector("#hero3").addEventListener("mouseleave", function () {
  flag.style.opacity = 0;
})


function create () {
  var clutter = ""
    var clutter2 = ""
    document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
    })
    document.querySelector("#footer h1").innerHTML = clutter
    document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
    clutter2 += `<span>${elem}</span>`
    })
    document.querySelector("#footer h2").innerHTML = clutter2


    document.querySelector(".footer-text").addEventListener("mouseenter", function () {
        var t1 = gsap.timeline()
    t1.to(".footer-text h1 span", {
        opacity: 0,
        stagger: 0.05
    })
    t1.to(".footer-text h2 span", {
        opacity: 1,
        stagger: 0.1
    })
    })
    document.querySelector(".footer-text").addEventListener("mouseleave", function () {
        var t2 = gsap.timeline()
        t2.to(".footer-text h2 span", {
            opacity: 0,
            stagger: 0.05
        })
        t2.to(".footer-text h1 span", {
            opacity: 1,
            stagger: 0.1,
        })
    
    })

}

if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  Shery.imageEffect(".image-div", {
    style: 3,
    config: { "uFrequencyX": { "value": 12, "range": [0, 100] }, "uFrequencyY": { "value": 12, "range": [0, 100] }, "uFrequencyZ": { "value": 10, "range": [0, 100] }, "geoVertex": { "range": [1, 64], "value": 17.35 }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7428538298036819 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": true }, "growSize": { "value": 3.35, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.37, "range": [1, 5] }, "scrollType": { "value": 0 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.23, "range": [0, 2], "_gsap": { "id": 3 } }, "discard_threshold": { "value": 0.51, "range": [0, 1] }, "antialias_threshold": { "value": 0.02, "range": [0, 0.1] }, "noise_height": { "value": 0.43, "range": [0, 2] }, "noise_scale": { "value": 14.5, "range": [0, 100] } },
    gooey: true,
    // debug:true,
  });
}

//nothing

smooth();
loaderanimation();
cursormove();
sheryAnimation();
videoAnimation();
create ();