import { assert, should } from 'chai';
import * as actions from './model-actions';
import modelReducer from './model-reducer';

should();

describe('model reducer', () => {
  it('returns default state', () => {
    const state = modelReducer(undefined, {});

    assert(state.get('selectedTab').should.equal('fuel'));
    assert(state.get('selectedTyre').should.equal(''));
  });

  it('updates selected tab', () => {
    const state = modelReducer(undefined, actions.selectModellingTab('tyres'));

    assert(state.get('selectedTab').should.equal('tyres'));
  });

  it('updates selected tyre', () => {
    const state = modelReducer(undefined, actions.selectModellingTyre('V'));

    assert(state.get('selectedTyre').should.equal('V'));
  });
});