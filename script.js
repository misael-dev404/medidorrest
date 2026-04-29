:root {
    --primary: #6366f1;
    --primary-hover: #4f46e5;
    --bg-dark: #0f172a;
    --card-bg: rgba(30, 41, 59, 0.7);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --accent: #0ea5e9;
    --success: #10b981;
    --glass-border: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', sans-serif;
}

body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    padding: 20px;
}

.background-blobs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}

.blob {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    animation: move 20s infinite alternate;
}

.blob-1 {
    background: var(--primary);
    top: -100px;
    left: -100px;
}

.blob-2 {
    background: var(--accent);
    bottom: -100px;
    right: -100px;
    animation-delay: -10s;
}

@keyframes move {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(100px, 100px) scale(1.2); }
}

.calculator-container {
    background: var(--card-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 40px;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

header {
    text-align: center;
    margin-bottom: 32px;
}

header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 8px;
}

header .accent {
    color: var(--accent);
}

header p {
    color: var(--text-muted);
}

.mode-selector {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 32px;
}

.mode-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    color: var(--text-main);
    padding: 10px 24px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
}

.mode-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

.mode-btn.active {
    background: var(--primary);
    border-color: var(--primary);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
}

.resistor-visual-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
    padding: 20px;
}

.wire {
    height: 8px;
    width: 60px;
    background: #475569;
    border-radius: 4px;
}

.resistor-body {
    width: 280px;
    height: 80px;
    background: #e2e8f0;
    border-radius: 40px;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 20px;
    box-shadow: inset 0 -10px 20px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.2);
}

.band {
    width: 14px;
    height: 100%;
    transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.band-1 { border-top-left-radius: 4px; border-bottom-left-radius: 4px; margin-left: 10px; }
.band-5 { border-top-right-radius: 4px; border-bottom-right-radius: 4px; margin-right: 10px; }

.controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.input-group.hidden {
    display: none;
}

.input-group label {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-weight: 500;
}

.select-wrapper {
    position: relative;
}

.select-wrapper::after {
    content: '▼';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.8rem;
    pointer-events: none;
    color: var(--text-muted);
}

select {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    color: var(--text-main);
    cursor: pointer;
    appearance: none;
    outline: none;
    transition: all 0.2s;
}

select:focus {
    border-color: var(--primary);
    background: rgba(255, 255, 255, 0.1);
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.result-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    padding: 20px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: transform 0.3s ease;
}

.result-card:hover {
    transform: translateY(-5px);
}

.result-card.primary {
    grid-column: span 2;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.1));
    border-color: rgba(99, 102, 241, 0.2);
    align-items: center;
    text-align: center;
}

.result-card.highlight {
    background: rgba(14, 165, 233, 0.05);
}

.result-card .label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
}

.result-card h2 {
    font-size: 2.5rem;
    font-weight: 700;
}

.result-card p {
    font-size: 1.25rem;
    font-weight: 600;
}

.badge {
    background: var(--primary);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-top: 8px;
}

.status-card p {
    color: var(--success);
}

.hidden { display: none; }

/* Color classes for bands */
.color-black { background-color: #000000; }
.color-brown { background-color: #8B4513; }
.color-red { background-color: #FF0000; }
.color-orange { background-color: #FFA500; }
.color-yellow { background-color: #FFFF00; }
.color-green { background-color: #22c55e; }
.color-blue { background-color: #3b82f6; }
.color-violet { background-color: #a855f7; }
.color-gray { background-color: #64748b; }
.color-white { background-color: #ffffff; }
.color-gold { background-color: #eab308; }
.color-silver { background-color: #94a3b8; }

@media (max-width: 600px) {
    .calculator-container {
        padding: 24px;
    }
    .results-grid {
        grid-template-columns: 1fr;
    }
    .result-card.primary {
        grid-column: span 1;
    }
}
