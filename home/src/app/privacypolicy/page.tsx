import React from "react";

const Page = () => {
  return (
    <div className="max-w-10xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-5xl font-extrabold text-center mb-4 text-yellow-500 font-serif">Privacy Policy</h1>
      <p className="mt-4 text-gray-700">
        At <span className="font-extrabold text-yellow-600">PostoCard,</span> your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website (www.PostoCard.com) and use our services.
      </p>
      <br />

      <h1 className="font-semibold text-lg">1. Information We Collect</h1>
      <p className=" text-gray-700">We collect the following types of information when you interact with our website:      </p>
      <br />
      <h2 className="font-bold"> a. Personal Information</h2>
      <p className="">When you place an order, sign up for an account, or contact us, we may collect:</p>
      <li>Name</li>
      <li>Email Address</li>
      <li>Maling Address</li>
      <li>Phone Number</li>
      <li>Payment information (processed securely by our payment providers)</li>
      <br />
      <h2 className="font-bold"> b. Non-Personal Information</h2>
      <p className="">We also collect non-personal data automatically when you visit our website, such as:</p>
      <li>IP Address</li>
      <li>Browser Type and Version</li>
      <li>Device Information</li>
      <li>Website usage data (cookies, log files, analytics)</li>
      <br />
      {/* How We use Information */}
      <h1 className="font-semibold text-lg">2. How We Use Information</h1>
      <p className="">We use your information for the following purposes:</p>
      <li><span className="font-semibold">To process and fulfill your orders</span> (including printing, shipping, and delivering your greeting cards).</li>
      <li><span className="font-semibold">To personalize your experience</span>and provide customized services.</li>
      <li><span className="font-semibold">To communicate with you,</span> including order confirmations, updates, and customer support.</li>
      <li><span className="font-semibold">To improve our website and services</span>through analytics and user feedback.</li>
      <li><span className="font-semibold">To prevent fraud and ensure security</span> of transactions and user accounts.</li>
      <br />
      {/* 3. How We Protect Your Information */}
      <h1 className=" font-semibold ">3. How We Protect Your Information</h1>
      <p className="">We take data security seriously and implement appropriate measures, including:</p>
      <li>SSL encryption for secure transactions.</li>
      <li>Secure payment processing through trusted third-party providers.</li>
      <li>Limited access to personal data by authorized personnel only.</li>
      <li>Regular monitoring and updates to prevent security threats.</li>
      <br />
      {/* 4. Sharing Your Information */}
      <h1 className="font-semibold">4. Sharing Your Information</h1>
      <p className="">We do not sell, rent, or trade your personal information. However, we may share it with:</p>
      <li><span className="font-semibold">Service Provider</span> (such as payment processors, shipping companies) to fulfill your order.</li>
      <li><span className="font-semibold">Legal authorities</span>if required by law or to prevent fraud.</li>
      <h1 className="font-semibold">5. Cookies & Tracking Technologies</h1>
      <p className="">We use cookies to enhance your browsing experience. Cookies help us:</p>
      <li>Remember your preferences and shopping cart details.</li>
      <li>Improve website functionality and performance.</li>
      <li>Analyze site traffic through third-party services like Google Analytics.</li>
      <p>You can control cookie preferences through your browser settings.</p>
      <br />
      {/* 6. Your Rights & Choices */}
      <h1 className="font-semibold">6. Your Rights & Choices</h1>
      <p>You have the right to:</p>
      <li>Access, update, or delete your personal data.</li>
      <li>Opt-out of marketing emails at any time by clicking the “unsubscribe” link.</li>
      <li>Disable cookies via browser settings.</li>
      <li>Request a copy of the data we have about you.</li>
      <p>To make a request, contact us at [support@PostoCard.com].</p>
      <br />
      {/* 7. GDPR Compliance (For EU Users) */}
      <h1 className="font-semibold">7. GDPR Compliance (For EU Users)</h1>
      <p className="">If you are located in the <span className="font-semibold">European Economic Area (EEA)</span>, you have specific rights under the <span className="font-semibold">General Data Protection Regulation (GDPR):</span></p>
      <li><span className="font-semibold">Right to Access </span> – You can request a copy of your personal data.</li>
      <li><span className="font-semibold">Right to Rectification</span> – You can request corrections to inaccurate or incomplete data.</li>
      <li><span className="font-semibold">Right to Erasure ("Right to Be Forgotten")</span> – You can request deletion of your personal data under certain conditions.</li> 
      <li><span className="font-semibold">Right to Restrict Processing</span>– You can request that we limit the use of your data.</li>
      <li><span className="font-semibold">Right to Data Portability</span>– You can request to receive your data in a machine-readable format.</li>
      <li><span className="font-semibold">Right to Object</span>– You can object to data processing for direct marketing purposes.</li>
      <h2 className="font-semibold">Legal Basis for Processing</h2>
      <p className="">We collect and process your data only when we have a legal basis, such as: </p>
      <li>Your <span className="font-semibold">Content</span>(e.g., subscribing to emails).</li>
      <li>The <span className="font-semibold">performance of a contract</span> (e.g., fulfilling your order).</li>
      <li>Our <span className="font-semibold"> legitimate business interests</span> (e.g., improving services).</li>
      <p>To exercise your GDPR rights, email us at <span className="font-semibold">[support@PostoCard.com]</span> with "GDPR Request" in the subject line.</p>
      {/* 8. CCPA Compliance (For California Users)*/}
      <h1 className="font-semibold">8. CCPA Compliance (For California Users)</h1>
      <p>If you are a <span className="font-semibold">California resident</span>, you have rights under the <span className="font-semibold">California Consumer Privacy Act (CCPA):</span></p>    
      <li><span className="font-semibold">Right to Know</span>– You can request details about the personal data we collect, use, and share.</li>
      <li><span className="font-semibold">Right to Delete</span>– You can request deletion of your personal information, subject to certain exceptions.</li>
      <li><span className="font-semibold">Right to Opt-Out of Sale </span>– We do not sell personal information, but you can opt-out of any data sharing practices.</li>
      <li><span className="font-semibold">Right to Non-Discrimination</span>– We will not discriminate against you for exercising your privacy rights.</li>
      <h1 className="font-semibold">How to Submit a Request</h1>
      <p>To exercise your CCPA rights, email <span className="font-semibold">[support@PostoCard.com]</span>with "CCPA Request" in the subject line. We may need to verify your identity before processing your request.</p>
      <p className="">If you have authorized an agent to make a request on your behalf, we may require additional verification.      </p>
      <br />
      {/* Thired party link */}
      <h1 className="font-semibold">9. Third-Party Links</h1>
      <p>Our website may contain links to third-party sites. We are not responsible for their privacy practices, so we encourage you to review their policies before sharing your information.</p>
      <h1 className="font-semibold">10. Children's Privacy</h1>
      <p className="">Our services are <span className="font-semibold"> not intended for children under 13,</span>and we do not knowingly collect personal data from minors.</p>
      <br />
      <h1 className="font-semibold">11. Changes to This Policy</h1>
      <p>We may update this Privacy Policy as needed. Any changes will be posted on this page with the updated <span className="font-semibold">“Effective Date”</span>. We encourage you to review this policy periodically</p>
      <br />
      {/* 12. Contact Us */}
      <h1 className="font-semibold">12. Contact Us</h1>
      <p className="">For any questions or concerns about this Privacy Policy, please contact us:</p>
      <p className="font-semibold">📧 Email: [support@PostoCard.com]</p>
       <p className="font-semibold">🌐 Website: [www.PostoCard.com]</p>

      
      
      </div>
  );
};

export default Page;
