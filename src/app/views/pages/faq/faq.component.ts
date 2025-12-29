import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [BreadcrumbComponent,NgbAccordionModule,CommonModule],
  templateUrl: './faq.component.html',
  styles: ``
})
export class FaqComponent {
  FAQs = [
    {
      "question": "How do you ensure the safety of my shipments?",
      "answer": "Our FAQs also address our warehousing options, shipment tracking systems, & specialized services for different industries. Additionally, you'll find information on how we manage temperature-sensitive."
    },
    {
      "question": "What transport and logistics services do you offer?",
      "answer": "Our FAQs also address our warehousing options, shipment tracking systems, & specialized services for different industries. Additionally, you'll find information on how we manage temperature-sensitive."
    },
    {
      "question": "How can I get a quote for your services?",
      "answer": "Our FAQs also address our warehousing options, shipment tracking systems, & specialized services for different industries. Additionally, you'll find information on how we manage temperature-sensitive."
    },
    {
      "question": "What steps do you take to ensure timely deliveries?",
      "answer": "Our FAQs also address our warehousing options, shipment tracking systems, & specialized services for different industries. Additionally, you'll find information on how we manage temperature-sensitive."
    }
  ]

  answerFaqs= [
    {
      question: "Do you provide same-day or express delivery services?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapseTwo",
      parent: "accordionExample1"
    },
    {
      question: "What are your warehousing and storage options?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapseOne",
      parent: "accordionExample1",
      show: true
    },
    {
      question: "How do you handle temperature-sensitive shipments?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapseThree",
      parent: "accordionExample1"
    },
    {
      question: "What steps do you take to ensure timely deliveries?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapseFour",
      parent: "accordionExample1"
    },
    {
      question: "How do you manage large or complex shipments?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapseFive",
      parent: "accordionExample3"
    },
    {
      question: "What technology do you use for inventory?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapseSix",
      parent: "accordionExample3"
    },
    {
      question: "How can I get a quote for your services?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapseSeven",
      parent: "accordionExample3"
    },
    {
      question: "What industries do you specialize in?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapseeight",
      parent: "accordionExample3"
    },
    {
      question: "How can I track my shipment?",
      answer: "Learn more about our pricing, compliance with international regulations, & the advanced technology we use to enhance efficiency & transparency in your logistics operations.",
      id: "collapsenine",
      parent: "accordionExample3"
    }
  ];
}
