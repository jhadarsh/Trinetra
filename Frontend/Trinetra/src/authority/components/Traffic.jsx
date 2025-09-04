import React, { useState } from "react";

// Mock data for 8 routes: 4 Entries + 4 Ghats
const routeData = [
  { id: 1, name: "Entry Route 1", type: "Entry", density: "High", status: "Open" },
  { id: 2, name: "Entry Route 2", type: "Entry", density: "Medium", status: "Open" },
  { id: 3, name: "Entry Route 3", type: "Entry", density: "Low", status: "Open" },
  { id: 4, name: "Entry Route 4", type: "Entry", density: "Critical", status: "Open" },
  { id: 5, name: "Ghat Route 1", type: "Ghat", density: "Medium", status: "Open" },
  { id: 6, name: "Ghat Route 2", type: "Ghat", density: "High", status: "Open" },
  { id: 7, name: "Ghat Route 3", type: "Ghat", density: "Low", status: "Open" },
  { id: 8, name: "Ghat Route 4", type: "Ghat", density: "Medium", status: "Open" },
];

// Utility for coloring density and status
const densityColors = {
  Low: "#2ecc71",
  Medium: "#f1c40f",
  High: "#e67e22",
  Critical: "#e74c3c",
};

const statusColors = {
  Open: "#3498db",
  Stopped: "#e74c3c",
};

const MahakumbhRouteFlowManager = () => {
  const [routes, setRoutes] = useState(routeData);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [message, setMessage] = useState(null);

  // Handle route click to open drawer
  const onRouteClick = (route) => {
    setSelectedRoute(route);
    setAnnouncement("");
    setMessage(null);
  };

  // Handle stop route button
  const onStopRoute = () => {
    if (!selectedRoute) return;
    // Confirmation prompt
    if (window.confirm(`Are you sure to STOP route "${selectedRoute.name}"?`)) {
      // Update route status mock
      const updatedRoutes = routes.map((r) =>
        r.id === selectedRoute.id ? { ...r, status: "Stopped" } : r
      );
      setRoutes(updatedRoutes);
      setSelectedRoute({ ...selectedRoute, status: "Stopped" });
      setMessage(`Route "${selectedRoute.name}" has been stopped.`);
    }
  };

  // Handle announcement sending (mock)
  const onSendAnnouncement = () => {
    if (!announcement.trim()) {
      setMessage("Please enter an announcement before sending.");
      return;
    }
    setMessage(`Announcement sent for "${selectedRoute.name}": "${announcement.trim()}"`);
    setAnnouncement("");
  };

  // Format current date time for header display (mock live)
  const getCurrentFormattedTime = () => {
    return new Date().toLocaleString();
  };

  return (
    <>
      <style>{`
        /* Basic Reset & Font */
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #101820FF;
          color: #FEE715FF;
          user-select: none;
        }

        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        /* Header styles */
        
        header h1 {
          font-weight: 700;
          font-size: 1.8rem;
          letter-spacing: 1px;
        }
        .header-right {
          color: #FEE715FF;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          font-family: monospace;
        }

        /* Main content layout */
        main {
          flex-grow: 1;
          display: flex;
          overflow: hidden;
          background: #161616;
        }

        /* Left panel: Route Map */
        .map-panel {
          flex: 2.5;
          background: #222;
          padding: 2rem;
          position: relative;
          box-shadow: inset 0 0 20px 3px #333;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: flex-start;
          gap: 1rem;
          border-right: 3px solid #FEE715FF;
        }

        /* Iconic route card on map */
        .route-node {
          cursor: pointer;
          width: 13rem;
          height: 13rem;
          background: linear-gradient(145deg, #0f0f0f, #1a1a1a);
          border-radius: 1rem;
          box-shadow:
            4px 4px 8px #0a0a0a,
            -4px -4px 8px #232323;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          user-select: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 3px solid transparent;
          position: relative;
        }
        .route-node:hover {
          transform: scale(1.08);
          box-shadow:
            0 0 15px #FEE715FF, 0 0 30px #FEE715AA inset;
          border: 3px solid #FEE715FF;
          z-index: 10;
        }

        .route-node.stopped {
          filter: grayscale(70%);
          box-shadow: 0 0 20px red inset !important;
          border-color: #e74c3c !important;
          cursor: default;
        }

        .route-type {
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #ccc;
        }
        .route-name {
          font-weight: 700;
          font-size: 1.3rem;
          margin-top: 0.3rem;
          color: #FEE715FF;
        }

        .density-indicator {
          margin-top: 0.8rem;
          padding: 7px 15px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 0 12px 2px;
          color: #161616;
        }

        /* Small badge on top right for status */
        .status-badge {
          position: absolute;
          top: 8px;
          right: 12px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3498db;
          box-shadow: 0 0 8px #3498db;
          border: 2px solid #222;
        }
        .status-badge.stopped {
          background: #e74c3c;
          box-shadow: 0 0 8px #e74c3c;
        }

        /* Right panel: Route List */
        .list-panel {
          flex: 1.5;
          background: #1a1a1a;
          padding: 2rem 1.5rem;
          overflow-y: auto;
          border-left: 3px solid #FEE715FF;
          display: flex;
          flex-direction: column;
        }
        .list-header {
          font-weight: 700;
          font-size: 1.4rem;
          color: #FEE715FF;
          margin-bottom: 1rem;
          letter-spacing: 0.1em;
          user-select: none;
          border-bottom: 1px solid #333;
          padding-bottom: 0.6rem;
        }

        .route-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #222;
          margin-bottom: 0.8rem;
          padding: 0.8rem 1rem;
          border-radius: 0.6rem;
          box-shadow:
            inset 0 0 10px #000,
            3px 3px 6px #111;
          cursor: pointer;
          transition: background-color 0.25s ease;
          user-select: none;
        }
        .route-list-item:hover {
          background: #333;
        }
        .route-list-item.stopped {
          background: #441111;
          color: #e74c3c;
          cursor: default;
          font-weight: 700;
        }

        .list-route-name {
          font-weight: 600;
          font-size: 1.0rem;
          flex: 1.7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .list-density {
          flex: 0.8;
          font-weight: 700;
          text-align: center;
          color: #161616;
          background-color: var(--density-bg);
          border-radius: 15px;
          padding: 3px 10px;
          box-shadow: 0 0 8px 1px var(--density-shadow);
        }

        .list-status {
          flex: 0.7;
          font-weight: 700;
          text-align: center;
          color: var(--status-color);
          text-transform: uppercase;
        }

        .btn-action {
          flex: 0.9;
          background: #FEE715FF;
          border: none;
          border-radius: 20px;
          color: #161616;
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 6px 10px;
          transition: background-color 0.3s ease;
          user-select: none;
        }
        .btn-action:disabled {
          background: #999;
          cursor: not-allowed;
        }
        .btn-action:hover:not(:disabled) {
          background-color: #f7ea2b;
        }

        /* Drawer for route actions */
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
          width: 420px;
          max-width: 95vw;
          background: linear-gradient(180deg,#111111 0%,#222222 100%);
          box-shadow: -5px 0 15px rgba(0,0,0,0.9);
          border-left: 3px solid #FEE715FF;
          padding: 2.5rem 2rem;
          transform: translateX(100%);
          transition: transform 0.4s ease;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow-y: auto;
        }
        .drawer.open {
          transform: translateX(0);
        }
        .drawer-header {
          font-weight: 800;
          font-size: 1.5rem;
          color: #FEE715FF;
          margin-bottom: 1rem;
          border-bottom: 1px solid #333;
          padding-bottom: 0.8rem;
          user-select: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .close-drawer {
          cursor: pointer;
          font-weight: 700;
          font-size: 1.4rem;
          color: #e74c3c;
          user-select: none;
          transition: color 0.3s ease;
        }
        .close-drawer:hover {
          color: #f00;
        }

        .drawer-content {
          flex-grow: 1;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
        }
        .drawer-section {
          margin-bottom: 1.8rem;
        }

        /* Density & Status in drawer */
        .drawer-info {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: #FEE715FF;
          letter-spacing: 0.05em;
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
        }

        /* Announcement input */
        textarea {
          width: 100%;
          height: 90px;
          padding: 12px 15px;
          border-radius: 10px;
          border: 2px solid #444;
          resize: none;
          background: #222;
          color: #FEE715FF;
          font-size: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          box-shadow:
            inset 2px 2px 8px #000,
            0 0 6px #FEE71555;
          transition: border-color 0.3s ease;
        }
        textarea:focus {
          border-color: #FEE715FF;
          outline: none;
        }

        /* Buttons in drawer */
        .drawer-btns {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }
        .btn-announcement {
          flex: 1;
          background-color: #FEE715FF;
          border: none;
          border-radius: 25px;
          padding: 12px 0;
          font-weight: 700;
          color: #161616;
          cursor: pointer;
          transition: background-color 0.3s ease;
          user-select: none;
          letter-spacing: 0.05em;
        }
        .btn-announcement:hover {
          background-color: #f7ea2b;
        }
        .btn-stop {
          flex: 1;
          background-color: #e74c3c;
          border: none;
          border-radius: 25px;
          padding: 12px 0;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
          user-select: none;
          letter-spacing: 0.05em;
        }
        .btn-stop:hover {
          background-color: #cf3a36;
        }

        /* Message (success/info) box */
        .message-box {
          background-color: #333;
          color: #FEE715FF;
          font-weight: 600;
          padding: 12px 16px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 0 12px 3px #FEE715AA;
          margin-top: 1rem;
          font-size: 1rem;
          user-select: none;
          letter-spacing: 0.03em;
        }

        /* Footer */
        footer {
          background: #121212;
          padding: 12px 2rem;
          color: #aaa;
          font-size: 0.8rem;
          text-align: center;
          user-select: none;
          border-top: 1px solid #222;
          letter-spacing: 0.05em;
        }

        /* Scrollbar styling for right panel and drawer */
        .list-panel::-webkit-scrollbar, .drawer::-webkit-scrollbar {
          width: 8px;
        }
        .list-panel::-webkit-scrollbar-thumb, .drawer::-webkit-scrollbar-thumb {
          background-color: #555;
          border-radius: 4px;
        }
      `}</style>

      <div className="app-container">
        <header>
          <h1>Mahakumbh Route Flow Manager</h1>
          <div className="header-right" title="Current system time">
            {getCurrentFormattedTime()}
          </div>
        </header>

        <main>
          {/* Left Panel - Map Layout */}
          <section className="map-panel" aria-label="Map with routes status and selection">
            {routes.map((route) => (
              <div
                key={route.id}
                className={`route-node ${route.status === "Stopped" ? "stopped" : ""}`}
                onClick={() => route.status !== "Stopped" && onRouteClick(route)}
                title={`${route.name} - Density: ${route.density} - Status: ${route.status}`}
                role="button"
                tabIndex={route.status === "Stopped" ? -1 : 0}
                aria-pressed={selectedRoute?.id === route.id}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && route.status !== "Stopped") {
                    onRouteClick(route);
                  }
                }}
              >
                <div className="route-type">{route.type}</div>
                <div className="route-name">{route.name}</div>
                <div
                  className="density-indicator"
                  style={{
                    backgroundColor: densityColors[route.density],
                    boxShadow: `0 0 10px 3px ${densityColors[route.density]}77`,
                  }}
                  aria-label={`Density level: ${route.density}`}
                >
                  {route.density}
                </div>
                <span
                  className={`status-badge ${route.status === "Stopped" ? "stopped" : ""}`}
                  aria-label={`Route status: ${route.status}`}
                />
              </div>
            ))}
          </section>

          {/* Right Panel - Route List */}
          <section className="list-panel" aria-label="Route summary and quick actions">
            <h2 className="list-header">Route Summary</h2>
            {routes.map((route) => (
              <div
                key={route.id}
                className={`route-list-item ${route.status === "Stopped" ? "stopped" : ""}`}
                onClick={() => route.status !== "Stopped" && onRouteClick(route)}
                role="button"
                tabIndex={route.status === "Stopped" ? -1 : 0}
                aria-pressed={selectedRoute?.id === route.id}
                title={`${route.name}, Density: ${route.density}, Status: ${route.status}`}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && route.status !== "Stopped") {
                    onRouteClick(route);
                  }
                }}
                style={{
                  "--density-bg": densityColors[route.density],
                  "--density-shadow": densityColors[route.density],
                  "--status-color": route.status === "Stopped" ? "#e74c3c" : "#3498db",
                }}
              >
                <div className="list-route-name">{route.name}</div>
                <div className="list-density" aria-label={`Density: ${route.density}`}>
                  {route.density}
                </div>
                <div className="list-status" aria-label={`Status: ${route.status}`}>
                  {route.status}
                </div>
                <button
                  className="btn-action"
                  disabled={route.status === "Stopped"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRouteClick(route);
                  }}
                  aria-label={`Manage ${route.name}`}
                >
                  Manage
                </button>
              </div>
            ))}
          </section>
        </main>

        {/* Drawer Panel */}
        {selectedRoute && (
  <div
    className="drawer-overlay"
    onClick={() => setSelectedRoute(null)}
    aria-hidden={false}
  >
    <aside
      className="drawer open"
      role="region"
      aria-label="Route management details"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
    >
      <div className="drawer-header">
        <span>{selectedRoute.name}</span>
        <span
          className="close-drawer"
          role="button"
          tabIndex={0}
          aria-label="Close drawer"
          onClick={() => setSelectedRoute(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setSelectedRoute(null);
          }}
        >
          &times;
        </span>
      </div>

      <div className="drawer-content">
        <div className="drawer-info">
          <span>
            Density:{" "}
            <strong style={{ color: densityColors[selectedRoute.density] }}>
              {selectedRoute.density}
            </strong>
          </span>
          <span>
            Status:{" "}
            <strong style={{ color: statusColors[selectedRoute.status] }}>
              {selectedRoute.status}
            </strong>
          </span>
        </div>

        <div className="drawer-section">
          <label
            htmlFor="announcement"
            style={{
              color: "#FEE715FF",
              fontWeight: "600",
              marginBottom: "0.4rem",
              display: "block",
            }}
          >
            Enter Announcement
          </label>
          <textarea
            id="announcement"
            placeholder="Type your announcement or instructions here..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            spellCheck={false}
            aria-multiline="true"
            disabled={selectedRoute.status === "Stopped"}
          />
        </div>

        <div className="drawer-btns">
          <button
            className="btn-announcement"
            onClick={onSendAnnouncement}
            disabled={selectedRoute.status === "Stopped"}
            aria-label="Send announcement"
          >
            Send Announcement
          </button>
          <button
            className="btn-stop"
            onClick={onStopRoute}
            disabled={selectedRoute.status === "Stopped"}
            aria-label="Stop this route"
          >
            Stop Route
          </button>
        </div>

        {message && (
          <div className="message-box" role="alert">
            {message}
          </div>
        )}
      </div>
    </aside>
    <style>{`
      /* Overlay that sits behind the drawer */
      .drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.6);
        z-index: 999;
        display: flex;
        justify-content: flex-end;
        user-select: none;
      }
    `}</style>
  </div>
)}

      </div>
    </>
  );
};

export default MahakumbhRouteFlowManager;
