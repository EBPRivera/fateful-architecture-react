import _ from "lodash";
import { Card } from "react-bootstrap";

import combatActions from "../../json/combatActions";

const renderNotes = (notes) => {
  if (_.isUndefined(notes) || _.isEmpty(notes)) return;

  return (
    <ul>
      {_.map(notes, (note, key) => {
        return <li key={key}>{note}</li>;
      })}
    </ul>
  );
};

const CombatActions = () => {
  return (
    <Card className="p-3">
      <ul>
        {_.map(combatActions, (combatAction, combatActionKey) => {
          return (
            <li key={combatActionKey}>
              <b>{combatActionKey}</b>
              <ol>
                {_.map(combatAction, (action, actionKey) => {
                  return (
                    <li className="pb-2" key={actionKey}>
                      <b>{`${action.name}. `}</b>
                      {action.description}
                      {renderNotes(action.notes)}
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default CombatActions;
