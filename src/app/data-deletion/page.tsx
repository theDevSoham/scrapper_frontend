import React from "react";

export const metadata = {
  title: "Data Deletion Instructions | Social Media Scraper",
  description: "How users can request deletion of their data from the Social Media Scraper app."
};

export default function DataDeletionPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Data Deletion Instructions</h1>

      <p className="mb-6">
        In accordance with Facebook, Instagram, and other platform policies, users of the
        <strong> Social Media Scraper</strong> app can request the deletion of their data at any
        time. This page explains the steps to request complete removal of your stored information
        from our systems.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">1. What Data Do We Store?</h2>
      <p className="mb-6">
        Our app only stores the minimal information required to provide the service, such as:
      </p>

      <ul className="list-disc ml-6 mb-6">
        <li>Account or login identifiers (if applicable)</li>
        <li>Scraping configuration settings</li>
        <li>Email or contact details (if you have created an account)</li>
        <li>Log data necessary for debugging or security</li>
      </ul>

      <p className="mb-6">
        We do <strong>not</strong> store any private social media data such as messages, passwords,
        or non-public information.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">2. How to Request Data Deletion</h2>
      <p className="mb-4">You can delete your data in one of the following ways:</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Option A — Email Request (Simple)</h3>
      <p className="mb-6">
        Send an email to <strong>[your email]</strong> with the subject line <em>“Data Deletion
        Request”</em>.  
        Please include:
      </p>
      <ul className="list-disc ml-6 mb-6">
        <li>Your name</li>
        <li>Your account email or user ID (if any)</li>
        <li>A statement requesting deletion of your data</li>
      </ul>

      <p className="mb-6">We will delete all associated data within 48–72 hours.</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Option B — In-App Deletion (If supported)</h3>
      <p className="mb-6">
        If the app includes an account settings panel, you may delete your data directly from your
        profile dashboard under <strong>“Delete Account”</strong> or <strong>“Remove My
        Data”</strong>.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Option C — Facebook Login Data Deletion URL</h3>
      <p className="mb-4">
        If you signed in using Facebook Login, you can trigger data deletion using the following
        link:
      </p>

      <p className="mb-6 p-4 bg-gray-100 border rounded">
        <strong>Data Deletion Callback URL:</strong><br />
        https://<em>your-domain</em>.com/data-deletion
      </p>

      <p className="mb-6">
        Facebook may redirect you to this page to confirm deletion requests.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">3. Processing Time</h2>
      <p className="mb-6">
        Your request will be processed within 48–72 hours, and all stored user data will be
        permanently removed from our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">4. Contact</h2>
      <p className="mb-10">
        If you have any questions, please contact us at:  
        <strong>Email:</strong> [your email]  
        <br />
        <strong>Website:</strong> [your website]
      </p>
    </main>
  );
}
