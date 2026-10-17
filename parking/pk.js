/* PV airport parking — prototype behaviour shared by every page: header, footer, accordions,
   language switch, mobile menu and the price rules used by the price tools. */
( function () {
	// English pages are en-<page>.html; the switch goes to the same page in the other language.
	const EN = document.documentElement.lang.startsWith( 'en' );
	const t = ( sk, en ) => ( EN ? en : sk );
	const page = ( h ) => ( EN ? 'en-' + h : h );
	const PAGES = [
		[ 'index.html', t( 'Domov', 'Home' ) ],
		[ 'sluzby.html', t( 'Služby', 'Services' ) ],
		[ 'cennik.html', t( 'Cenník', 'Prices' ) ],
		[ 'ako-sa-k-nam-dostat.html', t( 'Ako sa k nám dostať', 'Directions' ) ],
		[ 'kontakt.html', t( 'Kontakt', 'Contact' ) ],
		[ 'upravit-rezervaciu.html', t( 'Upraviť rezerváciu', 'Change booking' ) ],
	];
	const EXTRA_PAGES = [ [ 'rezervacia.html', 'Rezervácia' ], [ 'vop.html', 'VOP' ], [ '404.html', '404' ] ];
	const here = ( document.body.dataset.page || 'index.html' ).replace( /^en-/, '' );
	const other = ( EN ? '' : 'en-' ) + here + location.search;
	const ARR = '<svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
	window.PV_ARR = ARR;

	const proto = document.getElementById( 'proto' );
	if ( proto ) {
		proto.className = 'proto';
		proto.innerHTML = '<div class="wrap"><b>Prototyp</b>' +
			PAGES.concat( EXTRA_PAGES ).map( ( [ href, name ] ) => `<a href="${ page( href ) }"${ href === here ? ' class="on"' : '' }>${ name }</a>` ).join( '' ) +
			'<a href="../autoservis/">PV Autoservis →</a></div>';
	}

	const hdr = document.getElementById( 'hdr' );
	if ( hdr ) {
		hdr.className = 'hdr';
		const links = PAGES.map( ( [ href, name ] ) => `<a class="nav-a${ href === here ? ' on' : '' }" href="${ page( href ) }">${ name }</a>` ).join( '' );
		const lang = EN
			? `<a href="${ other }" hreflang="sk" lang="sk">SK</a><span class="on" aria-current="true">EN</span>`
			: `<span class="on" aria-current="true">SK</span><a href="${ other }" hreflang="en" lang="en">EN</a>`;
		hdr.innerHTML = `<div class="wrap">
			<a class="logo" href="${ page( 'index.html' ) }" aria-label="${ t( 'PV airport parking – domov', 'PV airport parking – home' ) }"><img src="img/logo-p.svg" alt="PV airport parking" width="185" height="26"></a>
			<nav class="navlinks" aria-label="${ t( 'Hlavná navigácia', 'Main navigation' ) }">${ links }</nav>
			<div class="hdr-r">
				<div class="lang" role="group" aria-label="${ t( 'Jazyk', 'Language' ) }">${ lang }</div>
				<a class="btn btn-red btn-sm" href="${ page( 'rezervacia.html' ) }">${ t( 'Rezervovať', 'Book now' ) }</a>
				<button type="button" class="burger" aria-label="${ t( 'Otvoriť menu', 'Open menu' ) }" aria-expanded="false"><span class="bl" aria-hidden="true"><i></i><i></i><i></i></span></button>
			</div>
		</div>
		<div class="mnav"><div class="wrap">${ PAGES.map( ( [ h, n ] ) => `<a href="${ page( h ) }">${ n }</a>` ).join( '' ) }<a href="${ page( 'rezervacia.html' ) }" style="color:var(--red);font-weight:600">${ t( 'Rezervovať parkovanie', 'Book parking' ) }</a><div style="padding:16px 0" class="lang-m">${ EN ? `<a href="${ other }" style="display:inline;border:0;padding:0">SK</a> · EN` : `SK · <a href="${ other }" style="display:inline;border:0;padding:0">EN</a>` }</div></div></div>`;
		hdr.querySelector( '.burger' ).addEventListener( 'click', ( e ) => {
			const open = hdr.classList.toggle( 'open' );
			e.currentTarget.setAttribute( 'aria-expanded', String( open ) );
		} );
	}

	const ftr = document.getElementById( 'ftr' );
	if ( ftr ) {
		ftr.className = 'ftr';
		ftr.innerHTML = `<div class="wrap g-foot">
			<div>
				<img src="img/logo-p.svg" alt="PV airport parking" style="height:30px;width:auto;margin-bottom:20px">
				<p class="txt" style="font-size:15px;line-height:1.6;max-width:300px;margin-bottom:24px">${ t( 'Zaparkujte pri letisku Bratislava rýchlo, bezpečne a bez stresu.', 'Park at Bratislava Airport quickly, safely and stress-free.' ) }</p>
				<div style="display:flex;gap:10px">
					<a class="soc" href="https://www.facebook.com/pvairportparking" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="#C93C2E"><path d="M14 8V6.5c0-.8.2-1.5 1.5-1.5H17V2h-2.6C11.6 2 11 3.8 11 6v2H9v3h2v11h3V11h2.4l.6-3z"/></svg></a>
					<a class="soc" href="https://www.instagram.com/pv_airport_parking" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C93C2E" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
				</div>
			</div>
			<div class="col"><b>${ t( 'Služby', 'Services' ) }</b><a href="${ page( 'sluzby.html' ) }">${ t( 'Parkovanie a transfer', 'Parking and shuttle' ) }</a><br><a href="${ page( 'sluzby.html' ) }#vip">${ t( 'Kryté VIP parkovanie', 'Covered VIP parking' ) }</a><br><a href="${ page( 'sluzby.html' ) }#cistenie">${ t( 'Čistenie vozidla', 'Car cleaning' ) }</a><br><a href="${ page( 'vop.html' ) }">${ t( 'Všeobecné obchodné podmienky', 'Terms and conditions' ) }</a></div>
			<div class="col"><b>${ t( 'Sídlo', 'Registered office' ) }</b>PV Airport Parking s. r. o.<br>Technická 5957/7A<br>821 04 Bratislava – Ružinov<br>${ t( 'IČO', 'Company ID' ) } 57630089</div>
			<div class="col"><b>${ t( 'Prevádzka', 'Car park' ) }</b>Stará Vajnorská 39, 831 04 Bratislava<br>pvairportparking@gmail.com<br>+421 904 440 660<br>${ t( 'Po – Ne: 00:00 – 23:59', 'Mon – Sun: 00:00 – 23:59' ) }</div>
		</div>
		<div class="ftr-bar">© 2026 PV Airport Parking s. r. o. · ${ t( 'Všetky práva vyhradené.', 'All rights reserved.' ) }</div>`;
	}

	const $$ = ( sel, root = document ) => Array.from( root.querySelectorAll( sel ) );

	/* Date fields: our own calendar instead of the browser's picker (same look on every phone and
	   in the site's design). The date input stays in the form (value, events, min); a button shows
	   "št 22. 10. 2026" and opens the calendar. Two date fields in one form are a range: the days
	   between arrival and return are marked, and after the arrival the return calendar opens. */
	const en = EN;
	const DAYS = en ? [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ] : [ 'ne', 'po', 'ut', 'st', 'št', 'pi', 'so' ];
	const MONTHS = en
		? [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
		: [ 'január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december' ];
	const T = en
		? { pick: 'Choose a date', prev: 'Previous month', next: 'Next month', from: 'Arrival', to: 'Return', close: 'Close' }
		: { pick: 'Vyberte dátum', prev: 'Predchádzajúci mesiac', next: 'Nasledujúci mesiac', from: 'Príchod', to: 'Návrat', close: 'Zavrieť' };
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
		return en ? `${ wd } ${ d.getDate() }/${ d.getMonth() + 1 }/${ d.getFullYear() }` : `${ wd } ${ d.getDate() }. ${ d.getMonth() + 1 }. ${ d.getFullYear() }`;
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
				<span class="pvcal-m" aria-live="polite">${ label ? `<small>${ label }</small>` : '' }${ MONTHS[ m ] } ${ y }</span>
				<button type="button" class="pvcal-nav" data-nav="1" aria-label="${ T.next }">${ ARROW( 'M9 6l6 6-6 6' ) }</button>
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
		const base = inp.value || ( pair && pair[ 1 ] === inp && pair[ 0 ].value ) || ( inp.min > today ? inp.min : today );
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
			const f = $$( 'button:not([disabled])[tabindex="0"], .pvcal-nav:not([disabled]), .pvcal-close', cal );
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
		show.className = 'pin dshow';
		show.setAttribute( 'aria-haspopup', 'dialog' );
		show.setAttribute( 'aria-expanded', 'false' );
		const label = inp.closest( 'label' )?.querySelector( '.lbl' )?.textContent || inp.getAttribute( 'aria-label' ) || '';
		wrap.append( show, inp );
		inp.tabIndex = -1;
		inp.setAttribute( 'aria-hidden', 'true' );
		const upd = () => {
			show.textContent = fmtDate( nativeValue.get.call( inp ) );
			show.setAttribute( 'aria-label', `${ label ? label + ': ' : '' }${ fmtDate( nativeValue.get.call( inp ) ) }` );
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
	$$( 'input.pin[type=date]' ).forEach( enhanceDate );
	window.pvEnhanceDate = enhanceDate;

	document.querySelectorAll( 'input.pin[type=time]' ).forEach( ( inp ) => {
		const sel = document.createElement( 'select' );
		sel.className = 'pin tsel';
		sel.id = inp.id;
		sel.setAttribute( 'aria-label', inp.closest( 'label' )?.textContent.trim() || 'Čas' );
		for ( let m = 0; m < 1440; m += 15 ) {
			const t = String( Math.floor( m / 60 ) ).padStart( 2, '0' ) + ':' + String( m % 60 ).padStart( 2, '0' );
			sel.add( new Option( t, t ) );
		}
		sel.value = inp.value || '08:00';
		inp.replaceWith( sel );
	} );

	// Accordions: one open at a time inside the same group.
	document.querySelectorAll( '.acc-b' ).forEach( ( b ) => {
		b.addEventListener( 'click', () => {
			const acc = b.closest( '.acc' );
			const group = acc.parentElement;
			const open = ! acc.classList.contains( 'open' );
			if ( group.dataset.single !== undefined ) {
				group.querySelectorAll( '.acc' ).forEach( ( a ) => {
					a.classList.remove( 'open' );
					a.querySelector( '.acc-b' ).setAttribute( 'aria-expanded', 'false' );
				} );
			}
			acc.classList.toggle( 'open', open );
			b.setAttribute( 'aria-expanded', String( open ) );
			acc.dispatchEvent( new CustomEvent( 'pv-acc', { bubbles: true } ) );
		} );
	} );

	// Price rules from the current price list: season by arrival day, +5/6 € per started day after 16.
	const WINTER = [ 24, 30, 36, 42, 48, 54, 59, 65, 71, 77, 83, 89, 95, 101, 107, 113 ];
	const SUMMER = [ 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112, 119, 126, 133 ];
	const isSummer = ( d ) => {
		const md = ( d.getMonth() + 1 ) * 100 + d.getDate();
		return md >= 601 && md <= 915;
	};
	// Bookings made in this prototype, kept in the browser (the real site keeps them on the server).
	// P-20123 is a sample so "Upraviť rezerváciu" can be tried without booking first.
	const KEY = 'pv-pk-bookings';
	const iso = ( d ) => d.getFullYear() + '-' + String( d.getMonth() + 1 ).padStart( 2, '0' ) + '-' + String( d.getDate() ).padStart( 2, '0' );
	const sample = () => {
		const a = new Date(); a.setDate( a.getDate() + 5 );
		const b = new Date( a ); b.setDate( b.getDate() + 7 );
		return {
			ref: 'P-20123', token: 'ukazka', status: 'confirmed', from: iso( a ), fromT: '05:30', to: iso( b ), toT: '22:15',
			cars: [ { plate: 'BL123AB', vip: true } ], adults: '2', kids: '0', name: 'Jana Nováková', email: 'jana.novakova@example.sk',
			phone: '+421 905 123 456', flOut: 'FR 8231', flIn: 'FR 8232',
			lines: '<div class="sumrow"><span>Parkovanie · 8 dní</span><b>65,00 €</b></div><div class="sumrow"><span>Transfer na letisko a späť</span><b style="color:var(--green)">zdarma</b></div><div class="sumrow"><span>Kryté VIP</span><b>40,00 €</b></div>',
			total: '105,00 €',
		};
	};
	const all = () => {
		try {
			return JSON.parse( localStorage.getItem( KEY ) || '{}' );
		} catch ( e ) {
			return {};
		}
	};
	window.PVB = {
		save: ( b ) => {
			const list = all();
			list[ b.ref ] = b;
			try {
				localStorage.setItem( KEY, JSON.stringify( list ) );
			} catch ( e ) {}
		},
		get: ( ref ) => all()[ ref ] || ( ref === 'P-20123' ? sample() : null ),
	};

	window.PV = {
		WINTER,
		SUMMER,
		isSummer,
		table: ( summer ) => ( summer ? SUMMER : WINTER ),
		price: ( n, summer ) => {
			const t = summer ? SUMMER : WINTER;
			return n <= 16 ? t[ n - 1 ] : t[ 15 ] + ( n - 16 ) * ( summer ? 6 : 5 );
		},
		days: ( a, b ) => Math.max( 1, Math.ceil( ( b - a ) / 86400000 ) ),
		eur: ( n ) => ( EN ? '€' + n.toFixed( 2 ) : n.toFixed( 2 ).replace( '.', ',' ) + ' €' ),
		dl: ( n ) => ( EN ? n + ( n === 1 ? ' day' : ' days' ) : n + ( n === 1 ? ' deň' : n < 5 ? ' dni' : ' dní' ) ),
		iso: ( d ) => d.getFullYear() + '-' + String( d.getMonth() + 1 ).padStart( 2, '0' ) + '-' + String( d.getDate() ).padStart( 2, '0' ),
		sk: ( iso ) => {
			const [ y, m, d ] = iso.split( '-' ).map( Number );
			return EN ? `${ d }/${ m }/${ y }` : `${ d }. ${ m }. ${ y }`;
		},
	};
} )();
