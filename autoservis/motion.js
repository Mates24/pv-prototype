/* Scroll motion for both prototypes (GSAP + ScrollTrigger). Same classes as the design brief:
   .rv fade-and-rise, .rv-s scale-in, .par photo parallax, .draw route stroke, .ride van on its path,
   .fly drifting plane, [data-count] numbers counting up. Without GSAP or with reduced motion the
   page simply stays static and complete. */
( function () {
	if ( ! window.gsap || ! window.ScrollTrigger ) {
		return;
	}
	gsap.registerPlugin( ScrollTrigger );
	document.documentElement.classList.add( 'gs' );
	const mm = gsap.matchMedia();

	mm.add( '(prefers-reduced-motion: no-preference)', () => {
		const below = ( el ) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

		// Reveals: only what starts below the fold, so the first screen never blinks.
		const rv = gsap.utils.toArray( '.rv' ).filter( below );
		const rvs = gsap.utils.toArray( '.rv-s' ).filter( below );
		gsap.set( rv, { autoAlpha: 0, y: 60 } );
		gsap.set( rvs, { autoAlpha: 0, scale: 0.92 } );
		ScrollTrigger.batch( rv, {
			start: 'top 88%',
			once: true,
			onEnter: ( els ) => gsap.to( els, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, overwrite: true } ),
		} );
		ScrollTrigger.batch( rvs, {
			start: 'top 90%',
			once: true,
			onEnter: ( els ) => gsap.to( els, { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12, overwrite: true } ),
		} );

		// Photo parallax inside its frame.
		gsap.utils.toArray( '.par' ).forEach( ( img ) => {
			gsap.fromTo( img, { yPercent: -6, scale: 1.12 }, {
				yPercent: 6, scale: 1.12, ease: 'none',
				scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
			} );
		} );

		// Route lines draw in; the van follows the red leg.
		gsap.utils.toArray( '.draw' ).forEach( ( p ) => {
			const len = p.getTotalLength ? p.getTotalLength() : 1000;
			// The big map draws with the scroll; small drawings play once when they come into view.
			const onMap = p.closest( '.route-map, #routeMap' );
			gsap.fromTo( p, { strokeDasharray: len, strokeDashoffset: len }, onMap
				? { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: p.closest( 'svg' ), start: 'top 80%', end: 'bottom 45%', scrub: 0.6 } }
				: { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest( 'svg' ), start: 'top 85%', once: true } } );
		} );
		gsap.utils.toArray( '.ride' ).forEach( ( v ) => {
			gsap.fromTo( v, { offsetDistance: '0%' }, {
				offsetDistance: '100%', ease: 'none',
				scrollTrigger: { trigger: v.parentElement, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
			} );
		} );
		gsap.utils.toArray( '.fly' ).forEach( ( f ) => {
			gsap.fromTo( f, { x: '-30vw', y: 120, rotation: -8 }, {
				x: '110vw', y: -140, rotation: -14, ease: 'none',
				scrollTrigger: { trigger: f.parentElement, start: 'top top', end: 'bottom top', scrub: true },
			} );
		} );

		// Numbers count up once.
		gsap.utils.toArray( '[data-count]' ).forEach( ( el ) => {
			const to = Number( el.dataset.count );
			const o = { n: 0 };
			el.textContent = '0';
			gsap.to( o, {
				n: to, duration: 1.6, ease: 'power2.out',
				onUpdate: () => ( el.textContent = Math.round( o.n ).toLocaleString( 'sk-SK' ) ),
				scrollTrigger: { trigger: el, start: 'top 90%', once: true },
			} );
		} );

		// Progress bars grow with their number.
		gsap.utils.toArray( '[data-bar]' ).forEach( ( el ) => {
			gsap.fromTo( el, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } } );
		} );

		return () => gsap.set( [ ...rv, ...rvs ], { clearProps: 'all' } );
	} );

	mm.add( '(prefers-reduced-motion: reduce)', () => {
		gsap.utils.toArray( '[data-count]' ).forEach( ( el ) => ( el.textContent = Number( el.dataset.count ).toLocaleString( 'sk-SK' ) ) );
	} );

	// Images and fonts change heights; recalculate trigger positions once they are in.
	window.addEventListener( 'load', () => ScrollTrigger.refresh() );
} )();
