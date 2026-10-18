/* Real map (OpenStreetMap, darkened to the brand) with the real driving route PV → terminal
   (OSRM on OpenStreetMap roads, 5.6 km), drawn in as it scrolls into view. Same markup as the
   WordPress site (tools/port/pages.mjs). */
document.querySelectorAll( '#routeMap' ).forEach( ( el ) => {
	const en = document.documentElement.lang.startsWith( 'en' );
	el.className = 'route-map';
	el.setAttribute( 'role', 'img' );
	el.setAttribute( 'aria-label', en ? 'Map: the PV car park at Stará Vajnorská 39 and the shuttle route to M. R. Štefánik Airport' : 'Mapa: parkovisko PV na Starej Vajnorskej 39 a cesta transferom na Letisko M. R. Štefánika' );
	el.innerHTML = `<div class="rm-in"><div class="rm-z">
		<img src="img/p-map.jpg" alt="" loading="lazy">
		<svg viewBox="0 0 1049 839" preserveAspectRatio="none" aria-hidden="true">
			<path d="M431.3 281.9 L456.3 280.4 L460.3 282.3 L514.9 278.5 L536.8 263.9 L542.7 263.4 L541.6 252.4 L543.7 249.3 L573.0 244.0 L578.1 248.2 L588.0 307.7 L591.0 347.4 L586.6 357.5 L569.8 380.5 L540.2 411.2 L512.5 444.1 L473.9 500.0 L453.6 535.9 L429.9 584.0 L408.6 639.6 L404.8 644.5 L399.7 646.5 L394.1 645.1 L390.5 640.9 L390.2 634.9 L394.5 629.0 L427.4 614.7 L524.6 596.6 L536.9 599.5 L545.3 607.3 L556.7 632.9 L554.4 639.7 L557.6 645.4 L561.4 644.9 L561.8 639.8 L573.4 627.2" stroke="rgba(226,90,75,.25)" stroke-width="14" fill="none" stroke-linecap="round"/>
			<path class="draw" d="M431.3 281.9 L456.3 280.4 L460.3 282.3 L514.9 278.5 L536.8 263.9 L542.7 263.4 L541.6 252.4 L543.7 249.3 L573.0 244.0 L578.1 248.2 L588.0 307.7 L591.0 347.4 L586.6 357.5 L569.8 380.5 L540.2 411.2 L512.5 444.1 L473.9 500.0 L453.6 535.9 L429.9 584.0 L408.6 639.6 L404.8 644.5 L399.7 646.5 L394.1 645.1 L390.5 640.9 L390.2 634.9 L394.5 629.0 L427.4 614.7 L524.6 596.6 L536.9 599.5 L545.3 607.3 L556.7 632.9 L554.4 639.7 L557.6 645.4 L561.4 644.9 L561.8 639.8 L573.4 627.2" stroke="#E25A4B" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="1200"/>
		</svg>
		<div class="rm-pv"><span>PV airport parking</span><i></i><b></b></div>
		<div class="rm-bts"><svg width="16" height="16" viewBox="0 0 24 24" fill="#1D1D1B" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>${ en ? 'BTS Airport' : 'Letisko BTS' }</div>
		<b class="rm-end"></b>
		<div class="rm-min">${ en ? '5.6 km' : '5,6 km' }</div>
	</div>
		<span class="rm-osm">© OpenStreetMap</span>
	</div>`;
} );
