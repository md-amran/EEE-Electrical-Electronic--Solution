// IoT ড্যাশবোর্ড সিস্টেম

// গ্লোবাল ভ্যারিয়েবলস
let mqttClient = null;
let isConnected = false;
let projects = [];
let devices = [];
let currentProject = null;
let dataChart = null;
let realtimeData = [];
let activityLog = [];

// ডেমো ডেটা
const demoProjects = [
    {
        id: 'project-1',
        name: 'স্মার্ট হোম অটোমেশন',
        description: 'বাসার সকল ডিভাইসের IoT কন্ট্রোল সিস্টেম',
        type: 'home-automation',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        devices: ['device-1', 'device-2', 'device-3'],
        created: '2023-10-01',
        status: 'active'
    },
    {
        id: 'project-2',
        name: 'পরিবেশ মনিটরিং',
        description: 'বায়ুর গুণমান এবং আবহাওয়া মনিটরিং সিস্টেম',
        type: 'environment',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w-400',
        devices: ['device-4'],
        created: '2023-10-15',
        status: 'active'
    }
];

const demoDevices = [
    {
        id: 'device-1',
        name: 'লিভিং রুম তাপমাত্রা',
        type: 'temperature',
        deviceId: 'DHT22_001',
        topic: 'eehub/home/livingroom/temperature',
        pin: 2,
        projectId: 'project-1',
        status: 'online',
        value: 25.5,
        unit: '°C',
        lastUpdate: new Date().toISOString()
    },
    {
        id: 'device-2',
        name: 'বেডরুম লাইট',
        type: 'led',
        deviceId: 'LED_001',
        topic: 'eehub/home/bedroom/light',
        pin: 13,
        projectId: 'project-1',
        status: 'online',
        value: 1,
        unit: '',
        lastUpdate: new Date().toISOString()
    },
    {
        id: 'device-3',
        name: 'ফ্রন্ট ডোর মোশন',
        type: 'motion',
        deviceId: 'PIR_001',
        topic: 'eehub/home/entrance/motion',
        pin: 7,
        projectId: 'project-1',
        status: 'online',
        value: 0,
        unit: '',
        lastUpdate: new Date().toISOString()
    },
    {
        id: 'device-4',
        name: 'আউটডোর আর্দ্রতা',
        type: 'humidity',
        deviceId: 'DHT22_002',
        topic: 'eehub/garden/humidity',
        pin: 3,
        projectId: 'project-2',
        status: 'offline',
        value: 65,
        unit: '%',
        lastUpdate: '2023-10-20T10:00:00Z'
    },
    {
        id: 'device-5',
        name: 'সোলার প্যানেল ভোল্টেজ',
        type: 'voltage',
        deviceId: 'VOLT_001',
        topic: 'eehub/solar/voltage',
        pin: 'A0',
        projectId: 'project-1',
        status: 'online',
        value: 12.3,
        unit: 'V',
        lastUpdate: new Date().toISOString()
    }
];

// ইনিশিয়ালাইজেশন
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadDemoData();
    initializeCharts();
    initializeEventListeners();
    updateDashboardStats();
    
    // চেক লগইন স্ট্যাটাস
    checkAuthStatus();
});

// ড্যাশবোর্ড ইনিশিয়ালাইজ
function initializeDashboard() {
    // লোড করা ডেটা
    projects = JSON.parse(localStorage.getItem('eehub_projects')) || [];
    devices = JSON.parse(localStorage.getItem('eehub_devices')) || [];
    activityLog = JSON.parse(localStorage.getItem('eehub_activity')) || [];
    
    // যদি ডেটা না থাকে, ডেমো ডেটা লোড করুন
    if (projects.length === 0) {
        projects = demoProjects;
    }
    if (devices.length === 0) {
        devices = demoDevices;
    }
    if (activityLog.length === 0) {
        activityLog = generateDemoActivity();
    }
}

function loadDemoData() {
    // UI আপডেট করুন
    updateProjectList();
    updateDeviceList();
    updateActiveProject();
    updateControlsGrid();
    updateNotifications();
    updateActivityLog();
    updateRealtimeData();
}

// চার্ট ইনিশিয়ালাইজ
function initializeCharts() {
    const ctx = document.getElementById('dataChart').getContext('2d');
    
    dataChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: generateTimeLabels('1h'),
            datasets: [{
                label: 'তাপমাত্রা (°C)',
                data: generateSampleData(),
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function generateTimeLabels(range) {
    const labels = [];
    let count = 12;
    
    for (let i = count - 1; i >= 0; i--) {
        const date = new Date();
        date.setMinutes(date.getMinutes() - i * 5);
        labels.push(date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
    }
    
    return labels;
}

function generateSampleData() {
    const data = [];
    for (let i = 0; i < 12; i++) {
        data.push(Math.random() * 10 + 20); // 20-30°C
    }
    return data;
}

// ইভেন্ট লিসেনার ইনিশিয়ালাইজ
function initializeEventListeners() {
    // MQTT কানেকশন
    document.getElementById('connectBtn').addEventListener('click', toggleMQTTConnection);
    
    // প্রোজেক্ট অ্যাকশনস
    document.getElementById('newProjectBtn').addEventListener('click', showProjectModal);
    document.getElementById('addProjectBtn').addEventListener('click', showProjectModal);
    
    // ডিভাইস অ্যাকশনস
    document.getElementById('addDeviceBtn').addEventListener('click', showDeviceModal);
    
    // রিফ্রেশ
    document.getElementById('refreshBtn').addEventListener('click', refreshDashboard);
    
    // সেটিংস
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
    
    // চার্ট কন্ট্রোলস
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const chartType = this.getAttribute('data-chart');
            switchChartType(chartType);
        });
    });
    
    document.getElementById('chartMetric').addEventListener('change', updateChartData);
    document.getElementById('chartTime').addEventListener('change', updateChartData);
    document.getElementById('exportChartBtn').addEventListener('click', exportChart);
    
    // রিয়েল-টাইম ডাটা
    document.getElementById('pauseStreamBtn').addEventListener('click', toggleDataStream);
    
    // ফুটার অ্যাকশনস
    document.getElementById('helpBtn').addEventListener('click', showHelp);
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
    
    // মডাল কন্ট্রোলস
    document.querySelectorAll('.modal-close, #cancelProjectBtn, #cancelDeviceBtn').forEach(btn => {
        btn.addEventListener('click', hideModals);
    });
    
    document.getElementById('saveProjectBtn').addEventListener('click', saveProject);
    document.getElementById('saveDeviceBtn').addEventListener('click', saveDevice);
    
    // মডাল ব্যাকগ্রাউন্ড ক্লিক
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModals();
            }
        });
    });
    
    // ফিল্টারস
    document.getElementById('filterStatus').addEventListener('change', filterDevices);
    document.getElementById('filterType').addEventListener('change', filterDevices);
}

// MQTT কানেকশন
async function toggleMQTTConnection() {
    const connectBtn = document.getElementById('connectBtn');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('#mqttStatus span');
    
    if (!isConnected) {
        // কানেক্ট করুন
        connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> কানেক্ট হচ্ছে...';
        connectBtn.disabled = true;
        
        try {
            await connectToMQTT();
            isConnected = true;
            
            statusDot.classList.add('connected');
            statusText.textContent = 'MQTT কানেক্টেড';
            connectBtn.innerHTML = '<i class="fas fa-plug"></i> ডিসকানেক্ট';
            
            showNotification('MQTT ব্রোকারে সফলভাবে কানেক্টেড', 'success');
            addActivity('MQTT ব্রোকারে কানেক্ট করা হয়েছে');
        } catch (error) {
            showNotification(`MQTT কানেকশন ব্যর্থ: ${error.message}`, 'error');
            connectBtn.innerHTML = '<i class="fas fa-plug"></i> কানেক্ট';
        } finally {
            connectBtn.disabled = false;
        }
    } else {
        // ডিসকানেক্ট করুন
        disconnectFromMQTT();
        isConnected = false;
        
        statusDot.classList.remove('connected');
        statusText.textContent = 'MQTT ডিসকানেক্টেড';
        connectBtn.innerHTML = '<i class="fas fa-plug"></i> কানেক্ট';
        
        showNotification('MQTT ব্রোকার থেকে ডিসকানেক্টেড', 'info');
        addActivity('MQTT ব্রোকার থেকে ডিসকানেক্ট করা হয়েছে');
    }
}

async function connectToMQTT() {
    const brokerUrl = document.getElementById('mqttBroker').value;
    
    // WebSocket MQTT কানেকশন
    const clientId = 'eehub_' + Math.random().toString(16).substr(2, 8);
    
    return new Promise((resolve, reject) => {
        try {
            mqttClient = mqtt.connect(brokerUrl, {
                clientId: clientId,
                clean: true,
                connectTimeout: 4000,
                reconnectPeriod: 1000,
            });
            
            mqttClient.on('connect', () => {
                console.log('MQTT কানেক্টেড');
                
                // ডিভাইস টপিকস সাবস্ক্রাইব করুন
                devices.forEach(device => {
                    if (device.topic) {
                        mqttClient.subscribe(device.topic, (err) => {
                            if (!err) {
                                console.log(`সাবস্ক্রাইব করা হয়েছে: ${device.topic}`);
                            }
                        });
                    }
                });
                
                resolve();
            });
            
            mqttClient.on('message', (topic, message) => {
                handleMQTTMessage(topic, message.toString());
            });
            
            mqttClient.on('error', (err) => {
                reject(err);
            });
            
            mqttClient.on('close', () => {
                console.log('MQTT কানেকশন বন্ধ');
            });
            
        } catch (error) {
            reject(error);
        }
    });
}

function disconnectFromMQTT() {
    if (mqttClient) {
        mqttClient.end();
        mqttClient = null;
    }
}

function handleMQTTMessage(topic, message) {
    console.log(`MQTT মেসেজ: ${topic} -> ${message}`);
    
    // ডিভাইস খুঁজুন
    const device = devices.find(d => d.topic === topic);
    if (device) {
        // ডিভাইস ভ্যালু আপডেট করুন
        try {
            const data = JSON.parse(message);
            device.value = data.value || parseFloat(message);
            device.lastUpdate = new Date().toISOString();
            
            // UI আপডেট করুন
            updateDeviceStatus(device.id);
            updateControlsGrid();
            addRealtimeData(device, device.value);
            updateDashboardStats();
            
            // নোটিফিকেশন (যদি থ্রেশহোল্ড ক্রস করে)
            checkThresholds(device);
        } catch (error) {
            device.value = parseFloat(message) || message;
        }
    }
}

// প্রোজেক্ট ম্যানেজমেন্ট
function updateProjectList() {
    const projectList = document.getElementById('projectList');
    if (!projectList) return;
    
    projectList.innerHTML = '';
    
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = `project-item ${project.id === (currentProject?.id || projects[0]?.id) ? 'active' : ''}`;
        projectItem.setAttribute('data-project-id', project.id);
        
        projectItem.innerHTML = `
            <div class="project-icon">
                <i class="fas fa-project-diagram"></i>
            </div>
            <div class="project-info">
                <div class="project-name">${project.name}</div>
                <div class="project-stats">
                    <span><i class="fas fa-microchip"></i> ${project.devices?.length || 0}</span>
                    <span><i class="fas fa-wifi"></i> ${getOnlineDevicesCount(project.id)}</span>
                </div>
            </div>
        `;
        
        projectItem.addEventListener('click', () => {
            selectProject(project.id);
        });
        
        projectList.appendChild(projectItem);
    });
}

function selectProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    currentProject = project;
    
    // UI আপডেট করুন
    updateProjectList();
    updateActiveProject();
    updateDeviceList();
    updateControlsGrid();
    
    addActivity(`প্রোজেক্ট সিলেক্ট করা হয়েছে: ${project.name}`);
}

function updateActiveProject() {
    const activeProjectDiv = document.getElementById('activeProject');
    if (!activeProjectDiv) return;
    
    const project = currentProject || projects[0];
    if (!project) {
        activeProjectDiv.innerHTML = `
            <div class="no-project">
                <i class="fas fa-project-diagram fa-3x"></i>
                <h3>কোন প্রোজেক্ট নেই</h3>
                <p>নতুন প্রোজেক্ট তৈরি শুরু করুন</p>
                <button class="btn btn-primary" id="createFirstProjectBtn">
                    <i class="fas fa-plus"></i> প্রথম প্রোজেক্ট তৈরি করুন
                </button>
            </div>
        `;
        
        document.getElementById('createFirstProjectBtn')?.addEventListener('click', showProjectModal);
        return;
    }
    
    const projectDevices = devices.filter(d => d.projectId === project.id);
    const onlineDevices = projectDevices.filter(d => d.status === 'online').length;
    
    activeProjectDiv.innerHTML = `
        <div class="project-header">
            <div class="project-title">
                <h2>${project.name}</h2>
                <p class="project-description">${project.description}</p>
            </div>
            <div class="project-actions">
                <button class="btn btn-sm btn-outline" data-action="edit">
                    <i class="fas fa-edit"></i> এডিট
                </button>
                <button class="btn btn-sm btn-outline" data-action="share">
                    <i class="fas fa-share-alt"></i> শেয়ার
                </button>
            </div>
        </div>
        
        <div class="project-metrics">
            <div class="metric-item">
                <div class="metric-value">${projectDevices.length}</div>
                <div class="metric-label">মোট ডিভাইস</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">${onlineDevices}</div>
                <div class="metric-label">অনলাইন</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">${getProjectDataPoints(project.id)}</div>
                <div class="metric-label">ডাটা পয়েন্ট</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">${project.type === 'home-automation' ? 'হোম' : 
                                           project.type === 'industrial' ? 'ইন্ডাস্ট্রি' : 
                                           project.type === 'agriculture' ? 'কৃষি' : 
                                           project.type === 'environment' ? 'পরিবেশ' : 'এনার্জি'}</div>
                <div class="metric-label">টাইপ</div>
            </div>
        </div>
    `;
    
    // ইভেন্ট লিসেনারস
    activeProjectDiv.querySelector('[data-action="edit"]')?.addEventListener('click', () => {
        editProject(project.id);
    });
    
    activeProjectDiv.querySelector('[data-action="share"]')?.addEventListener('click', () => {
        shareProject(project.id);
    });
}

function getOnlineDevicesCount(projectId) {
    return devices.filter(d => d.projectId === projectId && d.status === 'online').length;
}

function getProjectDataPoints(projectId) {
    const projectDevices = devices.filter(d => d.projectId === projectId);
    return projectDevices.reduce((total, device) => total + (device.value ? 1 : 0), 0);
}

// ডিভাইস ম্যানেজমেন্ট
function updateDeviceList() {
    const deviceList = document.getElementById('deviceList');
    if (!deviceList) return;
    
    deviceList.innerHTML = '';
    
    let filteredDevices = devices;
    const statusFilter = document.getElementById('filterStatus').value;
    const typeFilter = document.getElementById('filterType').value;
    
    if (statusFilter !== 'all') {
        filteredDevices = filteredDevices.filter(d => d.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
        filteredDevices = filteredDevices.filter(d => d.type === typeFilter);
    }
    
    // বর্তমান প্রোজেক্টের ডিভাইসগুলো দেখান
    if (currentProject) {
        filteredDevices = filteredDevices.filter(d => d.projectId === currentProject.id);
    }
    
    filteredDevices.forEach(device => {
        const deviceItem = document.createElement('div');
        deviceItem.className = `device-item ${device.status}`;
        deviceItem.setAttribute('data-device-id', device.id);
        
        const iconClass = getDeviceIconClass(device.type);
        
        deviceItem.innerHTML = `
            <div class="device-icon ${device.type}">
                <i class="${iconClass}"></i>
            </div>
            <div class="device-info">
                <div class="device-name">${device.name}</div>
                <div class="device-status ${device.status}">
                    <i class="fas fa-circle"></i>
                    ${device.status === 'online' ? 'অনলাইন' : 
                      device.status === 'offline' ? 'অফলাইন' : 'সতর্কতা'}
                </div>
            </div>
        `;
        
        deviceItem.addEventListener('click', () => {
            selectDevice(device.id);
        });
        
        deviceList.appendChild(deviceItem);
    });
}

function getDeviceIconClass(type) {
    const iconMap = {
        'temperature': 'fas fa-thermometer-half',
        'humidity': 'fas fa-tint',
        'motion': 'fas fa-running',
        'light': 'fas fa-lightbulb',
        'relay': 'fas fa-toggle-on',
        'led': 'fas fa-lightbulb',
        'servo': 'fas fa-cog',
        'voltage': 'fas fa-bolt',
        'current': 'fas fa-bolt'
    };
    
    return iconMap[type] || 'fas fa-microchip';
}

function selectDevice(deviceId) {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;
    
    // ডিভাইস ডিটেইলস দেখান (সিমুলেশন)
    showDeviceDetails(device);
}

function showDeviceDetails(device) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="${getDeviceIconClass(device.type)}"></i> ${device.name}</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="device-details">
                    <div class="detail-row">
                        <span class="detail-label">ডিভাইস ID:</span>
                        <span class="detail-value">${device.deviceId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">টপিক:</span>
                        <span class="detail-value">${device.topic}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">পিন:</span>
                        <span class="detail-value">${device.pin}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">বর্তমান মান:</span>
                        <span class="detail-value">${device.value} ${device.unit}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">সর্বশেষ আপডেট:</span>
                        <span class="detail-value">${new Date(device.lastUpdate).toLocaleString()}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">স্ট্যাটাস:</span>
                        <span class="detail-value ${device.status}">${device.status}</span>
                    </div>
                </div>
                
                <div class="device-controls">
                    <h4><i class="fas fa-sliders-h"></i> কন্ট্রোল</h4>
                    ${device.type === 'led' || device.type === 'relay' ? `
                    <div class="control-buttons">
                        <button class="btn btn-primary" data-action="on">
                            <i class="fas fa-power-off"></i> ON
                        </button>
                        <button class="btn btn-outline" data-action="off">
                            <i class="fas fa-power-off"></i> OFF
                        </button>
                    </div>
                    ` : device.type === 'servo' ? `
                    <div class="control-slider">
                        <label>অ্যাঙ্গেল: <span id="servoAngle">90</span>°</label>
                        <input type="range" min="0" max="180" value="90" class="slider" id="servoSlider">
                    </div>
                    ` : `
                    <p>এই ডিভাইসটি রিড-অনলি</p>
                    `}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" data-action="close">বন্ধ করুন</button>
                <button class="btn btn-primary" data-action="edit">এডিট করুন</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // ইভেন্ট লিসেনারস
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('[data-action="close"]').addEventListener('click', () => modal.remove());
    modal.querySelector('[data-action="edit"]').addEventListener('click', () => {
        modal.remove();
        editDevice(device.id);
    });
    
    // কন্ট্রোল ইভেন্টস
    if (device.type === 'led' || device.type === 'relay') {
        modal.querySelector('[data-action="on"]').addEventListener('click', () => {
            sendDeviceCommand(device, 'ON');
            showNotification(`${device.name} চালু করা হয়েছে`, 'success');
        });
        
        modal.querySelector('[data-action="off"]').addEventListener('click', () => {
            sendDeviceCommand(device, 'OFF');
            showNotification(`${device.name} বন্ধ করা হয়েছে`, 'success');
        });
    }
    
    if (device.type === 'servo') {
        const slider = modal.querySelector('#servoSlider');
        const angleDisplay = modal.querySelector('#servoAngle');
        
        slider.addEventListener('input', function() {
            angleDisplay.textContent = this.value;
        });
        
        slider.addEventListener('change', function() {
            sendDeviceCommand(device, `ANGLE:${this.value}`);
            showNotification(`${device.name} অ্যাঙ্গেল সেট: ${this.value}°`, 'success');
        });
    }
    
    // মডাল ব্যাকগ্রাউন্ড ক্লিক
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            modal.remove();
        }
    });
}

function sendDeviceCommand(device, command) {
    if (mqttClient && isConnected) {
        const topic = `${device.topic}/control`;
        const message = JSON.stringify({
            command: command,
            timestamp: new Date().toISOString()
        });
        
        mqttClient.publish(topic, message);
        addActivity(`ডিভাইস কমান্ড পাঠানো হয়েছে: ${device.name} -> ${command}`);
    } else {
        showNotification('MQTT কানেক্ট নয়', 'warning');
        // সিমুলেটেড রেসপন্স
        simulateDeviceResponse(device, command);
    }
}

function simulateDeviceResponse(device, command) {
    setTimeout(() => {
        if (command === 'ON') {
            device.value = 1;
        } else if (command === 'OFF') {
            device.value = 0;
        } else if (command.startsWith('ANGLE:')) {
            const angle = parseInt(command.split(':')[1]);
            device.value = angle;
        }
        
        device.lastUpdate = new Date().toISOString();
        updateDeviceStatus(device.id);
        updateControlsGrid();
        addRealtimeData(device, device.value);
        
        showNotification(`${device.name} কমান্ড গ্রহণ করেছে`, 'success');
    }, 500);
}

function updateDeviceStatus(deviceId) {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;
    
    // স্ট্যাটাস আপডেট করুন
    const now = new Date();
    const lastUpdate = new Date(device.lastUpdate);
    const diffMinutes = (now - lastUpdate) / (1000 * 60);
    
    if (diffMinutes > 5) {
        device.status = 'offline';
    } else {
        device.status = 'online';
    }
    
    // UI আপডেট করুন
    updateDeviceList();
}

function filterDevices() {
    updateDeviceList();
}

// কন্ট্রোল প্যানেল
function updateControlsGrid() {
    const controlsGrid = document.getElementById('controlsGrid');
    if (!controlsGrid) return;
    
    controlsGrid.innerHTML = '';
    
    let projectDevices = devices;
    if (currentProject) {
        projectDevices = devices.filter(d => d.projectId === currentProject.id);
    }
    
    // শুধুমাত্র কন্ট্রোলযোগ্য ডিভাইস
    const controllableDevices = projectDevices.filter(d => 
        d.type === 'led' || d.type === 'relay' || d.type === 'servo' || 
        d.type === 'temperature' || d.type === 'humidity'
    );
    
    controllableDevices.forEach(device => {
        const controlCard = createControlCard(device);
        controlsGrid.appendChild(controlCard);
    });
    
    if (controllableDevices.length === 0) {
        controlsGrid.innerHTML = `
            <div class="no-controls">
                <i class="fas fa-sliders-h fa-3x"></i>
                <h3>কোন কন্ট্রোলযোগ্য ডিভাইস নেই</h3>
                <p>নতুন ডিভাইস যোগ করুন</p>
            </div>
        `;
    }
}

function createControlCard(device) {
    const card = document.createElement('div');
    card.className = 'control-card';
    card.setAttribute('data-device-id', device.id);
    
    let controlBody = '';
    let controlActions = '';
    
    if (device.type === 'led' || device.type === 'relay') {
        const isOn = device.value === 1;
        controlBody = `
            <div class="control-value">${isOn ? 'ON' : 'OFF'}</div>
        `;
        controlActions = `
            <button class="control-btn ${isOn ? 'on' : ''}" data-action="toggle">
                ${isOn ? 'ON' : 'OFF'}
            </button>
            <button class="control-btn" data-action="settings">
                <i class="fas fa-cog"></i>
            </button>
        `;
    } else if (device.type === 'servo') {
        controlBody = `
            <div class="control-value">${device.value || 0}°</div>
            <input type="range" min="0" max="180" value="${device.value || 90}" 
                   class="control-slider" data-action="slider">
        `;
        controlActions = `
            <button class="control-btn" data-action="center">
                <i class="fas fa-undo"></i>
            </button>
        `;
    } else if (device.type === 'temperature' || device.type === 'humidity') {
        controlBody = `
            <div class="control-value">${device.value || 0}${device.unit}</div>
            <div class="control-range">
                <span class="range-min">${getMinValue(device.type)}</span>
                <input type="range" min="${getMinValue(device.type)}" 
                       max="${getMaxValue(device.type)}" value="${device.value || 0}" 
                       class="control-slider" data-action="threshold" disabled>
                <span class="range-max">${getMaxValue(device.type)}</span>
            </div>
        `;
        controlActions = `
            <button class="control-btn" data-action="chart">
                <i class="fas fa-chart-line"></i>
            </button>
        `;
    }
    
    card.innerHTML = `
        <div class="control-header">
            <div class="control-title">${device.name}</div>
            <div class="control-status ${device.value === 1 ? 'on' : 'off'}">
                ${device.status === 'online' ? 'অনলাইন' : 'অফলাইন'}
            </div>
        </div>
        <div class="control-body">
            ${controlBody}
        </div>
        <div class="control-actions">
            ${controlActions}
        </div>
    `;
    
    // ইভেন্ট লিসেনারস
    const toggleBtn = card.querySelector('[data-action="toggle"]');
    const slider = card.querySelector('[data-action="slider"]');
    const centerBtn = card.querySelector('[data-action="center"]');
    const chartBtn = card.querySelector('[data-action="chart"]');
    const settingsBtn = card.querySelector('[data-action="settings"]');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newState = device.value === 1 ? 'OFF' : 'ON';
            sendDeviceCommand(device, newState);
        });
    }
    
    if (slider) {
        slider.addEventListener('input', function() {
            card.querySelector('.control-value').textContent = this.value + '°';
        });
        
        slider.addEventListener('change', function() {
            sendDeviceCommand(device, `ANGLE:${this.value}`);
        });
    }
    
    if (centerBtn) {
        centerBtn.addEventListener('click', () => {
            sendDeviceCommand(device, 'ANGLE:90');
            card.querySelector('.control-slider').value = 90;
            card.querySelector('.control-value').textContent = '90°';
        });
    }
    
    if (chartBtn) {
        chartBtn.addEventListener('click', () => {
            showDeviceChart(device);
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showDeviceDetails(device);
        });
    }
    
    return card;
}

function getMinValue(type) {
    switch(type) {
        case 'temperature': return -10;
        case 'humidity': return 0;
        case 'voltage': return 0;
        case 'current': return 0;
        default: return 0;
    }
}

function getMaxValue(type) {
    switch(type) {
        case 'temperature': return 50;
        case 'humidity': return 100;
        case 'voltage': return 24;
        case 'current': return 10;
        default: return 100;
    }
}

function showDeviceChart(device) {
    // ডিভাইসের জন্য চার্ট দেখান
    const chartModal = document.createElement('div');
    chartModal.className = 'modal active';
    
    const ctxId = 'deviceChart_' + Math.random().toString(36).substr(2, 9);
    
    chartModal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h3><i class="${getDeviceIconClass(device.type)}"></i> ${device.name} - ডাটা ট্রেন্ড</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="chart-container" style="height: 400px;">
                    <canvas id="${ctxId}"></canvas>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" data-action="close">বন্ধ করুন</button>
                <button class="btn btn-primary" data-action="export">
                    <i class="fas fa-download"></i> এক্সপোর্ট
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chartModal);
    
    // চার্ট তৈরি করুন
    setTimeout(() => {
        const ctx = document.getElementById(ctxId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: generateTimeLabels('24h'),
                datasets: [{
                    label: `${device.name} (${device.unit})`,
                    data: generateDeviceData(device),
                    borderColor: getDeviceColor(device.type),
                    backgroundColor: getDeviceColor(device.type) + '20',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `${device.name} - 24 ঘন্টার ডাটা`
                    }
                }
            }
        });
    }, 100);
    
    // ইভেন্ট লিসেনারস
    chartModal.querySelector('.modal-close').addEventListener('click', () => chartModal.remove());
    chartModal.querySelector('[data-action="close"]').addEventListener('click', () => chartModal.remove());
    chartModal.querySelector('[data-action="export"]').addEventListener('click', () => {
        exportDeviceData(device);
    });
    
    chartModal.addEventListener('click', function(e) {
        if (e.target === this) {
            chartModal.remove();
        }
    });
}

function getDeviceColor(type) {
    const colorMap = {
        'temperature': '#ef4444',
        'humidity': '#3b82f6',
        'motion': '#10b981',
        'light': '#f59e0b',
        'relay': '#8b5cf6',
        'led': '#ec4899',
        'servo': '#14b8a6',
        'voltage': '#f97316',
        'current': '#84cc16'
    };
    
    return colorMap[type] || '#64748b';
}

function generateDeviceData(device) {
    const data = [];
    for (let i = 0; i < 24; i++) {
        if (device.type === 'temperature') {
            data.push(Math.random() * 10 + 20); // 20-30°C
        } else if (device.type === 'humidity') {
            data.push(Math.random() * 30 + 40); // 40-70%
        } else if (device.type === 'voltage') {
            data.push(Math.random() * 5 + 10); // 10-15V
        } else {
            data.push(Math.random() * 100);
        }
    }
    return data;
}

function exportDeviceData(device) {
    const data = {
        device: device.name,
        type: device.type,
        unit: device.unit,
        timestamp: new Date().toISOString(),
        data: generateDeviceData(device)
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${device.name}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('ডিভাইস ডাটা এক্সপোর্ট করা হয়েছে', 'success');
}

// চার্ট ম্যানেজমেন্ট
function switchChartType(chartType) {
    // ট্যাব সক্রিয় করুন
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tab-btn[data-chart="${chartType}"]`).classList.add('active');
    
    // চার্ট টাইপ পরিবর্তন করুন
    if (dataChart) {
        dataChart.destroy();
    }
    
    const ctx = document.getElementById('dataChart').getContext('2d');
    let chartConfig;
    
    switch(chartType) {
        case 'line':
            chartConfig = getLineChartConfig();
            break;
        case 'bar':
            chartConfig = getBarChartConfig();
            break;
        case 'gauge':
            chartConfig = getGaugeChartConfig();
            break;
        case 'map':
            // ম্যাপ ভিউ (সিমুলেশন)
            showMapView();
            return;
    }
    
    dataChart = new Chart(ctx, chartConfig);
}

function getLineChartConfig() {
    return {
        type: 'line',
        data: {
            labels: generateTimeLabels('1h'),
            datasets: [{
                label: 'তাপমাত্রা (°C)',
                data: generateSampleData(),
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: getChartOptions()
    };
}

function getBarChartConfig() {
    return {
        type: 'bar',
        data: {
            labels: ['সেন্সর 1', 'সেন্সর 2', 'সেন্সর 3', 'সেন্সর 4', 'সেন্সর 5'],
            datasets: [{
                label: 'বর্তমান মান',
                data: [25.5, 65, 12.3, 0, 1],
                backgroundColor: [
                    '#ef4444',
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#8b5cf6'
                ],
                borderWidth: 1
            }]
        },
        options: getChartOptions()
    };
}

function getGaugeChartConfig() {
    return {
        type: 'doughnut',
        data: {
            labels: ['অনলাইন', 'অফলাইন', 'সতর্কতা'],
            datasets: [{
                data: [3, 1, 0],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                borderWidth: 2,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}টি ডিভাইস`;
                        }
                    }
                }
            }
        }
    };
}

function getChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            y: {
                beginAtZero: false,
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        }
    };
}

function showMapView() {
    const chartContainer = document.querySelector('.chart-container');
    chartContainer.innerHTML = `
        <div class="map-view">
            <div class="map-grid">
                <div class="map-node" style="top: 20%; left: 30%;" data-device="device-1">
                    <div class="node-icon temperature">
                        <i class="fas fa-thermometer-half"></i>
                    </div>
                    <div class="node-info">
                        <div class="node-name">লিভিং রুম</div>
                        <div class="node-value">25.5°C</div>
                    </div>
                </div>
                <div class="map-node" style="top: 40%; left: 60%;" data-device="device-2">
                    <div class="node-icon led">
                        <i class="fas fa-lightbulb"></i>
                    </div>
                    <div class="node-info">
                        <div class="node-name">বেডরুম লাইট</div>
                        <div class="node-value">ON</div>
                    </div>
                </div>
                <div class="map-node" style="top: 70%; left: 40%;" data-device="device-3">
                    <div class="node-icon motion">
                        <i class="fas fa-running"></i>
                    </div>
                    <div class="node-info">
                        <div class="node-name">ফ্রন্ট ডোর</div>
                        <div class="node-value">No Motion</div>
                    </div>
                </div>
                <div class="map-connections">
                    <div class="connection-line" style="top: 25%; left: 35%; width: 100px; transform: rotate(30deg);"></div>
                    <div class="connection-line" style="top: 45%; left: 65%; width: 80px; transform: rotate(-45deg);"></div>
                </div>
            </div>
        </div>
    `;
}

function updateChartData() {
    const metric = document.getElementById('chartMetric').value;
    const timeRange = document.getElementById('chartTime').value;
    
    if (dataChart) {
        dataChart.data.labels = generateTimeLabels(timeRange);
        dataChart.data.datasets[0].data = generateMetricData(metric, timeRange);
        dataChart.data.datasets[0].label = getMetricLabel(metric);
        dataChart.data.datasets[0].borderColor = getMetricColor(metric);
        dataChart.data.datasets[0].backgroundColor = getMetricColor(metric) + '20';
        dataChart.update();
    }
}

function generateMetricData(metric, range) {
    const data = [];
    const count = range === '1h' ? 12 : range === '6h' ? 24 : range === '24h' ? 48 : 168;
    
    for (let i = 0; i < count; i++) {
        if (metric === 'temperature') {
            data.push(Math.random() * 10 + 20); // 20-30°C
        } else if (metric === 'humidity') {
            data.push(Math.random() * 30 + 40); // 40-70%
        } else if (metric === 'voltage') {
            data.push(Math.random() * 5 + 10); // 10-15V
        } else if (metric === 'current') {
            data.push(Math.random() * 2 + 1); // 1-3A
        }
    }
    
    return data;
}

function getMetricLabel(metric) {
    const labels = {
        'temperature': 'তাপমাত্রা (°C)',
        'humidity': 'আর্দ্রতা (%)',
        'voltage': 'ভোল্টেজ (V)',
        'current': 'কারেন্ট (A)'
    };
    return labels[metric] || metric;
}

function getMetricColor(metric) {
    const colors = {
        'temperature': '#ef4444',
        'humidity': '#3b82f6',
        'voltage': '#10b981',
        'current': '#f59e0b'
    };
    return colors[metric] || '#64748b';
}

function exportChart() {
    if (dataChart) {
        const link = document.createElement('a');
        link.download = `chart-${new Date().toISOString().split('T')[0]}.png`;
        link.href = dataChart.toBase64Image();
        link.click();
        showNotification('চার্ট এক্সপোর্ট করা হয়েছে', 'success');
    }
}

// রিয়েল-টাইম ডাটা
function updateRealtimeData() {
    const dataStream = document.getElementById('dataStream');
    if (!dataStream) return;
    
    // শেষ ২০টি ডাটা দেখান
    const recentData = realtimeData.slice(-20);
    
    dataStream.innerHTML = '';
    
    recentData.forEach(data => {
        const dataItem = document.createElement('div');
        dataItem.className = 'data-item';
        
        const timestamp = new Date(data.timestamp).toLocaleTimeString();
        const valueClass = data.value > (data.threshold || 30) ? 'high' : 
                          data.value < (data.min || 20) ? 'low' : '';
        
        dataItem.innerHTML = `
            <span class="data-timestamp">[${timestamp}]</span>
            <span class="data-device">${data.device}:</span>
            <span class="data-value ${valueClass}">${data.value} ${data.unit}</span>
        `;
        
        dataStream.appendChild(dataItem);
    });
    
    // নিচে স্ক্রল করুন
    dataStream.scrollTop = dataStream.scrollHeight;
}

function addRealtimeData(device, value) {
    realtimeData.push({
        device: device.name,
        value: value,
        unit: device.unit,
        timestamp: new Date().toISOString(),
        threshold: getThreshold(device.type)
    });
    
    // সর্বোচ্চ ১০০টি ডাটা রাখুন
    if (realtimeData.length > 100) {
        realtimeData.shift();
    }
    
    updateRealtimeData();
}

function getThreshold(type) {
    switch(type) {
        case 'temperature': return 30;
        case 'humidity': return 80;
        case 'voltage': return 13;
        case 'current': return 5;
        default: return 50;
    }
}

function toggleDataStream() {
    const btn = document.getElementById('pauseStreamBtn');
    const isPaused = btn.innerHTML.includes('প্লে');
    
    if (isPaused) {
        btn.innerHTML = '<i class="fas fa-pause"></i> থামান';
        // ডাটা স্ট্রিম চালু করুন
        startDataStream();
    } else {
        btn.innerHTML = '<i class="fas fa-play"></i> চালু করুন';
        // ডাটা স্ট্রিম থামান
        stopDataStream();
    }
}

function startDataStream() {
    // সিমুলেটেড ডাটা স্ট্রিম
    if (!window.dataStreamInterval) {
        window.dataStreamInterval = setInterval(() => {
            // র্যান্ডম ডিভাইস থেকে সিমুলেটেড ডাটা যোগ করুন
            if (devices.length > 0) {
                const randomDevice = devices[Math.floor(Math.random() * devices.length)];
                if (randomDevice.status === 'online') {
                    const newValue = generateRandomValue(randomDevice.type);
                    addRealtimeData(randomDevice, newValue);
                }
            }
        }, 3000); // প্রতি ৩ সেকেন্ডে
    }
}

function stopDataStream() {
    if (window.dataStreamInterval) {
        clearInterval(window.dataStreamInterval);
        window.dataStreamInterval = null;
    }
}

function generateRandomValue(type) {
    switch(type) {
        case 'temperature': return Math.random() * 10 + 20; // 20-30
        case 'humidity': return Math.random() * 30 + 40; // 40-70
        case 'voltage': return Math.random() * 5 + 10; // 10-15
        case 'current': return Math.random() * 2 + 1; // 1-3
        default: return Math.random() * 100;
    }
}

// নোটিফিকেশন
function updateNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
    // শেষ ৫টি নোটিফিকেশন
    const recentNotifications = activityLog
        .filter(a => a.type === 'notification')
        .slice(-5);
    
    notificationsList.innerHTML = '';
    
    if (recentNotifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="no-notifications">
                <i class="fas fa-bell-slash"></i>
                <p>কোন নোটিফিকেশন নেই</p>
            </div>
        `;
        return;
    }
    
    recentNotifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = `notification-item ${notification.severity || 'info'}`;
        
        const time = new Date(notification.timestamp).toLocaleTimeString();
        
        item.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-time">${time}</div>
            </div>
            <div class="notification-message">${notification.message}</div>
        `;
        
        notificationsList.appendChild(item);
    });
}

function checkThresholds(device) {
    const threshold = getThreshold(device.type);
    const min = getMinValue(device.type);
    
    if (device.value > threshold * 1.1) {
        // উচ্চ মানের জন্য নোটিফিকেশন
        addNotification(
            `${device.name} উচ্চ মান`,
            `${device.name} উচ্চ মান রিপোর্ট করছে: ${device.value}${device.unit}`,
            'warning'
        );
    } else if (device.value < min * 1.1) {
        // নিম্ন মানের জন্য নোটিফিকেশন
        addNotification(
            `${device.name} নিম্ন মান`,
            `${device.name} নিম্ন মান রিপোর্ট করছে: ${device.value}${device.unit}`,
            'warning'
        );
    }
}

function addNotification(title, message, severity = 'info') {
    const notification = {
        id: 'notif_' + Date.now(),
        title: title,
        message: message,
        severity: severity,
        timestamp: new Date().toISOString(),
        type: 'notification',
        read: false
    };
    
    activityLog.push(notification);
    localStorage.setItem('eehub_activity', JSON.stringify(activityLog));
    
    updateNotifications();
    
    // ডেস্কটপ নোটিফিকেশন (যদি অনুমতি থাকে)
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: message,
            icon: '/favicon.ico'
        });
    }
}

// অ্যাক্টিভিটি লগ
function updateActivityLog() {
    const activityLogDiv = document.getElementById('activityLog');
    if (!activityLogDiv) return;
    
    // শেষ ৫টি অ্যাক্টিভিটি
    const recentActivities = activityLog.slice(-5);
    
    activityLogDiv.innerHTML = '';
    
    if (recentActivities.length === 0) {
        activityLogDiv.innerHTML = `
            <div class="no-activity">
                <i class="fas fa-history"></i>
                <p>কোন অ্যাক্টিভিটি নেই</p>
            </div>
        `;
        return;
    }
    
    recentActivities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        const iconClass = getActivityIcon(activity.type);
        const time = new Date(activity.timestamp).toLocaleTimeString();
        
        item.innerHTML = `
            <div class="activity-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-text">${activity.message}</div>
                <div class="activity-time">${time}</div>
            </div>
        `;
        
        activityLogDiv.appendChild(item);
    });
}

function getActivityIcon(type) {
    const iconMap = {
        'mqtt': 'fas fa-wifi',
        'device': 'fas fa-microchip',
        'project': 'fas fa-project-diagram',
        'notification': 'fas fa-bell',
        'control': 'fas fa-sliders-h',
        'system': 'fas fa-cog'
    };
    
    return iconMap[type] || 'fas fa-info-circle';
}

function addActivity(message, type = 'system') {
    const activity = {
        id: 'act_' + Date.now(),
        message: message,
        type: type,
        timestamp: new Date().toISOString()
    };
    
    activityLog.push(activity);
    localStorage.setItem('eehub_activity', JSON.stringify(activityLog));
    
    // সর্বোচ্চ ১০০টি অ্যাক্টিভিটি রাখুন
    if (activityLog.length > 100) {
        activityLog.shift();
    }
    
    updateActivityLog();
}

function generateDemoActivity() {
    return [
        {
            id: 'act_1',
            message: 'ড্যাশবোর্ড লোড করা হয়েছে',
            type: 'system',
            timestamp: new Date(Date.now() - 300000).toISOString()
        },
        {
            id: 'act_2',
            message: 'স্মার্ট হোম প্রোজেক্ট সিলেক্ট করা হয়েছে',
            type: 'project',
            timestamp: new Date(Date.now() - 240000).toISOString()
        },
        {
            id: 'act_3',
            message: 'লিভিং রুম তাপমাত্রা সেন্সর অনলাইন হয়েছে',
            type: 'device',
            timestamp: new Date(Date.now() - 180000).toISOString()
        },
        {
            id: 'act_4',
            message: 'বেডরুম লাইট চালু করা হয়েছে',
            type: 'control',
            timestamp: new Date(Date.now() - 120000).toISOString()
        },
        {
            id: 'act_5',
            message: 'তাপমাত্রা স্বাভাবিক সীমার মধ্যে আছে',
            type: 'notification',
            timestamp: new Date(Date.now() - 60000).toISOString()
        }
    ];
}

// ড্যাশবোর্ড স্ট্যাটস
function updateDashboardStats() {
    document.getElementById('totalDevices').textContent = devices.length;
    document.getElementById('onlineDevices').textContent = devices.filter(d => d.status === 'online').length;
    document.getElementById('warningDevices').textContent = devices.filter(d => d.status === 'warning').length;
    document.getElementById('dataPoints').textContent = realtimeData.length;
    
    // সার্ভার স্ট্যাটাস
    document.getElementById('serverStatus').textContent = 'অনলাইন';
    document.getElementById('serverStatus').style.color = '#10b981';
    
    // লাস্ট আপডেট
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
    
    // মেমোরি ইউজেজ (সিমুলেটেড)
    document.getElementById('memoryUsage').textContent = 
        Math.floor(Math.random() * 100) + 50 + ' MB';
}

function refreshDashboard() {
    updateDashboardStats();
    updateProjectList();
    updateDeviceList();
    updateControlsGrid();
    updateRealtimeData();
    
    showNotification('ড্যাশবোর্ড রিফ্রেশ করা হয়েছে', 'success');
    addActivity('ড্যাশবোর্ড ম্যানুয়ালি রিফ্রেশ করা হয়েছে');
}

// সেটিংস
function saveSettings() {
    const broker = document.getElementById('mqttBroker').value;
    const interval = document.getElementById('updateInterval').value;
    const retention = document.getElementById('dataRetention').value;
    
    localStorage.setItem('eehub_mqtt_broker', broker);
    localStorage.setItem('eehub_update_interval', interval);
    localStorage.setItem('eehub_data_retention', retention);
    
    showNotification('সেটিংস সংরক্ষণ করা হয়েছে', 'success');
    addActivity('সিস্টেম সেটিংস আপডেট করা হয়েছে');
}

// মডাল ফাংশন
function showProjectModal() {
    document.getElementById('projectModal').classList.add('active');
    document.getElementById('projectName').focus();
}

function showDeviceModal() {
    const projectSelect = document.getElementById('deviceProject');
    projectSelect.innerHTML = '<option value="">প্রোজেক্ট সিলেক্ট করুন</option>';
    
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
    
    if (currentProject) {
        projectSelect.value = currentProject.id;
    }
    
    document.getElementById('deviceModal').classList.add('active');
    document.getElementById('deviceName').focus();
}

function hideModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function saveProject() {
    const name = document.getElementById('projectName').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const type = document.getElementById('projectType').value;
    const image = document.getElementById('projectImage').value.trim();
    
    if (!name) {
        showNotification('প্রোজেক্টের নাম দিন', 'warning');
        return;
    }
    
    const project = {
        id: 'project_' + Date.now(),
        name: name,
        description: description,
        type: type,
        image: image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        devices: [],
        created: new Date().toISOString(),
        status: 'active'
    };
    
    projects.push(project);
    localStorage.setItem('eehub_projects', JSON.stringify(projects));
    
    selectProject(project.id);
    hideModals();
    
    showNotification('প্রোজেক্ট তৈরি করা হয়েছে', 'success');
    addActivity(`নতুন প্রোজেক্ট তৈরি করা হয়েছে: ${name}`);
}

function saveDevice() {
    const name = document.getElementById('deviceName').value.trim();
    const type = document.getElementById('deviceType').value;
    const deviceId = document.getElementById('deviceId').value.trim();
    const topic = document.getElementById('deviceTopic').value.trim();
    const pin = document.getElementById('devicePin').value;
    const projectId = document.getElementById('deviceProject').value;
    
    if (!name || !deviceId || !topic || !projectId) {
        showNotification('সমস্ত প্রয়োজনীয় তথ্য দিন', 'warning');
        return;
    }
    
    const device = {
        id: 'device_' + Date.now(),
        name: name,
        type: type,
        deviceId: deviceId,
        topic: topic,
        pin: pin,
        projectId: projectId,
        status: 'online',
        value: type === 'led' || type === 'relay' ? 0 : 
               type === 'temperature' ? 25 : 
               type === 'humidity' ? 50 : 0,
        unit: type === 'temperature' ? '°C' : 
              type === 'humidity' ? '%' : 
              type === 'voltage' ? 'V' : 
              type === 'current' ? 'A' : '',
        lastUpdate: new Date().toISOString()
    };
    
    devices.push(device);
    localStorage.setItem('eehub_devices', JSON.stringify(devices));
    
    // MQTT সাবস্ক্রাইব করুন যদি কানেক্টেড থাকে
    if (mqttClient && isConnected) {
        mqttClient.subscribe(device.topic);
    }
    
    updateDeviceList();
    updateControlsGrid();
    updateDashboardStats();
    hideModals();
    
    showNotification('ডিভাইস যোগ করা হয়েছে', 'success');
    addActivity(`নতুন ডিভাইস যোগ করা হয়েছে: ${name}`);
}

function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    // এডিট মডাল দেখান
    showProjectModal();
    
    // ভ্যালু সেট করুন
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectType').value = project.type;
    document.getElementById('projectImage').value = project.image;
    
    // বাটন টেক্সট চেঞ্জ করুন
    document.getElementById('saveProjectBtn').textContent = 'আপডেট করুন';
    
    // টেম্পোরারি ইভেন্ট লিসেনার
    const saveBtn = document.getElementById('saveProjectBtn');
    const originalHandler = saveBtn.onclick;
    
    saveBtn.onclick = function() {
        project.name = document.getElementById('projectName').value.trim();
        project.description = document.getElementById('projectDescription').value.trim();
        project.type = document.getElementById('projectType').value;
        project.image = document.getElementById('projectImage').value.trim();
        
        localStorage.setItem('eehub_projects', JSON.stringify(projects));
        
        updateProjectList();
        updateActiveProject();
        hideModals();
        
        showNotification('প্রোজেক্ট আপডেট করা হয়েছে', 'success');
        addActivity(`প্রোজেক্ট এডিট করা হয়েছে: ${project.name}`);
        
        // মূল হ্যান্ডলার রিস্টোর করুন
        saveBtn.onclick = originalHandler;
        saveBtn.textContent = 'তৈরি করুন';
    };
}

function editDevice(deviceId) {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;
    
    showDeviceModal();
    
    // ভ্যালু সেট করুন
    document.getElementById('deviceName').value = device.name;
    document.getElementById('deviceType').value = device.type;
    document.getElementById('deviceId').value = device.deviceId;
    document.getElementById('deviceTopic').value = device.topic;
    document.getElementById('devicePin').value = device.pin;
    
    // প্রোজেক্ট সিলেক্ট
    const projectSelect = document.getElementById('deviceProject');
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
    projectSelect.value = device.projectId;
    
    // বাটন টেক্সট চেঞ্জ করুন
    document.getElementById('saveDeviceBtn').textContent = 'আপডেট করুন';
    
    // টেম্পোরারি ইভেন্ট লিসেনার
    const saveBtn = document.getElementById('saveDeviceBtn');
    const originalHandler = saveBtn.onclick;
    
    saveBtn.onclick = function() {
        device.name = document.getElementById('deviceName').value.trim();
        device.type = document.getElementById('deviceType').value;
        device.deviceId = document.getElementById('deviceId').value.trim();
        device.topic = document.getElementById('deviceTopic').value.trim();
        device.pin = document.getElementById('devicePin').value;
        device.projectId = document.getElementById('deviceProject').value;
        
        localStorage.setItem('eehub_devices', JSON.stringify(devices));
        
        updateDeviceList();
        updateControlsGrid();
        hideModals();
        
        showNotification('ডিভাইস আপডেট করা হয়েছে', 'success');
        addActivity(`ডিভাইস এডিট করা হয়েছে: ${device.name}`);
        
        // মূল হ্যান্ডলার রিস্টোর করুন
        saveBtn.onclick = originalHandler;
        saveBtn.textContent = 'যোগ করুন';
    };
}

function shareProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const shareData = {
        title: project.name,
        text: project.description,
        url: `${window.location.origin}/iot-dashboard?project=${projectId}`
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showNotification('প্রোজেক্ট শেয়ার করা হয়েছে', 'success'))
            .catch(() => {
                navigator.clipboard.writeText(shareData.url)
                    .then(() => showNotification('লিঙ্ক কপি করা হয়েছে', 'success'));
            });
    } else {
        navigator.clipboard.writeText(shareData.url)
            .then(() => showNotification('লিঙ্ক কপি করা হয়েছে', 'success'));
    }
}

// ফুলস্ক্রিন মোড
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`ফুলস্ক্রিন ব্যর্থ: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// হেল্প
function showHelp() {
    const helpModal = document.createElement('div');
    helpModal.className = 'modal active';
    
    helpModal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3><i class="fas fa-question-circle"></i> IoT ড্যাশবোর্ড হেল্প</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="help-content">
                    <h4>কিভাবে শুরু করবেন:</h4>
                    <ol>
                        <li>প্রথমে একটি নতুন প্রোজেক্ট তৈরি করুন</li>
                        <li>প্রোজেক্টের মধ্যে ডিভাইস যোগ করুন</li>
                        <li>MQTT ব্রোকারে কানেক্ট করুন</li>
                        <li>ডিভাইসগুলো কন্ট্রোল করুন এবং ডাটা মনিটর করুন</li>
                    </ol>
                    
                    <h4>MQTT সেটআপ:</h4>
                    <p>ডিফল্ট ব্রোকার: <code>wss://test.mosquitto.org:8081</code></p>
                    <p>আপনার নিজের MQTT ব্রোকার ব্যবহার করতে পারেন</p>
                    
                    <h4>ডিভাইস টাইপস:</h4>
                    <ul>
                        <li><strong>সেন্সর:</strong> ডাটা সংগ্রহ করে (তাপমাত্রা, আর্দ্রতা, etc.)</li>
                        <li><strong>অ্যাকচুয়েটর:</strong> কন্ট্রোল করে (LED, রিলে, সার্ভো)</li>
                        <li><strong>কন্ট্রোলার:</strong> লজিক এবং অটোমেশন</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-action="close">বন্ধ করুন</button>
                <a href="../help/index.html" class="btn btn-outline">
                    <i class="fas fa-book"></i> সম্পূর্ণ গাইড
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    helpModal.querySelector('.modal-close').addEventListener('click', () => helpModal.remove());
    helpModal.querySelector('[data-action="close"]').addEventListener('click', () => helpModal.remove());
    
    helpModal.addEventListener('click', function(e) {
        if (e.target === this) {
            helpModal.remove();
        }
    });
}

// অথেন্টিকেশন চেক
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('eehub_user'));
    const userMenu = document.getElementById('userMenu');
    
    if (user && userMenu) {
        userMenu.innerHTML = `
            <div class="user-menu">
                <button class="user-btn" id="dashboardUserBtn">
                    <i class="fas fa-user-circle"></i>
                    <span>${user.firstName}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="user-dropdown" id="dashboardUserDropdown">
                    <a href="../profile/index.html" class="dropdown-item">
                        <i class="fas fa-user"></i> প্রোফাইল
                    </a>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item logout-btn" id="dashboardLogoutBtn">
                        <i class="fas fa-sign-out-alt"></i> লগ আউট
                    </button>
                </div>
            </div>
        `;
        
        // ইউজার মেনু ইনিশিয়ালাইজ
        initializeDashboardUserMenu();
    }
}

function initializeDashboardUserMenu() {
    const userBtn = document.getElementById('dashboardUserBtn');
    const dropdown = document.getElementById('dashboardUserDropdown');
    const logoutBtn = document.getElementById('dashboardLogoutBtn');
    
    if (userBtn && dropdown) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!userBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('আপনি কি লগ আউট করতে চান?')) {
                localStorage.removeItem('eehub_user');
                localStorage.removeItem('eehub_token');
                window.location.href = '../auth/login.html';
            }
        });
    }
}

// নোটিফিকেশন সিস্টেম
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
const dashboardStyles = `
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

/* নো-কন্টেন্ট স্টাইলস */
.no-project,
.no-controls,
.no-notifications,
.no-activity {
    text-align: center;
    padding: 40px 20px;
    color: #94a3b8;
}

.no-project i,
.no-controls i,
.no-notifications i,
.no-activity i {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #cbd5e1;
}

/* ম্যাপ ভিউ */
.map-view {
    width: 100%;
    height: 100%;
    position: relative;
}

.map-grid {
    width: 100%;
    height: 100%;
    background: #f8fafc;
    border-radius: 10px;
    position: relative;
}

.map-node {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2;
}

.map-node:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
}

.node-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
}

.node-info {
    min-width: 100px;
}

.node-name {
    font-weight: 600;
    color: #1e293b;
    font-size: 14px;
    margin-bottom: 2px;
}

.node-value {
    font-size: 12px;
    color: #64748b;
}

.map-connections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.connection-line {
    position: absolute;
    height: 2px;
    background: #cbd5e1;
}

/* ডিভাইস ডিটেইলস */
.device-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e2e8f0;
}

.detail-row:last-child {
    border-bottom: none;
}

.detail-label {
    font-weight: 600;
    color: #475569;
}

.detail-value {
    color: #1e293b;
    font-weight: 500;
}

.detail-value.online {
    color: #10b981;
}

.detail-value.offline {
    color: #ef4444;
}

.detail-value.warning {
    color: #f59e0b;
}

.control-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.control-slider {
    margin-top: 15px;
}

.control-slider label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: #475569;
}

.slider {
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background: #667eea;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* হেল্প কন্টেন্ট */
.help-content {
    line-height: 1.6;
}

.help-content h4 {
    margin-top: 20px;
    margin-bottom: 10px;
    color: #1e293b;
}

.help-content ol,
.help-content ul {
    padding-left: 20px;
    margin-bottom: 20px;
}

.help-content li {
    margin-bottom: 8px;
    color: #475569;
}

.help-content code {
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
}

/* ইউজার মেনু */
.user-menu {
    position: relative;
}

.user-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    color: #1e293b;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.user-btn:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
}

.user-btn i:first-child {
    font-size: 1.5rem;
    color: #667eea;
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 10px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.user-dropdown.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px 20px;
    color: #475569;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
}

.dropdown-item:hover {
    background: #f8fafc;
    color: #667eea;
}

.dropdown-divider {
    height: 1px;
    background: #e2e8f0;
    margin: 5px 0;
}

.logout-btn {
    color: #ef4444;
}

.logout-btn:hover {
    background: #fef2f2;
    color: #dc2626;
}

/* রেঞ্জ স্টাইল */
.control-range {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.range-min,
.range-max {
    font-size: 12px;
    color: #64748b;
    min-width: 30px;
}

/* স্ক্রলবার */
.data-stream::-webkit-scrollbar,
.project-list::-webkit-scrollbar,
.device-list::-webkit-scrollbar,
.notifications-list::-webkit-scrollbar,
.activity-log::-webkit-scrollbar {
    width: 6px;
}

.data-stream::-webkit-scrollbar-track,
.project-list::-webkit-scrollbar-track,
.device-list::-webkit-scrollbar-track,
.notifications-list::-webkit-scrollbar-track,
.activity-log::-webkit-scrollbar-track {
    background: #1e293b;
}

.data-stream::-webkit-scrollbar-thumb,
.project-list::-webkit-scrollbar-thumb,
.device-list::-webkit-scrollbar-thumb,
.notifications-list::-webkit-scrollbar-thumb,
.activity-log::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 3px;
}

.data-stream::-webkit-scrollbar-thumb:hover,
.project-list::-webkit-scrollbar-thumb:hover,
.device-list::-webkit-scrollbar-thumb:hover,
.notifications-list::-webkit-scrollbar-thumb:hover,
.activity-log::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}
`;

// CSS ইনজেক্ট করুন
const styleSheet = document.createElement('style');
styleSheet.textContent = dashboardStyles;
document.head.appendChild(styleSheet);

// গ্লোবাল এক্সপোজ
window.IoTDashboard = {
    connectMQTT: toggleMQTTConnection,
    refreshDashboard,
    addDevice: showDeviceModal,
    addProject: showProjectModal,
    getStats: () => ({
        totalDevices: devices.length,
        onlineDevices: devices.filter(d => d.status === 'online').length,
        projects: projects.length
    })
};