'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export default function Motion(){
 const pathname=usePathname();
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  const reveal=(selector:string,distance:number)=>{
   gsap.utils.toArray<HTMLElement>(selector).forEach(element=>{
    gsap.from(element,{y:distance,opacity:0,duration:.6,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 90%',once:true}});
   });
  };
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const context=gsap.context(()=>{
    gsap.to('.progress-bar',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'bottom bottom',scrub:true}});
    reveal('.dark-story h2, .dark-bottom p, .expertise h2, .contact h2, .contact-bottom p, .detail-intro h1, .detail-summary p, .detail-about h2, .detail-about p, .mobile-preview h2, .next-project strong',18);
    reveal('.expertise-row, .detail-image, .mobile-preview img',24);
   });
   return()=>context.revert();
  });
  media.add('(max-width: 700px) and (prefers-reduced-motion: no-preference)',()=>{
   const context=gsap.context(()=>reveal('.sequence-static .sequence-card',22));
   return()=>context.revert();
  });
  const frame=requestAnimationFrame(()=>ScrollTrigger.refresh());
  return()=>{cancelAnimationFrame(frame);media.revert()};
 },[pathname]);
 return <div className="progress-track" aria-hidden="true"><div className="progress-bar"/></div>;
}
