import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function Contact() {
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have a question or feedback? We'd love to hear from you. Our team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Mail,
              title: "Email Us",
              content: "support@stylestore.com",
              description: "We'll respond within 24 hours"
            },
            {
              icon: Phone,
              title: "Call Us",
              content: "+1 (555) 123-4567",
              description: "Mon-Fri from 9am to 6pm"
            },
            {
              icon: MapPin,
              title: "Visit Us",
              content: "123 Fashion Street",
              description: "New York, NY 10001"
            }
          ].map((contact) => (
            <Card key={contact.title} className="p-6 text-center">
              <contact.icon className="h-8 w-8 mx-auto text-primary mb-4" />
              <h3 className="font-semibold mb-2">{contact.title}</h3>
              <p className="font-medium mb-2">{contact.content}</p>
              <p className="text-sm text-muted-foreground">{contact.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Send Us a Message</h2>
            <div className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" className="h-32" />
              <Button size="lg" className="w-full">Send Message</Button>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Store Hours</h2>
            <div className="space-y-4">
              {[
                { day: "Monday - Friday", hours: "10:00 AM - 9:00 PM" },
                { day: "Saturday", hours: "10:00 AM - 8:00 PM" },
                { day: "Sunday", hours: "11:00 AM - 6:00 PM" }
              ].map((schedule) => (
                <div key={schedule.day} className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{schedule.day}</p>
                    <p className="text-sm text-muted-foreground">{schedule.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}