"use client"

export function Chat() {
    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-white mb-4">Chat Interface</h1>
                <div className="bg-gray-700 p-4 rounded-lg h-96 overflow-y-auto">
                    {/* Chat messages will go here */}
                </div>
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full mt-4 p-2 rounded-lg bg-gray-600 text-white"
                />
            </div>
        </div>
    )
}