import '../styles/pages/Settings.css'

function Settings({ settings, updateSettings }) {
  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>SETTINGS</h1>
        <p className="settings-subtitle">Customize your training experience</p>

        <div className="settings-sections">
          <div className="settings-section">
            <h2>🎮 GAMEPLAY</h2>
            <div className="setting-item">
              <label htmlFor="duration">Training Duration (seconds)</label>
              <div className="input-group">
                <input
                  type="range"
                  id="duration"
                  min="10"
                  max="300"
                  step="5"
                  value={settings.trainingDuration}
                  onChange={(e) => updateSettings({ trainingDuration: parseInt(e.target.value) })}
                />
                <span className="value">{settings.trainingDuration}s</span>
              </div>
              <small>Default: 30 seconds</small>
            </div>

            <div className="setting-item">
              <label htmlFor="targetSize">Target Size</label>
              <div className="input-group">
                <input
                  type="range"
                  id="targetSize"
                  min="15"
                  max="60"
                  step="5"
                  value={settings.targetSize}
                  onChange={(e) => updateSettings({ targetSize: parseInt(e.target.value) })}
                />
                <span className="value">{settings.targetSize}px</span>
              </div>
              <small>Small targets are harder to hit</small>
            </div>

            <div className="setting-item">
              <label htmlFor="speed">Target Speed</label>
              <div className="input-group">
                <input
                  type="range"
                  id="speed"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.targetSpeed}
                  onChange={(e) => updateSettings({ targetSpeed: parseFloat(e.target.value) })}
                />
                <span className="value">{settings.targetSpeed}x</span>
              </div>
              <small>Affects how quickly targets appear</small>
            </div>
          </div>

          <div className="settings-section">
            <h2>🔊 AUDIO</h2>
            <div className="setting-item">
              <label htmlFor="sound">Sound Effects</label>
              <div className="toggle">
                <input
                  type="checkbox"
                  id="sound"
                  checked={settings.soundEnabled}
                  onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </div>
            </div>

            <div className="setting-item">
              <label htmlFor="music">Background Music</label>
              <div className="toggle">
                <input
                  type="checkbox"
                  id="music"
                  checked={settings.musicEnabled}
                  onChange={(e) => updateSettings({ musicEnabled: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2>🎨 THEME</h2>
            <div className="setting-item">
              <label>Current Theme</label>
              <div className="theme-display">
                <div className="theme-color" style={{
                  background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)'
                }}></div>
                <span>Dark Gaming Theme</span>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2>ℹ️ ABOUT</h2>
            <div className="info-card">
              <p><strong>Aim Trainer v1.0.0</strong></p>
              <p>Professional gaming aim training application</p>
              <p>Built with React + Vite</p>
              <p className="info-features">
                Features: Reaction, Precision, Speed, Gridshot modes with full statistics tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings