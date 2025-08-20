import { useEffect, useRef, useState } from 'react'
import './App.css'

//import InTheEnd from './assets/audios/In-The-End-Linkin-Park.m4a';
import OneShortDay from './assets/audios/One Short Day (0;52 - 1;34 faded).mp3'
import DancingThroughLife from './assets/audios/Dancing Through Life (From Wicked The Soundtrack) [2;36 - 3;18].mp3'
import SomewhereOverTheRainbow from './assets/audios/Somewhere Over the Rainbow - Judy Garland [Acoustic Karaoke] [0;20 - 1;24].mp3'
import Trovao from './assets/audios/trovao-soundEffect-v1.mp3'

import LMB_PNG from './assets/images/left-mouse-button.png';
import RMB_PNG from './assets/images/right-mouse-button.png';


function Sound({ soundSrc = "../public/audios/chiado-tv.mp3", soundName = "Chiado de TV" }) {
	/**
	 * @type {React.RefObject<HTMLAudioElement>}
	 */
	const audio = useRef()
	const buttonRef = useRef()
	const [playing, setPlaying] = useState(false);

	function toggleButtonVisual(isPlaying) {
		setPlaying(() => isPlaying)
		if (isPlaying) {
			buttonRef.current.style.backgroundPosition = "right"
			buttonRef.current.style.backgroundColor = "red"
		} else {
			buttonRef.current.style.backgroundPosition = "left"
			buttonRef.current.style.backgroundColor = "green"
		}
	}

	function onPlayEnded() {
		toggleButtonVisual(false)
	}

	function togglePlay(override) {
		if (typeof (override) === "boolean") {
			override = !override
		}
		setPlaying(playing => override ?? !playing)
		if (playing) {
			// mudar sprite do botão para normal
			audio.current.pause()
			toggleButtonVisual(false)
			return false
		}
		// mudar sprite do botão para tocando (amassado)
		toggleButtonVisual(true)
		audio.current.play()
		return true;
	}

	function returnToZero() {
		//togglePlay(false)
		audio.current.currentTime = 0
	}

	function onButtonPressed(e) {
		e.preventDefault()
		switch (e.button) {
			case 0: // BOTÃO ESQUERDO
				togglePlay();
				break;
			case 1: // RODA DO MOUSE
				returnToZero();
				break;
			case 2: // BOTÃO DIREITO
				let parallelAudio = new Audio(soundSrc)
				parallelAudio.volume = audio.current.volume
				parallelAudio.oncanplaythrough = () => parallelAudio.play()
				parallelAudio.onpause = () => {
					parallelAudio = null
				}
				parallelAudio.ondurationchange = () => {
					parallelAudio.volume = audio.current.volume
				}
				break;
		}
	}

	return (
		<>
			<div className="box">
				<p>{soundName}</p>
				<div>
					<button onMouseDown={onButtonPressed} onKeyDown={(e) => {
					}} onContextMenu={(e) => e.preventDefault()} ref={buttonRef}></button>
					<button className='reset_button' onMouseDown={returnToZero}></button>
				</div>
				<audio controls ref={audio} onEnded={onPlayEnded}>
					<source src={soundSrc} type="audio/mpeg" />
				</audio>
			</div>
		</>
	)
}


function App() {

	return (
		<>
			<header>
				<h1>Mesa de Som</h1>
			</header>
			<div className="megaBox">
				<Sound soundName='Trovao' soundSrc={Trovao} />
				<Sound soundName='Somewhere Over the Rainbow [acoustic] (0:20 - 1:24)' soundSrc={SomewhereOverTheRainbow} />
				<Sound soundName='One Short Day (0:51 - 1:34)' soundSrc={OneShortDay} />
				<Sound soundName='Dancing Through Life (2:36 - 3:18)' soundSrc={DancingThroughLife} />
			</div>
			<div className='controls'>
				<h1>Controles</h1>
				<p><img src={LMB_PNG} alt="Botão esquerdo do mouse" />: Tocar/Pausar audio</p>
				<p><img src={RMB_PNG} alt="Botão direito do mouse" />: Tocar audio em paralelo (irreversível)</p>
			</div>
		</>
	)
}

export default App