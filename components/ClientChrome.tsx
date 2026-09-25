'use client';

import dynamic from 'next/dynamic';
import Animations from './Animations';
import SmoothScroll from './SmoothScroll';

// three.js stays out of the first-load bundle; the desk colour covers until it arrives.
const DeskCanvas = dynamic(() => import('./DeskCanvas'), { ssr: false });

export default function ClientChrome() {
  return (
    <>
      <SmoothScroll />
      <Animations />
      <DeskCanvas />
    </>
  );
}
