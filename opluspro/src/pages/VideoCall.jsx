import React from 'react';
import { Button } from "@/components/ui/button";
import { MicIcon, VideoIcon, PhoneIcon, MessageSquareIcon, UsersIcon } from 'lucide-react';

const VideoCall = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-4">
            <div className="col-span-2 bg-gray-200 dark:bg-gray-600 aspect-video rounded-lg flex items-center justify-center relative">
              <p className="text-xl text-gray-600 dark:text-gray-300">Remote Video</p>
              <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-300 dark:bg-gray-500 rounded-lg flex items-center justify-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">Your Video</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-200 dark:bg-gray-600 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Call Info</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">Dr. Smith</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Duration: 00:15:30</p>
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Participants</h2>
                <ul className="text-sm text-gray-600 dark:text-gray-300">
                  <li>You</li>
                  <li>Dr. Smith</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 flex justify-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-gray-700">
              <MicIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="text-white hover:bg-gray-700">
              <VideoIcon className="h-6 w-6" />
            </Button>
            <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
              <PhoneIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="text-white hover:bg-gray-700">
              <MessageSquareIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="text-white hover:bg-gray-700">
              <UsersIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;