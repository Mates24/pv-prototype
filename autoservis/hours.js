/* Opening hours card with today's row highlighted (fills #hoursBox). */
document.querySelectorAll( '#hoursBox' ).forEach( ( box ) => {
	const st = window.AS_STATUS();
	const day = new Date().getDay();
	const rows = [
		[ 'Pondelok – Štvrtok', '7:00 – 17:00', day >= 1 && day <= 4 ],
		[ 'Piatok', '7:00 – 15:00', day === 5 ],
		[ 'Sobota – Nedeľa', 'Zatvorené', day === 0 || day === 6 ],
	];
	box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap"><h3 class="cond" style="margin:0;font-size:26px;font-weight:600">Otváracie hodiny</h3><span style="display:inline-flex;align-items:center;gap:8px;font-size:13px"><span class="dot" style="background:${ st.color };color:${ st.color }"></span>${ st.label }</span></div>` +
		rows.map( ( r ) => `<div class="hr${ r[ 2 ] ? ' today' : '' }"><span>${ r[ 0 ] }</span><span>${ r[ 1 ] }</span></div>` ).join( '' ) +
		'<div class="hr" style="color:#fff;flex-wrap:wrap"><a href="https://maps.google.com/?q=PV+Autoservis+Technick%C3%A1+5957%2F7A+Bratislava" target="_blank" rel="noopener" style="color:inherit;text-underline-offset:3px">Technická 5957/7A, 821 04 Bratislava</a><a href="mailto:pvsbratislava@gmail.com" style="color:inherit;text-underline-offset:3px">pvsbratislava@gmail.com</a></div>';
} );
