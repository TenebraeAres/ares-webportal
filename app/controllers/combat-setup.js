import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    gameApi: service(),
    flashMessages: service(),

    teams: function() {
        return [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    }.property(),
    
    actions: {
        save: function() {
            let api = this.get('gameApi');
            api.requestOne('saveCombatSetup', { id: this.get('model.id'), 
                combatants: this.get('model.combatants')
             }, null )
            .then( (response) => {
                if (response.error) {
                    return;
                }
                this.transitionToRoute('combat', this.get('model.id'));
                this.get('flashMessages').success('Combat saved!');
            });
        },
        teamChanged: function(id, team) {
          this.set(`model.combatants.${id}.team`, team);
        },
        stanceChanged: function(id, stance) {
          this.set(`model.combatants.${id}.stance`, stance);
        },
        weaponChanged: function(id, weapon) {
          this.set(`model.combatants.${id}.weapon`, weapon);
        },
        armorChanged: function(id, armor) {
          this.set(`model.combatants.${id}.armor`, armor);
        },
        npcChanged: function(id, skill) {
          this.set(`model.combatants.${id}.npc_skill`, skill);
        },
    }
});