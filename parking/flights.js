/* Flight lookup for the parking prototype. In the real system this calls our own endpoint
   (/pvb/v1/pk/flight), which asks a flight-data provider and caches the answer; here a few
   sample flights stand in for it. Try FR 8231 (there) and FR 8232 (back). */
( function () {
	const SAMPLE = {
		FR8231: { airline: 'Ryanair', from: 'BTS', fromCity: 'Bratislava', to: 'TFS', toCity: 'Tenerife South', dep: '07:25', arr: '11:55', delay: 0 },
		FR8232: { airline: 'Ryanair', from: 'TFS', fromCity: 'Tenerife South', to: 'BTS', toCity: 'Bratislava', dep: '16:40', arr: '22:15', delay: 35 },
		W62343: { airline: 'Wizz Air', from: 'BTS', fromCity: 'Bratislava', to: 'LTN', toCity: 'Londýn Luton', dep: '06:10', arr: '07:40', delay: 0 },
		W62344: { airline: 'Wizz Air', from: 'LTN', fromCity: 'Londýn Luton', to: 'BTS', toCity: 'Bratislava', dep: '08:25', arr: '11:45', delay: 0 },
	};
	const norm = ( v ) => String( v || '' ).toUpperCase().replace( /[^A-Z0-9]/g, '' );
	const toMin = ( t ) => { const [ h, m ] = t.split( ':' ).map( Number ); return h * 60 + m; };
	const toTime = ( m ) => { m = ( ( m % 1440 ) + 1440 ) % 1440; return String( Math.floor( m / 60 ) ).padStart( 2, '0' ) + ':' + String( m % 60 ).padStart( 2, '0' ); };
	const round15 = ( m ) => Math.floor( m / 15 ) * 15;
	const daysAhead = ( iso ) => Math.round( ( new Date( iso + 'T12:00' ) - new Date( new Date().toDateString() + ' 12:00' ) ) / 86400000 );

	// Same answer shape the real endpoint will return.
	const lookup = ( number, iso ) => new Promise( ( resolve ) => setTimeout( () => {
		const f = SAMPLE[ norm( number ) ];
		if ( ! norm( number ) ) return resolve( { ok: false, message: 'Zadajte číslo letu, napríklad FR 8231.' } );
		if ( ! /^[A-Z0-9]{2}\d{1,4}$/.test( norm( number ) ) ) return resolve( { ok: false, message: 'Číslo letu má tvar dvoch znakov aerolinky a čísla, napr. FR 8231.' } );
		if ( ! f ) return resolve( { ok: false, message: `Let ${ number.toUpperCase() } sme na ${ iso.split( '-' ).reverse().join( '. ' ) } nenašli. Skontrolujte číslo a dátum letu.` } );
		const live = daysAhead( iso ) <= 1;
		resolve( { ok: true, flight: { ...f, number: norm( number ).replace( /^(\D\D|\w\d)/, '$1 ' ), live, delay: live ? f.delay : 0 } } );
	}, 650 ) );

	// One status card. kind: 'out' (departure from BTS) or 'in' (arrival to BTS).
	const card = ( f, kind ) => {
		const isOut = kind === 'out';
		const sched = isOut ? f.dep : f.arr;
		const est = toTime( toMin( sched ) + f.delay );
		const late = f.delay > 0;
		const state = ! f.live ? [ 'plan', 'Podľa letového poriadku' ] : late ? [ 'late', `Mešká ${ f.delay } min` ] : [ 'ok', 'Včas' ];
		const suggest = isOut ? toTime( round15( toMin( f.dep ) - 120 ) ) : toTime( round15( toMin( est ) + 45 + 14 ) );
		return `<div class="flc ${ state[ 0 ] }">
			<div class="flc-top"><span class="flc-no">${ f.number }</span><span class="flc-air">${ f.airline }</span><span class="flc-st">${ state[ 1 ] }</span></div>
			<div class="flc-route"><div><b>${ f.from }</b><small>${ f.fromCity }</small></div><span class="flc-line" aria-hidden="true"></span><div style="text-align:right"><b>${ f.to }</b><small>${ f.toCity }</small></div></div>
			<div class="flc-times">
				<div><span class="lbl">${ isOut ? 'Odlet z BTS' : 'Prílet na BTS' }</span><b class="num">${ late && f.live ? `<s>${ sched }</s> ${ est }` : sched }</b></div>
				${ isOut ? `<div><span class="lbl">Prílet ${ f.to }</span><b class="num">${ f.arr }</b></div>` : `<div><span class="lbl">Odlet ${ f.from }</span><b class="num">${ f.dep }</b></div>` }
			</div>
			${ f.live ? '' : '<p class="flc-note">Meškanie a zmeny času uvidíte deň pred letom a v deň letu.</p>' }
			<button type="button" class="flc-set" data-set="${ kind }" data-time="${ suggest }">${ isOut ? `Nastaviť príchod na parkovisko ${ suggest }` : `Nastaviť návrat ${ suggest }` }<small>${ isOut ? '2 hodiny pred odletom' : 'prílet + batožina a transfer' }</small></button>
		</div>`;
	};

	window.PVF = { lookup, card, norm };
} )();
