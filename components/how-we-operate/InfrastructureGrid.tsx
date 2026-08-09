'use client';

import React from 'react';
import Image from 'next/image';

const features = [
  {
    title: 'High Production Capacity',
    desc: 'We employ perfect grinding procedures to preserve freshness and avoid the loss of volatile oils, which are essential for flavor and aroma. With a significant grinding capacity, our plant can meet large-scale needs without compromising quality.',
    img: '/images/infrastructure/1.webp'
  },
  {
    title: 'Individual Grinding Lines',
    desc: 'We run 18 individual grinding lines, all of which are focused on different kinds of spices. This strategy keeps cross-contamination at bay and ensures that every spice is treated under ideal conditions, giving us to preserve the consistency and purity of our products.',
    img: '/images/infrastructure/2.webp'
  },
  {
    title: 'Cryogenic plant',
    desc: 'Our structure, which was first established in India in 2012, has the world’s largest cryogenic grinding machine for spices, ensuring the preservation of essential oils and flavors.',
    img: '/images/infrastructure/3.webp'
  },
  {
    title: 'Blender',
    desc: 'The blender is essential to preserving consistency in the finished product and ensuring that each batch meets our high quality standards.',
    img: '/images/infrastructure/4.webp'
  },
  {
    title: 'Hooper',
    desc: 'The hooper functions as both a storage and feeding element, carefully pouring materials into the cryogenic system. It is meant to endure low temperatures while maintaining the materials’ integrity.',
    img: '/images/infrastructure/5.webp'
  },
  {
    title: 'Nitrogen conveyer',
    desc: 'The nitrogen conveyer plays an essential role in cryogenic processing given that it conveys the material while preserving the extremely low temperatures required for productive grinding.',
    img: '/images/infrastructure/6.webp'
  },
  {
    title: 'Dust collector',
    desc: 'The dust collector is essential for maintaining a clean and safe working environment by capturing any fine particles formed during the grinding process.',
    img: '/images/infrastructure/7.webp'
  },
  {
    title: 'Cold Grinding',
    desc: 'This approach keeps the spices from overheating and preserves their natural aroma and flavor.',
    img: '/images/infrastructure/8.webp'
  },
  {
    title: 'Vacuum Grinding',
    desc: 'Used to enhance the freshness and lifespan of spices.',
    img: '/images/infrastructure/9.webp'
  },
  {
    title: 'Roasting',
    desc: 'An essential first step in bringing out the taste and aroma of our spices is roasting. Lowering the moisture level of the spices not only enhances their flavor profile but also helps to preserve them by increasing their shelf stability.',
    img: '/images/infrastructure/10.webp'
  },
  {
    title: 'Low Friction Grinding',
    desc: 'Reduces the degradation of spices all over the grinding process, giving rise to better quality products. Food Grade Materials: All grinding equipment is made of food grade SS304 and SS316 steel wherever the material comes into direct contact, ensuring the greatest levels of safety and cleanliness.',
    img: '/images/infrastructure/11.webp'
  },
  {
    title: 'Blending',
    desc: 'Modern blending machines are utilized to produce a specifically unified mixture, ensuring consistent flavor across all spices.',
    img: '/images/infrastructure/12.webp'
  }
];

export default function InfrastructureGrid() {
  return (
    <section style={{ padding: '80px 24px', background: '#FAFAFA' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {features.map((feat, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '32px 24px', flex: 1 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 12 }}>{feat.title}</h3>
                <p style={{ fontSize: 13.5, color: '#666', lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
              <div style={{ width: '100%', height: 220, position: 'relative', background: '#f5f5f5' }}>
                <Image src={feat.img} alt={feat.title} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
