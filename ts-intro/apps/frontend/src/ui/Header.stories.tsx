// apps/frontend/src/ui/Header.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Estructura/Header',
};

export default meta;
type Story = StoryObj<typeof Header>;

// 💡 Estado 1: El usuario NO ha iniciado sesión
export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
};

// 💡 Estado 2: El usuario SÍ ha iniciado sesión
export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
};