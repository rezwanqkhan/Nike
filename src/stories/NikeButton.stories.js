import Button from '../components/Button';
// Import icons that might be used with buttons
import { arrowRight } from '../assets/icons';

/**
 * Button component stories
 * Test different button variations and states
 */
export default {
  title: 'Nike/Components/Button',
  component: Button,
  parameters: {
    // Center the button in the story canvas
    layout: 'centered',
  },
  tags: ['autodocs'],
  
  /**
   * argTypes define interactive controls in Storybook
   * Users can modify these values in the Controls panel
   */
  argTypes: {
    // Text input control for button label
    label: { 
      control: 'text',
      description: 'Text displayed on the button'
    },
    
    // CHANGED: Color picker instead of text input
    backgroundColor: { 
      control: 'select',
      options: [
        'bg-red-500',
        'bg-blue-500', 
        'bg-green-500',
        'bg-purple-500',
        'bg-yellow-400',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-gray-500',
        'bg-orange-500',
        'bg-teal-500',
        'bg-coral-red',
        'bg-white'
      ],
      description: 'Select background color'
    },
    
    // CHANGED: Color picker for text
    textColor: { 
      control: 'select',
      options: [
        'text-white',
        'text-black', 
        'text-red-500',
        'text-blue-500',
        'text-green-500',
        'text-purple-500',
        'text-gray-500',
        'text-slate-gray'
      ],
      description: 'Select text color'
    },
    
    // CHANGED: Color picker for border
    borderColor: { 
      control: 'select',
      options: [
        'border-red-500',
        'border-blue-500',
        'border-green-500', 
        'border-purple-500',
        'border-yellow-400',
        'border-pink-500',
        'border-gray-500',
        'border-coral-red',
        'border-white',
        'border-transparent'
      ],
      description: 'Select border color'
    },
    
    // Boolean toggle for full width
    fullWidth: { 
      control: 'boolean',
      description: 'Make button take full width of container'
    },
  },
};

/**
 * Primary button story - main call-to-action style
 * This is your most common button style
 */
export const Primary = {
  args: {
    label: 'Shop Now',
  },
};

/**
 * Button with icon story
 * Shows how button looks with an arrow icon
 */
export const WithIcon = {
  args: {
    label: 'Shop Now',
    iconURL: arrowRight,
  },
};

/**
 * Secondary button story - less prominent style
 * Used for secondary actions
 */
export const Secondary = {
  args: {
    label: 'Learn More',
    backgroundColor: 'bg-white',
    textColor: 'text-slate-gray',
    borderColor: 'border-slate-gray',
  },
};

/**
 * Full width button story
 * Shows button taking full container width
 */
export const FullWidth = {
  args: {
    label: 'Sign Up',
    fullWidth: true,
  },
};

/**
 * Long text button story
 * Tests how button handles longer text content
 */
export const LongText = {
  args: {
    label: 'Shop Now for Premium Nike Collection',
  },
};

/**
 * Red Button - Test with red colors
 */
export const RedButton = {
  args: {
    label: 'Red Button',
    backgroundColor: 'bg-red-500',
    textColor: 'text-white',
    borderColor: 'border-red-500',
  },
};

/**
 * Blue Button - Test with blue colors
 */
export const BlueButton = {
  args: {
    label: 'Blue Button',
    backgroundColor: 'bg-blue-500',
    textColor: 'text-white',
    borderColor: 'border-blue-500',
  },
};

/**
 * Green Button - Test with green colors
 */
export const GreenButton = {
  args: {
    label: 'Green Button',
    backgroundColor: 'bg-green-500',
    textColor: 'text-white',
    borderColor: 'border-green-500',
  },
};