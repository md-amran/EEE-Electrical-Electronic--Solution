// javascript/components-script.js

// ইলেকট্রনিক কম্পোনেন্টস ডাটাবেজ

// কম্পোনেন্ট ডেটা (একটি সম্পূর্ণ ডেটাবেজ)
const componentsData = [
    {
        id: 1,
        name: "রেজিস্টর",
        bengaliName: "রোধক",
        symbol: "R",
        category: "প্যাসিভ",
        subcategory: "রোধক",
        description: "রেজিস্টর একটি প্যাসিভ ইলেকট্রনিক কম্পোনেন্ট যা বৈদ্যুতিক সার্কিটে কারেন্ট প্রবাহকে বাধা দেয়। এটি ভোল্টেজ ড্রপ তৈরি করে এবং সার্কিটে কারেন্ট নিয়ন্ত্রণ করে।",
        detailedDescription: "রেজিস্টর হল ইলেকট্রনিক্সের সবচেয়ে মৌলিক এবং বহুল ব্যবহৃত কম্পোনেন্ট। এটি ওহমের সূত্র V=IR অনুসারে কাজ করে, যেখানে রেজিস্ট্যান্সের মান (R) ভোল্টেজ (V) এবং কারেন্ট (I) এর অনুপাত নির্ধারণ করে।",
        image: "resistor",
        color: "#ef4444",
        specs: {
            unit: "Ohm (Ω)",
            tolerance: "±1% to ±10%",
            powerRating: "0.125W to 5W",
            temperatureCoefficient: "±100ppm/°C to ±250ppm/°C",
            package: "Axial, SMD"
        },
        applications: [
            "কারেন্ট সীমিতকরণ",
            "ভোল্টেজ বিভাজক",
            "বায়াসিং ট্রানজিস্টর",
            "পুল-আপ/পুল-ডাউন রেজিস্টর"
        ],
        types: ["Carbon Film", "Metal Film", "Wirewound", "Thick Film", "Thin Film"],
        datasheet: "https://example.com/datasheets/resistor.pdf",
        pins: 2,
        formulas: [
            { name: "ওহমের সূত্র", formula: "V = I × R" },
            { name: "পাওয়ার", formula: "P = I² × R = V² / R" },
            { name: "সিরিজ রেজিস্ট্যান্স", formula: "R_total = R₁ + R₂ + ..." },
            { name: "প্যারালাল রেজিস্ট্যান্স", formula: "1/R_total = 1/R₁ + 1/R₂ + ..." }
        ],
        examples: [
            {
                title: "LED কারেন্ট সীমিতকরণ",
                circuit: "LED - R - Vcc",
                values: "Vcc=5V, LED Vf=2V, I=20mA",
                calculation: "R = (5V - 2V) / 0.02A = 150Ω"
            }
        ],
        tags: ["passive", "basic", "current-limiting", "voltage-divider"],
        popularity: 100,
        complexity: 1
    },
    {
        id: 2,
        name: "ক্যাপাসিটর",
        bengaliName: "ধারক",
        symbol: "C",
        category: "প্যাসিভ",
        subcategory: "ক্যাপাসিটর",
        description: "ক্যাপাসিটর বৈদ্যুতিক চার্জ সংগ্রহ এবং সংরক্ষণ করে। এটি AC সিগন্যালকে পাস করে কিন্তু DC সিগন্যালকে ব্লক করে।",
        detailedDescription: "ক্যাপাসিটর দুটি কন্ডাক্টরের মধ্যে একটি ইনসুলেটর (ডাইইলেকট্রিক) দ্বারা বিভক্ত। এটি তড়িৎ ক্ষেত্রের মধ্যে শক্তি সঞ্চয় করে। সময়ের সাথে সাথে চার্জ এবং ডিসচার্জ করার ক্ষমতা রয়েছে।",
        image: "capacitor",
        color: "#10b981",
        specs: {
            unit: "Farad (F)",
            voltageRating: "6.3V to 1000V",
            tolerance: "±5% to ±20%",
            temperatureRange: "-55°C to +125°C",
            package: "Radial, Axial, SMD"
        },
        applications: [
            "পাওয়ার সাপ্লাই ফিল্টারিং",
            "সিগনাল কাপলিং",
            "টাইমিং সার্কিট",
            "এনার্জি স্টোরেজ"
        ],
        types: ["Ceramic", "Electrolytic", "Tantalum", "Film", "Supercapacitor"],
        datasheet: "https://example.com/datasheets/capacitor.pdf",
        pins: 2,
        formulas: [
            { name: "ক্যাপাসিট্যান্স", formula: "C = Q / V" },
            { name: "এনার্জি স্টোরড", formula: "E = ½CV²" },
            { name: "সিরিজ ক্যাপাসিট্যান্স", formula: "1/C_total = 1/C₁ + 1/C₂ + ..." },
            { name: "প্যারালাল ক্যাপাসিট্যান্স", formula: "C_total = C₁ + C₂ + ..." },
            { name: "RC টাইম কনস্ট্যান্ট", formula: "τ = R × C" }
        ],
        examples: [
            {
                title: "RC টাইমিং সার্কিট",
                circuit: "Vcc - R - C - GND",
                values: "R=10kΩ, C=100µF",
                calculation: "τ = 10kΩ × 100µF = 1 second"
            }
        ],
        tags: ["passive", "filter", "energy-storage", "timing"],
        popularity: 95,
        complexity: 2
    },
    {
        id: 3,
        name: "ইন্ডাক্টর",
        bengaliName: "প্রেরণযন্ত্র",
        symbol: "L",
        category: "প্যাসিভ",
        subcategory: "ইন্ডাক্টর",
        description: "ইন্ডাক্টর একটি চৌম্বক ক্ষেত্রে শক্তি সঞ্চয় করে। এটি কারেন্টের পরিবর্তনের বিরোধিতা করে।",
        image: "inductor",
        color: "#3b82f6",
        specs: {
            unit: "Henry (H)",
            currentRating: "100mA to 10A",
            resistance: "0.01Ω to 100Ω",
            qFactor: "10 to 100",
            package: "Axial, SMD, Toroidal"
        },
        applications: [
            "ফিল্টার সার্কিট",
            "পাওয়ার সাপ্লাই",
            "RF সার্কিট",
            "ট্রান্সফর্মার"
        ],
        tags: ["passive", "filter", "power", "rf"],
        popularity: 70,
        complexity: 3
    },
    {
    id: 4,
    name: "ডায়োড",
    bengaliName: "দ্বিমুখী রোধক",
    symbol: "D",
    category: "সেমিকন্ডাক্টর",
    subcategory: "ডায়োড",
    description: "ডায়োড কারেন্টকে শুধুমাত্র একদিকে প্রবাহিত হতে দেয়। এটি AC থেকে DC রূপান্তরে ব্যবহৃত হয়।",
    detailedDescription: "ডায়োড হল একটি দুই-টার্মিনাল সেমিকন্ডাক্টর ডিভাইস যা কারেন্টকে শুধুমাত্র একদিকে (অ্যানোড থেকে ক্যাথোড) প্রবাহিত হতে দেয়। ফরওয়ার্ড বায়াসে এটি চালু হয় এবং রিভার্স বায়াসে বন্ধ থাকে। বিভিন্ন ধরনের ডায়োড বিভিন্ন কাজে ব্যবহৃত হয়।",
    image: "diode",
    color: "#f59e0b",
    specs: {
        vf: "0.3V to 0.7V",         // Forward Voltage
        vr: "50V to 1000V",         // Reverse Voltage
        if: "100mA to 10A",         // Forward Current
        trr: "ns to µs",            // Reverse Recovery Time
        package: "DO-41, SMA, SMB, SMC, SMD",
        powerRating: "0.5W to 50W"
    },
    applications: ["Rectification", "Voltage Regulation", "Protection", "Signal Demodulation"],
    types: ["PN Junction", "Zener", "Schottky", "LED", "Photodiode", "Varactor"],
    datasheet: "https://example.com/datasheets/diode.pdf",
    pins: 2,
    formulas: [
        { name: "ডায়োড সমীকরণ", formula: "I = Is × (e^(Vd/(n×Vt)) - 1)" },
        { name: "পাওয়ার লস", formula: "P = Vf × If" },
        { name: "রেকটিফায়ার আউটপুট", formula: "Vdc = (2 × Vp) / π - Vf" }
    ],
    examples: [
        {
            title: "হাফ-ওয়েভ রেকটিফায়ার",
            circuit: "AC - DIODE - LOAD - GND",
            values: "AC=12Vrms, Load=100Ω",
            calculation: "Vp=12V×√2=17V, Vdc=(17V-0.7V)/π=5.2V"
        },
        {
            title: "জেনার ভোল্টেজ রেগুলেটর",
            circuit: "Vin - R - ZENER - GND | Vout from ZENER cathode",
            values: "Vin=15V, Vz=5.1V, Load=50mA",
            calculation: "R=(15V-5.1V)/0.05A=198Ω"
        }
    ],
    tags: ["semiconductor", "diode", "rectifier", "protection", "zener"],
    popularity: 85,
    complexity: 2
},
   {
    id: 5,
    name: "ট্রানজিস্টর (BJT)",
    bengaliName: "ট্রানজিস্টর",
    symbol: "Q",
    category: "সেমিকন্ডাক্টর",
    subcategory: "ট্রানজিস্টর",
    description: "BJT (Bipolar Junction Transistor) একটি কারেন্ট-নিয়ন্ত্রিত ট্রানজিস্টর যা সার্কিটে সুইচিং এবং এমপ্লিফিকেশনের কাজ করে।",
    detailedDescription: "BJT হল তিন-লেয়ার, দুই জাংশনের সেমিকন্ডাক্টর ডিভাইস। এর তিনটি টার্মিনাল: কালেক্টর (Collector), বেস (Base), এবং ইমিটার (Emitter)। বেস কারেন্ট নিয়ন্ত্রণ করে কালেক্টর-ইমিটার কারেন্ট পরিবর্তন করা হয়। BJT কারেন্ট অ্যামপ্লিফিকেশনের জন্য আদর্শ।",
    image: "transistor",
    color: "#8b5cf6",
    specs: {
        type: "NPN/PNP",
        vceo: "30V to 300V",        // Collector-Emitter Voltage
        vcbo: "40V to 400V",        // Collector-Base Voltage
        ic: "100mA to 15A",         // Collector Current
        hfe: "50 to 300",           // Current Gain
        package: "TO-92, TO-126, TO-220, SOT-23",
        powerDissipation: "0.3W to 75W",
        frequency: "100MHz to 300MHz"
    },
    applications: ["Amplification", "Switching", "Oscillators", "Regulators"],
    types: ["NPN", "PNP", "Darlington", "RF Transistor", "Power Transistor"],
    datasheet: "https://example.com/datasheets/transistor.pdf",
    pins: 3,
    formulas: [
        { name: "কারেন্ট গেইন", formula: "β = Ic / Ib" },
        { name: "কালেক্টর কারেন্ট", formula: "Ic = β × Ib" },
        { name: "বেস কারেন্ট", formula: "Ib = (Vcc - Vbe) / Rb" },
        { name: "পাওয়ার গেইন", formula: "Ap = β × (Rc / Re)" }
    ],
    examples: [
        {
            title: "কমন-ইমিটার এমপ্লিফায়ার",
            circuit: "Vcc - Rc - COLLECTOR | BASE - Rb - Vin | EMITTER - Re - GND",
            values: "Vcc=12V, Rc=1kΩ, Rb=100kΩ, Re=100Ω, Vin=1V",
            calculation: "Ib=(12V-0.7V)/100kΩ=113μA, Ic=β×Ib=100×113μA=11.3mA"
        },
        {
            title: "BJT সুইচ সার্কিট",
            circuit: "Vcc - LOAD - COLLECTOR | BASE - R - Vin | EMITTER - GND",
            values: "Load=12V/100mA, Vin=5V, R=1kΩ",
            calculation: "Ib=(5V-0.7V)/1kΩ=4.3mA, Ic=100×4.3mA=430mA (Saturated)"
        }
    ],
    tags: ["semiconductor", "transistor", "bjt", "amplifier", "switch", "active"],
    popularity: 90,
    complexity: 4
},
   {
    id: 6,
    name: "MOSFET",
    bengaliName: "মসফেট",
    symbol: "Q",
    category: "সেমিকন্ডাক্টর",
    subcategory: "ট্রানজিস্টর",
    description: "MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) একটি ভোল্টেজ-নিয়ন্ত্রিত ট্রানজিস্টর যা উচ্চ ফ্রিকোয়েন্সি এবং উচ্চ পাওয়ার অ্যাপ্লিকেশনে ব্যবহৃত হয়।",
    detailedDescription: "MOSFET হল একটি ট্রানজিস্টর যা বৈদ্যুতিক ক্ষেত্রের মাধ্যমে কন্ডাক্টিভিটি নিয়ন্ত্রণ করে। এর তিনটি টার্মিনাল: গেট (Gate), ড্রেন (Drain), এবং সোর্স (Source)। গেট ভোল্টেজ পরিবর্তন করে ড্রেন-সোর্স কারেন্ট নিয়ন্ত্রণ করা হয়। MOSFET উচ্চ ইনপুট ইম্পিডেন্স, দ্রুত সুইচিং স্পিড এবং কম পাওয়ার খরচের জন্য বিখ্যাত।",
    image: "mosfet",
    color: "#ec4899",
    specs: {
        type: "N-Channel/P-Channel",
        vds: "20V to 1000V",        // Drain-Source Voltage
        vgs: "±20V",                // Gate-Source Voltage
        id: "1A to 100A",           // Drain Current
        rdsOn: "0.001Ω to 1Ω",      // Drain-Source On-Resistance
        package: "TO-220, TO-247, DPAK, SOIC, SMD",
        gateCharge: "10nC to 200nC",
        powerDissipation: "1W to 500W",
        thresholdVoltage: "1V to 4V"
    },
    applications: [
        "পাওয়ার সুইচিং",
        "মোটর কন্ট্রোল",
        "SMPS (Switched-Mode Power Supply)",
        "অডিও এমপ্লিফায়ার",
        "LED ড্রাইভার",
        "ডিসি-ডিসি কনভার্টার"
    ],
    types: [
        "Enhancement MOSFET",
        "Depletion MOSFET", 
        "Logic Level MOSFET",
        "Power MOSFET",
        "RF MOSFET",
        "Trench MOSFET"
    ],
    datasheet: "https://example.com/datasheets/mosfet.pdf",
    pins: 3,
    formulas: [
        { name: "ড্রেন কারেন্ট", formula: "Id = K × (Vgs - Vth)²" },
        { name: "পাওয়ার ডিসিপেশন", formula: "Pd = Id² × Rds(on)" },
        { name: "গেট চার্জ", formula: "Qg = Ciss × Vgs" },
        { name: "সুইচিং লস", formula: "Psw = ½ × Vds × Id × (tr + tf) × f" }
    ],
    examples: [
        {
            title: "MOSFET সুইচ সার্কিট",
            circuit: "Vcc - LOAD - DRAIN | GATE - R - PWM | SOURCE - GND",
            values: "Vcc=12V, Load=1A, R=100Ω, PWM=5V",
            calculation: "Rds(on)=0.1Ω, Pd=1A² × 0.1Ω = 0.1W"
        },
        {
            title: "MOSFET মোটর ড্রাইভার",
            circuit: "Arduino PWM - 1kΩ - GATE | DRAIN - Motor - 12V | SOURCE - GND",
            values: "Motor=12V/5A, PWM=5V, Frequency=1kHz",
            calculation: "Qg=20nC, Gate Current=20nC × 1kHz = 20μA"
        }
    ],
    tags: ["semiconductor", "transistor", "mosfet", "power", "switch", "high-frequency"],
    popularity: 85,
    complexity: 4
},
    {
        id: 7,
        name: "অপারেশনাল এমপ্লিফায়ার",
        bengaliName: "অপারেশনাল পরিবর্ধক",
        symbol: "U",
        category: "ইন্টিগ্রেটেড সার্কিট",
        subcategory: "এমপ্লিফায়ার",
        description: "Op-amp হল উচ্চ গেইন ডিফারেনশিয়াল এমপ্লিফায়ার যা বিভিন্ন অ্যানালগ সার্কিটে ব্যবহৃত হয়।",
        image: "opamp",
        color: "#14b8a6",
        specs: {
            supplyVoltage: "±3V to ±18V",
            inputOffset: "1µV to 5mV",
            gainBandwidth: "1MHz to 100MHz",
            slewRate: "0.5V/µs to 100V/µs"
        },
        applications: ["Amplifiers", "Filters", "Comparators", "Oscillators"],
        types: ["741", "LM358", "TL072", "OPA2134"],
        tags: ["ic", "analog", "amplifier", "linear"],
        popularity: 88,
        complexity: 5
    },
    {
        id: 8,
        name: "মাইক্রোকন্ট্রোলার (Arduino)",
        bengaliName: "মাইক্রোকন্ট্রোলার",
        symbol: "U",
        category: "ইন্টিগ্রেটেড সার্কিট",
        subcategory: "মাইক্রোকন্ট্রোলার",
        description: "একটি ছোট কম্পিউটার যা একটি চিপে এম্বেড করা থাকে। প্রোগ্রামেবল ডিজিটাল এবং অ্যানালগ ইনপুট/আউটপুট।",
        image: "microcontroller",
        color: "#6366f1",
        specs: {
            architecture: "AVR, ARM, PIC",
            clockSpeed: "8MHz to 240MHz",
            flashMemory: "16KB to 2MB",
            ioPins: "14 to 100",
            adcResolution: "8-bit to 12-bit"
        },
        applications: ["Embedded Systems", "IoT", "Robotics", "Automation"],
        types: ["ATmega328P", "ESP32", "STM32", "PIC16F877A"],
        tags: ["ic", "digital", "programmable", "embedded"],
        popularity: 92,
        complexity: 6
    },
    {
        id: 9,
        name: "LED",
        bengaliName: "বাতি নির্গমন ডায়োড",
        symbol: "D",
        category: "অপটোইলেকট্রনিক্স",
        subcategory: "LED",
        description: "লাইট এমিটিং ডায়োড যা বৈদ্যুতিক শক্তিকে আলোতে রূপান্তর করে।",
        image: "led",
        color: "#fbbf24",
        specs: {
            forwardVoltage: "1.8V to 3.6V",
            forwardCurrent: "20mA to 1A",
            wavelength: "400nm to 700nm",
            luminosity: "100mcd to 100lm"
        },
        applications: ["Indicators", "Displays", "Lighting", "Sensors"],
        tags: ["optoelectronics", "lighting", "indicator"],
        popularity: 75,
        complexity: 1
    },
    {
        id: 10,
        name: "ট্রান্সফরমার",
        bengaliName: "রূপান্তরক",
        symbol: "T",
        category: "প্যাসিভ",
        subcategory: "ট্রান্সফরমার",
        description: "ট্রান্সফরমার ইলেক্ট্রোম্যাগনেটিক ইন্ডাকশনের মাধ্যমে AC ভোল্টেজ লেভেল পরিবর্তন করে।",
        image: "transformer",
        color: "#84cc16",
        specs: {
            primaryVoltage: "110V to 240V",
            secondaryVoltage: "5V to 48V",
            powerRating: "1VA to 1000VA",
            frequency: "50Hz/60Hz"
        },
        applications: ["Power Supplies", "Isolation", "Impedance Matching"],
        tags: ["passive", "power", "isolation", "ac"],
        popularity: 65,
        complexity: 4
    },
    {
        id: 11,
        name: "ক্রিস্টাল অসিলেটর",
        bengaliName: "স্ফটিক দোলক",
        symbol: "X",
        category: "প্যাসিভ",
        subcategory: "অসিলেটর",
        description: "পাইজোইলেকট্রিক ক্রিস্টাল ব্যবহার করে সঠিক ফ্রিকোয়েন্সি তৈরি করে।",
        image: "crystal",
        color: "#06b6d4",
        specs: {
            frequency: "32.768kHz to 100MHz",
            tolerance: "±10ppm to ±100ppm",
            loadCapacitance: "12pF to 32pF",
            stability: "±10ppm to ±100ppm"
        },
        applications: ["Clock Generation", "Timing Circuits", "Microcontrollers"],
        tags: ["passive", "timing", "clock", "oscillator"],
        popularity: 60,
        complexity: 3
    },
    {
        id: 12,
        name: "ফিউজ",
        bengaliName: "গলন তার",
        symbol: "F",
        category: "প্রোটেকশন",
        subcategory: "ফিউজ",
        description: "সার্কিট প্রোটেকশন ডিভাইস যা অতিরিক্ত কারেন্ট প্রবাহিত হলে পুড়ে যায়।",
        image: "fuse",
        color: "#f97316",
        specs: {
            currentRating: "100mA to 30A",
            voltageRating: "32V to 600V",
            breakingCapacity: "1kA to 100kA",
            type: "Fast, Slow, Time Delay"
        },
        applications: ["Circuit Protection", "Safety Devices"],
        tags: ["protection", "safety", "fuse"],
        popularity: 55,
        complexity: 1
    }
];

// ক্যাটাগরি ডেটা
const categories = [
    { id: "all", name: "সকল কম্পোনেন্ট", icon: "fas fa-th", count: componentsData.length },
    { id: "passive", name: "প্যাসিভ", icon: "fas fa-resistor", count: 0 },
    { id: "semiconductor", name: "সেমিকন্ডাক্টর", icon: "fas fa-microchip", count: 0 },
    { id: "ic", name: "ইন্টিগ্রেটেড সার্কিট", icon: "fas fa-brain", count: 0 },
    { id: "optoelectronics", name: "অপটোইলেকট্রনিক্স", icon: "fas fa-lightbulb", count: 0 },
    { id: "protection", name: "প্রোটেকশন", icon: "fas fa-shield-alt", count: 0 }
];

// কম্পোনেন্ট টাইপস
const componentTypes = [
    "Carbon Film", "Metal Film", "Wirewound", "Thick Film", "Thin Film",
    "Ceramic", "Electrolytic", "Tantalum", "Film", "Supercapacitor",
    "PN Junction", "Zener", "Schottky", "LED", "Photodiode",
    "NPN/PNP", "N-Channel/P-Channel",
    "741", "LM358", "TL072", "OPA2134",
    "ATmega328P", "ESP32", "STM32", "PIC16F877A"
];

// ভ্যারিয়েবলস
let currentView = 'grid';
let currentCategory = 'all';
let currentSort = 'name';
let currentPage = 1;
const itemsPerPage = 9;
let filteredComponents = [...componentsData];
let favorites = JSON.parse(localStorage.getItem('componentFavorites')) || [];

// DOM এলিমেন্টস
let componentsGrid, categoryList, tagCloud, componentSearch;

// নোটিফিকেশন ফাংশন
function showNotification(message, type = 'info') {
    // নোটিফিকেশন এলিমেন্ট তৈরি করুন
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // বডিতে অ্যাপেন্ড করুন
    document.body.appendChild(notification);
    
    // অটো রিমুভ
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
    
    // ক্লোজ বাটন
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// ইনিশিয়ালাইজেশন
document.addEventListener('DOMContentLoaded', function() {
    // প্রথমে DOM এলিমেন্টস চেক করুন
    componentsGrid = document.getElementById('componentsGrid');
    categoryList = document.getElementById('categoryList');
    tagCloud = document.getElementById('tagCloud');
    componentSearch = document.getElementById('componentSearch');
    
    // যদি এলিমেন্টস না থাকে, তাহলে এভাবে তৈরি করুন
    if (!componentsGrid) {
        componentsGrid = document.createElement('div');
        componentsGrid.id = 'componentsGrid';
        componentsGrid.className = 'components-grid';
        document.querySelector('.components-container').appendChild(componentsGrid);
    }
    
    if (!categoryList) {
        categoryList = document.getElementById('categoryList');
    }
    
    if (!tagCloud) {
        const tagContainer = document.querySelector('.tags-container');
        if (tagContainer) {
            tagCloud = document.createElement('div');
            tagCloud.id = 'tagCloud';
            tagCloud.className = 'tag-cloud';
            tagContainer.appendChild(tagCloud);
        }
    }
    
    if (!componentSearch) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            componentSearch = document.createElement('input');
            componentSearch.id = 'componentSearch';
            componentSearch.type = 'text';
            componentSearch.placeholder = 'কম্পোনেন্ট সার্চ করুন...';
            searchContainer.appendChild(componentSearch);
        }
    }
    
    initializeElements();
    calculateCategoryCounts();
    initializeCategories();
    initializeTags();
    initializeSorting();
    initializeViewToggle();
    initializeSearch();
    initializeAdvancedSearch();
    renderComponents();
    initializeModal();
    initializeRecentList();
    
    // সাম্প্রতিক ভিউ লোড করুন
    loadRecentViews();
});

function initializeElements() {
    // DOM এলিমেন্টস পাওয়ার জন্য আবার চেষ্টা করুন
    componentsGrid = document.getElementById('componentsGrid');
    categoryList = document.getElementById('categoryList');
    tagCloud = document.getElementById('tagCloud');
    componentSearch = document.getElementById('componentSearch');
}

function calculateCategoryCounts() {
    categories.forEach(category => {
        if (category.id !== 'all') {
            category.count = componentsData.filter(comp => 
                comp.category.toLowerCase().includes(category.id) || 
                (category.id === 'ic' && comp.category === 'ইন্টিগ্রেটেড সার্কিট') ||
                (category.id === 'optoelectronics' && comp.category === 'অপটোইলেকট্রনিক্স') ||
                (category.id === 'protection' && comp.category === 'প্রোটেকশন')
            ).length;
        }
    });
}

function initializeCategories() {
    if (!categoryList) return;
    
    categoryList.innerHTML = '';
    
    categories.forEach(category => {
        const item = document.createElement('div');
        item.className = `category-item ${category.id === currentCategory ? 'active' : ''}`;
        item.innerHTML = `
            <div>
                <i class="${category.icon}"></i>
                <span>${category.name}</span>
            </div>
            <span class="category-count">${category.count}</span>
        `;
        
        item.addEventListener('click', () => {
            // সকল ক্যাটাগরি নিষ্ক্রিয় করুন
            document.querySelectorAll('.category-item').forEach(el => el.classList.remove('active'));
            // বর্তমান ক্যাটাগরি সক্রিয় করুন
            item.classList.add('active');
            
            currentCategory = category.id;
            currentPage = 1;
            filterComponents();
        });
        
        categoryList.appendChild(item);
    });
}

function initializeTags() {
    if (!tagCloud) return;
    
    // সকল ট্যাগ সংগ্রহ করুন
    const allTags = new Set();
    componentsData.forEach(comp => {
        if (comp.tags) {
            comp.tags.forEach(tag => allTags.add(tag));
        }
    });
    
    tagCloud.innerHTML = '';
    
    allTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item';
        tagElement.textContent = tag;
        tagElement.title = `${tag} ট্যাগযুক্ত কম্পোনেন্ট দেখুন`;
        
        tagElement.addEventListener('click', () => {
            // ট্যাগ টগল করুন
            if (tagElement.classList.contains('active')) {
                tagElement.classList.remove('active');
                filterComponents();
            } else {
                // অন্য সকল ট্যাগ নিষ্ক্রিয় করুন
                document.querySelectorAll('.tag-item').forEach(el => el.classList.remove('active'));
                tagElement.classList.add('active');
                
                // ট্যাগ দ্বারা ফিল্টার করুন
                filteredComponents = componentsData.filter(comp => 
                    comp.tags && comp.tags.includes(tag)
                );
                currentPage = 1;
                renderComponents();
            }
        });
        
        tagCloud.appendChild(tagElement);
    });
}

function initializeSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;
    
    sortSelect.value = currentSort;
    
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        sortComponents();
        renderComponents();
    });
}

function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    if (!viewBtns.length) return;
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // সকল বাটন নিষ্ক্রিয় করুন
            viewBtns.forEach(b => b.classList.remove('active'));
            // বর্তমান ভিউ সক্রিয় করুন
            this.classList.add('active');
            
            currentView = view;
            renderComponents();
        });
    });
}

function initializeSearch() {
    if (!componentSearch) return;
    
    // সার্চ ইভেন্ট
    componentSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length >= 2 || searchTerm.length === 0) {
            filterComponents();
        }
    });
    
    // সার্চ বাটন
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', filterComponents);
    }
    
    // এন্টার ক্লিক
    componentSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterComponents();
        }
    });
}

function initializeAdvancedSearch() {
    const advancedBtn = document.getElementById('advancedSearchBtn');
    const advancedModal = document.getElementById('advancedSearchModal');
    const advancedClose = document.getElementById('advancedSearchClose');
    const applyBtn = document.getElementById('applySearchBtn');
    const resetBtn = document.getElementById('resetSearchBtn');
    const searchCategory = document.getElementById('searchCategory');
    
    if (!advancedBtn || !advancedModal) return;
    
    // এডভান্সড সার্চ বাটন
    if (advancedBtn) {
        advancedBtn.addEventListener('click', () => {
            advancedModal.classList.add('active');
        });
    }
    
    // মডাল বন্ধ করুন
    if (advancedClose) {
        advancedClose.addEventListener('click', () => {
            advancedModal.classList.remove('active');
        });
    }
    
    // ব্যাকগ্রাউন্ডে ক্লিক করলে বন্ধ করুন
    if (advancedModal) {
        advancedModal.addEventListener('click', (e) => {
            if (e.target === advancedModal) {
                advancedModal.classList.remove('active');
            }
        });
    }
    
    // ক্যাটাগরি অপশন পপুলেট করুন
    if (searchCategory) {
        categories.forEach(category => {
            if (category.id !== 'all') {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                searchCategory.appendChild(option);
            }
        });
    }
    
    // টাইপ অপশন পপুলেট করুন
    const searchType = document.getElementById('searchType');
    if (searchType) {
        const uniqueTypes = [...new Set(componentTypes)];
        uniqueTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.toLowerCase();
            option.textContent = type;
            searchType.appendChild(option);
        });
    }
    
    // সার্চ প্রয়োগ করুন
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            applyAdvancedSearch();
            if (advancedModal) advancedModal.classList.remove('active');
        });
    }
    
    // রিসেট করুন
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAdvancedSearch);
    }
}

function applyAdvancedSearch() {
    const category = document.getElementById('searchCategory')?.value || '';
    const type = document.getElementById('searchType')?.value || '';
    const minVoltage = parseFloat(document.getElementById('minVoltage')?.value) || 0;
    const maxVoltage = parseFloat(document.getElementById('maxVoltage')?.value) || 1000;
    const minCurrent = parseFloat(document.getElementById('minCurrent')?.value) || 0;
    const maxCurrent = parseFloat(document.getElementById('maxCurrent')?.value) || 100;
    const packageType = document.getElementById('searchPackage')?.value.toLowerCase() || '';
    const applications = document.getElementById('searchApplications')?.value.toLowerCase() || '';
    
    filteredComponents = componentsData.filter(comp => {
        // ক্যাটাগরি ফিল্টার
        if (category && !comp.category.toLowerCase().includes(category)) {
            return false;
        }
        
        // টাইপ ফিল্টার
        if (type) {
            if (!comp.types || !comp.types.some(t => t.toLowerCase().includes(type))) {
                return false;
            }
        }
        
        // ভোল্টেজ রেঞ্জ ফিল্টার (যদি ডেটা থাকে)
        if (comp.specs) {
            if (comp.specs.voltageRating) {
                const voltageMatch = checkRangeFilter(comp.specs.voltageRating, minVoltage, maxVoltage);
                if (!voltageMatch) return false;
            }
            
            // কারেন্ট রেঞ্জ ফিল্টার (যদি ডেটা থাকে)
            if (comp.specs.currentRating) {
                const currentMatch = checkRangeFilter(comp.specs.currentRating, minCurrent, maxCurrent);
                if (!currentMatch) return false;
            }
            
            // প্যাকেজ টাইপ ফিল্টার
            if (packageType && comp.specs.package) {
                if (!comp.specs.package.toLowerCase().includes(packageType)) {
                    return false;
                }
            }
        }
        
        // অ্যাপ্লিকেশন ফিল্টার
        if (applications && comp.applications) {
            const hasApplication = comp.applications.some(app => 
                app.toLowerCase().includes(applications)
            );
            if (!hasApplication) return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    renderComponents();
    
    if (filteredComponents.length === 0) {
        showNotification('কোন কম্পোনেন্ট পাওয়া যায়নি', 'warning');
    }
}

function checkRangeFilter(specString, min, max) {
    if (!specString) return true;
    
    // স্পেসিফিকেশন স্ট্রিং থেকে সংখ্যা বের করুন
    const numbers = specString.match(/\d+(\.\d+)?/g);
    if (!numbers) return true;
    
    const values = numbers.map(Number);
    const specMin = Math.min(...values);
    const specMax = Math.max(...values);
    
    if (!isNaN(min) && min > 0 && specMax < min) return false;
    if (!isNaN(max) && max > 0 && specMin > max) return false;
    
    return true;
}

function resetAdvancedSearch() {
    document.getElementById('searchCategory').value = '';
    document.getElementById('searchType').value = '';
    document.getElementById('minVoltage').value = '';
    document.getElementById('maxVoltage').value = '';
    document.getElementById('minCurrent').value = '';
    document.getElementById('maxCurrent').value = '';
    document.getElementById('searchPackage').value = '';
    document.getElementById('searchApplications').value = '';
    
    filteredComponents = [...componentsData];
    currentPage = 1;
    renderComponents();
}

function filterComponents() {
    const searchTerm = componentSearch ? componentSearch.value.toLowerCase().trim() : '';
    
    // ক্যাটাগরি দ্বারা ফিল্টার
    if (currentCategory === 'all') {
        filteredComponents = [...componentsData];
    } else {
        filteredComponents = componentsData.filter(comp => {
            const categoryMatch = comp.category.toLowerCase().includes(currentCategory) || 
                (currentCategory === 'ic' && comp.category === 'ইন্টিগ্রেটেড সার্কিট') ||
                (currentCategory === 'optoelectronics' && comp.category === 'অপটোইলেকট্রনিক্স') ||
                (currentCategory === 'protection' && comp.category === 'প্রোটেকশন');
            
            return categoryMatch;
        });
    }
    
    // সার্চ টার্ম দ্বারা ফিল্টার
    if (searchTerm) {
        filteredComponents = filteredComponents.filter(comp => 
            comp.name.toLowerCase().includes(searchTerm) ||
            (comp.bengaliName && comp.bengaliName.toLowerCase().includes(searchTerm)) ||
            comp.description.toLowerCase().includes(searchTerm) ||
            (comp.tags && comp.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
            (comp.types && comp.types.some(type => type.toLowerCase().includes(searchTerm)))
        );
    }
    
    // সর্ট প্রয়োগ করুন
    sortComponents();
    
    // রেন্ডার করুন
    renderComponents();
}

function sortComponents() {
    switch (currentSort) {
        case 'name':
            filteredComponents.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'category':
            filteredComponents.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case 'popular':
            filteredComponents.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'complexity':
            filteredComponents.sort((a, b) => a.complexity - b.complexity);
            break;
    }
}

function renderComponents() {
    if (!componentsGrid) return;
    
    // পেজিনেশন ক্যালকুলেশন
    const totalPages = Math.ceil(filteredComponents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentComponents = filteredComponents.slice(startIndex, endIndex);
    
    // ক্লিয়ার গ্রিড
    componentsGrid.innerHTML = '';
    componentsGrid.className = `components-grid ${currentView}-view`;
    
    if (currentComponents.length === 0) {
        componentsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x"></i>
                <h3>কোন কম্পোনেন্ট পাওয়া যায়নি</h3>
                <p>অন্যান্য শব্দ দিয়ে আবার চেষ্টা করুন</p>
                <button class="btn btn-primary" onclick="resetAdvancedSearch()">সকল কম্পোনেন্ট দেখুন</button>
            </div>
        `;
        
        // পেজিনেশন হাইড করুন
        const pagination = document.getElementById('pagination');
        if (pagination) pagination.innerHTML = '';
        
        return;
    }
    
    // কম্পোনেন্ট কার্ড তৈরি করুন
    currentComponents.forEach(component => {
        const card = createComponentCard(component);
        componentsGrid.appendChild(card);
    });
    
    // পেজিনেশন রেন্ডার করুন
    renderPagination(totalPages);
}

function createComponentCard(component) {
    const card = document.createElement('div');
    card.className = 'component-card';
    card.setAttribute('data-id', component.id);
    
    const isFavorite = favorites.includes(component.id);
    
    // ট্যাগস স্টাইল করুন
    const tagsHTML = component.tags ? 
        component.tags.slice(0, 3).map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('') : '';
    
    // স্পেসিফিকেশনস স্টাইল করুন
    let specsHTML = '';
    if (component.specs) {
        if (component.specs.unit) {
            specsHTML += `
                <div class="spec-item">
                    <i class="fas fa-ruler"></i>
                    <span>${component.specs.unit}</span>
                </div>`;
        }
        
        if (component.specs.powerRating) {
            specsHTML += `
                <div class="spec-item">
                    <i class="fas fa-bolt"></i>
                    <span>${component.specs.powerRating}</span>
                </div>`;
        }
        
        if (component.specs.voltageRating) {
            specsHTML += `
                <div class="spec-item">
                    <i class="fas fa-bolt"></i>
                    <span>${component.specs.voltageRating}</span>
                </div>`;
        }
        
        specsHTML += `
            <div class="spec-item">
                <i class="fas fa-star"></i>
                <span>জনপ্রিয়তা: ${component.popularity}</span>
            </div>`;
    }
    
    card.innerHTML = `
        <div class="component-image" style="background: linear-gradient(135deg, ${component.color}44, ${component.color}88)">
            <i class="fas fa-${getComponentIcon(component)} fa-4x" style="color: ${component.color}"></i>
            <div class="component-badge">${component.category}</div>
        </div>
        <div class="component-content">
            <div class="component-header">
                <div class="component-category">${component.subcategory}</div>
                <h3 class="component-title">${component.name} ${component.bengaliName ? `(${component.bengaliName})` : ''}</h3>
                <div class="component-symbol">প্রতীক: ${component.symbol}</div>
            </div>
            <p class="component-description">${component.description}</p>
            
            <div class="component-specs">
                ${specsHTML}
            </div>
            
            <div class="component-footer">
                <div class="component-actions">
                    <button class="action-btn favorite ${isFavorite ? 'active' : ''}" title="ফেভারিটে যোগ করুন">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn share" title="শেয়ার করুন">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="action-btn details" title="বিস্তারিত দেখুন">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
                <div class="component-tags">
                    ${tagsHTML}
                </div>
            </div>
        </div>
    `;
    
    // ইভেন্ট লিসেনারস
    const detailsBtn = card.querySelector('.details');
    const favoriteBtn = card.querySelector('.favorite');
    const shareBtn = card.querySelector('.share');
    
    if (detailsBtn) {
        detailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showComponentDetails(component);
        });
    }
    
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(component.id, favoriteBtn);
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            shareComponent(component);
        });
    }
    
    card.addEventListener('click', () => {
        showComponentDetails(component);
    });
    
    return card;
}

function getComponentIcon(component) {
    const iconMap = {
        'প্যাসিভ': 'resistor',
        'সেমিকন্ডাক্টর': 'microchip',
        'ইন্টিগ্রেটেড সার্কিট': 'brain',
        'অপটোইলেকট্রনিক্স': 'lightbulb',
        'প্রোটেকশন': 'shield-alt'
    };
    
    return iconMap[component.category] || 'microchip';
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = `
        <button class="pagination-btn prev" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // পেজ নম্বর প্রদর্শন
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}">
                ${i}
            </button>
        `;
    }
    
    paginationHTML += `
        <button class="pagination-btn next" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
    
    // পেজিনেশন ইভেন্ট লিসেনারস
    const prevBtn = pagination.querySelector('.prev');
    const nextBtn = pagination.querySelector('.next');
    const pageBtns = pagination.querySelectorAll('.pagination-btn:not(.prev):not(.next)');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderComponents();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderComponents();
            }
        });
    }
    
    pageBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const pageNum = startPage + index;
            if (pageNum !== currentPage) {
                currentPage = pageNum;
                renderComponents();
            }
        });
    });
}

function initializeModal() {
    const modal = document.getElementById('componentModal');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal || !modalClose) return;
    
    // মডাল বন্ধ করুন
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // ব্যাকগ্রাউন্ডে ক্লিক করলে বন্ধ করুন
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // ESC কী প্রেস করলে বন্ধ করুন
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

function showComponentDetails(component) {
    const modal = document.getElementById('componentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    // যদি মডাল না থাকে, তাহলে তৈরি করুন
    if (!modal) {
        createModalElement();
    }
    
    // সাম্প্রতিক ভিউতে যোগ করুন
    addToRecentViews(component);
    
    // মডাল কন্টেন্ট তৈরি করুন
    modalTitle.textContent = `${component.name} ${component.bengaliName ? `(${component.bengaliName})` : ''}`;
    
    // স্পেসিফিকেশনস HTML তৈরি করুন
    let specsHTML = '';
    if (component.specs) {
        specsHTML = Object.entries(component.specs).map(([key, value]) => `
            <div class="spec-item">
                <div class="spec-key">${key.replace(/([A-Z])/g, ' $1')}:</div>
                <div class="spec-value">${value}</div>
            </div>
        `).join('');
    }
    
    // অ্যাপ্লিকেশনস HTML তৈরি করুন
    let applicationsHTML = '';
    if (component.applications && component.applications.length > 0) {
        applicationsHTML = `
            <div class="detail-applications">
                <h3><i class="fas fa-cogs"></i> অ্যাপ্লিকেশন</h3>
                <div class="applications-list">
                    ${component.applications.map(app => `
                        <div class="application-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${app}</span>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }
    
    // টাইপস HTML তৈরি করুন
    let typesHTML = '';
    if (component.types && component.types.length > 0) {
        typesHTML = `
            <div class="detail-types">
                <h3><i class="fas fa-layer-group"></i> প্রকারভেদ</h3>
                <div class="types-list">
                    ${component.types.map(type => `
                        <span class="type-item">${type}</span>
                    `).join('')}
                </div>
            </div>`;
    }
    
    // ফর্মুলাস HTML তৈরি করুন
    let formulasHTML = '';
    if (component.formulas && component.formulas.length > 0) {
        formulasHTML = `
            <div class="detail-formulas">
                <h3><i class="fas fa-calculator"></i> সূত্রসমূহ</h3>
                <div class="formulas-list">
                    ${component.formulas.map(formula => `
                        <div class="formula-item">
                            <div class="formula-name">${formula.name}</div>
                            <div class="formula">${formula.formula}</div>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }
    
    // উদাহরণস HTML তৈরি করুন
    let examplesHTML = '';
    if (component.examples && component.examples.length > 0) {
        examplesHTML = `
            <div class="detail-examples">
                <h3><i class="fas fa-code"></i> উদাহরণ</h3>
                <div class="examples-list">
                    ${component.examples.map(example => `
                        <div class="example-item">
                            <h4>${example.title}</h4>
                            <div class="example-circuit">
                                <code>${example.circuit}</code>
                            </div>
                            <div class="example-values">
                                <strong>মান:</strong> ${example.values}
                            </div>
                            <div class="example-calculation">
                                <strong>গণনা:</strong> ${example.calculation}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }
    
    // রিসোর্সেস HTML তৈরি করুন
    let resourcesHTML = '';
    if (component.datasheet) {
        resourcesHTML = `
            <div class="detail-resources">
                <h3><i class="fas fa-file-pdf"></i> রিসোর্স</h3>
                <a href="${component.datasheet}" target="_blank" class="btn btn-outline">
                    <i class="fas fa-download"></i> ডাটাশীট ডাউনলোড
                </a>
            </div>`;
    }
    
    modalBody.innerHTML = `
        <div class="component-detail-view">
            <div class="detail-header">
                <div class="detail-icon" style="background: linear-gradient(135deg, ${component.color}, ${component.color}88)">
                    <i class="fas fa-${getComponentIcon(component)} fa-3x"></i>
                </div>
                <div class="detail-info">
                    <div class="detail-category">${component.category} • ${component.subcategory}</div>
                    <h2>${component.name} ${component.bengaliName ? `(${component.bengaliName})` : ''}</h2>
                    <div class="detail-symbol">প্রতীক: <code>${component.symbol}</code></div>
                    <div class="detail-popularity">
                        <i class="fas fa-star"></i>
                        <span>জনপ্রিয়তা: ${component.popularity}/100</span>
                        <span class="detail-complexity">জটিলতা: ${component.complexity}/10</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-description">
                <h3><i class="fas fa-info-circle"></i> বিবরণ</h3>
                <p>${component.detailedDescription || component.description}</p>
            </div>
            
            ${specsHTML ? `
            <div class="detail-specs">
                <h3><i class="fas fa-sliders-h"></i> স্পেসিফিকেশন</h3>
                <div class="specs-grid">
                    ${specsHTML}
                </div>
            </div>` : ''}
            
            ${applicationsHTML}
            ${typesHTML}
            ${formulasHTML}
            ${examplesHTML}
            ${resourcesHTML}
            
            <div class="detail-footer">
                <button class="btn btn-primary" id="closeDetailBtn">
                    <i class="fas fa-times"></i> বন্ধ করুন
                </button>
            </div>
        </div>
    `;
    
    // মডাল দেখান
    modal.classList.add('active');
    
    // বন্ধ বাটন ইভেন্ট
    const closeBtn = modalBody.querySelector('#closeDetailBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
}

function createModalElement() {
    const modalHTML = `
        <div class="modal" id="componentModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle">কম্পোনেন্ট ডিটেইল</h2>
                    <button class="modal-close" id="modalClose">&times;</button>
                </div>
                <div class="modal-body" id="modalBody"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    initializeModal();
}

function toggleFavorite(componentId, button) {
    const index = favorites.indexOf(componentId);
    
    if (index === -1) {
        // ফেভারিটে যোগ করুন
        favorites.push(componentId);
        if (button) button.classList.add('active');
        showNotification('ফেভারিটে যোগ করা হয়েছে', 'success');
    } else {
        // ফেভারিট থেকে সরান
        favorites.splice(index, 1);
        if (button) button.classList.remove('active');
        showNotification('ফেভারিট থেকে সরানো হয়েছে', 'info');
    }
    
    // লোকাল স্টোরেজে সংরক্ষণ করুন
    localStorage.setItem('componentFavorites', JSON.stringify(favorites));
}

function shareComponent(component) {
    const shareData = {
        title: `${component.name} - ইলেকট্রনিক কম্পোনেন্ট`,
        text: `${component.name} ${component.bengaliName ? `(${component.bengaliName})` : ''} সম্পর্কে জানুন: ${component.description}`,
        url: window.location.href + `?component=${component.id}`
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showNotification('সফলভাবে শেয়ার করা হয়েছে', 'success'))
            .catch(err => showNotification('শেয়ার করতে সমস্যা হয়েছে', 'error'));
    } else {
        // Web Share API সাপোর্ট না করলে
        navigator.clipboard.writeText(shareData.url)
            .then(() => showNotification('লিঙ্ক কপি করা হয়েছে', 'success'))
            .catch(err => showNotification('কপি করতে সমস্যা হয়েছে', 'error'));
    }
}

function initializeRecentList() {
    const recentList = document.getElementById('recentList');
    if (!recentList) return;
    
    loadRecentViews();
}

function loadRecentViews() {
    const recentList = document.getElementById('recentList');
    if (!recentList) return;
    
    const recentViews = JSON.parse(localStorage.getItem('recentComponentViews')) || [];
    
    if (recentViews.length === 0) {
        recentList.innerHTML = '<p class="no-recent">কোন সাম্প্রতিক ভিউ নেই</p>';
        return;
    }
    
    recentList.innerHTML = '';
    
    // শুধুমাত্র শেষ ৫টি দেখান
    recentViews.slice(0, 5).forEach(view => {
        const component = componentsData.find(c => c.id === view.id);
        if (!component) return;
        
        const item = document.createElement('div');
        item.className = 'recent-item';
        item.innerHTML = `
            <div class="recent-icon" style="background-color: ${component.color}20; color: ${component.color}">
                <i class="fas fa-${getComponentIcon(component)}"></i>
            </div>
            <div class="recent-info">
                <div class="recent-name">${component.name}</div>
                <div class="recent-category">${component.category}</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            showComponentDetails(component);
        });
        
        recentList.appendChild(item);
    });
}

function addToRecentViews(component) {
    let recentViews = JSON.parse(localStorage.getItem('recentComponentViews')) || [];
    
    // ডুপ্লিকেট সরান
    recentViews = recentViews.filter(view => view.id !== component.id);
    
    // নতুন ভিউ যোগ করুন
    recentViews.unshift({
        id: component.id,
        timestamp: new Date().toISOString()
    });
    
    // শুধুমাত্র ১০টি সংরক্ষণ করুন
    recentViews = recentViews.slice(0, 10);
    
    localStorage.setItem('recentComponentViews', JSON.stringify(recentViews));
    
    // রিসেন্ট লিস্ট আপডেট করুন
    loadRecentViews();
}

// গ্লোবাল এক্সপোজ
window.ComponentsDB = {
    data: componentsData,
    categories: categories,
    filterComponents,
    showComponentDetails,
    showNotification
};

// CSS স্টাইলস
const componentsStyles = `
/* নোটিফিকেশন স্টাইল */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    max-width: 400px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.notification.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.notification.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.notification.warning {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
}

.notification.info {
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
}

.notification-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 18px;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.fade-out {
    animation: fadeOut 0.3s ease forwards;
}

@keyframes fadeOut {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(100%); }
}

/* মডাল স্টাইল */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal.active {
    display: flex;
}

.modal-content {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

.modal-header {
    padding: 20px 30px;
    background: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
    color: #1e293b;
}

.modal-close {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #64748b;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
}

.modal-close:hover {
    background: #e2e8f0;
    color: #475569;
}

.modal-body {
    padding: 30px;
    overflow-y: auto;
    max-height: calc(90vh - 80px);
}

/* কম্পোনেন্ট কার্ড স্টাইল */
.components-grid {
    display: grid;
    gap: 25px;
}

.components-grid.grid-view {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.components-grid.list-view {
    grid-template-columns: 1fr;
}

.component-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    cursor: pointer;
}

.component-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.component-image {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.component-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 12px;
    background: rgba(255,255,255,0.9);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #475569;
}

.component-content {
    padding: 20px;
}

.component-header {
    margin-bottom: 15px;
}

.component-category {
    font-size: 13px;
    color: #667eea;
    font-weight: 600;
    margin-bottom: 8px;
    display: inline-block;
    padding: 4px 10px;
    background: #f1f5f9;
    border-radius: 12px;
}

.component-title {
    font-size: 1.4rem;
    color: #1e293b;
    margin: 0 0 8px 0;
    line-height: 1.3;
}

.component-symbol {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 12px;
}

.component-description {
    color: #475569;
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 14px;
}

.component-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 20px;
}

.spec-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #f8fafc;
    border-radius: 8px;
    font-size: 12px;
    color: #475569;
}

.spec-item i {
    color: #667eea;
}

.component-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.component-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: #f1f5f9;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.action-btn:hover {
    background: #e2e8f0;
    color: #475569;
}

.action-btn.active {
    background: #ef4444;
    color: white;
}

.component-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.component-tags .tag {
    padding: 4px 10px;
    background: #f1f5f9;
    border-radius: 12px;
    font-size: 11px;
    color: #475569;
}

/* ট্যাগ ক্লাউড */
.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag-item {
    padding: 6px 14px;
    background: #f1f5f9;
    border-radius: 20px;
    font-size: 13px;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s;
}

.tag-item:hover {
    background: #e2e8f0;
    color: #475569;
}

.tag-item.active {
    background: #667eea;
    color: white;
}

/* ক্যাটাগরি লিস্ট */
.category-item {
    padding: 12px 20px;
    background: #f8fafc;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
}

.category-item:hover {
    background: #e2e8f0;
}

.category-item.active {
    background: #667eea;
    color: white;
}

.category-item.active i {
    color: white;
}

.category-count {
    font-size: 12px;
    background: rgba(255,255,255,0.2);
    padding: 2px 8px;
    border-radius: 10px;
}

/* নো রেজাল্টস */
.no-results {
    text-align: center;
    padding: 60px 20px;
    color: #64748b;
}

.no-results i {
    margin-bottom: 20px;
    color: #cbd5e1;
}

.no-recent {
    text-align: center;
    color: #94a3b8;
    font-style: italic;
    padding: 20px;
}

/* রিসেন্ট আইটেম */
.recent-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 15px;
    background: #f8fafc;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.2s;
}

.recent-item:hover {
    background: #e2e8f0;
}

.recent-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.recent-info {
    flex: 1;
}

.recent-name {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
}

.recent-category {
    font-size: 12px;
    color: #64748b;
}

/* পেজিনেশন */
.pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 40px;
}

.pagination-btn {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: white;
    color: #475569;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
    border-color: #667eea;
    color: #667eea;
}

.pagination-btn.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* ডিটেইল ভিউ স্টাইলস */
.component-detail-view {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.detail-header {
    display: flex;
    gap: 25px;
    align-items: center;
    padding-bottom: 25px;
    border-bottom: 2px solid #f1f5f9;
}

@media (max-width: 768px) {
    .detail-header {
        flex-direction: column;
        text-align: center;
    }
}

.detail-icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
}

.detail-info {
    flex: 1;
}

.detail-category {
    display: inline-block;
    padding: 6px 15px;
    background: #f1f5f9;
    border-radius: 20px;
    font-size: 14px;
    color: #64748b;
    margin-bottom: 10px;
}

.detail-header h2 {
    font-size: 2rem;
    color: #1e293b;
    margin-bottom: 10px;
}

.detail-symbol {
    font-size: 18px;
    color: #475569;
    margin-bottom: 15px;
}

.detail-symbol code {
    background: #f8fafc;
    padding: 4px 10px;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 16px;
}

.detail-popularity {
    display: flex;
    align-items: center;
    gap: 20px;
    color: #475569;
}

.detail-popularity i {
    color: #f59e0b;
}

.detail-complexity {
    padding: 4px 12px;
    background: #f1f5f9;
    border-radius: 12px;
    font-size: 14px;
}

.detail-description h3,
.detail-specs h3,
.detail-applications h3,
.detail-types h3,
.detail-formulas h3,
.detail-examples h3,
.detail-resources h3 {
    font-size: 1.4rem;
    color: #1e293b;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.detail-description p {
    line-height: 1.8;
    color: #475569;
    font-size: 16px;
}

/* স্পেসিফিকেশন গ্রিড */
.specs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.spec-item {
    background: #f8fafc;
    padding: 20px;
    border-radius: 12px;
    border-left: 4px solid #667eea;
}

.spec-key {
    font-weight: 600;
    color: #475569;
    margin-bottom: 5px;
    text-transform: capitalize;
}

.spec-value {
    color: #1e293b;
    font-size: 18px;
    font-weight: 600;
}

/* অ্যাপ্লিকেশন লিস্ট */
.applications-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
}

.application-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: #f0f9ff;
    border-radius: 10px;
    border-left: 4px solid #38bdf8;
}

.application-item i {
    color: #38bdf8;
}

/* টাইপস লিস্ট */
.types-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.type-item {
    padding: 10px 20px;
    background: #f1f5f9;
    border-radius: 20px;
    color: #475569;
    font-size: 14px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.type-item:hover {
    background: #e2e8f0;
    border-color: #667eea;
    color: #1e293b;
    transform: translateY(-2px);
}

/* ফর্মুলা লিস্ট */
.formulas-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.formula-item {
    background: #f8fafc;
    padding: 25px;
    border-radius: 15px;
    border: 2px solid #e2e8f0;
}

.formula-name {
    font-weight: 600;
    color: #475569;
    margin-bottom: 10px;
    font-size: 16px;
}

.formula {
    font-family: 'Courier New', monospace;
    font-size: 24px;
    color: #1e293b;
    padding: 15px;
    background: white;
    border-radius: 10px;
    text-align: center;
    border: 2px dashed #cbd5e1;
}

/* উদাহরণ লিস্ট */
.examples-list {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.example-item {
    background: #f8fafc;
    padding: 25px;
    border-radius: 15px;
    border: 2px solid #e2e8f0;
}

.example-item h4 {
    font-size: 1.2rem;
    color: #1e293b;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.example-item h4:before {
    content: '📋';
    font-size: 1.5rem;
}

.example-circuit {
    margin-bottom: 15px;
}

.example-circuit code {
    display: block;
    padding: 15px;
    background: white;
    border-radius: 10px;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    color: #1e293b;
    border-left: 4px solid #10b981;
}

.example-values,
.example-calculation {
    margin-bottom: 10px;
    color: #475569;
}

.example-values strong,
.example-calculation strong {
    color: #1e293b;
}

/* রিসোর্সস */
.detail-resources {
    padding: 25px;
    background: #f0f9ff;
    border-radius: 15px;
    text-align: center;
}

.detail-footer {
    display: flex;
    justify-content: center;
    padding-top: 25px;
    border-top: 2px solid #f1f5f9;
}

/* এডভান্সড সার্চ মডাল */
.advanced-search-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.advanced-search-modal.active {
    display: flex;
}

.advanced-search-content {
    background: white;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.advanced-search-content h3 {
    margin-top: 0;
    margin-bottom: 25px;
    color: #1e293b;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 15px;
}

.advanced-search-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
}

.advanced-search-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.advanced-search-field label {
    font-weight: 600;
    color: #475569;
    font-size: 14px;
}

.advanced-search-field input,
.advanced-search-field select {
    padding: 12px 15px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s;
}

.advanced-search-field input:focus,
.advanced-search-field select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.advanced-search-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
    padding-top: 25px;
    border-top: 2px solid #f1f5f9;
}
`;

// CSS ইনজেক্ট করুন
const styleSheet = document.createElement('style');
styleSheet.textContent = componentsStyles;
document.head.appendChild(styleSheet);