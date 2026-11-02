/* PV Autoservis — prototype behaviour shared by every page: live open/closed status, header,
   footer, mobile menu. Booking is Apponio's form inside objednavka.html. */
( function () {
	const BOOK = 'objednavka.html';
	window.AS_BOOK = BOOK;
	const PAGES = [
		[ 'index.html', 'Úvod' ],
		[ 'sluzby.html', 'Služby' ],
		[ 'cennik.html', 'Cenník' ],
		[ 'zimne-baliky.html', 'Zimné balíky' ],
		[ 'blog.html', 'Blog' ],
		[ 'kontakt.html', 'Kontakt' ],
	];
	const EXTRA = [
		[ 'sluzba-pneuservis.html', 'Pneuservis' ], [ 'sluzba-kontrola.html', 'Kontrola' ], [ 'sluzba-brzdy.html', 'Brzdy' ], [ 'sluzba-olej.html', 'Olej a filtre' ], [ 'sluzba-klima.html', 'Klimatizácia' ], [ 'sluzba-stk.html', 'STK a EK' ],
		[ 'clanok.html', 'Článok' ], [ 'objednavka.html', 'Objednať sa' ], [ 'moj-ucet.html', 'Môj účet' ], [ '404.html', '404' ],
	];
	const icon = document.createElement( 'link' );
	icon.rel = 'icon';
	icon.href = 'img/favicon-as.png';
	document.head.appendChild( icon );
	const here = document.body.dataset.page || 'index.html';
	const parent = document.body.dataset.parent;

	// Mon–Thu 7–16, Fri 7–14, lunch 12–13, weekend closed.
	const status = () => {
		const d = new Date(), day = d.getDay(), m = d.getHours() * 60 + d.getMinutes();
		const wk = day >= 1 && day <= 5, close = day === 5 ? 840 : 960;
		if ( wk && m >= 720 && m < 780 ) return { label: 'Obedná prestávka', sub: 'späť o 13:00', color: '#F4B400' };
		if ( wk && m >= 420 && m < close ) return { label: 'Práve otvorené', sub: day === 5 ? 'dnes do 14:00' : 'dnes do 16:00', color: '#34C27A' };
		const next = wk && m < 420 ? 'otvárame dnes o 7:00' : ( day >= 1 && day <= 4 ) || day === 0 ? 'otvárame zajtra o 7:00' : 'otvárame v pondelok o 7:00';
		return { label: 'Zatvorené', sub: next, color: '#8A8F96' };
	};
	window.AS_STATUS = status;

	const proto = document.getElementById( 'proto' );
	if ( proto ) {
		proto.className = 'proto';
		proto.innerHTML = '<div class="wrap"><b>Prototyp</b>' +
			PAGES.concat( EXTRA ).map( ( [ h, n ] ) => `<a href="${ h }"${ h === here ? ' class="on"' : '' }>${ n }</a>` ).join( '' ) +
			'<a href="../parking/">PV airport parking →</a></div>';
	}

	const hdr = document.getElementById( 'hdr' );
	if ( hdr ) {
		hdr.className = 'hdr';
		const links = PAGES.map( ( [ h, n ] ) => `<a class="nav-a${ h === here || h === parent ? ' on' : '' }" href="${ h }">${ n }</a>` ).join( '' );
		hdr.innerHTML = `<div class="wrap">
			<div style="display:flex;align-items:center;gap:40px">
				<a class="logo" href="index.html" aria-label="PV Autoservis – úvod"><img src="img/logo-as.png" alt="PV Autoservis" width="218" height="44"></a>
				<a class="nav-call" href="tel:+421910623111"><svg width="30" height="30" viewBox="0 0 24 24" fill="#EF4136" aria-hidden="true"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg><span style="display:flex;flex-direction:column;gap:3px"><span style="font-size:12px;color:#EF4136;font-weight:500">Telefonické objednávky</span><span style="font-size:20px;font-weight:500;letter-spacing:.01em;color:#000000">0910 623 111</span></span></a>
			</div>
			<nav class="navlinks" aria-label="Hlavná navigácia">${ links }</nav>
			<div style="display:flex;align-items:center;gap:10px">
				<a class="btn btn-out btn-sm tb-hide" href="moj-ucet.html" title="Vernostný program">Môj účet</a>
				<a class="btn btn-red btn-sm hdr-cta" href="${ BOOK }">Rezervovať</a>
				<button type="button" class="burger" aria-label="Otvoriť menu" aria-expanded="false"><span class="bl" aria-hidden="true"><i></i><i></i><i></i></span><span class="bt">Menu</span></button>
			</div>
		</div>
		<div class="mnav"><div class="wrap">${ PAGES.map( ( [ h, n ] ) => `<a href="${ h }">${ n }</a>` ).join( '' ) }<a class="mnav-acc" href="moj-ucet.html"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4-6.5 8-6.5s7 2 8 6.5"/></svg>Môj účet</a><a class="mnav-cta" href="${ BOOK }">Rezervovať termín</a></div></div>`;
		hdr.querySelector( '.burger' ).addEventListener( 'click', ( e ) => {
			const open = hdr.classList.toggle( 'open' );
			e.currentTarget.setAttribute( 'aria-expanded', String( open ) );
		} );
	}

	const ftr = document.getElementById( 'ftr' );
	if ( ftr ) {
		ftr.className = 'ftr';
		ftr.innerHTML = `<div class="wrap g-foot">
			<div><img src="img/logo-as-inv.png" alt="PV Autoservis" style="display:block;height:48px;width:auto;margin-bottom:22px"><p style="margin:0;font-size:15px;line-height:1.6;max-width:280px">Profesionálny autoservis – spoľahlivá starostlivosť o vaše vozidlo.</p></div>
			<div class="col"><span class="cols-h">Stránky</span>${ PAGES.map( ( [ h, n ] ) => `<a href="${ h }">${ n }</a>` ).join( '<br>' ) }<br><a href="moj-ucet.html">Môj účet</a></div>
			<div class="col"><span class="cols-h">Kontakt</span><b>+421 910 623 111</b><br>pvsbratislava@gmail.com<br>Technická 5957/7A<br>821 04 Bratislava – Ružinov<br>Po – Št 7:00 – 16:00, Pi 7:00 – 14:00</div>
			<div class="col"><span class="cols-h">Firma</span><b>PV Autoservis s. r. o.</b><br>IČO: 56706201 · DIČ: 2122401303<br>IČ DPH: SK2122401303<br>OR Mestského súdu Bratislava III, oddiel Sro, vložka 184288/B<br>IBAN: SK29 1100 0000 0029 4219 4864<br><a href="ochrana-osobnych-udajov.html">Ochrana osobných údajov</a> · <a href="cookies.html">Cookies</a></div>
		</div>
		<div class="ftr-bar"><div class="wrap"><span class="ftr-copy">pvautoservis.sk © 2026 · <a class="ftr-by" href="https://www.linkedin.com/in/mathiasmatejcik" target="_blank" rel="noopener">Design &amp; code · Mathias.dev</a></span><span class="ftr-links"><a href="ochrana-osobnych-udajov.html">Ochrana osobných údajov</a><a href="cookies.html">Cookies</a><a href="moj-ucet.html">Vernostný program</a></span><a class="ftr-top" href="#top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Hore ↑</a></div></div>`;
	}

	// Shared snippet: the three-step process strip used on service pages.
	window.AS_ARR = '<svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
	document.querySelectorAll( '[data-book]' ).forEach( ( a ) => ( a.href = BOOK ) );

	// Map on the contact sections: Google's iframe only after marketing consent or a click.
	const showMaps = () => document.querySelectorAll( '.map[data-map]' ).forEach( ( box ) => {
		const frame = document.createElement( 'iframe' );
		frame.src = box.dataset.map;
		frame.title = 'Mapa – PV Autoservis, Technická 5957/7A, Bratislava';
		frame.loading = 'lazy';
		frame.referrerPolicy = 'no-referrer-when-downgrade';
		box.replaceChildren( frame );
		box.removeAttribute( 'data-map' );
	} );
	document.querySelectorAll( '.map-load' ).forEach( ( b ) => b.addEventListener( 'click', showMaps ) );
	const mapConsent = () => {
		if ( document.cookie.includes( 'cmplz_marketing=allow' ) ) {
			showMaps();
		}
	};
	document.addEventListener( 'cmplz_fire_categories', mapConsent );
	mapConsent();

	// Apponio's form on the booking page reports its height and steps (docs/apponio/custom-code.html).
	const bookFrame = document.querySelector( '.book-frame' );
	if ( bookFrame ) {
		window.addEventListener( 'message', ( e ) => {
			const d = e.data;
			if ( e.origin !== 'https://pv-autoservis.myapponio.com' || ! d || d.type !== 'pv-apponio' ) {
				return;
			}
			if ( d.height > 0 ) {
				bookFrame.style.height = `${ Math.ceil( d.height ) }px`;
			}
			if ( d.scrollTop ) {
				// A new step starts right under the sticky header; after the form's own scrolling.
				setTimeout( () => {
					const top = bookFrame.getBoundingClientRect().top - ( document.querySelector( 'header' )?.offsetHeight || 0 );
					window.scrollBy( { top, behavior: 'smooth' } );
				}, 300 );
			}
			if ( d.event === 'apponio_step' ) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push( { event: d.event, stepId: Number( d.stepId ), stepTitle: String( d.stepTitle ) } );
				// Tag Manager has no tag for the steps; the Google tag it loads takes this directly.
				( function () { window.dataLayer.push( arguments ); } )( 'event', 'booking_step', { send_to: 'G-8ZS2GFCV88', step_id: Number( d.stepId ), step_title: String( d.stepTitle ) } );
			}
			if ( d.event === 'created_reservation' ) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push( { event: d.event, reservationValue: Number( d.reservationValue ), reservationService: String( d.reservationService ) } );
			}
		} );
	}
} )();

/* Date fields: the same calendar as the WordPress theme. */
( function () {
	const $$ = ( q, r = document ) => [ ...r.querySelectorAll( q ) ];
	/* Date fields: our own calendar instead of the browser's picker (same look on every phone and
	   in the site's design). The date input stays in the form (value, events, min); a button shows
	   "št 22. 10. 2026" and opens the calendar. Two date fields in one form are a range: the days
	   between arrival and return are marked, and after the arrival the return calendar opens. */
	const en = document.documentElement.lang.startsWith( 'en' );
	const DAYS = en ? [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ] : [ 'ne', 'po', 'ut', 'st', 'št', 'pi', 'so' ];
	const MONTHS = en
		? [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
		: [ 'január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december' ];
	const T = en
		? { pick: 'Choose a date', prev: 'Previous month', next: 'Next month', from: 'Arrival', to: 'Return', close: 'Close', ph: 'DD.MM.YYYY', month: 'Month', year: 'Year' }
		: { pick: 'Vyberte dátum', prev: 'Predchádzajúci mesiac', next: 'Nasledujúci mesiac', from: 'Príchod', to: 'Návrat', close: 'Zavrieť', ph: 'DD.MM.RRRR', month: 'Mesiac', year: 'Rok' };
	const pad = ( n ) => String( n ).padStart( 2, '0' );
	const isoOf = ( d ) => `${ d.getFullYear() }-${ pad( d.getMonth() + 1 ) }-${ pad( d.getDate() ) }`;
	const dateOf = ( v ) => {
		const [ y, m, d ] = v.split( '-' ).map( Number );
		return new Date( y, m - 1, d );
	};
	const fmtDate = ( v ) => {
		if ( ! v ) {
			return T.pick;
		}
		const d = dateOf( v );
		const wd = DAYS[ d.getDay() ];
		return `${ wd } ${ pad( d.getDate() ) }.${ pad( d.getMonth() + 1 ) }.${ d.getFullYear() }`;
	};
	const nativeValue = Object.getOwnPropertyDescriptor( HTMLInputElement.prototype, 'value' );
	const ARROW = ( d ) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ d }"/></svg>`;

	const cal = document.createElement( 'div' );
	cal.className = 'pvcal';
	cal.setAttribute( 'role', 'dialog' );
	cal.hidden = true;
	const sheet = document.createElement( 'div' );
	sheet.className = 'pvcal-back';
	sheet.hidden = true;
	let open = null; // { inp, show, view: Date (first of month), focus: iso }
	const today = isoOf( new Date() );

	// The other date field of the same form: [start, end] or null.
	const pairOf = ( inp ) => {
		const box = inp.closest( 'form, .pvq, .pvb-pk, .pass' );
		const all = box ? $$( 'input[type=date]', box ) : [];
		return all.length === 2 ? all : null;
	};
	const fire = ( inp ) => {
		inp.dispatchEvent( new Event( 'input', { bubbles: true } ) );
		inp.dispatchEvent( new Event( 'change', { bubbles: true } ) );
	};

	const render = () => {
		const { inp, view } = open;
		const pair = pairOf( inp );
		const isEnd = pair && pair[ 1 ] === inp;
		const startV = pair ? pair[ 0 ].value : '';
		const endV = pair ? pair[ 1 ].value : '';
		const min = inp.min || '';
		const max = inp.max || '';
		const y = view.getFullYear();
		const m = view.getMonth();
		const lead = ( new Date( y, m, 1 ).getDay() + 6 ) % 7; // Monday first
		const days = new Date( y, m + 1, 0 ).getDate();
		const minView = min ? dateOf( min ) : null;
		const prevOff = minView && ( y < minView.getFullYear() || ( y === minView.getFullYear() && m <= minView.getMonth() ) );
		const maxView = max ? dateOf( max ) : null;
		const nextOff = maxView && ( y > maxView.getFullYear() || ( y === maxView.getFullYear() && m >= maxView.getMonth() ) );
		// Birth dates are decades back: jump straight to the month and year.
		let title = `${ MONTHS[ m ] } ${ y }`;
		if ( inp.autocomplete === 'bday' ) {
			const lastY = maxView ? maxView.getFullYear() : new Date().getFullYear();
			let years = '';
			for ( let i = lastY; i >= 1900; i-- ) {
				years += `<option value="${ i }"${ i === y ? ' selected' : '' }>${ i }</option>`;
			}
			title = `<select class="pvcal-sel" data-sel="m" aria-label="${ T.month }">${ MONTHS.map( ( name, i ) => `<option value="${ i }"${ i === m ? ' selected' : '' }>${ name }</option>` ).join( '' ) }</select><select class="pvcal-sel" data-sel="y" aria-label="${ T.year }">${ years }</select>`;
		}
		let cells = '';
		for ( let i = 0; i < lead; i++ ) {
			cells += '<span class="pvcal-x"></span>';
		}
		for ( let d = 1; d <= days; d++ ) {
			const v = `${ y }-${ pad( m + 1 ) }-${ pad( d ) }`;
			const off = ( min && v < min ) || ( max && v > max );
			const cls = [ 'pvcal-d' ];
			if ( v === today ) {
				cls.push( 'is-today' );
			}
			if ( v === inp.value ) {
				cls.push( 'is-sel' );
			}
			if ( pair && startV && endV && startV < endV ) {
				if ( v === startV ) {
					cls.push( 'is-start' );
				}
				if ( v === endV ) {
					cls.push( 'is-end' );
				}
				if ( v > startV && v < endV ) {
					cls.push( 'is-in' );
				}
			}
			cells += `<button type="button" class="${ cls.join( ' ' ) }" data-v="${ v }"${ off ? ' disabled' : '' } tabindex="${ v === open.focus ? 0 : -1 }" aria-label="${ fmtDate( v ) }"${ v === inp.value ? ' aria-pressed="true"' : '' }>${ d }</button>`;
		}
		const label = pair ? ( isEnd ? T.to : T.from ) : '';
		cal.setAttribute( 'aria-label', label || T.pick );
		cal.innerHTML = `<div class="pvcal-h">
				<button type="button" class="pvcal-nav" data-nav="-1" aria-label="${ T.prev }"${ prevOff ? ' disabled' : '' }>${ ARROW( 'M15 6l-6 6 6 6' ) }</button>
				<span class="pvcal-m" aria-live="polite">${ label ? `<small>${ label }</small>` : '' }${ title }</span>
				<button type="button" class="pvcal-nav" data-nav="1" aria-label="${ T.next }"${ nextOff ? ' disabled' : '' }>${ ARROW( 'M9 6l6 6-6 6' ) }</button>
			</div>
			<div class="pvcal-w" aria-hidden="true">${ [ 1, 2, 3, 4, 5, 6, 0 ].map( ( i ) => `<span>${ DAYS[ i ] }</span>` ).join( '' ) }</div>
			<div class="pvcal-g">${ cells }</div>
			<button type="button" class="pvcal-close">${ T.close }</button>`;
	};

	const place = () => {
		if ( ! open ) {
			return;
		}
		const mobile = window.matchMedia( '(max-width: 640px)' ).matches;
		cal.classList.toggle( 'is-sheet', mobile );
		sheet.hidden = ! mobile;
		if ( mobile ) {
			cal.style.left = cal.style.top = '';
			return;
		}
		const r = open.show.getBoundingClientRect();
		const w = cal.offsetWidth;
		const left = Math.min( Math.max( 8, r.left ), window.innerWidth - w - 8 );
		const below = r.bottom + 8 + cal.offsetHeight < window.innerHeight || r.top < cal.offsetHeight + 16;
		cal.style.left = `${ left + window.scrollX }px`;
		cal.style.top = `${ ( below ? r.bottom + 8 : r.top - cal.offsetHeight - 8 ) + window.scrollY }px`;
	};

	const focusDay = () => cal.querySelector( `.pvcal-d[data-v="${ open.focus }"]` )?.focus( { preventScroll: true } );

	const openCal = ( inp, show ) => {
		const pair = pairOf( inp );
		let base = inp.value || ( pair && pair[ 1 ] === inp && pair[ 0 ].value ) || ( inp.min > today ? inp.min : today );
		if ( ! inp.value && inp.autocomplete === 'bday' ) {
			base = `${ Number( today.slice( 0, 4 ) ) - 30 }-01-01`;
		}
		const d = dateOf( base );
		open = { inp, show, view: new Date( d.getFullYear(), d.getMonth(), 1 ), focus: base };
		if ( ! cal.isConnected ) {
			document.body.append( sheet, cal );
		}
		$$( '.dshow[aria-expanded="true"]' ).forEach( ( b ) => b.setAttribute( 'aria-expanded', 'false' ) );
		show.setAttribute( 'aria-expanded', 'true' );
		render();
		cal.hidden = false;
		place();
		focusDay();
	};
	const closeCal = ( back ) => {
		if ( ! open ) {
			return;
		}
		cal.hidden = true;
		sheet.hidden = true;
		open.show.setAttribute( 'aria-expanded', 'false' );
		if ( back ) {
			open.show.focus();
		}
		open = null;
	};
	const pick = ( v ) => {
		const { inp } = open;
		const pair = pairOf( inp );
		inp.value = v;
		fire( inp );
		closeCal( false );
		// After the arrival, go straight on to the return (once the form has adjusted it).
		if ( pair && pair[ 0 ] === inp ) {
			const end = pair[ 1 ];
			setTimeout( () => openCal( end, end.closest( '.dfield' ).querySelector( '.dshow' ) ), 60 );
		} else {
			inp.closest( '.dfield' )?.querySelector( '.dshow' )?.focus();
		}
	};
	const move = ( days ) => {
		const d = dateOf( open.focus );
		d.setDate( d.getDate() + days );
		open.focus = isoOf( d );
		if ( d.getMonth() !== open.view.getMonth() || d.getFullYear() !== open.view.getFullYear() ) {
			open.view = new Date( d.getFullYear(), d.getMonth(), 1 );
		}
		render();
		focusDay();
	};

	cal.addEventListener( 'change', ( e ) => {
		const sel = e.target.closest( '[data-sel]' );
		if ( sel ) {
			const n = Number( sel.value );
			open.view = sel.dataset.sel === 'm' ? new Date( open.view.getFullYear(), n, 1 ) : new Date( n, open.view.getMonth(), 1 );
			open.focus = isoOf( open.view );
			const which = sel.dataset.sel;
			render();
			place();
			cal.querySelector( `[data-sel="${ which }"]` ).focus();
		}
	} );
	cal.addEventListener( 'click', ( e ) => {
		const nav = e.target.closest( '[data-nav]' );
		if ( nav ) {
			open.view = new Date( open.view.getFullYear(), open.view.getMonth() + Number( nav.dataset.nav ), 1 );
			open.focus = isoOf( open.view );
			render();
			place();
			return;
		}
		const day = e.target.closest( '.pvcal-d' );
		if ( day && ! day.disabled ) {
			pick( day.dataset.v );
			return;
		}
		if ( e.target.closest( '.pvcal-close' ) ) {
			closeCal( true );
		}
	} );
	// Return calendar: the range follows the pointer. Only classes change – redrawing the days
	// under the pointer would swallow the click.
	const paintRange = ( endV ) => {
		const pair = open && pairOf( open.inp );
		const startV = pair ? pair[ 0 ].value : '';
		if ( ! pair || pair[ 1 ] !== open.inp || ! startV || ! endV || endV <= startV ) {
			return;
		}
		$$( '.pvcal-d', cal ).forEach( ( b ) => {
			const v = b.dataset.v;
			b.classList.toggle( 'is-start', v === startV );
			b.classList.toggle( 'is-end', v === endV );
			b.classList.toggle( 'is-in', v > startV && v < endV );
		} );
	};
	cal.addEventListener( 'mouseover', ( e ) => {
		const day = e.target.closest( '.pvcal-d' );
		if ( day && ! day.disabled ) {
			paintRange( day.dataset.v );
		}
	} );
	cal.addEventListener( 'mouseleave', () => open && paintRange( open.inp.value ) );
	cal.addEventListener( 'keydown', ( e ) => {
		const keys = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
		if ( keys[ e.key ] && e.target.classList.contains( 'pvcal-d' ) ) {
			e.preventDefault();
			move( keys[ e.key ] );
		} else if ( e.key === 'Escape' ) {
			e.preventDefault();
			closeCal( true );
		} else if ( e.key === 'Tab' ) {
			// Keep the focus inside the calendar while it is open.
			const f = $$( 'button:not([disabled])[tabindex="0"], .pvcal-nav:not([disabled]), .pvcal-sel, .pvcal-close', cal );
			const i = f.indexOf( document.activeElement );
			if ( e.shiftKey && i <= 0 ) {
				e.preventDefault();
				f[ f.length - 1 ].focus();
			} else if ( ! e.shiftKey && i === f.length - 1 ) {
				e.preventDefault();
				f[ 0 ].focus();
			}
		}
	} );
	sheet.addEventListener( 'click', () => closeCal( true ) );
	document.addEventListener( 'mousedown', ( e ) => {
		if ( open && ! cal.contains( e.target ) && ! open.show.contains( e.target ) ) {
			closeCal( false );
		}
	} );
	window.addEventListener( 'resize', place );
	window.addEventListener( 'scroll', () => open && ! cal.classList.contains( 'is-sheet' ) && place(), { passive: true } );

	const enhanceDate = ( inp ) => {
		if ( inp.closest( '.dfield' ) ) {
			return;
		}
		const wrap = document.createElement( 'span' );
		wrap.className = 'dfield';
		inp.before( wrap );
		const show = document.createElement( 'button' );
		show.type = 'button';
		// Parking fields show the weekday too; the others are just DD.MM.YYYY.
		const plain = ! inp.classList.contains( 'pin' );
		show.className = `${ inp.className } pin dshow`;
		show.setAttribute( 'aria-haspopup', 'dialog' );
		show.setAttribute( 'aria-expanded', 'false' );
		const label = inp.closest( 'label' )?.querySelector( '.lbl' )?.textContent || inp.labels?.[ 0 ]?.textContent || inp.getAttribute( 'aria-label' ) || '';
		wrap.append( show, inp );
		inp.tabIndex = -1;
		inp.setAttribute( 'aria-hidden', 'true' );
		const upd = () => {
			const v = nativeValue.get.call( inp );
			show.textContent = plain ? ( v ? fmtDate( v ).replace( /^\S+ /, '' ) : T.ph ) : fmtDate( v );
			show.classList.toggle( 'is-empty', ! v );
			show.setAttribute( 'aria-label', `${ label ? label + ': ' : '' }${ fmtDate( v ) }` );
		};
		Object.defineProperty( inp, 'value', {
			configurable: true,
			get: () => nativeValue.get.call( inp ),
			set: ( v ) => {
				nativeValue.set.call( inp, v );
				upd();
			},
		} );
		inp.addEventListener( 'input', upd );
		inp.addEventListener( 'change', upd );
		show.addEventListener( 'click', () => ( open && open.inp === inp ? closeCal( false ) : openCal( inp, show ) ) );
		upd();
	};
	$$( 'input[type=date]' ).forEach( enhanceDate );
} )();

/* Phone and email buttons in articles call or write (the theme does this on the site). */
document.querySelectorAll( '.art a.wp-block-button__link:not([href])' ).forEach( ( a ) => {
	const text = a.textContent.replace( /[\s\u200B-\u200D\uFEFF]+/g, '' );
	if ( /^\+?\d{9,}$/.test( text ) ) {
		a.href = `tel:${ text.replace( /^0/, '+421' ) }`;
	} else if ( /^[^@]+@[^@]+\.[a-z]+$/i.test( text ) ) {
		a.href = `mailto:${ text }`;
	}
} );
