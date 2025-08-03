export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline text-center mb-12">Privacy Policy</h1>
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide to us when you purchase a data plan, such as your name and email address. We also collect data related to your usage of our WiFi network to ensure service quality.</p>
            
            <h2>2. How We Use Your Information</h2>
            <p>We use your information to provide and manage your service, process payments, and communicate with you about your account. We may also use usage data to monitor and improve our network performance.</p>

            <h2>3. Data Security</h2>
            <p>We implement security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

            <h2>4. Third-Party Services</h2>
            <p>We use Paystack for payment processing. We do not store your credit card details. Please review Paystack's privacy policy for more information on how they handle your data.</p>

            <h2>5. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to provide you with services and as required by law.</p>
            
            <h2>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Please contact us to make such a request.</p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at support@rosecwifi.com.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
