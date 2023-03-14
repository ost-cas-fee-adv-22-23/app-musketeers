import { createMachine } from 'xstate';

export const toggleMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWAdgIYDGyeAbmAMQAqA8gOKMAyAogNoAMAuoqAAdUsPOVQF+IAB6IAjAFYAHDgBMXAMyyV8gDQgAnnPUqAvib1oM2HKXJU6TVp16ShIsRKTS5S1Rq26BoiKsjjyZuYgBKgQcJKWWGCuwqJ44pIyCAC0ACwAbDgA7HmyhbKKhYGG2XlmFuiJ+MRklElebqnpXpmhKuqKKiHaetUAnFw4XIrqM7NzmnUgCda2rcnuaZ6gmYMqYSOI45PT86cRJkA */
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },

    active: {
      on: {
        TOGGLE: 'inactive',
      },
    },
  },
});
