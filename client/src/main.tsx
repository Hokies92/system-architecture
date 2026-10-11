import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom styles for the architecture explorer
const style = document.createElement('style');
style.textContent = `
  .clip-arrow {
    clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
  }
  
  @keyframes pulse-border {
    0%, 100% { border-color: rgba(59, 130, 246, 0.5); }
    50% { border-color: rgba(59, 130, 246, 1); }
  }
  
  .animate-pulse-border {
    animation: pulse-border 2s infinite;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
