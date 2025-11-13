// Compatibilità browser
const api = window.browser || window.chrome;

/**
 * Somma tutti gli orari nella pagina nel formato "HH:MM"
 * Restituisce il totale nel formato "HH:MM"
 */
function totaleOre(colonna) {
	// selezione degli elementi target
	const labels = document.querySelectorAll(
		`div.grid-item--width1:nth-child(n+7):nth-child(-n+34) > div:nth-child(${colonna}) > label:nth-child(1)`
	);

	let totalMinutes = 0;
	for (let i = 0; i < labels.length; i++) {
		const text = labels[i].textContent.trim();
		if (text) {
			// presunto formato "HH:MM"
			const parts = text.split(':');
			if (parts.length === 2) {
				const hh = parseInt(parts[0], 10);
				const mm = parseInt(parts[1], 10);
				if (!isNaN(hh) && !isNaN(mm)) {
					totalMinutes += hh * 60 + mm;
				} else {
					console.warn('Formato orario non valido:', text);
				}
			} else {
				console.warn('Formato orario inesperato:', text);
			}
		}
	}

	// riconverti in "HH:MM"
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const hhStr = String(hours).padStart(2, '0');
	const mmStr = String(minutes).padStart(2, '0');

	return `${hhStr}:${mmStr}`;
}


function inserisciBlocco() {
	const parent = document.querySelector('#container_page > div:nth-child(3)');
	if (parent) {
		// crea il nuovo elemento
		const newElem = document.createElement('div');
		newElem.setAttribute('title', '');
		newElem.className = 'grid-item--width1 griglia_sep_gray';
		newElem.innerHTML = `
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-item grid-item--width48_3">
				<label class="darkgraytext label_row40" style="font-size: 10pt; white-space: unset;">
					<strong>Totale</strong>
				</label>
			</div>
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-item grid-item--width48_12 cursor_pointer"><!-- -->
				<div class="grid-item--width1 cursor_pointer">
					<label class="darkgraytext label_row40 cursor-pointer" style="font-size: 10pt;">&nbsp;</label>
				</div><!-- --><!-- -->
			</div>
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-item grid-item--width48_3 cursor_pointer" style="text-align: right;">
				<label class="darkgraytext label_row40 cursor-pointer" style="font-size: 10pt;">${totaleOre(6)}</label>
			</div>
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-item grid-item--width48_3 cursor_pointer" style="text-align: right;"><label
					class="darkgraytext label_row40 cursor-pointer" style="font-size: 10pt;">${totaleOre(8)}</label></div>
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-item grid-item--width48_11 cursor_pointer"><div class="grid-item--width1 cursor_pointer"><label class="darkgraytext label_row40 cursor_pointer" style="font-size: 10pt;"> &nbsp;</label></div> <!----> <!----> <!----> <!----></div>
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-item grid-item--width48_3 cursor_pointer" style="text-align: right;"><label
					class="darkgraytext label_row40 cursor-pointer" style="font-size: 10pt !important;">${totaleOre(12)}</label></div>
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-item grid-item--width48_3 cursor-pointer" style="text-align: right;"><label
					class="darkgraytext label_row40 cursor-pointer" style="font-size: 10pt;">${totaleOre(14)}</label></div>
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-item grid-item--width48_1"><img src="/img/gear_pict/espandi.svg" width="20" class="cursor_pointer"
					style="margin-top: 10px; float: left;"><!-- --></div>
			<div class="grid-item grid-item--width48_1">&nbsp;</div>
			<div class="grid-clear">&nbsp;</div>
		`;
		parent.appendChild(newElem);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	inserisciBlocco();
});

inserisciBlocco();