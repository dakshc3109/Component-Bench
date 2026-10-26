import COMPONENTS from '../components/index.js';
import { initializeGallery } from './gallery.js';
import { initializeMotion } from './motion.js';
import { initializeTheme } from './theme.js';

const components = await Promise.all(COMPONENTS.map(async (component) => {
  const response = await fetch(component.cssUrl);
  if (!response.ok) {
    throw new Error('Unable to load styles for component "' + component.id + '": ' + response.status);
  }
  return { ...component, css: (await response.text()).trim() };
}));

initializeTheme();
initializeGallery(components);
initializeMotion();
