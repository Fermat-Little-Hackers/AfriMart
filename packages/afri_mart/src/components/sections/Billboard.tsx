// components/ScrollingText.js
import { Container } from "../Container";
import React from 'react';
import styles from './ScrollingText.module.css';

const Billboard = ( ) => {
    const text = 'lorem ipsum dolor sit amet lorem ipsum dolor'
  return (
    <Container className="bg-art-bg w-full h-[3rem] text-center py-2 mb-20">
    <div className={styles.scrollingTextContainer}>
      <div className={styles.scrollingText}>{text}</div>
    </div>
    </Container>
  );
};

export default Billboard;
