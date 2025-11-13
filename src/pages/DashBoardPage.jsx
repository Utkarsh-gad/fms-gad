import React from 'react';
import TopActiveUsersCard from '../component/cards/TopActiveUsersCard';
import DatabaseTablesCard from '../component/cards/DatabaseTablesCard';
import GCPFoldersCard from '../component/cards/GCPFoldersCard';
import demoData from '../data/demoData';
import UnreadEmailsCard from '../component/cards/UnreadEmailsCard';
import SalesDashboardCard from '../component/cards/SalesDashBoardCard';
import AgeingAbove90Card from '../component/cards/AgeingAbove90Card';

const DashboardPage = () => {
  return (
    <div className="p-4">
      <h2>Dashboard</h2>
      {/* Display options or content here */}
      <p>Welcome to your dashboard!</p>
      {/* Add links or buttons for navigation */}

      {/* Top Row - 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        
        <TopActiveUsersCard  users={demoData.topActiveUsers} />
        <DatabaseTablesCard tables={demoData.databaseTables} />
        <GCPFoldersCard folders={demoData.gcpFolders} />
      </div>

      {/* Bottom Row - 3 Cards */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <UnreadEmailsCard emails={demoData.unreadEmails} />
        <SalesDashboardCard sales={demoData.salesDashboard} />
        <AgeingAbove90Card data={demoData.ageingData} />
      </div>
    </div>
  );
};

export default DashboardPage;
