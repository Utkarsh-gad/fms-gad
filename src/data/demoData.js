const demoData = {
  topActiveUsers: [
    { id: 1, name: 'Admin', lastActive: '11/13/2025, 11:12:07 AM', status: 'online' },
    { id: 2, name: 'John Doe', lastActive: '11/4/2025, 3:33:15 PM', status: 'offline' },
    { id: 3, name: 'Jane Smith', lastActive: '11/4/2025, 3:33:15 PM', status: 'offline' },
    { id: 4, name: 'Bob Johnson', lastActive: '11/3/2025, 10:20:45 AM', status: 'offline' }
  ],
  databaseTables: [
    { no: 1, name: 'shoeweights', docs: 245, total: '2.4 MB' },
    { no: 2, name: 'vendors', docs: 156, total: '1.8 MB' },
    { no: 3, name: 'drivenodes', docs: 89, total: '980 KB' },
    { no: 4, name: 'keycategories', docs: 234, total: '3.1 MB' },
    { no: 5, name: 'pdfs', docs: 567, total: '45.2 MB' },
    { no: 6, name: 'rrn_upper_purchase_mrrs', docs: 123, total: '1.5 MB' },
    { no: 7, name: 'useractivities', docs: 890, total: '8.9 MB' }
  ],
  gcpFolders: [
    { no: 1, name: 'Documents', docs: 342, total: '25.6 GB' },
    { no: 2, name: 'Images', docs: 1567, total: '89.3 GB' },
    { no: 3, name: 'Backups', docs: 45, total: '156.8 GB' },
    { no: 4, name: 'Reports', docs: 234, total: '12.4 GB' }
  ],
  unreadEmails: [
    { id: 1, from: 'john@example.com', subject: 'Q4 Sales Report', time: '2 hours ago' },
    { id: 2, from: 'jane@example.com', subject: 'Team Meeting Tomorrow', time: '5 hours ago' },
    { id: 3, from: 'bob@example.com', subject: 'Project Update Required', time: '1 day ago' },
    { id: 4, from: 'alice@example.com', subject: 'New Feature Request', time: '2 days ago' }
  ],
  salesDashboard: [
    { metric: 'Sales in Crores', yesterday: '2.45', mtd: '68.90', cfy: '845.67', pfy: '756.34' },
    { metric: 'Collections in Crores', yesterday: '1.98', mtd: '52.30', cfy: '678.45', pfy: '612.89' },
    { metric: 'New Dealers', yesterday: '3', mtd: '45', cfy: '456', pfy: '389' },
    { metric: 'Sales Last Month', yesterday: '-', mtd: '-', cfy: '789.23', pfy: '698.45' }
  ],
  ageingData: [
    { id: 1, dealer: 'ABC Enterprises', state: 'Maharashtra', amount: '5.67', days: 95 },
    { id: 2, dealer: 'XYZ Traders', state: 'Gujarat', amount: '3.45', days: 102 },
    { id: 3, dealer: 'PQR Solutions', state: 'Karnataka', amount: '7.89', days: 120 },
    { id: 4, dealer: 'LMN Industries', state: 'Tamil Nadu', amount: '4.23', days: 98 }
  ]
};
export default demoData;