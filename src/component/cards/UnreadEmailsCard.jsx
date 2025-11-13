const UnreadEmailsCard = ({ emails }) => {
  return (
    <div className="bg-white rounded shadow-sm">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h5 className="text-sm font-semibold text-red-600 m-0">ALL UNREAD EMAILS</h5>
      </div>
      <div className="p-4">
        <div className="mb-3">
          <p className="text-primary mb-2" style={{ fontSize: '14px', fontWeight: '500' }}>Top 50 Unread</p>
        </div>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {emails.map((email) => (
            <div key={email.id} className="pb-3 mb-3 border-bottom">
              <p className="mb-1 fw-semibold" style={{ fontSize: '13px' }}>{email.from}</p>
              <p className="mb-1" style={{ fontSize: '12px' }}>{email.subject}</p>
              <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>{email.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnreadEmailsCard;