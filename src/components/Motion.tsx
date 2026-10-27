'use client';
import {useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export default function Motion(){useEffect(()=>{gsap.registerPlugin(ScrollTrigger);const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{const context=gsap.context(()=>{gsap.from('.hero h1',{y:35,opacity:0,duration:1.1,ease:'power3.out'});gsap.to('.progress-bar',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'bottom bottom',scrub:true}})});return()=>context.revert()});return()=>media.revert()},[]);return <div className="progress-track" aria-hidden="true"><div className="progress-bar"/></div>}
