import { clickCount, setClickCount } from "./atom";
import { audio, gifs } from "./data";


export function getRandomAudioUrl() {
    const localAudioList = audio;
    const randomIndex = Math.floor(Math.random() * localAudioList.length);
    return localAudioList[randomIndex];
}
export function playKuru() {
    const audioUrl = getRandomAudioUrl();
    const audio = new Audio();//cacheStaticObj(audioUrl));
    audio.src = audioUrl;
    audio.play();
    audio.addEventListener("ended", function () {
        this.remove();
    });
}

export function getRandomGif(){
    const randomIndex = Math.floor(Math.random() * gifs.length);
    return gifs[randomIndex];
}

export function animateHerta() {
    let id : NodeJS.Timer | undefined = undefined;
    const elem = document.createElement("img");
    elem.src = getRandomGif();
    elem.style.position = "absolute";
    elem.style.right = "-500px";
    elem.style.top = window.innerHeight - 500 + "px";
    elem.style.zIndex = "5";
    document.body.appendChild(elem);

    let pos = -500;
    const limit = window.innerWidth + 500;
    clearInterval(id);
    id = setInterval(() => {
        if (pos >= limit) {
            clearInterval(id);
            elem.remove();
        } else {
            pos += 20;
            elem.style.right = pos + "px";
        }
    }, 12);
}

export default function invokeHerta(){
    setClickCount(clickCount + 1);
    playKuru();
    animateHerta();
}