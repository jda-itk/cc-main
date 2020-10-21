import DiscourseRoute from 'discourse/routes/discourse';
import { ajax } from 'discourse/lib/ajax';
import { inject as service } from '@ember/service';

export default DiscourseRoute.extend({
  sklforums: service(),

  model() {
    const parent_category_id = this.get('sklforums').parent_category_id;

    return ajax(`/latest.json`).then((data) => {
      let latest = data.topic_list.topics;
        return ajax("/site.json").then((data) => {
          const parentCategory = data.categories.filter(cat => cat.id === parent_category_id); 
          const filteredData = data.categories.filter(cat => cat.parent_category_id === parent_category_id); 
          const isMobileView = Discourse.$.ua.device.type; 
          latest.forEach(topic => topic.category = data.categories.filter(cat => cat.id === topic.category_id));
          console.log("here", { parentCategory, filteredData, latest, isMobileView, parent_category_id });
          return { parentCategory, filteredData, latest, isMobileView, parent_category_id };
        }); 
    });
  }
});