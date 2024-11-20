import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase } from '../../supabaseClient';

function MyRequests() {
  const [requests, setRequests] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  onMount(async () => {
    setLoading(true);
    setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/getMyRequests', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch requests.');
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to fetch requests.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-6 text-blue-600">My Delivery Requests</h1>
      <Show when={!loading()} fallback={<p>Loading your requests...</p>}>
        <Show when={!error()}>
          <Show
            when={requests().length > 0}
            fallback={<p>You have no active requests.</p>}
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

export default MyRequests;