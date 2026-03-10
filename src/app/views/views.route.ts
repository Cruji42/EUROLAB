import { Route } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ServicesComponent } from "./services/services/services.component";
import { ServiceLeftComponent } from "./services/service-left/service-left.component";
import { ServiceRightComponent } from "./services/service-right/service-right.component";
import { ServiceSingleComponent } from "./services/service-single/service-single.component";
import { TeamComponent } from "./pages/team/team.component";
import { TestimonialComponent } from "./pages/testimonial/testimonial.component";
import { FaqComponent } from "./pages/faq/faq.component";
import { PricingPlanComponent } from "./pages/pricing-plan/pricing-plan.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { Error404Component } from "./pages/error404/error404.component";
import { BlogComponent } from "./blogs/blog/blog.component";
import { BlogLeftComponent } from "./blogs/blog-left/blog-left.component";
import { BlogRightComponent } from "./blogs/blog-right/blog-right.component";
import { BlogSingleComponent } from "./blogs/blog-single/blog-single.component";
import { ProjectComponent } from "./projects/project/project.component";
import { ProjectLeftComponent } from "./projects/project-left/project-left.component";
import { ProjectRightComponent } from "./projects/project-right/project-right.component";
import { ProjectSingleComponent } from "./projects/project-single/project-single.component";
import { Home1Component } from "../demo/home1/home1.component";

export const VIEWS_ROUTES: Route[] = [
    {
        path: 'about',
        component: AboutComponent,
        data: { title: 'Laboratorio EURONUTEC-About' },
    },
    {
        path: 'service',
        component: ServicesComponent,
        data: { title: 'Laboratorio EURONUTEC-Service' },
    },
    {
        path: 'service-left',
        component: ServiceLeftComponent,
        data: { title: 'Laboratorio EURONUTEC-Service Left' },
    },
    {
        path: 'service-right',
        component: ServiceRightComponent,
        data: { title: 'Laboratorio EURONUTEC-Service Right' },
    },
    {
        path: 'service-single',
        component: ServiceSingleComponent,
        data: { title: 'Laboratorio EURONUTEC-Service Single' },
    },
    {
        path: 'service-single/:slug',
        component: ServiceSingleComponent,
        data: { title: 'Laboratorio EURONUTEC-Service Single' },
    },
    {
        path: 'team',
        component: TeamComponent,
        data: { title: 'Laboratorio EURONUTEC-Team' },
    },
    {
        path: 'testimonial',
        component: TestimonialComponent,
        data: { title: 'Laboratorio EURONUTEC-Testimonial' },
    },
    {
        path: 'faq',
        component: FaqComponent,
        data: { title: 'Laboratorio EURONUTEC-Faq' },
    },
    {
        path: 'pricing',
        component: PricingPlanComponent,
        data: { title: 'Laboratorio EURONUTEC-Pricing Plan' },
    },
    {
        path: 'contact',
        component: ContactComponent,
        data: { title: 'Laboratorio EURONUTEC-Contact' },
    },
    {
        path: '404',
        component: Error404Component,
        data: { title: 'Laboratorio EURONUTEC-404' },
    },
    {
        path: 'blog',
        component: BlogComponent,
        data: { title: 'Laboratorio EURONUTEC-Blog' },
    },
    {
        path: 'blog-left',
        component: BlogLeftComponent,
        data: { title: 'Laboratorio EURONUTEC-Blog Left' },
    },
    {
        path: 'blog-right',
        component: BlogRightComponent,
        data: { title: 'Laboratorio EURONUTEC-Blog Right' },
    },
    {
        path: 'blog-single',
        component: BlogSingleComponent,
        data: { title: 'Laboratorio EURONUTEC-Blog Single' },
    },
    {
        path: 'projects',
        component: ProjectComponent,
        data: { title: 'Laboratorio EURONUTEC-Projects' },
    },
    {
        path: 'project-left',
        component: ProjectLeftComponent,
        data: { title: 'Laboratorio EURONUTEC-Project Left' },
    },
    {
        path: 'project-right',
        component: ProjectRightComponent,
        data: { title: 'Laboratorio EURONUTEC-Project Eight' },
    },

    {
        path: 'project-single',
        component: ProjectSingleComponent,
        data: { title: 'Laboratorio EURONUTEC-Project Single' },
    },
    {
        path:'index',
        component:Home1Component,
        data:{title:'Laboratorio EURONUTEC'}
    },
]
