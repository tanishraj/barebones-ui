import type { Preview } from '@storybook/react';
import '../src/tailwind.css';
import { useEffect } from 'react';

import { themes as daisyuiThemes, useTheme } from '@/hooks';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: daisyuiThemes.map(theme => ({
          value: theme,
          title: theme.charAt(0).toUpperCase() + theme.slice(1),
        })),
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { setTheme } = useTheme({
        themes: daisyuiThemes,
        defaultTheme: context.globals.theme,
      });

      useEffect(() => {
        setTheme(context.globals.theme);
      }, [context.globals.theme, setTheme]);

      return Story();
    },
  ],
};

export default preview;
