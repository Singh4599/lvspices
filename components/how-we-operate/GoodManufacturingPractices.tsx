'use client';

import React from 'react';

const gmpList = [
  {
    num: '01',
    title: 'Hygiene and Cleanliness',
    desc: 'To avoid contamination and ensure product safety, it is essential to maintain a clean and hygienic atmosphere. This entails strict personal hygiene standards for employees, proper disposal of trash, and routine cleaning of premises and equipment.'
  },
  {
    num: '02',
    title: 'Quality Control',
    desc: 'Under GMP, a strong quality control system is necessary. To make sure they fulfill quality standards, this involves extensive testing of raw materials, materials used during processing, and finished products. Any deviations need to be carefully examined, and appropriate action needs to be taken.'
  },
  {
    num: '03',
    title: 'Training and Competence',
    desc: 'To carry out their duties, staff engaged in the manufacturing process need to be suitably qualified and trained. Employees are kept up to date on industry best practices and safety standards by regular training programs.'
  },
  {
    num: '04',
    title: 'Facility and Equipment Maintenance',
    desc: 'To ensure that the devices operate as planned and do not contribute to product contamination or quality issues, GMP requires that facilities and equipment be properly maintained and calibrated.'
  },
  {
    num: '05',
    title: 'Managed Production Practices',
    desc: 'All manufacturing processes must be precisely specified, controlled, and validated by GMP to ensure consistency and adherence to requirements. This requires precise measurement, close monitoring of important parameters, and strict commitment to process controls.'
  },
  {
    num: '06',
    title: 'Documentation and Record-Keeping',
    desc: 'A key component of GMP is accurate documentation. To ensure traceability and accountability, thorough records of the manufacturing procedures, quality control testing, equipment upkeep, and employee training must be maintained.'
  }
];

export default function GoodManufacturingPractices() {
  return (
    <section style={{ padding: '80px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }} className="md:flex-row">
        
        {/* Title Side */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: '#111', lineHeight: 1.2, position: 'sticky', top: 120 }}>
            Good Manufacturing<br />Practices (GMP)
          </h2>
        </div>

        {/* List Side */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          {gmpList.map((item, index) => (
            <div key={item.num} style={{ 
              padding: '32px 0', 
              borderTop: index === 0 ? '2px solid #111' : '1px solid #eaeaea',
              borderBottom: index === gmpList.length - 1 ? '1px solid #eaeaea' : 'none',
              display: 'flex', gap: 24, alignItems: 'flex-start'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, color: '#999', paddingTop: 2 }}>
                {item.num}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
