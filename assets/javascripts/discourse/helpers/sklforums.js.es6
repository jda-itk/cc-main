import { registerHelper } from 'discourse-common/lib/helpers';
import Composer from 'discourse/models/composer';
import User from 'discourse/models/user';
import { createWidget } from 'discourse/widgets/widget';
import { htmlSafe } from "@ember/template";
import { h } from 'virtual-dom';
import { empty } from '@ember/object/computed';

registerHelper('ccDateFormat', function (param) {
    let d = new Date(param);
    return htmlSafe(moment(d).format('MMM D, YYYY h:m a'));
});

registerHelper('ccDateNumber', function (param) {
    let d = new Date(param);
    return htmlSafe(moment(d).format('x'));
});

registerHelper('ccDaysPass', function (param) {
    let d = moment(new Date(param));
    let now = moment();
    let diff = now.diff(d, 'days');
    return htmlSafe(diff.toString() + 'd');
});

registerHelper('ccBorderColor', function (param) {
    return htmlSafe('border-color:#'+param);
});

registerHelper('ccBackgroundColor', function (param) {
    return htmlSafe('background-color:#'+param);
});

registerHelper('updateSVGIcon', function (param) {
    return htmlSafe('background-color:#'+param);
});

createWidget('new-topic-widget', {
    tagName: 'div.new-topic-widget',
    parent_category_id: 1,
    
    createTopic() {
        const container = Discourse.__container__;
        const composerController = container.lookup("controller:composer");
        composerController.open({
          categoryId: this.get('parent_category_id'),
          action: Composer.CREATE_TOPIC,
          draftKey: Composer.DRAFT,
        });
    },

    html(args) {
        this.parent_category_id = args;
        if (User.current()) {
            return this.attach('button', {
                className: 'btn btn-default',
                action: 'createTopic',
                label: 'topic.create',
                icon: 'plus',
            })
        }
    }
});

createWidget('navigation-bar-widget', {
    tagName: 'div.navigation-bar-widget',
    isMobile: false,
    navToggle: h('li', {
        className: 'navigation-toggle'
    }, h('a', {
            className: 'toggle-link',
            onclick : function(e){
                if ($('#navigation-bar .drop').css('display') === 'block') {
                    $('#navigation-bar .drop').css('display','none');
                } else {
                    $('#navigation-bar .drop').css('display','block');
                }   
            }
        }, [
            'School Forums', 
            h('svg', {
                className: 'fa d-icon d-icon-caret-down svg-icon svg-string',
                viewBox: '0 0 192 512'
            })
        ])

    //     <svg class="fa d-icon d-icon-caret-down svg-icon svg-string" viewBox="0 0 192 512">
    //     <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
    //   </svg>    

    // <svg class="fa d-icon d-icon-caret-down svg-icon svg-string" xmlns="http://www.w3.org/2000/svg">
    //     <use xlink:href="#caret-down"></use>
    // </svg>

    ),   

    navItems: [
        h('li', {
            title: 'all topics grouped by category',
            className: 'ember-view'
        }, 
        h('a',{
            href: '/categories',
            className: ''
        },'Categories')),

        h('li', {
            title: 'all topics in school forums',
            className: 'active ember-view'
        }, 
        h('a',{
            href: '/forums',
            className: 'active'
        },'School Forums')),

        h('li', {
            title: 'topics with recent posts',
            className: 'ember-view'
        }, 
        h('a',{
            href: '/latest',
            className: ''
        },'Latest')),

        h('li', {
            title: 'topics you are currently watching or tracking with unread posts',
            className: 'ember-view'
        }, 
        h('a',{
            href: '/unread',
            className: ''
        },'Unread')),

        h('li', {
            title: 'the most active topics in the last year, month, week or day',
            className: 'ember-view'
        }, 
        h('a',{
            href: '/top',
            className: ''
        },'Top'))
    ],

    html(args) {
        this.isMobile = args;  

        return h('ul#navigation-bar.nav.nav-pills.ember-view', this.isMobile == 'desktop' ? this.navItems : [this.navToggle, 
            h('ul',{
                className: 'drop',
                style: {'display': 'none'}
            }, 
            this.navItems)
        ]);
    } 
});

