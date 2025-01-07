import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
  
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn items in their original packaging. Returns are free for store credit, or a small fee applies for refunds."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping (2-3 business days) is available for an additional fee. International shipping may take 7-14 business days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Please check our shipping calculator at checkout for specific details."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted."
    },
    {
      question: "How do I know if an item is in stock?",
      answer: "Product availability is shown in real-time on our website. If an item is out of stock, you can sign up for email notifications when it's back in stock."
    },
    {
      question: "Do you offer size exchanges?",
      answer: "Yes, we offer free size exchanges within 30 days of purchase. Simply initiate an exchange through your account or contact customer service."
    },
    {
      question: "How do I care for my garments?",
      answer: "Each item comes with specific care instructions on the label. Generally, we recommend following the washing instructions carefully to maintain the quality of your garments."
    }
  ];
  
  export function FAQ() {
    return (
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground text-center mb-12">
              Find answers to common questions about our products, shipping, returns, and more.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
  
            <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
              <p className="text-muted-foreground mb-4">
                Our customer service team is here to help you.
              </p>
              <p className="font-medium">
                Contact us at{" "}
                <a href="mailto:support@stylestore.com" className="text-primary hover:underline">
                  support@stylestore.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }