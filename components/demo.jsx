import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Screen 1: Login Form Design
export const LoginScreen = ({ data }) => (
  <div className="screen login-screen">
    <Handle type="target" position={Position.Top} />
    
    <div className="login-container">
      <h3>Login Screen</h3>
      <form className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-input" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-input" placeholder="Enter password" />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="links">
        <a href="#forgot">Forgot Password?</a>
        <a href="#signup">Sign Up</a>
      </div>
    </div>
    
    <Handle type="source" position={Position.Bottom} />
  </div>
);

// Screen 2: Dashboard Design
const DashboardScreen = ({ data }) => (
  <div className="screen dashboard-screen">
    <Handle type="target" position={Position.Top} />
    
    <div className="dashboard-container">
      <h3>Dashboard</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Users</h4>
          <p>1,234</p>
        </div>
        <div className="stat-card">
          <h4>Revenue</h4>
          <p>$12,456</p>
        </div>
        <div className="stat-card">
          <h4>Orders</h4>
          <p>89</p>
        </div>
      </div>
      <div className="actions">
        <button className="btn-primary">View Reports</button>
        <button className="btn-secondary">Settings</button>
      </div>
    </div>
    
    <Handle type="source" position={Position.Bottom} />
    <Handle type="source" position={Position.Right} />
  </div>
);

// Screen 3: Settings Form Design
const SettingsScreen = ({ data }) => (
  <div className="screen settings-screen">
    <Handle type="target" position={Position.Left} />
    
    <div className="settings-container">
      <h3>User Settings</h3>
      <div className="settings-form">
        <div className="form-section">
          <label>Theme:</label>
          <select className="form-select">
            <option>Light</option>
            <option>Dark</option>
            <option>Auto</option>
          </select>
        </div>
        <div className="form-section">
          <label>Notifications:</label>
          <div className="checkboxes">
            <label><input type="checkbox" /> Email</label>
            <label><input type="checkbox" /> Push</label>
            <label><input type="checkbox" /> SMS</label>
          </div>
        </div>
        <div className="form-section">
          <label>Language:</label>
          <select className="form-select">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <button className="save-btn">Save Settings</button>
      </div>
    </div>
    
    <Handle type="source" position={Position.Right} />
  </div>
);

// Screen 4: Product Catalog Design
const CatalogScreen = ({ data }) => (
  <div className="screen catalog-screen">
    <Handle type="target" position={Position.Left} />
    
    <div className="catalog-container">
      <h3>Product Catalog</h3>
      <div className="products-grid">
        <div className="product-card">
          <img src="https://via.placeholder.com/100" alt="Product" />
          <h5>Product 1</h5>
          <p>$19.99</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
        <div className="product-card">
          <img src="https://via.placeholder.com/100" alt="Product" />
          <h5>Product 2</h5>
          <p>$29.99</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
      <div className="catalog-actions">
        <button className="btn-primary">Load More</button>
        <button className="btn-secondary">Filter</button>
      </div>
    </div>
    
    <Handle type="source" position={Position.Right} />
  </div>
);

// Register all screen types
const nodeTypes = {
  loginScreen: LoginScreen,
  dashboardScreen: DashboardScreen,
  settingsScreen: SettingsScreen,
  catalogScreen: CatalogScreen,
};
