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

const band1 = document.getElementById('band-1');
const band2 = document.getElementById('band-2');
const band3 = document.getElementById('band-3');
const band4 = document.getElementById('band-4');

const visualBands = [
    document.getElementById('visual-band-1'),
    document.getElementById('visual-band-2'),
    document.getElementById('visual-band-3'),
    document.getElementById('visual-band-4')
];

const theoreticalDisplay = document.getElementById('theoretical-value');
const toleranceDisplay = document.getElementById('tolerance-display');
const minDisplay = document.getElementById('min-value');
const maxDisplay = document.getElementById('max-value');

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toPrecision(4).replace(/\.0+$/, '') + ' MΩ';
    } else if (num >= 1000) {
        return (num / 1000).toPrecision(4).replace(/\.0+$/, '') + ' kΩ';
    } else {
        return num.toPrecision(4).replace(/\.0+$/, '') + ' Ω';
    }
}

function updateCalculator() {
    const b1Color = band1.value;
    const b2Color = band2.value;
    const b3Color = band3.value;
    const b4Color = band4.value;

    // Update visuals
    visualBands[0].className = `band color-${b1Color}`;
    visualBands[1].className = `band color-${b2Color}`;
    visualBands[2].className = `band color-${b3Color}`;
    visualBands[3].className = `band color-${b4Color}`;

    // Calculate
    const digit1 = colorsData[b1Color].value;
    const digit2 = colorsData[b2Color].value;
    const multiplier = colorsData[b3Color].multiplier;
    const tolerance = colorsData[b4Color].tolerance;

    if (digit1 === undefined || digit2 === undefined || multiplier === undefined) {
        theoreticalDisplay.textContent = 'Error';
        return;
    }

    const valueStr = `${digit1}${digit2}`;
    const theoreticalValue = parseInt(valueStr) * multiplier;
    
    theoreticalDisplay.textContent = formatNumber(theoreticalValue);
    toleranceDisplay.textContent = `±${tolerance}%`;

    const variance = theoreticalValue * (tolerance / 100);
    const minValue = theoreticalValue - variance;
    const maxValue = theoreticalValue + variance;

    minDisplay.textContent = formatNumber(minValue);
    maxDisplay.textContent = formatNumber(maxValue);
}

// Add event listeners
band1.addEventListener('change', updateCalculator);
band2.addEventListener('change', updateCalculator);
band3.addEventListener('change', updateCalculator);
band4.addEventListener('change', updateCalculator);

// Initial calculation
updateCalculator();
