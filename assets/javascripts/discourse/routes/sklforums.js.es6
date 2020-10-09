import DiscourseRoute from 'discourse/routes/discourse';
import { ajax } from 'discourse/lib/ajax';

export default Ember.Route.extend({
  model() {
    return ajax(`/site.json`).then((data) => {
        // parent_category_id = colleges-and-universities = 10 in qa
        const filteredData = data.categories.filter(cat => cat.parent_category_id === 5); 
        console.log("here", filteredData);
        return filteredData;
    });

    //return ajax('/forums.json');
  }
});