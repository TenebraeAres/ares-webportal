import Controller from '@ember/controller';
import AuthenticatedController from 'ares-webportal/mixins/authenticated-controller';
import { inject as service } from '@ember/service';

export default Controller.extend(AuthenticatedController, {
    gameApi: service(),
    flashMessages: service(),
    
    anyHidden: function() {
      return this.get('model.hidden').length > 0;
    }.property('model.hidden'),
    
    actions: {
      hideCategory: function(category, option) { 
        let api = this.get('gameApi');
        api.requestOne('forumHide', { hide: option, category_id: category.id })
        .then( (response) => {
            if (response.error) {
                return;
            }
            this.send('reloadModel');
        });
      },
      muteForum: function(option) { 
        let api = this.get('gameApi');
        api.requestOne('forumMute', { muted: option })
        .then( (response) => {
            if (response.error) {
                return;
            }
            this.set('model.is_muted', option);
        });
      },
      nextUnread: function() {
          let api = this.get('gameApi');
          api.requestOne('forumUnread')
          .then( (response) => {
              if (response.error) {
                  return;
              }
              
              if (response.post_id) {
                  this.transitionToRoute('forum-topic', response.category_id, response.post_id);
              }
              else {
                  this.get('flashMessages').warning('No more unread messages.');                    
              }
          });
      }
    }
});