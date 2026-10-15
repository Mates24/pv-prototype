/* Real map (OpenStreetMap, darkened to the brand) with the shuttle leg PV → BTS drawn on top.
   Pins sit at their true positions on the image; the red line draws in as it scrolls into view.
   On the live site this block can be an interactive Google map instead. */
document.querySelectorAll( '#routeMap' ).forEach( ( el ) => {
	el.setAttribute( 'role', 'img' );
	el.setAttribute( 'aria-label', 'Mapa: parkovisko PV na Starej Vajnorskej 39 a cesta transferom na Letisko M. R. Štefánika' );
	el.style.cssText = 'position:relative;background:#181817;overflow:hidden;min-height:0;display:flex;align-items:center';
	const path = 'M431 274 C 470 340, 520 470, 731 626';
	el.innerHTML = `<div style="position:relative;width:100%;aspect-ratio:1049/839;max-width:100%">
		<img src="img/p-map.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
		<svg viewBox="0 0 1049 839" preserveAspectRatio="none" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%">
			<path d="${ path }" stroke="rgba(226,90,75,.25)" stroke-width="14" fill="none" stroke-linecap="round"/>
			<path class="draw" d="${ path }" stroke="#E25A4B" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="1000"/>
		</svg>
		<div style="position:absolute;left:41.06%;top:32.7%;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center">
			<span style="padding:8px 14px;border-radius:12px;background:#C93C2E;color:#fff;font-size:13px;font-weight:600;white-space:nowrap;box-shadow:0 10px 24px -10px rgba(0,0,0,.6)">PV airport parking</span>
			<span style="width:2px;height:12px;background:#C93C2E"></span><span style="width:12px;height:12px;border-radius:50%;background:#C93C2E;box-shadow:0 0 0 5px rgba(201,60,46,.3);margin-top:-6px"></span>
		</div>
		<div style="position:absolute;left:69.67%;top:74.59%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:8px;padding:7px 12px 7px 9px;border-radius:999px;background:#fff;color:#1D1D1B;font-size:13px;font-weight:600;white-space:nowrap;box-shadow:0 10px 24px -10px rgba(0,0,0,.6)"><svg width="16" height="16" viewBox="0 0 24 24" fill="#1D1D1B" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>Letisko BTS</div>
		<div style="position:absolute;left:58%;top:49%;transform:translate(-50%,-50%);font-size:12px;padding:5px 10px;border-radius:999px;background:#1D1D1B;color:#fff;font-weight:600;border:1px solid rgba(255,255,255,.25)">≈ 5 min</div>
		<span style="position:absolute;right:8px;bottom:6px;font-size:10px;color:rgba(255,255,255,.55)">© OpenStreetMap</span>
	</div>`;
} );
