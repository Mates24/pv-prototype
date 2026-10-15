/* PV Autoservis — prototype behaviour shared by every page: live open/closed status, header,
   footer, mobile menu. Booking stays on Apponio (the owner's decision). */
( function () {
	const BOOK = 'https://pv-autoservis.myapponio.com';
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
		[ 'sluzba-pneuservis.html', 'Pneuservis' ], [ 'sluzba-kontrola.html', 'Kontrola' ], [ 'sluzba-brzdy.html', 'Brzdy' ], [ 'sluzba-olej.html', 'Olej a filtre' ],
		[ 'clanok.html', 'Článok' ], [ 'moj-ucet.html', 'Môj účet' ], [ '404.html', '404' ],
	];
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
	const st = status();

	const proto = document.getElementById( 'proto' );
	if ( proto ) {
		proto.className = 'proto';
		proto.innerHTML = '<div class="wrap"><b>Prototyp</b>' +
			PAGES.concat( EXTRA ).map( ( [ h, n ] ) => `<a href="${ h }"${ h === here ? ' class="on"' : '' }>${ n }</a>` ).join( '' ) +
			'<a href="../parking/">PV airport parking →</a></div>';
	}

	const hdr = document.getElementById( 'hdr' );
	if ( hdr ) {
		const top = document.createElement( 'div' );
		top.className = 'topbar';
		top.innerHTML = `<div class="wrap"><span style="display:inline-flex;align-items:center;gap:10px"><span class="dot" style="background:${ st.color };color:${ st.color }"></span><span style="color:#fff">${ st.label }</span> <span>· ${ st.sub }</span></span><span class="tb-hide">Technická 5957/7A, 821 04 Bratislava – Ružinov</span><span class="tb-hide">pvsbratislava@gmail.com</span></div>`;
		hdr.before( top );
		hdr.className = 'hdr';
		const links = PAGES.map( ( [ h, n ] ) => `<a class="nav-a${ h === here || h === parent ? ' on' : '' }" href="${ h }">${ n }</a>` ).join( '' );
		hdr.innerHTML = `<div class="wrap">
			<div style="display:flex;align-items:center;gap:40px">
				<a class="logo" href="index.html" aria-label="PV Autoservis – úvod"><img src="img/logo-as.png" alt="PV Autoservis" width="120" height="64"></a>
				<a class="nav-call" href="tel:+421910623111"><svg width="30" height="30" viewBox="0 0 24 24" fill="#CC4133" aria-hidden="true"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg><span style="display:flex;flex-direction:column;gap:3px"><span style="font-size:12px;color:#CC4133;font-weight:500">Telefonické objednávky</span><span style="font-size:20px;font-weight:500;letter-spacing:.01em;color:#141414">0910 623 111</span></span></a>
			</div>
			<nav class="navlinks" aria-label="Hlavná navigácia">${ links }</nav>
			<div style="display:flex;align-items:center;gap:10px">
				<a class="btn btn-out btn-sm tb-hide" href="moj-ucet.html" title="Vernostný program">Môj účet</a>
				<a class="btn btn-red btn-sm hdr-cta" href="${ BOOK }">Rezervovať</a>
				<button type="button" class="burger" aria-label="Menu" aria-expanded="false"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
			</div>
		</div>
		<div class="mnav"><div class="wrap">${ PAGES.map( ( [ h, n ] ) => `<a href="${ h }">${ n }</a>` ).join( '' ) }<a href="moj-ucet.html">Môj účet</a><a href="${ BOOK }" style="color:#CC4133">Rezervovať termín</a></div></div>`;
		hdr.querySelector( '.burger' ).addEventListener( 'click', ( e ) => {
			const open = hdr.classList.toggle( 'open' );
			e.currentTarget.setAttribute( 'aria-expanded', String( open ) );
		} );
	}

	const ftr = document.getElementById( 'ftr' );
	if ( ftr ) {
		ftr.className = 'ftr';
		ftr.innerHTML = `<div class="wrap g-foot">
			<div><span class="logo-tile"><img src="img/logo-as.png" alt="PV Autoservis" style="height:56px;width:auto"></span><p style="margin:0;font-size:15px;line-height:1.6;max-width:280px">Profesionálny autoservis – spoľahlivá starostlivosť o vaše vozidlo.</p></div>
			<div class="col"><span class="cols-h">Stránky</span>${ PAGES.map( ( [ h, n ] ) => `<a href="${ h }">${ n }</a>` ).join( '<br>' ) }<br><a href="moj-ucet.html">Môj účet</a></div>
			<div class="col"><span class="cols-h">Kontakt</span><b>+421 910 623 111</b><br>pvsbratislava@gmail.com<br>Technická 5957/7A<br>821 04 Bratislava – Ružinov<br>Po – Št 7:00 – 16:00, Pi 7:00 – 14:00</div>
			<div class="col"><span class="cols-h">Firma</span><b>PV-S1 s. r. o.</b><br>IČO: 55783660 · DIČ: 2122091917<br>IČ DPH: SK2122091917<br>OR Mestského súdu Bratislava III, oddiel Sro, vložka 173085/B<br><a href="#">Ochrana osobných údajov</a> · <a href="#">Cookies</a></div>
		</div>
		<div class="ftr-bar"><div class="wrap"><span>pvs1.sk © 2026</span><a href="#top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Hore ↑</a></div></div>`;
	}

	// Shared snippet: the three-step process strip used on service pages.
	window.AS_ARR = '<svg class="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
	document.querySelectorAll( '[data-book]' ).forEach( ( a ) => ( a.href = BOOK ) );
} )();
