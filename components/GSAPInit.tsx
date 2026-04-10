'use client';
import { useEffect } from 'react';
import { PERSONAL } from '@/data';

export default function GSAPInit() {
  useEffect(() => {
    // ── Load scripts dynamically (CDN, avoids SSR issues)
    const loadScript = (src: string) =>
      new Promise<void>(resolve => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src; s.onload = () => resolve();
        document.head.appendChild(s);
      });

    (async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js');
      init();
    })();

    function init() {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      const THREE = (window as any).THREE;
      const VanillaTilt = (window as any).VanillaTilt;

      gsap.registerPlugin(ScrollTrigger);

      // ════════════════════════════════════
      //  THREE.JS PARTICLE FIELD
      // ════════════════════════════════════
      const canvas = document.getElementById('three-canvas') as HTMLCanvasElement;
      if (canvas && THREE) {
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.setSize(innerWidth, innerHeight);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
        camera.position.z = 80;
        const count = 2500;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const colors = [[.486,.427,.98],[.973,.522,.651],[.165,.957,.596],[.969,.651,.169]];
        for (let i = 0; i < count; i++) {
          pos[i*3]=(Math.random()-.5)*200; pos[i*3+1]=(Math.random()-.5)*200; pos[i*3+2]=(Math.random()-.5)*100;
          const c = colors[Math.floor(Math.random()*colors.length)] as number[];
          col[i*3]=c[0]; col[i*3+1]=c[1]; col[i*3+2]=c[2];
        }
        geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
        geo.setAttribute('color',    new THREE.BufferAttribute(col,3));
        const mat = new THREE.PointsMaterial({ size:.4, vertexColors:true, transparent:true, opacity:.7 });
        const particles = new THREE.Points(geo, mat);
        scene.add(particles);
        let mx=0, my=0;
        window.addEventListener('mousemove', e => {
          mx=(e.clientX/innerWidth-.5)*2; my=-(e.clientY/innerHeight-.5)*2;
        });
        window.addEventListener('resize', () => {
          camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
          renderer.setSize(innerWidth,innerHeight);
        });
        const clock = new THREE.Clock();
        (function animate(){
          requestAnimationFrame(animate);
          const t=clock.getElapsedTime();
          particles.rotation.y=t*.025+mx*.04;
          particles.rotation.x=t*.015+my*.03;
          const s=1+Math.sin(t*.4)*.02;
          particles.scale.set(s,s,s);
          renderer.render(scene,camera);
        })();
      }

      // ════════════════════════════════════
      //  CURSOR + TRAIL
      // ════════════════════════════════════
      const cdot  = document.getElementById('cdot');
      const cring = document.getElementById('cring');
      let cx=0, cy=0, rx=0, ry=0;

      document.addEventListener('mousemove', e => {
        cx=e.clientX; cy=e.clientY;
        gsap.to(cdot, { x:cx-4, y:cy-4, duration:.08 });
      });
      (function ringAnim(){
        rx+=(cx-rx)*.1; ry+=(cy-ry)*.1;
        if (cring) { cring.style.left=(rx-18)+'px'; cring.style.top=(ry-18)+'px'; }
        requestAnimationFrame(ringAnim);
      })();

      // Trail dots
      const trailDots: {el:HTMLElement,x:number,y:number}[] = [];
      for(let i=0;i<16;i++){
        const d=document.createElement('div');
        d.style.cssText=`position:fixed;width:${Math.max(2,5-i*.18)}px;height:${Math.max(2,5-i*.18)}px;border-radius:50%;background:var(--v1);pointer-events:none;z-index:9995;opacity:${(1-i/16)*.3};transform:translate(-50%,-50%)`;
        document.body.appendChild(d);
        trailDots.push({el:d,x:0,y:0});
      }
      (function trailLoop(){
        let px=cx,py=cy;
        trailDots.forEach(d=>{d.x+=(px-d.x)*.38;d.y+=(py-d.y)*.38;d.el.style.left=d.x+'px';d.el.style.top=d.y+'px';px=d.x;py=d.y;});
        requestAnimationFrame(trailLoop);
      })();

      const hoverEls = 'a,button,.pcard,.ex-card,.ach-card,.sk-chip,.ccard,.snav-btn,.info-row,.svc-card,.stat-card';
      document.querySelectorAll(hoverEls).forEach(el=>{
        el.addEventListener('mouseenter',()=>{ cdot?.classList.add('hovered'); cring?.classList.add('hovered'); });
        el.addEventListener('mouseleave',()=>{ cdot?.classList.remove('hovered'); cring?.classList.remove('hovered'); });
      });

      // ════════════════════════════════════
      //  LOADER → HERO MASTER TIMELINE
      // ════════════════════════════════════
      const lbar    = document.getElementById('lbar');
      const lpct    = document.getElementById('lpct');
      const loader  = document.getElementById('loader');
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 22;
        if (p >= 100) { p = 100; clearInterval(interval); }
        if (lbar) lbar.style.width = p + '%';
        if (lpct) lpct.textContent = Math.floor(p) + '%';
        if (p === 100) {
          const tl = gsap.timeline();
          tl.to('.loader-logo',              { y:-30, opacity:0, duration:.4, ease:'power3.in' })
            .to('.loader-bar-track, .loader-pct', { opacity:0, duration:.3 }, '<.1')
            .to(loader, { scaleY:0, transformOrigin:'top center', duration:.7, ease:'power4.inOut',
                onComplete: () => { if (loader) loader.style.display='none'; startHeroAnim(); } });
        }
      }, 70);

      // ════════════════════════════════════
      //  HERO ANIMATION
      // ════════════════════════════════════
      function splitChars(wordEl: Element) {
        const text = wordEl.textContent || '';
        wordEl.innerHTML = '';
        [...text].forEach(ch => {
          if (ch===' '||ch==='\u00a0') { wordEl.appendChild(document.createTextNode('\u00a0')); return; }
          const s = document.createElement('span');
          s.className='char-hover'; s.dataset.char=ch; s.textContent=ch;
          wordEl.appendChild(s);
        });
      }

      function startHeroAnim() {
        const heroTL = gsap.timeline({ delay:.15 });
        heroTL
          .fromTo('nav', { y:-80, opacity:0 }, { y:0, opacity:1, duration:.8, ease:'power3.out' })
          .fromTo('.hero-eyebrow', { y:20, opacity:0, scale:.8 }, { y:0, opacity:1, scale:1, duration:.6, ease:'back.out(2)' }, '-=.4');

        const words = document.querySelectorAll('.title-word');
        heroTL.to(words, { y:0, opacity:1, duration:1.1, ease:'power4.out', stagger:.15,
          onComplete: () => words.forEach(w=>splitChars(w)) }, '-=.2');

        heroTL
          .to('.hero-roles',   { opacity:1, y:0, duration:.7, ease:'power3.out' }, '-=.5')
          .to('.hero-sub',     { opacity:1, y:0, duration:.7, ease:'power3.out' }, '-=.5')
          .to('.hero-actions', { opacity:1, y:0, duration:.6, ease:'power3.out' }, '-=.45')
          .to('.hero-scroll',  { opacity:1, duration:.5 }, '-=.3')
          .to('#heroBadge',    { opacity:1, scale:1, rotation:0, duration:.8, ease:'back.out(1.5)' }, '-=.6');

        // Badge float
        gsap.to('#heroBadge', { y:-18, rotation:5, duration:3, ease:'sine.inOut', yoyo:true, repeat:-1 });

        // Hero parallax on scroll
        gsap.to('.hero-title', { y:-120, scale:.92, opacity:.2, ease:'none',
          scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:1.2 } });
        gsap.to('.hero-sub, .hero-roles, .hero-actions, .hero-scroll', { y:-60, opacity:0, ease:'none',
          scrollTrigger:{ trigger:'#hero', start:'20% top', end:'bottom top', scrub:1 } });
        gsap.to('.hero-noise', { y:-100, ease:'none',
          scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:true } });

        // Floating shapes
        const hero = document.getElementById('hero');
        if (hero) {
          const shapes=[{size:8,top:'20%',left:'15%',color:'var(--v1)',delay:0},{size:5,top:'65%',left:'8%',color:'var(--v2)',delay:.8},{size:12,top:'35%',right:'12%',color:'var(--v3)',delay:1.2},{size:6,top:'75%',right:'20%',color:'var(--v4)',delay:.4},{size:4,top:'50%',left:'50%',color:'var(--v5)',delay:1.8},{size:9,top:'15%',right:'30%',color:'var(--v1)',delay:2.2}];
          shapes.forEach(d=>{
            const dot=document.createElement('div');
            dot.style.cssText=`position:absolute;width:${d.size}px;height:${d.size}px;border-radius:${Math.random()>.5?'50%':'3px'};background:${d.color};opacity:.25;top:${d.top};${(d as any).left?'left:'+(d as any).left:'right:'+(d as any).right};pointer-events:none;z-index:1`;
            hero.appendChild(dot);
            gsap.to(dot,{y:-30,x:15,rotation:360,scale:1.4,duration:4+Math.random()*3,ease:'sine.inOut',yoyo:true,repeat:-1,delay:d.delay});
          });
        }

        // Project cards — stagger + depth parallax
        gsap.utils.toArray('.pcard').forEach((card: any, i: number) => {
          const dir = i%2===0 ? -30 : 30;
          gsap.fromTo(card, { x:dir, opacity:0, scale:.93 }, {
            x:0, opacity:1, scale:1, duration:1, ease:'power3.out',
            scrollTrigger:{ trigger:card, start:'top 92%', toggleActions:'play none none none' },
            delay:(i%3)*.12
          });
          gsap.to(card, { y:i%2===0?-20:20, ease:'none',
            scrollTrigger:{ trigger:card, start:'top bottom', end:'bottom top', scrub:1.5 } });
        });

        // Exp cards
        gsap.utils.toArray('.exp-item').forEach((item: any, i: number) => {
          const box = item.querySelector('.exp-box');
          if (box) gsap.fromTo(box, { opacity:0, x:-60, rotateY:-8 },
            { opacity:1, x:0, rotateY:0, duration:.9, ease:'power3.out', delay:i*.1,
              scrollTrigger:{ trigger:item, start:'top 85%' } });
        });

        // Services stagger
        gsap.utils.toArray('.svc-card').forEach((card: any, i: number) => {
          gsap.fromTo(card, { opacity:0, y:80+i%3*20, scale:.9, rotateX:15 },
            { opacity:1, y:0, scale:1, rotateX:0, duration:.85, ease:'back.out(1.3)', delay:i%3*.1,
              scrollTrigger:{ trigger:card, start:'top 92%' } });
        });

        // Achievements
        gsap.utils.toArray('.ach-card').forEach((card: any, i: number) => {
          gsap.fromTo(card, { opacity:0, y:60, rotateY:i%2===0?-15:15 },
            { opacity:1, y:0, rotateY:0, duration:.85, delay:i*.18, ease:'back.out(1.4)',
              scrollTrigger:{ trigger:card, start:'top 88%' } });
        });

        // Generic reveals
        gsap.utils.toArray('.reveal-up').forEach((el: any) => {
          gsap.fromTo(el, { opacity:0, y:55 }, { opacity:1, y:0, duration:.9, ease:'power3.out',
            scrollTrigger:{ trigger:el, start:'top 92%', toggleActions:'play none none none' } });
        });
        gsap.utils.toArray('.reveal-left').forEach((el: any) => {
          gsap.fromTo(el, { opacity:0, x:-70 }, { opacity:1, x:0, duration:1, ease:'power3.out',
            scrollTrigger:{ trigger:el, start:'top 88%' } });
        });
        gsap.utils.toArray('.reveal-right').forEach((el: any) => {
          gsap.fromTo(el, { opacity:0, x:70 }, { opacity:1, x:0, duration:1, ease:'power3.out',
            scrollTrigger:{ trigger:el, start:'top 88%' } });
        });
        gsap.utils.toArray('.reveal-scale').forEach((el: any, i: number) => {
          gsap.fromTo(el, { opacity:0, scale:.85 }, { opacity:1, scale:1, duration:.75, delay:i*.1, ease:'back.out(1.5)',
            scrollTrigger:{ trigger:el, start:'top 90%' } });
        });

        // Section labels
        gsap.utils.toArray('.sec-tag').forEach((el: any) => {
          gsap.fromTo(el, { opacity:0, x:-30, letterSpacing:'-.05em' },
            { opacity:1, x:0, letterSpacing:'.2em', duration:.9, ease:'power3.out',
              scrollTrigger:{ trigger:el, start:'top 90%' } });
        });
        gsap.utils.toArray('.sec-title').forEach((el: any) => {
          gsap.fromTo(el, { opacity:0, y:50, skewY:3 },
            { opacity:1, y:0, skewY:0, duration:.9, ease:'power4.out',
              scrollTrigger:{ trigger:el, start:'top 88%' } });
        });

        // About card
        gsap.fromTo('.about-card', { opacity:0, x:-80, rotateY:-20 },
          { opacity:1, x:0, rotateY:0, duration:1.2, ease:'power3.out', transformPerspective:800,
            scrollTrigger:{ trigger:'#about', start:'top 75%' } });
        gsap.utils.toArray('.info-row').forEach((row: any, i: number) => {
          gsap.fromTo(row, { opacity:0, x:-30 },
            { opacity:1, x:0, duration:.5, delay:i*.08, ease:'power2.out',
              scrollTrigger:{ trigger:'.about-card', start:'top 70%' } });
        });

        // Contact dramatic entrance
        const contactTL = gsap.timeline({ scrollTrigger:{ trigger:'#contact', start:'top 70%' } });
        contactTL
          .fromTo('.contact-eyebrow', { opacity:0, y:20 }, { opacity:1, y:0, duration:.6, ease:'power3.out' })
          .fromTo('.contact-title',   { opacity:0, y:60, skewY:4 }, { opacity:1, y:0, skewY:0, duration:.9, ease:'power4.out' }, '-=.2')
          .fromTo('.contact-sub',     { opacity:0, y:30 }, { opacity:1, y:0, duration:.7, ease:'power3.out' }, '-=.5')
          .fromTo('.ccard',           { opacity:0, y:40, scale:.9 }, { opacity:1, y:0, scale:1, duration:.5, stagger:.08, ease:'back.out(1.5)' }, '-=.4');

        // Contact scramble
        const contactTitle = document.querySelector('.contact-title');
        const CHARS='!@#$%&ABCDEFGHIJKLMNOPQabcdefghijklmnopqrstuvwxyz0123456789';
        ScrollTrigger.create({ trigger:'#contact', start:'top 75%', once:true,
          onEnter:()=>{
            const orig=contactTitle?.textContent||'';
            let frame=0; const len=orig.length;
            const id=setInterval(()=>{
              let out='';
              for(let i=0;i<len;i++){
                if(frame>i*1.8||orig[i]===' '||orig[i]==='\n') out+=orig[i];
                else out+=CHARS[Math.floor(Math.random()*CHARS.length)];
              }
              if (contactTitle) contactTitle.textContent=out;
              if(++frame>len*2.2) clearInterval(id);
            },40);
          }
        });

        // Stat cards flip-in
        gsap.utils.toArray('.stat-card').forEach((card: any, i: number) => {
          gsap.fromTo(card, { opacity:0, y:60, rotateX:30 },
            { opacity:1, y:0, rotateX:0, duration:.8, delay:i*.12, ease:'back.out(1.4)', transformPerspective:600,
              scrollTrigger:{ trigger:card, start:'top 88%' } });
        });

        // Skills parallax
        gsap.to('.skills-flex', { y:-30, ease:'none',
          scrollTrigger:{ trigger:'#skills', start:'top bottom', end:'bottom top', scrub:1.5 } });

        // Footer
        gsap.fromTo('footer', { opacity:0, y:40 },
          { opacity:1, y:0, duration:.8, ease:'power3.out',
            scrollTrigger:{ trigger:'footer', start:'top 95%' } });

        // Nav active scroll links
        ['about','stats','skills','services','experience','projects','achievements','contact'].forEach(id=>{
          const sec=document.getElementById(id);
          if(!sec) return;
          ScrollTrigger.create({ trigger:sec, start:'top 50%', end:'bottom 50%',
            onEnter:()=>updateNavActive(id), onEnterBack:()=>updateNavActive(id) });
        });

        // Section bg shifts
        const sectionColors: Record<string, string> = {
          '#hero':'#05050a','#stats':'#0f0f1a','#about':'#05050a',
          '#skills':'#0a0a12','#services':'#05050a','#experience':'#05050a',
          '#projects':'#0a0a12','#achievements':'#05050a','#contact':'#0a0a12',
        };
        Object.entries(sectionColors).forEach(([id,color])=>{
          ScrollTrigger.create({ trigger:id, start:'top center', end:'bottom center',
            onEnter:()=>gsap.to('body',{backgroundColor:color,duration:.8,ease:'power2.inOut'}),
            onEnterBack:()=>gsap.to('body',{backgroundColor:color,duration:.8,ease:'power2.inOut'}) });
        });

        // Exp card mouse glow
        document.querySelectorAll('.exp-box').forEach((box: any)=>{
          box.addEventListener('mousemove',(e: MouseEvent)=>{
            const r=box.getBoundingClientRect();
            box.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
            box.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
          });
        });

        // Project card ripple on hover
        document.querySelectorAll('.pcard').forEach((card: any)=>{
          card.addEventListener('mouseenter',(e: MouseEvent)=>{
            const r=card.getBoundingClientRect();
            const ripple=document.createElement('div');
            ripple.style.cssText=`position:absolute;left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;width:10px;height:10px;border-radius:50%;background:rgba(124,109,250,.25);transform:translate(-50%,-50%);pointer-events:none;z-index:2`;
            card.style.position='relative';
            card.appendChild(ripple);
            gsap.to(ripple,{scale:30,opacity:0,duration:.8,ease:'power2.out',onComplete:()=>ripple.remove()});
          });
        });

        // Magnetic buttons
        document.querySelectorAll('.btn-primary,.btn-secondary,.nav-cta').forEach((btn: any)=>{
          btn.addEventListener('mousemove',(e: MouseEvent)=>{
            const r=btn.getBoundingClientRect();
            gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.4,y:(e.clientY-r.top-r.height/2)*.4,duration:.4,ease:'power2.out'});
          });
          btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.8,ease:'elastic.out(1,.75)'}));
        });

        // Stats counter
        function animateCounters(){
          document.querySelectorAll('.stat-number[data-target]').forEach((el: any)=>{
            const target=+el.dataset.target, suffix=el.dataset.suffix||'';
            gsap.fromTo({n:0},{n:target},{duration:2.2,ease:'power2.out',
              onUpdate:function(){const v=Math.round(this.targets()[0].n);el.textContent=(target>=100?v.toLocaleString():v)+suffix;}});
            gsap.fromTo(el,{scale:1},{scale:1.15,duration:.2,ease:'power2.out',yoyo:true,repeat:1,delay:2.2});
          });
        }
        ScrollTrigger.create({ trigger:'#stats', start:'top 80%', once:true, onEnter:animateCounters });

        // VanillaTilt
        if (VanillaTilt) VanillaTilt.init(document.querySelectorAll('[data-tilt]'),{max:7,speed:400,perspective:1000,glare:true,'max-glare':.12});

        // Skill tabs
        document.querySelectorAll('.snav-btn').forEach((btn: any)=>{
          btn.addEventListener('click',()=>{
            document.querySelectorAll('.snav-btn').forEach((b: any)=>b.classList.remove('active'));
            document.querySelectorAll('.skill-panel').forEach((p: any)=>p.classList.remove('active'));
            btn.classList.add('active');
            const panel=document.getElementById('panel-'+btn.dataset.panel);
            if(panel){
              panel.classList.add('active');
              gsap.fromTo(panel.querySelectorAll('.sk-chip'),{opacity:0,y:25,scale:.85,rotation:-3},{opacity:1,y:0,scale:1,rotation:0,duration:.45,stagger:.05,ease:'back.out(1.8)'});
            }
          });
        });
        ScrollTrigger.create({ trigger:'#skills', start:'top 75%', once:true,
          onEnter:()=>gsap.fromTo('#panel-frontend .sk-chip',{opacity:0,y:25,scale:.85},{opacity:1,y:0,scale:1,duration:.45,stagger:.06,ease:'back.out(1.8)'}) });

        // Mobile nav
        const hamBtn=document.getElementById('hamBtn');
        const mobileMenu=document.getElementById('mobileMenu');
        hamBtn?.addEventListener('click',()=>{
          hamBtn.classList.toggle('open');
          const opening=mobileMenu?.classList.toggle('open');
          if(opening) gsap.fromTo(mobileMenu!.querySelectorAll('a'),{opacity:0,y:40,skewY:5},{opacity:1,y:0,skewY:0,stagger:.09,duration:.55,ease:'power3.out',delay:.1});
        });
        document.querySelectorAll('.mob-link').forEach((link: any)=>{
          link.addEventListener('click',()=>{hamBtn?.classList.remove('open');mobileMenu?.classList.remove('open');});
        });

        // Progress ring
        const ring=document.getElementById('progress-ring');
        const ringCircle=document.getElementById('ringCircle') as SVGCircleElement;
        const circumference=2*Math.PI*22;
        if(ringCircle){ ringCircle.style.strokeDasharray=String(circumference); ringCircle.style.strokeDashoffset=String(circumference); }
        window.addEventListener('scroll',()=>{
          const scrolled=scrollY/(document.documentElement.scrollHeight-innerHeight);
          if(ringCircle) ringCircle.style.strokeDashoffset=String(circumference*(1-scrolled));
          ring?.classList.toggle('visible',scrollY>300);
        });

        // Nav scroll
        window.addEventListener('scroll',()=>document.getElementById('nav')?.classList.toggle('scrolled',scrollY>60));

        // Sparkle on click
        const SCOLS=['#7c6dfa','#f857a6','#2af598','#ffa62b','#00c6ff','#fff'];
        document.addEventListener('click',e=>{
          const count=10+Math.floor(Math.random()*8);
          for(let i=0;i<count;i++){
            const dot=document.createElement('div');
            const size=4+Math.random()*6, color=SCOLS[Math.floor(Math.random()*SCOLS.length)];
            dot.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;background:${color};position:fixed;border-radius:50%;pointer-events:none;z-index:9999;mix-blend-mode:screen`;
            document.body.appendChild(dot);
            const angle=Math.random()*Math.PI*2, dist=50+Math.random()*80;
            gsap.to(dot,{x:Math.cos(angle)*dist,y:Math.sin(angle)*dist,opacity:0,scale:0,duration:.6+Math.random()*.4,ease:'power2.out',onComplete:()=>dot.remove()});
          }
        });

        // Typed role rotator
        const roles = PERSONAL.roles;
        const roleEl=document.getElementById('roleTyped');
        let roleIdx=0, charIdx=0, deleting=false;
        function typeRole(){
          const cur=roles[roleIdx];
          if(!deleting){ if(roleEl) roleEl.textContent=cur.slice(0,++charIdx); if(charIdx===cur.length){deleting=true;setTimeout(typeRole,2000);return;} setTimeout(typeRole,80);}
          else{ if(roleEl) roleEl.textContent=cur.slice(0,--charIdx); if(charIdx===0){deleting=false;roleIdx=(roleIdx+1)%roles.length;setTimeout(typeRole,300);return;} setTimeout(typeRole,45);}
        }
        setTimeout(typeRole,1800);
      }

      function updateNavActive(id: string){
        document.querySelectorAll('.nav-links a').forEach((a: any)=>{
          a.style.color=a.getAttribute('href')==='#'+id?'var(--text)':'';
        });
      }
    }

    // Cleanup
    return () => {};
  }, []);

  return null;
}
