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
		<div class="mnav"><div class="wrap">${ PAGES.map( ( [ h, n ] ) => `<a href="${ h }">${ n }</a>` ).join( '' ) }<a href="moj-ucet.html">Môj účet</a><a href="${ BOOK }" style="color:#EF4136">Rezervovať termín</a></div></div>`;
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
		<div class="ftr-bar"><div class="wrap"><span>pvautoservis.sk © 2026</span><a href="#top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Hore ↑</a></div></div>`;
	}

	// Shared snippet: the three-step process strip used on service pages.
	window.AS_ARR = '<svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
	document.querySelectorAll( '[data-book]' ).forEach( ( a ) => ( a.href = BOOK ) );

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
				const top = bookFrame.getBoundingClientRect().top - ( document.querySelector( 'header' )?.offsetHeight || 0 );
				if ( top < 0 ) {
					window.scrollBy( { top, behavior: 'smooth' } );
				}
			}
			if ( d.event === 'apponio_step' ) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push( { event: d.event, stepId: Number( d.stepId ), stepTitle: String( d.stepTitle ) } );
			}
			if ( d.event === 'created_reservation' ) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push( { event: d.event, reservationValue: Number( d.reservationValue ), reservationService: String( d.reservationService ) } );
			}
		} );
	}
} )();
