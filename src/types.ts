export interface FallingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'heart' | 'potato';
}

export interface GameItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  type: 'lily' | 'heart' | 'potato';
  rotation: number;
  rotationSpeed: number;
}

export interface LetterSection {
  title: string;
  content: string;
}

export interface UserCustomizations {
  name: string;
  nickname: string;
  letter: string;
  audioUrl: string;
}
