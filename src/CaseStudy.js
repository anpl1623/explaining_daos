import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Case study data
const caseStudies = {
  'uniswap-v3': {
    title: 'Uniswap V3 Deployment',
    type: 'dao',
    organization: 'Uniswap',
    summary: 'How Uniswap governance navigated a major protocol upgrade that fundamentally changed the DeFi landscape.',
    background: `In March 2021, Uniswap announced a major upgrade to its protocol with V3, introducing concentrated liquidity, 
    multiple fee tiers, and advanced oracles. This upgrade required a comprehensive governance process to implement successfully.`,
    timeline: [
      { step: "Initial Announcement", date: "March 23, 2021", description: "Uniswap Labs announced V3 technical details" },
      { step: "Community Discussion", date: "March 23-30, 2021", description: "Forum discussions and feedback collection" },
      { step: "Temperature Check", date: "April 1, 2021", description: "Snapshot vote to gauge community interest (passed with 95% approval)" },
      { step: "Formal Proposal", date: "April 5, 2021", description: "Detailed deployment proposal including license terms" },
      { step: "Consensus Check", date: "April 8-12, 2021", description: "Second Snapshot vote for consensus on detailed proposal" },
      { step: "On-chain Vote", date: "April 14-21, 2021", description: "Final on-chain governance vote (passed with 98.6% approval)" },
      { step: "Deployment", date: "May 5, 2021", description: "V3 protocol went live on Ethereum mainnet" },
    ],
    challenges: [
      "License Terms: Business Source License (BSL) instead of fully open MIT License generated significant debate",
      "Governance Participation: Despite being a major protocol change, only 7.1% of UNI tokens participated in the vote",
      "Technical Complexity: Many token holders struggled to understand the technical implications of the upgrade",
      "Power Concentration: The top 10 UNI token holders controlled the majority of voting power"
    ],
    outcomes: [
      "Successfully deployed V3 protocol with overwhelmingly positive votes",
      "Established business license precedent for DeFi protocols seeking competitive protection",
      "Created framework for future protocol upgrades",
      "Highlighted low participation challenges in token-based governance"
    ],
    insights: `The Uniswap V3 governance process demonstrated both strengths and weaknesses of DAO governance. 
    The process was transparent and well-documented, moving efficiently from proposal to implementation in about 6 weeks. 
    However, the low participation rate (7.1%) and concentrated voting power raise questions about decentralization in practice. 
    The BSL license debate showed tensions between open-source ideals and protocol value capture.`,
    metrics: {
      voterParticipation: [
        { name: 'Voting UNI', value: 7.1 },
        { name: 'Non-voting UNI', value: 92.9 }
      ],
      timeToImplement: [
        { name: 'Community Discussion', days: 7 },
        { name: 'Temperature Check', days: 3 },
        { name: 'Formal Proposal', days: 4 },
        { name: 'Consensus Check', days: 5 },
        { name: 'On-chain Vote', days: 7 },
        { name: 'Deployment Prep', days: 14 }
      ],
      voterComposition: [
        { name: 'Top 1% Wallets', value: 65 },
        { name: 'Next 9% Wallets', value: 27 },
        { name: 'Remaining 90%', value: 8 }
      ]
    }
  },
  'makerdao-emergency': {
    title: 'MakerDAO Emergency Shutdown Vote',
    type: 'dao',
    organization: 'MakerDAO',
    summary: 'How MakerDAO responded to the March 2020 crypto market crash with emergency governance actions.',
    background: `On "Black Thursday" (March 12, 2020), Ethereum's price crashed by over 50% in 24 hours, creating a crisis for 
    MakerDAO's collateralized debt positions. The crash triggered a series of liquidations, system congestion, and ultimately 
    led to $5.67 million in under-collateralized debt for the protocol.`,
    timeline: [
      { step: "Market Crash", date: "March 12, 2020", description: "ETH price crashed over 50%, triggering liquidations" },
      { step: "Crisis Identified", date: "March 12, 2020", description: "Zero-bid liquidation auctions discovered, creating protocol debt" },
      { step: "Emergency Discussion", date: "March 12-13, 2020", description: "Community forums and emergency calls to discuss options" },
      { step: "Interim Measures", date: "March 13, 2020", description: "Emergency oracle shutdown to prevent further liquidations" },
      { step: "Governance Poll", date: "March 16, 2020", description: "Multiple options presented to the community via poll" },
      { step: "Debt Auction", date: "March 19, 2020", description: "MKR debt auction to recapitalize the system" },
      { step: "System Parameters Update", date: "March 24, 2020", description: "New risk parameters and auction designs implemented" },
    ],
    challenges: [
      "Time Pressure: Crisis requiring immediate response vs. governance designed for deliberation",
      "Technical Complexity: System failure involving multiple complex components",
      "Competing Solutions: Multiple valid approaches to solving the crisis",
      "Governance vs. Crisis Management: Balancing decentralized decision-making with emergency response"
    ],
    outcomes: [
      "Successfully recapitalized the system through MKR auctions",
      "Implemented new auction mechanisms to prevent future zero-bid scenarios",
      "Developed emergency response procedures for future crises",
      "Enhanced monitoring and early warning systems",
      "Added USDC as a collateral type to reduce reliance on ETH"
    ],
    insights: `The MakerDAO emergency response showed both the strengths and limitations of DAO governance during crisis scenarios. 
    The transparent, on-chain governance allowed for community input, but the process was necessarily accelerated compared to normal 
    governance procedures. Core teams had to take initiative while still maintaining some governance process. This case highlights 
    the tension between decentralization ideals and operational realities during system emergencies.`,
    metrics: {
      voterParticipation: [
        { name: 'Voting MKR', value: 14.2 },
        { name: 'Non-voting MKR', value: 85.8 }
      ],
      timeToImplement: [
        { name: 'Crisis Identification', days: 1 },
        { name: 'Emergency Discussion', days: 2 },
        { name: 'Governance Poll', days: 3 },
        { name: 'Implementation', days: 5 },
        { name: 'Full Resolution', days: 12 }
      ],
      voterComposition: [
        { name: 'Top 1% Wallets', value: 62 },
        { name: 'Next 9% Wallets', value: 29 },
        { name: 'Remaining 90%', value: 9 }
      ]
    }
  },
  'meta-privacy': {
    title: 'Meta Privacy Policy Changes',
    type: 'corporate',
    organization: 'Meta Platforms, Inc.',
    summary: 'How Meta implemented significant privacy policy changes affecting billions of users worldwide.',
    background: `In the wake of the Cambridge Analytica scandal and subsequent regulatory scrutiny, Meta (then Facebook) 
    undertook a major overhaul of its privacy policies and data handling practices. This case study examines how corporate 
    governance handled a significant policy change affecting billions of users.`,
    timeline: [
      { step: "Initial Board Discussion", date: "Q2 2018", description: "Board committee review of privacy concerns" },
      { step: "Policy Development", date: "Q3-Q4 2018", description: "Internal development of new privacy framework" },
      { step: "Regulatory Consultation", date: "Q1 2019", description: "Discussions with regulators in key markets" },
      { step: "Board Approval", date: "Q2 2019", description: "Full board approval of new privacy framework" },
      { step: "Shareholder Meeting", date: "May 30, 2019", description: "Annual meeting addressing privacy concerns" },
      { step: "Policy Implementation", date: "Q3 2019", description: "Phased rollout of new privacy controls and policies" },
      { step: "Compliance Verification", date: "Q4 2019-Q1 2020", description: "Internal and external audits of compliance" },
    ],
    challenges: [
      "Regulatory Complexity: Navigating different privacy requirements across global jurisdictions",
      "Shareholder Pressure: Balancing user privacy with business model preservation",
      "Technical Implementation: Rolling out changes across multiple platforms and billions of users",
      "Centralized Decision-Making: CEO's controlling interest limited shareholder governance influence"
    ],
    outcomes: [
      "Implemented new privacy controls across platforms",
      "Established Privacy Committee of the Board with independent oversight",
      "Created Chief Privacy Officer position reporting to Board committee",
      "Settled FTC investigation with $5 billion fine and new compliance requirements",
      "Limited shareholder influence on final policy decisions despite multiple proposals"
    ],
    insights: `Meta's privacy policy overhaul illustrates the efficiency of centralized corporate decision-making but also its 
    limitations in terms of stakeholder input. Despite multiple shareholder proposals on privacy governance, CEO Mark Zuckerberg's 
    controlling voting interest ensured management maintained decision authority. The process was methodical but largely 
    non-transparent, with key decisions made in closed board meetings rather than public forums. The implementation was technically 
    effective but driven primarily by regulatory pressure rather than user or shareholder governance.`,
    metrics: {
      voterParticipation: [
        { name: 'Voting Shares', value: 75.2 },
        { name: 'Non-voting Shares', value: 24.8 }
      ],
      timeToImplement: [
        { name: 'Board Discussion', days: 60 },
        { name: 'Policy Development', days: 120 },
        { name: 'Regulatory Consultation', days: 90 },
        { name: 'Board Approval', days: 30 },
        { name: 'Implementation', days: 180 }
      ],
      voterComposition: [
        { name: 'CEO/Founder', value: 58 },
        { name: 'Institutional Investors', value: 33 },
        { name: 'Retail Investors', value: 9 }
      ]
    }
  },
  'tesla-compensation': {
    title: 'Tesla CEO Compensation Package',
    type: 'corporate',
    organization: 'Tesla, Inc.',
    summary: 'How Tesla implemented a record-breaking $56 billion CEO compensation package through corporate governance.',
    background: `In 2018, Tesla proposed an unprecedented performance-based compensation package for CEO Elon Musk, 
    potentially worth up to $56 billion, making it the largest CEO pay package in corporate history. This case study examines 
    the corporate governance process that approved this extraordinary proposal.`,
    timeline: [
      { step: "Compensation Committee Meeting", date: "Q4 2017", description: "Initial discussion of CEO incentive structure" },
      { step: "Board Approval", date: "January 2018", description: "Board approves proposed compensation plan" },
      { step: "Proxy Statement Filing", date: "February 8, 2018", description: "Detailed plan disclosed to shareholders" },
      { step: "Shareholder Advisory Recommendations", date: "March 2018", description: "ISS and Glass Lewis recommend against the plan" },
      { step: "Special Shareholder Meeting", date: "March 21, 2018", description: "Shareholders vote to approve the plan" },
      { step: "Plan Implementation", date: "March 21, 2018", description: "Performance-based stock option grants begin" },
      { step: "Performance Milestones", date: "2018-2024", description: "Regular tracking of performance against milestones" },
    ],
    challenges: [
      "Unprecedented Scale: Package size far exceeded typical executive compensation",
      "Proxy Advisor Opposition: Both major advisory firms recommended against the plan",
      "Shareholder Concerns: Significant number of shareholders (73%) supported despite concerns",
      "Corporate Governance Independence: Questions about board independence from CEO influence"
    ],
    outcomes: [
      "Approved compensation package with 73% shareholder support",
      "Established market cap and operational milestones for vesting",
      "Created long-term incentive structure tied to company growth",
      "Demonstrated tension between corporate governance best practices and founder-led companies",
      "Tesla achieved significant market cap growth, meeting multiple milestones"
    ],
    insights: `The Tesla compensation package case highlights how corporate governance can operate differently in founder-led 
    companies. Despite negative recommendations from proxy advisors ISS and Glass Lewis, shareholders approved the plan with 
    73% support. The process followed standard corporate governance procedures, but the outcome diverged from typical governance 
    restraints on executive pay. This illustrates how formal governance processes may yield atypical results when shareholders 
    strongly support a founder's vision despite institutional governance concerns.`,
    metrics: {
      voterParticipation: [
        { name: 'Voting Shares', value: 69.8 },
        { name: 'Non-voting Shares', value: 30.2 }
      ],
      timeToImplement: [
        { name: 'Committee Review', days: 45 },
        { name: 'Board Approval', days: 15 },
        { name: 'Shareholder Notice', days: 45 },
        { name: 'Shareholder Vote', days: 1 },
        { name: 'Implementation', days: 1 }
      ],
      voterComposition: [
        { name: 'CEO/Management', value: 22 },
        { name: 'Institutional Investors', value: 64 },
        { name: 'Retail Investors', value: 14 }
      ]
    }
  },
  'aave-safety': {
    title: 'Aave Safety Module Implementation',
    type: 'dao',
    organization: 'Aave',
    summary: 'How Aave DAO established a decentralized safety module to secure the lending protocol.',
    background: `In late 2020, Aave governance introduced the Safety Module (SM), a critical risk mitigation system 
    where AAVE token holders could stake tokens that would be used as a backstop in case of a shortfall event in the protocol. 
    This case study examines how the DAO implemented this significant security feature.`,
    timeline: [
      { step: "Initial Proposal", date: "October 5, 2020", description: "Safety Module concept introduced in governance forum" },
      { step: "Community Discussion", date: "October 5-12, 2020", description: "Forum debate on parameters and design" },
      { step: "AIP-8 Proposal", date: "October 13, 2020", description: "Formal Aave Improvement Proposal submitted" },
      { step: "Snapshot Vote", date: "October 16-19, 2020", description: "Off-chain vote to gauge community support" },
      { step: "On-chain Vote", date: "October 27-30, 2020", description: "Final binding governance vote" },
      { step: "Contract Deployment", date: "October 31, 2020", description: "Safety Module smart contracts deployed" },
      { step: "Module Activation", date: "December 2020", description: "Safety Module went live with staking" },
    ],
    challenges: [
      "Technical Complexity: Designing a secure staking mechanism with appropriate incentives",
      "Parameter Setting: Determining appropriate rewards and lockup periods",
      "Risk Assessment: Calibrating the module size relative to protocol TVL",
      "Decentralized Security: Balancing DAO control with security requirements"
    ],
    outcomes: [
      "Successfully implemented the Safety Module with strong community support",
      "Accumulated over $1 billion in value in the safety backstop",
      "Established governance framework for risk parameter adjustments",
      "Created a model for decentralized protocol insurance that other DAOs adopted",
      "Enhanced protocol security while maintaining decentralized governance"
    ],
    insights: `The Aave Safety Module implementation demonstrates how DAO governance can effectively address complex risk management 
    challenges. The process leveraged broad community expertise through open forum discussions while maintaining a structured 
    governance process. Decision-making was relatively swift (approximately 25 days from proposal to deployment) but involved 
    multiple checkpoints for community input. This case shows how DAO governance can balance technical expertise, decentralized 
    input, and security requirements effectively.`,
    metrics: {
      voterParticipation: [
        { name: 'Voting AAVE', value: 8.7 },
        { name: 'Non-voting AAVE', value: 91.3 }
      ],
      timeToImplement: [
        { name: 'Initial Discussion', days: 7 },
        { name: 'Formal Proposal', days: 4 },
        { name: 'Snapshot Vote', days: 4 },
        { name: 'On-chain Vote', days: 4 },
        { name: 'Implementation', days: 6 },
        { name: 'Activation', days: 32 }
      ],
      voterComposition: [
        { name: 'Top 1% Wallets', value: 58 },
        { name: 'Next 9% Wallets', value: 31 },
        { name: 'Remaining 90%', value: 11 }
      ]
    }
  }
};

// Color configuration
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const DAOColor = '#0088FE';
const CorporateColor = '#00C49F';

const CaseStudy = () => {
  const { caseId } = useParams();
  const caseStudy = caseStudies[caseId];

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Case Study Not Found</h1>
          <p className="text-gray-700 mb-6">The case study you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const { 
    title, type, organization, summary, background, timeline, 
    challenges, outcomes, insights, metrics 
  } = caseStudy;

  const themeColor = type === 'dao' ? 'blue' : 'green';
  const accentColor = type === 'dao' ? DAOColor : CorporateColor;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">DAO Governance Dashboard</h1>
          <p className="mt-2 text-gray-600">Case Study Analysis</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Case Study Header */}
        <div className={`bg-${themeColor}-50 rounded-lg shadow-md p-6 mb-6 border-l-4 border-${themeColor}-500`}>
          <div className="flex justify-between items-start">
            <div>
              <span className={`inline-block px-3 py-1 text-sm text-white bg-${themeColor}-600 rounded-full mb-2`}>
                {type === 'dao' ? 'DAO Case Study' : 'Corporate Case Study'}
              </span>
              <h2 className="text-3xl font-bold mb-1">{title}</h2>
              <p className="text-xl text-gray-700">{organization}</p>
            </div>
            <Link to="/" className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm">
              Back to Dashboard
            </Link>
          </div>
          <p className="mt-4 text-gray-700 font-medium">{summary}</p>
        </div>

        {/* Background and Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Background</h2>
          <p className="text-gray-700">{background}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Governance Timeline</h2>
          <div className="relative">
            {timeline.map((item, index) => (
              <div key={`timeline-${index}`} className="mb-8 relative">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-8 h-8 rounded-full bg-${themeColor}-500 flex items-center justify-center text-white`}>
                      {index + 1}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`w-1 h-full bg-${themeColor}-200 my-1`}></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.step}</h3>
                    <p className={`text-sm text-${themeColor}-600 font-medium mb-1`}>{item.date}</p>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Participation Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Voter Participation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={metrics.voterParticipation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill={accentColor}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {metrics.voterParticipation.map((entry, index) => (
                    <Cell key={`cell-participation-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Timeline Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Implementation Timeline</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                layout="vertical"
                data={metrics.timeToImplement}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="days" fill={accentColor} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Power Distribution Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Voting Power Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={metrics.voterComposition}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill={accentColor}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {metrics.voterComposition.map((entry, index) => (
                    <Cell key={`cell-composition-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Challenges and Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Challenges */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Key Challenges</h2>
            <ul className="space-y-3">
              {challenges.map((challenge, index) => (
                <li key={`challenge-${index}`} className="flex">
                  <span className={`inline-block w-6 h-6 rounded-full bg-${themeColor}-500 text-white flex-shrink-0 flex items-center justify-center mr-3 mt-0.5`}>
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Outcomes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Outcomes</h2>
            <ul className="space-y-3">
              {outcomes.map((outcome, index) => (
                <li key={`outcome-${index}`} className="flex">
                  <span className={`inline-block w-6 h-6 rounded-full bg-${themeColor}-500 text-white flex-shrink-0 flex items-center justify-center mr-3 mt-0.5`}>
                    ✓
                  </span>
                  <span className="text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Governance Insights</h2>
          <blockquote className={`border-l-4 border-${themeColor}-500 pl-4 italic text-gray-700`}>
            {insights}
          </blockquote>
        </div>

        {/* Related Case Studies */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Explore Related Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(caseStudies)
              .filter(([id, study]) => id !== caseId && study.type === type)
              .slice(0, 2)
              .map(([id, study]) => (
                <Link 
                  key={id} 
                  to={`/case-study/${id}`} 
                  className={`border border-${themeColor}-200 rounded-lg p-4 hover:bg-${themeColor}-50 transition duration-300`}
                >
                  <h3 className="font-medium text-lg">{study.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{study.organization}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className={`text-xs bg-${themeColor}-100 text-${themeColor}-800 px-2 py-1 rounded`}>
                      {study.type === 'dao' ? 'DAO Case Study' : 'Corporate Case Study'}
                    </span>
                    <span className={`text-${themeColor}-600 text-sm`}>View Details →</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">DAO Governance Research Dashboard — Case Study Analysis</p>
          <div className="flex justify-center mt-4 space-x-4">
            <Link to="/" className="text-sm text-blue-600">Dashboard Home</Link>
            <Link to="/data-sources" className="text-sm text-blue-600">Data Sources</Link>
            <Link to="/methodology" className="text-sm text-blue-600">Research Methodology</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CaseStudy;