// কোড এডিটর সিস্টেম

// গ্লোবাল ভ্যারিয়েবলস
let codeEditor;
let currentLanguage = 'python';
let currentTheme = 'default';
let fontSize = 14;
let files = [];
let currentFile = 'main.py';
let isConnected = false;
let serialPort = null;
let simulationActive = false;

// প্রি-লোডেড কোড টেমপ্লেট
const codeTemplates = {
    python: `# Python কোড এখানে লিখুন
print("Hello, EE Hub!")

# GPIO সিমুলেশন
import time

def blink_led(pin, duration):
    for i in range(5):
        print(f"LED {pin}: ON")
        time.sleep(duration)
        print(f"LED {pin}: OFF")
        time.sleep(duration)

# ফাংশন কল
blink_led(13, 0.5)

# গণিত অপারেশন
def calculate_resistance(voltage, current):
    resistance = voltage / current
    return resistance

v = 5.0  # ভোল্ট
i = 0.02  # অ্যাম্পিয়ার
r = calculate_resistance(v, i)
print(f"রেজিস্ট্যান্স: {r} Ω")`,

    arduino: `// Arduino কোড
void setup() {
  // সিরিয়াল কমিউনিকেশন শুরু করুন
  Serial.begin(9600);
  
  // পিন মোড সেট করুন
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(2, INPUT_PULLUP);
  
  Serial.println("Arduino প্রস্তুত!");
}

void loop() {
  // LED ব্লিংক
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
  
  // বাটন রিড
  int buttonState = digitalRead(2);
  Serial.print("বাটন স্টেট: ");
  Serial.println(buttonState);
  
  // অ্যানালগ রিড
  int sensorValue = analogRead(A0);
  float voltage = sensorValue * (5.0 / 1023.0);
  Serial.print("ভোল্টেজ: ");
  Serial.print(voltage);
  Serial.println("V");
}`,

    c: `// C প্রোগ্রামিং
#include <stdio.h>
#include <math.h>

// ইলেকট্রিক্যাল ক্যালকুলেশন
float calculate_power(float voltage, float current) {
    return voltage * current;
}

float calculate_energy(float power, float time) {
    return power * time;
}

int main() {
    printf("ইলেকট্রিক্যাল ক্যালকুলেটর\\n");
    
    float v = 220.0;  // ভোল্ট
    float i = 5.0;    // অ্যাম্পিয়ার
    float t = 2.0;    // ঘন্টা
    
    float power = calculate_power(v, i);
    float energy = calculate_energy(power, t);
    
    printf("পাওয়ার: %.2f W\\n", power);
    printf("এনার্জি: %.2f Wh\\n", energy);
    
    return 0;
}`,

    javascript: `// JavaScript কোড
// ইলেকট্রনিক্স ক্যালকুলেশন ফাংশন
class ElectronicsCalculator {
    // ওহমের সূত্র
    static calculateVoltage(current, resistance) {
        return current * resistance;
    }
    
    static calculateCurrent(voltage, resistance) {
        return voltage / resistance;
    }
    
    static calculateResistance(voltage, current) {
        return voltage / current;
    }
    
    // পাওয়ার ক্যালকুলেশন
    static calculatePower(voltage, current) {
        return voltage * current;
    }
    
    // ক্যাপাসিটর চার্জ টাইম
    static calculateChargeTime(resistance, capacitance) {
        return 5 * resistance * capacitance; // 5RC
    }
}

// উদাহরণ ব্যবহার
console.log("ইলেকট্রনিক্স ক্যালকুলেটর");

const voltage = 12;
const current = 0.5;
const resistance = ElectronicsCalculator.calculateResistance(voltage, current);

console.log(\`ভোল্টেজ: \${voltage}V\`);
console.log(\`কারেন্ট: \${current}A\`);
console.log(\`রেজিস্ট্যান্স: \${resistance.toFixed(2)}Ω\`);

const power = ElectronicsCalculator.calculatePower(voltage, current);
console.log(\`পাওয়ার: \${power}W\`);`
};

// কোড সাজেশন
const codeSuggestions = {
    python: [
        {
            title: "LED ব্লিংক",
            code: `import time

def blink_led(pin, times, delay):
    for i in range(times):
        print(f"LED {pin} ON")
        time.sleep(delay)
        print(f"LED {pin} OFF")
        time.sleep(delay)

# ব্যবহার
blink_led(13, 10, 0.5)`
        },
        {
            title: "সেন্সর রিডিং",
            code: `import random
import time

class Sensor:
    def __init__(self, pin):
        self.pin = pin
    
    def read_temperature(self):
        # সিমুলেটেড টেম্পারেচার
        return random.uniform(20.0, 30.0)
    
    def read_humidity(self):
        # সিমুলেটেড হিউমিডিটি
        return random.uniform(40.0, 80.0)

# ব্যবহার
sensor = Sensor(A0)
temp = sensor.read_temperature()
humidity = sensor.read_humidity()
print(f"তাপমাত্রা: {temp:.1f}°C")
print(f"আর্দ্রতা: {humidity:.1f}%")`
        },
        {
            title: "সিরিয়াল কমিউনিকেশন",
            code: `import serial
import time

class SerialCommunication:
    def __init__(self, port, baudrate=9600):
        self.serial = serial.Serial(port, baudrate)
        time.sleep(2)  # কানেকশন সেটেল হওয়ার জন্য
    
    def send(self, data):
        self.serial.write(data.encode())
    
    def receive(self):
        if self.serial.in_waiting > 0:
            return self.serial.readline().decode().strip()
        return None
    
    def close(self):
        self.serial.close()

# ব্যবহার (Web Serial API এর জন্য ভিন্ন)`
        }
    ],
    arduino: [
        {
            title: "LED ব্লিংক",
            code: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`
        },
        {
            title: "সিরিয়াল মনিটর",
            code: `void setup() {
  Serial.begin(9600);
}

void loop() {
  // সেন্সর রিডিং পাঠান
  int sensorValue = analogRead(A0);
  float voltage = sensorValue * (5.0 / 1023.0);
  
  Serial.print("সেন্সর মান: ");
  Serial.print(sensorValue);
  Serial.print(", ভোল্টেজ: ");
  Serial.print(voltage);
  Serial.println("V");
  
  delay(1000);
}`
        },
        {
            title: "বাটন ইনপুট",
            code: `const int buttonPin = 2;
const int ledPin = 13;
int buttonState = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  
  if (buttonState == LOW) {
    digitalWrite(ledPin, HIGH);
    Serial.println("বাটন চাপা!");
  } else {
    digitalWrite(ledPin, LOW);
  }
  
  delay(50);
}`
        },
        {
            title: "PWM LED ডিমিং",
            code: `const int ledPin = 9;
int brightness = 0;
int fadeAmount = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, brightness);
  
  brightness = brightness + fadeAmount;
  
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }
  
  delay(30);
}`
        }
    ]
};

// ইনিশিয়ালাইজেশন
document.addEventListener('DOMContentLoaded', function() {
    initializeCodeEditor();
    initializeEventListeners();
    initializeFileSystem();
    initializeSuggestions();
    initializeRecentCodes();
    initializeSimulation();
    
    // ডিফল্ট কোড লোড করুন
    loadTemplateCode();
});

// কোড এডিটর ইনিশিয়ালাইজ
function initializeCodeEditor() {
    // CodeMirror ইনিশিয়ালাইজ
    codeEditor = CodeMirror(document.getElementById('codeEditor'), {
        value: codeTemplates.python,
        mode: 'python',
        theme: 'default',
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        electricChars: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Ctrl-/": "toggleComment",
            "Ctrl-S": function() { saveFile(); },
            "Ctrl-R": function() { runCode(); },
            "Ctrl-F": function() { formatCode(); },
            "Tab": "indentMore",
            "Shift-Tab": "indentLess"
        },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        hintOptions: {
            completeSingle: false,
            alignWithWord: true
        }
    });
    
    // এডিটর ইভেন্টস
    codeEditor.on('cursorActivity', updateCursorPosition);
    codeEditor.on('change', updateFileSize);
    codeEditor.on('change', debounce(checkSyntax, 1000));
    
    // প্রাথমিক আপডেট
    updateCursorPosition();
    updateFileSize();
}

// ইভেন্ট লিসেনার ইনিশিয়ালাইজ
function initializeEventListeners() {
    // ভাষা সিলেক্টর
    document.getElementById('languageSelect').addEventListener('change', function() {
        currentLanguage = this.value;
        updateEditorMode();
        updateBoardOptions();
        loadTemplateCode();
    });
    
    // বোর্ড সিলেক্টর
    document.getElementById('boardSelect').addEventListener('change', updateBoardInfo);
    
    // থিম সিলেক্টর
    document.getElementById('themeSelect').addEventListener('change', function() {
        currentTheme = this.value;
        updateEditorTheme();
    });
    
    // ফন্ট সাইজ কন্ট্রোল
    document.getElementById('fontIncrease').addEventListener('click', () => changeFontSize(1));
    document.getElementById('fontDecrease').addEventListener('click', () => changeFontSize(-1));
    
    // এডিটর অপশনস
    document.getElementById('lineNumbers').addEventListener('change', function() {
        codeEditor.setOption('lineNumbers', this.checked);
    });
    
    document.getElementById('autoComplete').addEventListener('change', function() {
        // অটো কমপ্লিট টগল
    });
    
    document.getElementById('syntaxHighlighting').addEventListener('change', function() {
        // সিনট্যাক্স হাইলাইট টগল
    });
    
    document.getElementById('wordWrap').addEventListener('change', function() {
        codeEditor.setOption('lineWrapping', this.checked);
    });
    
    // টুলবার বাটনস
    document.getElementById('saveBtn').addEventListener('click', saveFile);
    document.getElementById('runBtn').addEventListener('click', runCode);
    document.getElementById('compileBtn').addEventListener('click', compileCode);
    document.getElementById('uploadBtn').addEventListener('click', uploadCode);
    document.getElementById('serialBtn').addEventListener('click', toggleSerialMonitor);
    document.getElementById('formatBtn').addEventListener('click', formatCode);
    document.getElementById('undoBtn').addEventListener('click', () => codeEditor.undo());
    document.getElementById('redoBtn').addEventListener('click', () => codeEditor.redo());
    
    // আউটপুট ট্যাবস
    document.querySelectorAll('.output-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const outputType = this.getAttribute('data-output');
            switchOutputTab(outputType);
        });
    });
    
    // আউটপুট অ্যাকশনস
    document.getElementById('clearOutputBtn').addEventListener('click', clearOutput);
    document.getElementById('copyOutputBtn').addEventListener('click', copyOutput);
    
    // সিরিয়াল কন্ট্রোলস
    document.getElementById('connectSerialBtn').addEventListener('click', connectSerial);
    document.getElementById('disconnectSerialBtn').addEventListener('click', disconnectSerial);
    document.getElementById('sendSerialBtn').addEventListener('click', sendSerialMessage);
    
    // সিরিয়াল ইনপুটে এন্টার প্রেস
    document.getElementById('serialInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendSerialMessage();
        }
    });
    
    // সিমুলেশন কন্ট্রোলস
    document.getElementById('startSimulationBtn').addEventListener('click', startSimulation);
    document.getElementById('resetSimulationBtn').addEventListener('click', resetSimulation);
    
    // ফাইল অ্যাকশনস
    document.getElementById('newFileBtn').addEventListener('click', showNewFileModal);
    document.getElementById('uploadFileBtn').addEventListener('click', uploadFile);
    
    // কুইক অ্যাকশন বাটনস
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            insertQuickCode(action);
        });
    });
    
    // ফুটার অ্যাকশনস
    document.getElementById('exportBtn').addEventListener('click', exportCode);
    document.getElementById('shareBtn').addEventListener('click', shareCode);
    
    // মডাল কন্ট্রোলস
    document.querySelectorAll('.modal-close, #cancelBtn').forEach(btn => {
        btn.addEventListener('click', hideModal);
    });
    
    document.getElementById('createFileBtn').addEventListener('click', createNewFile);
    
    // মডাল ব্যাকগ্রাউন্ড ক্লিক
    document.getElementById('fileModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideModal();
        }
    });
}

// ফাইল সিস্টেম ইনিশিয়ালাইজ
function initializeFileSystem() {
    // ডিফল্ট ফাইলস
    files = [
        { name: 'main.py', content: codeTemplates.python, language: 'python' },
        { name: 'arduino.ino', content: codeTemplates.arduino, language: 'arduino' },
        { name: 'circuit.c', content: codeTemplates.c, language: 'c' }
    ];
    
    updateFileExplorer();
    updateFileTabs();
}

// কোড সাজেশন ইনিশিয়ালাইজ
function initializeSuggestions() {
    const suggestionsList = document.getElementById('suggestionsList');
    if (!suggestionsList) return;
    
    updateSuggestions();
}

// সম্প্রতিক কোড ইনিশিয়ালাইজ
function initializeRecentCodes() {
    const recentCodes = document.getElementById('recentCodes');
    if (!recentCodes) return;
    
    loadRecentCodes();
}

// সিমুলেশন ইনিশিয়ালাইজ
function initializeSimulation() {
    // প্রাথমিক স্টেট
    updateSimulationBoard();
}

// হেল্পার ফাংশনস
function updateEditorMode() {
    let mode;
    switch(currentLanguage) {
        case 'python':
            mode = 'python';
            break;
        case 'arduino':
        case 'c':
        case 'cpp':
            mode = 'text/x-c++src';
            break;
        case 'javascript':
            mode = 'javascript';
            break;
        default:
            mode = 'python';
    }
    
    codeEditor.setOption('mode', mode);
    document.getElementById('languageIndicator').textContent = 
        currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1);
}

function updateEditorTheme() {
    const theme = currentTheme === 'default' ? 'default' : currentTheme;
    codeEditor.setOption('theme', theme);
}

function changeFontSize(delta) {
    fontSize = Math.max(10, Math.min(24, fontSize + delta));
    codeEditor.getWrapperElement().style.fontSize = fontSize + 'px';
    document.getElementById('fontSizeDisplay').textContent = fontSize + 'px';
}

function updateCursorPosition() {
    const cursor = codeEditor.getCursor();
    document.getElementById('cursorPosition').textContent = 
        `Ln ${cursor.line + 1}, Col ${cursor.ch + 1}`;
}

function updateFileSize() {
    const content = codeEditor.getValue();
    const size = new Blob([content]).size;
    const sizeText = size < 1024 ? `${size} bytes` : `${(size/1024).toFixed(1)} KB`;
    document.getElementById('fileSize').textContent = sizeText;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function checkSyntax() {
    const code = codeEditor.getValue();
    const problems = [];
    
    // বেসিক সিনট্যাক্স চেক (ডেমো)
    if (currentLanguage === 'python') {
        // Python সিনট্যাক্স চেক
        const lines = code.split('\n');
        lines.forEach((line, index) => {
            // ইন্ডেন্টেশন চেক
            if (line.trim().startsWith('def ') || line.trim().startsWith('class ') || line.trim().startsWith('if ') || 
                line.trim().startsWith('for ') || line.trim().startsWith('while ')) {
                const nextLine = lines[index + 1];
                if (nextLine && !nextLine.startsWith('    ') && nextLine.trim() !== '') {
                    problems.push({
                        type: 'warning',
                        title: 'ইন্ডেন্টেশন প্রয়োজন',
                        description: 'ফাংশন/ক্লাস/লুপের পর ইন্ডেন্টেশন প্রয়োজন',
                        line: index + 2
                    });
                }
            }
        });
    } else if (currentLanguage === 'arduino' || currentLanguage === 'c' || currentLanguage === 'cpp') {
        // C/C++ সিনট্যাক্স চেক
        if (!code.includes('void setup()') && currentLanguage === 'arduino') {
            problems.push({
                type: 'error',
                title: 'setup() ফাংশন নেই',
                description: 'Arduino কোডে setup() ফাংশন প্রয়োজন',
                line: 1
            });
        }
        
        // সেমিকোলন চেক
        const lines = code.split('\n');
        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*') && 
                !trimmed.endsWith(';') && !trimmed.endsWith('{') && 
                !trimmed.endsWith('}') && !trimmed.includes('#include') &&
                !trimmed.startsWith('void ') && !trimmed.startsWith('int ') &&
                !trimmed.startsWith('float ') && !trimmed.startsWith('const ')) {
                problems.push({
                    type: 'warning',
                    title: 'সম্ভাব্য সিনট্যাক্স ত্রুটি',
                    description: 'সেমিকোলন বা সঠিক সিনট্যাক্স প্রয়োজন',
                    line: index + 1
                });
            }
        });
    }
    
    updateProblemsList(problems);
}

function updateProblemsList(problems) {
    const problemsList = document.getElementById('problemsList');
    if (!problemsList) return;
    
    problemsList.innerHTML = '';
    
    if (problems.length === 0) {
        problemsList.innerHTML = `
            <div class="no-problems">
                <i class="fas fa-check-circle"></i>
                <p>কোন সমস্যা পাওয়া যায়নি</p>
            </div>
        `;
        return;
    }
    
    problems.forEach(problem => {
        const problemItem = document.createElement('div');
        problemItem.className = 'problem-item';
        
        const iconClass = problem.type === 'error' ? 'fas fa-times-circle' : 
                         problem.type === 'warning' ? 'fas fa-exclamation-triangle' : 
                         'fas fa-info-circle';
        
        problemItem.innerHTML = `
            <div class="problem-icon ${problem.type}">
                <i class="${iconClass}"></i>
            </div>
            <div class="problem-content">
                <div class="problem-title">${problem.title}</div>
                <div class="problem-description">${problem.description}</div>
                <div class="problem-location">লাইন: ${problem.line}</div>
            </div>
        `;
        
        problemItem.addEventListener('click', () => {
            codeEditor.setCursor({line: problem.line - 1, ch: 0});
            codeEditor.focus();
        });
        
        problemsList.appendChild(problemItem);
    });
}

function updateBoardOptions() {
    const boardSelect = document.getElementById('boardSelect');
    
    // ভাষা অনুযায়ী বোর্ড অপশন আপডেট
    if (currentLanguage === 'arduino') {
        boardSelect.innerHTML = `
            <option value="arduino-uno">Arduino UNO</option>
            <option value="arduino-nano">Arduino Nano</option>
            <option value="arduino-mega">Arduino Mega</option>
            <option value="esp32">ESP32</option>
            <option value="esp8266">ESP8266</option>
        `;
    } else if (currentLanguage === 'python') {
        boardSelect.innerHTML = `
            <option value="raspberry-pi">Raspberry Pi</option>
            <option value="pc">PC/ল্যাপটপ</option>
            <option value="micro-python">MicroPython ডিভাইস</option>
        `;
    } else {
        boardSelect.innerHTML = `
            <option value="pc">PC/ল্যাপটপ</option>
            <option value="embedded">এম্বেডেড সিস্টেম</option>
        `;
    }
    
    updateBoardInfo();
}

function updateBoardInfo() {
    const boardSelect = document.getElementById('boardSelect');
    const boardInfo = document.getElementById('boardInfo');
    
    if (boardSelect && boardInfo) {
        const selectedOption = boardSelect.options[boardSelect.selectedIndex];
        boardInfo.textContent = selectedOption.text;
    }
}

function loadTemplateCode() {
    const template = codeTemplates[currentLanguage] || codeTemplates.python;
    codeEditor.setValue(template);
    updateFileSize();
    checkSyntax();
}

function updateFileExplorer() {
    const fileExplorer = document.getElementById('fileExplorer');
    if (!fileExplorer) return;
    
    fileExplorer.innerHTML = '';
    
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = `file-item ${file.name === currentFile ? 'active' : ''}`;
        
        const icon = getFileIcon(file.name);
        
        fileItem.innerHTML = `
            <div class="file-icon">
                <i class="${icon}"></i>
            </div>
            <div class="file-name">${file.name}</div>
        `;
        
        fileItem.addEventListener('click', () => {
            switchFile(file.name);
        });
        
        fileExplorer.appendChild(fileItem);
    });
}

function getFileIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    
    switch(extension) {
        case 'py': return 'fab fa-python';
        case 'ino': return 'fas fa-microchip';
        case 'c': return 'fas fa-c';
        case 'cpp': return 'fas fa-c';
        case 'js': return 'fab fa-js';
        case 'html': return 'fab fa-html5';
        case 'css': return 'fab fa-css3';
        default: return 'fas fa-file-code';
    }
}

function updateFileTabs() {
    const fileTabs = document.getElementById('fileTabs');
    if (!fileTabs) return;
    
    fileTabs.innerHTML = '';
    
    files.forEach(file => {
        const tab = document.createElement('div');
        tab.className = `file-tab ${file.name === currentFile ? 'active' : ''}`;
        tab.setAttribute('data-file', file.name);
        
        tab.innerHTML = `
            <span>${file.name}</span>
            <button class="tab-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        tab.addEventListener('click', (e) => {
            if (!e.target.closest('.tab-close')) {
                switchFile(file.name);
            }
        });
        
        const closeBtn = tab.querySelector('.tab-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeFile(file.name);
        });
        
        fileTabs.appendChild(tab);
    });
}

function switchFile(filename) {
    const file = files.find(f => f.name === filename);
    if (!file) return;
    
    currentFile = filename;
    
    // বর্তমান ফাইল সেভ করুন
    saveCurrentFile();
    
    // নতুন ফাইল লোড করুন
    codeEditor.setValue(file.content);
    currentLanguage = file.language;
    
    // UI আপডেট করুন
    updateFileExplorer();
    updateFileTabs();
    updateEditorMode();
    updateFileSize();
    checkSyntax();
}

function saveCurrentFile() {
    const file = files.find(f => f.name === currentFile);
    if (file) {
        file.content = codeEditor.getValue();
        file.language = currentLanguage;
    }
}

function saveFile() {
    saveCurrentFile();
    showNotification('ফাইল সংরক্ষণ করা হয়েছে', 'success');
    
    // সম্প্রতিক কোডে যোগ করুন
    addToRecentCodes();
}

function addToRecentCodes() {
    const code = codeEditor.getValue();
    const recentCode = {
        title: currentFile,
        language: currentLanguage,
        code: code.substring(0, 100) + (code.length > 100 ? '...' : ''),
        timestamp: new Date().toISOString()
    };
    
    let recentCodes = JSON.parse(localStorage.getItem('recentCodes')) || [];
    recentCodes = recentCodes.filter(rc => rc.title !== currentFile);
    recentCodes.unshift(recentCode);
    recentCodes = recentCodes.slice(0, 10); // সর্বোচ্চ ১০টি রাখুন
    
    localStorage.setItem('recentCodes', JSON.stringify(recentCodes));
    loadRecentCodes();
}

function loadRecentCodes() {
    const recentCodesContainer = document.getElementById('recentCodes');
    if (!recentCodesContainer) return;
    
    const recentCodes = JSON.parse(localStorage.getItem('recentCodes')) || [];
    
    recentCodesContainer.innerHTML = '';
    
    if (recentCodes.length === 0) {
        recentCodesContainer.innerHTML = `
            <div class="no-recent">
                <i class="fas fa-history"></i>
                <p>কোন সম্প্রতিক কোড নেই</p>
            </div>
        `;
        return;
    }
    
    recentCodes.forEach(rc => {
        const item = document.createElement('div');
        item.className = 'recent-code-item';
        
        item.innerHTML = `
            <div class="recent-code-title">${rc.title}</div>
            <div class="recent-code-language">${rc.language.toUpperCase()}</div>
            <div class="recent-code-preview">${rc.code}</div>
        `;
        
        item.addEventListener('click', () => {
            // এই কোড লোড করুন
            const file = files.find(f => f.name === rc.title);
            if (file) {
                switchFile(rc.title);
            } else {
                // নতুন ফাইল তৈরি করুন
                files.push({
                    name: rc.title,
                    content: rc.code,
                    language: rc.language
                });
                switchFile(rc.title);
            }
        });
        
        recentCodesContainer.appendChild(item);
    });
}

// কোড রান ফাংশন (দ্বিতীয় অংশ)
function runCode() {
    const code = codeEditor.getValue();
    const outputText = document.getElementById('outputText');
    
    // আউটপুট ট্যাব সক্রিয় করুন
    switchOutputTab('output');
    
    // লোডিং মেসেজ দেখান
    outputText.innerHTML = `
        <div class="output-line info">
            <i class="fas fa-spinner fa-spin"></i>
            কোড রান হচ্ছে...
        </div>
    `;
    
    // Python কোডের জন্য Pyodide ব্যবহার (বা সিমুলেশন)
    if (currentLanguage === 'python') {
        runPythonCode(code);
    } else if (currentLanguage === 'arduino' || currentLanguage === 'c' || currentLanguage === 'cpp') {
        // Arduino/C কোড সিমুলেশন
        simulateArduinoCode(code);
    } else if (currentLanguage === 'javascript') {
        // JavaScript কোড রান
        runJavaScriptCode(code);
    }
}

function runPythonCode(code) {
    const outputText = document.getElementById('outputText');
    
    try {
        // Python কোড সিমুলেশন (প্রোডাকশনে Pyodide ব্যবহার করুন)
        const simulatedOutput = simulatePythonExecution(code);
        
        outputText.innerHTML = `
            <div class="output-line success">
                <i class="fas fa-check-circle"></i>
                কোড সফলভাবে রান হয়েছে
            </div>
            <div class="output-line">
                <pre>${simulatedOutput}</pre>
            </div>
        `;
    } catch (error) {
        outputText.innerHTML = `
            <div class="output-line error">
                <i class="fas fa-times-circle"></i>
                ত্রুটি: ${error.message}
            </div>
            <div class="output-line">
                <pre>${error.stack}</pre>
            </div>
        `;
    }
}

function simulatePythonExecution(code) {
    // Python কোড সিমুলেশন (বেসিক)
    let output = '';
    
    // print() স্টেটমেন্টস প্রসেস
    const lines = code.split('\n');
    
    lines.forEach(line => {
        if (line.includes('print(')) {
            // print() কল এক্সট্র্যাক্ট
            const match = line.match(/print\((.*)\)/);
            if (match) {
                const content = match[1];
                // কোটেশন সরান
                const cleaned = content.replace(/['"]/g, '');
                output += cleaned + '\n';
            }
        }
        
        // ফাংশন ডেফিনিশন সিমুলেশন
        if (line.trim().startsWith('def ')) {
            const funcName = line.match(/def (\w+)/)[1];
            output += `ফাংশন ${funcName} ডিফাইন করা হয়েছে\n`;
        }
        
        // ফাংশন কল সিমুলেশন
        if (line.includes('(') && line.includes(')') && !line.includes('def ') && !line.includes('print(')) {
            const match = line.match(/(\w+)\(/);
            if (match) {
                output += `ফাংশন ${match[1]} কল করা হয়েছে\n`;
            }
        }
    });
    
    // গণনার রেজাল্ট যোগ করুন
    if (code.includes('calculate_resistance') || code.includes('calculate_power')) {
        output += '\n--- গণনার ফলাফল ---\n';
        
        if (code.includes('calculate_resistance')) {
            const voltageMatch = code.match(/v\s*=\s*([\d.]+)/i);
            const currentMatch = code.match(/i\s*=\s*([\d.]+)/i);
            
            if (voltageMatch && currentMatch) {
                const v = parseFloat(voltageMatch[1]);
                const i = parseFloat(currentMatch[1]);
                const r = v / i;
                output += `রেজিস্ট্যান্স: ${r.toFixed(2)} Ω\n`;
            }
        }
        
        if (code.includes('calculate_power')) {
            const voltageMatch = code.match(/v\s*=\s*([\d.]+)/i);
            const currentMatch = code.match(/i\s*=\s*([\d.]+)/i);
            
            if (voltageMatch && currentMatch) {
                const v = parseFloat(voltageMatch[1]);
                const i = parseFloat(currentMatch[1]);
                const p = v * i;
                output += `পাওয়ার: ${p.toFixed(2)} W\n`;
            }
        }
    }
    
    return output || "কোড রান সম্পন্ন, কিন্তু কোনো আউটপুট নেই";
}

function simulateArduinoCode(code) {
    const outputText = document.getElementById('outputText');
    let output = '';
    
    // Arduino কোড সিমুলেশন
    if (code.includes('Serial.begin')) {
        output += "সিরিয়াল কমিউনিকেশন শুরু হয়েছে (9600 baud)\n";
    }
    
    if (code.includes('Serial.print') || code.includes('Serial.println')) {
        // সিরিয়াল প্রিন্ট স্টেটমেন্টস প্রসেস
        const lines = code.split('\n');
        
        lines.forEach(line => {
            if (line.includes('Serial.print') || line.includes('Serial.println')) {
                // টেক্সট এক্সট্র্যাক্ট
                const match = line.match(/Serial\.(?:print|println)\((.*)\)/);
                if (match) {
                    let content = match[1];
                    
                    // ভেরিয়েবল রিপ্লেসমেন্ট সিমুলেশন
                    if (content.includes('"')) {
                        // স্ট্রিং লিটারাল
                        content = content.replace(/"/g, '');
                    } else if (content.includes('buttonState')) {
                        content = 'বাটন স্টেট: 1';
                    } else if (content.includes('sensorValue')) {
                        content = 'সেন্সর মান: 512';
                    } else if (content.includes('voltage')) {
                        content = 'ভোল্টেজ: 2.5V';
                    }
                    
                    output += content + (line.includes('println') ? '\n' : '');
                }
            }
        });
    }
    
    if (code.includes('digitalWrite(LED_BUILTIN')) {
        output += "\n--- LED স্টেট ---\n";
        if (code.includes('HIGH')) {
            output += "LED: ON\n";
        }
        if (code.includes('LOW')) {
            output += "LED: OFF\n";
        }
    }
    
    outputText.innerHTML = `
        <div class="output-line success">
            <i class="fas fa-microchip"></i>
            Arduino কোড সিমুলেশন সম্পন্ন
        </div>
        <div class="output-line">
            <pre>${output || "কোড সিমুলেশন সম্পন্ন, কিন্তু কোনো সিরিয়াল আউটপুট নেই"}</pre>
        </div>
    `;
    
    // LED সিমুলেশন আপডেট
    updateLEDSimulation(code);
}

function runJavaScriptCode(code) {
    const outputText = document.getElementById('outputText');
    
    try {
        // JavaScript কোড নিরাপদে রান
        const originalConsoleLog = console.log;
        let jsOutput = '';
        
        console.log = function(...args) {
            jsOutput += args.join(' ') + '\n';
            originalConsoleLog.apply(console, args);
        };
        
        // কোড রান
        eval(code);
        
        // console.log রিস্টোর
        console.log = originalConsoleLog;
        
        outputText.innerHTML = `
            <div class="output-line success">
                <i class="fab fa-js"></i>
                JavaScript কোড রান সম্পন্ন
            </div>
            <div class="output-line">
                <pre>${jsOutput || "কোড রান সম্পন্ন, কিন্তু কোনো কনসোল আউটপুট নেই"}</pre>
            </div>
        `;
    } catch (error) {
        outputText.innerHTML = `
            <div class="output-line error">
                <i class="fas fa-times-circle"></i>
                JavaScript ত্রুটি: ${error.message}
            </div>
            <div class="output-line">
                <pre>${error.stack}</pre>
            </div>
        `;
    }
}

function updateLEDSimulation(code) {
    const led13 = document.querySelector('.led-13');
    if (!led13) return;
    
    if (code.includes('digitalWrite(LED_BUILTIN, HIGH)')) {
        led13.style.background = '#22c55e';
        led13.style.boxShadow = '0 0 10px #22c55e';
    } else if (code.includes('digitalWrite(LED_BUILTIN, LOW)')) {
        led13.style.background = '#ef4444';
        led13.style.boxShadow = 'none';
    }
}

function compileCode() {
    const outputText = document.getElementById('outputText');
    switchOutputTab('output');
    
    outputText.innerHTML = `
        <div class="output-line info">
            <i class="fas fa-cogs fa-spin"></i>
            কোড কম্পাইল হচ্ছে...
        </div>
    `;
    
    // সিমুলেটেড কম্পাইলেশন
    setTimeout(() => {
        const code = codeEditor.getValue();
        let errors = [];
        
        // বেসিক সিনট্যাক্স চেক
        if (currentLanguage === 'arduino' || currentLanguage === 'c' || currentLanguage === 'cpp') {
            if (!code.includes('void setup()') && currentLanguage === 'arduino') {
                errors.push('setup() ফাংশন নেই');
            }
            if (!code.includes('void loop()') && currentLanguage === 'arduino') {
                errors.push('loop() ফাংশন নেই');
            }
            
            // ব্র্যাকেট চেক
            const openBraces = (code.match(/{/g) || []).length;
            const closeBraces = (code.match(/}/g) || []).length;
            if (openBraces !== closeBraces) {
                errors.push('ব্র্যাকেট মিলছে না');
            }
        }
        
        if (errors.length > 0) {
            outputText.innerHTML = `
                <div class="output-line error">
                    <i class="fas fa-times-circle"></i>
                    কম্পাইলেশন ব্যর্থ
                </div>
                ${errors.map(error => `
                    <div class="output-line error">
                        <i class="fas fa-times"></i> ${error}
                    </div>
                `).join('')}
            `;
        } else {
            outputText.innerHTML = `
                <div class="output-line success">
                    <i class="fas fa-check-circle"></i>
                    কম্পাইলেশন সফল!
                </div>
                <div class="output-line info">
                    <i class="fas fa-info-circle"></i>
                    বাইনারি সাইজ: ${Math.floor(code.length * 0.8)} bytes
                </div>
            `;
            
            document.getElementById('compilerStatus').textContent = 'কম্পাইলেশন সফল';
            document.getElementById('compilerStatus').style.color = '#10b981';
        }
    }, 1000);
}

// তৃতীয় অংশ আগামী বার দেব



// কোড আপলোড ফাংশন (Web Serial API)
async function uploadCode() {
    if (!('serial' in navigator)) {
        showNotification('ওয়েব সিরিয়াল API আপনার ব্রাউজারে সাপোর্ট করে না', 'error');
        return;
    }
    
    const outputText = document.getElementById('outputText');
    switchOutputTab('output');
    
    outputText.innerHTML = `
        <div class="output-line info">
            <i class="fas fa-spinner fa-spin"></i>
            আপলোড প্রস্তুত হচ্ছে...
        </div>
    `;
    
    try {
        // পোর্ট সিলেক্ট করুন
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        
        serialPort = port;
        isConnected = true;
        updateConnectionStatus();
        
        outputText.innerHTML += `
            <div class="output-line success">
                <i class="fas fa-plug"></i>
                ডিভাইসে কানেক্টেড: ${port.getInfo().usbProductId || 'Unknown'}
            </div>
        `;
        
        // Arduino কোড কম্পাইলেশন সিমুলেশন
        const code = codeEditor.getValue();
        const hexCode = simulateHexGeneration(code);
        
        outputText.innerHTML += `
            <div class="output-line info">
                <i class="fas fa-upload"></i>
                কোড আপলোড হচ্ছে...
            </div>
        `;
        
        // সিমুলেটেড আপলোড
        await simulateUpload(hexCode, port);
        
        outputText.innerHTML += `
            <div class="output-line success">
                <i class="fas fa-check-circle"></i>
                কোড সফলভাবে আপলোড হয়েছে!
            </div>
            <div class="output-line">
                <i class="fas fa-info-circle"></i>
                ডিভাইস রিসেট হচ্ছে...
            </div>
        `;
        
        // পোর্ট বন্ধ করুন
        await port.close();
        serialPort = null;
        isConnected = false;
        updateConnectionStatus();
        
    } catch (error) {
        outputText.innerHTML += `
            <div class="output-line error">
                <i class="fas fa-times-circle"></i>
                আপলোড ব্যর্থ: ${error.message}
            </div>
        `;
    }
}

function simulateHexGeneration(code) {
    // সিমুলেটেড হেক্স কোড জেনারেশন
    const lines = code.split('\n').length;
    const size = new Blob([code]).size;
    
    return {
        lines: lines,
        size: size,
        hex: `:10000000${Math.random().toString(16).substr(2, 32).toUpperCase()}`,
        checksum: Math.random().toString(16).substr(2, 2).toUpperCase()
    };
}

async function simulateUpload(hexCode, port) {
    // সিমুলেটেড আপলোড ডিলে
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 2000);
    });
}

// সিরিয়াল মনিটর ফাংশন
function toggleSerialMonitor() {
    switchOutputTab('serial');
    
    if (!isConnected) {
        // পোর্ট লিস্ট আপডেট করুন
        updateSerialPorts();
    }
}

async function connectSerial() {
    if (!('serial' in navigator)) {
        showNotification('ওয়েব সিরিয়াল API সাপোর্ট করে না', 'error');
        return;
    }
    
    try {
        const portSelect = document.getElementById('serialPortSelect');
        const baudRate = parseInt(document.getElementById('baudRate').value) || 9600;
        
        if (!portSelect.value) {
            // পোর্ট সিলেক্ট করুন
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: baudRate });
            
            serialPort = port;
            isConnected = true;
            updateConnectionStatus();
            
            // সিরিয়াল রিডিং শুরু করুন
            readSerialData(port);
            
            showNotification('সিরিয়াল পোর্টে কানেক্টেড', 'success');
        }
    } catch (error) {
        showNotification(`কানেকশন ব্যর্থ: ${error.message}`, 'error');
    }
}

function disconnectSerial() {
    if (serialPort) {
        serialPort.close();
        serialPort = null;
        isConnected = false;
        updateConnectionStatus();
        showNotification('সিরিয়াল পোর্ট ডিসকানেক্টেড', 'info');
    }
}

async function readSerialData(port) {
    const textDecoder = new TextDecoder();
    const reader = port.readable.getReader();
    
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            const text = textDecoder.decode(value);
            appendToSerialTerminal(text);
        }
    } catch (error) {
        console.error('সিরিয়াল রিডিং ত্রুটি:', error);
    } finally {
        reader.releaseLock();
    }
}

function appendToSerialTerminal(text) {
    const serialTerminal = document.getElementById('serialTerminal');
    if (!serialTerminal) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = 'serial-line';
    line.innerHTML = `<span class="serial-time">[${timestamp}]</span> ${text}`;
    
    serialTerminal.appendChild(line);
    serialTerminal.scrollTop = serialTerminal.scrollHeight;
}

function sendSerialMessage() {
    const input = document.getElementById('serialInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    if (serialPort && isConnected) {
        // মেসেজ সেন্ড করুন
        const textEncoder = new TextEncoder();
        const writer = serialPort.writable.getWriter();
        writer.write(textEncoder.encode(message + '\n'));
        writer.releaseLock();
        
        // টার্মিনালে দেখান
        appendToSerialTerminal(`>> ${message}`);
        input.value = '';
    } else {
        showNotification('সিরিয়াল পোর্টে কানেক্ট নয়', 'warning');
    }
}

function updateSerialPorts() {
    // সিমুলেটেড পোর্ট লিস্ট
    const portSelect = document.getElementById('serialPortSelect');
    portSelect.innerHTML = '<option value="">পোর্ট সিলেক্ট করুন</option>';
    
    const simulatedPorts = [
        { name: 'COM3', description: 'Arduino Uno' },
        { name: '/dev/ttyUSB0', description: 'USB Serial' },
        { name: 'COM4', description: 'ESP32' }
    ];
    
    simulatedPorts.forEach(port => {
        const option = document.createElement('option');
        option.value = port.name;
        option.textContent = `${port.name} - ${port.description}`;
        portSelect.appendChild(option);
    });
}

// আউটপুট ট্যাব ম্যানেজমেন্ট
function switchOutputTab(tabName) {
    // সকল ট্যাব নিষ্ক্রিয় করুন
    document.querySelectorAll('.output-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.output-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // নির্বাচিত ট্যাব সক্রিয় করুন
    const selectedTab = document.querySelector(`.output-tab[data-output="${tabName}"]`);
    const selectedPanel = document.getElementById(`${tabName}Panel`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedPanel) selectedPanel.classList.add('active');
}

function clearOutput() {
    const activePanel = document.querySelector('.output-panel.active');
    if (activePanel) {
        const outputArea = activePanel.querySelector('.output-text, .serial-terminal, .problems-list, .debug-console');
        if (outputArea) {
            outputArea.innerHTML = '';
            
            if (outputArea.id === 'outputText') {
                outputArea.innerHTML = `
                    <div class="output-welcome">
                        <i class="fas fa-code"></i>
                        <h3>কোড এডিটরে স্বাগতম</h3>
                        <p>কোড লিখুন এবং রান বাটনে ক্লিক করুন</p>
                    </div>
                `;
            }
        }
    }
}

function copyOutput() {
    const activePanel = document.querySelector('.output-panel.active');
    if (activePanel) {
        const outputArea = activePanel.querySelector('.output-text, .serial-terminal, .problems-list, .debug-console');
        if (outputArea) {
            const text = outputArea.textContent;
            navigator.clipboard.writeText(text)
                .then(() => showNotification('আউটপুট কপি করা হয়েছে', 'success'))
                .catch(() => showNotification('কপি করতে সমস্যা হয়েছে', 'error'));
        }
    }
}

// কোড ফরম্যাট
function formatCode() {
    const code = codeEditor.getValue();
    let formattedCode = code;
    
    if (currentLanguage === 'python') {
        formattedCode = formatPythonCode(code);
    } else if (currentLanguage === 'arduino' || currentLanguage === 'c' || currentLanguage === 'cpp') {
        formattedCode = formatCppCode(code);
    } else if (currentLanguage === 'javascript') {
        formattedCode = formatJavaScriptCode(code);
    }
    
    codeEditor.setValue(formattedCode);
    showNotification('কোড ফরম্যাট করা হয়েছে', 'success');
}

function formatPythonCode(code) {
    // বেসিক Python ফরম্যাটিং
    let formatted = '';
    let indentLevel = 0;
    const lines = code.split('\n');
    
    lines.forEach(line => {
        const trimmed = line.trim();
        
        // লেভেল কমানো
        if (trimmed.startsWith('return') || trimmed.startsWith('break') || 
            trimmed.startsWith('continue') || trimmed.startsWith('pass')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        // ইন্ডেন্ট যোগ
        formatted += '    '.repeat(indentLevel) + trimmed + '\n';
        
        // লেভেল বাড়ানো
        if (trimmed.endsWith(':') && !trimmed.startsWith('#')) {
            indentLevel++;
        }
    });
    
    return formatted;
}

function formatCppCode(code) {
    // বেসিক C++ ফরম্যাটিং
    let formatted = '';
    let indentLevel = 0;
    const lines = code.split('\n');
    
    lines.forEach(line => {
        const trimmed = line.trim();
        
        // লেভেল কমানো
        if (trimmed.startsWith('}') || trimmed.startsWith('};')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        // ইন্ডেন্ট যোগ
        formatted += '    '.repeat(indentLevel) + trimmed + '\n';
        
        // লেভেল বাড়ানো
        if (trimmed.endsWith('{') || trimmed.endsWith(':{')) {
            indentLevel++;
        }
    });
    
    return formatted;
}

function formatJavaScriptCode(code) {
    // Try to format using basic rules
    let formatted = code
        .replace(/\s*{\s*/g, ' {\n')
        .replace(/;\s*/g, ';\n')
        .replace(/,\s*/g, ', ')
        .replace(/\s*}\s*/g, '\n}\n');
    
    // Add basic indentation
    let indentLevel = 0;
    const lines = formatted.split('\n');
    formatted = '';
    
    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        if (trimmed.startsWith('}') || trimmed.startsWith(']')) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        formatted += '    '.repeat(indentLevel) + trimmed + '\n';
        
        if (trimmed.endsWith('{') || trimmed.endsWith('[')) {
            indentLevel++;
        }
    });
    
    return formatted;
}

// ফাইল ম্যানেজমেন্ট
function showNewFileModal() {
    document.getElementById('fileModal').classList.add('active');
    document.getElementById('fileName').focus();
}

function hideModal() {
    document.getElementById('fileModal').classList.remove('active');
    document.getElementById('fileName').value = '';
}

function createNewFile() {
    const fileName = document.getElementById('fileName').value.trim();
    const fileType = document.getElementById('fileType').value;
    
    if (!fileName) {
        showNotification('ফাইলের নাম দিন', 'warning');
        return;
    }
    
    // এক্সটেনশন যোগ করুন যদি না থাকে
    let fullName = fileName;
    if (!fileName.includes('.')) {
        const extensions = {
            python: '.py',
            arduino: '.ino',
            c: '.c',
            cpp: '.cpp',
            javascript: '.js',
            html: '.html'
        };
        fullName += extensions[fileType] || '.txt';
    }
    
    // ফাইল তৈরি করুন
    const newFile = {
        name: fullName,
        content: getTemplateForType(fileType),
        language: fileType
    };
    
    files.push(newFile);
    switchFile(fullName);
    
    hideModal();
    showNotification('নতুন ফাইল তৈরি করা হয়েছে', 'success');
}

function getTemplateForType(type) {
    const templates = {
        python: '# নতুন Python ফাইল\nprint("Hello, EE Hub!")\n',
        arduino: '// নতুন Arduino ফাইল\nvoid setup() {\n  // আপনার setup কোড\n}\n\nvoid loop() {\n  // আপনার main কোড\n}\n',
        c: '// নতুন C ফাইল\n#include <stdio.h>\n\nint main() {\n  printf("Hello, EE Hub!");\n  return 0;\n}\n',
        cpp: '// নতুন C++ ফাইল\n#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, EE Hub!" << endl;\n  return 0;\n}\n',
        javascript: '// নতুন JavaScript ফাইল\nconsole.log("Hello, EE Hub!");\n',
        html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>নতুন HTML ফাইল</title>\n</head>\n<body>\n  <h1>Hello, EE Hub!</h1>\n</body>\n</html>\n'
    };
    
    return templates[type] || '# নতুন ফাইল\n';
}

function uploadFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.py,.ino,.c,.cpp,.js,.html,.txt';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const fileName = file.name;
            const extension = fileName.split('.').pop().toLowerCase();
            
            let language = 'python';
            if (extension === 'ino') language = 'arduino';
            else if (extension === 'c') language = 'c';
            else if (extension === 'cpp') language = 'cpp';
            else if (extension === 'js') language = 'javascript';
            else if (extension === 'html') language = 'html';
            
            const newFile = {
                name: fileName,
                content: content,
                language: language
            };
            
            files.push(newFile);
            switchFile(fileName);
            
            showNotification('ফাইল আপলোড করা হয়েছে', 'success');
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function closeFile(filename) {
    if (files.length <= 1) {
        showNotification('অন্তত একটি ফাইল খোলা থাকতে হবে', 'warning');
        return;
    }
    
    const index = files.findIndex(f => f.name === filename);
    if (index !== -1) {
        files.splice(index, 1);
        
        if (currentFile === filename) {
            currentFile = files[0].name;
            switchFile(currentFile);
        }
        
        updateFileExplorer();
        updateFileTabs();
        showNotification('ফাইল বন্ধ করা হয়েছে', 'info');
    }
}

// কোড সাজেশন
function updateSuggestions() {
    const suggestionsList = document.getElementById('suggestionsList');
    if (!suggestionsList) return;
    
    const suggestions = codeSuggestions[currentLanguage] || codeSuggestions.python;
    
    suggestionsList.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        
        item.innerHTML = `
            <div class="suggestion-title">${suggestion.title}</div>
            <div class="suggestion-description">ক্লিক করুন কোড ঢোকাতে</div>
        `;
        
        item.addEventListener('click', () => {
            insertCodeSnippet(suggestion.code);
        });
        
        suggestionsList.appendChild(item);
    });
}

function insertCodeSnippet(code) {
    const cursor = codeEditor.getCursor();
    codeEditor.replaceRange(code + '\n', cursor);
    codeEditor.focus();
}

function insertQuickCode(action) {
    let code = '';
    
    switch(action) {
        case 'blink-led':
            if (currentLanguage === 'arduino') {
                code = `// LED ব্লিংক কোড
void blinkLED(int pin, int delayTime) {
  digitalWrite(pin, HIGH);
  delay(delayTime);
  digitalWrite(pin, LOW);
  delay(delayTime);
}`;
            } else if (currentLanguage === 'python') {
                code = `# LED ব্লিংক সিমুলেশন
def blink_led(pin, delay_time):
    import time
    for i in range(10):
        print(f"LED {pin} ON")
        time.sleep(delay_time)
        print(f"LED {pin} OFF")
        time.sleep(delay_time)`;
            }
            break;
            
        case 'serial-print':
            if (currentLanguage === 'arduino') {
                code = `// সিরিয়াল প্রিন্ট
Serial.begin(9600);
Serial.println("Hello from Arduino!");
Serial.print("Value: ");
Serial.println(123);`;
            } else if (currentLanguage === 'python') {
                code = `# সিরিয়াল প্রিন্ট (সিমুলেশন)
print("Hello from Python!")
print(f"Value: {123}")`;
            }
            break;
            
        case 'servo-control':
            if (currentLanguage === 'arduino') {
                code = `// সার্ভো মোটর কন্ট্রোল
#include <Servo.h>

Servo myServo;
int servoPin = 9;

void setup() {
  myServo.attach(servoPin);
}

void loop() {
  myServo.write(0);   // 0 ডিগ্রি
  delay(1000);
  myServo.write(90);  // 90 ডিগ্রি
  delay(1000);
  myServo.write(180); // 180 ডিগ্রি
  delay(1000);
}`;
            }
            break;
            
        case 'sensor-read':
            if (currentLanguage === 'arduino') {
                code = `// সেন্সর রিডিং
int sensorPin = A0;
int sensorValue = 0;
float voltage = 0.0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(sensorPin);
  voltage = sensorValue * (5.0 / 1023.0);
  
  Serial.print("সেন্সর মান: ");
  Serial.print(sensorValue);
  Serial.print(", ভোল্টেজ: ");
  Serial.print(voltage);
  Serial.println("V");
  
  delay(1000);
}`;
            } else if (currentLanguage === 'python') {
                code = `# সেন্সর রিডিং সিমুলেশন
import random

class Sensor:
    def __init__(self, pin):
        self.pin = pin
    
    def read_temperature(self):
        # সিমুলেটেড টেম্পারেচার (20-30°C)
        return random.uniform(20.0, 30.0)
    
    def read_humidity(self):
        # সিমুলেটেড হিউমিডিটি (40-80%)
        return random.uniform(40.0, 80.0)
    
    def read_voltage(self):
        # সিমুলেটেড ভোল্টেজ (0-5V)
        return random.uniform(0.0, 5.0)

# ব্যবহার
sensor = Sensor(A0)
print(f"তাপমাত্রা: {sensor.read_temperature():.1f}°C")
print(f"আর্দ্রতা: {sensor.read_humidity():.1f}%")
print(f"ভোল্টেজ: {sensor.read_voltage():.2f}V")`;
            }
            break;
    }
    
    if (code) {
        insertCodeSnippet(code);
    }
}

// সিমুলেশন ফাংশন
function startSimulation() {
    if (simulationActive) {
        showNotification('সিমুলেশন ইতিমধ্যে চলছে', 'info');
        return;
    }
    
    simulationActive = true;
    const simulationBoard = document.getElementById('simulationBoard');
    
    simulationBoard.innerHTML = `
        <div class="simulation-active">
            <div class="simulation-animation">
                <div class="led-animation"></div>
                <div class="data-flow"></div>
            </div>
            <div class="simulation-status">
                <i class="fas fa-play-circle"></i>
                সিমুলেশন চলছে...
            </div>
        </div>
    `;
    
    document.getElementById('startSimulationBtn').innerHTML = `
        <i class="fas fa-pause"></i> থামান
    `;
    
    document.getElementById('startSimulationBtn').onclick = stopSimulation;
    
    // কোড রান করুন
    runCode();
    
    showNotification('সিমুলেশন শুরু হয়েছে', 'success');
}

function stopSimulation() {
    simulationActive = false;
    updateSimulationBoard();
    
    document.getElementById('startSimulationBtn').innerHTML = `
        <i class="fas fa-play"></i> সিমুলেশন শুরু
    `;
    
    document.getElementById('startSimulationBtn').onclick = startSimulation;
    
    showNotification('সিমুলেশন থেমেছে', 'info');
}

function resetSimulation() {
    simulationActive = false;
    updateSimulationBoard();
    clearOutput();
    
    showNotification('সিমুলেশন রিসেট করা হয়েছে', 'info');
}

function updateSimulationBoard() {
    const simulationBoard = document.getElementById('simulationBoard');
    if (!simulationBoard) return;
    
    simulationBoard.innerHTML = `
        <div class="board-display">
            <div class="arduino-board">
                <div class="pin digital pin-2"></div>
                <div class="pin digital pin-3"></div>
                <div class="pin digital pin-4"></div>
                <div class="pin digital pin-5"></div>
                <div class="pin digital pin-6"></div>
                <div class="pin digital pin-7"></div>
                <div class="pin digital pin-8"></div>
                <div class="pin digital pin-9"></div>
                <div class="pin digital pin-10"></div>
                <div class="pin digital pin-11"></div>
                <div class="pin digital pin-12"></div>
                <div class="pin digital pin-13"></div>
                
                <div class="led led-13"></div>
                <div class="led led-power"></div>
            </div>
        </div>
    `;
}

// কানেকশন স্ট্যাটাস
function updateConnectionStatus() {
    const statusIcon = document.getElementById('connectionStatus');
    const statusText = document.getElementById('connectionText');
    
    if (isConnected) {
        statusIcon.className = 'fas fa-circle connected';
        statusText.textContent = 'কানেক্টেড';
        statusIcon.style.color = '#10b981';
    } else {
        statusIcon.className = 'fas fa-circle';
        statusText.textContent = 'ডিসকানেক্টেড';
        statusIcon.style.color = '#ef4444';
    }
}

// এক্সপোর্ট ও শেয়ার
function exportCode() {
    const code = codeEditor.getValue();
    const filename = currentFile;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    showNotification('কোড এক্সপোর্ট করা হয়েছে', 'success');
}

function shareCode() {
    const code = codeEditor.getValue();
    const shareData = {
        title: `${currentFile} - EE Hub কোড`,
        text: `কোড:\n${code.substring(0, 500)}...`,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showNotification('কোড শেয়ার করা হয়েছে', 'success'))
            .catch(err => showNotification('শেয়ার করতে সমস্যা', 'error'));
    } else {
        // Web Share API না থাকলে কপি করুন
        navigator.clipboard.writeText(code)
            .then(() => showNotification('কোড ক্লিপবোর্ডে কপি করা হয়েছে', 'success'))
            .catch(() => showNotification('কপি করতে সমস্যা হয়েছে', 'error'));
    }
}

// নোটিফিকেশন
function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// CSS স্টাইলস
const editorStyles = `
.notification-toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 15px 25px;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 10000;
    max-width: 350px;
}

.notification-toast.show {
    transform: translateY(0);
    opacity: 1;
}

.notification-toast.success {
    background: #10b981;
    border-left: 5px solid #059669;
}

.notification-toast.error {
    background: #ef4444;
    border-left: 5px solid #dc2626;
}

.notification-toast.warning {
    background: #f59e0b;
    border-left: 5px solid #d97706;
}

.notification-toast.info {
    background: #3b82f6;
    border-left: 5px solid #2563eb;
}

/* আউটপুট লাইন স্টাইল */
.output-line {
    padding: 10px;
    border-bottom: 1px solid #334155;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
}

.output-line.error {
    color: #f87171;
    background: rgba(239, 68, 68, 0.1);
}

.output-line.success {
    color: #34d399;
}

.output-line.info {
    color: #60a5fa;
}

.output-line pre {
    margin: 10px 0;
    white-space: pre-wrap;
    word-break: break-all;
}

/* সিরিয়াল টার্মিনাল */
.serial-line {
    padding: 5px 0;
    border-bottom: 1px solid #334155;
    font-family: 'Courier New', monospace;
    font-size: 14px;
}

.serial-time {
    color: #94a3b8;
    font-size: 12px;
    margin-right: 10px;
}

/* সমস্যা লিস্ট */
.no-problems {
    text-align: center;
    padding: 40px 20px;
    color: #94a3b8;
}

.no-problems i {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #10b981;
}

/* সম্প্রতিক কোড */
.no-recent {
    text-align: center;
    padding: 40px 20px;
    color: #94a3b8;
}

.no-recent i {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #64748b;
}

.recent-code-preview {
    font-size: 12px;
    color: #64748b;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* সিমুলেশন */
.simulation-active {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.simulation-animation {
    position: relative;
    width: 150px;
    height: 100px;
    margin-bottom: 20px;
}

.led-animation {
    position: absolute;
    width: 20px;
    height: 20px;
    background: #22c55e;
    border-radius: 50%;
    top: 40px;
    left: 65px;
    animation: blink 1s infinite;
    box-shadow: 0 0 20px #22c55e;
}

.data-flow {
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    top: 50px;
    animation: flow 2s linear infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

@keyframes flow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.simulation-status {
    color: #10b981;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* কানেকশন স্ট্যাটাস */
.connected {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* ফাইল ট্যাব */
.file-tab {
    position: relative;
}

.tab-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 2px 5px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    border-radius: 3px;
}

.tab-close:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
}

.file-tab.active .tab-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* কোড এডিটর স্ক্রলবার */
.CodeMirror-vscrollbar::-webkit-scrollbar,
.CodeMirror-hscrollbar::-webkit-scrollbar,
.output-text::-webkit-scrollbar,
.serial-terminal::-webkit-scrollbar,
.problems-list::-webkit-scrollbar,
.debug-console::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.CodeMirror-vscrollbar::-webkit-scrollbar-track,
.CodeMirror-hscrollbar::-webkit-scrollbar-track,
.output-text::-webkit-scrollbar-track,
.serial-terminal::-webkit-scrollbar-track,
.problems-list::-webkit-scrollbar-track,
.debug-console::-webkit-scrollbar-track {
    background: #1e293b;
}

.CodeMirror-vscrollbar::-webkit-scrollbar-thumb,
.CodeMirror-hscrollbar::-webkit-scrollbar-thumb,
.output-text::-webkit-scrollbar-thumb,
.serial-terminal::-webkit-scrollbar-thumb,
.problems-list::-webkit-scrollbar-thumb,
.debug-console::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 4px;
}

.CodeMirror-vscrollbar::-webkit-scrollbar-thumb:hover,
.CodeMirror-hscrollbar::-webkit-scrollbar-thumb:hover,
.output-text::-webkit-scrollbar-thumb:hover,
.serial-terminal::-webkit-scrollbar-thumb:hover,
.problems-list::-webkit-scrollbar-thumb:hover,
.debug-console::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}
`;

// CSS ইনজেক্ট করুন
const styleSheet = document.createElement('style');
styleSheet.textContent = editorStyles;
document.head.appendChild(styleSheet);

// গ্লোবাল এক্সপোজ
window.CodeEditor = {
    runCode,
    compileCode,
    uploadCode,
    formatCode,
    saveFile,
    createNewFile,
    showNotification,
    currentLanguage: () => currentLanguage,
    currentFile: () => currentFile,
    getCode: () => codeEditor.getValue()
};