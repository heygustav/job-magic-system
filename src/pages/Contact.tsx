import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Mail } from 'lucide-react';
import FooterSection from '@/components/home/FooterSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Navn skal være mindst 2 tegn.' }),
  email: z.string().email({ message: 'Indtast venligst en gyldig email adresse.' }),
  subject: z.string().min(5, { message: 'Emne skal være mindst 5 tegn.' }),
  message: z.string().min(10, { message: 'Besked skal være mindst 10 tegn.' }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log('Form submitted:', data);
    
    // This would be connected to a real email service
    toast({
      title: "Besked sendt!",
      description: "Tak for din henvendelse. Vi vender tilbage til dig hurtigst muligt.",
    });
    
    form.reset();
  }

  return (
    <div className="w-full">
      <div className="gradient-header text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Kontakt os</h1>
          <p className="text-lg sm:text-xl max-w-3xl">
            Har du spørgsmål eller feedback? Vi er her for at hjælpe
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-700 mb-6 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Tilbage til forsiden
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-6">Send os en besked</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Navn</FormLabel>
                      <FormControl>
                        <Input placeholder="Dit fulde navn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="din.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emne</FormLabel>
                      <FormControl>
                        <Input placeholder="Hvad handler din henvendelse om?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Besked</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Skriv din besked her..." 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full sm:w-auto">
                  Send besked
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-6">Kontaktoplysninger</h2>
            
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-muted-foreground">
                  <a href="mailto:gustav@cvjob.dk" className="text-primary hover:underline">
                    gustav@cvjob.dk
                  </a>
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ofte stillede spørgsmål</h3>
              <div className="text-muted-foreground space-y-4">
                <p>
                  <a href="#" className="text-primary hover:underline block">
                    Hvordan fungerer jeres ansøgningsgenerator?
                  </a>
                </p>
                <p>
                  <a href="#" className="text-primary hover:underline block">
                    Hvad koster jeres tjeneste?
                  </a>
                </p>
                <p>
                  <a href="#" className="text-primary hover:underline block">
                    Kan jeg slette min konto igen?
                  </a>
                </p>
                <p>
                  <a href="#" className="text-primary hover:underline block">
                    Hvor sikre er mine data hos jer?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default Contact;
