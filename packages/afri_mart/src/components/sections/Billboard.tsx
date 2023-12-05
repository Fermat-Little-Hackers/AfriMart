// components/ScrollingText.js
import { Container } from "../Container";
import React from 'react';
import styles from './ScrollingText.module.css';

const Billboard = ( ) => {
    const text = 'At AfriMart we believe that by providing a user-friendly, globally accessible platform, we can empower local businesses and artisans to reach a broader audience thereby fostering economic growth in African countries.'
  return (
    <Container className="bg-art-bg w-full h-[3rem] text-center py-2 mb-20">
    <div className={styles.scrollingTextContainer}>
      <div className={styles.scrollingText}>{text}</div>
    </div>
    </Container>
  );
};

export default Billboard;
