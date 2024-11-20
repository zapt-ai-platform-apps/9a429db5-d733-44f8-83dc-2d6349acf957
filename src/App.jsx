import { createSignal, onMount, createEffect, onCleanup } from 'solid-js';
import { supabase } from './supabaseClient';
import { Routes, Route, useNavigate } from '@solidjs/router';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';

function App() {
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      navigate('/home');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/home');
      } else {
        setUser(null);
        navigate('/');
      }
    });

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  return (
    <Routes>
      <Route path="/" component={AuthPage} />
      <Route path="/home/*" element={<HomePage user={user} />} />
    </Routes>
  );
}

export default App;