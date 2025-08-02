import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Faq = { q: string; a: string; };

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs: Faq[] = [
    {
      q: 'What is SkillSync Hyderabad?',
      a: 'It’s a local marketplace for finding reliable service providers and informal teachers for any skill in Hyderabad. We connect seekers to providers for work (“Do”) and skill sessions (“Teach”).'
    },
    {
      q: 'How do I book a service or class?',
      a: 'Search or browse, pick a provider or session, view availability and price, then use the “Book” or “Enroll” button to confirm your slot!'
    },
    {
      q: 'How do I become a provider?',
      a: 'Register as a provider and create your service or teaching session from your dashboard. Set your price, description, and schedule.'
    },
    {
      q: 'Is payment secure on the platform?',
      a: 'Yes, all payments are processed securely via trusted payment gateways. You’ll receive a digital invoice for every transaction.'
    },
    {
      q: 'Can I use the app in dark mode?',
      a: 'Yes! You can toggle between light and dark mode from your profile/settings page at any time.'
    },
    {
      q: 'How do I rate or review a provider?',
      a: 'After your booking or session is completed, you’ll be prompted to leave a rating and review for the provider. Your feedback helps others choose trustworthy services.'
    },
    {
      q: 'What if I have a problem or dispute?',
      a: 'Contact our support team through the Contact page and we’ll help resolve any issues promptly!'
    }
  ];

  openIndexes = new Set<number>();

  toggleOpen(idx: number) {
    if (this.openIndexes.has(idx)) this.openIndexes.delete(idx);
    else this.openIndexes.add(idx);
  }
}
