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
import { CertificationListComponent } from "./certifications/certification-list/certification-list.component";
import { CertificationSingleComponent } from "./certifications/certification-single/certification-single.component";

export const VIEWS_ROUTES: Route[] = [
    {
        path: 'about',
        component: AboutComponent,
        data: { title: 'routes.titles.about' },
    },
    {
        path: 'service',
        component: ServicesComponent,
        data: { title: 'routes.titles.service' },
    },
    {
        path: 'service-left',
        component: ServiceLeftComponent,
        data: { title: 'routes.titles.serviceLeft' },
    },
    {
        path: 'service-right',
        component: ServiceRightComponent,
        data: { title: 'routes.titles.serviceRight' },
    },
    {
        path: 'service-single',
        component: ServiceSingleComponent,
        data: { title: 'routes.titles.serviceSingle' },
    },
    {
        path: 'service-single/:slug',
        component: ServiceSingleComponent,
        data: { title: 'routes.titles.serviceSingle' },
    },
    {
        path: 'team',
        component: TeamComponent,
        data: { title: 'routes.titles.team' },
    },
    {
        path: 'testimonial',
        component: TestimonialComponent,
        data: { title: 'routes.titles.testimonial' },
    },
    {
        path: 'faq',
        component: FaqComponent,
        data: { title: 'routes.titles.faq' },
    },
    {
        path: 'pricing',
        component: PricingPlanComponent,
        data: { title: 'routes.titles.pricing' },
    },
    {
        path: 'contact',
        component: ContactComponent,
        data: { title: 'routes.titles.contact' },
    },
    {
        path: '404',
        component: Error404Component,
        data: { title: 'routes.titles.notFound' },
    },
    {
        path: 'blog',
        component: BlogComponent,
        data: { title: 'routes.titles.blog' },
    },
    {
        path: 'blog-left',
        component: BlogLeftComponent,
        data: { title: 'routes.titles.blogLeft' },
    },
    {
        path: 'blog-right',
        component: BlogRightComponent,
        data: { title: 'routes.titles.blogRight' },
    },
    {
        path: 'blog-single',
        component: BlogSingleComponent,
        data: { title: 'routes.titles.blogSingle' },
    },
    {
        path: 'blog-single/:slug',
        component: BlogSingleComponent,
        data: { title: 'routes.titles.blogSingle' },
    },
    {
        path: 'projects',
        component: ProjectComponent,
        data: { title: 'routes.titles.projects' },
    },
    {
        path: 'project-left',
        component: ProjectLeftComponent,
        data: { title: 'routes.titles.projectLeft' },
    },
    {
        path: 'project-right',
        component: ProjectRightComponent,
        data: { title: 'routes.titles.projectRight' },
    },

    {
        path: 'project-single',
        component: ProjectSingleComponent,
        data: { title: 'routes.titles.projectSingle' },
    },
    {
        path: 'certificaciones',
        component: CertificationListComponent,
        data: { title: 'routes.titles.certifications' },
    },
    {
        path: 'certificaciones/:slug',
        component: CertificationSingleComponent,
        data: { title: 'routes.titles.certification' },
    },
    {
        path:'index',
        component:Home1Component,
        data:{title:'routes.titles.home'}
    },
]
