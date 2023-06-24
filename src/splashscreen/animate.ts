import KUTE from "kute.js";
KUTE.fromTo();
const tween1 = KUTE.fromTo(
    "#top-haikei1",
    {
        path: "#top-haikei1",
    },
    {
        path: "#top-haikei2",
    },
    {
        repeat: 999,
        duration: 3000,
        yoyo: true,
    }
);
tween1.start();
const tween2 = KUTE.fromTo(
    "#bottom-haikei1",
    {
        path: "#bottom-haikei1",
    },
    {
        path: "#bottom-haikei2",
    },
    {
        repeat: 999,
        duration: 3000,
        yoyo: true,
    }
);
tween2.start();