import { useEffect, useRef, useState } from 'react'
import './App.css'

import InTheEnd from './assets/audios/In-The-End-Linkin-Park.m4a';
import LMB_PNG from './assets/images/left-mouse-button.png';
import RMB_PNG from './assets/images/right-mouse-button.png';


function Sound({ soundSrc = "../public/audios/chiado-tv.mp3", soundName = "Chiado de TV" }) {
	/**
	 * @type {React.RefObject<HTMLAudioElement>}
	 */
	const audio = useRef()
	const buttonRef = useRef()
	const [playing, setPlaying] = useState(false);
	
	function toggleButtonVisual(isPlaying){
		setPlaying(() => isPlaying)
		if(isPlaying) {
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

	function togglePlay(e) {
		e.preventDefault()
		switch (e.button) {
			case 0:
				setPlaying(playing => !playing)
				if (playing) {
					// mudar sprite do botão para normal
					audio.current.pause()
					toggleButtonVisual(false)
					return false
				}
				// mudar sprite do botão para tocando (amassado)
				toggleButtonVisual(true)
				audio.current.play()
				break;
			case 1:
				audio.current.pause()
				audio.current.currentTime = 0
				toggleButtonVisual(false)
				break;
			case 2:
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
				<button onMouseDown={togglePlay} onKeyDown={(e) => {

				}} onContextMenu={(e) => e.preventDefault()} ref={buttonRef}></button>
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
				<Sound soundName='In the End - Linkin Park' soundSrc={InTheEnd} />
				<Sound soundName='Placeholder 1' soundSrc='./audios/Chiado_de_TV-Repórteres.m4a' />
				<Sound soundName='Placeholder 2' soundSrc='./audios/Ato_1-Cena_1.m4a' />
				<Sound soundName='Placeholder 3' soundSrc='./audios/Notificação_Cancelamento.m4a'/>
				<Sound soundName='Placeholder 4' soundSrc='./audios/Dança_do_Cancelamento.m4a'/>
				<Sound soundName='Placeholder 5' soundSrc='./audios/Dança_do_Humanidades_2.m4a'/>
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