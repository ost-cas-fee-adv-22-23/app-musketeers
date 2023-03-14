import { useMachine } from '@xstate/react';
import { toggleMachine } from './toggleMachine';

export default function Toggle() {
  const [current, send] = useMachine(toggleMachine);

  return <button onClick={() => send('TOGGLE')}>{current.matches('inactive') ? 'Off' : 'On'}</button>;
}
