import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'cc-navigation',
    initialize() {
        withPluginApi('0.8', addNavItem);
    }
};

function addNavItem(api){
  api.addNavigationBarItem({
    name: "School Forums",
    displayName: "School Forums",
    href: "/forums"
  });
}