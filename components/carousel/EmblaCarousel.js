import React, { useState, useEffect, useCallback, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRouter } from 'next/router'
import { PrevButton, NextButton } from './EmblaCarouselButtons'

const EmblaCarousel = ({ slides }) => {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }, (emblaRoot) => emblaRoot.parentElement)
  )

  const router = useRouter()
  const media = [
    `${router.basePath}/static/images/media/hyundai_signup.jpg`,
    `${router.basePath}/static/images/media/commax_signup.jpg`,
    `${router.basePath}/static/images/media/kocom_signup.jpg`,
  ]
  const mediaByIndex = (index) => media[index % media.length]
  const [viewportRef, embla] = useEmblaCarousel(
    {
      loop: false,
      skipSnaps: false,
    },
    [autoplay.current]
  )
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => {
    embla && embla.scrollPrev()
    embla && autoplay.current.reset()
  }, [embla])
  const scrollNext = useCallback(() => {
    embla && embla.scrollNext()
    embla && autoplay.current.reset()
  }, [embla])
  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])
  const onSlideClick = useCallback(
    (index) => {
      if (embla && embla.clickAllowed()) {
        console.log(index)
        if (index === 0) {
          window.open('https://www2.hthomeservice.com/', '_blank')
        } else if (index === 1) {
          alert(
            '월패드를 통해 회원가입 하시길 바랍니다. 회원가입 하신 ID/PW를 통해 포레나 스마트홈 홈넷 인증을 진행해주세요.'
          )
        } else if (index === 2) {
          alert(
            '월패드를 통해 회원가입 하시길 바랍니다. 회원가입 하신 ID/PW를 통해 포레나 스마트홈 홈넷 인증을 진행해주세요.'
          )
        }
      }
    },
    [embla]
  )

  useEffect(() => {
    if (!embla) return
    embla.on('select', onSelect)
    onSelect()
  }, [embla, onSelect])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner cursor-pointer">
                <img
                  className="embla__slide__img"
                  src={mediaByIndex(index)}
                  onClick={() => onSlideClick(index)}
                  alt="A cool cat."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  )
}

export default EmblaCarousel
