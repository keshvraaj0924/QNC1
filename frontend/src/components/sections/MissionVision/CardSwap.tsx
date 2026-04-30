'use client';

import React, { 
  Children, 
  cloneElement, 
  forwardRef, 
  isValidElement, 
  useEffect, 
  useMemo, 
  useRef 
} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div 
    ref={ref} 
    {...rest} 
    className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} 
  />
));
Card.displayName = 'Card';

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: any, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,

  });

interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: 'elastic' | 'smooth';
  children: React.ReactNode;
}

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 3,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.2,
          durMove: 1.2,
          durReturn: 1.2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      const isMobile = window.innerWidth < 768;
      const swipeX = isMobile ? 60 : 120;
      const swipeY = isMobile ? -40 : -80;
      
      // 1. Move front card out of the stack with a slight arc
      tl.to(elFront, {
        x: `+=${swipeX}`,
        y: `+=${swipeY}`,
        rotation: 5,
        opacity: 0,
        scale: 1.05,
        duration: config.durDrop * 0.5,
        ease: "power2.out"
      });

      tl.addLabel('promote', `-=${config.durDrop * 0.2}`);

      // 2. Promote other cards forward
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            scale: 1,
            opacity: 1,
            duration: config.durMove,
            ease: "back.out(1.2)"
          },
          `promote+=${i * 0.05}`
        );
      });

      // 3. Bring original front card to the very back of the stack
      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * 0.4}`);
      
      tl.set(elFront, { 
        zIndex: backSlot.zIndex,
        rotation: 0
      }, 'return');
      
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          opacity: 1,
          scale: 1,
          duration: config.durReturn,
          ease: "power2.inOut"
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    const pause = () => {
      tlRef.current?.pause();
      clearInterval(intervalRef.current);
    };
    const resume = () => {
      tlRef.current?.play();
      intervalRef.current = window.setInterval(swap, delay);
    };

    if (pauseOnHover && container.current) {
      container.current.addEventListener('mouseenter', pause);
      container.current.addEventListener('mouseleave', resume);
    }

    return () => {
      clearInterval(intervalRef.current);
      tlRef.current?.kill();
      if (pauseOnHover && container.current) {
        container.current.removeEventListener('mouseenter', pause);
        container.current.removeEventListener('mouseleave', resume);
      }
    };
  }, { scope: container, dependencies: [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing] });

  const rendered = childArr.map((child, i) => {
    if (isValidElement(child)) {
      const element = child as React.ReactElement<any>;
      return cloneElement(element, {
        key: i,
        ref: refs[i],
        style: { width, height, ...(element.props?.style ?? {}) },
        onClick: (e: React.MouseEvent) => {
          element.props?.onClick?.(e);
          onCardClick?.(i);
        }
      });
    }
    return child;
  });

  return (
    <div 
      ref={container} 
      className="card-swap-container" 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width, 
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
