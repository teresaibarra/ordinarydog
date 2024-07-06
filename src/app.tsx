import { useState } from 'preact/hooks';
import './app.css';
import useReactions from './useReactions';

export function App() {
  const [trigger, setTrigger] = useState("")
  const [intensity, setIntensity] = useState("")
  const { reactions, addReaction } = useReactions();

  const onIntensityInput = (e: any) => {
    setIntensity(e.currentTarget.value)
  }

  const onTriggerInput = (e: any) => {
    setTrigger(e.currentTarget.value)
  }

  const onSubmit = (e: any) => {
    addReaction(intensity, trigger)
    e.preventDefault();
  }

  return (
    <>
      <h1>My dog is normal</h1>
      <div class="card">
        <form onSubmit={onSubmit}>
          Trigger: {' '}
          <input type="text" value={trigger} onInput={onTriggerInput} placeholder="oh no!! the door!!" /> <br />
          Intensity: {' '}
          <input type="text" value={intensity} onInput={onIntensityInput} placeholder="are you seeing this??" /><br /><br />

          <button type="submit">Anotha one</button>
        </form>
      </div>
      {reactions.length > 0 && <div>
        <table class="react-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Trigger</th>
              <th>Intensity</th>
            </tr>
          </thead>
          <tbody>
            {reactions.map((reaction, index) => (
              <tr key={index}>
                <td>{formatDateTime(reaction.timestamp.toDate())}</td>
                <td>{reaction.trigger}</td>
                <td>{reaction.intensity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

    </>
  );
}

function formatDateTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // Full day of the week (e.g., Tuesday)
    month: 'short',  // Short month name (e.g., Jul)
    day: 'numeric',  // Numeric day (e.g., 5)
    hour: 'numeric', // Numeric hour (e.g., 9)
    minute: '2-digit', // Two-digit minute (e.g., 06)
    second: '2-digit', // Two-digit second (e.g., 52)
    hour12: true,     // Use 12-hour clock (e.g., 9PM)
    timeZone: 'America/New_York' // Time zone for New York
  };

  return new Date(date).toLocaleString('en-US', options);
}