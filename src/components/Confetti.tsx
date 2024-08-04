import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

const Confetti = ({ trigger }: { trigger: boolean }) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		if (trigger) {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
				disableForReducedMotion: true,
			})
		}
	}, [trigger])

	return <canvas ref={canvasRef} />
}

export default Confetti
