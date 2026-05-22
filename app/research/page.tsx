export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import ResearchFilter from './ResearchFilter';
import { GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects & Research',
  description: 'Active and upcoming projects spanning maritime education, instructional design, data analytics, and technology-enhanced learning.',
};

const STATIC_PROJECTS = [
  // ── Current ──────────────────────────────────────────────────────────────
  {
    id: 'imaster',
    title: 'iMASTER',
    slug: 'imaster',
    description: 'AI-enhanced maritime simulation training. Integrating machine learning and intelligent feedback systems into simulator-based Maritime Education and Training (MET). Focuses on adaptive assessment, STCW compliance, and predictive performance modelling to improve how officers are trained and evaluated at sea.',
    status: 'Current',
    imageUrl: '/images/imaster.jpg',
    tags: ['AI in Education', 'Maritime Education', 'Simulation', 'STCW', 'Instructional Design'],
    links: { publication: 'https://link.springer.com/article/10.1007/s40593-025-00464-y' },
  },
  {
    id: 'digimar',
    title: 'DigiMar',
    slug: 'digimar',
    description: 'Digital maritime competence frameworks for European seafarer education. Developing curriculum models and digital literacy frameworks that align with IMO standards and EU maritime policy, equipping maritime training institutions with tools for the digital transition of seafarer education.',
    status: 'Current',
    imageUrl: '/images/digimar.jpg',
    tags: ['Maritime Education', 'EdTech', 'Curriculum Design', 'IMO', 'SMCP'],
    links: {},
  },
  {
    id: 'impact-kenya',
    title: 'IMPACT for Kenya',
    slug: 'impact-kenya-tvet',
    description: 'GIZ-funded capacity building for maritime Technical and Vocational Education and Training (TVET) in Kenya. Strengthening instructor competencies, updating curriculum frameworks to align with STCW and national CBC mandates, and improving assessment practices in Kenyan maritime training institutions.',
    status: 'Current',
    imageUrl: '/images/impact-kenya.jpg',
    tags: ['Maritime Education', 'Kenya', 'TVET', 'Capacity Building', 'Curriculum Design'],
    links: {},
  },

  // ── Upcoming ─────────────────────────────────────────────────────────────
  {
    id: 'instructional-design',
    title: 'Instructional Design',
    slug: 'instructional-design',
    description: 'Developing structured, evidence-based instructional design frameworks for higher education and professional training contexts. Drawing on multimedia learning theory, UDL principles, and ADDIE methodology to create scalable learning solutions for both face-to-face and digital delivery environments.',
    status: 'Upcoming',
    imageUrl: '/images/instructional-design.jpg',
    tags: ['Instructional Design', 'UDL', 'Higher Education', 'EdTech'],
    links: {},
  },
  {
    id: 'learning-design',
    title: 'Learning Design',
    slug: 'learning-design',
    description: 'Bridging instructional theory with practical learning experience design. Focuses on designing learner-centred curricula, aligning learning outcomes with assessment strategies, and building coherent learning sequences that work across blended and fully online delivery modes.',
    status: 'Upcoming',
    imageUrl: '/images/learning-design.jpg',
    tags: ['Learning Design', 'Curriculum Design', 'Blended Learning', 'EdTech'],
    links: {},
  },
  {
    id: 'ux-design',
    title: 'User Experience Design',
    slug: 'user-experience-design',
    description: 'Applying UX research and design principles to educational technology products and learning platforms. Covers usability testing, learner journey mapping, interface prototyping, and accessibility — ensuring that digital learning tools reduce friction rather than create it.',
    status: 'Upcoming',
    imageUrl: '/images/ux-design.jpg',
    tags: ['UX Design', 'EdTech', 'Accessibility', 'Instructional Design'],
    links: {},
  },
  {
    id: 'teacher-education',
    title: 'Teacher Education (Microteaching)',
    slug: 'teacher-education-microteaching',
    description: 'Designing and facilitating microteaching cycles for pre-service and in-service teachers. Integrates peer feedback, video reflection, and structured coaching to develop pedagogical skills in technology-enhanced and simulator-based classroom environments.',
    status: 'Upcoming',
    imageUrl: '/images/teacher-education.jpg',
    tags: ['Teacher Education', 'TPACK', 'Microteaching', 'Professional Development'],
    links: {},
  },
  {
    id: 'maritime-data-analytics',
    title: 'Maritime Data Analytics',
    slug: 'maritime-data-analytics',
    description: 'Applying Python-based data analytics to maritime operational datasets — voyage data recorders, simulator logs, and training performance records. The goal is to generate actionable pedagogical insights from data that already exists but has not been systematically mined for learning improvement purposes.',
    status: 'Upcoming',
    imageUrl: '/images/maritime-data-analytics.jpg',
    tags: ['Maritime Education', 'Data Analytics', 'Python', 'AI in Education'],
    links: {},
  },
  {
    id: 'project-management-ai',
    title: 'Project Management with AI',
    slug: 'project-management-ai',
    description: 'Exploring how AI tools integrate into project management workflows — from planning and scheduling to risk assessment and stakeholder communication. Combines PMI/PMP methodology with emerging AI capabilities to improve efficiency in research and education project environments.',
    status: 'Upcoming',
    imageUrl: '/images/project-management-ai.jpg',
    tags: ['Project Management', 'AI in Education', 'PMP', 'Productivity'],
    links: {},
  },
  {
    id: 'enterprise-resource-management',
    title: 'Enterprise Resource Management',
    slug: 'enterprise-resource-management',
    description: 'Building competence in enterprise-level resource planning and financial systems. Holds a QuickBooks Online certification and bookkeeping qualifications, covering accounts payable/receivable, financial reporting, and payroll fundamentals. Expanding into Oracle NetSuite ERP for project accounting, resource planning, and operational workflow management in academic and research organisation contexts.',
    status: 'Upcoming',
    imageUrl: '/images/enterprise-resource-management.jpg',
    tags: ['ERP', 'NetSuite', 'QuickBooks', 'Bookkeeping', 'Project Management'],
    links: {},
  },
];

export default async function ResearchPage() {
  const dbProjects = await prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  }).catch(() => []);

  // Use DB projects if available, otherwise fall back to static content
  const projects = dbProjects.length > 0 ? dbProjects : STATIC_PROJECTS;

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="section-container py-12">
          {/* Header */}
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-electric-500 to-teal-500" />
              <span className="text-xs font-medium text-electric-400 uppercase tracking-widest">Projects & Research</span>
            </div>
            <h1 className="font-serif text-5xl font-bold text-white mb-4">
              Projects &amp; <span className="gradient-text">Research</span>
            </h1>
            <p className="text-slate-400 leading-relaxed text-lg">
              Active and upcoming work spanning maritime education, instructional design,
              data analytics, and technology-enhanced learning — across Finland, Kenya,
              and the broader maritime world.
            </p>
            <a
              href="https://scholar.google.com/citations?user=kOWsRIcAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-lg bg-electric-500/10 border border-electric-500/30 text-electric-400 hover:bg-electric-500/20 hover:border-electric-500/50 transition-all text-sm font-medium"
            >
              <GraduationCap className="w-4 h-4" />
              View my Google Scholar profile
            </a>
          </div>

          {/* Research areas tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Maritime Education', 'Instructional Design', 'Learning Design', 'UX Design', 'EdTech', 'Data Analytics', 'TPACK', 'AI in Education', 'Project Management', 'ERP', 'Kenya', 'Finland'].map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>

          {/* Filter + Grid */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <ResearchFilter projects={projects as any[]} />
        </section>
      </main>
      <Footer />
    </>
  );
}
