import { createSignal, onMount, Show, For } from 'solid-js';

function BrowseRequests() {
  const [requests, setRequests] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  onMount(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/getDeliveryRequests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch delivery requests.');
      }
    } catch (err) {
      console.error('Error fetching delivery requests:', err);
      setError('Failed to fetch delivery requests.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-6 text-blue-600">Browse Delivery Requests</h1>
      <Show when={!loading()} fallback={<p>Loading delivery requests...</p>}>
        <Show when={!error()}>
          <Show
            when={requests().length > 0}
            fallback={<p>No delivery requests available.</p>}
          >
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <For each={requests()}>
                {(request) => (
                  <div class="bg-white p-6 rounded-lg shadow-md">
                    <h2 class="text-lg font-semibold mb-2 text-blue-600">
                      {request.item_description}
                    </h2>
                    <p>
                      <strong>From:</strong> {request.from_airport}
                    </p>
                    <p>
                      <strong>To:</strong> {request.to_airport}
                    </p>
                    <p>
                      <strong>Delivery Date:</strong>{' '}
                      {new Date(request.delivery_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Reward:</strong> ${request.reward}
                    </p>
                    <button
                      class="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                      onClick={() => alert('Feature to accept request coming soon!')}
                    >
                      Accept Delivery
                    </button>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Show>
        <Show when={error()}>
          <div class="text-red-500">{error()}</div>
        </Show>
      </Show>
    </div>
  );
}

export default BrowseRequests;