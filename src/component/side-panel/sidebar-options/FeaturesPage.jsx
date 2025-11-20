
import React from "react";

const featureSections = [
  {
    label: "B.MD",
    // color: "#d5d3cfff",
    cards: [
      { title: "Uploaded Pdfs" }
    ]
  },
  {
    label: "C. EA",
    // color: "#bfbdc2ff",
    cards: [
      { title: "Salesman Last 3 Days Visitsummary" }
    ]
  },
  {
    label: "D. BACKOFFICE",
    // color: "#b8b7b5ff",
    cards: [
      { title: "Daily Check Active Users" },
      { title: "Whatsapp Groups" }
    ]
  },
  {
    label: "E. CRM",
    // color: "#facc15",
    cards: [
      { title: "Crm Recordings Report" }
    ]
  },
  {
    label: "E. CRM",
    // color: "#c9c6c8ff",
    cards: [
      { title: "Top Working Parties List" },
      { title: "Consolidated Zones Ageing - 25,30,55,60,70,90,120 Above" },
      { title: "Crm Recordings" }
    ]
  },
  {
    label: "E. CRM",
    // color: "#c4c0c2ff",
    cards: [
      { title: "Crm Ageing - 25,30,55,60,70,90,120 Above" },
      { title: "Crm References Report" },
      { title: "Crm Working Party List" },
      { title: "Crm Articles Stock Sellers" }
    ]
  },
  {
    label: "E. CRM",
    // color: "#ec4899",
    cards: [
      { title: "Crm Activities Report" }
    ]
  },
  {
    label: "F. SALES",
    // color: "#ec4899",
    cards: [
      { title: "All Party List" },
      { title: "Salesman Station" },
      { title: "Dispatchable & Not Dispatchable Items" },
      { title: "Dispatch Article Wise Without Hold And No Exceeding Limit" }
    ]
  }
];

const FeaturesPage = () => (
  <div className="p-4">
    <h3 className="mb-4 fw-bold">Features</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {featureSections.map((section, idx) => (
        <div key={idx}>
          <div className="mb-2 fw-semibold" style={{ color: section.color, fontSize: "1.1rem" }}>{section.label}</div>
          <hr/>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {section.cards.map((card, cidx) => (
              <div
                key={cidx}
                style={{
                  background: section.color,
                  // color: "#fff",
                  borderRadius: "12px",
                  minWidth: "220px",
                  maxWidth: "340px",
                  padding: "18px 20px",
                  fontWeight: 500,
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  position: "relative"
                }}
              >
                {card.title}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    width: "22px",
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px"
                  }}
                  title="Favourite"
                >★</span>
                
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturesPage;