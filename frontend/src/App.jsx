
import { useState, useRef, useEffect } from "react";

function App() {

const [phase, setPhase] = useState("opening");
const [gameProgress, setGameProgress] = useState([]);
const [gameMessage, setGameMessage] = useState("");
const [currentPhoto, setCurrentPhoto] = useState(0);
const [showFinalMessage, setShowFinalMessage] = useState(false);
const [showSignature, setShowSignature] = useState(false);
const [showEnding, setShowEnding] = useState(false);

const audioRef = useRef(null);
const endingTriggered = useRef(false);

const correctOrder = ["establishing", "close", "final"];

const photos = [
"/photo1.jpg",
"/photo2.jpg",
"/photo3.jpg",
"/photo4.jpg",
"/photo5.jpeg",
"/photo6.jpg",
"/photo7.jpeg",
"/photo8.jpeg",
"/photo9.jpeg",
"/photo10.jpeg",
];

const handleContinue = () => {
setPhase("fadeOut");
setTimeout(() => setPhase("next"), 2000);
};

const handleGameClick = (shot) => {

const newProgress = [...gameProgress, shot];
setGameProgress(newProgress);

const currentStep = newProgress.length - 1;

if (shot !== correctOrder[currentStep]) {

setGameMessage("Not quite. A director knows where a story begins.");
setGameProgress([]);

setTimeout(() => {
setGameMessage("");
}, 2000);

return;

}

if (newProgress.length === 3) {

setGameMessage(
"Perfect. You don’t just tell stories. You build them."
);

setTimeout(() => {

setPhase("birthdayUnlock");
setGameProgress([]);
setGameMessage("");

}, 2000);

}

};

// MUSIC FADE IN
useEffect(() => {

if (phase === "birthdayUnlock" && audioRef.current) {

const audio = audioRef.current;
audio.volume = 0;
audio.play();

let volume = 0;

const fadeIn = setInterval(() => {

if (volume < 0.4) {

volume += 0.02;
audio.volume = volume;

} else {

clearInterval(fadeIn);

}

}, 200);

}

}, [phase]);

// PHOTO SLIDESHOW
useEffect(() => {

if (phase !== "photoChapter") return;

const interval = setInterval(() => {

setCurrentPhoto((prev) => {

if (prev === photos.length - 1) {

clearInterval(interval);

if (!endingTriggered.current) {

endingTriggered.current = true;

setTimeout(() => {
setShowFinalMessage(true);
}, 2500);

setTimeout(() => {

setShowSignature(true);

if (audioRef.current) {

let volume = audioRef.current.volume;

const fadeOut = setInterval(() => {

if (volume > 0.05) {

volume -= 0.02;
audioRef.current.volume = volume;

} else {

clearInterval(fadeOut);

}

}, 300);

}

}, 16000);

setTimeout(() => {
setShowEnding(true);
}, 25000);

}

return prev;

}

return prev + 1;

});

}, 3500);

return () => clearInterval(interval);

}, [phase]);

return (

<div className="scene-container">

<audio ref={audioRef} src="/ilahi.mp3" loop />

{(phase === "opening" || phase === "fadeOut") && (

<div
className={`opening ${phase === "fadeOut" ? "fade-out" : ""}`}
onClick={handleContinue}
style={{ cursor: "pointer" }}
>

<p className="subtitle">Nineteen years ago, a story began.</p>
<h1 className="title">Chapter 19</h1>
<h2 className="name">Rutujaa</h2>

{phase === "opening" && (

<p className="continue-text">Click to continue</p>

)}

</div>

)}

{phase === "next" && (

<div className="next-scene fade-in">

<div className="content">

<p className="section-label">
The{" "}
<span
className="clickable-word"
onClick={() => setPhase("directorMode")}
>
Director
</span>
</p>

<h1 className="section-title">Still in the making.</h1>

<p className="section-text">
Some stories are written. <br />
Some are filmed. <br />
Yours are being directed.
</p>

</div>

</div>

)}

{phase === "directorMode" && (

<div className="next-scene fade-in">

<div className="content">

<p className="section-label">Director Mode</p>

<h1 className="section-title">Direct the Scene</h1>

<div className="game-options">

<button onClick={() => handleGameClick("close")}>
Close-Up
</button>

<button onClick={() => handleGameClick("establishing")}>
Establishing Shot
</button>

<button onClick={() => handleGameClick("final")}>
Final Frame
</button>

</div>

{gameMessage && (

<p className="game-message">{gameMessage}</p>

)}

</div>

</div>

)}

{phase === "birthdayUnlock" && (

<div className="next-scene fade-in">

<div className="content">

<p className="section-label">Chapter 19</p>

<h1 className="section-title">Level Unlocked.</h1>

<button
className="chapter-button"
onClick={() => setPhase("photoChapter")}
>

Begin Chapter 19

</button>

</div>

</div>

)}

{phase === "photoChapter" && (

<div className="next-scene fade-in">

<div className="content photo-container">

<img
src={photos[currentPhoto]}
alt="Chapter 19"
className={`chapter-photo ${
showFinalMessage ? "blurred" : ""
}`}
/>

{showFinalMessage && (

<div className="final-message">

<div className="message-content">

<h2>Chapter 19</h2>

<p>

So… here we are.<br /><br />

Nineteen looks good on you.
Like actually good. Not just “birthday caption” good.<br /><br />

You’ve grown, glowed, evolved —
and somehow still stayed you.<br /><br />

Thoda dramatic. Thoda filmy.
Full main character energy.<br /><br />

Life’s script is still being written,
but honestly?<br /><br />

You’ve already directed some pretty iconic scenes.<br /><br />

From the chaos,
to the random laughs,
to those core-memory moments…<br /><br />

Safar beautiful tha.
Aur picture abhi baaki hai, meri dost.<br /><br />

I hope 19 gives you:<br /><br />

Big wins.
Soft mornings.
Unexpected adventures.<br /><br />

Aur woh wala success jo sirf tumhare naam ka ho.<br /><br />

May your future be loud in achievements,
calm in peace,
and full of the kind of happiness
jo background music ke bina bhi cinematic lage.<br /><br />

And whatever chapters come next —
I just hope they’re legendary.<br /><br />

Happy Birthday, Director. 🎬✨

</p>

</div>

</div>

)}

{showFinalMessage && (
<div className="cinematic-particles">
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
</div>
)}

{showSignature && (

<div className="final-signature">
— Picture abhi baaki hai.
</div>

)}

</div>

</div>

)}

{showEnding && (
<div className="cinematic-ending">
— Picture abhi baaki hai.
</div>
)}

</div>

);

}

export default App;

