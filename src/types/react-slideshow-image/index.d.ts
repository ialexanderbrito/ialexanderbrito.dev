/* eslint-disable no-unused-vars */
declare module 'react-slideshow-image' {
  export class Zoom extends React.Component<ZoomProps & any, any> {
    goBack(): void;
    goNext(): void;
    goTo(index: number): void;
  }
  export class Fade extends React.Component<SlideshowProps & any, any> {
    goBack(): void;
    goNext(): void;
    goTo(index: number): void;
  }
  export class Slide extends React.Component<SlideshowProps & any, any> {
    goBack(): void;
    goNext(): void;
    goTo(index: number): void;
  }
  export interface SlideshowProps {
    duration?: number;
    transitionDuration?: number;
    defaultIndex?: number;
    indicators?: boolean | Function;
    prevArrow?: object | Function;
    nextArrow?: object | Function;
    arrows?: boolean;
    autoplay?: boolean;
    infinite?: boolean;
    onChange?(oldIndex: number, newIndex: number): void;
    pauseOnHover?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    canSwipe?: boolean;
    easing?: string;
    cssClass?: string;
  }
  export interface ZoomProps extends SlideshowProps {
    scale: number;
  }
}
