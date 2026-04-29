const colorsData = {
    black: { value: 0, multiplier: 1, label: 'Negro' },
    brown: { value: 1, multiplier: 10, tolerance: 1, label: 'Marrón' },
    red: { value: 2, multiplier: 100, tolerance: 2, label: 'Rojo' },
    orange: { value: 3, multiplier: 1000, label: 'Naranja' },
    yellow: { value: 4, multiplier: 10000, label: 'Amarillo' },
    green: { value: 5, multiplier: 100000, tolerance: 0.5, label: 'Verde' },
    blue: { value: 6, multiplier: 1000000, tolerance: 0.25, label: 'Azul' },
    violet: { value: 7, multiplier: 10000000, tolerance: 0.1, label: 'Violeta' },
    gray: { value: 8, multiplier: 100000000, tolerance: 0.05, label: 'Gris' },
    white: { value: 9, multiplier: 1000000000, label: 'Blanco' },
    gold: { multiplier: 0.1, tolerance: 5, label: 'Oro' },
    silver: { multiplier: 0.01, tolerance: 10, label: 'Plata' }
};

let currentMode = 4;

// Elements
const mode4Btn = document.getElementById('mode-4');
const mode5Btn = document.getElementById('mode-5');
const bandInputs = {
    1: document.getElementById('band-1'),
    2: document.getElementById('band-2'),
    3: document.getElementById('band-3'),
    multiplier: document.getElementById('band-multiplier'),
    tolerance: document.getElementById('band-tolerance')
};
const visualBands = {
    1: document.getElementById('visual-band-1'),
    2: document.getElementById('visual-band-2'),
    3: document.getElementById('visual-band-3'),
    4: document.getElementById('visual-band-4'),
    5: document.getElementById('visual-band-5')
};
const group3 = document.getElementById('group-3');

// Results display
const theoreticalDisplay = document.getElementById('theoretical-value');
const toleranceDisplay = document.getElementById('tolerance-display');
const minDisplay = document.getElementById('min-value');
const maxDisplay = document.getElementById('max-value');
const multimeterDisplay = document.getElementById('multimeter-value');
const statusDisplay = document.getElementById('status-value');

function populateSelects() {
    const digitColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'gray', 'white'];
    const multiplierColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'gray', 'white', 'gold', 'silver'];
    const toleranceColors = ['brown', 'red', 'green', 'blue', 'violet', 'gray', 'gold', 'silver'];

    // Digit selects (excluding black for band 1)
    digitColors.forEach((color, i) => {
        if (i > 0) {
            const opt = new Option(`${colorsData[color].label} (${colorsData[color].value})`, color);
            bandInputs[1].add(opt);
        }
        bandInputs[2].add(new Option(`${colorsData[color].label} (${colorsData[color].value})`, color));
        bandInputs[3].add(new Option(`${colorsData[color].label} (${colorsData[color].value})`, color));
    });

    // Multiplier
    multiplierColors.forEach(color => {
        const mult = colorsData[color].multiplier;
        const label = mult < 1 ? mult : (mult >= 1000000 ? (mult/1000000)+'M' : (mult >= 1000 ? (mult/1000)+'k' : mult));
        bandInputs.multiplier.add(new Option(`${colorsData[color].label} (x${label})`, color));
    });

    // Tolerance
    toleranceColors.forEach(color => {
        bandInputs.tolerance.add(new Option(`${colorsData[color].label} (±${colorsData[color].tolerance}%)`, color));
    });

    // Set defaults
    bandInputs[1].value = 'brown';
    bandInputs[2].value = 'black';
    bandInputs[3].value = 'black';
    bandInputs.multiplier.value = 'brown';
    bandInputs.tolerance.value = 'gold';
}

function formatValue(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(2).replace(/\.00$/, '') + ' MΩ';
    if (num >= 1000) return (num / 1000).toFixed(2).replace(/\.00$/, '') + ' kΩ';
    return num.toFixed(2).replace(/\.00$/, '') + ' Ω';
}

function updateCalculator() {
    const b1 = bandInputs[1].value;
    const b2 = bandInputs[2].value;
    const b3 = bandInputs[3].value;
    const m = bandInputs.multiplier.value;
    const t = bandInputs.tolerance.value;

    let theoreticalValue = 0;
    let digits = "";

    if (currentMode === 4) {
        digits = `${colorsData[b1].value}${colorsData[b2].value}`;
        theoreticalValue = parseInt(digits) * colorsData[m].multiplier;
        
        visualBands[1].className = `band band-1 color-${b1}`;
        visualBands[2].className = `band band-2 color-${b2}`;
        visualBands[3].className = `band band-3 color-${m}`;
        visualBands[4].className = `band band-4 color-${t}`;
        visualBands[5].classList.add('hidden');
    } else {
        digits = `${colorsData[b1].value}${colorsData[b2].value}${colorsData[b3].value}`;
        theoreticalValue = parseInt(digits) * colorsData[m].multiplier;

        visualBands[1].className = `band band-1 color-${b1}`;
        visualBands[2].className = `band band-2 color-${b2}`;
        visualBands[3].className = `band band-3 color-${b3}`;
        visualBands[4].className = `band band-4 color-${m}`;
        visualBands[5].className = `band band-5 color-${t}`;
        visualBands[5].classList.remove('hidden');
    }

    const tolerance = colorsData[t].tolerance;
    const variance = theoreticalValue * (tolerance / 100);
    const min = theoreticalValue - variance;
    const max = theoreticalValue + variance;

    // Simulate multimeter (approx 0.5% offset from center + random jitter)
    const jitter = (Math.random() - 0.5) * (variance * 0.1);
    const multimeterVal = theoreticalValue + jitter;

    // Display
    theoreticalDisplay.textContent = formatValue(theoreticalValue);
    toleranceDisplay.textContent = `±${tolerance}%`;
    minDisplay.textContent = formatValue(min);
    maxDisplay.textContent = formatValue(max);
    multimeterDisplay.textContent = formatValue(multimeterVal);
    
    // Status
    if (Math.abs(theoreticalValue - multimeterVal) < (variance * 0.2)) {
        statusDisplay.textContent = "Excelente (Precisa)";
        statusDisplay.style.color = "#10b981";
    } else {
        statusDisplay.textContent = "Dentro de Tolerancia";
        statusDisplay.style.color = "#3b82f6";
    }
}

// Mode switching
mode4Btn.addEventListener('click', () => {
    currentMode = 4;
    mode4Btn.classList.add('active');
    mode5Btn.classList.remove('active');
    group3.classList.add('hidden');
    updateCalculator();
});

mode5Btn.addEventListener('click', () => {
    currentMode = 5;
    mode5Btn.classList.add('active');
    mode4Btn.classList.remove('active');
    group3.classList.remove('hidden');
    updateCalculator();
});

// Event listeners for inputs
Object.values(bandInputs).forEach(input => {
    input.addEventListener('change', updateCalculator);
});

// Init
populateSelects();
updateCalculator();
