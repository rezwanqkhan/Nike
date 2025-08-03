
import Nav from '../components/Nav';

/**
 * Story configuration object
 * This tells Storybook how to display and organize your component
 */
export default {
  // Title appears in Storybook sidebar (folder structure: Nike > Navigation)
  title: 'Nike/Navigation',
  
  // The actual React component we're documenting
  component: Nav,
  
  // Component display settings
  parameters: {
    // Use full screen layout (good for navigation bars)
    layout: 'fullscreen',
  },
  
  // Generate automatic documentation
  tags: ['autodocs'],
};

/**
 * Default story - shows component with no special modifications
 * This is how your Nav component normally appears
 */
export const Default = {
  // Empty args means use component's default props
  args: {},
};

/**
 * Mobile story - shows how component looks on mobile devices
 * Tests responsive design
 */
export const Mobile = {
  // Special viewport parameters for mobile testing
  parameters: {
    viewport: {
      // Use predefined mobile viewport size
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet story - shows component on tablet size
 */
export const Tablet = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};