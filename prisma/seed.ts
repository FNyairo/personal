import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱  Seeding database...');

  // ── Admin User ────────────────────────────────────────────────────────────
  const rawPassword = process.env.ADMIN_SEED_PASSWORD || 'ChangeMe123!';
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || await bcrypt.hash(rawPassword, 12);

  await prisma.user.upsert({
    where: { email: 'franklin.nyairo@novia.fi' },
    update: {},
    create: {
      email: 'franklin.nyairo@novia.fi',
      passwordHash,
    },
  });
  console.log('  ✓  Admin user created');

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = [
    { key: 'publications', value: 6, label: 'Publications' },
    { key: 'projects',     value: 4, label: 'Active Projects' },
    { key: 'talks',        value: 8, label: 'Talks & Presentations' },
    { key: 'citations',    value: 42, label: 'Citations' },
  ];

  for (const stat of stats) {
    await prisma.stats.upsert({
      where: { key: stat.key },
      update: { value: stat.value, label: stat.label },
      create: stat,
    });
  }
  console.log('  ✓  Stats seeded');

  // ── Projects ──────────────────────────────────────────────────────────────
  const projects = [
    {
      title: 'iMASTER – Intelligent Maritime Training System',
      slug: 'imaster',
      description: 'EU-funded project developing an AI-powered intelligent learning system for maritime education and training at Novia University of Applied Sciences.',
      longDesc: 'iMASTER integrates machine learning and adaptive learning pathways into simulator-based maritime education. The project targets improved assessment accuracy and personalised training for cadets.',
      status: 'current',
      imageUrl: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=800&q=80',
      tags: ['AI', 'Maritime Education', 'Simulation', 'EU Project', 'EdTech'],
      links: { publication: 'https://link.springer.com/article/10.1007/s40593-025-00464-y' },
      featured: true,
    },
    {
      title: 'DigiMar – Digital Maritime Communication',
      slug: 'digimar',
      description: 'Erasmus+ project uniting maritime authorities and higher education institutions across Northern and Southern Europe to standardise digital maritime communication training.',
      longDesc: 'Launched October 2023 and running until September 2026, DigiMar develops instructional videos, chatbot-assisted learning modules, and standardised VHF communication exercises aligned with SMCP and STCW requirements.',
      status: 'current',
      imageUrl: 'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=800&q=80',
      tags: ['Maritime English', 'SMCP', 'STCW', 'Erasmus+', 'VHF Communication'],
      links: { publication: 'https://www.novia.fi/en/news/news/digimar-project-strengthening-maritime-communication-for-safer-seas' },
      featured: true,
    },
    {
      title: 'IMPACT Kenya – Teacher Education Reform',
      slug: 'impact-kenya',
      description: 'Research and capacity-building project supporting Kenyan pre-service teacher education programmes in integrating technology and competence-based curriculum design.',
      longDesc: 'IMPACT Kenya connects Finnish expertise in technology-enhanced learning with Kenyan teacher training institutions, supporting the transition to the Competence-Based Curriculum (CBC).',
      status: 'current',
      imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80',
      tags: ['TPACK', 'CBC', 'Teacher Education', 'Kenya', 'Curriculum Reform'],
      links: {},
      featured: true,
    },
    {
      title: 'TOTEMK – Training Trainers for Kenya',
      slug: 'totemk',
      description: 'University of Helsinki research project (2020–2024) focused on strengthening teacher education and management capacity in Kenyan educational institutions.',
      longDesc: 'TOTEMK examined curriculum frameworks, initial teacher professional development, and lesson plan design integrating technology across Finnish and Kenyan EFL teacher education programmes. The project produced mixed-methods findings on TPACK acquisition.',
      status: 'past',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      tags: ['Teacher Education', 'Kenya', 'Finland', 'TPACK', 'DBR'],
      links: { publication: 'https://researchportal.helsinki.fi/en/projects/training-trainers-for-teacher-education-and-management-in-kenya-t-2' },
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log('  ✓  Projects seeded');

  // ── Sample Blog Post ───────────────────────────────────────────────────────
  const sampleContent = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Why TPACK Matters for Maritime English Instructors' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'The intersection of technology, pedagogy, and content knowledge presents distinctive challenges in specialised professional contexts. For Maritime English instructors navigating the requirements of STCW and SMCP frameworks, this intersection is not merely theoretical — it determines whether cadets develop communicative competence sufficient for safe vessel operation.',
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: 'The Core Problem' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Mishra and Koehler's (2006) original TPACK formulation treated the three knowledge domains as interactive. In maritime education, this interaction takes a specific form: an instructor must understand not only the maritime content (SMCP phrases, VHF procedures, emergency protocols) but also how digital simulation tools — bridge simulators, VHF training software — alter how that content is learned and assessed. Most generic TPACK instruments fail to capture this specificity.",
          },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Simulator-based assessment introduces multimodal demands that traditional classroom observation misses.' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'SMCP requires precision — technology must support, not distort, regulatory language.' }] }],
          },
          {
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Instructor professional development rarely addresses technology integration in ESP contexts.' }] }],
          },
        ],
      },
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: 'What DigiMar Is Doing About It' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'The DigiMar project is developing evidence-based instructional modules that align VHF communication training with SMCP requirements while integrating chatbot-assisted practice and video instruction. Early results from the Novia cohort indicate measurable improvement in correct SMCP phrase usage following a structured blended learning sequence. A formal pre-/post-training evaluation is planned for the 2025–2026 cohort.',
          },
        ],
      },
      {
        type: 'image',
        attrs: {
          src: 'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=800&q=80',
          alt: 'Maritime bridge simulator training',
        },
      },
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [{ type: 'text', text: 'Implications for Instructor Training' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'The findings suggest that TPACK-oriented professional development for maritime English instructors should prioritise three areas: understanding how simulator technology mediates language production, designing assessments that distinguish communicative competence from technical proficiency, and selecting digital tools that preserve the regulatory precision STCW demands. Generic EdTech training programmes address none of these adequately.',
          },
        ],
      },
    ],
  };

  await prisma.post.upsert({
    where: { slug: 'tpack-maritime-english-instructors' },
    update: {},
    create: {
      title: 'Why TPACK Matters for Maritime English Instructors',
      slug: 'tpack-maritime-english-instructors',
      content: sampleContent,
      excerpt: 'Generic TPACK instruments fail to capture what maritime English instructors actually need. Here is why the intersection of simulator technology and SMCP precision demands a domain-specific approach.',
      coverImage: 'https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=800&q=80',
      tags: ['TPACK', 'Maritime English', 'SMCP', 'DigiMar', 'Instructional Design'],
      published: true,
      readingTime: 6,
    },
  });

  await prisma.post.upsert({
    where: { slug: 'kenyan-preservice-efl-tpack-readiness' },
    update: {},
    create: {
      title: 'Assessing Kenyan Pre-Service EFL Teachers\' TPACK Readiness: Key Findings',
      slug: 'kenyan-preservice-efl-tpack-readiness',
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Summary of findings from the peer-reviewed study published in European Journal of Education Studies (2026). The full paper is available open access.' }] },
        ],
      },
      excerpt: 'Findings from a mixed-methods study examining how 147 Kenyan pre-service EFL teachers at Kenyatta University and Moi University demonstrate TPACK readiness against the CBC\'s digitalization goals.',
      coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
      tags: ['TPACK', 'Kenya', 'EFL', 'Teacher Education', 'CBC', 'Mixed Methods'],
      published: true,
      readingTime: 8,
    },
  });

  await prisma.post.upsert({
    where: { slug: 'design-based-research-maritime-met' },
    update: {},
    create: {
      title: 'Design-Based Research in Maritime Education: Lessons from iMASTER',
      slug: 'design-based-research-maritime-met',
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'An account of how iterative DBR cycles shaped the iMASTER intelligent training system, including what failed in early prototypes and why.' }] },
        ],
      },
      excerpt: 'Design-based research is frequently cited but rarely documented honestly. This post traces the iterative development cycles of iMASTER — including the two prototypes that were discarded and why.',
      coverImage: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=800&q=80',
      tags: ['DBR', 'iMASTER', 'Maritime Education', 'Research Methods', 'AI'],
      published: true,
      readingTime: 7,
    },
  });

  console.log('  ✓  Blog posts seeded');
  console.log('\n✅  Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
