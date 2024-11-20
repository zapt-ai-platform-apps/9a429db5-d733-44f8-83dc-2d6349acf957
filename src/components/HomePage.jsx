import { createSignal } from 'solid-js';
import { useNavigate, Routes, Route, Link } from '@solidjs/router';
import { supabase } from '../supabaseClient';
import CreateRequest from './Sender/CreateRequest';
import MyRequests from './Sender/MyRequests';
import AddTravelPlan from './Traveler/AddTravelPlan';
import BrowseRequests from './Traveler/BrowseRequests';

function HomePage(props) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div class="min-h-screen flex flex-col">
      <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <img class="h-8 w-8" src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=512&height=512" alt="FlightMate" />
                <span class="ml-2 text-xl font-bold text-blue-600">FlightMate</span>
              </div>
              <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/home/create-request" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                  Create Request
                </Link>
                <Link href="/home/my-requests" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                  My Requests
                </Link>
                <Link href="/home/add-travel-plan" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                  Add Travel Plan
                </Link>
                <Link href="/home/browse-requests" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600">
                  Browse Requests
                </Link>
              </div>
            </div>
            <div class="flex items-center">
              <button
                onClick={handleSignOut}
                class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div class="flex-grow">
        <Routes>
          <Route path="/create-request" element={<CreateRequest user={props.user} />} />
          <Route path="/my-requests" element={<MyRequests user={props.user} />} />
          <Route path="/add-travel-plan" element={<AddTravelPlan user={props.user} />} />
          <Route path="/browse-requests" element={<BrowseRequests user={props.user} />} />
          <Route path="/" element={
            <div class="p-8">
              <h1 class="text-3xl font-bold mb-4 text-blue-600">Welcome to FlightMate</h1>
              <p class="text-gray-700">Use the navigation above to get started.</p>
            </div>
          } />
        </Routes>
      </div>
      <footer class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 py-4 text-center">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-500">
            Made on ZAPT
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;