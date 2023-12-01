import React from 'react'
import styles from './Feedback.module.scss';
import { RadioGroupRating } from '../../../components';

const Feedback = () => {
  return (
    <>
    <div className={styles.feedback}>
            <div className={styles.feedback_content}>
                <p>How would you rate your experience?</p>
                <RadioGroupRating />
                <p>Want feedback like this? Try Hotjar</p>
            </div>
        </div>
    
    
    </>
  )
}

export default Feedback