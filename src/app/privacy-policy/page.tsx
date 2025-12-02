import React from "react";

export const metadata = {
  title: "Privacy Policy | Social Media Scraper",
  description: "Privacy Policy for the Social Media Scraper application.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last Updated: [Insert Date]</p>

      <p className="mb-6">
        This Privacy Policy explains how{" "}
        <strong>[Your Company/App Name]</strong> (“we”, “our”, or “us”)
        collects, uses, discloses, and protects information when you use our
        Social Media Scraper application (“App” or “Service”). By using the App,
        you agree to the terms outlined in this Privacy Policy.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        1. Information We Collect
      </h2>

      <h3 className="text-xl font-semibold mt-6 mb-2">
        1.1 Information You Provide
      </h3>
      <p className="mb-4">
        We may collect information that you choose to provide when interacting
        with our App, including:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Account details (if login is required)</li>
        <li>Contact information (name, email)</li>
        <li>Input fields related to the scraping tasks you configure</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">
        1.2 Automatically Collected Data
      </h3>
      <p className="mb-4">
        When you use our App, we may automatically collect:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Device and browser information</li>
        <li>IP address</li>
        <li>Usage logs and interaction data</li>
        <li>Error logs and diagnostic information</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">
        1.3 Scraped Public Data
      </h3>
      <p className="mb-6">
        Our App may collect publicly available data from social media platforms
        only when initiated by the user. This includes public posts, public
        profile information, and public comments. We do <strong>not</strong>{" "}
        access private messages, login credentials, or any restricted content.
        Scraping is limited strictly to data allowed by the platform and under
        the user’s permissions.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">We use collected information to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide and improve the Service</li>
        <li>Customize user experience</li>
        <li>Analyze performance and troubleshoot issues</li>
        <li>Ensure compliance with platform policies</li>
        <li>Communicate important updates</li>
      </ul>
      <p className="mb-6">
        We do <strong>not</strong> sell or trade your information to third
        parties.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        3. Legal Compliance & Responsibility
      </h2>
      <p className="mb-6">
        Our App is intended for lawful use only. Users are responsible for
        ensuring compliance with social media platform Terms of Service,
        obtaining consent where required, and using scraped data ethically. We
        are not responsible for user misuse of the Service.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        4. Data Storage & Security
      </h2>
      <p className="mb-6">
        We apply measures such as encrypted storage, secure communication, and
        restricted access controls. However, no method of transmission or
        storage is fully secure.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">5. Data Sharing</h2>
      <p className="mb-4">
        We may share information only in the following cases:
      </p>
      <ul className="list-disc ml-6 mb-6">
        <li>Service providers (hosting, analytics, infrastructure)</li>
        <li>Legal or regulatory obligations</li>
        <li>Business transfers such as mergers or acquisitions</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">6. Data Retention</h2>
      <p className="mb-6">
        We retain information only for as long as necessary to operate the
        Service, comply with laws, or support internal analytics. Users may
        request deletion of their stored data.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        7. Cookies & Tracking
      </h2>
      <p className="mb-6">
        Our App or website may use cookies or similar technologies to improve
        functionality, maintain sessions, and analyze usage patterns. Users may
        adjust cookie preferences in their browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        8. Third-Party Services
      </h2>
      <p className="mb-6">
        The App may interconnect with third-party APIs such as Facebook,
        Instagram, or Twitter/X. These services have their own privacy policies,
        which we recommend reviewing.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">9. Your Rights</h2>
      <p className="mb-4">
        Depending on your region, you may have rights to access, correct,
        delete, restrict, or export your data. To exercise these rights, contact
        us at <strong>[your email]</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        10. Children’s Privacy
      </h2>
      <p className="mb-6">
        Our App is not intended for children under 13. We do not knowingly
        collect data from children.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        11. Changes to This Privacy Policy
      </h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time. The updated version
        becomes effective upon publication.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">12. Contact Us</h2>
      <p className="mb-10">
        For any questions, contact us:
        <br />
        <strong>Email:</strong> [your email] <br />
        <strong>Website:</strong> [your website] <br />
        <strong>Company:</strong> [your company name]
      </p>
    </main>
  );
}
