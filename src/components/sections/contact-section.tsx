'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KeyRound, ShieldCheck, Copy } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
      variant: 'default',
    });
    form.reset();
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: `${type} copied to clipboard.`,
    });
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">Get in Touch</h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind or just want to say hi? Fill out the form or use one of the secure methods below.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Secure Connection</CardTitle>
              <CardDescription>For sensitive communication, use my PGP key.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                <div className="flex items-center gap-3">
                  <KeyRound className="w-5 h-5 text-primary" />
                  <p className="font-mono text-sm">ssh-ed25519 AAAA...[REDACTED]</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleCopy('ssh-ed25519 AAAA...[REDACTED]', 'SSH Key')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <p className="font-mono text-sm">PGP: 4A4F 4B4C 4D4E 4F50</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleCopy('4A4F 4B4C 4D4E 4F50', 'PGP Key')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                      <Input placeholder="john.doe@example.com" {...field} />
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
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message here..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
