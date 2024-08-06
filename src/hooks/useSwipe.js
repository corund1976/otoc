import { useState, useEffect, useRef } from 'react'

const useSwipeDetection = (isVisible = true, threshold = 50) => {
  const touch = useRef({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  })

  const [swipeHorizontal, setSwipeHorizontal] = useState('')
  const [swipeVertical, setSwipeVertical] = useState('')

  useEffect(() => {
    if (!isVisible) return

    const onTouchStart = (e) => {
      touch.current.endX = 0
      touch.current.endY = 0

      touch.current.startX = e.targetTouches[0].clientX
      touch.current.startY = e.targetTouches[0].clientY
    }

    window.addEventListener("touchstart", onTouchStart);

    return () => window.removeEventListener("touchstart", onTouchStart);
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const onTouchMove = (e) => {
      touch.current.endX = e.targetTouches[0].clientX
      touch.current.endY = e.targetTouches[0].clientY
    }

    window.addEventListener("touchmove", onTouchMove);

    return () => window.removeEventListener("touchmove", onTouchMove);
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    function swipeX() {
      let xDistance = touch.current.startX - touch.current.endX
      let yDistance = touch.current.startY - touch.current.endY

      if (Math.abs(yDistance) >= Math.abs(xDistance)) {
        return;
      }

      if (xDistance > threshold) setSwipeHorizontal('left')
      if (xDistance < -threshold) setSwipeHorizontal('right')
    }

    function swipeY() {
      let xDistance = touch.current.startX - touch.current.endX
      let yDistance = touch.current.startY - touch.current.endY

      if (Math.abs(xDistance) >= Math.abs(yDistance)) {
        return;
      }

      if (yDistance > threshold) setSwipeVertical('up')
      if (yDistance < -threshold) setSwipeVertical('down')
    }

    const onTouchEnd = () => {
      if (touch.current.startX && touch.current.endX) swipeX()
      if (touch.current.startY && touch.current.endY) swipeY()
    }

    window.addEventListener("touchend", onTouchEnd);

    return () => window.removeEventListener("touchend", onTouchEnd);
  }, [isVisible, swipeHorizontal, swipeVertical, threshold])

  return {
    swipeHorizontal,
    swipeVertical
  }
}

export default useSwipeDetection