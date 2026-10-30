//
// ==========================================================
// SHASAR SOLAR SYSTEM
// TESTIMONIAL SLIDER
// INFINITE / CONTINUOUS CAROUSEL
// ==========================================================
//

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import TestomonialsCard from "./testomonialsCard";


// ==========================================================
// CONSTANTS
// ==========================================================

const AUTOPLAY_DELAY = 5500;


// ==========================================================
// COMPONENT
// ==========================================================

const TestomonialSlider = ({
  testimonials = [],
}) => {

  // ========================================================
  // STATE
  // ========================================================

  const [itemsPerView, setItemsPerView] = useState(3);

  /*
   * We use a cloned first/last group for an
   * infinite carousel.
   */
  const [currentIndex, setCurrentIndex] = useState(3);

  const [isPaused, setIsPaused] = useState(false);

  const [isAnimating, setIsAnimating] = useState(true);

  const sliderRef = useRef(null);


  // ========================================================
  // RESPONSIVE ITEMS PER VIEW
  // ========================================================

  useEffect(() => {

    const updateItemsPerView = () => {

      if (typeof window === "undefined") {
        return;
      }

      const width = window.innerWidth;

      if (width < 768) {
        setItemsPerView(1);
        return;
      }

      if (width < 1200) {
        setItemsPerView(2);
        return;
      }

      setItemsPerView(3);
    };


    updateItemsPerView();

    window.addEventListener(
      "resize",
      updateItemsPerView
    );


    return () => {
      window.removeEventListener(
        "resize",
        updateItemsPerView
      );
    };

  }, []);


  // ========================================================
  // SAFE TESTIMONIAL LIST
  // ========================================================

  const testimonialList = useMemo(() => {

    if (!Array.isArray(testimonials)) {
      return [];
    }

    return testimonials.filter(Boolean);

  }, [testimonials]);


  // ========================================================
  // RESET POSITION WHEN ITEMS PER VIEW CHANGES
  // ========================================================

  useEffect(() => {

    if (!testimonialList.length) {
      return;
    }

    if (
      testimonialList.length <=
      itemsPerView
    ) {

      setCurrentIndex(0);

      return;
    }

    setCurrentIndex(itemsPerView);

  }, [
    itemsPerView,
    testimonialList.length,
  ]);


  // ========================================================
  // INFINITE SLIDE DATA
  // ========================================================

  const infiniteTestimonials = useMemo(() => {

    if (
      testimonialList.length <=
      itemsPerView
    ) {
      return testimonialList;
    }


    /*
     * Clone the last `itemsPerView`
     * testimonials and place them before
     * the real list.
     */

    const prepend =
      testimonialList.slice(
        -itemsPerView
      );


    /*
     * Clone the first `itemsPerView`
     * testimonials and place them after
     * the real list.
     */

    const append =
      testimonialList.slice(
        0,
        itemsPerView
      );


    return [
      ...prepend,
      ...testimonialList,
      ...append,
    ];

  }, [
    testimonialList,
    itemsPerView,
  ]);


  // ========================================================
  // CARD WIDTH
  // ========================================================

  const cardWidth =
    100 / itemsPerView;


  // ========================================================
  // REAL TESTIMONIAL COUNT
  // ========================================================

  const totalTestimonials =
    testimonialList.length;


  // ========================================================
  // SHOW CONTROLS
  // ========================================================

  const showControls =
    totalTestimonials > itemsPerView;


  // ========================================================
  // REAL SLIDE INDEX
  // ========================================================

  const realIndex = useMemo(() => {

    if (!totalTestimonials) {
      return 0;
    }

    if (
      totalTestimonials <=
      itemsPerView
    ) {
      return 0;
    }


    const calculated =
      currentIndex -
      itemsPerView;


    /*
     * Normalize negative values.
     */

    return (
      (
        calculated %
        totalTestimonials
      ) +
      totalTestimonials
    ) %
    totalTestimonials;

  }, [
    currentIndex,
    itemsPerView,
    totalTestimonials,
  ]);


  // ========================================================
  // NUMBER OF DOTS
  // ========================================================

  const totalSlides =
    totalTestimonials;


  // ========================================================
  // NEXT SLIDE
  // ========================================================

  const nextSlide = useCallback(() => {

    if (
      !showControls ||
      !isAnimating
    ) {
      return;
    }

    setCurrentIndex(
      (previousIndex) =>
        previousIndex + 1
    );

  }, [
    showControls,
    isAnimating,
  ]);


  // ========================================================
  // PREVIOUS SLIDE
  // ========================================================

  const previousSlide = useCallback(() => {

    if (
      !showControls ||
      !isAnimating
    ) {
      return;
    }

    setCurrentIndex(
      (previousIndex) =>
        previousIndex - 1
    );

  }, [
    showControls,
    isAnimating,
  ]);


  // ========================================================
  // GO TO SLIDE
  // ========================================================

  const goToSlide = useCallback(
    (index) => {

      if (
        !showControls ||
        !isAnimating
      ) {
        return;
      }


      setCurrentIndex(
        itemsPerView + index
      );

    },
    [
      showControls,
      itemsPerView,
      isAnimating,
    ]
  );


  // ========================================================
  // HANDLE ANIMATION COMPLETE
  // ========================================================

  const handleAnimationComplete =
    useCallback(() => {

      if (
        !showControls ||
        !testimonialList.length
      ) {
        setIsAnimating(true);

        return;
      }


      /*
       * We reached the cloned APPEND area.
       *
       * Example:
       *
       * Real:
       * [1][2][3][4][5]
       *
       * Append:
       * [1][2][3]
       *
       * If we move into the clone [1],
       * instantly reposition to the real [1].
       */

      if (
        currentIndex >=
        itemsPerView +
        testimonialList.length
      ) {

        setIsAnimating(false);

        setCurrentIndex(
          itemsPerView
        );

        /*
         * Re-enable animation on the
         * next browser frame.
         */

        requestAnimationFrame(() => {

          requestAnimationFrame(() => {
            setIsAnimating(true);
          });

        });

        return;
      }


      /*
       * We reached the cloned PREPEND area.
       */

      if (
        currentIndex <
        itemsPerView
      ) {

        setIsAnimating(false);

        setCurrentIndex(
          itemsPerView +
          testimonialList.length -
          1
        );

        requestAnimationFrame(() => {

          requestAnimationFrame(() => {
            setIsAnimating(true);
          });

        });

        return;
      }


      setIsAnimating(true);

    }, [
      currentIndex,
      itemsPerView,
      testimonialList.length,
      showControls,
    ]);


  // ========================================================
  // AUTOPLAY
  // ========================================================

  useEffect(() => {

    if (
      isPaused ||
      !showControls ||
      !isAnimating
    ) {
      return undefined;
    }


    const interval =
      window.setInterval(() => {

        nextSlide();

      }, AUTOPLAY_DELAY);


    return () => {

      window.clearInterval(
        interval
      );

    };

  }, [
    isPaused,
    showControls,
    isAnimating,
    nextSlide,
  ]);


  // ========================================================
  // KEYBOARD NAVIGATION
  // ========================================================

  const handleKeyDown =
    useCallback(
      (event) => {

        if (
          event.key ===
          "ArrowLeft"
        ) {

          event.preventDefault();

          previousSlide();

        }


        if (
          event.key ===
          "ArrowRight"
        ) {

          event.preventDefault();

          nextSlide();

        }

      },
      [
        previousSlide,
        nextSlide,
      ]
    );


  // ========================================================
  // EMPTY STATE
  // ========================================================

  if (!testimonialList.length) {
    return null;
  }


  // ========================================================
  // RENDER
  // ========================================================

  return (

    <div
      ref={sliderRef}
      className="testomonial-slider"
      tabIndex={0}
      onKeyDown={handleKeyDown}

      onMouseEnter={() =>
        setIsPaused(true)
      }

      onMouseLeave={() =>
        setIsPaused(false)
      }

      onFocus={() =>
        setIsPaused(true)
      }

      onBlur={(event) => {

        if (
          !event.currentTarget.contains(
            event.relatedTarget
          )
        ) {

          setIsPaused(false);

        }

      }}

      aria-label="Client testimonials slider"
    >

      {/* ==================================================
          MAIN SLIDER
      ================================================== */}

      <div className="testomonial-slider-wrapper">

        {/* ==================================================
            PREVIOUS
        ================================================== */}

        {showControls && (

          <button
            type="button"
            className="
              testomonial-slider-arrow
              testomonial-slider-arrow-prev
            "
            onClick={previousSlide}
            aria-label="Previous testimonial"
          >

            <ChevronLeft
              size={22}
              strokeWidth={2}
            />

          </button>

        )}


        {/* ==================================================
            VIEWPORT
        ================================================== */}

        <div className="testomonial-slider-viewport">

          {/* ==================================================
              TRACK
          ================================================== */}

          <motion.div
            className="testomonial-slider-track"

            animate={{
              x:
                totalTestimonials >
                itemsPerView
                  ? `-${
                      currentIndex *
                      cardWidth
                    }%`
                  : "0%",
            }}

            transition={{
              duration:
                isAnimating
                  ? 0.7
                  : 0,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}

            onAnimationComplete={
              handleAnimationComplete
            }
          >

            {infiniteTestimonials.map(
              (
                testimonial,
                index
              ) => (

                <motion.div
                  key={`
                    ${
                      testimonial._id ||
                      testimonial.id ||
                      testimonial.email ||
                      "testimonial"
                    }-${index}
                  `}

                  className="testomonial-slide"

                  style={{
                    flex:
                      `0 0 ${cardWidth}%`,
                  }}

                  initial={{
                    opacity: 0.7,
                  }}

                  animate={{
                    opacity: 1,
                  }}

                  transition={{
                    duration: 0.35,
                  }}
                >

                  <TestomonialsCard
                    testimonial={
                      testimonial
                    }
                  />

                </motion.div>

              )
            )}

          </motion.div>

        </div>


        {/* ==================================================
            NEXT
        ================================================== */}

        {showControls && (

          <button
            type="button"
            className="
              testomonial-slider-arrow
              testomonial-slider-arrow-next
            "
            onClick={nextSlide}
            aria-label="Next testimonial"
          >

            <ChevronRight
              size={22}
              strokeWidth={2}
            />

          </button>

        )}

      </div>


      {/* ====================================================
          FOOTER
      ==================================================== */}

      {showControls && (

        <div className="testomonial-slider-footer">

          {/* ==================================================
              DOT NAVIGATION
          ================================================== */}

          <div
            className="testomonial-slider-dots"
            role="tablist"
            aria-label="Testimonial slides"
          >

            {Array.from({
              length: totalSlides,
            }).map(
              (_, index) => {

                const isActive =
                  index === realIndex;


                return (

                  <button
                    key={index}
                    type="button"

                    className={`
                      testomonial-slider-dot
                      ${
                        isActive
                          ? "active"
                          : ""
                      }
                    `}

                    onClick={() =>
                      goToSlide(index)
                    }

                    aria-label={`
                      Go to testimonial
                      ${index + 1}
                    `}

                    aria-selected={
                      isActive
                    }

                    role="tab"
                  >

                    <span />

                  </button>

                );

              }
            )}

          </div>


          {/* ==================================================
              COUNTER
          ================================================== */}

          <div
            className="testomonial-slider-counter"
            aria-live="polite"
          >

            <span>
              {String(
                realIndex + 1
              ).padStart(2, "0")}
            </span>

            <span
              className="
                testomonial-slider-counter-line
              "
            />

            <span>
              {String(
                totalTestimonials
              ).padStart(2, "0")}
            </span>

          </div>

        </div>

      )}


      {/* ====================================================
          AUTOPLAY PAUSED
      ==================================================== */}

      <AnimatePresence>

        {showControls &&
          isPaused && (

            <motion.div
              className="
                testomonial-slider-paused
              "

              initial={{
                opacity: 0,
                y: 6,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: 6,
              }}
            >

              <span>
                Autoplay paused
              </span>

            </motion.div>

          )}

      </AnimatePresence>

    </div>
  );
};


export default TestomonialSlider;