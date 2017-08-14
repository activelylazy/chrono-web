import React from 'react';
import { PropTypes } from 'prop-types';
import Immutable from 'immutable';
import { tyreCode } from '../session-data/tyres';
import TyreModelComponent from './TyreModelComponent';

const toFixed = (num) => {
  if (num < 0) {
    return num.toFixed(3);
  }
  return `+${num.toFixed(3)}`;
};

const deltaIfAny = (delta, baseTyre) => {
  if (delta !== undefined) {
    return (<div className="model-sub-value">{toFixed(delta)} sec vs {tyreCode(baseTyre)}</div>);
  }
  return (<div />);
};

const getDelta = (tyre, deltaMap, baseTyre) => {
  if (tyre === baseTyre) {
    return undefined;
  }
  return deltaMap[tyre];
};

const tyreChoice = (tyre, deg, delta, baseTyre, selectedTyre, onSelect) => {
  let className = 'btn btn-primary btn-xs btn-block tyre-button';
  let rowClassName = 'tyre-row';
  if (selectedTyre === tyre) {
    className += ' active';
    rowClassName = 'active-tyre';
  }
  // eslint-disable-next-line
  return (<tr key={tyre} className={rowClassName} onClick={onSelect}>
    <td>
      <a className={className} onClick={onSelect} tabIndex="-3">
        {tyreCode(tyre)}
      </a>
    </td>
    <td>
      <div className="model-tyre-deg">{toFixed(deg)} sec/lap</div>
      <div className="model-tyre-delta">{deltaIfAny(delta, baseTyre)}</div>
    </td>
  </tr>
  );
};

const tyreChooser = (session, paceModel, selectedTyre, selectTyre) => (
  <table>
    {Object.keys(paceModel.tyreModel.deg)
           .map(tyre => tyreChoice(
              tyre,
              paceModel.tyreModel.deg[tyre],
              getDelta(tyre, paceModel.tyreModel.delta, paceModel.tyreModel.baseTyre),
              paceModel.tyreModel.baseTyre,
              selectedTyre,
              () => selectTyre(tyre)))}
  </table>
);

const TyresTab = ({ session, selectedDriver, paceModel, selectedTyre, selectTyre }) => {
  let chosenTyre = selectedTyre;
  if (selectedTyre === '') {
    chosenTyre = paceModel.tyreModel.baseTyre;
  }
  return (
    <div className="model-content">
      <div className="model-content-table">
        <div className="model-plot">
          <TyreModelComponent session={session} selectedDriver={selectedDriver} tyre={chosenTyre} />
        </div>
        <div className="model-info">
          {tyreChooser(session, paceModel, chosenTyre, selectTyre)}
        </div>
      </div>
    </div>
  );
};

TyresTab.propTypes = {
  session: PropTypes.instanceOf(Immutable.Map).isRequired,
  paceModel: PropTypes.instanceOf(Immutable.Map).isRequired,
  selectedDriver: PropTypes.string,
  selectedTyre: PropTypes.string.isRequired,
  selectTyre: PropTypes.func.isRequired,
};

export default TyresTab;
