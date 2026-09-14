import '../styles/pages/Settings.css'

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>SETTINGS</h1>
        <p className="settings-subtitle">Customize your training experience</p>

        <div className="settings-sections">
          <div className="settings-section">
            <h2>GAME SETTINGS</h2>
            
            <div className="setting-item">
              <label>Target Size</label>
              <div className="input-group">
                <input type="range" min="15" max="60" defaultValue="30" />
                <span className="value">30px</span>
              </div>
              <small>Adjust the size of targets (15-60px)</small>
            </div>

            <div className="setting-item">
              <label>Game Speed</label>
              <div className="input-group">
                <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" />
                <span className="value">1.0x</span>
              </div>
              <small>Adjust the speed multiplier (0.5x - 2x)</small>
            </div>

            <div className="setting-item">
              <label>Training Duration</label>
              <div className="input-group">
                <input type="range" min="10" max="300" defaultValue="30" />
                <span className="value">30s</span>
              </div>
              <small>Default game duration in seconds (10-300s)</small>
            </div>
          </div>

          <div className="settings-section">
            <h2>AUDIO SETTINGS</h2>
            
            <div className="setting-item">
              <label>Sound Effects</label>
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <label>Background Music</label>
              <label className="toggle">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2>APPEARANCE</h2>
            
            <div className="setting-item">
              <label>Theme</label>
              <div className="theme-display">
                <div className="theme-color" style={{background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'}}></div>
                <span>Dark Gaming Theme</span>
              </div>
              <div className="info-card" style={{marginTop: '16px'}}>
                <p>Current theme is optimized for gaming</p>
                <p className="info-features">• High contrast for clarity</p>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2>DATA</h2>
            
            <div className="setting-item">
              <label>Storage Information</label>
              <div className="info-card">
                <p>All your statistics and settings are saved locally in your browser using localStorage.</p>
                <p>Data will be preserved unless you clear your browser cache.</p>
                <p className="info-features">Clearing browser data will reset all statistics.</p>
              </div>
            </div>

            <div className="setting-item" style={{marginTop: '20px'}}>
              <button className="btn btn-danger" style={{width: '100%'}}>RESET ALL DATA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings