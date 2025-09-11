document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(
    DrawSVGPlugin,
    GSDevTools,
    InertiaPlugin,
    MotionPathHelper,
    MotionPathPlugin,
    MorphSVGPlugin,
    Observer,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    CustomEase,
    CustomBounce,
    CustomWiggle
  );

  // global
  ScrollSmoother.create({
    smooth: 2,
    effects: true,
  });

  //  hero animations
  const linesContainer = document.getElementById("linesContainer");

  const linesArray = [...Array(70)];

  linesArray.forEach((_) => {
    const lineElement = document.createElement("div");
    lineElement.classList.add("line");
    linesContainer.appendChild(lineElement);
  });
  const lines = gsap.utils.toArray("#linesContainer .line");


  
  // intro
  document.fonts.ready.then(() => {
    const title = document.querySelector("#hero .title h1");
    const subtitle = document.querySelector("#hero h2");
    const text = document.querySelector("#hero .text");
    const logoTextLoad = document.querySelector("header h3.loading");
    const logoTextLaila = document.querySelector("header h3.laila");

    const subtitleSplit = SplitText.create(subtitle, {
      type: "chars",
      mask: "chars",
    });
    const logoLoad = SplitText.create(logoTextLoad, {
      type: "chars",
    });

    const logoLaila = SplitText.create(logoTextLaila, {
      type: "chars",
    });

    const logoAnimation = gsap.to(logoLoad.chars, {
      x: 10,
      duration: 0.7,
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true,
      },
    });

    const introTl = gsap
      .timeline({
        paused: true,
        defaults: {
          stagger: 0.05,
          ease: "back",
          duration: 1.5,
        },
      })
      .to(logoLoad.chars, {
        autoAlpha: 0,
        x: 30,
      })
      .from(
        logoLaila.chars,
        {
          autoAlpha: 0,
          xPercent: 100,
        },
        "<"
      )

      .from(
        "nav",
        {
          autoAlpha: 0,
          xPercent: 100,
        },
        "<50%"
      )

      .from(
        title,
        {
          autoAlpha: 0,
          yPercent: 100,
        },
        "<50%"
      )
      .from(
        subtitleSplit.chars,
        {
          autoAlpha: 0,
          xPercent: 100,
          rotate: 30,
        },
        "<25%"
      )

      .from(
        text,
        {
          autoAlpha: 0,
          y: 20,
        },
        "<25%"
      )
      .from(lines, {
        autoAlpha: 0,
        rotate:50,
        transformOrigin:"top",
        stagger:{
          each:.05,
          from:"center"
        }
      },'<50%');

    setTimeout(() => {
      logoAnimation.revert();
      // introTl.play();
    }, 0);
  });
});
