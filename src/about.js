import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">DAO Governance Dashboard</h1>
          <p className="mt-2 text-gray-600">About the Project</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Project Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-gray-700 mb-4">
            The DAO Governance Dashboard is an interactive visualization tool designed to compare 
            governance mechanisms between Decentralized Autonomous Organizations (DAOs) and traditional 
            corporate structures. Our dashboard provides researchers, investors, and governance 
            enthusiasts with data-driven insights into participation rates, power distribution, 
            decision timelines, and governance outcomes.
          </p>
          <p className="text-gray-700 mb-4">
            This project aims to bridge the gap in understanding between emerging blockchain-based 
            governance systems and established corporate governance frameworks. By visualizing these 
            differences side-by-side, we hope to contribute to the ongoing dialogue about the future 
            of organizational governance.
          </p>
        </div>

        {/* The Team
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">The Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Andrew Pleeter</h3>
              <p className="text-gray-700 mb-3">
                Researcher & Front-end Developer
              </p>
              <p className="text-gray-600 text-sm mb-3">
                Andrew specializes in blockchain governance mechanisms and decentralized systems. 
                With a background in both finance and computer science, he brings a unique perspective 
                to the analysis of governance frameworks in digital economies.
              </p>
              <div className="flex space-x-3 mt-2">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
              </div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Caleb Kumar</h3>
              <p className="text-gray-700 mb-3">
                Data Researcher
              </p>
              <p className="text-gray-600 text-sm mb-3">
                Caleb focuses on quantitative analysis of governance data and metrics. His expertise 
                in corporate governance structures and statistical modeling helps uncover patterns and 
                insights across different organizational models.
              </p>
              <div className="flex space-x-3 mt-2">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* Technical Implementation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Technical Implementation</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Technology Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-700">Frontend</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>React (Create React App)</li>
                    <li>React Router for navigation</li>
                    <li>Recharts for data visualization</li>
                    <li>Custom CSS utility classes</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-700">Data Processing</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>JavaScript data manipulation</li>
                    <li>JSON data structure</li>
                    <li>Statistical normalization</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-purple-700">Research Methodology</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Comparative analysis</li>
                    <li>Metric standardization</li>
                    <li>Case study development</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Project Repository</h3>
              <p className="text-gray-700 mb-2">
                This project is available on GitHub open source.
              </p>
              <a 
                href="https://github.com/cekcreator/explaining_daos" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
        
        {/* Acknowledgments
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Acknowledgments</h2>
          <p className="text-gray-700 mb-4">
            We would like to thank the numerous DAO communities, corporate governance experts, and 
            open data providers whose work made this research possible. Special thanks to DeepDAO, 
            Snapshot, Tally, and the SEC for making governance data accessible for analysis.
          </p>
          <p className="text-gray-700 mb-4">
            This project was developed as part of our ongoing research into decentralized governance 
            mechanisms and their potential applications in organizational design.
          </p>
        </div> */}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">DAO Governance Research Dashboard — Developed by Andrew Pleeter & Caleb Kumar</p>
          <div className="flex justify-center mt-4 space-x-4">
            <Link to="/" className="text-sm text-blue-600">Dashboard Home</Link>
            <Link to="/data-sources" className="text-sm text-blue-600">Data Sources</Link>
            <Link to="/about" className="text-sm text-blue-600">About the Project</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;