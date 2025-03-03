import { usePlaidLink } from "react-plaid-link";

const PlaidLinkButton = ({ onSuccess }) => {
    const { open, ready } = usePlaidLink({
        token: "your-link-token", // ✅ Backend `/api/plaid/create-link-token` se aayega
        onSuccess: (public_token, metadata) => {
            console.log("✅ Got Public Token:", public_token);
            onSuccess(public_token);
        },
    });

    return (
        <button
            onClick={(e) => {
                e.preventDefault(); // ✅ Stop page reload
                if (ready) open();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            Connect Your Bank
        </button>
    );
};

export default PlaidLinkButton;
