/**
 * Links the path `/forums` to a route named `sklforums`. Named like this, a
 * route with the same name needs to be created in the `routes` directory.
 */
export default function () {
    this.route('sklforums', { path: '/forums' });
}