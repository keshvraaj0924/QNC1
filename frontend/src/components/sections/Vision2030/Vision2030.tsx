'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Vision2030.module.css';

export default function Vision2030() {
  const leaders = [
    {
      name: 'King Salman bin Abdulaziz Al Saud',
      title: 'Custodian of the Two Holy Mosques',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/King_Salman_of_Saudi_Arabia_in_2019.jpg/800px-King_Salman_of_Saudi_Arabia_in_2019.jpg'
    },
    {
      name: 'Crown Prince Mohammed bin Salman',
      title: 'Prime Minister of Saudi Arabia',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mohammed_bin_Salman_Al_Saud_in_2022.jpg/800px-Mohammed_bin_Salman_Al_Saud_in_2022.jpg'
    }
  ];

  return (
    <section className={styles.visionSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.textBlock}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Our Guiding Light</span>
          <h2 className={styles.headline}>Aligned with Vision 2030</h2>
          <p className={styles.paragraph}>
            Qudrat National is deeply committed to the ambitious blueprint of Saudi Vision 2030. 
            Under the wise leadership of the Kingdom, we strive to elevate the facilities management 
            sector to unparalleled global standards.
          </p>
        </motion.div>

        <div className={styles.portraits}>
          {leaders.map((leader, idx) => (
            <motion.div 
              key={idx}
              className={styles.portraitCard}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2 + idx * 0.2, duration: 0.8, ease: 'easeOut' }}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={leader.image} 
                  alt={leader.name} 
                  fill 
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized // Bypasses optimization for external wikimedia refs locally
                />
              </div>
              <div className={styles.portraitMeta}>
                <h4 className={styles.leaderTitle}>{leader.title}</h4>
                <p className={styles.leaderName}>{leader.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
