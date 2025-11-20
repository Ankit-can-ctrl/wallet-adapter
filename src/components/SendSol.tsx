const SendSol = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Send SOL</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Transfer SOL to any Solana wallet address
      </p>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Recipient's Public Key"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
        />

        <input
          type="number"
          placeholder="Amount in SOL"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
        />

        <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl">
          Send Transaction
        </button>
      </div>
    </div>
  );
};

export default SendSol;
