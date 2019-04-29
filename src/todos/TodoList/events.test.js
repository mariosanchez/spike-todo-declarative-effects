import * as events from './events';
import { getEventHandler } from 'reffects';
import { applyEventsFixture } from '../../../testHelpers/fixtures';

applyEventsFixture(events);

describe('events', () => {
  test('loadTodos', () => {
    const givenCoeffects = { apiUrl: "sddasds" };
    const loadTodos = getEventHandler('loadTodos');

    expect(loadTodos(givenCoeffects)).toEqual({
      get: {
        url: givenCoeffects.apiUrl,
        successEvent: ["loadTodosSucceeded"]
      }
    })
  });

  test('loadTodosSucceeded', () => {
    const givenCoeffects = {};
    const loadTodosSucceeded = getEventHandler('loadTodosSucceeded');

    expect(loadTodosSucceeded(givenCoeffects, [{
      results: [
        {
          id: 1,
          name: 'Kevin Bacon',
          description: 'Super sexy',
        },
        {
          id: 2,
          name: 'Alison',
          description: '',
        }
      ]
    }])).toEqual({
      mutate:
        [{
          path: ["todos"], newValue: [
            {
              id: 1,
              text: 'Describe: Kevin Bacon',
              done: true,
            },
            {
              id: 2,
              text: 'Describe: Alison',
              done: false,
            }
          ]
        }]
    })
  });

  test('filterTodos', () => {
    const givenCoeffects = {};
    const filterTodos = getEventHandler('filterTodos');

    expect(filterTodos(givenCoeffects, 'codorniz')).toEqual({
      mutate: [{ path: ["visibilityFilter"], newValue: 'codorniz' }]
    })
  });

  test('todoClicked when todo is done', () => {
    const id = 1;
    const todoClicked = getEventHandler('todoClicked');
    const isDone = true;
    const text = 'Lorem ipsum';
    const givenCoeffects = {
      state: {
        todos: [{
          id: id,
          text: 'Describe: Kevin Bacon',
          done: true,
        },]
      }
    };

    expect(todoClicked(givenCoeffects, { id, isDone, text })).toEqual({
      toast: {
        text: '"Lorem ipsum" was marked as undone.',
        milliseconds: 3000
      },
      mutate: [
        {
          path: ["todos"], newValue: [{
            id: 1,
            text: 'Describe: Kevin Bacon',
            done: false,
          }]
        }
      ]
    });
  });

  test('todoClicked when todo is undone', () => {
    const id = 1;
    const todoClicked = getEventHandler('todoClicked');
    const isDone = false;
    const text = 'Lorem ipsum';
    const givenCoeffects = {
      state: {
        todos: [{
          id: id,
          text: 'Describe: Kevin Bacon',
          done: false,
        },]
      }
    };

    expect(todoClicked(givenCoeffects, { id, isDone, text })).toEqual({
      toast: {
        text: '"Lorem ipsum" was marked as done.',
        milliseconds: 3000
      },
      mutate: [
        {
          path: ["todos"], newValue: [{
            id: 1,
            text: 'Describe: Kevin Bacon',
            done: true,
          }]
        }
      ]
    });
  });
})