import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase } from '../../supabaseClient';

function AddTravelPlan() {
  const [fromAirport, setFromAirport] = createSignal('');
  const [toAirport, setToAirport] = createSignal('');
  const [travelDate, setTravelDate] = createSignal('');
  const [airports, setAirports] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [submitting, setSubmitting] = createSignal(false);
  const [error, setError] = createSignal('');

  onMount(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getAirports');
      const data = await response.json();
      setAirports(data.airports);
    } catch (err) {
      console.error('Error fetching airports:', err);
      setError('Failed to load airports.');
    } finally {
      setLoading(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/addTravelPlan', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromAirport: fromAirport(),
          toAirport: toAirport(),
          travelDate: travelDate(),
        }),
      });
      if (response.ok) {
        // Reset form
        setFromAirport('');
        setToAirport('');
        setTravelDate('');
        alert('Travel plan added successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add travel plan.');
      }
    } catch (err) {
      console.error('Error adding travel plan:', err);
      setError('Failed to add travel plan.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-6 text-blue-600">Add Travel Plan</h1>
      <Show when={!loading()} fallback={<p>Loading airports...</p>}>
        <form onSubmit={handleSubmit} class="space-y-6">
          <div>
            <label class="block text-gray-700">From Airport</label>
            <select
              value={fromAirport()}
              onChange={(e) => setFromAirport(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer"
              required
            >
              <option value="">Select an airport</option>
              <For each={airports()}>
                {(airport) => (
                  <option value={airport.code}>
                    {airport.name} ({airport.code})
                  </option>
                )}
              </For>
            </select>
          </div>
          <div>
            <label class="block text-gray-700">To Airport</label>
            <select
              value={toAirport()}
              onChange={(e) => setToAirport(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer"
              required
            >
              <option value="">Select an airport</option>
              <For each={airports()}>
                {(airport) => (
                  <option value={airport.code}>
                    {airport.name} ({airport.code})
                  </option>
                )}
              </For>
            </select>
          </div>
          <div>
            <label class="block text-gray-700">Travel Date</label>
            <input
              type="date"
              value={travelDate()}
              onInput={(e) => setTravelDate(e.target.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent box-border"
              required
            />
          </div>
          <Show when={error()}>
            <div class="text-red-500">{error()}</div>
          </Show>
          <button
            type="submit"
            class={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-full ${
              submitting() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={submitting()}
          >
            <Show when={!submitting()} fallback={'Submitting...'}>
              Add Travel Plan
            </Show>
          </button>
        </form>
      </Show>
    </div>
  );
}

export default AddTravelPlan;