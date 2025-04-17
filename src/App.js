import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DataSources from './DataSources';
import About from './about';

// Real data from research document
const participationData = [
  { name: 'Uniswap', daoParticipation: 3.2, corporateParticipation: 70 },
  { name: 'MakerDAO', daoParticipation: 9.4, corporateParticipation: 68 },
  { name: 'Aave', daoParticipation: 4.7, corporateParticipation: 72 },
  { name: 'Decentraland', daoParticipation: 5.8, corporateParticipation: 65 },
  { name: 'Compound', daoParticipation: 6.2, corporateParticipation: 69 },
];

const powerDistributionData = {
  'Uniswap': [
    { name: 'Top 1%', dao: 68, corporate: 0 },
    { name: 'Next 9%', dao: 24, corporate: 0 },
    { name: 'Remaining 90%', dao: 8, corporate: 0 }
  ],
  'MakerDAO': [
    { name: 'Top 1%', dao: 62, corporate: 0 },
    { name: 'Next 9%', dao: 28, corporate: 0 },
    { name: 'Remaining 90%', dao: 10, corporate: 0 }
  ],
  'Meta': [
    { name: 'CEO/Founder', corporate: 58, dao: 0 },
    { name: 'Institutional', corporate: 32, dao: 0 },
    { name: 'Retail', corporate: 10, dao: 0 }
  ],
  'Berkshire': [
    { name: 'CEO/Management', corporate: 38, dao: 0 },
    { name: 'Institutional', corporate: 52, dao: 0 },
    { name: 'Retail', corporate: 10, dao: 0 }
  ],
  'Tesla': [
    { name: 'CEO/Founder', corporate: 43, dao: 0 },
    { name: 'Institutional', corporate: 45, dao: 0 },
    { name: 'Retail', corporate: 12, dao: 0 }
  ],
  'Apple': [
    { name: 'Executive Team', corporate: 15, dao: 0 },
    { name: 'Institutional', corporate: 73, dao: 0 },
    { name: 'Retail', corporate: 12, dao: 0 }
  ]
};

const decisionTimelineData = {
  'DAO': [
    { name: 'Forum Discussion', days: 7 },
    { name: 'Temperature Check', days: 3 },
    { name: 'Consensus Check', days: 3 },
    { name: 'On-chain Proposal', days: 2 },
    { name: 'Execution', days: 2 }
  ],
  'Corporate': [
    { name: 'Board Planning', days: 14 },
    { name: 'Proxy Statement', days: 30 },
    { name: 'AGM', days: 1 },
    { name: 'Implementation', days: 60 }
  ]
};

const compareTimelineData = [
  { name: 'Proposal', dao: 1, corporate: 14 },
  { name: 'Discussion', dao: 7, corporate: 30 },
  { name: 'Voting', dao: 5, corporate: 1 },
  { name: 'Execution', dao: 2, corporate: 60 }
];

const outcomeAnalysisData = [
  { name: 'Treasury', daoSuccess: 72, corporateSuccess: 95 },
  { name: 'Protocol', daoSuccess: 78, corporateSuccess: 92 },
  { name: 'Grants', daoSuccess: 48, corporateSuccess: 65 },
  { name: 'Community', daoSuccess: 85, corporateSuccess: 45 },
];

// DAOs and corporations from the research
const daoOptions = ['Uniswap', 'MakerDAO', 'Aave', 'Decentraland', 'Compound'];
const corporateOptions = ['Meta', 'Berkshire Hathaway', 'Tesla', 'Apple'];

// Colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function Dashboard() {
  const [selectedDAO, setSelectedDAO] = useState('Uniswap');
  const [selectedCorporation, setSelectedCorporation] = useState('Meta');
  const [activeTab, setActiveTab] = useState('overview');

  // Get correct power distribution data based on selection
  const getDAOPowerData = () => {
    return powerDistributionData[selectedDAO] || powerDistributionData['Uniswap'];
  };

  const getCorporatePowerData = () => {
    return powerDistributionData[selectedCorporation] || powerDistributionData['Meta'];
  };

  // Get metrics for selected entities
  const getDaoParticipation = () => {
    const data = participationData.find(item => item.name === selectedDAO);
    return data ? data.daoParticipation : 4.2;
  };

  const getCorporateParticipation = () => {
    const data = participationData.find(item => item.name === selectedDAO);
    return data ? data.corporateParticipation : 70;
  };

  // Get additional metrics
  const getDAOInfo = () => {
    switch(selectedDAO) {
      case 'Uniswap':
        return { 
          token: 'UNI',
          governance: 'Uses Snapshot for off-chain voting',
          challenge: 'Low participation and vote centralization',
          treasury: 'One of the largest DAO treasuries',
          notable: 'Pioneered liquidity protocol governance',
          gini: 0.87,
          topWallets: '68%',
          delegation: '21%'
        };
      case 'MakerDAO':
        return { 
          token: 'MKR',
          governance: 'Complex system with delegates, executive votes, and governance facilitators',
          challenge: 'Voter apathy on technical decisions',
          treasury: '$500M+',
          notable: 'Pioneer in on-chain governance',
          gini: 0.82,
          topWallets: '62%',
          delegation: '35%'
        };
      case 'Aave':
        return { 
          token: 'AAVE',
          governance: 'Uses Snapshot + on-chain actions via Tally',
          challenge: 'Technical complexity of proposals',
          treasury: '$250M+',
          notable: 'Well-structured governance process',
          gini: 0.78,
          topWallets: '58%',
          delegation: '28%'
        };
      case 'Decentraland':
        return { 
          token: 'MANA',
          governance: 'Uses Aragon stack',
          challenge: 'Governing virtual assets',
          treasury: '$100M+',
          notable: 'Governance of virtual land and digital assets',
          gini: 0.75,
          topWallets: '53%',
          delegation: '18%'
        };
      case 'Compound':
        return { 
          token: 'COMP',
          governance: 'On-chain voting with time-lock execution',
          challenge: 'Developer-heavy proposals',
          treasury: '$350M+',
          notable: 'Pioneered on-chain governance for DeFi',
          gini: 0.81,
          topWallets: '60%',
          delegation: '32%'
        };
      default:
        return { 
          token: 'UNI',
          governance: 'Uses Snapshot for off-chain voting',
          challenge: 'Low participation and vote centralization',
          treasury: 'Large',
          notable: 'Pioneered liquidity protocol governance',
          gini: 0.87,
          topWallets: '68%',
          delegation: '21%'
        };
    }
  };

  const getCorporateInfo = () => {
    switch(selectedCorporation) {
      case 'Meta':
        return { 
          structure: 'Centralized with Mark Zuckerberg holding major control via dual-class shares',
          power: 'Zuckerberg controls ~58% voting power',
          notable: 'Example of how centralized power can shape corporate policy',
          gini: 0.81,
          institutional: '76%',
          founder: '58%'
        };
      case 'Berkshire Hathaway':
        return { 
          structure: 'Small board and centralized decision-making',
          power: 'Led by Warren Buffett with significant influence',
          notable: 'Long-term shareholder focus, unique annual meetings',
          gini: 0.76,
          institutional: '80%',
          founder: '38%'
        };
      case 'Tesla':
        return { 
          structure: 'Board influenced by CEO',
          power: 'Elon Musk\'s influence dominates decision-making',
          notable: 'Strong CEO influence, retail investor engagement',
          gini: 0.79,
          institutional: '75%',
          founder: '43%'
        };
      case 'Apple':
        return { 
          structure: 'Traditional board structure with active shareholder meetings',
          power: 'More distributed than other examples',
          notable: 'Strong board, shareholder activism, large retail investor base',
          gini: 0.72,
          institutional: '73%',
          founder: '15%'
        };
      default:
        return { 
          structure: 'Centralized with Mark Zuckerberg holding major control via dual-class shares',
          power: 'Zuckerberg controls ~58% voting power',
          notable: 'Example of how centralized power can shape corporate policy',
          gini: 0.81,
          institutional: '76%',
          founder: '58%'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">DAO vs Corporate Governance Dashboard</h1>
          <p className="mt-2 text-gray-600">Interactive comparison of decentralized and traditional governance models</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Entity Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Select DAO</h2>
            <div className="flex flex-wrap gap-2">
              {daoOptions.map(dao => (
                <button
                  key={dao}
                  className={`px-4 py-2 rounded ${selectedDAO === dao ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setSelectedDAO(dao)}
                >
                  {dao}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Select Corporation</h2>
            <div className="flex flex-wrap gap-2">
              {corporateOptions.map(corp => (
                <button
                  key={corp}
                  className={`px-4 py-2 rounded ${selectedCorporation === corp ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setSelectedCorporation(corp)}
                >
                  {corp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
          <button
            className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'participation' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('participation')}
          >
            Participation
          </button>
          <button
            className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'power' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('power')}
          >
            Power Distribution
          </button>
          <button
            className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'timeline' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('timeline')}
          >
            Decision Timeline
          </button>
          <button
            className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'outcomes' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('outcomes')}
          >
            Outcomes
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Governance Overview: {selectedDAO} vs {selectedCorporation}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Voter Turnout</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{getDaoParticipation()}%</p>
                      <p className="text-sm text-gray-500">{selectedDAO}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{getCorporateParticipation()}%</p>
                      <p className="text-sm text-gray-500">{selectedCorporation}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Power Concentration</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{getDAOInfo().topWallets}</p>
                      <p className="text-sm text-gray-500">Top holders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{getCorporateInfo().founder}</p>
                      <p className="text-sm text-gray-500">Control</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Decision Timeline</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">7-30 days</p>
                      <p className="text-sm text-gray-500">Proposal to execution</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">Weeks-Months</p>
                      <p className="text-sm text-gray-500">Board process</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Gini Coefficient</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{getDAOInfo().gini}</p>
                      <p className="text-sm text-gray-500">DAO inequality</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{getCorporateInfo().gini}</p>
                      <p className="text-sm text-gray-500">Corporate inequality</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Governance Profile: {selectedDAO}</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <span className="font-semibold">Token:</span> {getDAOInfo().token}
                    </div>
                    <div className="mb-3">
                      <span className="font-semibold">Governance Mechanism:</span> {getDAOInfo().governance}
                    </div>
                    <div className="mb-3">
                      <span className="font-semibold">Key Challenge:</span> {getDAOInfo().challenge}
                    </div>
                    <div className="mb-3">
                      <span className="font-semibold">Notable For:</span> {getDAOInfo().notable}
                    </div>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                      <span className="font-semibold">DAO Process:</span>
                      <ol className="list-decimal list-inside space-y-1 mt-2">
                        <li>Forum discussion</li>
                        <li>Temperature Check vote</li>
                        <li>Consensus Check vote</li>
                        <li>Proposal code posted on-chain</li>
                        <li>Execution via smart contract</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Governance Profile: {selectedCorporation}</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <span className="font-semibold">Structure:</span> {getCorporateInfo().structure}
                    </div>
                    <div className="mb-3">
                      <span className="font-semibold">Power Distribution:</span> {getCorporateInfo().power}
                    </div>
                    <div className="mb-3">
                      <span className="font-semibold">Institutional Ownership:</span> {getCorporateInfo().institutional}
                    </div>
                    <div className="mb-3">
                      <span className="font-semibold">Notable For:</span> {getCorporateInfo().notable}
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-lg">
                      <span className="font-semibold">Corporate Process:</span>
                      <ol className="list-decimal list-inside space-y-1 mt-2">
                        <li>Board prepares proposals</li>
                        <li>Proxy statement issued to shareholders</li>
                        <li>Annual General Meeting (AGM)</li>
                        <li>Shareholder vote (binding/non-binding)</li>
                        <li>Board decision implemented by executives</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'participation' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Voter Participation Comparison</h2>
              <p className="mb-6 text-gray-600">Compare voter turnout percentages between DAOs and traditional corporations.</p>
              
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={participationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="daoParticipation" name="DAO Participation %" fill="#0088FE" />
                  <Bar dataKey="corporateParticipation" name="Corporate Participation %" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Corporate governance typically sees 60-75% participation through proxy voting</li>
                  <li>DAO participation rates rarely exceed 10% of token holders</li>
                  <li>Low DAO participation creates vulnerability to whale influence</li>
                  <li>Corporate votes are often bundled, increasing participation appearance</li>
                </ul>
              </div>

              <div className="mt-8 p-4 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Participation Barriers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">DAO Barriers to Participation</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Gas fees for on-chain voting</li>
                      <li>Technical complexity of proposals</li>
                      <li>UI/UX challenges in governance platforms</li>
                      <li>Token distribution inequality</li>
                      <li>Proposal volume overwhelming participants</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Corporate Barriers to Participation</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Legal and bureaucratic complexity</li>
                      <li>Institutional dominance of voting</li>
                      <li>Limited shareholder proposal access</li>
                      <li>Regulatory hurdles for proposals</li>
                      <li>Symbolic nature of many votes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'power' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Power Distribution Analysis</h2>
              <p className="mb-6 text-gray-600">Visualizing how voting power is distributed in {selectedDAO} and {selectedCorporation}.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{selectedDAO} Power Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getDAOPowerData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="dao"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {getDAOPowerData().map((entry, index) => (
                          <Cell key={`cell-dao-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{selectedCorporation} Power Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getCorporatePowerData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="corporate"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {getCorporatePowerData().map((entry, index) => (
                          <Cell key={`cell-corp-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Power Distribution Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700">DAO: {selectedDAO}</h4>
                    <p className="text-sm text-gray-600 mt-2">Gini Coefficient: {getDAOInfo().gini}</p>
                    <p className="text-sm text-gray-600">Top 10 Wallets: {getDAOInfo().topWallets} of voting power</p>
                    <p className="text-sm text-gray-600">Delegation Rate: {getDAOInfo().delegation} of tokens</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Corporation: {selectedCorporation}</h4>
                    <p className="text-sm text-gray-600 mt-2">Gini Coefficient: {getCorporateInfo().gini}</p>
                    <p className="text-sm text-gray-600">Institutional Ownership: {getCorporateInfo().institutional}</p>
                    <p className="text-sm text-gray-600">CEO/Founder Control: {getCorporateInfo().founder} voting rights</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Decision Flow Timeline</h2>
              <p className="mb-6 text-gray-600">Comparing the time required for governance decisions in each system (days).</p>
              
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={compareTimelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dao" name="DAO Timeline (days)" fill="#0088FE" />
                  <Bar dataKey="corporate" name="Corporate Timeline (days)" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">DAO Process: {selectedDAO}</h3>
                  {decisionTimelineData['DAO'].map((step, index) => (
                    <div key={`dao-step-${index}`} className="relative">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center mr-3 z-10">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{step.name}</p>
                          <p className="text-sm text-gray-600">{step.days} days</p>
                        </div>
                      </div>
                      {index < decisionTimelineData['DAO'].length - 1 && (
                        <div className="absolute top-8 left-4 h-6 w-0.5 bg-blue-200 z-0"></div>
                      )}
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="font-medium">Total Timeline: ~17 days</p>
                    <p className="text-sm text-gray-600 mt-1">Demonstrates the efficiency of DAO governance for standard proposals</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Corporate Process: {selectedCorporation}</h3>
                  {decisionTimelineData['Corporate'].map((step, index) => (
                    <div key={`corp-step-${index}`} className="relative">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center mr-3 z-10">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{step.name}</p>
                          <p className="text-sm text-gray-600">{step.days} days</p>
                        </div>
                      </div>
                      {index < decisionTimelineData['Corporate'].length - 1 && (
                        <div className="absolute top-8 left-4 h-6 w-0.5 bg-green-200 z-0"></div>
                      )}
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="font-medium">Total Timeline: ~105 days</p>
                    <p className="text-sm text-gray-600 mt-1">Reflects the formal, regulated nature of corporate governance</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Governance Outcome Analysis</h2>
              <p className="mb-6 text-gray-600">Success rates of proposals by category (%).</p>
              
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={outcomeAnalysisData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="daoSuccess" name="DAO Success Rate %" fill="#0088FE" />
                  <Bar dataKey="corporateSuccess" name="Corporate Success Rate %" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Featured Case Studies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-blue-200 rounded-lg p-4 case-study-card">
                    <h4 className="font-medium text-blue-700">Uniswap V3 Deployment</h4>
                    <p className="text-sm text-gray-600 mt-2">Major protocol upgrade governance process</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">DAO Case Study</span>
                      <button className="text-blue-600 text-sm">View Details →</button>
                    </div>
                  </div>
                  <div className="border border-green-200 rounded-lg p-4 case-study-card">
                    <h4 className="font-medium text-green-700">Meta Privacy Policy Changes</h4>
                    <p className="text-sm text-gray-600 mt-2">Corporate governance affecting billions</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Corporate Case Study</span>
                      <button className="text-green-600 text-sm">View Details →</button>
                    </div>
                  </div>
                  <div className="border border-blue-200 rounded-lg p-4 case-study-card">
                    <h4 className="font-medium text-blue-700">MakerDAO Emergency Shutdown</h4>
                    <p className="text-sm text-gray-600 mt-2">Crisis governance during market volatility</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">DAO Case Study</span>
                      <button className="text-blue-600 text-sm">View Details →</button>
                    </div>
                  </div>
                  <div className="border border-green-200 rounded-lg p-4 case-study-card">
                    <h4 className="font-medium text-green-700">Tesla Compensation Package</h4>
                    <p className="text-sm text-gray-600 mt-2">Controversial corporate vote</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Corporate Case Study</span>
                      <button className="text-green-600 text-sm">View Details →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">DAO Governance Research Dashboard — Data sources include DeepDAO, Tally, Snapshot, SEC filings</p>
          <div className="flex justify-center mt-4 space-x-4">
            <Link to="/about" className="text-sm text-blue-600">About</Link>
            <button className="text-sm text-blue-600">Methodology</button>
            <Link to="/data-sources" className="text-sm text-blue-600">Data Sources</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/data-sources" element={<DataSources />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;