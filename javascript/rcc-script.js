// রেজিস্টর কালার কোড ক্যালকুলেটর

// কালার ডেটা
const colorData = {
    // কালার: [অঙ্ক, গুণক, টলারেন্স, তাপমাত্রা সহগ]
    'black': { digit: 0, multiplier: 1, tolerance: null, tempCoeff: 250 },
    'brown': { digit: 1, multiplier: 10, tolerance: 1, tempCoeff: 100 },
    'red': { digit: 2, multiplier: 100, tolerance: 2, tempCoeff: 50 },
    'orange': { digit: 3, multiplier: 1000, tolerance: null, tempCoeff: 15 },
    'yellow': { digit: 4, multiplier: 10000, tolerance: null, tempCoeff: 25 },
    'green': { digit: 5, multiplier: 100000, tolerance: 0.5, tempCoeff: 20 },
    'blue': { digit: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10 },
    'violet': { digit: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5 },
    'gray': { digit: 8, multiplier: 100000000, tolerance: 0.05, tempCoeff: 1 },
    'white': { digit: 9, multiplier: 1000000000, tolerance: null, tempCoeff: null },
    'gold': { digit: null, multiplier: 0.1, tolerance: 5, tempCoeff: null },
    'silver': { digit: null, multiplier: 0.01, tolerance: 10, tempCoeff: null }
};

// কালার কোড ম্যাপিং (বাংলা সহ)
const colorMap = {
    'black': { name: 'কালো', hex: '#000000', textColor: '#ffffff' },
    'brown': { name: 'বাদামি', hex: '#964B00', textColor: '#ffffff' },
    'red': { name: 'লাল', hex: '#FF0000', textColor: '#ffffff' },
    'orange': { name: 'কমলা', hex: '#FFA500', textColor: '#000000' },
    'yellow': { name: 'হলুদ', hex: '#FFFF00', textColor: '#000000' },
    'green': { name: 'সবুজ', hex: '#00FF00', textColor: '#000000' },
    'blue': { name: 'নীল', hex: '#0000FF', textColor: '#ffffff' },
    'violet': { name: 'বেগুনি', hex: '#8B00FF', textColor: '#ffffff' },
    'gray': { name: 'ধূসর', hex: '#808080', textColor: '#ffffff' },
    'white': { name: 'সাদা', hex: '#FFFFFF', textColor: '#000000' },
    'gold': { name: 'সোনালী', hex: '#FFD700', textColor: '#000000' },
    'silver': { name: 'রূপালী', hex: '#C0C0C0', textColor: '#000000' }
};

// সাধারণ রেজিস্টর মানসমূহ
const commonResistors = [
    { value: 10, unit: 'Ω', colors: ['brown', 'black', 'black'] },
    { value: 22, unit: 'Ω', colors: ['red', 'red', 'black'] },
    { value: 47, unit: 'Ω', colors: ['yellow', 'violet', 'black'] },
    { value: 100, unit: 'Ω', colors: ['brown', 'black', 'brown'] },
    { value: 220, unit: 'Ω', colors: ['red', 'red', 'brown'] },
    { value: 470, unit: 'Ω', colors: ['yellow', 'violet', 'brown'] },
    { value: 1000, unit: 'Ω', colors: ['brown', 'black', 'red'] },
    { value: 2200, unit: 'Ω', colors: ['red', 'red', 'red'] },
    { value: 4700, unit: 'Ω', colors: ['yellow', 'violet', 'red'] },
    { value: 10000, unit: 'Ω', colors: ['brown', 'black', 'orange'] },
    { value: 22000, unit: 'Ω', colors: ['red', 'red', 'orange'] },
    { value: 47000, unit: 'Ω', colors: ['yellow', 'violet', 'orange'] },
    { value: 100000, unit: 'Ω', colors: ['brown', 'black', 'yellow'] },
    { value: 1000000, unit: 'Ω', colors: ['brown', 'black', 'green'] }
];

// DOM এলিমেন্টস
let currentTab = 'value-to-color';
let selectedColors = {
    1: 'brown',
    2: 'black',
    3: 'red',
    4: 'gold',
    5: 'brown',
    6: 'brown'
};

// পেজ লোড হওয়ার পরে ইনিশিয়ালাইজেশন
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeCommonValues();
    initializeColorSelector();
    initializeReferenceTable();
    calculateFromValue(); // প্রাথমিক ক্যালকুলেশন
});

// ট্যাব ব্যবস্থাপনা
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // সকল ট্যাব নিষ্ক্রিয় করুন
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // নির্বাচিত ট্যাব সক্রিয় করুন
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            currentTab = tabId;
            
            // ট্যাব পরিবর্তনে কিছু রিসেট করুন
            if (tabId === 'color-to-value') {
                updateColorSelectionDisplay();
            }
        });
    });
}

// সাধারণ মানসমূহ ইনিশিয়ালাইজেশন
function initializeCommonValues() {
    const grid = document.getElementById('commonValuesGrid');
    if (!grid) return;
    
    commonResistors.forEach(resistor => {
        const item = document.createElement('div');
        item.className = 'value-item';
        item.setAttribute('data-value', resistor.value);
        item.setAttribute('data-unit', resistor.unit);
        
        // কালার ডটস তৈরি
        const colorsHtml = resistor.colors.map(color => 
            `<span class="color-dot" style="background-color: ${colorMap[color].hex}"></span>`
        ).join('');
        
        item.innerHTML = `
            <div class="value-ohms">${resistor.value}${resistor.unit}</div>
            <div class="value-colors">${colorsHtml}</div>
        `;
        
        item.addEventListener('click', function() {
            document.getElementById('resistanceValue').value = resistor.value;
            calculateFromValue();
            EEHub.showNotification(`${resistor.value}${resistor.unit} মান সেট করা হয়েছে`, 'success');
        });
        
        grid.appendChild(item);
    });
}

// রেফারেন্স টেবিল ইনিশিয়ালাইজেশন
function initializeReferenceTable() {
    const tbody = document.getElementById('referenceTableBody');
    if (!tbody) return;
    
    Object.entries(colorMap).forEach(([color, info]) => {
        const data = colorData[color];
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td style="background-color: ${info.hex}; color: ${info.textColor}; font-weight: bold;">
                ${info.name}
            </td>
            <td>${data.digit !== null ? data.digit : '-'}</td>
            <td>${data.multiplier ? formatMultiplier(data.multiplier) : '-'}</td>
            <td>${data.tolerance ? `±${data.tolerance}%` : '-'}</td>
            <td>${data.tempCoeff ? `${data.tempCoeff}ppm/K` : '-'}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// মান থেকে কালার কোড ক্যালকুলেশন
function calculateFromValue() {
    const value = parseFloat(document.getElementById('resistanceValue').value);
    const unit = document.getElementById('resistanceUnit').value;
    const tolerance = parseFloat(document.getElementById('tolerance').value);
    const bandType = document.querySelector('input[name="bandType"]:checked').value;
    
    // ইউনিট অনুযায়ী মান রূপান্তর
    let resistance = value;
    if (unit === 'kΩ') resistance = value * 1000;
    if (unit === 'MΩ') resistance = value * 1000000;
    
    // কালার কোড বের করুন
    const colors = getColorsFromValue(resistance, tolerance, parseInt(bandType));
    
    // ফলাফল প্রদর্শন
    displayResistor(colors, bandType);
    displayResultDetails(resistance, tolerance, colors);
    updateColorTable(colors, bandType);
}

function getColorsFromValue(resistance, tolerance, bandCount) {
    // প্রাথমিক মান থেকে ব্যান্ড বের করুন
    let colors = [];
    
    if (bandCount === 4) {
        // 4-ব্যান্ড: digit1, digit2, multiplier, tolerance
        colors = calculate4BandColors(resistance, tolerance);
    } else if (bandCount === 5) {
        // 5-ব্যান্ড: digit1, digit2, digit3, multiplier, tolerance
        colors = calculate5BandColors(resistance, tolerance);
    } else if (bandCount === 6) {
        // 6-ব্যান্ড: digit1, digit2, digit3, multiplier, tolerance, tempCoeff
        colors = calculate6BandColors(resistance, tolerance);
    }
    
    return colors;
}

function calculate4BandColors(resistance, tolerance) {
    const colors = [];
    let value = resistance;
    
    // মানকে বৈজ্ঞানিক স্বরলিপিতে প্রকাশ
    const scientific = value.toExponential(2);
    const [coefficient, exponent] = scientific.split('e').map(Number);
    
    // প্রথম দুটি অঙ্ক
    const firstDigit = Math.floor(coefficient * 10);
    const secondDigit = Math.floor((coefficient * 100) % 10);
    
    colors.push(getColorByDigit(firstDigit));
    colors.push(getColorByDigit(secondDigit));
    
    // গুণক (exponent - 1 কারণ আমরা দুটি অঙ্ক ব্যবহার করেছি)
    const multiplierExponent = exponent - 1;
    colors.push(getColorByMultiplier(multiplierExponent));
    
    // টলারেন্স
    colors.push(getColorByTolerance(tolerance));
    
    return colors;
}

function calculate5BandColors(resistance, tolerance) {
    const colors = [];
    let value = resistance;
    
    // মানকে বৈজ্ঞানিক স্বরলিপিতে প্রকাশ
    const scientific = value.toExponential(3);
    const [coefficient, exponent] = scientific.split('e').map(Number);
    
    // প্রথম তিনটি অঙ্ক
    const firstDigit = Math.floor(coefficient * 100);
    const secondDigit = Math.floor((coefficient * 1000) % 10);
    const thirdDigit = Math.floor((coefficient * 10000) % 10);
    
    colors.push(getColorByDigit(firstDigit));
    colors.push(getColorByDigit(secondDigit));
    colors.push(getColorByDigit(thirdDigit));
    
    // গুণক (exponent - 2 কারণ আমরা তিনটি অঙ্ক ব্যবহার করেছি)
    const multiplierExponent = exponent - 2;
    colors.push(getColorByMultiplier(multiplierExponent));
    
    // টলারেন্স
    colors.push(getColorByTolerance(tolerance));
    
    return colors;
}

function calculate6BandColors(resistance, tolerance) {
    // প্রথমে 5-ব্যান্ডের মতো, তারপর তাপমাত্রা সহগ যোগ করুন
    const colors = calculate5BandColors(resistance, tolerance);
    // ডিফল্ট তাপমাত্রা সহগ (বাদামি - 100ppm/K)
    colors.push('brown');
    return colors;
}

// হেল্পার ফাংশনসমূহ
function getColorByDigit(digit) {
    for (const [color, data] of Object.entries(colorData)) {
        if (data.digit === digit) return color;
    }
    return 'black';
}

function getColorByMultiplier(exponent) {
    for (const [color, data] of Object.entries(colorData)) {
        if (data.multiplier === Math.pow(10, exponent)) return color;
    }
    return 'black';
}

function getColorByTolerance(tolerance) {
    for (const [color, data] of Object.entries(colorData)) {
        if (data.tolerance === tolerance) return color;
    }
    // ডিফল্ট হিসেবে সোনালী
    return 'gold';
}

// ফলাফল প্রদর্শন
function displayResistor(colors, bandCount) {
    const container = document.getElementById('bandContainer');
    const legend = document.getElementById('bandLegend');
    
    if (!container || !legend) return;
    
    container.innerHTML = '';
    legend.innerHTML = '';
    
    const bandLabels = bandCount === 4 ? 
        ['১ম অঙ্ক', '২য় অঙ্ক', 'গুণক', 'টলারেন্স'] :
        bandCount === 5 ?
        ['১ম অঙ্ক', '২য় অঙ্ক', '৩য় অঙ্ক', 'গুণক', 'টলারেন্স'] :
        ['১ম অঙ্ক', '২য় অঙ্ক', '৩য় অঙ্ক', 'গুণক', 'টলারেন্স', 'তাপ সহগ'];
    
    colors.forEach((color, index) => {
        // ব্যান্ড তৈরি
        const band = document.createElement('div');
        band.className = 'color-band';
        band.style.backgroundColor = colorMap[color].hex;
        
        const label = document.createElement('div');
        label.className = 'band-label';
        label.textContent = bandLabels[index];
        
        band.appendChild(label);
        container.appendChild(band);
        
        // লিজেন্ড আইটেম তৈরি
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        const indicator = document.createElement('div');
        indicator.className = 'color-indicator';
        indicator.style.backgroundColor = colorMap[color].hex;
        
        const text = document.createElement('span');
        text.textContent = `${index + 1}: ${colorMap[color].name}`;
        
        legendItem.appendChild(indicator);
        legendItem.appendChild(text);
        legend.appendChild(legendItem);
    });
}

function displayResultDetails(resistance, tolerance, colors) {
    const valueElement = document.getElementById('resultValue');
    const colorsElement = document.getElementById('resultColors');
    const rangeElement = document.getElementById('resultRange');
    const seriesElement = document.getElementById('resultSeries');
    
    if (!valueElement || !colorsElement || !rangeElement || !seriesElement) return;
    
    // মান ফরম্যাট করুন
    let formattedValue;
    if (resistance >= 1000000) {
        formattedValue = `${(resistance / 1000000).toFixed(2)}MΩ`;
    } else if (resistance >= 1000) {
        formattedValue = `${(resistance / 1000).toFixed(2)}kΩ`;
    } else {
        formattedValue = `${resistance.toFixed(2)}Ω`;
    }
    
    valueElement.textContent = `${formattedValue} ±${tolerance}%`;
    
    // কালার কোড প্রদর্শন
    const colorNames = colors.map(color => colorMap[color].name);
    colorsElement.textContent = colorNames.join(' - ');
    
    // রেঞ্জ ক্যালকুলেশন
    const min = resistance * (1 - tolerance/100);
    const max = resistance * (1 + tolerance/100);
    
    rangeElement.textContent = `${formatResistance(min)} - ${formatResistance(max)}`;
    
    // সিরিজ নির্ধারণ
    const series = getESeries(resistance);
    seriesElement.textContent = series;
}

function updateColorTable(colors, bandCount) {
    const tbody = document.getElementById('colorTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const descriptions = bandCount === 4 ? 
        ['১ম অঙ্ক', '২য় অঙ্ক', 'গুণক', 'টলারেন্স'] :
        bandCount === 5 ?
        ['১ম অঙ্ক', '২য় অঙ্ক', '৩য় অঙ্ক', 'গুণক', 'টলারেন্স'] :
        ['১ম অঙ্ক', '২য় অঙ্ক', '৩য় অঙ্ক', 'গুণক', 'টলারেন্স', 'তাপমাত্রা সহগ'];
    
    colors.forEach((color, index) => {
        const data = colorData[color];
        const info = colorMap[color];
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${descriptions[index]}</td>
            <td>
                <span class="color-badge" style="background-color: ${info.hex}; color: ${info.textColor}">
                    ${info.name}
                </span>
            </td>
            <td>${data.digit !== null ? data.digit : '-'}</td>
            <td>${data.multiplier ? formatMultiplier(data.multiplier) : '-'}</td>
            <td>${data.tolerance ? `±${data.tolerance}%` : '-'}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// কালার থেকে মান ক্যালকুলেশন
function initializeColorSelector() {
    const bandSelection = document.getElementById('bandSelection');
    const colorOptions = document.getElementById('colorOptions');
    
    if (!bandSelection || !colorOptions) return;
    
    // ব্যান্ড সিলেকশন তৈরি করুন
    for (let i = 1; i <= 6; i++) {
        const bandItem = document.createElement('div');
        bandItem.className = 'band-item';
        bandItem.innerHTML = `
            <div class="band-number">ব্যান্ড ${i}</div>
            <div class="color-display" id="band${i}Display" data-band="${i}"></div>
            <div class="color-name" id="band${i}Name"></div>
        `;
        bandSelection.appendChild(bandItem);
    }
    
    // কালার অপশন তৈরি করুন
    Object.entries(colorMap).forEach(([color, info]) => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = info.hex;
        colorOption.setAttribute('data-color', color);
        colorOption.title = info.name;
        
        colorOption.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            const activeBand = document.querySelector('.color-display.active');
            if (activeBand) {
                const band = parseInt(activeBand.getAttribute('data-band'));
                selectedColors[band] = color;
                updateColorSelectionDisplay();
            }
        });
        
        colorOptions.appendChild(colorOption);
    });
    
    // ব্যান্ড সিলেক্ট ইভেন্ট
    const bandDisplays = document.querySelectorAll('.color-display');
    bandDisplays.forEach(display => {
        display.addEventListener('click', function() {
            // সকল এক্টিভ ক্লাস সরান
            bandDisplays.forEach(d => d.classList.remove('active'));
            // বর্তমান ব্যান্ড সিলেক্ট করুন
            this.classList.add('active');
        });
    });
    
    updateColorSelectionDisplay();
}

function updateColorSelectionDisplay() {
    for (let i = 1; i <= 6; i++) {
        const display = document.getElementById(`band${i}Display`);
        const name = document.getElementById(`band${i}Name`);
        
        if (display && name && selectedColors[i]) {
            const color = selectedColors[i];
            const info = colorMap[color];
            display.style.backgroundColor = info.hex;
            display.style.borderColor = info.hex;
            name.textContent = info.name;
        }
    }
}

function calculateFromColors() {
    const bandCount = parseInt(document.querySelector('input[name="bandType"]:checked').value);
    const colors = [];
    
    // নির্বাচিত কালার সংগ্রহ করুন
    for (let i = 1; i <= bandCount; i++) {
        colors.push(selectedColors[i]);
    }
    
    // মান ক্যালকুলেশন
    const result = calculateValueFromColors(colors, bandCount);
    displayColorResult(result);
}

function calculateValueFromColors(colors, bandCount) {
    let value = 0;
    let tolerance = 5; // ডিফল্ট
    let tempCoeff = null;
    
    if (bandCount === 4) {
        // 4-ব্যান্ড: digit1, digit2, multiplier, tolerance
        const digit1 = colorData[colors[0]].digit;
        const digit2 = colorData[colors[1]].digit;
        const multiplier = colorData[colors[2]].multiplier;
        tolerance = colorData[colors[3]].tolerance || 5;
        
        value = ((digit1 * 10) + digit2) * multiplier;
    } else if (bandCount === 5) {
        // 5-ব্যান্ড: digit1, digit2, digit3, multiplier, tolerance
        const digit1 = colorData[colors[0]].digit;
        const digit2 = colorData[colors[1]].digit;
        const digit3 = colorData[colors[2]].digit;
        const multiplier = colorData[colors[3]].multiplier;
        tolerance = colorData[colors[4]].tolerance || 5;
        
        value = ((digit1 * 100) + (digit2 * 10) + digit3) * multiplier;
    } else if (bandCount === 6) {
        // 6-ব্যান্ড: digit1, digit2, digit3, multiplier, tolerance, tempCoeff
        const digit1 = colorData[colors[0]].digit;
        const digit2 = colorData[colors[1]].digit;
        const digit3 = colorData[colors[2]].digit;
        const multiplier = colorData[colors[3]].multiplier;
        tolerance = colorData[colors[4]].tolerance || 5;
        tempCoeff = colorData[colors[5]].tempCoeff;
        
        value = ((digit1 * 100) + (digit2 * 10) + digit3) * multiplier;
    }
    
    return { value, tolerance, tempCoeff, colors };
}

function displayColorResult(result) {
    const resultBox = document.getElementById('colorResultBox');
    if (!resultBox) return;
    
    const { value, tolerance, tempCoeff, colors } = result;
    
    let resultHTML = `
        <h4><i class="fas fa-check-circle"></i> ক্যালকুলেশন ফলাফল</h4>
        <div class="result-summary">
            <div class="result-item">
                <span class="result-label">মান:</span>
                <span class="result-value">${formatResistance(value)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">টলারেন্স:</span>
                <span class="result-value">±${tolerance}%</span>
            </div>
    `;
    
    if (tempCoeff) {
        resultHTML += `
            <div class="result-item">
                <span class="result-label">তাপমাত্রা সহগ:</span>
                <span class="result-value">${tempCoeff} ppm/K</span>
            </div>
        `;
    }
    
    resultHTML += `
            <div class="result-item">
                <span class="result-label">কালার কোড:</span>
                <div class="color-code-display">
    `;
    
    colors.forEach(color => {
        const info = colorMap[color];
        resultHTML += `
            <span class="result-color" style="background-color: ${info.hex}; color: ${info.textColor}">
                ${info.name}
            </span>
        `;
    });
    
    resultHTML += `
                </div>
            </div>
            <div class="result-item">
                <span class="result-label">রেঞ্জ:</span>
                <span class="result-value">
                    ${formatResistance(value * (1 - tolerance/100))} - 
                    ${formatResistance(value * (1 + tolerance/100))}
                </span>
            </div>
        </div>
    `;
    
    resultBox.innerHTML = resultHTML;
}

// ইউটিলিটি ফাংশন
function formatMultiplier(multiplier) {
    if (multiplier === 0.01) return '×0.01';
    if (multiplier === 0.1) return '×0.1';
    if (multiplier < 1) return `×${multiplier}`;
    if (multiplier === 1) return '×1';
    
    const exponent = Math.log10(multiplier);
    return `×10^${exponent}`;
}

function formatResistance(resistance) {
    if (resistance >= 1000000) {
        return `${(resistance / 1000000).toFixed(3)} MΩ`;
    } else if (resistance >= 1000) {
        return `${(resistance / 1000).toFixed(3)} kΩ`;
    } else {
        return `${resistance.toFixed(2)} Ω`;
    }
}

function getESeries(value) {
    // E12 সিরিজ মান
    const e12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
    
    // মানকে E12 সিরিজের কাছাকাছি বৃত্তাকার করুন
    let exponent = Math.floor(Math.log10(value));
    let mantissa = value / Math.pow(10, exponent);
    
    let closest = e12[0];
    let minDiff = Math.abs(mantissa - (e12[0] / 10));
    
    for (const num of e12) {
        const normalized = num / 10;
        const diff = Math.abs(mantissa - normalized);
        if (diff < minDiff) {
            minDiff = diff;
            closest = num;
        }
    }
    
    const roundedValue = closest * Math.pow(10, exponent - 1);
    
    // মূল মানের সাথে তুলনা করুন
    const tolerance = Math.abs(value - roundedValue) / value * 100;
    
    if (tolerance < 5) {
        return 'E12';
    } else if (tolerance < 10) {
        return 'E6';
    } else {
        return 'E3';
    }
}

// ইভেন্ট লিসেনারস
document.getElementById('calculateColors')?.addEventListener('click', calculateFromValue);
document.getElementById('calculateFromColors')?.addEventListener('click', calculateFromColors);
document.getElementById('printBtn')?.addEventListener('click', () => window.print());

// ইনপুট পরিবর্তনে স্বয়ংক্রিয়ভাবে ক্যালকুলেশন
document.getElementById('resistanceValue')?.addEventListener('input', calculateFromValue);
document.getElementById('resistanceUnit')?.addEventListener('change', calculateFromValue);
document.getElementById('tolerance')?.addEventListener('change', calculateFromValue);
document.querySelectorAll('input[name="bandType"]').forEach(radio => {
    radio.addEventListener('change', calculateFromValue);
});

// CSS ইনজেকশন
const rccStyles = `
.color-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
}

.result-summary {
    display: grid;
    gap: 15px;
    margin-top: 20px;
}

.result-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px 0;
    border-bottom: 1px solid #e2e8f0;
}

.result-item:last-child {
    border-bottom: none;
}

.result-label {
    font-weight: 600;
    color: #475569;
    min-width: 150px;
}

.result-value {
    font-weight: 700;
    color: #1e293b;
}

.color-code-display {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.result-color {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    border: 2px solid white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.color-display.active {
    box-shadow: 0 0 0 3px #667eea, 0 5px 15px rgba(102, 126, 234, 0.5);
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rccStyles;
document.head.appendChild(styleSheet);

// গ্লোবাল এক্সপোজ
window.RCCalculator = {
    calculateFromValue,
    calculateFromColors,
    updateColorSelectionDisplay
};