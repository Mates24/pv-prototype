/* PV airport parking — prototype behaviour shared by every page: header, footer, accordions,
   language switch, mobile menu and the price rules used by the price tools. */
( function () {
	const PAGES = [
		[ 'index.html', 'Domov' ],
		[ 'sluzby.html', 'Služby' ],
		[ 'cennik.html', 'Cenník' ],
		[ 'ako-sa-k-nam-dostat.html', 'Ako sa k nám dostať' ],
		[ 'kontakt.html', 'Kontakt' ],
		[ 'upravit-rezervaciu.html', 'Upraviť rezerváciu' ],
	];
	const EXTRA_PAGES = [ [ 'rezervacia.html', 'Rezervácia' ], [ 'vop.html', 'VOP' ], [ '404.html', '404' ] ];
	const here = document.body.dataset.page || 'index.html';
	const ARR = '<svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
	window.PV_ARR = ARR;

	const proto = document.getElementById( 'proto' );
	if ( proto ) {
		proto.className = 'proto';
		proto.innerHTML = '<div class="wrap"><b>Prototyp</b>' +
			PAGES.concat( EXTRA_PAGES ).map( ( [ href, name ] ) => `<a href="${ href }"${ href === here ? ' class="on"' : '' }>${ name }</a>` ).join( '' ) +
			'<a href="../autoservis/">PV Autoservis →</a></div>';
	}

	const hdr = document.getElementById( 'hdr' );
	if ( hdr ) {
		hdr.className = 'hdr';
		const links = PAGES.map( ( [ href, name ] ) => `<a class="nav-a${ href === here ? ' on' : '' }" href="${ href }">${ name }</a>` ).join( '' );
		hdr.innerHTML = `<div class="wrap">
			<a class="logo" href="index.html" aria-label="PV airport parking – domov"><img src="img/logo-p.png" alt="PV airport parking" width="159" height="44"></a>
			<nav class="navlinks" aria-label="Hlavná navigácia">${ links }</nav>
			<div class="hdr-r">
				<div class="lang" role="group" aria-label="Jazyk"><button type="button" class="on">SK</button><button type="button">EN</button></div>
				<a class="btn btn-red btn-sm" href="rezervacia.html">Rezervovať</a>
				<button type="button" class="burger" aria-label="Menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
			</div>
		</div>
		<div class="mnav"><div class="wrap">${ PAGES.map( ( [ h, n ] ) => `<a href="${ h }">${ n }</a>` ).join( '' ) }<a href="rezervacia.html" style="color:var(--red);font-weight:600">Rezervovať parkovanie</a><div style="padding:16px 0" class="lang-m">SK · <a href="#" style="display:inline;border:0;padding:0">EN</a></div></div></div>`;
		hdr.querySelector( '.burger' ).addEventListener( 'click', ( e ) => {
			const open = hdr.classList.toggle( 'open' );
			e.currentTarget.setAttribute( 'aria-expanded', String( open ) );
		} );
		hdr.querySelectorAll( '.lang button' ).forEach( ( b, i, all ) => b.addEventListener( 'click', () => {
			all.forEach( ( x ) => x.classList.toggle( 'on', x === b ) );
		} ) );
	}

	const ftr = document.getElementById( 'ftr' );
	if ( ftr ) {
		ftr.className = 'ftr';
		ftr.innerHTML = `<div class="wrap g-foot">
			<div>
				<img src="img/logo-p.png" alt="PV airport parking" style="height:52px;width:auto;margin-bottom:20px">
				<p class="txt" style="font-size:15px;line-height:1.6;max-width:300px;margin-bottom:24px">Zaparkujte pri letisku Bratislava rýchlo, bezpečne a bez stresu.</p>
				<div style="display:flex;gap:10px">
					<a class="soc" href="https://www.facebook.com/pvairportparking" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="#C93C2E"><path d="M14 8V6.5c0-.8.2-1.5 1.5-1.5H17V2h-2.6C11.6 2 11 3.8 11 6v2H9v3h2v11h3V11h2.4l.6-3z"/></svg></a>
					<a class="soc" href="https://www.instagram.com/pv_airport_parking" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C93C2E" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
				</div>
			</div>
			<div class="col"><b>Služby</b><a href="sluzby.html">Parkovanie a transfer</a><br><a href="sluzby.html#vip">Kryté VIP parkovanie</a><br><a href="sluzby.html#cistenie">Čistenie vozidla</a><br><a href="vop.html">Všeobecné obchodné podmienky</a></div>
			<div class="col"><b>Sídlo</b>PV Airport Parking s. r. o.<br>Technická 5957/7A<br>821 04 Bratislava – Ružinov<br>IČO 57630089</div>
			<div class="col"><b>Prevádzka</b>Stará Vajnorská 39, 831 04 Bratislava<br>pvairportparking@gmail.com<br>+421 904 440 660<br>Po – Ne: 00:00 – 23:59</div>
		</div>
		<div class="ftr-bar">© 2026 PV Airport Parking s. r. o. · Všetky práva vyhradené.</div>`;
	}

	// Dates and times always in Slovak format, whatever the browser language: the native date
	// picker stays (it opens on tap), but what you see is "št 22. 10. 2026"; times are a 24-hour list.
	const DAYS = [ 'ne', 'po', 'ut', 'st', 'št', 'pi', 'so' ];
	const fmtDate = ( iso ) => {
		if ( ! iso ) return 'Vyberte dátum';
		const [ y, m, d ] = iso.split( '-' ).map( Number );
		return `${ DAYS[ new Date( y, m - 1, d ).getDay() ] } ${ d }. ${ m }. ${ y }`;
	};
	const nativeValue = Object.getOwnPropertyDescriptor( HTMLInputElement.prototype, 'value' );
	document.querySelectorAll( 'input.pin[type=date]' ).forEach( ( inp ) => {
		const wrap = document.createElement( 'span' );
		wrap.className = 'dfield';
		inp.before( wrap );
		const show = document.createElement( 'span' );
		show.className = 'pin dshow';
		show.setAttribute( 'aria-hidden', 'true' );
		wrap.append( show, inp );
		const upd = () => ( show.textContent = fmtDate( nativeValue.get.call( inp ) ) );
		Object.defineProperty( inp, 'value', { get: () => nativeValue.get.call( inp ), set: ( v ) => { nativeValue.set.call( inp, v ); upd(); } } );
		inp.addEventListener( 'input', upd );
		inp.addEventListener( 'change', upd );
		inp.addEventListener( 'click', () => { try { inp.showPicker(); } catch {} } );
		upd();
	} );
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
		eur: ( n ) => n.toFixed( 2 ).replace( '.', ',' ) + ' €',
		dl: ( n ) => n + ( n === 1 ? ' deň' : n < 5 ? ' dni' : ' dní' ),
		iso: ( d ) => d.getFullYear() + '-' + String( d.getMonth() + 1 ).padStart( 2, '0' ) + '-' + String( d.getDate() ).padStart( 2, '0' ),
		sk: ( iso ) => {
			const [ y, m, d ] = iso.split( '-' ).map( Number );
			return `${ d }. ${ m }. ${ y }`;
		},
	};
} )();
