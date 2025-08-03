import Image from 'next/image';
import FaqSection from './faq-section';

export default function SupportPage() {
  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">Support Center</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We're here to help. Find answers to common questions or get in touch with our team.
            </p>
        </div>
      </section>

      <FaqSection />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Still Need Help?</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Our professional support team is ready to assist you.
                </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                    <h3 className="font-headline text-2xl font-semibold mb-4">Contact Our Team</h3>
                    <p className="text-muted-foreground mb-4">
                        For technical issues, billing questions, or any other inquiries, please don't hesitate to reach out.
                    </p>
                    <ul className="space-y-3 text-lg">
                        <li className="flex items-center gap-3">
                            <strong>Email:</strong>
                            <a href="mailto:support@rosecwifi.com" className="text-primary hover:underline">support@rosecwifi.com</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <strong>Phone:</strong>
                            <a href="tel:+2348084167651" className="text-primary hover:underline">08084167651</a>
                        </li>
                         <li className="flex items-center gap-3">
                            <strong>WhatsApp:</strong>
                            <a href="https://wa.me/2348069610482" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">08069610482</a>
                        </li>
                    </ul>
                </div>
                <div className="order-1 md:order-2">
                    <Image
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470"
                        alt="Support team"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-premium"
                        data-ai-hint="nigerian university students"
                    />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
