 
import ReviewCard from '../components/ReviewCard';
// Import customer images for testing
import { customer1, customer2 } from '../assets/images';

/**
 * ReviewCard component stories
 * Test different customer review scenarios
 */
export default {
  title: 'Nike/Components/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  
  /**
   * Interactive controls for testing different review data
   */
  argTypes: {
    // Text input for customer name
    customerName: { 
      control: 'text',
      description: 'Name of the customer who wrote the review'
    },
    
    // Number slider for rating (1-5 stars)
    rating: { 
      control: { 
        type: 'number', 
        min: 1, 
        max: 5, 
        step: 0.1 
      },
      description: 'Customer rating from 1 to 5 stars'
    },
    
    // Text area for feedback
    feedback: { 
      control: 'text',
      description: 'Customer review text/feedback'
    },
  },
};

/**
 * Default review story
 * Shows a typical customer review
 */
export const Default = {
  args: {
    imgURL: customer1,
    customerName: 'Morich Brown',
    rating: 4.5,
    feedback: 'The attention to detail and the quality of the product exceeded my expectations. Highly recommended!',
  },
};

/**
 * Perfect review story
 * Shows maximum 5-star rating
 */
export const FiveStars = {
  args: {
    imgURL: customer2,
    customerName: 'Lota Mongeskar',
    rating: 5.0,
    feedback: 'Perfect shoes! Best purchase I have ever made.',
  },
};

/**
 * Long review story
 * Tests how component handles very long feedback text
 */
export const LongReview = {
  args: {
    imgURL: customer1,
    customerName: 'John Smith',
    rating: 4.2,
    feedback: 'These Nike shoes are absolutely fantastic! The comfort level is unmatched, and the design is sleek and modern. I have been wearing them daily for months now, and they still look brand new. The quality is outstanding, and I would definitely recommend them to anyone looking for premium footwear. The cushioning is perfect for long walks.',
  },
};

/**
 * Low rating story
 * Tests component with negative review
 */
export const LowRating = {
  args: {
    imgURL: customer2,
    customerName: 'Mike Johnson',
    rating: 2.1,
    feedback: 'Not what I expected. Could be better.',
  },
};

/**
 * Very long name story
 * Tests component with unusually long customer name
 */
export const LongCustomerName = {
  args: {
    imgURL: customer1,
    customerName: 'Dr. Alexander Montgomery Richardson III',
    rating: 4.0,
    feedback: 'Good quality shoes.',
  },
};